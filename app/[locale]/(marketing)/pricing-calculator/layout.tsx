import { Metadata } from "next";
import { baseUrl, buildHreflangAlternates, twitterDefaults, robotsDefaults } from "@/lib/seo";

const pageUrl = `${baseUrl}/pricing-calculator`;

export const metadata: Metadata = {
  title: "Website Pricing Calculator | Get an Instant Estimate",
  description:
    "Use our interactive pricing calculator to get an instant estimate for your Next.js website, SaaS product, or AI integration project. Transparent pricing from TWJ Labs.",
  
  keywords: [
    "website cost calculator",
    "web development pricing India",
    "Next.js project estimate",
    "SaaS development cost",
    "AI integration pricing",
    "TWJ Labs pricing",
  ],

  alternates: buildHreflangAlternates("/pricing-calculator"),

  openGraph: {
    type: "website",
    locale: "en_US",
    url: pageUrl,
    siteName: "The Walking Jumbo",
    title: "Website Pricing Calculator | Get an Instant Estimate",
    description: "Get an instant, transparent estimate for your next web project. Next.js, AI, and SaaS pricing.",
    images: [{ url: `${baseUrl}/opengraph-image.png`, width: 1200, height: 630 }],
  },
  twitter: { 
    ...twitterDefaults, 
    title: "Website Pricing Calculator | TWJ Labs", 
    description: "Instant estimate for Next.js and AI projects.", 
    images: [`${baseUrl}/opengraph-image.png`] 
  },
  robots: robotsDefaults,
};

export default function PricingCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
