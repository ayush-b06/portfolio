import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['three'],
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        // Last.fm CDN — album art
        protocol: 'https',
        hostname: 'lastfm.freetls.fastly.net',
        pathname: '/**',
      },
      {
        // Deezer CDN — fallback album art
        protocol: 'https',
        hostname: 'e-cdns-images.dzcdn.net',
        pathname: '/**',
      },
      {
        // Deezer CDN — alternate subdomain
        protocol: 'https',
        hostname: 'cdn-images.dzcdn.net',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
