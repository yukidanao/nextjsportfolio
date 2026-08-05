import { NextResponse } from "next/server";
import { getEnv } from "@/lib/cloudflare-env";

const GITHUB_GRAPHQL = "https://api.github.com/graphql";

function isoDayRange(dateStr: string) {
  const d = new Date(dateStr);
  const from = new Date(d);
  from.setUTCHours(0, 0, 0, 0);
  const to = new Date(d);
  to.setUTCHours(23, 59, 59, 999);
  return { from: from.toISOString(), to: to.toISOString() };
}

export async function GET(request: Request) {
  try {
    const env = getEnv();
    const url = new URL(request.url);
    const date = url.searchParams.get("date");
    const username = url.searchParams.get("username") || env.GITHUB_USER;
    const token = env.GITHUB_TOKEN;

    if (!token) return NextResponse.json({ error: "GITHUB_TOKEN not set" }, { status: 500 });
    if (!username) return NextResponse.json({ error: "username query param or GITHUB_USER env required" }, { status: 400 });
    if (!date) return NextResponse.json({ error: "date query param required (YYYY-MM-DD)" }, { status: 400 });

    // Get user's repos (first 100)
    const repoQuery = `query($username: String!) { user(login: $username) { repositories(first: 100, ownerAffiliations: OWNER, isFork: false) { nodes { name } } } }`;
    const repoResp = await fetch(GITHUB_GRAPHQL, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", "User-Agent": "lee-leighnard-portfolio" },
      body: JSON.stringify({ query: repoQuery, variables: { username } }),
    });
    if (!repoResp.ok) return NextResponse.json({ error: await repoResp.text() }, { status: repoResp.status });
    const repoJson = await repoResp.json();
    const repos: { name: string }[] = repoJson.data?.user?.repositories?.nodes || [];

    const { from, to } = isoDayRange(date);
    const contributions: { repo: string; message: string; sha: string; date: string }[] = [];

    // iterate repos and fetch commits on that day until we have some samples
    for (const r of repos) {
      if (contributions.length >= 5) break;
      const repoName = r.name;
      const q = `query($owner:String!,$name:String!,$since:GitTimestamp!,$until:GitTimestamp!) { repository(owner:$owner,name:$name) { defaultBranchRef { target { ... on Commit { history(first: 20, since: $since, until: $until) { nodes { oid committedDate messageHeadline message author { user { login } name email } } } } } } }`;
      const res = await fetch(GITHUB_GRAPHQL, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", "User-Agent": "lee-leighnard-portfolio" },
        body: JSON.stringify({ query: q, variables: { owner: username, name: repoName, since: from, until: to } }),
      });
      if (!res.ok) continue;
      const j = await res.json();
      type CommitNode = {
        oid?: string;
        committedDate?: string;
        messageHeadline?: string;
        author?: { user?: { login?: string } } | null;
      };
      const nodes: CommitNode[] = j.data?.repository?.defaultBranchRef?.target?.history?.nodes || [];
      for (const n of nodes) {
        const authorLogin = n.author?.user?.login;
        if (authorLogin && authorLogin.toLowerCase() !== username.toLowerCase()) continue;
        contributions.push({
          repo: repoName,
          message: n.messageHeadline || "",
          sha: n.oid || "",
          date: n.committedDate || "",
        });
        if (contributions.length >= 5) break;
      }
    }

    return NextResponse.json({ date, contributions });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
