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

const process: ProcessType[] = [
  {
    step: 1,
    title: "Discovery & Research",
    description:
      "We begin by understanding your brand, audience, competitors, and goals to shape a design direction that aligns with your vision.",
    image: "/mnt/data/8b6a8783-faae-46cc-a37b-ad98a09bd0d2.png", // You can replace with a Figma-style mock later
    icon: 'SearchIcon', // Lucide: Search
  },
  {
    step: 2,
    title: "Wireframing & UX Architecture",
    description:
      "We map out page layouts, user flow, and structure using low-fidelity wireframes to define how users will navigate your website.",
    image: "/mnt/data/8b6a8783-faae-46cc-a37b-ad98a09bd0d2.png",
    icon: 'LayoutDashboardIcon', // Lucide: LayoutDashboard or PanelsTopLeft
  },
  {
    step: 3,
    title: "High-Fidelity UI Design in Figma",
    description:
      "We craft polished UI designs—components, interactions, typography, and visual system—all built in Figma with pixel-perfect precision.",
    image: "/mnt/data/8b6a8783-faae-46cc-a37b-ad98a09bd0d2.png",
    icon: 'PenToolIcon', // Lucide: PenTool
  },
  {
    step: 4,
    title: "Prototyping & Handoff",
    description:
      "We create interactive prototypes, document components, and prepare developer-ready design systems for seamless handoff.",
    image: "/mnt/data/8b6a8783-faae-46cc-a37b-ad98a09bd0d2.png",
    icon: 'Share2Icon', // Lucide: Share2 or Handshake
  },
];

const subservices = [
  {
    title: "UI/UX Design",
    description:
      "User-centered design crafted for clarity, usability, and conversion—using modern UX principles.",
    icon: 'MonitorSmartphoneIcon', // Lucide: MonitorSmartphone
  },
  {
    title: "Wireframing & User Flows",
    description:
      "Low-fidelity wireframes and detailed user journeys that define how users interact with your website.",
    icon: 'GitBranchIcon', // Lucide: GitBranch or FlowChart icon
  },
  {
    title: "Figma Prototyping",
    description:
      "Clickable prototypes showcasing animations, transitions, and interactions for a realistic preview.",
    icon: 'PlayCircleIcon', // Lucide: PlayCircle
  },
  {
    title: "Design Systems & Component Libraries",
    description:
      "Reusable UI components and scalable design systems built in Figma for consistency and speed.",
    icon: 'BoxesIcon', // Lucide: Boxes or Layers
  },
  {
    title: "Branding Alignment",
    description:
      "Color palettes, typography, spacing, and visual identity applied consistently across your site for a unified brand feel.",
    icon: 'PaletteIcon', // Lucide: Palette
  },
  {
    title: "Responsive & Adaptive Layouts",
    description:
      "Designs optimized for all screen sizes—mobile, tablet, laptop, and ultra-wide displays.",
    icon: 'SmartphoneIcon', // Lucide: Smartphone or Phone
  },
];

export const metadata:Metadata = {
  title: "Web Design Services",
  description: "Professional web design services including custom UI/UX design, responsive layouts, prototyping, and branding alignment by TWJ Labs.",
  keywords:[
    "Web Design Services",

  
    "Website Design Company",
  

    "Website Design in India",
    "Website Design in US",
    "Website Design in UK",
    "Website Design in Canada",
    "Website Design in Europe",
    "Website Design in Australia",
    "Website Design in New Zealand",
    "Website Design Agency",
  ]
}



const WebDesignPage = () => {
  return (
    <div>
        <HeroWebDesign />

        {/* <WhyWebDesign /> */}

        <OurProcessDynamic process={process} title="Our Web Design Services Process" darkMode={true} image={'/web-des-step.svg'}/>
      <SubservicesShared subservices={subservices} darkMode={true} title='Web Design Solutions'/>
      <PricingShared forTitle='Web Design' title={"Let's talk money"} darkMode={true}/>
      <TheTWJDifference />
      <CaseStudiesSection darkMode={false}/>
      <TestimonialsSection darkMode={false}/>
      <FaqsSection darkMode={true}/>


        {/* <WebDesignFeatures /> */}

        {/* WHY WEB DESIGN? */}


        {/* <WebDesignFeatures /> */}
        {/* <EcommerceFeatures />
        <WhyEcommerce />
        <OurProcessForEcommerce />
        <EcomSubservices />
        <PricingForEcommerce />
        <TheTWJDifference />
        
        <CaseStudiesSection />
        <TestimonialsSection />
        <FaqsSection /> */}

        {/* WHY US? */}
        {/* PRICING FOR WEBFLOW */}
        {/* USECASES */}
        {/* CASE STUDIES/WORK */}
        {/* TESTIMONIALS */}
        {/* FAQ */}
    </div>
  )
}

export default WebDesignPage