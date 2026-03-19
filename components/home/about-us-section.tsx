"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import CustomBadge from "../shared/custom-badge";
import Link from "next/link";

import { useTranslations } from "next-intl";

export default function AboutSection() {
  const t = useTranslations('Home.About');
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0); // 0 → 1

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Start revealing when section top hits 80% of viewport,
      // finish when section bottom reaches 30% of viewport
      const start = windowH * 0.75;
      const end = windowH * 0.1;

      // How far the top of the section has travelled from `start` to `end`
      const traveled = start - rect.top;
      const total = start - end + rect.height * 0.5;

      const progress = Math.min(1, Math.max(0, traveled / total));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Split into words, preserving punctuation
  const fullText = t('content');
  const words = useMemo(() => fullText.split(" "), [fullText]);
  const revealCount = Math.round(scrollProgress * words.length);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-16 md:py-24 px-6 md:px-12"
      style={{ fontFamily: "'Syne', sans-serif" }}
    >


      <div className="relative z-10 mx-auto max-w-4xl flex flex-col items-center text-center gap-8 md:gap-12">

        <CustomBadge title={t('badge')} />

        {/* ── Scroll-reveal text ── */}
        <p
          className="text-[clamp(1.5rem,6vw,3.25rem)] leading-[1.2] md:leading-[1.18] tracking-tight"
          aria-label={fullText}
        >
          {words.map((word, i) => {
            const isRevealed = i < revealCount;
            // Smooth partial glow on the "frontier" word
            const isFrontier = i === revealCount;

            return (
              <span
                key={i}
                className="inline-block transition-all duration-300 ease-out mr-[0.28em]"
                style={{
                  color: isRevealed
                    ? "#ffffff"
                    : isFrontier
                      ? "rgba(255,255,255,0.45)"
                      : "rgba(255,255,255,0.14)",
                  textShadow: isRevealed
                    ? "0 0 20px rgba(139,92,246,0.35)"
                    : "none",
                  transform: isRevealed ? "translateY(0)" : "translateY(2px)",
                  filter: isFrontier ? "blur(0.4px)" : "none",
                }}
              >
                {word}
              </span>
            );
          })}
        </p>

        {/* ── CTA Button ── */}
        <Link
          href={'/contact-sales'}

          className="w-fit py-4 px-10 mt-2 rounded-xl text-sm font-semibold bg-[#5449e8] shadow-[inset_0_9px_15px_rgba(0,0,0,0.6)] shadow-violet-400 text-white  hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
        >
          {t('cta')}
        </Link>
      </div>

      {/* Font import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');
      `}</style>
    </section>
  );
}

/* ── Spinning ring decorative icon ── */
function SpinRing() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="w-5 h-5"
      style={{ animation: "spin 4s linear infinite" }}
    >
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <circle cx="10" cy="10" r="7" stroke="rgba(139,92,246,0.3)" strokeWidth="1.5" />
      <path
        d="M10 3 A7 7 0 0 1 17 10"
        stroke="#8b5cf6"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="10" cy="10" r="2.5" fill="#8b5cf6" opacity="0.8" />
    </svg>
  );
}