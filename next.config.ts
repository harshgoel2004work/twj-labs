import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  i18n:{
    locales: ['en-US', 'fr-FR', 'de-DE', 'en-IN'],
    defaultLocale: 'en-US',
  },
  images:{
    domains: ['drive.google.com', 'cdn.sanity.io' ],
  }
};

export default nextConfig;
