import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'geeknizado.s3.us-east-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'geeknizado-hom.s3.us-east-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'geeknizado.s3.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
