"use client";

import { useTranslations } from "next-intl";
import { Globe2, Rocket, TrendingUp, CheckCircle2 } from "lucide-react";
import CustomBadge from "@/components/shared/custom-badge";
import { FadeUp } from "./fade-up";

export function GoOnlineFeatures() {
  const t = useTranslations("GoOnline.Features");
  const features = [
    {
      title: t("visibility.title"),
      body: t("visibility.description"),
      icon: Globe2,
      accent: "#4f8ef7",
    },
    {
      title: t("accessibility.title"),
      body: t("accessibility.description"),
      icon: Rocket,
      accent: "#a855f7",
    },
    {
      title: t("growth.title"),
      body: t("growth.description"),
      icon: TrendingUp,
      accent: "#22d3a5",
    },
    {
      title: t("trust.title"),
      body: t("trust.description"),
      icon: CheckCircle2,
      accent: "#f59e0b",
    },
  ];

  return (
    <section className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <FadeUp className="mb-20">
          <CustomBadge title={t("badge")} />
          <h2 className="text-5xl md:text-6xl tracking-tight text-white max-w-2xl leading-tight mt-5" style={{ fontFamily: "'Syne', sans-serif" }}>
            {t("titlePart1")}<br />
            <span className="text-neutral-500">{t("titlePart2")}</span>
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
