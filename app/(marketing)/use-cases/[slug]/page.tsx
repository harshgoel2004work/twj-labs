"use client"

import TestimonialsSection from '@/components/home/testimonials'
import TheTWJDifference from '@/components/home/twj-difference'
import WhatWeDoSection from '@/components/home/what-we-do'
import OtherServicesPricing from '@/components/pricing/other-services-pricing'
import PricingSection from '@/components/pricing/pricing-section-other'
import CaseStudiesSection from '@/components/shared/case-studies'
import FaqsSection from '@/components/shared/faqs'
import UseCasesHeroSection from '@/components/use-cases/hero'
import UseCasesWhySharedIndustrySection from '@/components/use-cases/why'
import { useCases } from '@/data/use-cases'
import { usePathname } from 'next/navigation'
import React from 'react'

const UsecaseSlugPage = () => {
  const pathname = usePathname()
  const industryLink = pathname.split('/')[2].split('-')[1]
  const currentUseCase = useCases.find(section => 
    section.cases.find(useCase => useCase.link === industryLink)
  )?.cases.find(useCase => useCase.link === industryLink)

  if (!currentUseCase) {
    return <div className='text-white p-10'>Use case not found.</div>
  }

  return (
    <div>
      <UseCasesHeroSection useCase={currentUseCase} />
      <UseCasesWhySharedIndustrySection useCase={currentUseCase} />
      
      <CaseStudiesSection darkMode={false}/>
      <TestimonialsSection darkMode={false}/>
      <WhatWeDoSection />
      <PricingSection />
      <OtherServicesPricing />
      <TheTWJDifference />
      <FaqsSection />
    </div>
  )
}

export default UsecaseSlugPage