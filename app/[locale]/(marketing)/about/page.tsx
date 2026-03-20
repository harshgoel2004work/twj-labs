import AboutHero from '@/components/about/hero'
import ToolsSection from '@/components/about/tools'
import DarkVeil from '@/components/DarkVeil'
import CaseStudiesSection from '@/components/shared/case-studies'
import FaqsSection from '@/components/shared/faqs'
import React from 'react'
import { getTranslations } from "next-intl/server";

import { Metadata } from "next";
import {
  baseUrl, buildHreflangAlternates, globalAreaServed,
  twitterDefaults, robotsDefaults,
} from "@/lib/seo";

const pageUrl = `${baseUrl}/about`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      // AboutPage signals E-E-A-T (Experience, Expertise, Authoritativeness, Trust)
      // to Google — critical for agency credibility in international search.
      "@type": "AboutPage",
      "@id": `${pageUrl}/#webpage`,
      url: pageUrl,
      name: "About TWJ Labs | India's Global Web Development Agency",
      description:
        "Learn about TWJ Labs — a web development agency based in Ghaziabad, India, serving clients across the US, UK, Australia, New Zealand & Europe with world-class Next.js, AI, and SaaS development.",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "About", item: pageUrl },
        ],
      },
      publisher: { "@id": `${baseUrl}/#organization` },
      about: { "@id": `${baseUrl}/#organization` },
    },
    {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "The Walking Jumbo",
      alternateName: "TWJ Labs",
      url: baseUrl,
      foundingDate: "2022",
      founders: [{ "@type": "Person", name: "Harsh Goel", url: "https://www.linkedin.com/in/harshgoel-cs" }],
      description:
        "TWJ Labs (The Walking Jumbo) is a global web development agency based in Ghaziabad, India. We build Next.js websites, AI-powered SaaS products, and e-commerce for clients in the US, UK, Australia, New Zealand, Europe, and India.",
      areaServed: globalAreaServed,
      slogan: "World-Class Web Development. India-Based. Globally Delivered.",
      knowsAbout: ["Next.js", "React", "AI Integration", "SaaS Development", "E-commerce", "UI/UX Design"],
    },
  ],
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return {
    title: "About TWJ Labs | India's Global Web Development Agency",
    description:
      "Meet the team behind TWJ Labs. A Ghaziabad-based web development agency delivering world-class Next.js, AI & SaaS products to clients in the US, UK, Australia, New Zealand & Europe.",

    keywords: [
      "about TWJ Labs",
      "The Walking Jumbo agency",
      "web development agency India team",
      "Indian software agency for global clients",
      "who is TWJ Labs",
      "Harsh Goel web developer",
      "best Indian web agency international",
      "India-based global web agency",
    ],

    alternates: buildHreflangAlternates("/about"),

    openGraph: {
      type: "profile",
      locale: "en_US",
      url: pageUrl,
      siteName: "The Walking Jumbo",
      title: "About TWJ Labs | India's Global Web Development Agency",
      description: "India-based, globally trusted. Meet the team building world-class Next.js, AI & SaaS products.",
      images: [{ url: `${baseUrl}/opengraph-image.png`, width: 1200, height: 630 }],
    },
    twitter: { ...twitterDefaults, title: "About TWJ Labs", description: "India-based, globally trusted web agency. Next.js, AI & SaaS.", images: [`${baseUrl}/opengraph-image.png`] },
    robots: robotsDefaults,
  };
}
const AboutPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  await params;
  return (
    <div>
      {/* ── Ambient background glows ── */}
      <div className="pointer-events-none absolute inset-0 ">
        <div className="opacity-50" style={{ width: "100%", height: "900px", position: "relative" }}>
          <DarkVeil
            hueShift={2}
            noiseIntensity={0}
            scanlineIntensity={0}
            speed={1}
            scanlineFrequency={0}
            warpAmount={2}
          />
        </div>
      </div>
      <div className='h-[50vh]'>

      </div>
      <AboutHero />
      <ToolsSection />
      {/* <AboutBento /> */}
      <CaseStudiesSection darkMode={true} />
      <FaqsSection darkMode={true} />
    </div>
  )
}

export default AboutPage