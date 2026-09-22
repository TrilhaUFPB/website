import path from "node:path";
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
    unoptimized: true,
  },
  poweredByHeader: false,
  transpilePackages: ["@trilha/ui", "@trilha/people"],
  turbopack: { root: path.resolve(process.cwd(), "../..") },
  outputFileTracingRoot: path.resolve(process.cwd(), "../.."),
  async redirects() {
    const campus = (
      process.env.NEXT_PUBLIC_UFPB_URL || "https://trilhaufpb.com"
    ).replace(/\/$/, "");
    return [
      { source: "/ufpb", destination: campus, permanent: false },
      ...[
        "aulas",
        "materiais",
        "turmas",
        "papers",
        "trilhurna",
        "admin",
        "metrics",
      ].map((route) => ({
        source: `/${route}/:path*`,
        destination: `${campus}/${route}/:path*`,
        permanent: false,
      })),
    ];
  },
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
      {
        source: "/ingest/flags",
        destination: "https://us.i.posthog.com/flags",
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
