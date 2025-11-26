"use client";

import React from "react";
import { motion } from "framer-motion";
import { Scaling, SparkleIcon, TrendingUp, Users } from "lucide-react";
import CustomBadge from "../shared/custom-badge";

const whyChooseUs = [
  {
    title: "Scalable By Design",
    description:
      "Start with a powerful website today and scale to complex custom software tomorrow. We are the partner that evolves with you.",
    icon: Scaling,
  },
  {
    title: "Long-Term Growth",
    description:
      "We don't just chase quick wins. We architect solutions designed to compound your business value over months and years.",
    icon: TrendingUp,
  },
  {
    title: "Transparent Process",
    description:
      "No black boxes. We believe in radical transparency, keeping you informed and involved at every milestone of the roadmap.",
    icon: SparkleIcon,
  },
  {
    title: "Dedicated Support",
    description:
      "Our relationship doesn't end at launch. We provide ongoing maintenance to ensure your digital assets perform at their peak.",
    icon: Users,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const TheTWJDifference = () => {
  return (
    // Added overflow-hidden here to stop the x-axis scroll/white bar issue
    <section className="w-full py-12 md:py-24 bg-[#050505] relative font-manrope text-white overflow-hidden">
      
      {/* Ambient Background Glow - Made responsive size */}
      <div className="absolute top-0 left-0 w-72 h-72 md:w-[500px] md:h-[500px] bg-indigo-900/20 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT SECTION: Header */}
          <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-24 text-center lg:text-left items-center lg:items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <CustomBadge darkMode={true} title="The TWJ Difference" />
              
              <h2 className="text-4xl md:text-4xl lg:text-5xl font-bold text-center md:text-start tracking-tight leading-[1.1] max-w-4xl bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/60 py-3">
                Why visionary brands choose us.
              </h2>
              
              <p className="text-white/50 text-base md:text-lg leading-relaxed mb-6">
                We bridge the gap between creative design and engineering excellence to build products that last.
              </p>
            </motion.div>
          </div>

          {/* RIGHT SECTION: Grid */}
          <motion.div 
            className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }} // Adjusted margin for better mobile triggering
          >
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group relative p-6 md:p-8 rounded-2xl bg-[#0b0b0b] border border-white/5 hover:border-violet-500/30 transition-all duration-300 hover:bg-[#141414]"
                >
                  {/* Icon Box */}
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500/10 to-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={24} className="text-indigo-400" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/60 group-hover:text-white/80 transition-colors">
                    {item.description}
                  </p>

                  {/* Decorative Gradient Blob on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
                </motion.div>
              );
            })}
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default TheTWJDifference;