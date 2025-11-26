"use client"

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SparkleIcon, Home, Layers, Briefcase, FileText, Share2, ArrowRight, LucideIcon } from "lucide-react";


// --- SITEMAP DATA STRUCTURE ---
const sitemapData: { category: string; icon: LucideIcon; links: { name: string; href: string; external?: boolean }[] }[] = [
  {
    category: "Main",
    icon: Home,
    links: [
      { name: "Home", href: "/" },
      { name: "About Us", href: "/about" },
      { name: "Contact Sales", href: "/contact" },
      { name: "Pricing", href: "/pricing" },
    ],
  },
  {
    category: "Services",
    icon: Layers,
    links: [
      { name: "Web Design", href: "/services/web-design" },
      { name: "Web Development", href: "/services/web-development" },
      { name: "E-Commerce", href: "/services/ecommerce" },
      { name: "SaaS Development", href: "/services/saas" },
      { name: "SEO & Marketing", href: "/services/seo" },
    ],
  },
  {
    category: "Portfolio",
    icon: Briefcase,
    links: [
      { name: "All Projects", href: "/work" },
      { name: "Case Study: FinTech", href: "/work/fintech" },
      { name: "Case Study: Health", href: "/work/health" },
    ],
  },
  {
    category: "Legal",
    icon: FileText,
    links: [
      { name: "Privacy Policy", href: "/legal/privacy-policy" },
      { name: "Terms of Service", href: "/legal/terms-of-service" },
      { name: "Cookie Policy", href: "/legal/cookie-policy" },
    ],
  },
  {
    category: "Socials",
    icon: Share2,
    links: [
      { name: "LinkedIn", href: "https://linkedin.com", external: true },
      { name: "Twitter", href: "https://twitter.com", external: true },
      { name: "Instagram", href: "https://instagram.com", external: true },
    ],
  },
];

const SitemapPage = () => {
  return (
    <div className="min-h-screen bg-[#060609] text-white font-manrope selection:bg-indigo-500/30 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-linear-to-b from-indigo-900/10 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 bg-white/5 border border-white/10 backdrop-blur-md text-indigo-300 text-xs font-semibold uppercase tracking-widest shadow-sm mb-6">
            <SparkleIcon size={14} className="fill-current" />
            Overview
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-b from-white to-white/50">
            Sitemap
          </h1>
          <p className="mt-4 text-slate-400">
            A bird&apos;s eye view of the entire TWJ Labs digital experience.
          </p>
        </div>

        {/* Sitemap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sitemapData.map((section, idx) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#0b090d] border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-colors duration-300 group"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all duration-300">
                    <Icon size={24} />
                  </div>
                  <h2 className="text-xl font-bold">{section.category}</h2>
                </div>

                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        target={link.external ? "_blank" : "_self"}
                        className="flex items-center justify-between group/link text-sm text-slate-400 hover:text-white transition-colors py-1"
                      >
                        <span>{link.name}</span>
                        {link.external ? (
                           <span className="text-[10px] px-2 py-0.5 rounded border border-white/10 bg-white/5">EXT</span>
                        ) : (
                           <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all text-indigo-400" />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
        
      </div>
    </div>
  );
};

export default SitemapPage;