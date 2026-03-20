/**
 * ============================================================
 * FILE: app/[locale]/(marketing)/(home)/page.tsx
 * ============================================================
 * ⚠️  CRITICAL: Move your existing JSX into `home-client.tsx`
 *     with "use client". This file must be a Server Component
 *     for metadata to work in Next.js.
 * ============================================================
 */

import type { Metadata } from "next";
import {
  baseUrl,
  buildHreflangAlternates,
  organizationSchema,
  globalAreaServed,
  twitterDefaults,
  robotsDefaults,
  globalKeywords,
} from "@/lib/seo";
import HomeClient from "@/components/home/home-client";

// ─── JSON-LD: 3 stacked schemas ──────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    // 1. Organization — builds Knowledge Panel + E-E-A-T signals
    organizationSchema,

    // 2. LocalBusiness — covers India local search AND signals
    //    global service delivery to foreign search engines
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": `${baseUrl}/#localbusiness`,
      name: "The Walking Jumbo",
      alternateName: "TWJ Labs",
      image: `${baseUrl}/opengraph-image.png`,
      url: baseUrl,
      telephone: "",  // ← add your number
      email: "",      // ← add your email
      priceRange: "$$",
      currenciesAccepted: "INR, USD, GBP, AUD, EUR",
      paymentAccepted: "Bank Transfer, PayPal, Wise, Stripe",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ghaziabad",
        addressRegion: "Uttar Pradesh",
        postalCode: "201010",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 28.6692,
        longitude: 77.4538,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "10:00",
          closes: "19:00",
        },
      ],
      // areaServed covers all 5 target regions — critical for international
      areaServed: globalAreaServed,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Web Development Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Next.js Development" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Integration" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom SaaS Development" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "E-commerce Development" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "UI/UX Design" } },
        ],
      },
      parentOrganization: { "@id": `${baseUrl}/#organization` },
    },

    // 3. WebSite — enables Sitelinks Search Box in Google results
    {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      url: baseUrl,
      name: "The Walking Jumbo",
      description: "Global Web Development Agency | Next.js, AI & SaaS",
      publisher: { "@id": `${baseUrl}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${baseUrl}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

// ─── Metadata ─────────────────────────────────────────────────
export const metadata: Metadata = {
  // Title: leads with global appeal, includes India-pricing angle
  // (foreign clients searching "web agency India" have strong purchase intent)
  title: "Global Web Development Agency | Next.js, AI & SaaS | TWJ Labs India",

  // Description: speaks to ALL markets — highlights offshore value prop
  description:
    "TWJ Labs is a world-class web development agency based in India, serving clients in the US, UK, Australia, New Zealand & Europe. Next.js, AI integration, and SaaS at a fraction of Western agency rates.",

  keywords: [
    // Global / offshore intent (highest value for international clients)
    ...globalKeywords.global,
    ...globalKeywords.northAmerica,
    ...globalKeywords.uk,
    ...globalKeywords.australia,
    ...globalKeywords.newZealand,
    // India domestic
    "web development agency India",
    "best web developers Ghaziabad",
    "software agency Delhi NCR",
    // Core tech
    "Next.js development company",
    "React.js agency",
    "AI web development",
    "custom SaaS builders",
    // Brand
    "The Walking Jumbo",
    "TWJ Labs",
  ],

  authors: [{ name: "Harsh Goel", url: "https://www.linkedin.com/in/harshgoel-cs" }],
  creator: "Harsh Goel",
  publisher: "The Walking Jumbo",

  robots: robotsDefaults,

  // ← THE MOST IMPORTANT PART FOR INTERNATIONAL SEO
  // Correct ISO hreflang for every English-speaking target region.
  // x-default catches all unassigned regions.
  // Since you have one URL per page (not localized URLs per country),
  // this tells Google to show your single page to all EN regions.
  alternates: buildHreflangAlternates("/"),

  openGraph: {
    type: "website",
    // en_US is the safest default OG locale for international reach
    locale: "en_US",
    url: baseUrl,
    siteName: "The Walking Jumbo",
    title: "Global Web Development Agency | Next.js, AI & SaaS | TWJ Labs",
    description:
      "World-class web development from India. Next.js, AI, and SaaS for clients in the US, UK, Australia, New Zealand & Europe — at a fraction of Western agency costs.",
    images: [
      {
        url: `${baseUrl}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "TWJ Labs - Global Web Development Agency based in India",
        type: "image/png",
      },
    ],
  },

  twitter: {
    ...twitterDefaults,
    title: "Global Web Development Agency | Next.js, AI & SaaS | TWJ Labs",
    description:
      "World-class Next.js & AI development from India. Serving US, UK, AU, NZ & Europe. Free consultation.",
    images: [`${baseUrl}/opengraph-image.png`],
  },

  category: "technology",
  formatDetection: { email: false, address: false, telephone: false },
};

// ─── Page Component ───────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient />
    </>
  );
}