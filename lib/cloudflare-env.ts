import { getCloudflareContext } from "@opennextjs/cloudflare";

export function getEnv(): Record<string, string | undefined> {
  let cloudflareEnv: Record<string, string | undefined> = {};
  try {
    const env = getCloudflareContext().env;
    if (env) {
      cloudflareEnv = env as Record<string, string | undefined>;
    }
  } catch {
    /* not running in the Cloudflare runtime */
  }
  return { ...process.env, ...cloudflareEnv };
}