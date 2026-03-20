import FeaturesSection from '@/components/home/features-1'
import ServicesSection from '@/components/home/services-section'
import TestimonialsSection from '@/components/home/testimonials'
import TheTWJDifference from '@/components/home/twj-difference'
import WhatWeDoSection from '@/components/home/what-we-do'
import OtherServicesPricing from '@/components/pricing/other-services-pricing'
import PricingSection from '@/components/pricing/pricing-section-other'
import CaseStudiesSection from '@/components/shared/case-studies'
import FaqsSection from '@/components/shared/faqs'
import UseCasesHeroSection from '@/components/use-cases/hero'
import UseCasesWhySharedIndustrySection from '@/components/use-cases/why'
import { useCases } from '@/data/use-cases'
import { Metadata, ResolvingMetadata } from 'next'
import React from 'react'

import {
  baseUrl, buildHreflangAlternates, globalAreaServed,
  twitterDefaults, robotsDefaults, globalKeywords,
} from "@/lib/seo";


type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Record<string, string | string[]>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const industryLink = slug.startsWith("for-") ? slug.replace("for-", "") : slug;
  const currentUseCase = useCases
    .find(s => s.cases.find(c => c.link === industryLink))
    ?.cases.find(c => c.link === industryLink);

  if (!currentUseCase) return {};

  const industryName = currentUseCase.title;
  const pageUrl = `${baseUrl}/use-cases/${slug}`;
  const description =
    currentUseCase.description?.slice(0, 140) ||
    `Best web development agency for ${industryName}. TWJ Labs builds high-performance Next.js websites and SaaS for ${industryName} businesses in the US, UK, AU & India.`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        url: pageUrl,
        name: `Web Development for ${industryName} | TWJ Labs`,
        description,
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
            { "@type": "ListItem", position: 2, name: "Use Cases", item: `${baseUrl}/use-cases` },
            { "@type": "ListItem", position: 3, name: industryName, item: pageUrl },
          ],
        },
        publisher: { "@id": `${baseUrl}/#organization` },
      },
      {
        "@type": "Service",
        name: `Web Development for ${industryName}`,
        description,
        url: pageUrl,
        provider: { "@id": `${baseUrl}/#organization` },
        areaServed: globalAreaServed,
        audience: { "@type": "Audience", audienceType: `${industryName} businesses and startups worldwide` },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: `Why does a ${industryName} business need a custom website?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `A custom website for ${industryName} built by TWJ Labs is optimized for your industry's specific user journeys, compliance requirements, and conversion goals — unlike generic templates that miss sector-specific nuance.`,
            },
          },
          {
            "@type": "Question",
            name: `Can TWJ Labs build a website for a ${industryName} company in the US or UK?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Yes. We have experience building web products for ${industryName} businesses in the US, UK, Australia, and India. Our team handles everything from discovery to launch with full async communication and weekly check-ins.`,
            },
          },
        ],
      },
    ],
  };

  return {
    title: `Web Development for ${industryName} | India Agency for Global Clients | TWJ Labs`,
    description: `${description.slice(0, 155)}.`,

    keywords: [
      `web development for ${industryName}`,
      `${industryName} website agency India`,
      `${industryName} software development India`,
      `best web agency for ${industryName}`,
      `${industryName} SaaS development`,
      `outsource web development ${industryName}`,
      ...globalKeywords.global,
    ],

    alternates: buildHreflangAlternates(`/use-cases/${slug}`),

    openGraph: {
      type: "website",
      locale: "en_US",
      url: pageUrl,
      siteName: "The Walking Jumbo",
      title: `Web Development for ${industryName} | TWJ Labs`,
      description,
      images: [{ url: `${baseUrl}/opengraph-image.png`, width: 1200, height: 630 }],
    },
    twitter: {
      ...twitterDefaults,
      title: `Web Dev for ${industryName} | TWJ Labs India`,
      description,
      images: [`${baseUrl}/opengraph-image.png`],
    },
    robots: robotsDefaults,

    other: { "ld+json": JSON.stringify(jsonLd) },
  };
}

// In your page component, inject JSON-LD:
const UsecaseSlugPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const industryLink = slug.startsWith("for-") ? slug.replace("for-", "") : slug;
  const currentUseCase = useCases
    .find(s => s.cases.find(c => c.link === industryLink))
    ?.cases.find(c => c.link === industryLink);

  if (!currentUseCase) return <div className="text-white p-10">Use case not found.</div>;

  const pageUrl = `${baseUrl}/use-cases/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Web Development for ${currentUseCase.title}`,
    url: pageUrl,
    provider: { "@type": "Organization", name: "The Walking Jumbo", url: baseUrl },
    areaServed: globalAreaServed,
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <UseCasesHeroSection useCase={currentUseCase} />
      <UseCasesWhySharedIndustrySection useCase={currentUseCase} />
      <TheTWJDifference />
      <FeaturesSection />
      <PricingSection />
      <OtherServicesPricing />
      <ServicesSection />
      <CaseStudiesSection darkMode={true} />
      <TestimonialsSection darkMode={true} />
      <FaqsSection darkMode={true} />
    </div>
  );
};

export default UsecaseSlugPage;