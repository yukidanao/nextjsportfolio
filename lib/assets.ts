/**
 * Asset filenames in `data/portfolio.ts` are stored without a leading slash
 * (`"hoams.png"`). That only resolved correctly on routes served without a
 * trailing slash — on nested routes such as `/projects/leeclip` the browser
 * would resolve it relative to the current path and 404. This normalises to
 * an absolute public path, leaving absolute URLs untouched.
 */
export function assetPath(asset: string): string {
  if (/^(https?:)?\/\//.test(asset) || asset.startsWith("/")) return asset;
  return `/${asset}`;
}