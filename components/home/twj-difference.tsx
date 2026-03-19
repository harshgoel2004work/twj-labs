"use client";

import React from "react";
import BentoGridSection from "./bento";
import { useTranslations } from "next-intl";

/* ─── reusable NEW badge ─────────────────────────────────────── */
function NewBadge() {
  const t = useTranslations('Home.Difference');
  return (
    <span
      className="rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white"
      style={{ background: "#2563eb", border: "1px solid rgba(96,165,250,0.3)" }}
    >
      {t('new')}
    </span>
  );
}

/* ─── card shared wrapper ────────────────────────────────────── */
function Card({
  children,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${className}`}
      style={{
        background: "linear-gradient(160deg,#0e0c1a 0%,#090814 100%)",
        border: "1px solid rgba(255,255,255,0.07)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ─── 3-D Next button illustration ──────────────────────────── */
function NextButtonIllustration({ label }: { label: string }) {
  return (
    <div
      className="relative flex items-center justify-center w-full overflow-hidden"
      style={{ height: 200, background: "linear-gradient(135deg,#03050f 0%,#0a0e2a 60%,#091535 100%)" }}
    >
      {/* Ambient blue glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 60%, rgba(37,99,235,0.35) 0%, transparent 70%)",
        }}
      />
      {/* Perspective pill */}
      <div
        className="relative flex items-center gap-5 px-10 py-5 rounded-[22px]"
        style={{
          background: "linear-gradient(130deg,#1a40c4 0%,#2563eb 40%,#1e3fa0 100%)",
          boxShadow:
            "0 0 60px rgba(37,99,235,0.7), 0 20px 60px rgba(0,0,50,0.8), inset 0 1px 0 rgba(255,255,255,0.25)",
          transform: "perspective(400px) rotateX(6deg) rotateY(-6deg)",
          border: "1px solid rgba(147,197,253,0.3)",
        }}
      >
        {/* Chevron icon */}
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl"
          style={{
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.2)",
            boxShadow: "0 0 20px rgba(255,255,255,0.1)",
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
            <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        {/* Text */}
        <span
          className="text-4xl font-black text-white tracking-tight select-none"
          style={{ textShadow: "0 0 30px rgba(255,255,255,0.5)", fontFamily: "'Syne',sans-serif" }}
        >
          {label}
        </span>
      </div>
      {/* Reflection strip */}
      <div
        className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
        style={{ background: "linear-gradient(to top,rgba(8,8,12,0.9),transparent)" }}
      />
    </div>
  );
}

/* ─── Framer + App Store illustration ───────────────────────── */
function AppIconsIllustration({ framerLabel, appStoreLabel }: { framerLabel: string, appStoreLabel: string }) {
  return (
    <div
      className="relative flex items-center justify-center gap-5 w-full"
      style={{
        height: 160,
        background: "linear-gradient(135deg,#060b1a 0%,#0a1535 50%,#0f1f45 100%)",
      }}
    >
      {/* Blue radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 100%, rgba(37,99,235,0.4) 0%, transparent 65%)",
        }}
      />
      {[
        { letter: "F", label: framerLabel },
        { letter: "A", label: appStoreLabel }
      ].map((item, i) => (
        <div
          key={i}
          className="relative flex flex-col items-center gap-1.5"
        >
          <div
            className="flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{
              background: i === 0
                ? "linear-gradient(135deg,#1a1a2e,#2d2d5e)"
                : "linear-gradient(135deg,#0d2137,#1a4a7a)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
            }}
          >
            {i === 0 ? (
              /* Framer F */
              <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8">
                <path d="M5 5h14v7H12L5 5zM5 12h7l7 7H5v-7z" />
              </svg>
            ) : (
              /* App Store A */
              <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
                <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" fill="rgba(37,99,235,0.3)" stroke="rgba(147,197,253,0.5)" strokeWidth="1" />
                <path d="M8 16l4-8 4 8M9.5 13h5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
          </div>
          <span className="text-[11px] text-white/50">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─── 100.000 illustration ───────────────────────────────────── */
function HundredKIllustration() {
  return (
    <div
      className="relative flex items-center justify-center w-full"
      style={{
        height: 120,
        background: "linear-gradient(135deg,#050508 0%,#0a0a12 100%)",
      }}
    >
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,rgba(255,255,255,0.04) 0px,rgba(255,255,255,0.04) 1px,transparent 1px,transparent 32px),repeating-linear-gradient(90deg,rgba(255,255,255,0.04) 0px,rgba(255,255,255,0.04) 1px,transparent 1px,transparent 32px)",
        }}
      />
      <span
        className="relative text-[2.2rem] font-black text-white/80 tracking-widest select-none"
        style={{
          fontFamily: "'Syne',sans-serif",
          textShadow: "0 0 40px rgba(255,255,255,0.2)",
          letterSpacing: "0.08em",
        }}
      >
        100.000
      </span>
    </div>
  );
}

/* ─── Publish UI illustration ────────────────────────────────── */
function PublishIllustration({ label }: { label: string }) {
  return (
    <div
      className="relative flex flex-col gap-2 w-full px-4 pt-4 pb-2"
      style={{
        height: 120,
        background: "linear-gradient(135deg,#08090f 0%,#0d0f1c 100%)",
      }}
    >
      {/* Fake toolbar row */}
      <div className="flex items-center gap-2">
        <div className="flex gap-1.5">
          {["#ff5f57", "#ffbd2e", "#28ca42"].map(c => (
            <div key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />
          ))}
        </div>
        <div className="flex gap-1.5 ml-auto items-center">
          {["⚙", "▶", "invite"].map((t, i) => (
            <span key={i} className="text-[10px] text-white/30 bg-white/5 rounded px-1.5 py-0.5">{t}</span>
          ))}
          {/* Publish button */}
          <span className="text-[10px] font-bold text-white bg-blue-600 rounded px-2.5 py-1">
            {label}
          </span>
        </div>
      </div>
      {/* Fake content lines */}
      <div className="flex flex-col gap-1.5 mt-1">
        {[80, 60, 70].map((w, i) => (
          <div key={i} className="h-1.5 rounded-full bg-white/8" style={{ width: `${w}%` }} />
        ))}
      </div>
    </div>
  );
}

/* ─── References 3D illustration ────────────────────────────── */
function ReferencesIllustration({ label }: { label: string }) {
  return (
    <div
      className="relative flex items-center justify-center w-full overflow-hidden"
      style={{ height: 160, background: "linear-gradient(135deg,#07060f 0%,#0d0a1e 100%)" }}
    >
      {/* Purple bloom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 60%, rgba(109,40,217,0.35) 0%, transparent 70%)",
        }}
      />
      {/* References text */}
      <span
        className="relative text-[2rem] font-black tracking-tight select-none"
        style={{
          fontFamily: "'Syne',sans-serif",
          color: "rgba(255,255,255,0.18)",
          textShadow: "0 0 40px rgba(139,92,246,0.4)",
          letterSpacing: "-0.02em",
        }}
      >
        {label}
      </span>
      {/* Purple 3D arrow blob */}
      <div
        className="absolute right-10 top-1/2 -translate-y-1/2 flex h-16 w-16 items-center justify-center rounded-full"
        style={{
          background: "radial-gradient(circle, #7c3aed 0%, #4c1d95 60%, #2e1065 100%)",
          boxShadow: "0 0 30px rgba(109,40,217,0.7), 0 8px 30px rgba(0,0,0,0.5)",
          border: "1px solid rgba(167,139,250,0.3)",
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
          <path d="M5 12h14M14 7l5 5-5 5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

/* ─── MAIN SECTION ───────────────────────────────────────────── */
export default function TheTWJDifference() {
  const t = useTranslations('Home.Difference');

  const tagsRow1 = [
    t('ux'),
    t('conversions'),
    t('loading'),
    t('seo'),
    t('customizable'),
    t('scalable')
  ];
  const tagsRow2 = [
    t('engagement'),
    t('expandable'),
    t('secure'),
    t('userFriendly')
  ];

  return (
    <section
      className="relative w-full  px-6 pt-16 -mb-16 overflow-hidden"
    >
      {/* ── Decorative V wing top-right ── */}
      <div
        className="pointer-events-none absolute top-0 right-0 w-30 lg:w-72 h-30 lg:h-52 opacity-20 lg:opacity-60"
        style={{
          background: "linear-gradient(225deg,#6145b0 0%,#2f137d 50%,transparent 100%)",
          clipPath: "polygon(30% 0,100% 0,100% 100%,0 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl flex flex-col gap-7">

        {/* ── Badge ── */}
        <div
          className="inline-flex items-center gap-2 self-start rounded-full px-4 py-1.5"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
          <span className="text-[12px] font-medium text-white/60 tracking-wide">{t('badge')}</span>
        </div>

        {/* ── Headlines ── */}
        <div className="flex flex-col gap-1">
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] leading-[1.12] text-white tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
            {t('title')}
          </h2>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)]  leading-[1.12] text-white/35 tracking-tight">
            {t('sub')}
          </h2>
        </div>

        {/* ── Tag pills ── */}
        <div className="flex flex-col gap-2.5">
          {/* Row 1 */}
          <div className="flex flex-wrap gap-2">
            {tagsRow1.map((tag) => (
              <span
                key={tag}
                className="rounded-full px-3.5 py-1.5 text-[12px] font-medium text-white/60 transition-colors duration-200 hover:text-white/80 cursor-default"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          {/* Row 2 + Contact Now button */}
          <div className="flex flex-wrap items-center gap-2">
            {tagsRow2.map((val) => (
              <span
                key={val}
                className="rounded-full px-3.5 py-1.5 text-[12px] font-medium text-white/60 transition-colors duration-200 hover:text-white/80 cursor-default"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {val}
              </span>
            ))}
            <button className="rounded-full bg-white px-5 py-1.5 text-[12px] font-semibold text-black transition-all duration-200 hover:bg-white/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-[0.97]">
              {t('contact')}
            </button>
          </div>
        </div>

        {/* ── Bento Grid ── */}
        <BentoGridSection 
          nextLabel={t('next')}
          framerLabel={t('framer')}
          appStoreLabel={t('appStore')}
          publishLabel={t('publish')}
          referencesLabel={t('references')}
        />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800;900&display=swap');
      `}</style>
    </section>
  );
}

export { NextButtonIllustration, AppIconsIllustration, HundredKIllustration, PublishIllustration, ReferencesIllustration, Card, NewBadge };