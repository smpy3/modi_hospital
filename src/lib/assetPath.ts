/** assetPath: helpers to build correct URLs when deployed under a GitHub Pages basePath. */

export function withBasePath(path: string) {
  // Why: GitHub Pages serves project sites under "/<repo-name>", so absolute "/..." URLs 404 unless prefixed.
  const base = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").trim();
  const cleanedPath = path.startsWith("/") ? path : `/${path}`;
  if (!base) return cleanedPath;
  return `${base}${cleanedPath}`;
}

