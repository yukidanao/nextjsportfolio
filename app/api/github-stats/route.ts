import { NextResponse } from "next/server";

const GITHUB_GRAPHQL = "https://api.github.com/graphql";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const username = url.searchParams.get("username") || process.env.GITHUB_USER;
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      return NextResponse.json({ error: "GITHUB_TOKEN not set" }, { status: 500 });
    }

    if (!username) {
      return NextResponse.json({ error: "username query param or GITHUB_USER env required" }, { status: 400 });
    }

    const year = url.searchParams.get("year");

    let from: string | undefined;
    let to: string | undefined;
    if (year) {
      from = new Date(`${year}-01-01T00:00:00Z`).toISOString();
      to = new Date(`${year}-12-31T23:59:59Z`).toISOString();
    }

    const query = `query($username: String!, $from: DateTime, $to: DateTime) {
      user(login: $username) {
        repositories(first: 100, ownerAffiliations: OWNER, isFork: false) {
          totalCount
          nodes { stargazerCount }
        }
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
          totalCommitContributions
        }
      }
    }`;

    const resp = await fetch(GITHUB_GRAPHQL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { username, from, to } }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      return NextResponse.json({ error: text }, { status: resp.status });
    }

    const json = await resp.json();

    if (json.errors) {
      return NextResponse.json({ error: json.errors }, { status: 500 });
    }

    const user = json.data.user;
    const repos = user.repositories || { totalCount: 0, nodes: [] };
    const totalStars = (repos.nodes || []).reduce((sum: number, r: { stargazerCount?: number } | null) => sum + (r?.stargazerCount || 0), 0);
    const totalRepos = repos.totalCount || 0;
    const totalContributions = user.contributionsCollection?.contributionCalendar?.totalContributions || 0;
    const totalCommits = user.contributionsCollection?.totalCommitContributions || 0;

    // Flatten calendar days for easier client use
    const weeks = user.contributionsCollection?.contributionCalendar?.weeks || [];
    const calendarDays: { date: string; contributionCount: number }[] = [];
    for (const w of weeks) {
      for (const d of w.contributionDays) {
        calendarDays.push({ date: d.date, contributionCount: d.contributionCount });
      }
    }

    return NextResponse.json({ totalStars, totalRepos, totalContributions, totalCommits, calendarDays });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
