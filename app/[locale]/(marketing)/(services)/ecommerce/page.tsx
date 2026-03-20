import EcommerceFeatures from '@/components/ecommerce/features'
import HeroEcommerce from '@/components/ecommerce/hero'
import WhyEcommerce from '@/components/ecommerce/why-ecommerce'
import TestimonialsSection from '@/components/home/testimonials'
import TheTWJDifference from '@/components/home/twj-difference'
import CaseStudiesSection from '@/components/shared/case-studies'
import FaqsSection from '@/components/shared/faqs'
import OurProcessDynamic from '@/components/shared/our-process'
import PricingShared from '@/components/shared/pricing'
import SubservicesShared from '@/components/shared/subservices'
import { ProcessType } from '@/types'
import { Metadata } from 'next'


import { getTranslations } from 'next-intl/server';

import {
  baseUrl, buildHreflangAlternates, globalAreaServed,
  twitterDefaults, robotsDefaults, globalKeywords,
} from "@/lib/seo";

const pageUrl = `${baseUrl}/services/ecommerce`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "E-commerce Development",
      description:
        "Shopify, custom Next.js e-commerce, and headless commerce solutions. India-based agency serving US, UK, Australia & global clients.",
      url: pageUrl,
      provider: { "@id": `${baseUrl}/#organization` },
      areaServed: globalAreaServed,
      serviceType: "E-commerce Development",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
        { "@type": "ListItem", position: 2, name: "Services", item: `${baseUrl}/services` },
        { "@type": "ListItem", position: 3, name: "E-commerce Development", item: pageUrl },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Can you build a Shopify store for a US or UK brand?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. TWJ Labs has built custom Shopify themes and headless Shopify storefronts for brands in the US, UK, and Australia. We handle everything from design to checkout optimization and post-launch support.",
          },
        },
        {
          "@type": "Question",
          name: "What is the cost of e-commerce development in India compared to the US?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "E-commerce development at TWJ Labs typically costs 40–65% less than equivalent US or UK agencies. A Shopify custom theme starts from ~$800 USD, while a full headless commerce build starts from ~$5,000 USD.",
          },
        },
        {
          "@type": "Question",
          name: "Do you support multi-currency and international shipping for global stores?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We build e-commerce stores with full multi-currency support, international shipping integrations, localized tax handling, and region-specific payment gateways (Stripe, PayPal, Razorpay, etc.).",
          },
        },
      ],
    },
  ],
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return {
    title: "E-commerce Development Agency | Shopify & Custom | India-Based | TWJ Labs",
    description:
      "Shopify, headless commerce & custom e-commerce stores by TWJ Labs. India-based agency for US, UK, Australian & NZ brands. 40–65% below Western agency rates.",

    keywords: [
      "ecommerce development agency India",
      "Shopify development India",
      "headless commerce development India",
      "hire Shopify developer India USA",
      "ecommerce website development UK",
      "Shopify agency Australia",
      "WooCommerce development India",
      "custom ecommerce store India",
      "offshore ecommerce development",
      "Next.js ecommerce agency",
      ...globalKeywords.global,
    ],

    alternates: buildHreflangAlternates("/services/ecommerce"),

    openGraph: {
      type: "website", locale: "en_US", url: pageUrl, siteName: "The Walking Jumbo",
      title: "E-commerce Development | Shopify & Custom | TWJ Labs India",
      description: "Shopify, headless & custom stores for US, UK, AU & NZ brands. Offshore pricing, world-class quality.",
      images: [{ url: `${baseUrl}/opengraph-image.png`, width: 1200, height: 630 }],
    },
    twitter: { ...twitterDefaults, title: "E-commerce Agency | TWJ Labs India", description: "Shopify & custom stores at 40–65% below US/UK rates.", images: [`${baseUrl}/opengraph-image.png`] },
    robots: robotsDefaults,
  };
}

const EcommercePage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ServicePages.ecommerce' });

  const process: ProcessType[] = [
    {
      step: 1,
      title: t('Process.steps.0.title'),
      description: t('Process.steps.0.description'),
      image: "/our-process/ecommerce/1.png",
      icon: 'FaSearch',
    },
    {
      step: 2,
      title: t('Process.steps.1.title'),
      description: t('Process.steps.1.description'),
      image: "/our-process/ecommerce/2.png",
      icon: 'FaPencilRuler',
    },
    {
      step: 3,
      title: t('Process.steps.2.title'),
      description: t('Process.steps.2.description'),
      image: "/our-process/ecommerce/3.png",
      icon: 'FaCode',
    },
    {
      step: 4,
      title: t('Process.steps.3.title'),
      description: t('Process.steps.3.description'),
      image: "/our-process/ecommerce/4.png",
      icon: 'FaRocket',
    },
  ];

  const subservices = [
    {
      title: t('Subservices.items.0.title'),
      description: t('Subservices.items.0.description'),
      icon: 'StoreIcon',
    },
    {
      title: t('Subservices.items.1.title'),
      description: t('Subservices.items.1.description'),
      icon: 'IoColorPalette',
    },
    {
      title: t('Subservices.items.2.title'),
      description: t('Subservices.items.2.description'),
      icon: 'AppWindow',
    },
    {
      title: t('Subservices.items.3.title'),
      description: t('Subservices.items.3.description'),
      icon: 'ShoppingCartIcon',
    },
    {
      title: t('Subservices.items.4.title'),
      description: t('Subservices.items.4.description'),
      icon: 'FaShopify',
    },
    {
      title: t('Subservices.items.5.title'),
      description: t('Subservices.items.5.description'),
      icon: 'AppWindow',
    }
  ];

  return (
    <div>
      <HeroEcommerce />
      <EcommerceFeatures />
      <WhyEcommerce />
      <OurProcessDynamic process={process} title={t('Process.title')} image={'/shopify-step.svg'} darkMode={true} />

      <SubservicesShared subservices={subservices} darkMode={true} title={t('Subservices.title')} />
      <PricingShared forTitle={t('Pricing.forTitle')} title={t('Pricing.title')} darkMode={false} />
      <TheTWJDifference />

      <CaseStudiesSection darkMode={true} />
      <TestimonialsSection darkMode={true} />
      <FaqsSection darkMode={true} />
    </div>
  )
}

export default EcommercePage