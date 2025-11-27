import TestimonialsSection from '@/components/home/testimonials'
import CaseStudiesSection from '@/components/shared/case-studies'
import FaqsSection from '@/components/shared/faqs'

import OurProcessDynamicAlt from '@/components/shared/our-process-2'
import GenericFeaturesSection from '@/components/slug/generic-features'
import GenericHeroPage from '@/components/slug/generic-hero'
import { services } from '@/data/services'
import { Metadata, ResolvingMetadata } from 'next'
import React from 'react'

export async function generateMetadata(
  { params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Record<string, string | string[]> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).slug
 
  // fetch post information
  const activeSlug = services[1].servicesList.find(service => service.slug === slug)

  if (!activeSlug) {
    return {};
  }
 
  return {
    title: `Best ${activeSlug.name} services`,
    description: activeSlug.description || "Learn more about our services.",
  }
}


const OtherServicesSlugPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
   const slug = (await params).slug

  const activeSlug = services[1].servicesList.find(service => service.slug === slug)

  if (!activeSlug || !activeSlug.webPageContent?.heroSection || !activeSlug.webPageContent?.featuresSection?.features) {
    return (
      <div className='w-full h-screen flex items-center justify-center font-manrope text-gray-500'>
        Service Not Found
      </div>
    )
  }

  return (
    <div>
      <GenericHeroPage data={activeSlug.webPageContent.heroSection} />
      {activeSlug.slug && <GenericFeaturesSection slug={activeSlug.slug} title={activeSlug.webPageContent.featuresSection.title} />}

      {activeSlug.slug && <OurProcessDynamicAlt slug={activeSlug.slug} darkMode={false} title={`Process For ${activeSlug.name}`}/>}

      <CaseStudiesSection darkMode={false} />
      <TestimonialsSection darkMode={true}/>
      <FaqsSection darkMode={true}/>
    </div>
  )
}

export default OtherServicesSlugPage
