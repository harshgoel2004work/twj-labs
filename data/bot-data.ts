// This file acts as your "Database" for the bot to query
// In a real app, you would fetch this from your database/CMS

export const SERVICES_DATA = [
  {
    id: "web-dev",
    name: "Custom Web Development",
    description: "High-performance websites using Next.js, React, and Tailwind CSS.",
    priceStart: "$3,000"
  },
  {
    id: "design",
    name: "UI/UX Design",
    description: "User-centric design systems, wireframing, and prototyping in Figma.",
    priceStart: "$1,500"
  },
  {
    id: "automation",
    name: "Workflow Automation",
    description: "Connect your apps with Zapier or n8n to save time.",
    priceStart: "$800"
  }
];

export const PRICING_TIERS = [
  {
    tier: "Starter",
    price: "$2,000",
    features: ["5 Page Site", "Basic SEO", "Contact Form"]
  },
  {
    tier: "Growth",
    price: "$5,000",
    features: ["CMS Integration", "Blog", "Advanced Animations", "Analytics"]
  },
  {
    tier: "Enterprise",
    price: "Custom",
    features: ["Full Scale App", "Auth", "Database", "Priority Support"]
  }
];