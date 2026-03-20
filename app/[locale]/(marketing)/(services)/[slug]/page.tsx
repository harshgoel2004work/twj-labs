/**
 * ============================================================
 * FILE: app/[locale]/(marketing)/(services)/[slug]/page.tsx
 * ============================================================
 */

import TestimonialsSection from '@/components/home/testimonials'
import TheTWJDifference from '@/components/home/twj-difference'
import CaseStudiesSection from '@/components/shared/case-studies'
import FaqsSection from '@/components/shared/faqs'
import OurProcessDynamicAlt from '@/components/shared/our-process-2'
import GenericFeaturesSection from '@/components/slug/generic-features'
import GenericHeroPage from '@/components/slug/generic-hero'
import { services } from '@/data/services'
import { Metadata, ResolvingMetadata } from 'next'
import React from 'react'
import {
  baseUrl,
  buildHreflangAlternates,
  globalAreaServed,
  twitterDefaults,
  robotsDefaults,
  globalKeywords,
} from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string; locale: string }>;
  searchParams: Record<string, string | string[]>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const activeSlug = services[1].servicesList.find(s => s.slug === slug);

  if (!activeSlug) return {};

  const serviceName = activeSlug.name;
  const serviceUrl = `${baseUrl}/services/${slug}`;
  const description = activeSlug.description
    ? `${activeSlug.description.slice(0, 115)}. Expert ${serviceName} by TWJ Labs — India-based, serving US, UK, AU & NZ clients.`
    : `Top-rated ${serviceName} agency based in India. TWJ Labs serves clients across the US, UK, Australia, New Zealand & Europe. World-class quality, offshore pricing.`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${serviceUrl}/#service`,
        name: serviceName,
        description: activeSlug.description || `Professional ${serviceName} for global businesses.`,
        url: serviceUrl,
        provider: {
          "@type": "Organization",
          "@id": `${baseUrl}/#organization`,
          name: "The Walking Jumbo",
        },
        // All 5 target markets in areaServed
        areaServed: globalAreaServed,
        serviceType: serviceName,
        audience: {
          "@type": "Audience",
          audienceType: "Startups, SMEs, and Enterprises in US, UK, Australia, New Zealand, India, and Europe",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Services", item: `${baseUrl}/services` },
          { "@type": "ListItem", position: 3, name: serviceName, item: serviceUrl },
        ],
      },
      {
        // FAQPage: captures "how much / why India / how long" featured snippets
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: `How much does ${serviceName} cost compared to US or UK agencies?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `${serviceName} at TWJ Labs is typically 40–70% more affordable than equivalent US or UK agencies, without compromising on quality. Our India-based team delivers world-class work at competitive rates. Contact us for a custom quote.`,
            },
          },
          {
            "@type": "Question",
            name: `Can TWJ Labs handle ${serviceName} for clients in the US, UK, or Australia?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Absolutely. TWJ Labs has worked with clients across the United States, United Kingdom, Australia, New Zealand, and Europe. We operate with flexible time zones, async communication, and regular video calls to ensure seamless collaboration regardless of location.`,
            },
          },
          {
            "@type": "Question",
            name: `How long does ${serviceName} take at TWJ Labs?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Most ${serviceName} projects at TWJ Labs are delivered within 4–12 weeks depending on scope. We use agile delivery with weekly progress updates and full transparency throughout.`,
            },
          },
          {
            "@type": "Question",
            name: `Why outsource ${serviceName} to an Indian agency like TWJ Labs?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `India has a world-class pool of Next.js and AI engineering talent. TWJ Labs combines technical excellence with strong English communication, modern tooling, and a proven track record — giving you enterprise-grade output at a fraction of Western agency pricing.`,
            },
          },
        ],
      },
    ],
  };

  return {
    // Title appeals globally: "Best X Agency" works across all markets
    title: `${serviceName} Agency | India-Based, Globally Delivered | TWJ Labs`,
    description,

    keywords: [
      // Service + global market intent
      `${serviceName} agency`,
      `${serviceName} company India`,
      `outsource ${serviceName} India`,
      `hire ${serviceName} developer India`,
      `${serviceName} for startups`,
      `${serviceName} agency US`,
      `${serviceName} agency UK`,
      `${serviceName} agency Australia`,
      `affordable ${serviceName} agency`,
      `offshore ${serviceName} agency`,
      // Global offshore keywords
      ...globalKeywords.global,
      "TWJ Labs",
    ],

    alternates: buildHreflangAlternates(`/services/${slug}`),

    openGraph: {
      type: "website",
      locale: "en_US",
      url: serviceUrl,
      siteName: "The Walking Jumbo",
      title: `${serviceName} Agency | India-Based, Globally Delivered | TWJ Labs`,
      description,
      images: [{ url: `${baseUrl}/opengraph-image.png`, width: 1200, height: 630, alt: `${serviceName} - TWJ Labs` }],
    },

    twitter: {
      ...twitterDefaults,
      title: `${serviceName} Agency | TWJ Labs`,
      description,
      images: [`${baseUrl}/opengraph-image.png`],
    },

    robots: robotsDefaults,

    other: { "ld+json": JSON.stringify(jsonLd) },
  };
}

const OtherServicesSlugPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const activeSlug = services[1].servicesList.find(service => service.slug === slug);

  if (!activeSlug || !activeSlug.webPageContent?.heroSection || !activeSlug.webPageContent?.featuresSection?.features) {
    return (
      <div className='w-full h-screen flex items-center justify-center font-manrope text-gray-500'>
        Service Not Found
      </div>
    );
  }

  const serviceUrl = `${baseUrl}/services/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: activeSlug.name,
        description: activeSlug.description,
        url: serviceUrl,
        provider: { "@type": "Organization", name: "The Walking Jumbo", url: baseUrl },
        areaServed: globalAreaServed,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Services", item: `${baseUrl}/services` },
          { "@type": "ListItem", position: 3, name: activeSlug.name, item: serviceUrl },
        ],
      },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GenericHeroPage data={activeSlug.webPageContent.heroSection} />
      {activeSlug.slug && (
        <GenericFeaturesSection
          slug={activeSlug.slug}
          title={activeSlug.webPageContent.featuresSection.title}
        />
      )}
      {activeSlug.slug && (
        <OurProcessDynamicAlt
          slug={activeSlug.slug}
          darkMode={false}
          title={`Process For ${activeSlug.name}`}
        />
      )}
      <TheTWJDifference />
      <CaseStudiesSection darkMode={true} />
      <TestimonialsSection darkMode={true} />
      <FaqsSection darkMode={true} />
    </div>
  );
};

export default OtherServicesSlugPage;