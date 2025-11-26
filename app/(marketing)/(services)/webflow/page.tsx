"use client"

import TestimonialsSection from '@/components/home/testimonials';
import TheTWJDifference from '@/components/home/twj-difference';
import CaseStudiesSection from '@/components/shared/case-studies';
import FaqsSection from '@/components/shared/faqs';
import OurProcessDynamic from '@/components/shared/our-process'
import PricingShared from '@/components/shared/pricing';
import SubservicesShared from '@/components/shared/subservices';
import HeroWebflow from '@/components/webflow-wordpres/hero-webflow'
import { ProcessType } from '@/types';
import { AppWindow, ArrowUpRight, CheckCircle, Database, ShoppingCartIcon, StoreIcon, Zap } from 'lucide-react';
import React from 'react'
import { FaCode, FaPencilRuler, FaRocket, FaSearch, FaShopify } from 'react-icons/fa';
import { FaWebflow } from 'react-icons/fa6';
import { IoColorPalette } from 'react-icons/io5';

const process: ProcessType[] = [
  {
    step: 1,
    title: "Discovery & Planning",
    description:
      "We analyze your goals, target audience, and brand requirements to define a clear, strategic roadmap for your Webflow project.",
    image: "/our-process/webflow/1.png",
    icon: FaSearch,
  },
  {
    step: 2,
    title: "Design & Prototyping",
    description:
      "We create high-fidelity designs and interactive prototypes that match your brand identity and deliver an intuitive, conversion-focused experience.",
    image: "/our-process/webflow/2.png",
    icon: FaPencilRuler,
  },
  {
    step: 3,
    title: "Webflow Development",
    description:
      "We bring your designs to life using Webflow’s powerful CMS, animations, and responsive capabilities while ensuring clean structure and highly maintainable builds.",
    image: "/our-process/webflow/3.png",
    icon: FaCode,
  },
  {
    step: 4,
    title: "Testing, Launch & Handover",
    description:
      "We test performance, accessibility, and responsiveness across devices. After launch, we provide training, documentation, and support to help you manage your Webflow site with ease.",
    image: "/our-process/webflow/4.png",
    icon: FaRocket,
  },
];

const subservices = [
  {
    title: "Webflow Website Setup & Build",
    description:
      "Full Webflow setup and development of high-performance websites tailored to your brand, goals, and audience.",
    icon: FaWebflow,
  },
  {
    title: "Custom Webflow Design",
    description:
      "Pixel-perfect UI/UX design with modern layouts, stunning visuals, and fully responsive designs built exclusively for your brand.",
    icon: IoColorPalette,
  },
  {
    title: "Webflow CMS Setup & Collections",
    description:
      "Structured, scalable CMS collections for blogs, case studies, team pages, services, portfolios, and dynamic content.",
    icon: Database,
  },
  {
    title: "Webflow Interactions & Animations",
    description:
      "Custom animations and interactions using Webflow’s native tools to create smooth, delightful user experiences that elevate your brand.",
    icon: Zap,
  },
  {
    title: "Migration to Webflow",
    description:
      "Move your website from WordPress, Wix, Squarespace, or custom platforms to Webflow with SEO-safe migration and improved performance.",
    icon: ArrowUpRight,
  },
  {
    title: "Ongoing Maintenance & Support",
    description:
      "Continuous updates, bug fixes, performance optimization, CMS management, and technical support to keep your Webflow site running flawlessly.",
    icon: CheckCircle,
  },
];


const WebflowPage = () => {
  return (
    <div>
        <HeroWebflow />
        {/* FEATURES */}
        <OurProcessDynamic process={process} title="Our Custom Software Development Process" darkMode={true} image='/webflow-step.svg'/>
        <SubservicesShared subservices={subservices} title="All the Services We Offer" darkMode={true}/>
        <PricingShared forTitle='Webflow' title={"Let's talk money"} darkMode={false}/>
        <TheTWJDifference />

        <CaseStudiesSection darkMode={true}/>
        <TestimonialsSection darkMode={true}/>
        <FaqsSection darkMode={true}/>
    </div>
  )
}

export default WebflowPage