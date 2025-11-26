"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Scaling, SparkleIcon, TrendingUp, Users, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
// Fixed import path to use alias or correct relative path
import CustomBadge from "@/components/shared/custom-badge";

const whyChooseAccessibility = [
  {
    title: "Improved Usability",
    description:
      "Accessibility services help remove barriers, allowing all users to interact with your digital content effectively, thereby boosting overall usability and satisfaction.",
    icon: Scaling,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "group-hover:border-emerald-500/50",
  },
  {
    title: "Data-Driven Insights",
    description:
      "Leverage data analytics to understand user behavior and improve accessibility features. We track engagement to ensure a better experience for diverse audiences.",
    icon: TrendingUp,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "group-hover:border-blue-500/50",
  },
  {
    title: "Always-On Support",
    description:
      "Our automated systems and support teams operate around the clock, ensuring your business remains inclusive, compliant, and responsive at all times.",
    icon: Users,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "group-hover:border-purple-500/50",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  },
};

const WhyAccessibility = () => {
  return (
    <section className="w-full py-24 relative overflow-hidden bg-[#060609] text-white font-manrope">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative z-10">
        
        {/* LEFT SECTION: Sticky Header */}
        <div className="lg:col-span-5  flex justify-start">
          <div className="lg:sticky lg:top-32 flex flex-col items-center md:items-start gap-6 ">
            <CustomBadge darkMode={true} title="Why Accessibility?" />

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold tracking-tight text-center md:text-start leading-[1.1]"
            >
              Unlock inclusivity with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
                smart solutions.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className=" text-neutral-400 leading-relaxed max-w-md text-center md:text-start text-sm md:text-base"
            >
              Accessibility isn&apos;t just about compliance; it&apos;s about expanding your reach. We help you build digital products that everyone can use.
            </motion.p>
          </div>
        </div>

        {/* RIGHT SECTION: Feature List */}
        <div className="lg:col-span-7">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col gap-6"
          >
            {whyChooseAccessibility.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={cn(
                    "group relative p-6 md:p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300",
                    item.border
                  )}
                >
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    {/* Icon Box */}
                    <div className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110", 
                        item.bg
                    )}>
                      <Icon size={28} className={item.color} />
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-indigo-200 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-base text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Subtle decorative arrow on hover */}
                  <div className="absolute top-6 right-6 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <ArrowRight size={20} className="text-white/20" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyAccessibility;