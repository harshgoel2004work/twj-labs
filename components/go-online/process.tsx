"use client";

import { useTranslations } from "next-intl";
import CustomBadge from "@/components/shared/custom-badge";
import { FadeUp } from "./fade-up";

export function GoOnlineProcess() {
  const t = useTranslations("GoOnline.Process");
  const steps = [
    {
      num: "01",
      title: t("steps.Discovery.title"),
      body: t("steps.Discovery.body"),
    },
    {
      num: "02",
      title: t("steps.Build.title"),
      body: t("steps.Build.body"),
    },
    {
      num: "03",
      title: t("steps.Grow.title"),
      body: t("steps.Grow.body"),
    },
  ];

  return (
    <section className="py-16 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <FadeUp className="mb-20 text-center flex flex-col items-center">
          <CustomBadge title={t("badge")} />
          <h2
            className="text-5xl md:text-6xl tracking-tight text-white max-w-2xl leading-tight mt-5"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {t.rich("title", {
              span: (chunks) => <span className="text-[#5449e8]">{chunks}</span>
            })}
          </h2>
          <p className="mt-6 text-neutral-400 leading-relaxed max-w-md mx-auto">
            {t("description")}
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <FadeUp key={step.num} delay={i * 0.12}>
              <div className="group relative p-8 md:p-10 rounded-3xl bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 overflow-hidden h-full flex flex-col">
                {/* Ambient Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#5449e8] rounded-full blur-[80px] opacity-0 group-hover:opacity-15 transition-opacity duration-700 -translate-y-1/2 translate-x-1/4" />

                <div className="relative z-10 mb-12">
                  <span
                    className="text-7xl font-black text-white/[0.04] group-hover:text-[#5449e8]/20 transition-colors duration-500 block font-manrope"

                  >
                    {step.num}
                  </span>
                </div>

                <div className="relative z-10 mt-auto">
                  <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">{step.body}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
