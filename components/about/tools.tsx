"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import CustomBadge from "../shared/custom-badge";
import { useTranslations } from "next-intl";

/* ─── Animation Variants ─── */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function ToolsSection() {
  const t = useTranslations('About.Tools');

  const tools = [
    {
      name: "Zapier",
      category: t('categories.automation'),
      description: t('descriptions.zapier'),
      isPro: true,
      iconBg: "#ff4f00", // Zapier orange
      iconText: "zapier",
    },
    {
      name: "Slack",
      category: t('categories.communication'),
      description: t('descriptions.slack'),
      isPro: false,
      iconBg: "#ffffff", // Slack white bg
      iconText: "slack", 
    },
    {
      name: "Dropbox",
      category: t('categories.cloudStorage'),
      description: t('descriptions.dropbox'),
      isPro: false,
      iconBg: "#0061ff", // Dropbox blue
      iconText: "box",
    },
    {
      name: "Stripe",
      category: t('categories.payments'),
      description: t('descriptions.stripe'),
      isPro: false,
      iconBg: "#635bff", // Stripe purple
      iconText: "S",
    },
    {
      name: "Mailchimp",
      category: t('categories.emailMarketing'),
      description: t('descriptions.mailchimp'),
      isPro: true,
      iconBg: "#ffe01b", // Mailchimp yellow
      iconText: "M",
    },
    {
      name: "Github",
      category: t('categories.versionControl'),
      description: t('descriptions.github'),
      isPro: false,
      iconBg: "#ffffff", // Github white
      iconText: "git",
    },
  ];

  return (
    <section className="relative w-full bg-black py-24 px-6 md:px-12 overflow-hidden font-sans">
      
      {/* ─── Background Ambient Glows ─── */}
      <div className="pointer-events-none absolute inset-0 z-0 flex justify-center">
        {/* Left Glow Shape */}
        <div className="absolute top-0 left-[-10%] h-[500px] w-[50%] bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-blue-900/20 via-blue-900/5 to-transparent blur-[80px]" />
        {/* Right Glow Shape */}
        <div className="absolute top-0 right-[-10%] h-[500px] w-[50%] bg-[radial-gradient(ellipse_at_top_left,var(--tw-gradient-stops))] from-blue-900/20 via-blue-900/5 to-transparent blur-[80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        
        {/* ─── Header Section ─── */}
        <div className="flex flex-col items-center text-center mb-16">
          
          {/* ── badge ── */}
          <CustomBadge title={t('badge')}/>

          {/* ── headline ── */}
          <h2 className="text-center text-[clamp(2rem,5vw,3.5rem)] leading-[1.12] tracking-tight mb-4 mt-5">
            <span className="text-white">{t('titlePart1')}</span>
            <br />
            <span className="text-white/30">{t('titlePart2')}</span>
          </h2>

          {/* ── sub ── */}
          <p className="text-center text-[14.5px] leading-relaxed text-white/40 max-w-md mb-9">
            {t('description')}
          </p>
        </div>

        {/* ─── Grid Section ─── */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {tools.map((tool, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="group relative flex flex-col rounded-2xl border border-white/5 p-8 transition-all duration-300 hover:border-white/10 hover:bg-white/2"
              style={{
                background: "#090a11",
                boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.02)",
              }}
            >
              {/* Top Row: Icon & Arrow */}
              <div className="flex items-start justify-between mb-8">
                {/* Simulated Brand Icon (Circle) */}
                <div 
                  className="flex h-12 w-12 items-center justify-center rounded-full text-[10px] font-bold uppercase tracking-tighter text-black/80"
                  style={{ backgroundColor: tool.iconBg }}
                >
                  {tool.iconText.length > 3 ? (
                    <span className="text-white text-[11px] capitalize tracking-normal">{tool.iconText}</span>
                  ) : (
                    <span className={`${tool.iconBg === "#ffffff" ? "text-black" : "text-white"} text-lg`}>
                      {tool.iconText}
                    </span>
                  )}
                </div>

                <ArrowUpRight size={18} className="text-white/20 transition-colors duration-300 group-hover:text-white/60" />
              </div>

              {/* Title & Badge */}
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-lg font-semibold text-white">{tool.name}</h3>
                {tool.isPro && (
                  <span className="rounded-[4px] bg-blue-600 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    Pro
                  </span>
                )}
              </div>

              {/* Category */}
              <span className="text-[13px] text-white/40 mb-6">{tool.category}</span>

              {/* Description */}
              <p className="mt-auto text-[14px] leading-relaxed text-white/50">
                {tool.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}