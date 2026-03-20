
import HeroAccessibility from '@/components/accessibility/hero'
import TestimonialsSection from '@/components/home/testimonials'
import TheTWJDifference from '@/components/home/twj-difference'
import CaseStudiesSection from '@/components/shared/case-studies'
import FaqsSection from '@/components/shared/faqs'
import OurProcessDynamic from '@/components/shared/our-process'
import PricingShared from '@/components/shared/pricing'
import SubservicesShared from '@/components/shared/subservices'
import React from 'react'


import { ProcessType } from '@/types'
import WhyAccessibility from '@/components/accessibility/why'

import {
  baseUrl, buildHreflangAlternates, globalAreaServed,
  twitterDefaults, robotsDefaults, globalKeywords,
} from "@/lib/seo";
import { getTranslations } from 'next-intl/server'
import { Metadata } from 'next'

const pageUrl = `${baseUrl}/services/accessibility`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Web Accessibility Services",
      description:
        "WCAG 2.1/2.2 compliance audits, remediation, and accessibility consulting for websites and web apps. Serving clients in the US, UK, Australia, New Zealand, and India.",
      url: pageUrl,
      provider: { "@id": `${baseUrl}/#organization` },
      areaServed: globalAreaServed,
      serviceType: "Web Accessibility",
      audience: { "@type": "Audience", audienceType: "Businesses, Startups, Government, Healthcare" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
        { "@type": "ListItem", position: 2, name: "Services", item: `${baseUrl}/services` },
        { "@type": "ListItem", position: 3, name: "Accessibility", item: pageUrl },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is WCAG and why does my website need to comply?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "WCAG (Web Content Accessibility Guidelines) is the international standard for making web content accessible to people with disabilities. In the US (ADA), UK (Equality Act), Australia (DDA), and EU (EAA), non-compliance can result in legal action. TWJ Labs provides full WCAG 2.1/2.2 audit and remediation services.",
          },
        },
        {
          "@type": "Question",
          name: "How much does a web accessibility audit cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Web accessibility audits at TWJ Labs start from ₹25,000 (~$300 USD) for small websites. Full remediation projects are scoped based on the site's size and complexity. Contact us for a free estimate.",
          },
        },
        {
          "@type": "Question",
          name: "Can TWJ Labs fix accessibility issues for US or UK websites?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We work with clients across the US, UK, Australia, and Europe to audit and remediate accessibility issues in compliance with ADA, WCAG 2.1/2.2, and local regulations. All work is done remotely with full async communication.",
          },
        },
      ],
    },
  ],
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServicePages.accessibility.Metadata" });

  return {
    title: "Web Accessibility Services (WCAG 2.2) | India Agency for US, UK & AU | TWJ Labs",
    description:
      "WCAG 2.1/2.2 compliance audits and remediation by TWJ Labs. ADA, EAA & DDA compliant websites for clients in the US, UK, Australia, New Zealand & India. Offshore pricing.",

    keywords: [
      "web accessibility services India",
      "WCAG 2.2 compliance agency",
      "ADA compliance website India",
      "web accessibility audit USA",
      "WCAG audit agency UK",
      "accessibility remediation Australia",
      "Section 508 compliance agency India",
      "screen reader optimization",
      "keyboard navigation audit",
      "offshore accessibility agency",
      ...globalKeywords.global,
    ],

    alternates: buildHreflangAlternates("/services/accessibility"),

    openGraph: {
      type: "website", locale: "en_US", url: pageUrl, siteName: "The Walking Jumbo",
      title: "Web Accessibility Services (WCAG 2.2) | TWJ Labs India",
      description: "ADA & WCAG compliant websites for US, UK, AU & NZ clients. Offshore rates, world-class quality.",
      images: [{ url: `${baseUrl}/opengraph-image.png`, width: 1200, height: 630 }],
    },
    twitter: { ...twitterDefaults, title: "Web Accessibility Services | TWJ Labs", description: "WCAG 2.2 compliance for US, UK & AU clients. India-based, globally delivered.", images: [`${baseUrl}/opengraph-image.png`] },
    robots: robotsDefaults,
  };
}

const AccessibilityPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ServicePages.accessibility' });

  const process: ProcessType[] = [
    {
      step: 1,
      title: t('Process.steps.0.title'),
      description: t('Process.steps.0.description'),
      image: "/mnt/data/8b6a8783-faae-46cc-a37b-ad98a09bd0d2.png",
      icon: 'AccessibilityIcon',
    },
    {
      step: 2,
      title: t('Process.steps.1.title'),
      description: t('Process.steps.1.description'),
      image: "/mnt/data/8b6a8783-faae-46cc-a37b-ad98a09bd0d2.png",
      icon: 'AlertTriangleIcon',
    },
    {
      step: 3,
      title: t('Process.steps.2.title'),
      description: t('Process.steps.2.description'),
      image: "/mnt/data/8b6a8783-faae-46cc-a37b-ad98a09bd0d2.png",
      icon: 'CodeIcon',
    },
    {
      step: 4,
      title: t('Process.steps.3.title'),
      description: t('Process.steps.3.description'),
      image: "/mnt/data/8b6a8783-faae-46cc-a37b-ad98a09bd0d2.png",
      icon: 'CheckCircleIcon',
    },
  ];

  const subservices = [
    {
      title: t('Subservices.items.0.title'),
      description: t('Subservices.items.0.description'),
      icon: 'FileSearchIcon',
    },
    {
      title: t('Subservices.items.1.title'),
      description: t('Subservices.items.1.description'),
      icon: 'EyeIcon',
    },
    {
      title: t('Subservices.items.2.title'),
      description: t('Subservices.items.2.description'),
      icon: 'DropletIcon',
    },
    {
      title: t('Subservices.items.3.title'),
      description: t('Subservices.items.3.description'),
      icon: 'KeyboardIcon',
    },
    {
      title: t('Subservices.items.4.title'),
      description: t('Subservices.items.4.description'),
      icon: 'TagIcon',
    },
    {
      title: t('Subservices.items.5.title'),
      description: t('Subservices.items.5.description'),
      icon: 'SpeakerIcon',
    },
    {
      title: t('Subservices.items.6.title'),
      description: t('Subservices.items.6.description'),
      icon: 'BookOpenIcon',
    },
    {
      title: t('Subservices.items.7.title'),
      description: t('Subservices.items.7.description'),
      icon: 'ShieldCheckIcon',
    },
  ];

  return (
    <div className='font-manrope text-white'>
      <HeroAccessibility />
      <WhyAccessibility />
      <OurProcessDynamic process={process} title={t('Process.title')} darkMode={true} image={'/accessibility-step.svg'} />
      <SubservicesShared subservices={subservices} darkMode={true} title={t('Subservices.title')} />
      <PricingShared forTitle={t('Pricing.forTitle')} title={t('Pricing.title')} darkMode={true} />
      <TheTWJDifference />
      <CaseStudiesSection darkMode={true} />
      <TestimonialsSection darkMode={true} />
      <FaqsSection darkMode={true} />
    </div>
  )
}

export default AccessibilityPage