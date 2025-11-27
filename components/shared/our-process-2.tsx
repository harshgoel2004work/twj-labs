'use client';

import { cn } from "@/lib/utils";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomBadge from "../shared/custom-badge";
import { ProcessType } from "@/types";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";
import { services } from "@/data/services";

const OurProcessDynamicAlt = ({ slug, title, darkMode }: { slug:string, title: string, darkMode: boolean }) => {
  const processArr:{
    step: number
    title: string
    description: string
    image?: string
    tagline?: string
    icon?: IconType | LucideIcon | React.ComponentType<{ size?: number, className?: string }>;
  }[] = services[1].servicesList.find(service => service.slug === slug)?.webPageContent?.process || [];
  const [activeStep, setActiveStep] = useState<number>(1);
  const [progress, setProgress] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const DURATION = 10000; // ms per slide
  const INTERVAL_TIME = 100; // ms tick

  // advance to next slide (wraps to 1)
  const handleNext = useCallback(() => {
    setActiveStep((prev) => (prev === processArr.length ? 1 : prev + 1));
    setProgress(0);
  }, [processArr.length]);

  // Timer Logic
  useEffect(() => {
    if (isPaused) return;

    const increment = (INTERVAL_TIME / DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + increment, 100);
        if (next >= 100) {
          // next tick will read reset from handleNext; but call handleNext here to avoid race
          // use setTimeout to avoid updating state while in interval callback too aggressively
          // but it's fine to call directly:
          handleNext();
          return 0;
        }
        return next;
      });
    }, INTERVAL_TIME);

    return () => clearInterval(timer);
  }, [isPaused, handleNext, INTERVAL_TIME, DURATION]);

  // Manual Click Handler
  const handleStepClick = (step: number) => {
    setActiveStep(step);
    setProgress(0);
  };

  return (
    <section className="w-full px-6 md:px-12 lg:px-24 font-manrope py-24 bg-[#060609]">
      {/* Header */}
      <div className="flex flex-col items-center gap-4 mb-16">
        <CustomBadge title={'Our Process'} darkMode={true} />
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-center leading-[1.1] max-w-3xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
          {title}
        </h1>
        <p className="text-white/60 text-center max-w-xl">
          A streamlined approach to delivering exceptional digital experiences.
        </p>
      </div>

      {/* Accordion Container */}
      <div
        className="flex flex-col lg:flex-row gap-4 w-full h-auto lg:h-[500px] max-w-7xl mx-auto"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {processArr.map((process) => {
          const isActive = activeStep === process.step;

          return (
            <motion.div
              key={process.step}
              layout
              onClick={() => handleStepClick(process.step)}
              className={cn(
                "relative rounded-2xl overflow-hidden cursor-pointer transition-colors duration-500 group border",
                isActive
                  ? "flex-[3] bg-[#0c0c12] border-white/10 shadow-2xl shadow-indigo-500/10"
                  : "flex-[1] bg-white/[0.02] border-white/5 hover:bg-white/[0.05]"
              )}
              initial={false}
              animate={{
                flex: isActive ? 3 : 1,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 30 }}
            >

              {/* Progress Bar (Only visible when active) */}
              {isActive && (
                <div className="absolute top-0 left-0 w-full h-1 bg-white/10 z-20">
                  <motion.div
                    className="h-full bg-indigo-500"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: "linear", duration: 0.1 }}
                  />
                </div>
              )}

              {/* Background Glows */}
              {isActive && (
                <>
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[80px] pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-600/10 rounded-full blur-[80px] pointer-events-none" />
                </>
              )}

              {/* Content Wrapper */}
              <div className="relative z-10 w-full h-full p-6 md:p-8 flex flex-col">

                {/* --- HEADER: Step Number --- */}
                <div className="flex justify-between items-start mb-6">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border transition-colors duration-300",
                    isActive
                      ? "bg-indigo-600 text-white border-indigo-500"
                      : "bg-white/5 text-slate-500 border-white/10 group-hover:border-white/20 group-hover:text-slate-300"
                  )}>
                    {process.step}
                  </div>
                </div>

                {/* --- BODY: Active Content --- */}
                <AnimatePresence mode="popLayout">
                  {isActive ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col justify-end h-full"
                    >
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        {process.title}
                      </h2>
                      <h3 className="text-indigo-300 text-sm font-semibold uppercase tracking-wider mb-4">
                        {process.tagline}
                      </h3>
                      <p className="text-white/50 leading-relaxed text-sm md:text-base max-w-2xl">
                        {process.description}
                      </p>
                    </motion.div>
                  ) : (
                    // --- BODY: Inactive Vertical Title (Desktop) ---
                    <div className="hidden lg:flex flex-grow items-center justify-center">
                      <h2 className="text-lg font-bold text-neutral-600 whitespace-nowrap -rotate-90 origin-center tracking-wider group-hover:text-neutral-400 transition-colors">
                        {process.title}
                      </h2>
                    </div>
                  )}
                </AnimatePresence>

                {/* Mobile/Tablet Title for Inactive State (Hidden on Desktop) */}
                {!isActive && (
                  <div className="lg:hidden mt-4">
                    <h2 className="text-lg font-bold text-slate-500 group-hover:text-slate-300 transition-colors">
                      {process.title}
                    </h2>
                  </div>
                )}

              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default OurProcessDynamicAlt;
