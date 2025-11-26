"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Briefcase, MapPin, Clock, DollarSign, 
  ChevronLeft, ArrowRight, CheckCircle2, 
  SparkleIcon, Mail 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PortableText, PortableTextComponents } from "@portabletext/react";

// --- TYPES ---
export interface JobPostDetails {
  _id: string;
  title: string;
  department: string;
  location: string;
  remote: boolean;
  jobType: string;
  experienceLevel: string;
  salaryRange?: string;
  postedAt: string;
  description: any[]; // Portable Text
  responsibilities?: string[];
  qualifications?: string[];
  benefits?: string[];
  applyEmail?: string;
  applyUrl?: string;
}

// --- PORTABLE TEXT COMPONENTS ---
const ptComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="text-neutral-300 leading-relaxed mb-6">{children}</p>,
    h2: ({ children }) => <h2 className="text-2xl font-bold text-white mt-10 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-semibold text-indigo-200 mt-8 mb-3">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-indigo-500 bg-white/5 p-4 pl-6 my-6 text-neutral-300 italic rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-inside text-neutral-300 space-y-2 mb-6">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-inside text-neutral-300 space-y-2 mb-6">{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
    link: ({ children, value }) => (
      <a href={value.href} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">
        {children}
      </a>
    ),
  },
};

const JobPostClient = ({ job }: { job: JobPostDetails }) => {
  
  // Determine apply link (URL takes precedence over Email)
  const applyLink = job.applyUrl 
    ? job.applyUrl 
    : job.applyEmail 
      ? `mailto:${job.applyEmail}?subject=Application for ${job.title}` 
      : "#contact";

  return (
    <div className="min-h-screen bg-[#060609] text-white font-manrope selection:bg-indigo-500/30 relative overflow-hidden">
      
      {/* --- Background Ambience --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-900/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.01]" style={{ backgroundImage: 'url("https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png")' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-24">
        
        {/* --- BREADCRUMB --- */}
        <Link href="/careers" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition-colors mb-12 group">
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Careers
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* --- LEFT CONTENT (8 Cols) --- */}
          <div className="lg:col-span-8">
            
            {/* Hero Header */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
            >
                <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-widest">
                        {job.department}
                    </span>
                    {job.remote && (
                        <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                            Remote
                        </span>
                    )}
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6">
                    {job.title}
                </h1>

                <div className="flex flex-wrap gap-6 text-sm text-neutral-400">
                    <span className="flex items-center gap-1.5">
                        <MapPin size={16} className="text-indigo-400" /> {job.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Clock size={16} className="text-indigo-400" /> {job.jobType}
                    </span>
                    {job.salaryRange && (
                        <span className="flex items-center gap-1.5">
                            <DollarSign size={16} className="text-indigo-400" /> {job.salaryRange}
                        </span>
                    )}
                </div>
            </motion.div>

            {/* Main Description */}
            <div className="prose prose-invert max-w-none mb-12">
                <PortableText value={job.description} components={ptComponents} />
            </div>

            {/* Lists Section (Responsibilities, Qualifications, Benefits) */}
            <div className="space-y-12">
                {job.responsibilities && job.responsibilities.length > 0 && (
                    <SectionList title="Responsibilities" items={job.responsibilities} />
                )}
                
                {job.qualifications && job.qualifications.length > 0 && (
                    <SectionList title="Qualifications" items={job.qualifications} />
                )}

                {job.benefits && job.benefits.length > 0 && (
                    <SectionList title="Benefits" items={job.benefits} />
                )}
            </div>

          </div>

          {/* --- RIGHT SIDEBAR (4 Cols) - Sticky --- */}
          <div className="lg:col-span-4">
            <div className="sticky top-32">
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl shadow-2xl shadow-black/20"
                >
                    <h3 className="text-xl font-bold text-white mb-2">Interested?</h3>
                    <p className="text-neutral-400 text-sm mb-8 leading-relaxed">
                        If you think you are a good fit for this role, we would love to hear from you.
                    </p>

                    <a 
                        href={applyLink}
                        target={job.applyUrl ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                        className="group w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-tranneutral-y-1"
                    >
                        Apply Now 
                        <ArrowRight size={16} className="group-hover:tranneutral-x-1 transition-transform" />
                    </a>

                    <div className="mt-6 pt-6 border-t border-white/5">
                        <p className="text-xs text-neutral-500 text-center mb-4">Or share this role</p>
                        <div className="flex justify-center gap-4">
                            <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-white text-neutral-400 transition-colors">
                                <Mail size={18} />
                            </button>
                            {/* Add more share buttons if needed */}
                        </div>
                    </div>
                </motion.div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// Helper for rendering list sections
const SectionList = ({ title, items }: { title: string; items: string[] }) => (
    <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <SparkleIcon size={16} className="text-indigo-400" /> {title}
        </h3>
        <ul className="space-y-4">
            {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-neutral-300 leading-relaxed">
                    <CheckCircle2 size={18} className="text-indigo-500 shrink-0 mt-1" />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    </div>
);

export default JobPostClient;