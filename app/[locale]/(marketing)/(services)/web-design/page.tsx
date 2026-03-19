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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ServicePages.webDesign.Metadata' });
  return {
    title: t('title'),
    description: t('description'),
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

        <OurProcessDynamic process={process} title={t('Process.title')} darkMode={true} image={'/web-des-step.svg'}/>
      <SubservicesShared subservices={subservices} darkMode={false} title={t('Subservices.title')}/>
      <PricingShared forTitle={t('Pricing.forTitle')} title={t('Pricing.title')} darkMode={false}/>
      <TheTWJDifference />
      <CaseStudiesSection darkMode={false}/>
      <TestimonialsSection darkMode={false}/>
      <FaqsSection darkMode={true}/>
    </div>
  )
}

export default WebDesignPage