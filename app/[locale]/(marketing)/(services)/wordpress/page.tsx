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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ServicePages.wordpress.Metadata' });
  return {
    title: t('title'),
    description: t('description'),
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
        <OurProcessDynamic process={process} title={t('Process.title')} darkMode={false} image='/wordpress-step.svg'/>
        <SubservicesShared subservices={subservices} title={t('Subservices.title')} darkMode={false}/>
        <PricingShared forTitle={t('Pricing.forTitle')} title={t('Pricing.title')} darkMode={true}/>
        <TheTWJDifference />

        <CaseStudiesSection darkMode={true}/>
        <TestimonialsSection darkMode={false}/>
        <FaqsSection darkMode={false}/>
    </div>
  )
}

export default WordpressPage