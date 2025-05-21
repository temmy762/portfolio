import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use output: 'export' only for production builds
  ...(process.env.NODE_ENV === 'production' ? {
    output: 'export',
    distDir: 'out',
  } : {}),
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
