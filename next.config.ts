import type { NextConfig } from "next";

// STATIC_EXPORT=1 builds a fully static site into out/ for Cloudflare Pages.
// Without it, the build targets `next start` (the current laptop deployment).
const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = staticExport
  ? {
      output: "export",
      // Separate build dir so this never clobbers .next, which `next start` serves.
      distDir: ".next-export",
      images: { unoptimized: true },
      trailingSlash: true,
    }
  : {};

export default nextConfig;
