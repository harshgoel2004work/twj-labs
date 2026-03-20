import TestimonialsSection from '@/components/home/testimonials';
import TheTWJDifference from '@/components/home/twj-difference';
import CaseStudiesSection from '@/components/shared/case-studies';
import FaqsSection from '@/components/shared/faqs';
import OurProcessDynamic from '@/components/shared/our-process'
import PricingShared from '@/components/shared/pricing';
import SubservicesShared from '@/components/shared/subservices';
import HeroWordpress from '@/components/webflow-wordpres/hero-wordpress';
import { ProcessType } from '@/types';
import { Metadata } from 'next';




import { getTranslations } from 'next-intl/server';

import {
  baseUrl, buildHreflangAlternates, globalAreaServed,
  twitterDefaults, robotsDefaults, globalKeywords,
} from "@/lib/seo";

const pageUrl = `${baseUrl}/services/wordpress`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "WordPress Development",
      description:
        "Custom WordPress themes, plugin development, WooCommerce, and WordPress maintenance. India-based agency for US, UK, AU & global clients.",
      url: pageUrl,
      provider: { "@id": `${baseUrl}/#organization` },
      areaServed: globalAreaServed,
      serviceType: "WordPress Development",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
        { "@type": "ListItem", position: 2, name: "Services", item: `${baseUrl}/services` },
        { "@type": "ListItem", position: 3, name: "WordPress Development", item: pageUrl },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How much does WordPress development cost in India?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "WordPress development at TWJ Labs starts from ₹20,000 (~$240 USD) for simple sites, and scales for custom themes, plugins, and WooCommerce stores. This is 40–65% lower than US or UK WordPress agencies.",
          },
        },
        {
          "@type": "Question",
          name: "Can you migrate my existing website to WordPress?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We handle full website migrations to WordPress from any platform — including Squarespace, Wix, Webflow, and custom sites — preserving SEO, content, and design integrity.",
          },
        },
      ],
    },
  ],
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return {
    title: "WordPress Development Agency | India-Based for US, UK & AU | TWJ Labs",
    description:
      "Custom WordPress themes, WooCommerce & plugin development by TWJ Labs. India-based WordPress agency for US, UK, Australian & NZ clients. 40–65% below Western rates.",

    keywords: [
      "WordPress development agency India",
      "hire WordPress developer India",
      "WordPress agency for US clients",
      "WooCommerce development India",
      "custom WordPress theme India",
      "WordPress agency UK India",
      "WordPress plugin development India",
      "offshore WordPress developer",
      "WordPress maintenance India",
      ...globalKeywords.global,
    ],

    alternates: buildHreflangAlternates("/services/wordpress"),

    openGraph: {
      type: "website", locale: "en_US", url: pageUrl, siteName: "The Walking Jumbo",
      title: "WordPress Development Agency | India-Based | TWJ Labs",
      description: "Custom WordPress & WooCommerce for US, UK, AU & NZ clients at offshore pricing.",
      images: [{ url: `${baseUrl}/opengraph-image.png`, width: 1200, height: 630 }],
    },
    twitter: { ...twitterDefaults, title: "WordPress Agency | TWJ Labs India", description: "Custom WordPress & WooCommerce at 40–65% below US/UK rates.", images: [`${baseUrl}/opengraph-image.png`] },
    robots: robotsDefaults,
  };
}

const WordpressPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ServicePages.wordpress' });

  const process: ProcessType[] = [
    {
      step: 1,
      title: t('Process.steps.0.title'),
      description: t('Process.steps.0.description'),
      image: "/our-process/wordpress/1.png",
      icon: 'FaSearch',
    },
    {
      step: 2,
      title: t('Process.steps.1.title'),
      description: t('Process.steps.1.description'),
      image: "/our-process/wordpress/2.png",
      icon: 'FaPencilRuler',
    },
    {
      step: 3,
      title: t('Process.steps.2.title'),
      description: t('Process.steps.2.description'),
      image: "/our-process/wordpress/3.png",
      icon: 'FaCode',
    },
    {
      step: 4,
      title: t('Process.steps.3.title'),
      description: t('Process.steps.3.description'),
      image: "/our-process/wordpress/4.png",
      icon: 'FaRocket',
    },
  ];

  const subservices = [
    {
      title: t('Subservices.items.0.title'),
      description: t('Subservices.items.0.description'),
      icon: 'ServerIcon',
    },
    {
      title: t('Subservices.items.1.title'),
      description: t('Subservices.items.1.description'),
      icon: 'PaletteIcon',
    },
    {
      title: t('Subservices.items.2.title'),
      description: t('Subservices.items.2.description'),
      icon: 'PuzzleIcon',
    },
    {
      title: t('Subservices.items.3.title'),
      description: t('Subservices.items.3.description'),
      icon: 'GaugeIcon',
    },
    {
      title: t('Subservices.items.4.title'),
      description: t('Subservices.items.4.description'),
      icon: 'RefreshCcwIcon',
    },
    {
      title: t('Subservices.items.5.title'),
      description: t('Subservices.items.5.description'),
      icon: 'ShieldCheckIcon',
    },
    {
      title: t('Subservices.items.6.title'),
      description: t('Subservices.items.6.description'),
      icon: 'CodeIcon',
    },
    {
      title: t('Subservices.items.7.title'),
      description: t('Subservices.items.7.description'),
      icon: 'WrenchIcon',
    },
  ];

  return (
    <div>
      <HeroWordpress />
      {/* FEATURES */}
      <OurProcessDynamic process={process} title={t('Process.title')} darkMode={false} image='/wordpress-step.svg' />
      <SubservicesShared subservices={subservices} title={t('Subservices.title')} darkMode={false} />
      <PricingShared forTitle={t('Pricing.forTitle')} title={t('Pricing.title')} darkMode={true} />
      <TheTWJDifference />

      <CaseStudiesSection darkMode={true} />
      <TestimonialsSection darkMode={false} />
      <FaqsSection darkMode={false} />
    </div>
  )
}

export default WordpressPage