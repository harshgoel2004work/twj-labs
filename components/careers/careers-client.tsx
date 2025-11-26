"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, MapPin, Clock, ArrowRight, 
  SparkleIcon, Search, MonitorSmartphone 
} from "lucide-react";
import { cn } from "@/lib/utils";

// Define interface based on your Sanity Schema
export interface JobPost {
  _id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  remote: boolean;
  jobType: string;
  experienceLevel: string;
  featured: boolean;
}

const CareersClient = ({ jobs }: { jobs: JobPost[] }) => {
  const [selectedDept, setSelectedDept] = useState("All");

  // Extract unique departments for the filter bar
  const departments = ["All", ...Array.from(new Set(jobs.map((job) => job.department).filter(Boolean)))];

  // Filter Logic
  const filteredJobs = selectedDept === "All" 
    ? jobs 
    : jobs.filter((job) => job.department === selectedDept);

  return (
    <div className="min-h-screen bg-[#060609] text-white font-manrope selection:bg-indigo-500/30 relative overflow-hidden">
      
      {/* --- Background Ambience --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-1/2 -tranneutral-x-1/2 w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-900/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'url("https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png")' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-24 pt-32">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 bg-white/5 border border-white/10 backdrop-blur-md text-indigo-300 text-xs font-semibold uppercase tracking-widest shadow-sm mb-6"
          >
            <SparkleIcon size={14} className="fill-current" />
            We are hiring
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 mb-6"
          >
            Join the <span className="text-indigo-500">Revolution.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-neutral-400 max-w-2xl"
          >
            We are looking for thinkers, makers, and doers. Help us build the next generation of digital experiences.
          </motion.p>
        </div>

        {/* --- FILTER BAR --- */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={cn(
                "relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 outline-none",
                selectedDept === dept
                  ? "text-white"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              )}
            >
              {selectedDept === dept && (
                <motion.div
                  layoutId="activeDept"
                  className="absolute inset-0 bg-[#5449e8] rounded-full shadow-[0_0_20px_rgba(84,73,232,0.4)]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{dept}</span>
            </button>
          ))}
        </div>

        {/* --- JOBS GRID --- */}
        <motion.div layout className="grid grid-cols-1 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, index) => (
                <JobCard key={job._id} job={job} index={index} />
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-center py-20 border border-dashed border-white/10 rounded-2xl bg-white/[0.02]"
              >
                <p className="text-neutral-500">No open positions in this department right now.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* --- FOOTER CTA --- */}
        <div className="mt-24 text-center p-8 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.02] to-transparent">
            <h3 className="text-2xl font-bold mb-2">Don&apos;t see the right role?</h3>
            <p className="text-neutral-400 mb-6">We are always open to cold applications from talented individuals.</p>
            <a href="mailto:careers@twj.com" className="inline-flex items-center gap-2 text-sm font-bold text-white border-b border-indigo-500 pb-1 hover:text-indigo-400 transition-colors">
                Email Us Your Resume <ArrowRight size={16} />
            </a>
        </div>

      </div>
    </div>
  );
};

// --- SUB COMPONENT: JOB CARD ---
const JobCard = ({ job, index }: { job: JobPost; index: number }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link href={`/careers/${job.slug}`} className="block group">
        <div className={cn(
            "relative overflow-hidden rounded-2xl border p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all duration-300",
            job.featured 
                ? "bg-gradient-to-r from-[#5449e8]/10 to-transparent border-[#5449e8]/30 hover:border-[#5449e8]/50" 
                : "bg-[#0b090d] border-white/5 hover:border-white/10 hover:bg-white/[0.02]"
        )}>
          
          {/* Featured Glow */}
          {job.featured && (
             <div className="absolute top-0 left-0 w-1 h-full bg-[#5449e8]" />
          )}

          {/* Left Info */}
          <div className="flex-grow">
            <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {job.title}
                </h3>
                {job.featured && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-500 text-white shadow-lg shadow-indigo-500/20">
                        Featured
                    </span>
                )}
            </div>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-neutral-400">
                <span className="flex items-center gap-1.5">
                    <Briefcase size={14} className="text-indigo-400" /> {job.department}
                </span>
                <span className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-indigo-400" /> {job.location} {job.remote && "(Remote)"}
                </span>
                <span className="flex items-center gap-1.5">
                    <Clock size={14} className="text-indigo-400" /> {job.jobType}
                </span>
            </div>
          </div>

          {/* Right Action */}
          <div className="flex items-center gap-4 shrink-0">
             <div className="hidden md:block text-right">
                 <span className="block text-xs font-bold uppercase tracking-widest text-neutral-500">Level</span>
                 <span className="text-sm font-medium text-white capitalize">{job.experienceLevel}</span>
             </div>
             <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-all duration-300">
                <ArrowRight size={18} className="text-white -rotate-45 group-hover:rotate-0 transition-transform" />
             </div>
          </div>

        </div>
      </Link>
    </motion.div>
  );
};

export default CareersClient;