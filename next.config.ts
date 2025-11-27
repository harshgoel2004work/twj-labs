import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer"

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})

const nextConfig: NextConfig = {
  images:{
    domains: ['drive.google.com', 'cdn.sanity.io' ],
  }
};

export default bundleAnalyzer(nextConfig);
