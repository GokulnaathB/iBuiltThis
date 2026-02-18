import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // Enabled cache components. But we still need to tell NextJS which pages need to be static versus which pages need to be dynamic and so on.
  reactCompiler: true,
};

export default nextConfig;
