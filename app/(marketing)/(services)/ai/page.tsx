
import AIBento from '@/components/ai/bento'
import AiHero from '@/components/ai/hero'
import WhyAI from '@/components/ai/why'
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
    title: "Discovery & AI Strategy",
    description:
      "We analyze your workflow, challenges, and goals to identify where AI and automation can deliver the most impact and efficiency.",
    image: "/our-process/ai/1.png",
    icon: 'FaSearch', // or BrainIcon / SparkleIcon
  },
  {
    step: 2,
    title: "Model Selection & Prototyping",
    description:
      "We choose the right AI tools and models—GPT, embeddings, vector search, or automation platforms—and build prototypes to validate functionality.",
    image: "/our-process/ai/2.png",
    icon: 'FaPencilRuler', // or WorkflowIcon / CpuIcon
  },
  {
    step: 3,
    title: "Integration & Automation Development",
    description:
      "We integrate AI into your systems and develop automations using APIs, webhooks, and platforms like n8n or Zapier to streamline operations.",
    image: "/our-process/ai/3.png",
    icon: 'FaCode', // or BotIcon / ServerIcon
  },
  {
    step: 4,
    title: "Testing, Optimization & Deployment",
    description:
      "We test accuracy, reliability, and performance, optimize prompts and flows, and deploy your AI system with monitoring and continuous improvements.",
    image: "/our-process/ai/4.png",
    icon: 'FaRocket',
  },
];


const subservices = [
  {
    title: "Chatbot Integration",
    description: "Integrate intelligent AI chatbots into your website or platform to enhance engagement, automate support, and generate leads 24/7.",
    icon: 'MessageSquareIcon',
  },
  {
    title: "Workflow Automation",
    description: "Streamline operations by automating repetitive tasks and connecting your tools using platforms like n8n, Make, or Zapier.",
    icon: 'RepeatIcon',
  },
  {
    title: "AI-Powered Personalization",
    description: "Deliver dynamic website experiences tailored to user behavior, preferences, and actions in real-time.",
    icon: 'SparklesIcon',
  },
  {
    title: "Custom AI Integrations",
    description: "Build and integrate custom AI APIs using OpenAI, Anthropic, or Google Gemini for unique business functionality.",
    icon: 'PuzzleIcon',
  },
  {
    title: "AI Content Generation",
    description: "Automatically create on-brand content, SEO copy, and product descriptions powered by advanced language models.",
    icon: 'PenToolIcon',
  },
  {
    title: "AI Knowledge Bots",
    description: "Deploy intelligent assistants trained on your data to answer FAQs, onboard customers, and support your team.",
    icon: 'BrainIcon',
  },
];

export const metadata:Metadata = {
  title: "AI Integration & Automation Services",
  description: "Professional AI integration and automation services including chatbot integration, workflow automation, custom AI APIs, and ongoing support by TWJ Labs.",
  keywords:[
    "AI Integration Services",

  
    "Custom Software Development Company",
  

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

const AiIntegrationAndAutomation = () => {
  return (
    <div>
        <AiHero />
        <AIBento />
        <WhyAI />

        <OurProcessDynamic process={process} title="Our AI Integration & Automation Process" darkMode={true} image={'/ai-step.svg'}/>
        
        {/* <EcomSubservices /> */}
        <SubservicesShared subservices={subservices} darkMode={true} title='AI Integration & Automation Solutions'/>
        <PricingShared forTitle='AI Integration & Automation' title={"Let's talk money"} darkMode={true}/>
        <TheTWJDifference />
        
        <CaseStudiesSection darkMode={false}/>
        <TestimonialsSection darkMode={false}/>
        <FaqsSection darkMode={true}/>
    </div>
  )
}

export default AiIntegrationAndAutomation