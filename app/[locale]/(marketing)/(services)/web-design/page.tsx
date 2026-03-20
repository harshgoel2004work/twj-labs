import OurProcessDynamic from '@/components/shared/our-process'
import HeroWebDesign from '@/components/web-design/hero'
import React from 'react'



import { ProcessType } from '@/types'
import SubservicesShared from '@/components/shared/subservices'
import PricingShared from '@/components/shared/pricing'
import TheTWJDifference from '@/components/home/twj-difference'
import CaseStudiesSection from '@/components/shared/case-studies'
import TestimonialsSection from '@/components/home/testimonials'
import FaqsSection from '@/components/shared/faqs'
import { Metadata } from 'next'

import { getTranslations } from 'next-intl/server';

import {
  baseUrl, buildHreflangAlternates, globalAreaServed,
  twitterDefaults, robotsDefaults, globalKeywords,
} from "@/lib/seo";

const pageUrl = `${baseUrl}/services/web-design`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "UI/UX Web Design",
      description:
        "Pixel-perfect UI/UX design for websites and web apps. Figma to Next.js. India-based design studio serving US, UK, AU & global clients.",
      url: pageUrl,
      provider: { "@id": `${baseUrl}/#organization` },
      areaServed: globalAreaServed,
      serviceType: "Web Design",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
        { "@type": "ListItem", position: 2, name: "Services", item: `${baseUrl}/services` },
        { "@type": "ListItem", position: 3, name: "Web Design", item: pageUrl },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How much does web design cost in India compared to a UK or US agency?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Web design at TWJ Labs is 40–70% more affordable than equivalent UK or US design agencies. A full website design (Figma) starts from ~$500 USD, while full design + development packages start from ~$1,500 USD.",
          },
        },
        {
          "@type": "Question",
          name: "Do you design for international audiences and markets?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We design with global usability standards in mind — right-to-left layouts, accessibility compliance (WCAG 2.2), responsive design for all devices, and localisation-ready structures for US, UK, EU, AU, and NZ markets.",
          },
        },
      ],
    },
  ],
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return {
    title: "UI/UX Web Design Agency | India-Based for US, UK & AU | TWJ Labs",
    description:
      "Pixel-perfect UI/UX web design by TWJ Labs. Figma, responsive design & brand systems for clients in the US, UK, Australia & New Zealand. 40–70% below Western agency pricing.",

    keywords: [
      "web design agency India",
      "UI UX design company India",
      "Figma design agency India",
      "hire UI designer India USA",
      "web design agency UK India",
      "web design outsourcing Australia",
      "responsive web design India",
      "offshore UI UX design agency",
      "brand design agency India",
      "website design for startups India",
      ...globalKeywords.global,
    ],

    alternates: buildHreflangAlternates("/services/web-design"),

    openGraph: {
      type: "website", locale: "en_US", url: pageUrl, siteName: "The Walking Jumbo",
      title: "UI/UX Web Design Agency | India-Based, Globally Delivered | TWJ Labs",
      description: "Pixel-perfect Figma & Next.js design for US, UK & AU clients. Offshore pricing, world-class results.",
      images: [{ url: `${baseUrl}/opengraph-image.png`, width: 1200, height: 630 }],
    },
    twitter: { ...twitterDefaults, title: "Web Design Agency | TWJ Labs India", description: "Pixel-perfect UI/UX at 40–70% below US/UK rates.", images: [`${baseUrl}/opengraph-image.png`] },
    robots: robotsDefaults,
  };
}
const WebDesignPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ServicePages.webDesign' });

  const process: ProcessType[] = [
    {
      step: 1,
      title: t('Process.steps.0.title'),
      description: t('Process.steps.0.description'),
      image: "/mnt/data/8b6a8783-faae-46cc-a37b-ad98a09bd0d2.png",
      icon: 'SearchIcon',
    },
    {
      step: 2,
      title: t('Process.steps.1.title'),
      description: t('Process.steps.1.description'),
      image: "/mnt/data/8b6a8783-faae-46cc-a37b-ad98a09bd0d2.png",
      icon: 'LayoutDashboardIcon',
    },
    {
      step: 3,
      title: t('Process.steps.2.title'),
      description: t('Process.steps.2.description'),
      image: "/mnt/data/8b6a8783-faae-46cc-a37b-ad98a09bd0d2.png",
      icon: 'PenToolIcon',
    },
    {
      step: 4,
      title: t('Process.steps.3.title'),
      description: t('Process.steps.3.description'),
      image: "/mnt/data/8b6a8783-faae-46cc-a37b-ad98a09bd0d2.png",
      icon: 'Share2Icon',
    },
  ];

  const subservices = [
    {
      title: t('Subservices.items.0.title'),
      description: t('Subservices.items.0.description'),
      icon: 'MonitorSmartphoneIcon',
    },
    {
      title: t('Subservices.items.1.title'),
      description: t('Subservices.items.1.description'),
      icon: 'GitBranchIcon',
    },
    {
      title: t('Subservices.items.2.title'),
      description: t('Subservices.items.2.description'),
      icon: 'PlayCircleIcon',
    },
    {
      title: t('Subservices.items.3.title'),
      description: t('Subservices.items.3.description'),
      icon: 'BoxesIcon',
    },
    {
      title: t('Subservices.items.4.title'),
      description: t('Subservices.items.4.description'),
      icon: 'PaletteIcon',
    },
    {
      title: t('Subservices.items.5.title'),
      description: t('Subservices.items.5.description'),
      icon: 'SmartphoneIcon',
    },
  ];

  return (
    <div>
      <HeroWebDesign />

      <OurProcessDynamic process={process} title={t('Process.title')} darkMode={true} image={'/web-des-step.svg'} />
      <SubservicesShared subservices={subservices} darkMode={false} title={t('Subservices.title')} />
      <PricingShared forTitle={t('Pricing.forTitle')} title={t('Pricing.title')} darkMode={false} />
      <TheTWJDifference />
      <CaseStudiesSection darkMode={false} />
      <TestimonialsSection darkMode={false} />
      <FaqsSection darkMode={true} />
    </div>
  )
}

export default WebDesignPage