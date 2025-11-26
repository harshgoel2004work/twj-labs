
import { BiAccessibility } from "react-icons/bi";
import { FaBrain, FaInstagram, FaLanguage, FaSearchengin, FaShopify, FaWordpress, FaWrench } from "react-icons/fa";
import { FaWebflow } from "react-icons/fa6";
import { FiFigma } from "react-icons/fi";
import { RiNextjsFill } from "react-icons/ri";

import { ServicesType } from "@/types";
import { SEOScoreCard, SEOSearchBar } from "@/components/generic/seo";
import { MaintainenceDueDate, SupportChat } from "@/components/generic/maintainence";
import { SocialMediaAnalytics, SocialMediaPost } from "@/components/generic/social-media";
import { AnalyticsCopywriting, TextEditor } from "@/components/generic/copywriting";
import { Activity, BarChart, BarChart2, BookOpen, CalendarCheck, Database, Edit3, FileSearch, FileText, Gauge, Key, Layout, LucideIcon, Map, MessageCircle, Mic, PenLine, PenTool, Repeat, Rocket, Server, Settings, Share2, ShieldCheck, Star, Target, TrendingUp, Upload, Users, Wrench } from "lucide-react";
import { IconType } from "react-icons";
import { Migration } from "@/components/generic/migration";


export const servicesForAI: { id: number; name: string; tagline: string; description: string; url: string; icon?: IconType | LucideIcon, category: string }[] = [
  {
    id:1,
    name: 'Webflow Development',
    tagline: 'High-converting, scalable websites',
    description: 'We specialize in building high-converting, scalable websites using Webflow. Our team creates custom designs that are optimized for performance and user experience, ensuring your website not only looks great but also drives results.',
    url: '/services/webflow',
    icon: FaWebflow,
    category: 'Main Service'
  },
  {
    id:2,
    name: 'Wordpress Development',
    tagline: 'Custom WordPress solutions',
    description: 'We create custom WordPress solutions tailored to your business needs. Our team is experienced in building responsive, user-friendly websites that drive engagement and conversions.',
    url: '/services/wordpress',
    icon: FaWordpress,
    category: 'Main Service'
  },
  {
    id:3,
    name: 'Web Design',
    tagline: 'visually stunning & user-friendly',
    description: 'Our web design services focus on creating visually stunning and user-friendly interfaces that enhance the user experience. We work closely with clients to understand their brand and create designs that resonate with their target audience.',
    url: '/services/web-design',
    icon: FiFigma,
    category: 'Main Service'
  },
  {
    id:4,
    name: 'E-commerce Solutions',
    tagline: 'Boost Online Sales',
    description: 'Our e-commerce solutions are designed to help you boost online sales and grow your business. We create user-friendly, high-converting online stores that provide a seamless shopping experience.',
    url: '/services/ecommerce',
    icon: FaShopify,
    category: 'Main Service'
  },
  {
    id:5,
    name: 'Custom Software Development',
    tagline: 'Tailored software solutions',
    description: 'We offer custom software development services to help businesses streamline their operations and improve efficiency. Our team works closely with clients to understand their unique requirements and deliver solutions that drive results.',
    url: '/services/custom-software',
    icon: RiNextjsFill,
    category: 'Main Service'
  },
  {
    id:6,
    name: 'AI Integration & Automation',
    tagline: 'Enhancing efficiency with AI',
    description: 'We help modern businesses integrate AI and automation into their websites and workflows — saving time, scaling personalization, and boosting conversions.',
    url: '/services/ai-integration',
    icon: FaBrain,
    category: 'Main Service'
  },
  {
    id:7,
    name: 'Accessibility Testing & Compliance',
    tagline: 'Ensuring digital inclusivity',
    description: 'Our accessibility testing and compliance services help businesses ensure their digital products are inclusive and accessible to all users. We conduct thorough audits and provide actionable recommendations to improve accessibility.',
    url: '/services/accessibility',
    icon: BiAccessibility,
    category: 'Main Service'
  },
  {
    id:8,
    name: 'SEO Optimization',
    tagline: 'Improving your website’s visibility',
    description: 'Our SEO optimization services help improve your website’s visibility on search engines, driving more organic traffic and increasing conversions. We use the latest SEO techniques and best practices to ensure your website ranks high and reaches your target audience.',
    url: '/services/seo-optimization',
    category: 'Other Service'
  },
  {
    id:9,
    name: 'Social Media Management',
    tagline: 'Managing social media presence',
    description: 'Our social media management services help businesses maintain a strong and consistent presence across various social media platforms. We create and curate content, engage with your audience, and analyze performance to optimize your social media strategy.',
    url: '/services/social-media-management',
    category: 'Other Service'
  },
  {
    id:10,
    name: 'Website Maintenance',
    tagline: 'Ongoing support and maintenance',
    description: 'Our website maintenance services provide ongoing support to ensure your website remains up-to-date, secure, and performing optimally. We handle updates, backups, and troubleshooting to keep your online presence running smoothly.',
    url: '/services/website-maintenance',
    category: 'Other Service'
  },
  {
    id:11,
    name: 'Copywriting Services',
    tagline: 'Compelling content that converts',
    description: 'Our copywriting services provide compelling content that engages your audience and drives conversions. We craft clear, persuasive messages tailored to your brand and target market.',
    url: '/services/copywriting',
    category: 'Other Service'
  },
  {
    id:12,
    name: 'Migration & Integration',
    tagline: 'Seamless transitions for your digital landscape',
    description: 'Our migration and integration services ensure smooth transitions for your digital landscape. We handle data migration, system integration, and platform upgrades with minimal disruption to your business.',
    url: '/services/migration-integration',
    category: 'Other Service'
  },
]

export const services: ServicesType = [
    {
        title: 'Main Services',
        servicesList: [
            {
                id:1,
                name: 'Webflow Development',
                tagline: 'High-converting, scalable websites',
                icon: FaWebflow,
                description: 'We specialize in building high-converting, scalable websites using Webflow. Our team creates custom designs that are optimized for performance and user experience, ensuring your website not only looks great but also drives results.',
                url: '/webflow',
            },
            {
                id:2,
                name: 'Wordpress Development',
                tagline: 'Custom WordPress solutions',
                icon: FaWordpress,
                description: 'We create custom WordPress solutions tailored to your business needs. Our team is experienced in building responsive, user-friendly websites that drive engagement and conversions.',
                url: '/wordpress',
            },
            {
                id:3,
                name: 'Web Design',
                tagline: 'visually stunning & user-friendly',
                icon: FiFigma,
                description: 'Our web design services focus on creating visually stunning and user-friendly interfaces that enhance the user experience. We work closely with clients to understand their brand and create designs that resonate with their target audience.',
                url: '/web-design',
            },
            {
                id:4,
                name: 'E-commerce Solutions',
                tagline: 'Boost Online Sales',
                icon: FaShopify,
                description: 'Our e-commerce solutions are designed to help you boost online sales and grow your business. We create user-friendly, high-converting online stores that provide a seamless shopping experience.',
                url: '/ecommerce',
            },
            {
                id:5,
                name: 'Custom Software Development',
                tagline: 'Tailored software solutions',
                icon: RiNextjsFill,
                description: 'We offer custom software development services to help businesses streamline their operations and improve efficiency. Our team works closely with clients to understand their unique requirements and deliver solutions that drive results.',
                url: '/custom-software',
            },
            {                
              id:14,
              name: 'AI Integration & Automation',
              tagline: 'Enhancing efficiency with AI',
              icon: FaBrain,
              description: 'We help modern businesses integrate AI and automation into their websites and workflows — saving time, scaling personalization, and boosting conversions.',
              url: '/ai'
            },
            {
                id:13,
                name: 'Accessibility Testing & Compliance',
                tagline: 'Ensuring digital inclusivity',
                icon: BiAccessibility,
                description: 'Our accessibility testing and compliance services help businesses ensure their digital products are inclusive and accessible to all users. We conduct thorough audits and provide actionable recommendations to improve accessibility.',
                url: '/accessibility'
            }
        ]
    },
    {
        tag:'generic',
        title: 'Other Services',
        servicesList: [
            {
                id:7,
                name: 'SEO Optimization',
                slug: 'seo-optimization',
                tagline: 'Improving your website’s visibility',
                icon: FaSearchengin,
                description: 'Our SEO optimization services help improve your website’s visibility in search engine results. We use proven strategies to increase organic traffic and enhance your online presence.',
                url: '/seo-optimization',

                webPageContent: {
                    heroSection: {
                        tag: 'SEO Optimization',
                        title: <>Building <span className='bg-radial bg-clip-text text-transparent from-[#ffffff] to-[#999fb2]'>SEOs</span> that drive <span className='bg-radial bg-clip-text text-transparent from-[#ffffff] to-[#999fb2]'>Innovation</span></>,
                        description: 'Elevate your online presence with our expert SEO services, designed to boost your search engine rankings and drive targeted traffic to your website.',
                        displayElements: [
                            <SEOScoreCard key={1}/>,
                            <SEOSearchBar key={2}/>
                        ]
                    },
                    process: [
                      {
                        step: 1,
                        title: "Comprehensive Website Audit",
                        tagline: "Identifying Opportunities",
                        description: "We conduct a thorough audit of your website to identify areas for improvement, including technical issues, content gaps, and backlink profiles.",
                        icon: BarChart2,
                      },
                      {
                        step: 2,
                        title: "Keyword Research & Strategy",
                        tagline: "Targeting the Right Audience",
                        description: "We perform in-depth keyword research to identify high-impact keywords that align with your business goals and target audience.",
                        icon: Key,
                      },
                      {
                        step: 3,
                        title: "On-Page Optimization",
                        tagline: "Enhancing Website Elements",
                        description: "We optimize your website's on-page elements, including meta tags, headers, and content structure, to improve search engine visibility and user experience.",
                        icon: Settings,
                      },
                      {
                        step: 4,
                        title: "Content Creation & Marketing",
                        tagline: "Engaging & Relevant Content",
                        description: "Our team creates high-quality, SEO-optimized content that resonates with your audience and drives organic traffic to your site.",
                        icon: PenTool,
                      },
                      {
                        step: 5,
                        title: "Link Building & Outreach",
                        tagline: "Building Authority",
                        description: "We implement effective link-building strategies to enhance your website's authority and improve search engine rankings.",
                        icon: TrendingUp,
                      }
                    ],

                    featuresSection: {
                        title: 'Why Choose Our SEO Services?',
                        features: [
  {
    category: "Data Analytics",
    title: "Data-Driven Optimization",
    description: "We use analytics and insights to make smarter SEO decisions that boost performance and ROI.",
    icon: TrendingUp
  },
  {
    category: "Technical SEO",
    title: "Technical SEO Excellence",
    description: "Fix site speed, crawl errors, and code structures for better visibility and ranking power.",
    icon: Settings
  },
  {
    category: "Keyword Strategy",
    title: "Strategic Keyword Targeting",
    description: "Target the right keywords to attract qualified visitors and maximize organic traffic.",
    icon: Key
  },
  {
    category: "Content Marketing",
    title: "Content That Converts",
    description: "Engage users with SEO-optimized content that converts visitors into loyal customers.",
    icon: PenTool
  },
  {
    category: "Analytics & Reporting",
    title: "Transparent Reporting",
    description: "Get real-time insights with clear dashboards and performance analytics.",
    icon: BarChart2
  },
  {
    category: "Growth Monitoring",
    title: "Continuous Growth Monitoring",
    description: "We monitor your SEO performance continuously to maintain long-term growth.",
    icon: Rocket
  }
],

                    }
                }
            },
            {
                id:8,
                name: 'Social Media Management',
                slug: 'social-media-management',
                tagline: 'Managing social media presence',
                icon: FaInstagram,
                description: 'We offer social media management services to help businesses build and maintain a strong presence on social media platforms. Our team creates engaging content and manages interactions to foster community growth.',
                url: '/social-media-management',

                webPageContent: {
                    heroSection: {
                        tag: 'Social Media Management',
                        title: <>Driving <span className='bg-radial bg-clip-text text-transparent from-[#ffffff] to-[#999fb2]'>Engagement</span> through Social Media</>,
                        description: 'Boost your brand’s online presence with our expert social media management services, designed to engage your audience and drive meaningful interactions.',
                        displayElements: [
                            <SocialMediaPost key={1} />,
                            <SocialMediaAnalytics key={2} />
                        ]
                    },
                    process: [
  {
    step: 1,
    title: "Brand & Audience Assessment",
    tagline: "Understanding Your Identity",
    description:
      "We analyze your brand voice, audience behavior, and competitors to define a strong and consistent social media strategy.",
  },
  {
    step: 2,
    title: "Content Strategy & Planning",
    tagline: "Creating a Clear Roadmap",
    description:
      "We build a monthly content calendar including themes, messaging pillars, and platform-specific strategies to keep your audience engaged.",
  },
  {
    step: 3,
    title: "Content Creation",
    tagline: "Producing Scroll-Stopping Content",
    description:
      "Our team designs high-quality visuals, videos, and written content crafted specifically for each platform and audience type.",
  },
  {
    step: 4,
    title: "Publishing & Management",
    tagline: "Consistent Presence",
    description:
      "We schedule, publish, and manage posts while maintaining an active presence across platforms to foster engagement and brand visibility.",
  },
  {
    step: 5,
    title: "Analytics & Optimization",
    tagline: "Continuous Improvement",
    description:
      "We monitor performance, track KPIs, and optimize content strategies based on real-time analytics and audience behavior.",
  },
],

                    featuresSection:{
                        title: 'Why Choose Our Social Media Management?',
                        features: [
          {
            category: "Content Strategy",
            title: "Consistent Brand Voice",
            description: "We craft tailored content that maintains your brand’s identity across all platforms for stronger recognition.",
            icon: Share2
          },
          {
            category: "Engagement",
            title: "Community Interaction",
            description: "We monitor and respond to audience interactions, building an authentic and loyal follower base.",
            icon: MessageCircle
          },
          {
            category: "Analytics",
            title: "Data-Driven Insights",
            description: "Track engagement, reach, and performance to refine your social strategy and boost ROI.",
            icon: BarChart
          },
          {
            category: "Audience Growth",
            title: "Targeted Campaigns",
            description: "We use audience insights to plan campaigns that attract new followers and increase retention.",
            icon: Users
          },
          {
            category: "Scheduling",
            title: "Consistent Posting",
            description: "Our team ensures your content calendar is optimized for maximum visibility and engagement.",
            icon: CalendarCheck
          },
          {
            category: "Monitoring",
            title: "Performance Tracking",
            description: "We continuously monitor performance metrics to adapt strategies in real-time for better outcomes.",
            icon: Rocket
          }
        ]
                    }
                }
            },
            {
                id:9,
                name: 'Website Maintenance',
                slug: 'website-maintenance',
                tagline: 'Ongoing support and maintenance',
                icon: FaWrench,
                description: 'Our website maintenance services provide ongoing support to ensure your website remains up-to-date, secure, and functioning optimally. We handle updates, backups, and troubleshooting so you can focus on your business.',
                url: '/website-maintenance',

                webPageContent: {
                    heroSection: {
                        tag: 'Website Maintenance & Support',
                        title: <>Reliable <span className='bg-radial bg-clip-text text-transparent from-[#ffffff] to-[#999fb2]'>Website Maintenance</span> for Optimal Performance</>,
                        description: 'Ensure your website remains secure, up-to-date, and performing at its best with our comprehensive website maintenance and support services.',
                        displayElements: [
                            <SupportChat key={1}/>,
                            <MaintainenceDueDate key={2}/>
                        ]
                    },
                    process: [
  {
    step: 1,
    title: "Initial Website Review",
    tagline: "Understanding Your Current Setup",
    description:
      "We examine your website’s structure, plugins, hosting, and performance to identify technical needs.",
    icon: FileSearch,
  },
  {
    step: 2,
    title: "Security & Backup Setup",
    tagline: "Protecting Your Website",
    description:
      "We configure security patches, firewall protections, and automated backups to safeguard your site.",
    icon: ShieldCheck,
  },
  {
    step: 3,
    title: "Updates & Fixes",
    tagline: "Keeping Everything Up to Date",
    description:
      "We update CMS versions, plugins, themes, and fix bugs to ensure your site runs smoothly.",
    icon: Wrench,
  },
  {
    step: 4,
    title: "Performance Optimization",
    tagline: "Delivering Fast, Smooth Experiences",
    description:
      "We optimize images, scripts, and server settings to improve speed and reduce loading times.",
    icon: Gauge,
  },
  {
    step: 5,
    title: "Monitoring & Reporting",
    tagline: "Staying Ahead of Issues",
    description:
      "We continuously monitor uptime, performance, and vulnerabilities while providing monthly reports.",
    icon: Activity,
  },
],

                    featuresSection: {
        title: 'Why Choose Our Website Maintenance Services?',
        features: [
          {
            category: "Security",
            title: "Enhanced Website Protection",
            description: "We implement the latest security updates and patches to protect your website from threats.",
            icon: ShieldCheck
          },
          {
            category: "Performance",
            title: "Speed Optimization",
            description: "Regularly optimized code and assets ensure fast load times and smooth user experience.",
            icon: Rocket
          },
          {
            category: "Updates",
            title: "Plugin & CMS Updates",
            description: "We keep your CMS, plugins, and integrations up-to-date without affecting performance.",
            icon: Settings
          },
          {
            category: "Backup & Recovery",
            title: "Regular Backups",
            description: "Your site data is securely backed up with quick recovery options in case of emergencies.",
            icon: Database
          },
          {
            category: "Monitoring",
            title: "24/7 Uptime Monitoring",
            description: "We track your site’s uptime and resolve issues before they impact your visitors.",
            icon: BarChart2
          },
          {
            category: "Support",
            title: "Dedicated Technical Support",
            description: "Our maintenance team is always available to assist with fixes and improvements.",
            icon: Repeat
          }
        ]
      }
                }
            },
            {
                id:10,
                name: 'Copywriting Services',
                slug: 'copywriting',
                tagline: 'Compelling content that converts',
                icon: FaLanguage,
                description: 'Our copywriting services focus on creating compelling content that engages your audience and drives conversions. We work with clients to develop clear, persuasive messaging that aligns with their brand voice.',
                url: '/copywriting',

                webPageContent:{
                    heroSection: {
                        tag: 'Copywriting Services',
                        title: <>Crafting <span className='bg-radial bg-clip-text text-transparent from-[#ffffff] to-[#999fb2]'>Compelling</span> Content that Converts</>,
                        description: 'Engage your audience and drive conversions with our expert copywriting services, tailored to reflect your brand’s unique voice and message.',
                        displayElements: [
                            <TextEditor key={1}/>,
                            <AnalyticsCopywriting key={2}/>
                        ]
                    },
                    process: [
  {
    step: 1,
    title: "Brand Voice Discovery",
    tagline: "Defining Your Tone",
    description:
      "We identify your brand’s voice, tone, values, and target audience to craft messaging that resonates.",
    icon: Mic,
  },
  {
    step: 2,
    title: "Content Strategy & Outline",
    tagline: "Structuring Your Message",
    description:
      "We develop clear content outlines based on your goals, user journey, and keyword opportunities.",
    icon: BookOpen,
  },
  {
    step: 3,
    title: "Writing & Drafting",
    tagline: "Crafting High-Converting Copy",
    description:
      "We write impactful, persuasive, and SEO-friendly copy tailored to your brand’s personality.",
    icon: PenLine,
  },
  {
    step: 4,
    title: "Review & Refinement",
    tagline: "Polishing Every Word",
    description:
      "We refine the copy through multiple review rounds to ensure clarity, flow, and emotional impact.",
    icon: Edit3,
  },
  {
    step: 5,
    title: "Final Delivery & Upload",
    tagline: "Putting Words to Work",
    description:
      "We finalize approved copy, format it properly, and assist with CMS upload or implementation.",
    icon: Upload,
  },
]
,
                    featuresSection: {
        title: 'Why Choose Our Copywriting Services?',
        features: [
          {
            category: "Content Strategy",
            title: "Brand-Driven Messaging",
            description: "We write content that aligns perfectly with your brand’s tone, values, and audience.",
            icon: FileText
          },
          {
            category: "Conversion Optimization",
            title: "Persuasive Copywriting",
            description: "Our copy is designed to engage emotions and inspire actions that drive conversions.",
            icon: Target
          },
          {
            category: "SEO Integration",
            title: "Optimized for Search",
            description: "Every piece of content is crafted with SEO best practices for maximum visibility.",
            icon: Key
          },
          {
            category: "Quality Assurance",
            title: "Proofed & Polished",
            description: "We ensure clarity, tone, and flow are refined to the highest editorial standards.",
            icon: Star
          },
          {
            category: "Performance Insights",
            title: "Content Analytics",
            description: "Measure engagement, conversions, and performance metrics to refine content strategy.",
            icon: BarChart
          },
          {
            category: "Scalability",
            title: "Content for Every Platform",
            description: "From blogs to landing pages, we create tailored content for all your digital channels.",
            icon: PenTool
          }
        ]
      }
                }
            },
            {
                id:11,
                name: 'Migration & Integration',
                slug: 'migration-integration',
                tagline: 'Seamless transitions for your digital landscape',
                icon: FaLanguage,
                description: 'Our migration and integration services ensure a smooth transition to new platforms and technologies, minimizing disruption and maximizing efficiency.',
                url: '/migration-integration',

                webPageContent:{
                    heroSection: {
                        tag: 'Migration & Integration Services',
                        title: <>Seamless <span className='bg-radial bg-clip-text text-transparent from-[#ffffff] to-[#999fb2]'>Transitions</span> for Your Digital Landscape</>,
                        description: 'Ensure a smooth transition to new platforms and technologies with our expert migration and integration services.',
                        displayElements: [
                            <Migration key={1}/>,
                            // <AnalyticsCopywriting key={2}/>
                        ]
                    },
                    process: [
  {
    step: 1,
    title: "Platform Assessment",
    tagline: "Understanding Your Current Setup",
    description:
      "We audit your existing platform—content, design, plugins, products, and structure—to plan the migration safely.",
    icon: Server,
  },
  {
    step: 2,
    title: "Migration Planning",
    tagline: "Crafting the Migration Blueprint",
    description:
      "We map data, URLs, redirects, SEO structure, and integrations to ensure nothing is lost during migration.",
    icon: Map,
  },
  {
    step: 3,
    title: "Content & Data Transfer",
    tagline: "Moving Everything Safely",
    description:
      "We migrate pages, posts, products, assets, and databases to the new platform with full integrity.",
    icon: Database,
  },
  {
    step: 4,
    title: "Rebuild & Optimization",
    tagline: "Upgrading Your Website Experience",
    description:
      "We rebuild layouts, improve UX, refine content structure, and set up new features on the destination platform.",
    icon: Layout,
  },
  {
    step: 5,
    title: "SEO Preservation & Launch",
    tagline: "Protecting Your Rankings",
    description:
      "We set redirects, fix broken links, test performance, and launch the new site without SEO loss.",
    icon: Rocket,
  },
]
,
                    featuresSection: {
        title: 'Why Choose Our Migration & Integration Services?',
        features: [
          {
            category: "Content Strategy",
            title: "Brand-Driven Messaging",
            description: "We write content that aligns perfectly with your brand’s tone, values, and audience.",
            icon: FileText
          },
          {
            category: "Conversion Optimization",
            title: "Persuasive Copywriting",
            description: "Our copy is designed to engage emotions and inspire actions that drive conversions.",
            icon: Target
          },
          {
            category: "SEO Integration",
            title: "Optimized for Search",
            description: "Every piece of content is crafted with SEO best practices for maximum visibility.",
            icon: Key
          },
          {
            category: "Quality Assurance",
            title: "Proofed & Polished",
            description: "We ensure clarity, tone, and flow are refined to the highest editorial standards.",
            icon: Star
          },
          {
            category: "Performance Insights",
            title: "Content Analytics",
            description: "Measure engagement, conversions, and performance metrics to refine content strategy.",
            icon: BarChart
          },
          {
            category: "Scalability",
            title: "Content for Every Platform",
            description: "From blogs to landing pages, we create tailored content for all your digital channels.",
            icon: PenTool
          }
        ]
      }
                }
            }
        ]
    }
]


