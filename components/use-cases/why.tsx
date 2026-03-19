"use client";

import React, { useMemo } from "react";
import { motion, Variants } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { UseCase } from '@/data/use-cases'
import CustomBadge from "../shared/custom-badge";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  },
};

const accentMap: Record<string, string> = {
  b2b: '#8140e6',
  ecommerce: '#2563eb',
  saas: '#0891b2',
  healthcare: '#059669',
  education: '#d97706',
  finance: '#16a34a',
  realestate: '#b45309',
  hospitality: '#be185d',
};

export default function UseCasesWhySharedIndustrySection({ useCase }: { useCase: UseCase }) {
  // Map the title to the accent color, stripping spaces to match keys (e.g., "Real Estate" -> "realestate")
  const accentHex = useMemo(() => {
    const key = useCase.title.toLowerCase().replace(/\s+/g, '');
    return accentMap[key] || '#6366f1'; // Fallback to an indigo color if not found
  }, [useCase.title]);

  // We pass the hex to a CSS variable to easily use it in Tailwind arbitrary classes
  const dynamicStyles = {
    '--accent': accentHex,
    '--accent-transparent': `${accentHex}1A`, // 10% opacity hex
    '--accent-glow': `${accentHex}33`,       // 20% opacity hex
  } as React.CSSProperties;

  return (
    <section
      style={dynamicStyles}
      className="relative w-full py-32 mb-16 overflow-hidden px-6 lg:px-0 text-white font-manrope selection:bg-[var(--accent)] selection:text-white"
    >

      {/* --- Dynamic Background Ambience --- */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay" style={{ backgroundImage: 'url("https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png")' }} />


      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

          {/* LEFT SECTION: Sticky Header */}
          <div className="lg:col-span-5 lg:sticky top-32">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center md:items-start gap-6"
            >
              {/* Badge */}
              <CustomBadge title="Why Choose us" darkMode={true} />

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.2] text-center md:text-start"
                style={{ fontFamily: "'Syne', sans-serif" }}>
                What makes our{` `}
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: `linear-gradient(to right, var(--accent), var(--accent))` }}
                >
                  {useCase.title}
                </span>
                {` `}solutions elite?
              </h1>

              <p className="text-sm md:text-base font-medium text-center md:text-start text-neutral-400 leading-relaxed max-w-md">
                We don&apos;t just build websites; we engineer digital experiences tailored specifically for the nuances of the {useCase.title} industry.
              </p>
            </motion.div>
          </div>

          {/* RIGHT SECTION: Feature Grid */}
          <div className="lg:col-span-7">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {useCase.whyChoosePoints.map((item, index) => {
                // Safely split the point into Title and Description if formatted like "Title: Description"
                const parts = item.split(':');
                const title = parts[0];
                const description = parts.length > 1 ? parts.slice(1).join(':') : null;

                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:-translate-y-1"
                  >
                    {/* Dynamic Border Gradient on Hover */}
                    <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-[var(--accent-glow)] transition-colors duration-500 pointer-events-none" />

                    {/* Soft Dynamic Glow Inside Card */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                      style={{ background: 'radial-gradient(circle at 100% 100%, var(--accent-transparent), transparent 70%)' }}
                    />

                    <div className="relative flex flex-col gap-5 z-10">
                      {/* Icon */}
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                        style={{ backgroundColor: 'var(--accent-transparent)', color: 'var(--accent)' }}
                      >
                        <CheckCircle2 size={22} />
                      </div>

                      {/* Text */}
                      <div className="flex flex-col gap-2">
                        <h4 className="text-lg font-semibold text-white/90 group-hover:text-white transition-colors">
                          {title}
                        </h4>
                        {description && (
                          <p className="text-sm text-neutral-400 leading-relaxed">
                            {description.trim()}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}