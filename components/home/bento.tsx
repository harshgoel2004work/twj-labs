"use client";

import Link from "next/link";
import React from "react";
import { useTranslations } from "next-intl";

// ─── Global Styles ────────────────────────────────────────────────────────────
const globalStyles = `
  * { box-sizing: border-box; }

  .bento-root {
    font-family: 'DM Sans', sans-serif;
    background: #03040A;
  }

  .bento-card {
    position: relative;
    border-radius: 24px;
    overflow: hidden;
    background: linear-gradient(145deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.01) 100%);
    border: 1px solid rgba(255,255,255,0.07);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    transition: transform 0.4s cubic-bezier(0.23,1,0.32,1), box-shadow 0.4s cubic-bezier(0.23,1,0.32,1), border-color 0.4s ease;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06);
  }
  .bento-card:hover {
    transform: translateY(-4px) scale(1.01);
    border-color: rgba(255,255,255,0.12);
    box-shadow: 0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1);
  }

  /* Card-specific accent glows on hover */
  .bento-card.card-1:hover { box-shadow: 0 20px 60px rgba(59,130,246,0.15), 0 0 0 1px rgba(59,130,246,0.15), inset 0 1px 0 rgba(255,255,255,0.08); }
  .bento-card.card-2:hover { box-shadow: 0 20px 60px rgba(16,185,129,0.12), 0 0 0 1px rgba(16,185,129,0.12), inset 0 1px 0 rgba(255,255,255,0.08); }
  .bento-card.card-3:hover { box-shadow: 0 20px 60px rgba(139,92,246,0.15), 0 0 0 1px rgba(139,92,246,0.12), inset 0 1px 0 rgba(255,255,255,0.08); }
  .bento-card.card-4:hover { box-shadow: 0 20px 60px rgba(245,158,11,0.12), 0 0 0 1px rgba(245,158,11,0.1), inset 0 1px 0 rgba(255,255,255,0.08); }
  .bento-card.card-5:hover { box-shadow: 0 20px 60px rgba(168,85,247,0.15), 0 0 0 1px rgba(168,85,247,0.15), inset 0 1px 0 rgba(255,255,255,0.08); }

  /* Shimmer top border */
  .bento-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
    z-index: 10;
  }
  .bento-card.card-1::before { background: linear-gradient(90deg, transparent, rgba(59,130,246,0.5), rgba(139,92,246,0.3), transparent); }
  .bento-card.card-2::before { background: linear-gradient(90deg, transparent, rgba(16,185,129,0.4), transparent); }
  .bento-card.card-3::before { background: linear-gradient(90deg, transparent, rgba(139,92,246,0.4), transparent); }
  .bento-card.card-4::before { background: linear-gradient(90deg, transparent, rgba(245,158,11,0.4), transparent); }
  .bento-card.card-5::before { background: linear-gradient(90deg, transparent, rgba(168,85,247,0.5), rgba(236,72,153,0.3), transparent); }

  .card-title {
    font-weight: 700;
    letter-spacing: -0.02em;
    color: #F8FAFC;
  }
  .card-body {
    font-size: 13px;
    line-height: 1.7;
    color: rgba(255,255,255,0.4);
    font-weight: 400;
  }

  /* Badge */
  .badge-new {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 8px;
    border-radius: 100px;
    background: rgba(59,130,246,0.15);
    border: 1px solid rgba(59,130,246,0.25);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgba(147,197,253,0.9);
  }

  /* Buttons */
  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 9px 18px;
    border-radius: 10px;
    background: linear-gradient(135deg, #564be9 0%, #7661f4 100%);
    color: white;
    font-size: 13px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 4px 14px rgba(37,99,235,0.35), inset 0 1px 0 rgba(255,255,255,0.15);
  }
  .btn-primary:hover { background: linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(37,99,235,0.5); }

  .btn-ghost {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 9px 18px;
    border-radius: 10px;
    background: rgba(255,255,255,0.04);
    color: rgba(255,255,255,0.6);
    font-size: 13px;
    font-weight: 500;
    border: 1px solid rgba(255,255,255,0.08);
    cursor: pointer;
    transition: all 0.2s ease;
    backdrop-filter: blur(10px);
  }
  .btn-ghost:hover { background: rgba(255,255,255,0.08); color: white; border-color: rgba(255,255,255,0.15); }

  /* Step connector animation */
  @keyframes pulseGlow {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  /* Progress bar fill */
  @keyframes fillBar {
    from { width: 0%; }
    to { width: 100%; }
  }

  .progress-fill { animation: fillBar 1.5s ease-out forwards; }

  /* Gauge stroke animation */
  @keyframes gaugeIn {
    from { stroke-dasharray: 0 100; }
    to { stroke-dasharray: 98 100; }
  }
  .gauge-stroke { animation: gaugeIn 1.4s cubic-bezier(0.22,1,0.36,1) forwards; }

  /* Floating cards in revision illustration */
  @keyframes floatUp {
    0%,100% { transform: translateY(0px) rotate(6deg); }
    50% { transform: translateY(-6px) rotate(8deg); }
  }
  @keyframes floatMid {
    0%,100% { transform: translateY(0px); }
    50% { transform: translateY(-4px); }
  }

  .float-final { animation: floatUp 3s ease-in-out infinite; }

  /* Noise overlay */
  .noise {
    position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    opacity: 0.4;
    pointer-events: none;
    z-index: 1;
  }

  /* Glow orb */
  .orb {
    position: absolute;
    border-radius: 9999px;
    filter: blur(60px);
    pointer-events: none;
  }
`;

// ─── Illustrations ─────────────────────────────────────────────────────────────

const TimelineIllustration = () => {
  const t = useTranslations('Home.Bento');
  return (
    <div style={{ position: "relative", height: 200, background: "transparent", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Orbs */}
      <div className="orb" style={{ width: 200, height: 200, left: "10%", top: "50%", transform: "translateY(-50%)", background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)" }} />
      <div className="orb" style={{ width: 150, height: 150, right: "5%", top: "30%", background: "radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 70%)" }} />

      {/* Subtle grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", width: "82%", justifyContent: "space-between" }}>
        {/* Steps */}
        {[
          { label: t('discovery'), done: true, color: "#3B82F6" },
          { label: t('design'), done: true, color: "#3B82F6" },
          { label: t('build'), active: true, color: "#818CF8" },
          { label: t('launch'), color: "#374151" },
        ].map((step, i) => (
          <React.Fragment key={step.label}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
              {step.active ? (
                <div style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: "linear-gradient(135deg, rgba(129,140,248,0.15) 0%, rgba(99,102,241,0.1) 100%)",
                  border: "1.5px solid rgba(129,140,248,0.6)",
                  boxShadow: "0 0 0 8px rgba(99,102,241,0.08), 0 0 20px rgba(99,102,241,0.25)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  backdropFilter: "blur(10px)",
                }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#818CF8", boxShadow: "0 0 10px #818CF8", animation: "pulseGlow 2s ease-in-out infinite" }} />
                </div>
              ) : step.done ? (
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: "linear-gradient(135deg, rgba(59,130,246,0.2) 0%, rgba(37,99,235,0.15) 100%)",
                  border: "1px solid rgba(59,130,246,0.35)",
                  boxShadow: "0 0 14px rgba(59,130,246,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  backdropFilter: "blur(10px)",
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                </div>
              ) : (
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", fontWeight: 600 }}>{i + 1}</span>
                </div>
              )}
              <span style={{ fontSize: 11, fontVariantNumeric: "lining-nums", fontWeight: 500, letterSpacing: "0.02em", color: step.active ? "#C7D2FE" : step.done ? "rgba(147,197,253,0.7)" : "rgba(255,255,255,0.2)" }}>{step.label}</span>
            </div>

            {i < 3 && (
              <div style={{ flex: 1, height: 1, margin: "0 8px", marginBottom: 20, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, background: step.done && i < 2 ? "linear-gradient(90deg, rgba(59,130,246,0.4), rgba(59,130,246,0.2))" : "rgba(255,255,255,0.06)" }} />
                {step.done && i < 2 && <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(59,130,246,0.6), transparent)", filter: "blur(2px)" }} />}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const RevisionLoopIllustration = () => {
  const t = useTranslations('Home.Bento');
  const cardStyle = (rotate: number, x: number, y: number, opacity: number, glowColor?: string): React.CSSProperties => ({
    position: "absolute",
    width: 148, height: 90,
    borderRadius: 14,
    padding: "14px 14px",
    background: `linear-gradient(145deg, rgba(255,255,255,${opacity * 0.06}) 0%, rgba(255,255,255,${opacity * 0.02}) 100%)`,
    border: glowColor ? `1px solid ${glowColor}30` : "1px solid rgba(255,255,255,0.07)",
    backdropFilter: "blur(20px)",
    boxShadow: glowColor ? `0 8px 30px ${glowColor}20, inset 0 1px 0 rgba(255,255,255,0.06)` : "0 4px 20px rgba(0,0,0,0.4)",
    transform: `rotate(${rotate}deg) translate(${x}px, ${y}px)`,
    opacity,
    transition: "transform 0.4s cubic-bezier(0.23,1,0.32,1)",
  });

  return (
    <div style={{ position: "relative", height: 200, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="orb" style={{ width: 180, height: 180, right: "-20px", bottom: "-40px", background: "radial-gradient(circle, rgba(16,185,129,0.14) 0%, transparent 70%)" }} />

      <div style={{ position: "relative", width: 200, height: 120 }}>
        {/* Draft 1 */}
        <div style={cardStyle(-8, -50, 10, 0.35)}>
          <div style={{ height: 6, width: 44, borderRadius: 3, background: "rgba(255,255,255,0.1)", marginBottom: 8 }} />
          {[100, 80, 90].map((w, i) => <div key={i} style={{ height: 4, width: `${w}%`, borderRadius: 2, background: "rgba(255,255,255,0.05)", marginBottom: 5 }} />)}
          <span style={{ position: "absolute", bottom: 8, right: 10, fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.15)", letterSpacing: "0.08em" }}>{t('draft1')}</span>
        </div>

        {/* Draft 2 */}
        <div style={cardStyle(-3, -18, 4, 0.6)}>
          <div style={{ height: 6, width: 44, borderRadius: 3, background: "rgba(255,255,255,0.15)", marginBottom: 8 }} />
          {[100, 85, 70].map((w, i) => <div key={i} style={{ height: 4, width: `${w}%`, borderRadius: 2, background: "rgba(255,255,255,0.08)", marginBottom: 5 }} />)}
          <span style={{ position: "absolute", bottom: 8, right: 10, fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em" }}>{t('draft2')}</span>
        </div>

        {/* Final */}
        <div style={{ ...cardStyle(6, 14, -4, 1, "#10B981"), zIndex: 10 }}>
          <div style={{ height: 6, width: 44, borderRadius: 3, background: "rgba(16,185,129,0.4)", marginBottom: 8 }} />
          {[100, 85, 92].map((w, i) => <div key={i} style={{ height: 4, width: `${w}%`, borderRadius: 2, background: "rgba(255,255,255,0.12)", marginBottom: 5 }} />)}
          <div style={{ position: "absolute", bottom: 8, right: 8, display: "flex", alignItems: "center", gap: 4, padding: "3px 8px", borderRadius: 100, background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)" }}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="3" strokeLinecap="round"><path d="M5 13l4 4L19 7" /></svg>
            <span style={{ fontSize: 9, fontWeight: 700, color: "#34D399", letterSpacing: "0.06em" }}>{t('final')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const GanttBarIllustration = () => {
  const t = useTranslations('Home.Bento');
  return (
    <div style={{ position: "relative", height: 180, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 24px" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      <div className="orb" style={{ width: 120, height: 120, left: "40%", top: "50%", transform: "translate(-50%,-50%)", background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)" }} />

      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", gap: 16 }}>
        {[
          { label: t('design'), pct: "100%", color1: "#3B82F6", color2: "#818CF8", glow: "rgba(59,130,246,0.45)" },
          { label: t('dev'), pct: "100%", color1: "#8B5CF6", color2: "#A78BFA", glow: "rgba(139,92,246,0.45)" },
        ].map((item) => (
          <div key={item.label}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.5)", letterSpacing: "0.04em", textTransform: "uppercase" }}>{item.label}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: item.color2, letterSpacing: "0.04em" }}>{t('final')}</span>
            </div>
            <div style={{ height: 7, background: "rgba(255,255,255,0.05)", borderRadius: 100, overflow: "hidden", position: "relative" }}>
              <div className="progress-fill" style={{
                position: "absolute", left: 0, top: 0, height: "100%", width: item.pct,
                borderRadius: 100,
                background: `linear-gradient(90deg, ${item.color1}, ${item.color2})`,
                boxShadow: `0 0 10px ${item.glow}`,
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PerformanceIllustration = () => {
  const t = useTranslations('Home.Bento');
  return (
    <div style={{ position: "relative", height: 180, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="orb" style={{ width: 160, height: 160, left: "50%", top: "50%", transform: "translate(-50%,-50%)", background: "radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)" }} />

      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        {/* Glass ring container */}
        <div style={{
          width: 88, height: 88,
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 30px rgba(245,158,11,0.1)",
          position: "relative",
        }}>
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", transform: "rotate(-90deg)" }} viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2.5" />
            <circle className="gauge-stroke" cx="18" cy="18" r="14" fill="none" stroke="url(#gaugeGrad)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="0 100" style={{ filter: "drop-shadow(0 0 4px rgba(245,158,11,0.6))" }} />
            <defs>
              <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#FCD34D" />
              </linearGradient>
            </defs>
          </svg>
          <div style={{ textAlign: "center", zIndex: 1 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#F8FAFC", lineHeight: 1 }}>98</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#F59E0B", boxShadow: "0 0 8px #F59E0B" }} />
          <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(252,211,77,0.8)", letterSpacing: "0.08em", textTransform: "uppercase" }}>{t('performance')}</span>
        </div>
      </div>
    </div>
  );
};

const PricingIllustration = () => {
  const t = useTranslations('Home.Bento');
  return (
    <div style={{ position: "relative", height: 180, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="orb" style={{ width: 200, height: 200, left: "50%", top: "50%", transform: "translate(-50%,-50%)", background: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)" }} />

      {/* Glass invoice card */}
      <div style={{
        position: "relative", zIndex: 2,
        width: 190,
        borderRadius: 16,
        background: "linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
        border: "1px solid rgba(168,85,247,0.2)",
        backdropFilter: "blur(24px)",
        padding: "16px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.08)",
        transition: "transform 0.3s ease",
      }}>
        {/* Header shimmer */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.5), transparent)", borderRadius: "16px 16px 0 0" }} />

        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: 10, marginBottom: 12 }}>
          <span style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{t('scope')}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          {[t('design'), t('dev'), t('launchSupport')].map((item) => (
            <div key={item} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", fontFamily: "'DM Sans', sans-serif" }}>{item}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{ width: 14, height: 14, borderRadius: "50%", background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="3" strokeLinecap="round"><path d="M5 13l4 4L19 7" /></svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: 12, paddingTop: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>{t('noFees')}</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#34D399", letterSpacing: "0.02em" }}>{t('transparent')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────

interface BentoGridSectionProps {
  nextLabel: string;
  framerLabel: string;
  appStoreLabel: string;
  publishLabel: string;
  referencesLabel: string;
}

export default function BentoGridSection({
  nextLabel,
  framerLabel,
  appStoreLabel,
  publishLabel,
  referencesLabel
}: BentoGridSectionProps) {
  const t = useTranslations('Home.Bento');
  
  // Note: Local illustrations use useTranslations directly.
  // Illustrations from twj-difference were passed as props.
  // We'll import them locally here to keep things simple.
  
  const { NextButtonIllustration, AppIconsIllustration, PerformanceIllustration: PerfIllu, PublishIllustration, ReferencesIllustration, Card, NewBadge } = require('./twj-difference');
  
  return (
    <>
      <style>{globalStyles}</style>
      <section className="bento-root font-manrope!" style={{ minHeight: "100vh", padding: "40px 0px", position: "relative" }}>
        {/* Global background effects */}
        <div style={{ position: "fixed", inset: 0, background: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(59,130,246,0.08) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ position: "fixed", inset: 0, background: "radial-gradient(ellipse 60% 40% at 80% 100%, rgba(139,92,246,0.06) 0%, transparent 50%)", pointerEvents: "none" }} />

        <div style={{ margin: "0 auto", position: "relative", zIndex: 1 }}>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">

            {/* Card 1 — Unlimited Requests (2 col) */}
            <div className="bento-card card-1 md:col-span-2 flex flex-col min-h-[400px]">
              <div className="noise" />
              <TimelineIllustration />
              <div style={{ padding: "20px 24px 24px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                <h3 className="card-title" style={{ fontSize: 17, margin: 0 }}>{t('requestsTitle')}</h3>
                <p className="card-body" style={{ margin: 0 }}>
                  {t('requestsDesc')}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 10 }}>
                  <Link
                    href={'/contact-sales'}
                    className="w-fit py-3 px-8 mt-8 rounded-xl text-xs font-semibold bg-[#5449e8] shadow-[inset_0_9px_15px_rgba(0,0,0,0.6)] shadow-violet-400 text-white hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                  >
                    {t('cta')}
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 2 — Revisions (2 col) */}
            <div className="bento-card card-2 md:col-span-2 flex flex-col min-h-[400px]">
              <div className="noise" />
              <RevisionLoopIllustration />
              <div style={{ padding: "16px 24px 24px", display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <h3 className="card-title" style={{ fontSize: 16, margin: 0 }}>{t('revisionsTitle')}</h3>
                </div>
                <p className="card-body" style={{ margin: 0 }}>
                  {t('revisionsDesc')}
                </p>
              </div>
            </div>

            {/* Card 3 — Quick Turnaround (1 col) */}
            <div className="bento-card card-3 col-span-1 flex flex-col min-h-[300px]">
              <div className="noise" />
              <GanttBarIllustration />
              <div style={{ padding: "14px 20px 20px", display: "flex", flexDirection: "column", gap: 7 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <h3 className="card-title" style={{ fontSize: 15, margin: 0 }}>{t('turnaroundTitle')}</h3>
                  <span className="badge-new">{t('new')}</span>
                </div>
                <p className="card-body" style={{ margin: 0, fontSize: 12.5 }}>
                  {t('turnaroundDesc')}
                </p>
              </div>
            </div>

            {/* Card 4 — Publish in Seconds (1 col) */}
            <div className="bento-card card-4 col-span-1 flex flex-col min-h-[300px]">
              <div className="noise" />
              <PerformanceIllustration />
              <div style={{ padding: "14px 20px 20px", display: "flex", flexDirection: "column", gap: 7 }}>
                <h3 className="card-title" style={{ fontSize: 15, margin: 0 }}>{t('publishTitle')}</h3>
                <p className="card-body" style={{ margin: 0, fontSize: 12.5 }}>
                  {t('publishDesc')}
                </p>
              </div>
            </div>

            {/* Card 5 — Pricing (2 col) */}
            <div className="bento-card card-5 md:col-span-2 flex flex-col min-h-[350px]" style={{ border: "1px solid rgba(168,85,247,0.15)" }}>
              <div className="noise" />
              <PricingIllustration />
              <div style={{ padding: "14px 24px 24px", display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <h3 className="card-title" style={{ fontSize: 16, margin: 0 }}>{t('pricingTitle')}</h3>
                  <span className="badge-new">{t('new')}</span>
                </div>
                <p className="card-body" style={{ margin: 0 }}>
                  {t('pricingDesc')}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}