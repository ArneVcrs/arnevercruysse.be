import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Image optimization not supported with static export
  }
};

export default nextConfig;
