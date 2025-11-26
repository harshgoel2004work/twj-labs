import { DatabaseIcon } from "lucide-react";
import { BsInstagram } from "react-icons/bs";
import { FaLanguage, FaSearchengin } from "react-icons/fa";


export type PricingPlanType = {
  id: number;
  title: string;
  plans: PlanType[];
}

export type PlanType = {
  id: number;
    name: string;
    description: string;
    featured: boolean;
    price: string;
    features: string;
    featuresNotIncluded?: string;
    everythingIncludedPrev?: boolean;
}



// data/pricing-plans.js
export const otherPricingPlans = [
  {
    name: 'Social Media Management',
    description: 'Comprehensive management of your social media channels.',
    icon: BsInstagram,
    basePrice: 50, // store base price as number (in USD)
    billingPeriod: 'month',
    features: [
      'Content creation & scheduling',
      'Audience engagement',
      'Performance analytics',
      'Monthly strategy sessions'
    ],
  },
  {
    name: 'SEO Services',
    description: 'Ongoing SEO optimization.',
    icon: FaSearchengin,
    basePrice: 60,
    billingPeriod: null,
    features: ['Keyword research', 'On-page improvements', 'Link building'],
  },
  {
    name: 'Copywriting Services',
    description: 'Professional copywriting.',
    icon: FaLanguage,
    basePrice: 0.018, // per word
    billingPeriod: 'per word',
    features: ['Website copywriting', 'Blog posts', 'Marketing materials'],
  },
  {
    name: 'Website Maintenance',
    description: 'Regular updates and maintenance for your website.',
    icon: DatabaseIcon,
    basePrice: 15,
    billingPeriod: 'month',
    features: [
      'Regular updates',
      'Security patches',
      'Performance monitoring',
      'Backup management'
    ],
  }
];
