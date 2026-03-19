
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
import { Metadata } from 'next'

import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ServicePages.accessibility.Metadata' });
  return {
    title: t('title'),
    description: t('description'),
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
      <OurProcessDynamic process={process} title={t('Process.title')} darkMode={true} image={'/accessibility-step.svg'}/>
      <SubservicesShared subservices={subservices} darkMode={true} title={t('Subservices.title')}/>
      <PricingShared forTitle={t('Pricing.forTitle')} title={t('Pricing.title')} darkMode={true}/>
      <TheTWJDifference />
      <CaseStudiesSection darkMode={true}/>
      <TestimonialsSection darkMode={true}/>
      <FaqsSection darkMode={true}/>
    </div>
  )
}

export default AccessibilityPage