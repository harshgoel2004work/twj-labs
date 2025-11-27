"use client";
import React from "react";
import { motion } from "framer-motion";
import { BackgroundRippleEffect } from "../ui/background-ripple-effect";
import { Spotlight } from "../ui/spotlight-new";
import Image from "next/image";
import CustomBadge from "../shared/custom-badge";

const HeroEcommerce = () => {
  return (
    <div className="w-full font-manrope relative text-white z-0 overflow-hidden">
      {/* === BACKGROUND EFFECTS === */}
      <div className="absolute left-0 top-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute w-full h-full bg-radial from-black/20 to-black" />
        <BackgroundRippleEffect rows={19} />
      </div>

      <div className="absolute left-0 top-0 w-full h-full overflow-hidden z-10">
        <Spotlight />
      </div>

      <div className="absolute w-full h-screen top-0 left-0">
        <div
          className="absolute w-full max-w-3xl aspect-square rounded-full top-1/2 left-1/2 -translate-x-1/2 blur-[150px] animate-blob animation-delay-2000 z-20"
          style={{
            background:
              "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(248, 83%, 70%, 0.1) 0%, hsla(248, 83%, 60%, 0.5) 50%, hsla(248, 83%, 50%, 0) 80%)",
          }}
        />
      </div>

      {/* === CONTENT === */}
      <div className="flex flex-col items-center justify-center space-y-4 px-6 md:px-12 lg:px-28 py-36 relative overflow-hidden">
        {/* Tag */}
        <CustomBadge darkMode={true} title="Ecommerce Solutions" />

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="text-4xl lg:text-5xl 2xl:text-6xl font-medium leading-snug text-center lg:max-w-xl 2xl:max-w-3xl text-transparent bg-clip-text bg-linear-to-r from-[#ffffff] to-[#d5d5d5]"
        >
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#9993f1] to-[#5449e8]">
            Building beautiful
          </span>{" "}
          stores that convert
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center text-white/60 font-medium max-w-lg"
        >
          We specialize in creating stunning ecommerce websites that drive sales
          and growth for your business.
        </motion.p>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.6 }}
          viewport={{ once: true }}
          className="rounded-xl w-[98vw] md:w-[80vw] overflow-hidden max-w-7xl p-1 mt-14 opacity-80 bg-black/50 backdrop-blur-md border border-white/10"
        >
          <Image
            src="/shopify.png"
            alt="Ecommerce Hero Image"
            width={1500}
            height={1500}
            className="w-full rounded-xl"
          />
        </motion.div>

        {/* Bottom Gradient */}
        <div className="bg-[#060508] w-full scale-150 h-[25vh] md:h-[50vh] rounded-full absolute bottom-0 blur-2xl z-[2]" />

        <div className="bg-[#060508] z-[-2]">
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute inset-0 w-full h-full bg-radial from-black/0 to-black" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroEcommerce;
