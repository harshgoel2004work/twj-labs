import AboutBento from '@/components/about/bento'
import AboutHero from '@/components/about/hero'
import TestimonialsSection from '@/components/home/testimonials'
import CaseStudiesSection from '@/components/shared/case-studies'
import FaqsSection from '@/components/shared/faqs'
import React from 'react'

const AboutPage = () => {
  return (
    <div>
      <AboutHero />
      <AboutBento />
      <CaseStudiesSection darkMode={false} />
      <TestimonialsSection darkMode={false} />
      <FaqsSection />
    </div>
  )
}

export default AboutPage