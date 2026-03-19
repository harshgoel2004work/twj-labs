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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ServicePages.ecommerce.Metadata' });
  return {
    title: t('title'),
    description: t('description'),
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
        <OurProcessDynamic process={process} title={t('Process.title')} image={'/shopify-step.svg'} darkMode={true}/>
        
        <SubservicesShared subservices={subservices} darkMode={true} title={t('Subservices.title')}/>
        <PricingShared  forTitle={t('Pricing.forTitle')} title={t('Pricing.title')} darkMode={false}/>
        <TheTWJDifference />
        
        <CaseStudiesSection darkMode={true}/>
        <TestimonialsSection darkMode={true}/>
        <FaqsSection darkMode={true}/>
    </div>
  )
}

export default EcommercePage