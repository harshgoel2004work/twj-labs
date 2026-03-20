
import AIBento from '@/components/ai/bento'
import AiHero from '@/components/ai/hero'
import WhyAI from '@/components/ai/why'
import TestimonialsSection from '@/components/home/testimonials'
import TheTWJDifference from '@/components/home/twj-difference'
import CaseStudiesSection from '@/components/shared/case-studies'
import FaqsSection from '@/components/shared/faqs'
import OurProcessDynamic from '@/components/shared/our-process'
import PricingShared from '@/components/shared/pricing'
import SubservicesShared from '@/components/shared/subservices'
import { ProcessType } from '@/types'
import { Metadata } from 'next'

import { getTranslations } from 'next-intl/server'


import {
  baseUrl, buildHreflangAlternates, globalAreaServed,
  twitterDefaults, robotsDefaults, globalKeywords,
} from "@/lib/seo";

const pageUrl = `${baseUrl}/services/ai-integration`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "AI Integration & Automation",
      description:
        "Custom AI chatbots, workflow automation, LLM integration, and AI-powered product development. India-based team serving US, UK, AU, NZ & Europe.",
      url: pageUrl,
      provider: { "@id": `${baseUrl}/#organization` },
      areaServed: globalAreaServed,
      serviceType: "AI Integration",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
        { "@type": "ListItem", position: 2, name: "Services", item: `${baseUrl}/services` },
        { "@type": "ListItem", position: 3, name: "AI Integration", item: pageUrl },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What AI integrations does TWJ Labs offer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "TWJ Labs builds custom AI chatbots, LLM integrations (OpenAI, Claude, Gemini), workflow automation, AI content generation pipelines, document processing, and AI-powered SaaS features for businesses worldwide.",
          },
        },
        {
          "@type": "Question",
          name: "How much does AI integration cost for a US or UK startup?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "AI integration projects at TWJ Labs start from approximately $1,000 USD for simple chatbot or API integrations, scaling to $10,000–$50,000+ for complex AI-powered products. Our India-based rates are 40–60% lower than US/UK agencies.",
          },
        },
        {
          "@type": "Question",
          name: "Can you integrate AI into my existing website or app?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We specialize in adding AI capabilities to existing Next.js, React, and custom web applications — including chatbots, semantic search, content generation, and intelligent automation workflows.",
          },
        },
      ],
    },
  ],
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return {
    title: "AI Integration & Automation Agency | India-Based for US, UK & AU | TWJ Labs",
    description:
      "Custom AI chatbots, LLM integration & workflow automation by TWJ Labs. Serving startups and enterprises in the US, UK, Australia, New Zealand & Europe. 40–60% below US rates.",

    keywords: [
      "AI integration agency India",
      "AI automation company India",
      "hire AI developer India",
      "OpenAI integration agency",
      "LLM integration for startups",
      "AI chatbot development India",
      "AI integration agency USA",
      "offshore AI development agency",
      "Claude AI integration agency",
      "AI-powered SaaS development",
      "workflow automation agency India",
      ...globalKeywords.global,
    ],

    alternates: buildHreflangAlternates("/services/ai-integration"),

    openGraph: {
      type: "website", locale: "en_US", url: pageUrl, siteName: "The Walking Jumbo",
      title: "AI Integration Agency | India-Based for Global Clients | TWJ Labs",
      description: "Custom AI chatbots, LLM integrations & automation. India rates, global quality. US, UK, AU & NZ clients.",
      images: [{ url: `${baseUrl}/opengraph-image.png`, width: 1200, height: 630 }],
    },
    twitter: { ...twitterDefaults, title: "AI Integration Agency | TWJ Labs India", description: "LLMs, chatbots & automation. Offshore pricing for US/UK/AU clients.", images: [`${baseUrl}/opengraph-image.png`] },
    robots: robotsDefaults,
  };
}
const AiIntegrationAndAutomation = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ServicePages.ai' });

  const process: ProcessType[] = [
    {
      step: 1,
      title: t('Process.steps.0.title'),
      description: t('Process.steps.0.description'),
      image: "/our-process/ai/1.png",
      icon: 'FaSearch',
    },
    {
      step: 2,
      title: t('Process.steps.1.title'),
      description: t('Process.steps.1.description'),
      image: "/our-process/ai/2.png",
      icon: 'FaPencilRuler',
    },
    {
      step: 3,
      title: t('Process.steps.2.title'),
      description: t('Process.steps.2.description'),
      image: "/our-process/ai/3.png",
      icon: 'FaCode',
    },
    {
      step: 4,
      title: t('Process.steps.3.title'),
      description: t('Process.steps.3.description'),
      image: "/our-process/ai/4.png",
      icon: 'FaRocket',
    },
  ];

  const subservices = [
    {
      title: t('Subservices.items.0.title'),
      description: t('Subservices.items.0.description'),
      icon: 'MessageSquareIcon',
    },
    {
      title: t('Subservices.items.1.title'),
      description: t('Subservices.items.1.description'),
      icon: 'RepeatIcon',
    },
    {
      title: t('Subservices.items.2.title'),
      description: t('Subservices.items.2.description'),
      icon: 'SparklesIcon',
    },
    {
      title: t('Subservices.items.3.title'),
      description: t('Subservices.items.3.description'),
      icon: 'PuzzleIcon',
    },
    {
      title: t('Subservices.items.4.title'),
      description: t('Subservices.items.4.description'),
      icon: 'PenToolIcon',
    },
    {
      title: t('Subservices.items.5.title'),
      description: t('Subservices.items.5.description'),
      icon: 'BrainIcon',
    },
  ];

  return (
    <div>
      <AiHero />
      <AIBento />
      <WhyAI />

      <OurProcessDynamic process={process} title={t('Process.title')} darkMode={true} image={'/ai-step.svg'} />

      <SubservicesShared subservices={subservices} darkMode={true} title={t('Subservices.title')} />
      <PricingShared forTitle={t('Pricing.forTitle')} title={t('Pricing.title')} darkMode={true} />
      <TheTWJDifference />

      <CaseStudiesSection darkMode={true} />
      <TestimonialsSection darkMode={true} />
      <FaqsSection darkMode={true} />
    </div>
  )
}

export default AiIntegrationAndAutomation