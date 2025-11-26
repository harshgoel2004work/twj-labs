"use client"

import TestimonialsSection from '@/components/home/testimonials'
import CaseStudiesSection from '@/components/shared/case-studies'
import FaqsSection from '@/components/shared/faqs'
import OurProcessDynamic from '@/components/shared/our-process'
import OurProcessDynamicAlt from '@/components/shared/our-process-2'
import GenericFeaturesSection from '@/components/slug/generic-features'
import GenericHeroPage from '@/components/slug/generic-hero'
import { services } from '@/data/services'
import React from 'react'

const OtherServicesSlugPage = ({ params }: { params: Promise<{ slug: string }> }) => {
  // ✅ unwrap params using React.use()
  const { slug } = React.use(params)

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
      <GenericFeaturesSection data={activeSlug.webPageContent.featuresSection.features} title={activeSlug.webPageContent.featuresSection.title} />

      {/* <OurProcessDynamic process={[]} darkMode={false} title="Process For SEO" /> */}
      <OurProcessDynamicAlt processArr={activeSlug.webPageContent.process || []} darkMode={false} title={`Process For ${activeSlug.name}`}/>

      <CaseStudiesSection darkMode={false} />
      <TestimonialsSection darkMode={true}/>
      <FaqsSection darkMode={true}/>
    </div>
  )
}

export default OtherServicesSlugPage
