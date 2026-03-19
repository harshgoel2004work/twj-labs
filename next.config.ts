import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer"
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drive.google.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '*.cdninstagram.com',
      },
      {
        protocol: 'https',
        hostname: '*.fbcdn.net',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/:locale/our-work/:path*',
        destination: '/:locale/work/:path*',
      },
      {
        source: '/our-work/:path*',
        destination: '/work/:path*',
      },
    ];
  },
};

export default bundleAnalyzer(withNextIntl(nextConfig));
