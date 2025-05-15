import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
    ],
    unoptimized: true 
  },
  output: 'export',
  poweredByHeader: false,
  transpilePackages: [],
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;
