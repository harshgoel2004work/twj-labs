"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe, ArrowRight, Zap, Search, Shield, Layout,
  AlertTriangle, CheckCircle2, XCircle, Clock,
  Smartphone, Monitor, ChevronDown, ChevronUp,
  Loader2, Activity, Leaf, Code2, Lock, Image,
  AlertCircle, Twitter, Facebook, Layers,
} from "lucide-react";
import Link from "next/link";
import LightRays from "@/components/LightRays";

/* ─── types ──────────────────────────────────────────────────── */
interface AuditScore { performance: number; accessibility: number; bestPractices: number; seo: number; }
interface AuditMetrics { fcp: string; lcp: string; tbt: string; cls: string; si: string; tti: string; }
interface AuditItem { title: string; description: string; score: number | null; displayValue?: string; }
interface SecurityData { grade: string; score: number; tests_passed: number; tests_failed: number; tests_quantity: number; state: string; }
interface GreenData { green: boolean; hosted_by: string | null; url: string; }
interface W3CData { error_count: number; warning_count: number; errors: { message: string; line: number }[]; valid: boolean; }
interface OGData { title?: string; "og:title"?: string; "og:description"?: string; "og:image"?: string; "og:site_name"?: string; "twitter:card"?: string; }
interface TechItem { name: string; category: string; icon: string; }
interface AuditResult {
  url: string; strategy: "mobile" | "desktop";
  scores: AuditScore; metrics: AuditMetrics;
  opportunities: AuditItem[]; diagnostics: AuditItem[]; passed: AuditItem[];
  security: SecurityData | null; greenHosting: GreenData | null;
  w3c: W3CData | null; ogTags: OGData | null; techStack: TechItem[] | null;
  fetchTime: string;
}

/* ─── helpers ─────────────────────────────────────────────────── */
const getScoreColor = (s: number) => s >= 90 ? "#10b981" : s >= 50 ? "#f59e0b" : "#ef4444";
const getScoreLabel = (s: number) => s >= 90 ? "Excellent" : s >= 50 ? "Needs Work" : "Poor";
const GRADE_COLORS: Record<string, string> = {
  "A+": "#10b981","A": "#10b981","A-": "#34d399","B+": "#6ee7b7","B": "#a3e635","B-": "#bef264",
  "C+": "#fde047","C": "#f59e0b","C-": "#fb923c","D+": "#f97316","D": "#ef4444","D-": "#dc2626","F": "#991b1b",
};

/* ─── Section wrapper card ───────────────────────────────────── */
function SectionCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.5 }}
      className="rounded-3xl p-6 sm:p-8"
      style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.05)" }}>
      {children}
    </motion.div>
  );
}

/* ─── Section header row ─────────────────────────────────────── */
function SectionHeader({ dot, title, count, icon: Icon }: { dot: string; title: string; count?: number; icon?: any }) {
  return (
    <div className="flex items-center gap-3 pb-3 border-b border-white/5 mb-5">
      <div className="flex items-center justify-center h-6 w-6 rounded-full border"
        style={{ background: `${dot}15`, borderColor: `${dot}30` }}>
        <div className="h-2 w-2 rounded-full" style={{ background: dot }} />
      </div>
      <h2 className="text-[16px] font-bold text-white flex items-center gap-2">
        {Icon && <Icon size={15} className="text-white/35" />}
        {title}
        {count !== undefined && <span className="text-white/30 text-sm font-normal ml-1">({count})</span>}
      </h2>
    </div>
  );
}

/* ─── Circular gauge ─────────────────────────────────────────── */
function ScoreGauge({ score, label, icon: Icon, delay = 0 }: { score: number; label: string; icon: any; delay?: number }) {
  const r = 38; const circ = 2 * Math.PI * r;
  const color = getScoreColor(score);
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.6 }}
      className="relative flex flex-col items-center gap-4 p-6 rounded-3xl overflow-hidden group"
      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative">
        <svg width="110" height="110" viewBox="0 0 110 110" className="-rotate-90">
          <circle cx="55" cy="55" r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="8" />
          <motion.circle cx="55" cy="55" r={r} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
            strokeDasharray={circ} initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: circ - (score / 100) * circ }}
            transition={{ delay: delay + 0.3, duration: 1.2, ease: "easeOut" }}
            style={{ filter: `drop-shadow(0 0 8px ${color}60)` }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-white">{score}</span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1.5 z-10">
        <div className="flex items-center gap-1.5 text-white/70"><Icon size={14} /><span className="text-[13px] font-semibold">{label}</span></div>
        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color }}>{getScoreLabel(score)}</span>
      </div>
    </motion.div>
  );
}

/* ─── Metric pill ────────────────────────────────────────────── */
function MetricPill({ label, value, good }: { label: string; value: string; good: boolean }) {
  return (
    <div className="flex flex-col gap-1.5 px-4 py-3.5 rounded-2xl transition-colors hover:bg-white/[0.04]"
      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-white/50 font-medium tracking-wider">{label}</span>
        <div className={`h-1.5 w-1.5 rounded-full ${good ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" : "bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.5)]"}`} />
      </div>
      <span className="text-[16px] font-bold text-white">{value}</span>
    </div>
  );
}

/* ─── Audit row ──────────────────────────────────────────────── */
function AuditRow({ item }: { item: AuditItem }) {
  const [open, setOpen] = useState(false);
  const isPass = item.score !== null && item.score >= 0.9;
  const isFail = item.score !== null && item.score < 0.5;
  return (
    <div className="rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:bg-white/[0.04]"
      style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(255,255,255,0.05)" }}
      onClick={() => setOpen(!open)}>
      <div className="flex items-start sm:items-center gap-3 px-5 py-4">
        <div className="mt-0.5 sm:mt-0">
          {isPass ? <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
           : isFail ? <XCircle size={16} className="text-red-400 shrink-0" />
           : <AlertTriangle size={16} className="text-amber-400 shrink-0" />}
        </div>
        <span className="flex-1 text-[14px] font-medium text-white/80 leading-snug">{item.title}</span>
        <div className="flex items-center gap-3 shrink-0">
          {item.displayValue && <span className="text-[12px] font-semibold text-white/50 bg-white/5 px-2 py-1 rounded-md">{item.displayValue}</span>}
          <div className="p-1 rounded-full bg-white/5">
            {open ? <ChevronUp size={14} className="text-white/50" /> : <ChevronDown size={14} className="text-white/50" />}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
            className="px-5 pb-4 text-[13px] text-white/50 leading-relaxed">
            <div className="pt-3 border-t border-white/5"><p>{item.description}</p></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Security section ───────────────────────────────────────── */
function SecuritySection({ data }: { data: SecurityData }) {
  const color = GRADE_COLORS[data.grade] ?? "#6b7280";
  const pct = (data.tests_passed / Math.max(data.tests_quantity, 1)) * 100;
  return (
    <SectionCard delay={0.5}>
      <SectionHeader dot={color} title="Security & HTTP Headers" icon={Lock} />
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className="flex flex-col items-center justify-center h-24 w-24 rounded-3xl shrink-0"
          style={{ background: `${color}12`, border: `2px solid ${color}40`, boxShadow: `0 0 30px ${color}20` }}>
          <span className="text-4xl font-black" style={{ color }}>{data.grade}</span>
          <span className="text-[10px] text-white/30 uppercase tracking-wider mt-0.5">{data.score}/100</span>
        </div>
        <div className="flex-1 flex flex-col gap-3 w-full">
          <div className="flex items-center justify-between text-[12px]">
            <span className="text-white/50">{data.tests_passed} / {data.tests_quantity} tests passed</span>
            <span className="font-semibold" style={{ color }}>{Math.round(pct)}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
            <motion.div className="h-full rounded-full" style={{ background: `linear-gradient(90deg,${color},${color}80)`, boxShadow: `0 0 10px ${color}60` }}
              initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ delay: 0.8, duration: 1 }} />
          </div>
          <div className="flex flex-wrap gap-2 mt-1">
            <span className="flex items-center gap-1.5 text-[12px] text-emerald-400 bg-emerald-400/8 px-3 py-1 rounded-full border border-emerald-400/15">
              <CheckCircle2 size={11} /> {data.tests_passed} Passed
            </span>
            <span className="flex items-center gap-1.5 text-[12px] text-red-400 bg-red-400/8 px-3 py-1 rounded-full border border-red-400/15">
              <XCircle size={11} /> {data.tests_failed} Failed
            </span>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

/* ─── Green hosting section ──────────────────────────────────── */
function GreenSection({ data }: { data: GreenData }) {
  const color = data.green ? "#10b981" : "#ef4444";
  return (
    <SectionCard delay={0.55}>
      <SectionHeader dot={color} title="Carbon & Green Hosting" icon={Leaf} />
      <div className="flex items-center gap-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl shrink-0"
          style={{ background: `${color}10`, border: `1px solid ${color}20` }}>
          <Leaf size={28} style={{ color }} />
        </div>
        <div>
          <p className="text-[18px] font-bold" style={{ color }}>
            {data.green ? "✓ Green Hosted" : "✗ Not Green Hosted"}
          </p>
          <p className="text-[13px] text-white/45 mt-1">
            {data.green
              ? `Hosted by ${data.hosted_by ?? "a renewable energy provider"} — runs on clean energy.`
              : "This host does not use verified renewable energy. Consider switching to a green provider."}
          </p>
        </div>
      </div>
    </SectionCard>
  );
}

/* ─── W3C section ────────────────────────────────────────────── */
function W3CSection({ data }: { data: W3CData }) {
  return (
    <SectionCard delay={0.6}>
      <SectionHeader dot={data.valid ? "#10b981" : "#ef4444"} title="W3C HTML Validation" icon={Code2} />
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.15)" }}>
          <XCircle size={14} className="text-red-400" /><span className="text-[13px] text-red-400 font-semibold">{data.error_count} Errors</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.15)" }}>
          <AlertCircle size={14} className="text-amber-400" /><span className="text-[13px] text-amber-400 font-semibold">{data.warning_count} Warnings</span>
        </div>
        {data.valid && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)" }}>
            <CheckCircle2 size={14} className="text-emerald-400" /><span className="text-[13px] text-emerald-400 font-semibold">Valid HTML</span>
          </div>
        )}
      </div>
      {data.errors.length > 0 && (
        <div className="flex flex-col gap-2">
          {data.errors.map((e, i) => (
            <div key={i} className="flex items-start gap-3 px-4 py-3 rounded-xl text-[12px]"
              style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.08)" }}>
              <XCircle size={13} className="text-red-400 shrink-0 mt-0.5" />
              <span className="text-white/55 flex-1 leading-relaxed">{e.message}</span>
              {e.line > 0 && <span className="text-white/25 shrink-0">L{e.line}</span>}
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
}

/* ─── OG Preview section ─────────────────────────────────────── */
function OGSection({ data, url }: { data: OGData; url: string }) {
  const title = data["og:title"] ?? data.title ?? "No title found";
  const desc = data["og:description"] ?? "No description found";
  const img = data["og:image"];
  const siteName = data["og:site_name"] ?? (() => { try { return new URL(url).hostname; } catch { return url; } })();

  return (
    <SectionCard delay={0.65}>
      <SectionHeader dot="#3b82f6" title="Social Branding & Open Graph" icon={Image} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Live preview mockup */}
        <div>
          <p className="text-[11px] text-white/30 uppercase tracking-widest mb-3 flex items-center gap-1.5"><Facebook size={11} /> Link Preview</p>
          <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
            {img ? (
              <img src={img} alt="OG" className="w-full object-cover" style={{ maxHeight: 160 }} onError={e => (e.currentTarget.style.display = "none")} />
            ) : (
              <div className="h-28 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.03)" }}>
                <Image size={24} className="text-white/15" />
              </div>
            )}
            <div className="p-3" style={{ background: "rgba(255,255,255,0.02)" }}>
              <p className="text-[10px] text-white/30 uppercase mb-1">{siteName}</p>
              <p className="text-[13px] font-semibold text-white/80 leading-snug line-clamp-2">{title}</p>
              <p className="text-[11px] text-white/40 mt-1 line-clamp-2">{desc}</p>
            </div>
          </div>
        </div>
        {/* Tag checklist */}
        <div>
          <p className="text-[11px] text-white/30 uppercase tracking-widest mb-3 flex items-center gap-1.5"><Twitter size={11} /> Meta Tags</p>
          <div className="flex flex-col gap-2">
            {[
              { label: "og:title", val: data["og:title"] },
              { label: "og:description", val: data["og:description"] },
              { label: "og:image", val: data["og:image"] ? "✓ Found" : undefined },
              { label: "twitter:card", val: data["twitter:card"] },
              { label: "og:site_name", val: data["og:site_name"] },
            ].map(({ label, val }) => (
              <div key={label} className="flex items-center justify-between gap-3 px-3 py-2 rounded-lg"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                <span className="text-[11px] text-white/40 font-mono shrink-0">{label}</span>
                {val ? <span className="text-[11px] text-white/65 truncate max-w-[160px] text-right">{val}</span>
                     : <span className="text-[11px] text-red-400/70 flex items-center gap-1 shrink-0"><AlertTriangle size={10} /> Missing</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

/* ─── Tech stack section ─────────────────────────────────────── */
function TechStackSection({ data }: { data: TechItem[] }) {
  const cats = [...new Set(data.map(t => t.category))];
  return (
    <SectionCard delay={0.7}>
      <SectionHeader dot="#8b5cf6" title="Technologies Detected" icon={Layers} />
      <div className="flex flex-col gap-4">
        {cats.map(cat => (
          <div key={cat}>
            <p className="text-[10px] text-white/25 uppercase tracking-widest mb-2">{cat}</p>
            <div className="flex flex-wrap gap-2">
              {data.filter(t => t.category === cat).map(t => (
                <div key={t.name} className="flex items-center gap-2 px-3 py-1.5 rounded-full transition-all hover:bg-white/[0.06]"
                  style={{ background: "rgba(139,92,246,0.07)", border: "1px solid rgba(139,92,246,0.15)" }}>
                  <span className="text-[11px] font-bold text-purple-300 w-4 text-center leading-none">{t.icon}</span>
                  <span className="text-[12px] font-semibold text-white/70">{t.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

/* ─── fetch ──────────────────────────────────────────────────── */
async function fetchAudit(url: string, strategy: "mobile" | "desktop"): Promise<AuditResult> {
  const res = await fetch(`/api/audit?url=${encodeURIComponent(url)}&strategy=${strategy}`);
  const data = await res.json();
  if (!res.ok || data.error) throw new Error(data.error ?? "Could not complete the audit.");

  const ps = data.pagespeed;
  const cats = ps.lighthouseResult.categories;
  const audits = ps.lighthouseResult.audits;

  const scores: AuditScore = {
    performance: Math.round((cats.performance?.score ?? 0) * 100),
    accessibility: Math.round((cats.accessibility?.score ?? 0) * 100),
    bestPractices: Math.round((cats["best-practices"]?.score ?? 0) * 100),
    seo: Math.round((cats.seo?.score ?? 0) * 100),
  };
  const metrics: AuditMetrics = {
    fcp: audits["first-contentful-paint"]?.displayValue ?? "—",
    lcp: audits["largest-contentful-paint"]?.displayValue ?? "—",
    tbt: audits["total-blocking-time"]?.displayValue ?? "—",
    cls: audits["cumulative-layout-shift"]?.displayValue ?? "—",
    si: audits["speed-index"]?.displayValue ?? "—",
    tti: audits["interactive"]?.displayValue ?? "—",
  };

  const allRefs = [
    ...(cats.performance?.auditRefs ?? []),
    ...(cats.accessibility?.auditRefs ?? []),
    ...(cats["best-practices"]?.auditRefs ?? []),
    ...(cats.seo?.auditRefs ?? []),
  ];
  const seen = new Set<string>();
  const opportunities: AuditItem[] = [], diagnostics: AuditItem[] = [], passed: AuditItem[] = [];
  allRefs.forEach(({ id }: { id: string }) => {
    if (seen.has(id)) return; seen.add(id);
    const a = audits[id];
    if (!a || ["informative","notApplicable"].includes(a.scoreDisplayMode) || a.score === null) return;
    const item: AuditItem = { title: a.title, description: a.description?.replace(/\[.*?\]\(.*?\)/g, "").trim() ?? "", score: a.score, displayValue: a.displayValue };
    if (a.score >= 0.9) passed.push(item);
    else if (a.details?.type === "opportunity") opportunities.push(item);
    else diagnostics.push(item);
  });

  return {
    url, strategy, scores, metrics,
    opportunities: opportunities.slice(0, 8), diagnostics: diagnostics.slice(0, 8), passed: passed.slice(0, 10),
    security: data.security, greenHosting: data.greenHosting,
    w3c: data.w3c, ogTags: data.ogTags, techStack: data.techStack,
    fetchTime: new Date().toLocaleTimeString(),
  };
}

/* ─── MAIN PAGE ──────────────────────────────────────────────── */
export default function FreeAuditPage() {
  const [url, setUrl] = useState("");
  const [strategy, setStrategy] = useState<"mobile" | "desktop">("mobile");
  const [loading, setLoading] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [error, setError] = useState("");
  const [result, setResult] = useState<AuditResult | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let t: NodeJS.Timeout;
    if (loading) { setElapsed(0); t = setInterval(() => setElapsed(p => p + 1), 1000); }
    return () => clearInterval(t);
  }, [loading]);

  const handleAudit = async () => {
    if (!url.trim()) return;
    setError(""); setResult(null); setLoading(true);
    try {
      let target = url.trim();
      if (!/^https?:\/\//.test(target)) target = "https://" + target;
      const data = await fetchAudit(target, strategy);
      setResult(data);
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } catch (e: any) { setError(e.message ?? "Something went wrong."); }
    finally { setLoading(false); }
  };

  const overallScore = result
    ? Math.round((result.scores.performance + result.scores.accessibility + result.scores.bestPractices + result.scores.seo) / 4)
    : null;

  return (
    <div className="min-h-screen w-full  text-white overflow-x-hidden relative" >
     <div className="z-[0] absolute top-0 left-0 w-screen h-full">
       <LightRays
    raysOrigin="bottom-center"
    raysColor="#ab57ff"
    raysSpeed={0.1}
    lightSpread={0.5}
    rayLength={3}
    followMouse={false}
    mouseInfluence={0.1}
    noiseAmount={0}
    distortion={0.3}
    className="custom-rays"
    pulsating={false}
    fadeDistance={1}
    saturation={1}
/>
     </div>
      {/* Bg glows */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle,rgba(139,92,246,0.4),rgba(0,0,0,0)70%)", filter: "blur(100px)" }} />
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle,rgba(59,130,246,0.4),rgba(0,0,0,0)70%)", filter: "blur(80px)" }} />
      </div>

      {/* HERO */}
      <section className="relative z-10 pt-32 pb-20 px-6 lg:px-12 min-h-[70vh] flex flex-col justify-center">
        <div className="mx-auto max-w-4xl flex flex-col items-center text-center gap-8">

          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2.5 rounded-full px-4 py-2"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[12px] font-semibold text-white/70 tracking-wide uppercase">Free Audit Engine · 6 Data Sources</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-[clamp(2.5rem,7vw,5rem)]  leading-[1.05] tracking-tight" style={{ fontFamily: "'Syne',sans-serif" }}>
            <span className="text-transparent bg-clip-text text-white">Instant Website Audit.</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Real Scores. Zero Fluff.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="max-w-xl text-[16px] leading-relaxed text-white/50">
            Performance · SEO · Security · Green Hosting · Tech Stack · HTML Validity · Social Cards — all in one free report.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="w-full max-w-2xl flex flex-col gap-4 mt-4">
            <div className="flex items-center justify-center gap-3">
              {(["mobile","desktop"] as const).map(s => (
                <button key={s} onClick={() => setStrategy(s)}
                  className="flex items-center gap-2 rounded-full px-5 py-2 text-[13px] font-semibold transition-all duration-300"
                  style={{
                    background: strategy === s ? "rgba(139,92,246,0.15)" : "rgba(255,255,255,0.03)",
                    border: strategy === s ? "1px solid rgba(139,92,246,0.5)" : "1px solid rgba(255,255,255,0.08)",
                    color: strategy === s ? "#c4b5fd" : "rgba(255,255,255,0.5)",
                    boxShadow: strategy === s ? "0 0 20px rgba(139,92,246,0.15)" : "none",
                  }}>
                  {s === "mobile" ? <Smartphone size={14} /> : <Monitor size={14} />}
                  {s.charAt(0).toUpperCase() + s.slice(1)} View
                </button>
              ))}
            </div>
            <div className="relative flex flex-col sm:flex-row items-center gap-3 w-full">
              <div className="flex flex-1 w-full items-center gap-3 rounded-2xl px-5 py-4"
                style={{ background: "rgba(255,255,255,0.015)", border: "1px solid rgba(139,92,246,0.3)", boxShadow: "0 0 30px rgba(139,92,246,0.05)" }}>
                <Globe size={20} className="text-purple-400/50 shrink-0" />
                <input type="text" value={url} onChange={e => setUrl(e.target.value)} onKeyDown={e => e.key === "Enter" && handleAudit()}
                  placeholder="https://yourwebsite.com"
                  className="flex-1 bg-transparent text-white placeholder:text-white/20 text-[16px] outline-none" />
              </div>
              <button onClick={handleAudit} disabled={loading || !url.trim()}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl px-8 py-4 text-[15px] font-bold text-white transition-all duration-300 disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98] shrink-0"
                style={{ background: "linear-gradient(135deg,#5449e8,#8f73fc)", boxShadow: "0 10px 30px -10px rgba(139,92,246,0.6)" }}>
                {loading ? <Loader2 size={18} className="animate-spin" /> : <><Zap size={18} fill="currentColor" /> Analyze Now</>}
              </button>
            </div>
            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-[14px] text-red-400 text-center flex items-center justify-center gap-2 bg-red-400/10 py-2 px-4 rounded-lg border border-red-400/20 w-fit mx-auto">
                <AlertTriangle size={14} /> {error}
              </motion.p>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4">
            {["Performance","Security","SEO","Green Hosting","Tech Stack","HTML Validity","Social Cards"].map(t => (
              <span key={t} className="text-[12px] text-white/35 flex items-center gap-1.5">
                <CheckCircle2 size={11} className="text-white/20" /> {t}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Loading */}
      <AnimatePresence>
        {loading && (
          <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="relative z-10 py-12 px-6 flex flex-col items-center gap-8">
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full"
              style={{ border: "1px solid rgba(139,92,246,0.3)", background: "rgba(139,92,246,0.05)" }}>
              <Activity size={36} className="text-purple-400 animate-pulse" />
              <div className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: "rgba(139,92,246,0.4)" }} />
            </div>
            <div className="text-center flex flex-col gap-2">
              <p className="text-[18px] font-semibold text-white">Running 6-source audit…</p>
              <p className="text-[14px] text-white/40 flex items-center justify-center gap-2">
                <Clock size={14} className="text-purple-400/70" /> {elapsed}s elapsed · Est. ~35s
              </p>
            </div>
            <div className="flex flex-col gap-3 w-full max-w-sm">
              {["PageSpeed & Core Web Vitals…","Mozilla Security Headers…","Green Web Foundation…","W3C HTML Validator…","Tech Stack Detection…","Open Graph & Social Cards…"].map((t, i) => (
                <motion.div key={t} initial={{ opacity: 0, x: -10 }} animate={{ opacity: elapsed > i * 3 ? 1 : 0.2, x: 0 }}
                  className="flex items-center gap-3 text-[13px] text-white/60 bg-white/[0.02] p-3 rounded-lg border border-white/5">
                  {elapsed > i * 3 ? <CheckCircle2 size={14} className="text-emerald-400" />
                    : <div className="w-3.5 h-3.5 rounded-full border-2 border-white/20 border-t-white/60 animate-spin" />}
                  {t}
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* RESULTS */}
      <AnimatePresence>
        {result && (
          <motion.div ref={resultsRef} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="relative z-10 px-6 lg:px-12 pb-32">
            <div className="mx-auto max-w-5xl flex flex-col gap-10">

              {/* Summary bar */}
              <div className="rounded-3xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(139,92,246,0.2)", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}>
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none" />
                <div className="flex flex-col gap-2 relative z-10">
                  <p className="text-[12px] text-purple-300 uppercase tracking-widest font-bold">Audit Complete · 6 Sources</p>
                  <a href={result.url} target="_blank" rel="noreferrer" className="text-[20px] font-bold text-white truncate max-w-md hover:underline decoration-white/20">{result.url}</a>
                  <p className="text-[13px] text-white/40 flex items-center gap-2">
                    {result.strategy === "mobile" ? <Smartphone size={12} /> : <Monitor size={12} />}
                    {result.strategy.charAt(0).toUpperCase() + result.strategy.slice(1)} · {result.fetchTime}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 relative z-10">
                  {result.security && (
                    <div className="flex flex-col items-center px-4 py-3 rounded-2xl"
                      style={{ background: `${GRADE_COLORS[result.security.grade] ?? "#6b7280"}12`, border: `1px solid ${GRADE_COLORS[result.security.grade] ?? "#6b7280"}30` }}>
                      <span className="text-2xl font-black" style={{ color: GRADE_COLORS[result.security.grade] ?? "#6b7280" }}>{result.security.grade}</span>
                      <span className="text-[9px] text-white/30 uppercase tracking-wider">Security</span>
                    </div>
                  )}
                  {result.greenHosting && (
                    <div className="flex flex-col items-center px-4 py-3 rounded-2xl"
                      style={{ background: result.greenHosting.green ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.08)", border: `1px solid ${result.greenHosting.green ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)"}` }}>
                      <Leaf size={18} style={{ color: result.greenHosting.green ? "#10b981" : "#ef4444" }} />
                      <span className="text-[9px] uppercase tracking-wider mt-1" style={{ color: result.greenHosting.green ? "#10b981" : "#ef4444" }}>{result.greenHosting.green ? "Green" : "Not Green"}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-4 px-6 py-4 rounded-2xl"
                    style={{ background: `rgba(${overallScore! >= 90 ? "16,185,129" : overallScore! >= 50 ? "245,158,11" : "239,68,68"},0.08)`, border: `1px solid rgba(${overallScore! >= 90 ? "16,185,129" : overallScore! >= 50 ? "245,158,11" : "239,68,68"},0.2)` }}>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Overall</span>
                      <span className="text-[12px] text-white/50 mt-0.5">{getScoreLabel(overallScore!)}</span>
                    </div>
                    <div className="h-8 w-px bg-white/10 mx-2" />
                    <span className="text-4xl font-bold tracking-tighter" style={{ color: getScoreColor(overallScore!) }}>{overallScore}</span>
                  </div>
                </div>
              </div>

              {/* 4 gauges */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <ScoreGauge score={result.scores.performance} label="Performance" icon={Zap} delay={0} />
                <ScoreGauge score={result.scores.accessibility} label="Accessibility" icon={Shield} delay={0.1} />
                <ScoreGauge score={result.scores.bestPractices} label="Best Practices" icon={Layout} delay={0.2} />
                <ScoreGauge score={result.scores.seo} label="SEO" icon={Search} delay={0.3} />
              </div>

              {/* Core Web Vitals */}
              <SectionCard delay={0.4}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20"><Activity size={18} className="text-blue-400" /></div>
                  <h2 className="text-[18px] font-bold text-white">Core Web Vitals</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {[
                    { label: "FCP", value: result.metrics.fcp, good: parseFloat(result.metrics.fcp) < 2 },
                    { label: "LCP", value: result.metrics.lcp, good: parseFloat(result.metrics.lcp) < 2.5 },
                    { label: "TBT", value: result.metrics.tbt, good: parseFloat(result.metrics.tbt) < 200 },
                    { label: "CLS", value: result.metrics.cls, good: parseFloat(result.metrics.cls) < 0.1 },
                    { label: "Speed Index", value: result.metrics.si, good: parseFloat(result.metrics.si) < 3.4 },
                    { label: "TTI", value: result.metrics.tti, good: parseFloat(result.metrics.tti) < 5 },
                  ].map(m => <MetricPill key={m.label} {...m} />)}
                </div>
              </SectionCard>

              {/* Security + Green */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {result.security && <SecuritySection data={result.security} />}
                {result.greenHosting && <GreenSection data={result.greenHosting} />}
              </div>

              {/* OG + Tech Stack */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {result.ogTags && <OGSection data={result.ogTags} url={result.url} />}
                {result.techStack && result.techStack.length > 0 && <TechStackSection data={result.techStack} />}
              </div>

              {/* W3C */}
              {result.w3c && <W3CSection data={result.w3c} />}

              {/* Opportunities + Diagnostics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {result.opportunities.length > 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }} className="flex flex-col gap-4">
                    <SectionHeader dot="#f59e0b" title="Opportunities" count={result.opportunities.length} />
                    {result.opportunities.map((item, i) => <AuditRow key={i} item={item} />)}
                  </motion.div>
                )}
                {result.diagnostics.length > 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="flex flex-col gap-4">
                    <SectionHeader dot="#ef4444" title="Diagnostics" count={result.diagnostics.length} />
                    {result.diagnostics.map((item, i) => <AuditRow key={i} item={item} />)}
                  </motion.div>
                )}
              </div>

              {/* Passed */}
              {result.passed.length > 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }} className="flex flex-col gap-4">
                  <SectionHeader dot="#10b981" title="Passed Audits" count={result.passed.length} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {result.passed.map((item, i) => <AuditRow key={i} item={item} />)}
                  </div>
                </motion.div>
              )}

              {/* CTA */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
                className="mt-8 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group"
                style={{ background: "linear-gradient(135deg,rgba(139,92,246,0.1),rgba(59,130,246,0.1))", border: "1px solid rgba(139,92,246,0.3)" }}>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="flex flex-col gap-3 relative z-10 max-w-xl text-center md:text-left">
                  <h3 className="text-[28px] font-bold text-white">Need help fixing these issues?</h3>
                  <p className="text-[15px] text-white/50 leading-relaxed">Our team can resolve every flag in this report — performance, security, SEO, accessibility, and more.</p>
                </div>
                <Link href="/contact-sales"
                  className="relative z-10 flex shrink-0 items-center gap-3 rounded-2xl px-8 py-4 text-[16px] font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95"
                  style={{ background: "linear-gradient(135deg,#5449e8,#8f73fc)", boxShadow: "0 0 30px rgba(139,92,246,0.3)" }}>
                  Book a Free Call <ArrowRight size={18} />
                </Link>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');
      `}</style>
    </div>
  );
}