"use client"

import CustomFeatures from '@/components/custom-soft/features'
import HeroCustomSoft from '@/components/custom-soft/hero'
import TestimonialsSection from '@/components/home/testimonials';
import TheTWJDifference from '@/components/home/twj-difference';
import CaseStudiesSection from '@/components/shared/case-studies';
import FaqsSection from '@/components/shared/faqs';
import OurProcessDynamic from '@/components/shared/our-process'
import PricingShared from '@/components/shared/pricing';
import SubservicesShared from '@/components/shared/subservices';
import { ProcessType } from '@/types';
import { AppWindow, ShoppingCartIcon, StoreIcon } from 'lucide-react';
import React from 'react'
import { FaCode, FaPencilRuler, FaRocket, FaSearch, FaShopify } from 'react-icons/fa';
import { IoColorPalette } from 'react-icons/io5';

export const process: ProcessType[] = [
  {
    step: 1,
    title: "Requirements & Scope",
    description:
      "We analyze your workflows and requirements to define the scope, technical strategy, and architecture.",
    image: "/our-process/software/1.png",
    icon: FaSearch,
  },
  {
    step: 2,
    title: "System Design & Prototyping",
    description:
      "We create flow diagrams, prototypes, and technical specifications to visualize the solution.",
    image: "/our-process/software/2.png",
    icon: FaPencilRuler,
  },
  {
    step: 3,
    title: "Development & Integration",
    description:
      "We build secure, scalable software using modern technologies and integrate APIs, databases, and automations.",
    image: "/our-process/software/3.png",
    icon: FaCode,
  },
  {
    step: 4,
    title: "Testing & Deployment",
    description:
      "We ensure reliability, security, and performance before deploying your software to the production environment.",
    image: "/our-process/software/4.png",
    icon: FaRocket,
  },
];


const subservices = [
    {
        title: "Shopify Store Setup & Configuration",
        description: "Comprehensive setup and configuration of Shopify stores tailored to your business needs.",
        icon: StoreIcon,
    },
    {
        title: 'Custom Theme Design & Development',
        description: 'Bespoke theme design and development to create a unique and engaging shopping experience.',
        icon: IoColorPalette,
    },
    {
        title: 'Shopify App Integration',
        description: 'Seamless integration of third-party apps to enhance store functionality and user experience.',
        icon: AppWindow,
    },
    {
        title: 'Shopify Store Optimization',
        description: 'Improve loading speed, UX/UI, and conversion rates through strategic performance optimization, image compression, SEO improvements, and analytics-driven CRO techniques.',
        icon: ShoppingCartIcon,
    },
    {
        title: 'Shopify Migration & Replatforming',
        description: 'Migrate your existing store from WooCommerce, Magento, or another platform to Shopify without losing data or SEO ranking. Get a cleaner, faster, and more scalable store on Shopify’s ecosystem.',
        icon: FaShopify,
    },
    {
        title: 'Ongoing Maintenance & Support',
        description: 'Regular updates, bug fixes, and performance monitoring to ensure your Shopify store runs smoothly.',
        icon: AppWindow,
    }
]

const CustomSoftwarePage = () => {
  return (
    <div>
        <HeroCustomSoft />
        {/* <CustomFeatures /> */}
        <OurProcessDynamic process={process} title="Our Custom Software Development Process" darkMode={true} image='/custom-step.svg'/>
        <SubservicesShared subservices={subservices} title="All the Services We Offer" darkMode={false}/>
        <PricingShared forTitle='Custom Development' title={"Let's talk money"} darkMode={false}/>
        <TheTWJDifference />

        <CaseStudiesSection darkMode={true}/>
        <TestimonialsSection darkMode={true}/>
        <FaqsSection darkMode={true}/>
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

export default CustomSoftwarePage