import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/hackathon-passkey-site',
  assetPrefix: '/hackathon-passkey-site/',
  reactCompiler: true,
};

export default nextConfig;
