import TestimonialsSection from '@/components/home/testimonials';
import TheTWJDifference from '@/components/home/twj-difference';
import CaseStudiesSection from '@/components/shared/case-studies';
import FaqsSection from '@/components/shared/faqs';
import OurProcessDynamic from '@/components/shared/our-process'
import PricingShared from '@/components/shared/pricing';
import SubservicesShared from '@/components/shared/subservices';
import HeroWordpress from '@/components/webflow-wordpres/hero-wordpress';
import { ProcessType } from '@/types';
import { Metadata } from 'next';




export const process: ProcessType[] = [
  {
    step: 1,
    title: "Planning & Requirements",
    description:
      "We understand your website needs, features, and integrations to define a scalable WordPress plan.",
    image: "/our-process/wordpress/1.png",
    icon: 'FaSearch',
  },
  {
    step: 2,
    title: "Design & Wireframing",
    description:
      "We create clean layouts and user-focused designs while establishing overall structure and navigation.",
    image: "/our-process/wordpress/2.png",
    icon: 'FaPencilRuler',
  },
  {
    step: 3,
    title: "Development & Customization",
    description:
      "We develop custom themes, plugins, and integrations while ensuring security, performance, and SEO readiness.",
    image: "/our-process/wordpress/3.png",
    icon: 'FaCode',
  },
  {
    step: 4,
    title: "Testing & Deployment",
    description:
      "After thorough QA and optimization, we launch your site and hand over full access with training.",
    image: "/our-process/wordpress/4.png",
    icon: 'FaRocket',
  },
];


const subservices = [
  {
    title: "WordPress Installation & Setup",
    description:
      "Complete WordPress setup including hosting configuration, database setup, essential plugins installation, and overall environment optimization.",
    icon: 'ServerIcon', 
  },
  {
    title: "Custom Theme Design & Development",
    description:
      "Fully custom WordPress themes built from scratch or tailored from premium themes to match your brand identity and vision.",
    icon: 'PaletteIcon',
  },
  {
    title: "Plugin Integration & Configuration",
    description:
      "Integration and setup of essential plugins such as SEO tools, security, caching, forms, and advanced plugins tailored to your needs.",
    icon: 'PuzzleIcon',
  },
  {
    title: "WordPress Performance Optimization",
    description:
      "Speed boost through caching, database optimization, image compression, CDN setup, and code-level improvements for top Core Web Vitals.",
    icon: 'GaugeIcon',
  },
  {
    title: "WordPress Migration & Replatforming",
    description:
      "Seamless migration from Wix, Squarespace, Webflow, Shopify, or an older WordPress installation — with no data loss or SEO impact.",
    icon: 'RefreshCcwIcon',
  },
  {
    title: "Security Hardening & Protection",
    description:
      "Advanced security setup including firewalls, malware scans, brute-force protection, secure backups, and hardening practices.",
    icon: 'ShieldCheckIcon',
  },
  {
    title: "Custom Plugin Development",
    description:
      "Development of custom WordPress plugins tailored to unique business requirements, integrations, and advanced functionality.",
    icon: 'CodeIcon',
  },
  {
    title: "Ongoing Maintenance & Support",
    description:
      "Routine updates, backups, monitoring, and issue fixes to ensure your WordPress site stays secure, fast, and fully functional.",
    icon: 'WrenchIcon',
  },
];


export const metadata:Metadata = {
  title: "Expert WordPress Development Services",
  description: "Professional WordPress development services including custom themes, plugin integration, performance optimization, and secure maintenance by TWJ Labs.",
  keywords:[
    "WordPress Development Services",
    "Custom WordPress Themes",
    "WordPress Plugin Integration",
    "WordPress Performance Optimization",
    "WordPress Security Services",
    "WordPress Maintenance and Support",
    
    "WordPress Website Development",
    "Best WordPress Developers",
    "WordPress Development Company",
    "Affordable WordPress Services",
    "Professional WordPress Solutions",
    "WordPress Migration Services",

    "Wordpress Development in India",
    "Wordpress Development in US",
    "Wordpress Development in UK",
    "Wordpress Development in Canada",
    "Wordpress Development in Europe",
    "Wordpress Development in Australia",
    "Wordpress Development in New Zealand",
    "Wordpress Development Agency",
  ]
}

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