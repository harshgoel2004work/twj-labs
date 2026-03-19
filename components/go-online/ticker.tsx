"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function GoOnlineTicker() {
  const t = useTranslations("Ticker");
  const items = [
    t("transform"), 
    t("scale"), 
    t("digitalize"), 
    t("succeed"), 
    t("grow"), 
    t("launch"), 
    t("dominate"), 
    t("convert")
  ];
  return (
    <div className="py-10 border-y border-white/5 overflow-hidden relative my-8">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#060609] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#060609] to-transparent z-10" />
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap"
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-6 px-6 text-sm font-bold uppercase tracking-[0.18em] text-white/10">
            {item}
            <span className="text-[#5449e8]/50 text-xl">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
