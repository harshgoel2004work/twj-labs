"use client";

import GlowingCard from "../ui/glow-card"; // Keeping your import
import { cn } from "@/lib/utils"; // Assuming you have this utility
import CustomBadge from "./custom-badge";
import { IconType } from "react-icons";

const SubservicesShared = ({
  subservices,
  title,
  darkMode = false,
}: {
  subservices: { title: string; description: string; icon: IconType }[];
  title: string;
  darkMode?: boolean;
}) => {
  
  // Centralized Theme Configuration
  const theme = {
    bg: darkMode ? "bg-[#060609]" : "bg-[#F4F5F9]",
    gridPattern: darkMode ? "bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]" : "bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)]",
    textPrimary: darkMode ? "text-white" : "text-slate-900",
    textSecondary: darkMode ? "text-white/60" : "text-slate-500",
    badgeBg: darkMode ? "bg-white/5 border-white/10 text-violet-300" : "bg-white border-slate-200 text-violet-600",
    headerGradient: darkMode ? "from-white via-white to-white/60" : "from-slate-900 to-slate-700",
  };

  return (
    <section
      className={cn(
        "relative w-full py-24 px-6 md:px-12 lg:px-24 font-manrope overflow-hidden transition-colors duration-500",
        theme.bg
      )}
    >
      {/* 1. Background Grid Pattern (Technical Look) */}
      <div 
        className={cn(
            "absolute inset-0 bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-20",
            theme.gridPattern
        )} 
      />

      {/* 2. Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-violet-600/5 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none z-0" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="flex flex-col items-center gap-6 text-center mb-16 max-w-3xl">
          <CustomBadge darkMode={darkMode} title="Services Offered" />

          <h1
            className={cn(
              "text-4xl md:text-4xl lg:text-5xl font-bold text-center tracking-tight leading-[1.2] max-w-3xl bg-clip-text text-transparent bg-gradient-to-b ",
              theme.headerGradient
            )}
          >
            {title}
          </h1>
          
          <p className={cn(" max-w-2xl leading-relaxed", theme.textSecondary)}>
            We provide comprehensive solutions tailored to your business needs, ensuring scalability and performance at every step.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-center items-stretch">
          {subservices.map((service, index) => (
            <div key={index} className="h-full">
                {/* Note: Assuming GlowingCard handles its own internal height. 
                   If not, add 'h-full' to the component below if it accepts className 
                */}
                <GlowingCard item={service} darkMode={darkMode} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SubservicesShared;