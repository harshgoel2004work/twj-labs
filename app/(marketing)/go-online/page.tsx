"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowUpRight, Globe2, Rocket, TrendingUp, CheckCircle2, ArrowRight, Sparkles, Check, ChevronDown } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// ─── Data ───────────────────────────────────────────────────────────────────

const stats = [
  { value: "3x", label: "More Leads Online" },
  { value: "97%", label: "Client Satisfaction" },
  { value: "48h", label: "Avg. Turnaround" },
  { value: "500+", label: "Businesses Launched" },
];

const process = [
  {
    num: "01",
    title: "Discovery Call",
    body: "We audit your offline brand, understand your goals, and map out the exact digital strategy your business needs.",
  },
  {
    num: "02",
    title: "Build & Launch",
    body: "Our team designs, develops, and deploys your complete digital presence — website, SEO, Google Business — in days, not months.",
  },
  {
    num: "03",
    title: "Grow & Scale",
    body: "Post-launch we track performance, refine your SEO, and help you convert online traffic into paying customers.",
  },
];

const features = [
  {
    title: "Global Visibility",
    body: "Break geographical barriers. Reach customers worldwide with a professional online presence that works while you sleep.",
    icon: Globe2,
    accent: "#4f8ef7",
  },
  {
    title: "24/7 Accessibility",
    body: "Your business never closes online. Let customers find you and engage with your services anytime, anywhere.",
    icon: Rocket,
    accent: "#a855f7",
  },
  {
    title: "Data-Driven Growth",
    body: "Understand your customers with advanced analytics. Optimize every marketing dollar with real insights.",
    icon: TrendingUp,
    accent: "#22d3a5",
  },
  {
    title: "Established Trust",
    body: "Build credibility with a premium digital storefront that reflects the quality of your offline brand.",
    icon: CheckCircle2,
    accent: "#f59e0b",
  },
];

const plans = [
  {
    id: 1,
    name: "Google Business\nEssentials",
    tag: null,
    price: "Custom",
    body: "Establish your local presence and start getting discovered by nearby customers.",
    features: [
      "Google Business Profile Setup",
      "Local SEO Optimization",
      "5 Initial Reviews Assistance",
      "Google Maps Integration",
      "Business Hours & Info Management",
    ],
  },
  {
    id: 2,
    name: "Essential Web\nPresence",
    tag: "Most Popular",
    price: "Custom",
    body: "A professional 5-page website to showcase your services and build credibility online.",
    features: [
      "5-Page Premium Website",
      "Mobile Responsive Design",
      "Basic SEO Setup",
      "Contact Form Integration",
      "Domain & Hosting Setup",
      "Everything in Google Business",
    ],
  },
  {
    id: 3,
    name: "Growth\n& Scale",
    tag: null,
    price: "Custom",
    body: "Advanced digital features to drive traffic and convert leads into loyal customers.",
    features: [
      "Unlimited Pages (up to 15)",
      "Blog / News Section",
      "Advanced SEO Strategy",
      "Social Media Integration",
      "Google Analytics Setup",
      "Everything in Essential Web",
    ],
  },
  {
    id: 4,
    name: "Custom\nSolutions",
    tag: "Enterprise",
    price: "Contact TWJ",
    body: "Tailored enterprise-grade solutions for complex business needs and large-scale growth.",
    features: [
      "Custom Web Applications",
      "E-commerce Functionality",
      "Advanced Integrations",
      "Dedicated Project Manager",
      "Priority Support",
      "Custom Pricing for Scale",
    ],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="h-px w-8 bg-[#5449e8]" />
      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#5449e8]">{children}</span>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Orbital rings */}
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {[520, 720, 920].map((size, i) => (
          <motion.div
            key={size}
            className="absolute rounded-full border border-white/[0.04]"
            style={{ width: size, height: size }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 40 + i * 20, repeat: Infinity, ease: "linear" }}
          >
            {/* dot on ring */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#5449e8]"
              style={{ opacity: 0.6 - i * 0.15 }}
            />
          </motion.div>
        ))}
        {/* Center glow */}
        <div className="w-[400px] h-[400px] rounded-full bg-[#5449e8]/10 blur-[100px]" />
      </motion.div>

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-bold uppercase tracking-[0.18em] text-[#5449e8] mb-10"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5449e8] opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#5449e8]" />
          </span>
          Transform Your Business
        </motion.div>

        <div className="max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(52px,9vw,108px)] font-black leading-[0.92] tracking-[-0.03em] mb-8"
          >
            <span className="text-white">Take Your</span>
            <br />
            <span className="text-white">Business</span>{" "}
            <span
              className="italic"
              style={{
                background: "linear-gradient(135deg, #5449e8 0%, #8b7ff5 50%, #5449e8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Online.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
            className="text-lg md:text-xl text-neutral-400 max-w-xl leading-relaxed mb-12"
          >
            We help traditional offline businesses transition seamlessly into the digital world — premium websites, local SEO, and powerful marketing tools.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-wrap gap-4"
          >
            <button className="group flex items-center gap-2 px-8 py-4 bg-[#5449e8] text-white rounded-2xl font-bold text-base hover:bg-[#6358f0] transition-all duration-300 shadow-lg shadow-[#5449e8]/25">
              Get Your Digital Presence
              <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-transparent text-white border border-white/15 rounded-2xl font-bold text-base hover:bg-white/5 hover:border-white/25 transition-all duration-300">
              View Pricing
            </button>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5"
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-[#060609] px-8 py-6 text-center">
              <div className="text-3xl md:text-4xl font-black text-white tracking-tight">{s.value}</div>
              <div className="text-xs text-neutral-500 mt-1 uppercase tracking-widest font-medium">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20"
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────

function Features() {
  return (
    <section className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <FadeUp className="mb-20">
          <SectionLabel>Why Go Online</SectionLabel>
          <h2 className="text-5xl md:text-6xl font-black tracking-tight text-white max-w-2xl leading-tight">
            Everything you gain<br />
            <span className="text-neutral-500">by going digital.</span>
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <FadeUp key={f.title} delay={i * 0.08}>
              <div className="group relative p-8 rounded-3xl bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 overflow-hidden">
                {/* bg blob */}
                <div
                  className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-0 group-hover:opacity-10 transition-opacity duration-700 -translate-y-1/2 translate-x-1/4"
                  style={{ background: f.accent }}
                />
                <div className="relative z-10 flex gap-6 items-start">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${f.accent}18`, color: f.accent }}
                  >
                    <f.icon size={22} strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">{f.body}</p>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Process ──────────────────────────────────────────────────────────────────

function Process() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Side decoration */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-3/4 bg-gradient-to-b from-transparent via-[#5449e8]/20 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-16 items-center">
          <FadeUp>
            <SectionLabel>Our Process</SectionLabel>
            <h2 className="text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
              From offline<br />
              to online in<br />
              <span className="text-[#5449e8]">3 steps.</span>
            </h2>
            <p className="mt-6 text-neutral-400 leading-relaxed max-w-sm">
              We've refined a battle-tested process that gets your business live quickly without compromising quality.
            </p>
          </FadeUp>

          <div className="relative">
            {/* Vertical connector */}
            <div className="absolute left-[27px] top-8 bottom-8 w-px bg-gradient-to-b from-[#5449e8]/40 via-[#5449e8]/20 to-transparent" />

            <div className="space-y-10">
              {process.map((step, i) => (
                <FadeUp key={step.num} delay={i * 0.12}>
                  <div className="group flex gap-6 items-start">
                    <div className="relative z-10 w-14 h-14 rounded-2xl bg-[#5449e8]/10 border border-[#5449e8]/20 flex items-center justify-center shrink-0 group-hover:bg-[#5449e8]/20 transition-all duration-300">
                      <span className="text-sm font-black text-[#5449e8]">{step.num}</span>
                    </div>
                    <div className="pt-1">
                      <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-neutral-400 text-sm leading-relaxed">{step.body}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

function Pricing() {
  return (
    <section className="py-32 px-6 relative overflow-hidden" id="pricing">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#5449e8]/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <FadeUp className="text-center mb-20">
          <SectionLabel>Pricing</SectionLabel>
          <h2 className="text-5xl md:text-6xl font-black tracking-tight text-white mb-6">
            Transparent.<br />
            <span className="text-neutral-500">No hidden fees.</span>
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto text-lg leading-relaxed">
            Choose the perfect plan to take your business from offline to online. Every plan includes premium design and dedicated support.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <FadeUp key={plan.id} delay={i * 0.09}>
              <div
                className={cn(
                  "relative group rounded-3xl p-px transition-all duration-500 h-full",
                  plan.tag === "Most Popular"
                    ? "bg-gradient-to-b from-[#5449e8] via-[#5449e8]/40 to-transparent"
                    : plan.tag === "Enterprise"
                      ? "bg-gradient-to-b from-white/20 via-white/5 to-transparent"
                      : "bg-white/[0.06] hover:bg-white/[0.1]"
                )}
              >
                <div className="bg-[#060609] rounded-[23px] p-7 h-full flex flex-col">
                  {plan.tag && (
                    <div className="mb-5">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] px-3 py-1 rounded-full",
                          plan.tag === "Most Popular"
                            ? "bg-[#5449e8]/15 text-[#8b7ff5] border border-[#5449e8]/30"
                            : "bg-white/5 text-neutral-400 border border-white/10"
                        )}
                      >
                        {plan.tag === "Most Popular" && <Sparkles size={9} />}
                        {plan.tag}
                      </span>
                    </div>
                  )}

                  <div className="mb-6 flex-grow">
                    <h3 className="text-2xl font-black text-white leading-tight mb-3 whitespace-pre-line">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-neutral-500 leading-relaxed">{plan.body}</p>
                  </div>

                  <div className="mb-8">
                    <ul className="space-y-3">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm">
                          <div
                            className={cn(
                              "mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0",
                              plan.tag === "Most Popular"
                                ? "bg-[#5449e8]/20 text-[#8b7ff5]"
                                : "bg-white/8 text-neutral-500"
                            )}
                          >
                            <Check size={9} strokeWidth={3} />
                          </div>
                          <span className="text-neutral-300 leading-tight">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto">
                    <div className="mb-4 pt-6 border-t border-white/5">
                      <span className="text-xs text-neutral-600 uppercase tracking-widest">Pricing</span>
                      <div className="text-2xl font-black text-white mt-1">{plan.price}</div>
                    </div>
                    <Link
                      href={`/contact-sales?ser-int=go-online&plan=${plan.name.replace("\n", " ")}`}
                      className={cn(
                        "w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-bold transition-all duration-300",
                        plan.tag === "Most Popular"
                          ? "bg-[#5449e8] text-white hover:bg-[#6358f0] shadow-lg shadow-[#5449e8]/20"
                          : "bg-white/6 text-white border border-white/10 hover:bg-white/10 hover:border-white/20"
                      )}
                    >
                      Get Started
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Marquee ticker ───────────────────────────────────────────────────────────

function Ticker() {
  const items = ["Transform", "Scale", "Digitalize", "Succeed", "Grow", "Launch", "Dominate", "Convert"];
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

// ─── CTA Banner ───────────────────────────────────────────────────────────────

function CTABanner() {
  return (
    <FadeUp>
      <section className="px-6 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden border border-white/8 bg-gradient-to-br from-[#5449e8]/20 via-[#0c0b1a] to-[#060609] p-12 md:p-16 text-center">
            {/* Grid bg */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#5449e8]/15 blur-[100px] rounded-full" />
            <div className="relative z-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#5449e8] mb-6">Ready to start?</p>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
                Your customers are<br />searching for you online.
              </h2>
              <p className="text-neutral-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                Every day without a digital presence is a missed opportunity. Let TWJ build you the online brand you deserve.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="group flex items-center gap-2 px-8 py-4 bg-[#5449e8] text-white rounded-2xl font-bold text-base hover:bg-[#6358f0] transition-all duration-300 shadow-lg shadow-[#5449e8]/25">
                  Book a Free Discovery Call
                  <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </FadeUp>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function GoOnlinePage() {
  return (
    <div className="bg-[#060609] text-white min-h-screen" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <Hero />
      <Ticker />
      <Features />
      <Process />
      <Pricing />
      <CTABanner />
    </div>
  );
}