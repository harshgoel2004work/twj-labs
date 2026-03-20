import TestimonialsSection from '@/components/home/testimonials';
import TheTWJDifference from '@/components/home/twj-difference';
import CaseStudiesSection from '@/components/shared/case-studies';
import FaqsSection from '@/components/shared/faqs';
import OurProcessDynamic from '@/components/shared/our-process'
import PricingShared from '@/components/shared/pricing';
import SubservicesShared from '@/components/shared/subservices';
import HeroWebflow from '@/components/webflow-wordpres/hero-webflow'
import { ProcessType, SubserviceType } from '@/types';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import {
  baseUrl, buildHreflangAlternates, globalAreaServed,
  twitterDefaults, robotsDefaults, globalKeywords,
} from "@/lib/seo";

const pageUrl = `${baseUrl}/services/webflow`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Webflow Development",
      description:
        "Expert Webflow design, development, and CMS setup. India-based Webflow agency serving US, UK, AU & NZ clients at offshore pricing.",
      url: pageUrl,
      provider: { "@id": `${baseUrl}/#organization` },
      areaServed: globalAreaServed,
      serviceType: "Webflow Development",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
        { "@type": "ListItem", position: 2, name: "Services", item: `${baseUrl}/services` },
        { "@type": "ListItem", position: 3, name: "Webflow Development", item: pageUrl },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Can you build a Webflow site for a US or UK company?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely. TWJ Labs is a Webflow development agency that works with clients in the US, UK, Australia, New Zealand, and Europe. We build everything from marketing sites to complex CMS-driven Webflow projects at competitive offshore pricing.",
          },
        },
        {
          "@type": "Question",
          name: "How much does Webflow development cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Webflow projects at TWJ Labs start from ~$600 USD for simple landing pages, with full multi-page sites ranging from $1,500–$8,000 USD. This is typically 40–60% lower than US or UK Webflow agencies.",
          },
        },
      ],
    },
  ],
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return {
    title: "Webflow Development Agency | India-Based for US, UK & AU | TWJ Labs",
    description:
      "Expert Webflow design & development by TWJ Labs. India-based Webflow agency for US, UK, Australian & New Zealand clients. 40–60% below US agency rates. Free consultation.",

    keywords: [
      "Webflow development agency India",
      "hire Webflow developer India",
      "Webflow agency for US clients",
      "Webflow development UK India",
      "Webflow CMS development India",
      "offshore Webflow developer",
      "Webflow agency Australia",
      "Webflow design agency India",
      ...globalKeywords.global,
    ],

    alternates: buildHreflangAlternates("/services/webflow"),

    openGraph: {
      type: "website", locale: "en_US", url: pageUrl, siteName: "The Walking Jumbo",
      title: "Webflow Development Agency | India-Based | TWJ Labs",
      description: "Expert Webflow sites for US, UK, AU & NZ clients. Offshore pricing, world-class output.",
      images: [{ url: `${baseUrl}/opengraph-image.png`, width: 1200, height: 630 }],
    },
    twitter: { ...twitterDefaults, title: "Webflow Agency | TWJ Labs India", description: "Expert Webflow development at offshore rates for US/UK/AU clients.", images: [`${baseUrl}/opengraph-image.png`] },
    robots: robotsDefaults,
  };
}
const WebflowPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ServicePages.webflow' });

  const process: ProcessType[] = [
    {
      step: 1,
      title: t('Process.steps.0.title'),
      description: t('Process.steps.0.description'),
      image: "/our-process/webflow/1.png",
      icon: 'FaSearch',
    },
    {
      step: 2,
      title: t('Process.steps.1.title'),
      description: t('Process.steps.1.description'),
      image: "/our-process/webflow/2.png",
      icon: 'FaPencilRuler',
    },
    {
      step: 3,
      title: t('Process.steps.2.title'),
      description: t('Process.steps.2.description'),
      image: "/our-process/webflow/3.png",
      icon: 'FaCode',
    },
    {
      step: 4,
      title: t('Process.steps.3.title'),
      description: t('Process.steps.3.description'),
      image: "/our-process/webflow/4.png",
      icon: 'FaRocket',
    },
  ];

  const subservices: SubserviceType[] = [
    {
      title: t('Subservices.items.0.title'),
      description: t('Subservices.items.0.description'),
      icon: "FaWebflow",
    },
    {
      title: t('Subservices.items.1.title'),
      description: t('Subservices.items.1.description'),
      icon: 'IoColorPalette',
    },
    {
      title: t('Subservices.items.2.title'),
      description: t('Subservices.items.2.description'),
      icon: 'Database',
    },
    {
      title: t('Subservices.items.3.title'),
      description: t('Subservices.items.3.description'),
      icon: 'Zap',
    },
    {
      title: t('Subservices.items.4.title'),
      description: t('Subservices.items.4.description'),
      icon: 'ArrowUpRight',
    },
    {
      title: t('Subservices.items.5.title'),
      description: t('Subservices.items.5.description'),
      icon: 'CheckCircle',
    },
  ];

  return (
    <div>
      <HeroWebflow />
      {/* FEATURES */}
      <OurProcessDynamic process={process} title={t('Process.title')} darkMode={true} image='/webflow-step.svg' />
      <SubservicesShared subservices={subservices} title={t('Subservices.title')} darkMode={true} />
      <PricingShared forTitle={t('Pricing.forTitle')} title={t('Pricing.title')} darkMode={false} />
      <TheTWJDifference />

      <CaseStudiesSection darkMode={true} />
      <TestimonialsSection darkMode={true} />
      <FaqsSection darkMode={true} />
    </div>
  )
}

export default WebflowPage