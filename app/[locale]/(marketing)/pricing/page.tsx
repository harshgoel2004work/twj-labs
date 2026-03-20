import OtherServicesPricing from '@/components/pricing/other-services-pricing'
import React from 'react'
import TheTWJDifference from '@/components/home/twj-difference'
import TestimonialsSection from '@/components/home/testimonials'
import OurProjectProcess from '@/components/pricing/our-project-process'
import CaseStudiesSection from '@/components/shared/case-studies'
import FaqsSection from '@/components/shared/faqs'
import PricingHero from '@/components/pricing/pricing-hero'
import { Metadata } from 'next'
import {
  baseUrl,
  buildHreflangAlternates,
  globalAreaServed,
  twitterDefaults,
  robotsDefaults,
  globalKeywords,
} from "@/lib/seo";

const pageUrl = `${baseUrl}/pricing`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${pageUrl}/#webpage`,
      url: pageUrl,
      name: "Web Development Pricing | TWJ Labs — India-Based Agency",
      description:
        "Transparent pricing for Next.js, AI, SaaS, and e-commerce development. Competitive rates for US, UK, AU, NZ & India clients.",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Pricing", item: pageUrl },
        ],
      },
      publisher: { "@id": `${baseUrl}/#organization` },
    },
    {
      "@type": "Service",
      "@id": `${pageUrl}/#service`,
      name: "Web Development Services",
      provider: { "@type": "Organization", "@id": `${baseUrl}/#organization` },
      areaServed: globalAreaServed,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Web Development Packages",
        itemListElement: [
          {
            "@type": "Offer",
            name: "Starter Package",
            description: "Landing pages and brochure sites for early-stage startups globally.",
            // INR pricing — foreign clients understand this is the offshore advantage
            priceCurrency: "INR",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              minPrice: "15000",
              maxPrice: "50000",
              priceCurrency: "INR",
            },
          },
          {
            "@type": "Offer",
            name: "Business Package",
            description: "Full Next.js websites with CMS, SEO & integrations.",
            priceCurrency: "INR",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              minPrice: "50000",
              maxPrice: "200000",
              priceCurrency: "INR",
            },
          },
          {
            "@type": "Offer",
            name: "SaaS / AI Product",
            description: "Full-stack SaaS and AI-powered product for global startups.",
            priceCurrency: "INR",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              minPrice: "200000",
              priceCurrency: "INR",
            },
          },
        ],
      },
    },
    {
      // FAQPage: captures "how much does outsourcing web dev to India cost" — huge volume internationally
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How much does it cost to outsource web development to India?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Outsourcing web development to TWJ Labs in India costs 40–70% less than equivalent US, UK, or Australian agencies. A full Next.js website starts at around $500–$2,500 USD, while custom SaaS or AI products range from $2,500–$25,000 USD depending on complexity.",
          },
        },
        {
          "@type": "Question",
          name: "Do you accept payments in USD, GBP, AUD, or EUR?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. TWJ Labs accepts payments in USD, GBP, AUD, EUR, and INR via bank transfer, PayPal, Wise, and Stripe — making it easy for clients in the US, UK, Australia, New Zealand, and Europe.",
          },
        },
        {
          "@type": "Question",
          name: "Is the quality of work from an Indian agency as good as a US or UK agency?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "TWJ Labs uses the same modern tech stack (Next.js 14+, TypeScript, Tailwind CSS, AI APIs) as top agencies in the US and UK. Our portfolio includes clients from international markets who've consistently rated us on par with or better than local alternatives — at significantly lower cost.",
          },
        },
        {
          "@type": "Question",
          name: "How do you handle time zone differences for international clients?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We operate with async-first communication via Slack/Linear and schedule regular video calls at times that work for US, UK, Australian, and New Zealand clients. Most clients find our India-based team's overlap with European mornings and US evenings very convenient.",
          },
        },
        {
          "@type": "Question",
          name: "What payment schedules do you offer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "All projects use a milestone-based payment structure: 30% upfront, 40% at midpoint, and 30% on delivery. This protects both parties and ensures aligned incentives throughout the project.",
          },
        },
      ],
    },
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return {
    title: "Web Development Pricing | Affordable for US, UK, AU & NZ | TWJ Labs India",
    description:
      "Transparent web development pricing from India. Next.js, AI & SaaS at 40–70% less than US/UK agencies. Packages for startups to enterprises. Clients in US, UK, AU, NZ & Europe.",

    keywords: [
      // High-intent international price queries
      "outsource web development cost India",
      "web development pricing India USD",
      "how much does web development cost India",
      "affordable web agency for US companies",
      "cheap web development agency UK",
      "web development outsourcing cost Australia",
      "Indian agency pricing for international clients",
      "Next.js development cost USD",
      "offshore web development pricing",
      "SaaS development cost India",
      ...globalKeywords.global,
      // Domestic
      "web development cost India",
      "website pricing Ghaziabad",
    ],

    alternates: buildHreflangAlternates("/pricing"),

    openGraph: {
      type: "website",
      locale: "en_US",
      url: pageUrl,
      siteName: "The Walking Jumbo",
      title: "Affordable Web Dev Pricing | India Agency for US, UK & AU | TWJ Labs",
      description:
        "World-class Next.js, AI & SaaS development at 40–70% below US and UK rates. Transparent packages. No hidden fees.",
      images: [{ url: `${baseUrl}/opengraph-image.png`, width: 1200, height: 630 }],
    },

    twitter: {
      ...twitterDefaults,
      title: "Affordable Web Dev Pricing | TWJ Labs India",
      description: "Next.js, AI & SaaS at 40–70% less than US/UK agencies. Free consultation.",
      images: [`${baseUrl}/opengraph-image.png`],
    },

    robots: robotsDefaults,
  };
}

const PricingPage = () => {
  return (
    <div className='w-full min-h-screen font-manrope'>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PricingHero />
      <OtherServicesPricing />
      <OurProjectProcess namespace="PricingPage.Process" />
      <TheTWJDifference />
      <CaseStudiesSection darkMode={true} />
      <TestimonialsSection darkMode={true} />
      <FaqsSection darkMode={true} />
    </div>
  );
};

export default PricingPage;