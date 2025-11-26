"use client"

import TestimonialsSection from '@/components/home/testimonials';
import TheTWJDifference from '@/components/home/twj-difference';
import CaseStudiesSection from '@/components/shared/case-studies';
import FaqsSection from '@/components/shared/faqs';
import OurProcessDynamic from '@/components/shared/our-process'
import PricingShared from '@/components/shared/pricing';
import SubservicesShared from '@/components/shared/subservices';
import HeroWebflow from '@/components/webflow-wordpres/hero-webflow'
import HeroWordpress from '@/components/webflow-wordpres/hero-wordpress';
import { ProcessType } from '@/types';
import { AppWindow, ShoppingCartIcon, StoreIcon } from 'lucide-react';
import React from 'react'
import { FaCode, FaPencilRuler, FaRocket, FaSearch, FaShopify } from 'react-icons/fa';
import { IoColorPalette } from 'react-icons/io5';

export const process: ProcessType[] = [
  {
    step: 1,
    title: "Planning & Requirements",
    description:
      "We understand your website needs, features, and integrations to define a scalable WordPress plan.",
    image: "/our-process/wordpress/1.png",
    icon: FaSearch,
  },
  {
    step: 2,
    title: "Design & Wireframing",
    description:
      "We create clean layouts and user-focused designs while establishing overall structure and navigation.",
    image: "/our-process/wordpress/2.png",
    icon: FaPencilRuler,
  },
  {
    step: 3,
    title: "Development & Customization",
    description:
      "We develop custom themes, plugins, and integrations while ensuring security, performance, and SEO readiness.",
    image: "/our-process/wordpress/3.png",
    icon: FaCode,
  },
  {
    step: 4,
    title: "Testing & Deployment",
    description:
      "After thorough QA and optimization, we launch your site and hand over full access with training.",
    image: "/our-process/wordpress/4.png",
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


const WordpressPage = () => {
  return (
    <div>
        <HeroWordpress />
        {/* FEATURES */}
        <OurProcessDynamic process={process} title="Our WordPress Development Process" darkMode={false} image='/wordpress-step.svg'/>
        <SubservicesShared subservices={subservices} title="All the Services We Offer" darkMode={false}/>
        <PricingShared forTitle='Wordpress' title={"Let's talk money"} darkMode={true}/>
        <TheTWJDifference />

        <CaseStudiesSection darkMode={true}/>
        <TestimonialsSection darkMode={false}/>
        <FaqsSection darkMode={false}/>
    </div>
  )
}

export default WordpressPage