"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import CustomBadge from "../shared/custom-badge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

// --- COMPONENT: Editable Headline ---
const EditableHeadline = () => {
  const [isEditing, setIsEditing] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  // Handle click outside to deselect
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsEditing(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- RESTRICTION LOGIC ---
  const checkLineLimit = (e: React.KeyboardEvent<HTMLHeadingElement>) => {
    const el = textRef.current;
    if (!el) return;

    const computedStyle = window.getComputedStyle(el);
    // Parse line height (handle 'normal' or pixel values)
    const lineHeightVal =
      computedStyle.lineHeight === "normal"
        ? parseFloat(computedStyle.fontSize) * 1.2
        : parseFloat(computedStyle.lineHeight);

    // Calculate max allowed height (with a small buffer for sub-pixel rendering)
    const maxHeight = lineHeightVal * 2 + 2; 

    // 1. BLOCK ENTER KEY if we are already at or exceeding 1 line break
    if (e.key === "Enter") {
      // If adding a new line would exceed 2 lines height
      // Or simply: if we already have a <br> or \n and we are at the visual limit
      if (el.scrollHeight > lineHeightVal * 1.5) {
        e.preventDefault();
      }
    }

    // 2. BLOCK TYPING if we are ALREADY overflowing (Soft Wrap limit)
    // Allow 'Backspace', 'Delete', and arrows so user isn't stuck
    const allowedKeys = [
      "Backspace",
      "Delete",
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
    ];
    if (
      el.scrollHeight > maxHeight &&
      !allowedKeys.includes(e.key) &&
      !e.metaKey &&
      !e.ctrlKey
    ) {
      e.preventDefault();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    // specific paste logic could go here (e.g. insert text plain)
    // For now, blocking paste to prevent massive layout breaks is safest
    // or allow pasting only plain text and run the height check immediately after
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
      className="relative group w-fit mx-auto z-1"
      onClick={() => setIsEditing(true)}
    >
      {/* --- DESIGN TOOL SELECTION UI --- */}
      <div
        className={`absolute -inset-4 border-[1.5px] pointer-events-none transition-all duration-200 ${
          isEditing
            ? "border-[#0d99ff] opacity-100"
            : " border-[#0d99ff]/50 opacity-50"
        }`}
      >
        <div className="absolute -top-6 left-0 bg-[#0d99ff] text-white text-[10px] px-1.5 py-0.5 rounded-t-sm font-sans tracking-wide">
          H1 &bull; Text
        </div>
        <>
          <div className="absolute -top-1.5 -left-1.5 w-2.5 h-2.5 bg-white border border-[#0d99ff] shadow-sm" />
          <div className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-white border border-[#0d99ff] shadow-sm" />
          <div className="absolute -bottom-1.5 -left-1.5 w-2.5 h-2.5 bg-white border border-[#0d99ff] shadow-sm" />
          <div className="absolute -bottom-1.5 -right-1.5 w-2.5 h-2.5 bg-white border border-[#0d99ff] shadow-sm" />
        </>
      </div>

      {/* --- EDITABLE TEXT --- */}
      <h1
        ref={textRef}
        contentEditable
        suppressContentEditableWarning={true}
        onKeyDown={checkLineLimit}
        onPaste={handlePaste}
        className="text-4xl md:text-6xl 2xl:text-7xl font-semibold leading-snug text-center outline-none min-w-[200px] w-[80vw] md:max-w-[60vw] cursor-text caret-white overflow-hidden line-clamp-4 md:line-clamp-2"
        style={{
          textShadow: "0px 0px 0px rgba(255,255,255,0)",
        }}
      >
        Designing Websites & Apps
        <br />
        <span className="opacity-90">that convert</span>
      </h1>
    </motion.div>
  );
};

// --- MAIN COMPONENT ---
const HeroWebDesign = () => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div className="w-full pb-[20vh] md:pb-0 md:min-h-screen font-manrope relative text-white z-0 overflow-hidden">
      {/* --- BACKGROUND LAYERS --- */}

      {/* 1. Grain Texture */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none z-[2]"
        style={{
          backgroundImage:
            'url("https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png")',
        }}
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
        className="z-[25] relative w-fit mx-auto mt-32 md:mt-40 lg:mt-[22vh] space-y-5 px-4 flex flex-col items-center justify-center"
      >
        <CustomBadge darkMode={true} title="Web Design Services" />

        <EditableHeadline />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          viewport={{ once: true }}
          className="text-center text-white/60 font-medium max-w-2xl select-none text-sm md:text-base"
        >
          We specialize in creating stunning web design solutions that drive sales
          and growth for your business.
        </motion.p>

        <div className="pt-3 flex items-center gap-4 z-10">
          <Link
            href={"/contact-sales"}
            className="px-6.5 py-3.5 rounded-full text-sm font-semibold bg-[#5449e8] shadow-[inset_0_9px_15px_rgba(0,0,0,0.6)] shadow-violet-400 cursor-pointer hover:shadow-[inset_0_-8px_15px_rgba(0,0,0,0.6)] hover:shadow-violet-400 transition-all duration-500"
          >
            Contact Sales
          </Link>
          <Link
            href={"/work"}
            className="px-6.5 py-3.5 rounded-full text-sm font-medium bg-white/10 backdrop-blur-md border border-white/20 text-white cursor-pointer hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
          >
            Our Work <ArrowRight size={16} />
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
        className="absolute w-full h-[70vh] md:h-full top-0 left-0 overflow-hidden z-[20] pointer-events-none "
      >
        {/* Border container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          // Only enable pointer events for this container to detect hover
          className="absolute w-[calc(100%-1.5rem)] left-1/2 -translate-x-1/2 border border-violet-500/50 h-[70vh] md:h-[90vh] -translate-y-4 top-0 pointer-events-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="bg-violet-500 -bottom-1 -left-1 w-3 aspect-square absolute" />
          <div className="bg-violet-500 -bottom-1 -right-1 w-3 aspect-square absolute" />
        </motion.div>

        {/* Floating images */}
        {[
          {
            src: "/web-design/1.jpg",
            className: "top-20 -left-20 md:-left-12 w-34 md:w-52 2xl:w-72",
            hovered: "translate-x-5 md:translate-x-20",
          },
          {
            src: "/web-design/2.jpg",
            className:
              "bottom-14 md:bottom-28 2xl:bottom-40 -left-10 md:-left-4 w-34 md:w-48 2xl:w-72",
            hovered: "translate-x-5 md:translate-x-20",
          },
          {
            src: "/web-design/5.jpg",
            className: "top-24 -right-12 w-32 md:w-44 2xl:w-72",
            hovered: "-translate-x-5 md:-translate-x-20",
          },
          {
            src: "/web-design/3.jpg",
            className:
              "bottom-14 md:bottom-28 -right-4 2xl:bottom-40 w-34 md:w-48 2xl:w-72",
            hovered: "-translate-x-5 md:-translate-x-20",
          },
        ].map((img, i) => (
          <motion.div
            key={i}
            transition={{
              duration: 0.8,
              delay: 0.3 + i * 0.15,
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.3 }}
            className={`absolute ${
              img.className
            } rounded-xl overflow-hidden transition duration-700 ease-in-out ${
              isHovered
                ? `opacity-100 ${img.hovered || "translate-x-0"}`
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