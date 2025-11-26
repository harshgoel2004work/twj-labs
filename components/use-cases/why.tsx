"use client";

import React from "react";
import { motion } from "framer-motion";
import { SparkleIcon, CheckCircle2 } from "lucide-react";
import { UseCase } from '@/data/use-cases'
import CustomBadge from "../shared/custom-badge";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
  },
};

const UseCasesWhySharedIndustrySection = ({ useCase }: { useCase: UseCase }) => {
  return (
    <section className="relative w-full py-32 overflow-hidden bg-[#060609] text-white font-manrope">
      
      {/* --- Background Ambience --- */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Noise Texture */}
        <div className="absolute inset-0 opacity-[0.0]" style={{ backgroundImage: 'url("https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png")' }} />
       
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* LEFT SECTION: Sticky Header */}
          <div className="lg:col-span-5 lg:sticky ">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center md:items-start gap-6"
            >
              {/* Badge */}
              <CustomBadge title="Why Choose us" darkMode={true}/>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.2] text-center md:text-start">
                What makes our{` `} 
                <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-300  to-indigo-500">
                  {useCase.title} {` `} 
                </span> 
                solutions elite?
              </h1>

              <p className="text-sm md:text-base font-medium text-center md:text-start text-neutral-500 leading-relaxed max-w-md">
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
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {useCase.whyChoosePoints.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-indigo-500/30 transition-all duration-500"
                >
                  {/* Card Glow Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                  
                  <div className="relative flex flex-col gap-4">
                    {/* Icon */}
                    <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-500/20 transition-all duration-500">
                      <CheckCircle2 size={18} className="text-indigo-400 group-hover:text-indigo-300" />
                    </div>
                    
                    {/* Text */}
                    <h4 className=" font-medium  leading-snug group-hover:text-white transition-colors">
                      {item.split(':').map((line, i) => (
                        <span key={i} className={i === 0 ? 'font-semibold' : 'text-neutral-400 '}>{line}{i < item.split(':').length - 1 ? <br className=""/> : ""}</span>
                      ))}
                    </h4>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default UseCasesWhySharedIndustrySection;