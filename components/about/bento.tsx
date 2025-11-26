"use client";

import React from "react";
import { 
  ArrowRight, 
  Users, 
  Cpu, 
  Layers, 
  Target, 
  Zap, 
  BarChart3, 
  SparkleIcon, 
  Fingerprint,
  Lightbulb
} from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming you have this, otherwise remove and use template literals

// Enhanced Data with Icons and Grid Spans
const aboutBentoData = [
  {
    title: "Who We Are",
    description: "A multidisciplinary team of designers, engineers, and strategists building purposeful digital experiences.",
    icon: Users,
    className: "md:col-span-2", // Spans 2 columns
  },
  {
    title: "How We Work",
    description: "We operate as an extension of your team—fast, transparent, and collaborative.",
    icon: Layers,
    className: "md:col-span-1",
  },
  {
    title: "What We Do",
    description: "Webflow, WordPress, AI integrations, custom dev, UX/UI design, and accessibility.",
    icon: Cpu,
    className: "md:col-span-1",
  },
  {
    title: "Our Approach",
    description: "Strategy-first, design-led, and engineering-backed. We define problems clearly and build systems that scale.",
    icon: Target,
    className: "md:col-span-2",
  },
  {
    title: "Why Brands Choose Us",
    description: "Reliable timelines, transparent communication, and high-quality work that performs.",
    icon: Fingerprint,
    className: "md:col-span-1",
  },
  {
    title: "The Difference",
    description: "A unique blend of design expertise and AI-driven problem solving.",
    icon: Lightbulb,
    className: "md:col-span-1",
  },
  {
    title: "Measuring Success",
    description: "Increased conversions, smoother workflows, and measurable business impact.",
    icon: BarChart3,
    className: "md:col-span-1",
  },
];

const AboutBentoNoImages = () => {
  return (
    <section className=" text-white py-24 px-6 md:px-12 lg:px-24 font-manrope relative overflow-x-hidden">
      
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-violet-300 text-xs font-medium uppercase tracking-wider mb-6 backdrop-blur-md">
            <SparkleIcon size={12} className="fill-violet-300" />
            About Us
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1] mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            Thoughtful design. <br /> Smart systems. Measurable impact.
          </h2>
          <p className=" text-zinc-400">
            We bridge the gap between creative ambition and technical reality, building digital products that scale with your business.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          
          {/* Main Content Cards */}
          {aboutBentoData.map((item, index) => (
            <BentoCard 
              key={index} 
              title={item.title} 
              description={item.description} 
              icon={item.icon} 
              className={item.className}
            />
          ))}

          {/* Feature: The "Results" & Newsletter Card */}
          <div className="md:col-span-3 rounded-3xl p-[1px] bg-gradient-to-br from-white/10 via-white/5 to-transparent relative group overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
             
             <div className="h-full w-full rounded-3xl bg-[#0a0a0c] p-8 md:p-10 flex flex-col md:flex-row items-center gap-10 relative z-10">
                {/* Left Text */}
                <div className="flex-1">
                    <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mb-6">
                        <Zap className="text-violet-400" size={24} />
                    </div>
                    <h3 className="text-2xl font-semibold mb-3">The Results We Deliver</h3>
                    <p className="text-zinc-400 leading-relaxed max-w-xl">
                        Websites and systems that sustain growth, enable automation, reduce manual work, and adapt as your business evolves.
                    </p>
                </div>

                {/* Right Form */}
                <div className="w-full md:w-96 p-6 rounded-2xl bg-[#0f0f12] border border-white/5 shadow-2xl">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">System Status: Online</span>
                    </div>
                    <p className="text-sm text-zinc-300 mb-4 font-medium">Get curated insights on scaling digital products.</p>
                    <form className="flex gap-2">
                        <input 
                            type="email" 
                            placeholder="email@domain.com" 
                            className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-violet-500/50 transition-colors"
                        />
                        <button className="bg-white text-black px-4 py-2.5 rounded-lg hover:bg-zinc-200 transition-colors flex items-center justify-center">
                            <ArrowRight size={16} />
                        </button>
                    </form>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// Reusable Bento Card Component
const BentoCard = ({ 
  title, 
  description, 
  icon: Icon, 
  className 
}: { 
  title: string, 
  description: string, 
  icon: any, 
  className?: string 
}) => {
  return (
    <div className={cn(
      "group relative rounded-3xl p-[1px] bg-gradient-to-b from-white/10 to-transparent hover:from-violet-500/50 hover:to-indigo-500/50 transition-all duration-500",
      className
    )}>
      <div className="h-full w-full rounded-3xl bg-[#0b0b0e] p-8 flex flex-col justify-between relative overflow-hidden">
        
        {/* Hover Gradient Blob inside card */}
        <div className="absolute -right-20 -top-20 w-40 h-40 bg-violet-500/20 blur-[60px] rounded-full group-hover:bg-violet-500/30 transition-all duration-500" />

        <div className="relative z-10">
          <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-violet-500/20 group-hover:border-violet-500/30 transition-all duration-300">
            <Icon size={20} className="text-zinc-400 group-hover:text-violet-300 transition-colors" />
          </div>
          
          <h3 className="text-xl font-semibold text-zinc-100 mb-3 group-hover:text-white transition-colors">
            {title}
          </h3>
          <p className="text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutBentoNoImages;