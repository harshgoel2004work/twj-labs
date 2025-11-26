"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import CustomBadge from "../shared/custom-badge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const HeroWebDesign = () => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div className="w-full min-h-screen font-manrope relative text-white z-0 overflow-hidden">
      {/* --- BACKGROUND LAYERS --- */}
      
      {/* 1. Grain Texture (Adds premium feel) */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-[2]" 
           style={{ backgroundImage: 'url("https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png")' }} 
      />

      {/* 2. Aurora Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-violet-600/5 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-600/5 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute top-[20%] left-[30%] w-[30vw] h-[30vw] bg-blue-500/5 rounded-full blur-[100px] mix-blend-screen" />
      </div>
      {/* TEXT CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col items-center justify-center space-y-4 px-8 md:px-28 py-36 z-[1] relative"
      >
        <CustomBadge darkMode={true} title="Web Design Services" />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl 2xl:text-7xl font-semibold leading-snug text-center max-w-5xl text-transparent bg-clip-text bg-linear-to-r from-[#ffffff] to-[#c5c5c5]"
        >
          Designing Websites & Apps
          <br />
          <span>that convert</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          viewport={{ once: true }}
          className="text-center text-white/60 font-medium max-w-2xl mt-1"
        >
          We specialize in creating stunning web design solutions that drive
          sales and growth for your business.
        </motion.p>

        <div className='pt-3 flex items-center gap-4 z-10'>
             <Link href={'/contact-sales'} className="px-6.5 py-3.5 rounded-full text-sm font-semibold bg-[#5449e8] shadow-[inset_0_9px_15px_rgba(0,0,0,0.6)] shadow-violet-400 cursor-pointer hover:shadow-[inset_0_-8px_15px_rgba(0,0,0,0.6)] hover:shadow-violet-400 transition-all duration-500">
                Contact Sales
            </Link>
            <Link href={'/our-work'} className="px-6.5 py-3.5 rounded-full text-sm font-medium bg-white/10 backdrop-blur-md border border-white/20 text-white cursor-pointer hover:bg-white/20 transition-all duration-300 flex items-center gap-2">
                Our Work <ArrowRight size={16}/>
            </Link>
           </div>
      </motion.div>

      {/* BACKGROUND GLOW */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
        className="absolute w-full h-screen top-0 left-0"
      >
        <div
          className="absolute w-full max-w-3xl aspect-square rounded-full top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 blur-[150px] animate-blob animation-delay-2000 z-20 opacity-30"
          style={{
            background:
              "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(248, 83%, 70%, 0.1) 0%, hsla(248, 83%, 60%, 0.5) 50%, hsla(248, 83%, 50%, 0) 80%)",
          }}
        />
      </motion.div>

      {/* FLOATING IMAGES */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        viewport={{ once: true }}
        className="absolute w-full h-full top-0 left-0 overflow-hidden z-[20]"
      >
        {/* Border container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="absolute w-[calc(100%-1.5rem)] left-1/2 -translate-x-1/2 border border-violet-500/50 h-[90vh] -translate-y-4 top-0"
        >
          <div className="bg-violet-500 -bottom-1 -left-1 w-3 aspect-square absolute" />
          <div className="bg-violet-500 -bottom-1 -right-1 w-3 aspect-square absolute" />
        </motion.div>

        {/* Floating images */}
        {[
          { src: "/web-design/1.jpg", className: "top-20 -left-12 w-34 md:w-52" },
          { src: "/web-design/2.jpg", className: "bottom-34 md:bottom-28 -left-4 w-34 md:w-48" },
          { src: "/web-design/5.jpg", className: "top-24 -right-12 w-32 md:w-44" },
          { src: "/web-design/3.jpg", className: "bottom-34 md:bottom-28 -right-4 w-34 md:w-48" },
        ].map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            whileInView={{ opacity: 0.4, y: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.3 + i * 0.15,
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.3 }}
            className={`absolute ${img.className} rounded-xl overflow-hidden transition duration-700 ease-in-out ${
              isHovered
                ? "opacity-100 translate-x-0"
                : "opacity-40 blur-[2px]"
            }`}
          >
            <Image
              src={img.src}
              alt="Web Design Hero Background"
              width={1920}
              height={1080}
              className="w-full h-full object-cover object-top"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default HeroWebDesign;
