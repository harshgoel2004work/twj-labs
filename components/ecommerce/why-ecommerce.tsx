"use client";

import { Scaling, SparkleIcon, Globe, Clock, BarChart3, ShieldCheck } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const ecommerceBenefits = [
  {
    title: "Global Reach",
    description: "Break geographical barriers. Sell your products to customers anywhere in the world, 24/7, without the limitations of a physical storefront.",
    icon: Globe,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "24/7 Availability",
    description: "Your store never sleeps. Automated sales processes mean you're generating revenue even while you rest, maximizing your business potential.",
    icon: Clock,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    title: "Data-Driven Insights",
    description: "Track customer behavior, inventory, and sales in real-time. Use precise data to make informed decisions that drive growth.",
    icon: BarChart3,
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    title: "Secure Scalability",
    description: "Start small and grow infinitely. Our architecture ensures your platform handles traffic spikes and transaction surges securely.",
    icon: ShieldCheck,
    color: "text-rose-600",
    bg: "bg-rose-50",
  }
]

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  },
}

const WhyEcommerce = () => {
  return (
    <section className='w-full py-24 px-6 md:px-12 lg:px-24 bg-[#F4F5F9] text-slate-900 font-manrope relative overflow-hidden'>
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-200/30 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-[120px] pointer-events-none translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start relative z-10">
        
        {/* LEFT COLUMN: Sticky Header */}
        <div className='lg:col-span-5 lg:sticky lg:top-32 flex flex-col items-center md:items-start gap-6'>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className='inline-flex items-center gap-2 rounded-full px-4 py-1.5 bg-white border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-widest shadow-sm'
          >
            <SparkleIcon size={14} className="fill-current" />
            Growth Catalyst
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className='text-4xl md:text-5xl font-bold tracking-tight leading-tight text-center md:text-start leading-[1.1]'
          >
            Why Ecommerce is <br/>
            <span className="text-transparent bg-clip-text bg-linear-to-r text-center md:text-start from-indigo-600 to-indigo-500">
              essential for growth
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className=" text-sm md:text-lg text-neutral-600 text-center md:text-start leading-relaxed"
          >
            In today&apos;s digital-first world, an online presence isn&apos;t just an option—it&apos;s the engine of your business. We build storefronts that turn visitors into loyal customers.
          </motion.p>
        </div>

        {/* RIGHT COLUMN: Grid Cards */}
        <div className='lg:col-span-7'>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className='grid grid-cols-1 md:grid-cols-2 gap-6'
          >
            {ecommerceBenefits.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div 
                  key={index} 
                  variants={cardVariants}
                  className='group bg-white p-8 rounded-3xl border border-neutral-100 shadow-xl shadow-neutral-200/50 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300'
                >
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110", 
                    item.bg, item.color
                  )}>
                    <Icon size={24} />
                  </div>
                  
                  <div className='space-y-3'>
                    <h4 className='text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors'>
                        {item.title}
                    </h4>
                    <p className='text-sm leading-relaxed text-slate-500'>
                        {item.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default WhyEcommerce