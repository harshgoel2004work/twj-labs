
import OtherServicesPricing from '@/components/pricing/other-services-pricing'

import React from 'react'
import TheTWJDifference from '@/components/home/twj-difference'
import TestimonialsSection from '@/components/home/testimonials'
import OurProjectProcess from '@/components/pricing/our-project-process'
import CaseStudiesSection from '@/components/shared/case-studies'
import FaqsSection from '@/components/shared/faqs'

import PricingHero from '@/components/pricing/pricing-hero'
import { Metadata } from 'next'

export const metadata:Metadata = {
  title: "Pricing plans that fit your needs",
}

const PricingPage = () => {
  

  return (
    <div className='w-full min-h-screen font-manrope'>
      
      <PricingHero />
    
      {/* OTHER SERVICES */}
      <OtherServicesPricing />

      <OurProjectProcess />
      <TheTWJDifference />

      <CaseStudiesSection darkMode={false}/>

      <TestimonialsSection darkMode={false}/>
      <FaqsSection darkMode={true}/>
      

      

      {/* WEBDESIGNING PROCESS */}
      {/* twj VS Others */}
      {/* IsThisBestFor YOU? */}
    </div>
  )
}

export default PricingPage
