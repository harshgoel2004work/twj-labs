
import HeroCustomSoft from '@/components/custom-soft/hero'
import TestimonialsSection from '@/components/home/testimonials';
import TheTWJDifference from '@/components/home/twj-difference';
import CaseStudiesSection from '@/components/shared/case-studies';
import FaqsSection from '@/components/shared/faqs';
import OurProcessDynamic from '@/components/shared/our-process'
import PricingShared from '@/components/shared/pricing';
import SubservicesShared from '@/components/shared/subservices';
import { ProcessType } from '@/types';
import { Metadata } from "next";
import {
  baseUrl, buildHreflangAlternates, globalAreaServed,
  twitterDefaults, robotsDefaults, globalKeywords,
} from "@/lib/seo";
import { getTranslations } from 'next-intl/server';

const pageUrl = `${baseUrl}/services/custom-software`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Custom Software Development",
      description:
        "Bespoke web applications, internal tools, and business software built with React, Next.js, and modern tech. India-based development for global clients.",
      url: pageUrl,
      provider: { "@id": `${baseUrl}/#organization` },
      areaServed: globalAreaServed,
      serviceType: "Custom Software Development",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
        { "@type": "ListItem", position: 2, name: "Services", item: `${baseUrl}/services` },
        { "@type": "ListItem", position: 3, name: "Custom Software", item: pageUrl },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Why outsource custom software development to India?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "India offers world-class software engineering talent at 40–70% lower cost than US, UK, or Australian agencies. TWJ Labs combines technical excellence with strong English communication, modern tooling (Next.js, TypeScript), and a proven delivery record for global clients.",
          },
        },
        {
          "@type": "Question",
          name: "What types of custom software does TWJ Labs build?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We build SaaS platforms, internal business tools, admin dashboards, CRM systems, API integrations, data pipelines, and full-stack web applications using React, Next.js, Node.js, and various database and cloud technologies.",
          },
        },
        {
          "@type": "Question",
          name: "How do you handle custom software projects for US or Australian clients?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We use async-first project management via Linear and Slack, schedule weekly video calls at client-friendly times, and provide full transparency through shared dashboards. Most US and AU clients find our workflow seamless despite the time zone difference.",
          },
        },
      ],
    },
  ],
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return {
    title: "Custom Software Development Agency | India-Based for US, UK & AU | TWJ Labs",
    description:
      "Bespoke web apps, SaaS, and internal tools built by TWJ Labs. India-based team serving the US, UK, Australia & Europe. 40–70% below Western agency costs. Free consultation.",

    keywords: [
      "custom software development India",
      "outsource software development India",
      "bespoke web application India",
      "hire software developers India USA",
      "custom web app agency UK",
      "software development outsourcing Australia",
      "Next.js custom software agency",
      "offshore software development company",
      "SaaS development agency India",
      "internal tools development India",
      ...globalKeywords.global,
    ],

    alternates: buildHreflangAlternates("/services/custom-software"),

    openGraph: {
      type: "website", locale: "en_US", url: pageUrl, siteName: "The Walking Jumbo",
      title: "Custom Software Development | India Agency for Global Clients | TWJ Labs",
      description: "Bespoke apps, SaaS & internal tools at offshore pricing. US, UK, AU & NZ clients served.",
      images: [{ url: `${baseUrl}/opengraph-image.png`, width: 1200, height: 630 }],
    },
    twitter: { ...twitterDefaults, title: "Custom Software Agency | TWJ Labs India", description: "Bespoke SaaS & web apps at 40–70% below US rates.", images: [`${baseUrl}/opengraph-image.png`] },
    robots: robotsDefaults,
  };
}

const CustomSoftwarePage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ServicePages.customSoftware' });

  const process: ProcessType[] = [
    {
      step: 1,
      title: t('Process.steps.0.title'),
      description: t('Process.steps.0.description'),
      image: "/our-process/software/1.png",
      icon: 'FaSearch',
    },
    {
      step: 2,
      title: t('Process.steps.1.title'),
      description: t('Process.steps.1.description'),
      image: "/our-process/software/2.png",
      icon: 'FaPencilRuler',
    },
    {
      step: 3,
      title: t('Process.steps.2.title'),
      description: t('Process.steps.2.description'),
      image: "/our-process/software/3.png",
      icon: 'FaCode',
    },
    {
      step: 4,
      title: t('Process.steps.3.title'),
      description: t('Process.steps.3.description'),
      image: "/our-process/software/4.png",
      icon: 'FaRocket',
    },
  ];

  const subservices = [
    {
      title: t('Subservices.items.0.title'),
      description: t('Subservices.items.0.description'),
      icon: 'Code2Icon',
    },
    {
      title: t('Subservices.items.1.title'),
      description: t('Subservices.items.1.description'),
      icon: 'PlugIcon',
    },
    {
      title: t('Subservices.items.2.title'),
      description: t('Subservices.items.2.description'),
      icon: 'LayoutIcon',
    },
    {
      title: t('Subservices.items.3.title'),
      description: t('Subservices.items.3.description'),
      icon: 'DatabaseIcon',
    },
    {
      title: t('Subservices.items.4.title'),
      description: t('Subservices.items.4.description'),
      icon: 'GaugeIcon',
    },
    {
      title: t('Subservices.items.5.title'),
      description: t('Subservices.items.5.description'),
      icon: 'BoxesIcon',
    },
    {
      title: t('Subservices.items.6.title'),
      description: t('Subservices.items.6.description'),
      icon: 'RepeatIcon',
    },
    {
      title: t('Subservices.items.7.title'),
      description: t('Subservices.items.7.description'),
      icon: 'WrenchIcon',
    },
  ];

  return (
    <div>
      <HeroCustomSoft />
      <OurProcessDynamic process={process} title={t('Process.title')} darkMode={true} image='/custom-step.svg' />
      <SubservicesShared subservices={subservices} title={t('Subservices.title')} darkMode={false} />
      <PricingShared forTitle={t('Pricing.forTitle')} title={t('Pricing.title')} darkMode={false} />
      <TheTWJDifference />

      <CaseStudiesSection darkMode={true} />
      <TestimonialsSection darkMode={true} />
      <FaqsSection darkMode={true} />
    </div>
  )
}

export default CustomSoftwarePage