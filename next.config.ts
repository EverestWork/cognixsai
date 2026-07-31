import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  typescript: {
    // The static site does not use the Cloudflare Worker, D1, or build tooling.
    tsconfigPath: "tsconfig.static.json",
  },
};

export default nextConfig;
