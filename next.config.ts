import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use output: 'export' only for production builds
  ...(process.env.NODE_ENV === 'production' ? {
    output: 'export',
    distDir: 'out',
  } : {}),
  images: {
    domains: ['source.unsplash.com', 'ui-avatars.com', 'via.placeholder.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  trailingSlash: true,
};

export default nextConfig;
