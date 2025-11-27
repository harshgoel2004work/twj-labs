import EcommerceFeatures from '@/components/ecommerce/features'
import HeroEcommerce from '@/components/ecommerce/hero'
import WhyEcommerce from '@/components/ecommerce/why-ecommerce'
import TestimonialsSection from '@/components/home/testimonials'
import TheTWJDifference from '@/components/home/twj-difference'
import CaseStudiesSection from '@/components/shared/case-studies'
import FaqsSection from '@/components/shared/faqs'
import OurProcessDynamic from '@/components/shared/our-process'
import PricingShared from '@/components/shared/pricing'
import SubservicesShared from '@/components/shared/subservices'
import { ProcessType } from '@/types'
import { Metadata } from 'next'


const process: ProcessType[] = [
  {
    step: 1,
    title: "Discovery & Planning",
    description:
      "Understanding your business goals, target audience, and unique requirements to create a tailored e-commerce solution.",
    image: "/our-process/ecommerce/1.png",
    icon: 'FaSearch',
  },
  {
    step: 2,
    title: "Design & Prototyping",
    description:
      "Crafting visually appealing and user-friendly designs that reflect your brand identity and enhance the shopping experience.",
    image: "/our-process/ecommerce/2.png",
    icon: 'FaPencilRuler',
  },
  {
    step: 3,
    title: "Development & Integration",
    description:
      "Building a robust e-commerce platform with seamless integration of payment gateways, inventory management, and other essential features.",
    image: "/our-process/ecommerce/3.png",
    icon: 'FaCode',
  },
  {
    step: 4,
    title: "Testing & Launch",
    description:
      "Conducting thorough testing to ensure functionality, performance, and security before launching your online store to the world.",
    image: "/our-process/ecommerce/4.png",
    icon: 'FaRocket',
  },
];

const subservices = [
    {
        title: "Shopify Store Setup & Configuration",
        description: "Comprehensive setup and configuration of Shopify stores tailored to your business needs.",
        icon: 'StoreIcon',
    },
    {
        title: 'Custom Theme Design & Development',
        description: 'Bespoke theme design and development to create a unique and engaging shopping experience.',
        icon: 'IoColorPalette',
    },
    {
        title: 'Shopify App Integration',
        description: 'Seamless integration of third-party apps to enhance store functionality and user experience.',
        icon: 'AppWindow',
    },
    {
        title: 'Shopify Store Optimization',
        description: 'Improve loading speed, UX/UI, and conversion rates through strategic performance optimization, image compression, SEO improvements, and analytics-driven CRO techniques.',
        icon: 'ShoppingCartIcon',
    },
    {
        title: 'Shopify Migration & Replatforming',
        description: 'Migrate your existing store from WooCommerce, Magento, or another platform to Shopify without losing data or SEO ranking. Get a cleaner, faster, and more scalable store on Shopify’s ecosystem.',
        icon: 'FaShopify',
    },
    {
        title: 'Ongoing Maintenance & Support',
        description: 'Regular updates, bug fixes, and performance monitoring to ensure your Shopify store runs smoothly.',
        icon: 'AppWindow',
    }
]

export const metadata:Metadata = {
  title: "E-commerce Development Services",
  description: "Professional e-commerce development services including Shopify store setup, custom theme design, app integration, and ongoing support by TWJ Labs.",
  keywords:[
    "E-commerce Development Services",

  
    "E-commerce Development Company",
  

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

const EcommercePage = () => {
  return (
    <div>
        <HeroEcommerce />
        <EcommerceFeatures />
        <WhyEcommerce />
        <OurProcessDynamic process={process} title="Our E-commerce Development Process" image={'/shopify-step.svg'}/>
        
        {/* <EcomSubservices /> */}
        <SubservicesShared subservices={subservices} darkMode={true} title='Complete E-commerce solutions'/>
        <PricingShared  forTitle='Ecommerce' title="Let's Talk Money" darkMode={false}/>
        <TheTWJDifference />
        
        <CaseStudiesSection darkMode={false}/>
        <TestimonialsSection darkMode={false}/>
        <FaqsSection darkMode={true}/>

        {/* WHY US? */}
        {/* PRICING FOR WEBFLOW */}
        {/* USECASES */}
        {/* CASE STUDIES/WORK */}
        {/* TESTIMONIALS */}
        {/* FAQ */}
    </div>
  )
}

export default EcommercePage