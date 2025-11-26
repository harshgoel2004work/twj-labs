"use client";

import { cn } from "@/lib/utils";
import { SparkleIcon } from "lucide-react";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomBadge from "../shared/custom-badge";

export const projectProcess = [
  {
    step: 1,
    title: "Discovery & Strategy",
    tagline: "Understanding your goals and defining the roadmap.",
    description:
      "We start by understanding your business, target audience, and project objectives. Through research, consultations, and competitor analysis, we craft a clear strategy and project roadmap that aligns with your vision and goals.",
  },
  {
    step: 2,
    title: "Design & Planning",
    tagline: "Transforming ideas into captivating, functional designs.",
    description:
      "Our design team creates visually stunning and user-friendly interfaces that reflect your brand identity. We plan every detail—from layout to user flow—to ensure a seamless and engaging experience.",
  },
  {
    step: 3,
    title: "Development & Implementation",
    tagline: "Building scalable, high-performing digital solutions.",
    description:
      "Once the design is approved, we bring it to life using modern frameworks and best development practices. Our team ensures every element is optimized for performance, security, and scalability.",
  },
  {
    step: 4,
    title: "Launch & Optimization",
    tagline: "Delivering, testing, and continuously improving your product.",
    description:
      "After launch, we monitor performance and user feedback to ensure smooth operation. We provide ongoing optimization, updates, and support to help your project grow and stay ahead of the competition.",
  },
];

const OurProjectProcess = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [progress, setProgress] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  
  const DURATION = 10000; // 10 seconds per slide
  const INTERVAL_TIME = 100; // Update tick

  const handleNext = useCallback(() => {
    setActiveStep((prev) => (prev === projectProcess.length ? 1 : prev + 1));
    setProgress(0);
  }, []);

  // Timer Logic
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        // Calculate increment based on interval and total duration
        return prev + (INTERVAL_TIME / DURATION) * 100;
      });
    }, INTERVAL_TIME);

    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

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
          How We Work On Our Projects
        </h1>
        <p className="text-white/60 text-center max-w-xl">
           A streamlined workflow designed to take your idea from concept to reality efficiently.
        </p>
      </div>

      {/* Accordion Container */}
      <div 
        className="flex flex-col lg:flex-row gap-4 w-full h-auto lg:h-[500px] max-w-7xl mx-auto"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {projectProcess.map((process) => {
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

export default OurProjectProcess;