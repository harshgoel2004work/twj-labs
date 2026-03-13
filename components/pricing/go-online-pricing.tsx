"use client"

import { cn } from '@/lib/utils'
import { ArrowRight, Check, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import React from 'react'
import Link from 'next/link'

const plans = [
  {
    id: 1,
    name: "Google Business Essentials",
    description: "Establish your local presence and start getting discovered by customers in your area.",
    featured: false,
    price: "Custom",
    features: [
      "Google Business Profile Setup",
      "Local SEO Optimization",
      "5 Initial Reviews Assistance",
      "Google Maps Integration",
      "Business Hours & Info Management"
    ]
  },
  {
    id: 2,
    name: "Essential Web Presence",
    description: "A professional 5-page website to showcase your services and build credibility online.",
    featured: true,
    price: "Custom",
    features: [
      "5-Page Premium Website",
      "Mobile Responsive Design",
      "Basic SEO Setup",
      "Contact Form Integration",
      "Domain & Hosting Setup",
      "Everything in Google Business"
    ]
  },
  {
    id: 3,
    name: "Growth & Scale",
    description: "Advanced digital features to drive more traffic and convert leads into loyal customers.",
    featured: false,
    price: "Custom",
    features: [
      "Unlimited Pages (up to 15)",
      "Blog/News Section Setup",
      "Advanced SEO Strategy",
      "Social Media Integration",
      "Google Analytics Setup",
      "Everything in Essential Web"
    ]
  },
  {
    id: 4,
    name: "Custom Solutions",
    description: "Tailored enterprise-grade solutions for complex business needs and large scale growth.",
    featured: false,
    price: "Contact TWJ",
    features: [
      "Custom Web Applications",
      "E-commerce Functionality",
      "Advanced Third-party Integrations",
      "Dedicated Project Manager",
      "Priority Support",
      "Custom Pricing for Scale"
    ]
  }
]

const GoOnlinePricing = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden bg-[#060609]">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
            Choose the perfect plan to take your business from offline to online. All plans include our premium design and dedicated support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative group p-1 rounded-3xl transition-all duration-500 h-full flex flex-col",
                plan.featured 
                  ? "bg-gradient-to-b from-[#5449e8] to-transparent" 
                  : "bg-white/5 hover:bg-white/10"
              )}
            >
              <div className="bg-[#0c0c12] rounded-[22px] p-8 flex-grow flex flex-col h-full">
                {plan.featured && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#5449e8] text-[10px] font-bold uppercase tracking-widest text-white border border-white/20">
                      <Sparkles size={10} className="fill-white" /> Recommended
                    </span>
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed min-h-[60px]">
                    {plan.description}
                  </p>
                </div>

                <div className="mb-8 flex-grow">
                  <ul className="space-y-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className={cn(
                          "mt-1 flex items-center justify-center w-4 h-4 rounded-full shrink-0",
                          plan.featured ? "bg-[#5449e8] text-white" : "bg-white/10 text-neutral-400"
                        )}>
                          <Check size={10} strokeWidth={3} />
                        </div>
                        <span className="text-sm text-neutral-300 font-medium leading-tight">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-8 border-t border-white/5">
                  <Link 
                    href={`/contact-sales?ser-int=go-online&plan=${plan.name}`}
                    className={cn(
                      "w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold uppercase transition-all duration-300",
                      plan.featured
                        ? "bg-[#5449e8] text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40"
                        : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                    )}
                  >
                    Get Started
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GoOnlinePricing
