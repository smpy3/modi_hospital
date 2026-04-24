import type { NextConfig } from "next";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() || "";

const nextConfig: NextConfig = {
  // Why: required for GitHub Pages (static hosting) so the site can be exported to plain HTML.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // Why: GitHub Pages hosts under "/<repo-name>", so we support an optional base path.
  basePath,
  assetPrefix: basePath || undefined,
  // Why: prevents Turbopack from incorrectly treating a parent folder as the workspace root (fixes Tailwind resolve).
  turbopack: { root: here },
};

export default nextConfig;
