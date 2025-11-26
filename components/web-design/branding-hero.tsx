"use client";

import { SparkleIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import CustomBadge from "../shared/custom-badge";
import Image from "next/image";

const brandingImages = [
  "/stock/branding-1.jpg", // Replace with your actual image paths
  "/stock/branding-2.jpg",
  "/stock/branding-3.jpg",
  "/stock/branding-4.jpg",
  "/stock/branding-5.jpg",
  "/stock/branding-6.jpg",
  "/stock/branding-7.jpg",
  "/stock/branding-8.jpg",
];

const BrandingHero = () => {
  return (
    <section className="w-full min-h-[95vh] font-manrope relative text-white z-0 overflow-hidden bg-[#060609]">
      {/* --- BACKGROUND EFFECTS --- */}
      <div className="absolute left-0 top-0 w-full h-full pointer-events-none font-manrope">
        {/* Subtle starfield noise */}
        <div
          className="absolute inset-0 z-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, white 0.5px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Blur Overlay */}
        <div className="w-full h-full top-0 left-0 absolute backdrop-blur-3xl z-[1]" />

        {/* Gradient Blobs */}
        <div className="w-[60vw] h-[60vw] rounded-full blur-[120px] opacity-30 bg-violet-600/30 -rotate-12 absolute -left-[10%] -top-[20%] animate-pulse-slow" />
        <div className="w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-30 bg-indigo-600/30 rotate-12 absolute -right-[5%] top-[10%] animate-pulse-slow"
             style={{ animationDelay: "2s" }}
        />

        {/* Radial Gradient Overlay for depth */}
        <div className="absolute inset-0 bg-radial-at-t from-transparent via-[#060609]/50 to-[#060609] z-[2]" />
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 w-full pt-32 pb-20 flex flex-col items-center px-6 md:px-12 lg:px-24 text-center">
        <CustomBadge darkMode={true} title="Branding Services" />

        <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.15] max-w-4xl">
          <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">
            Crafting Brands That
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-violet-300">
             Inspire Loyalty and Growth.
          </span>
        </h1>

        <p className="mt-6 text-slate-400 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
          We build compelling brand identities that resonate with your
          audience, differentiate you from competitors, and drive long-term business success.
        </p>

        <div className="mt-10 flex items-center gap-4 z-10">
          <Link
            href={"/contact-sales"}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-white transition-all duration-300 bg-indigo-600 rounded-full hover:bg-indigo-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#060609] overflow-hidden"
          >
             <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-indigo-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></span>
             <span className="relative flex items-center gap-2">
                 Start Your Project <SparkleIcon size={16} className="fill-white/50" />
             </span>
          </Link>
          <Link href="/work" className="px-8 py-4 rounded-full text-sm font-semibold text-white border border-white/10 hover:bg-white/5 transition-colors">
             View Our Work
          </Link>
        </div>
      </div>

      {/* --- IMAGE SCROLLER (MARQUEE) --- */}
      <div className="relative z-10 w-full overflow-hidden py-10">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-[#060609] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-[#060609] to-transparent z-20 pointer-events-none" />

        <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused]">
          {/* Double the list for seamless looping */}
          {[...brandingImages, ...brandingImages].map((src, index) => {
            // Generate random heights and offsets for a dynamic look
            const height = [400, 300, 350, 250, 320, 380, 280, 360][index % 8];
            const translateY = [-40, 10, -30, 0, -20, 30, 10, -10][index % 8];

            return (
              <div
                key={index}
                className="relative shrink-0 rounded-2xl overflow-hidden border border-white/5 shadow-2xl shadow-indigo-500/10 group"
                style={{
                  width: `${height * 0.75}px`, // Maintain aspect ratio
                  height: `${height}px`,
                  transform: `translateY(${translateY}px)`,
                }}
              >
                <Image
                  src={src}
                  alt={`Branding Portfolio Image ${index}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 300px, 400px"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BrandingHero;