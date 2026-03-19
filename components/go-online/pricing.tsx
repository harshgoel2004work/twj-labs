"use client";

import { useTranslations } from "next-intl";
import { Sparkles, Check, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import CustomBadge from "@/components/shared/custom-badge";
import { FadeUp } from "./fade-up";

export function GoOnlinePricing() {
  const t = useTranslations("GoOnline.Pricing");
  const plans = [
    {
      id: 1,
      name: t("plans.essentials.name"),
      tag: null,
      price: "₹8999",
      body: t("plans.essentials.description"),
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
      name: t("plans.webPresence.name"),
      tag: t("mostPopular"),
      price: "₹16999",
      body: t("plans.webPresence.description"),
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
      name: t("plans.growth.name"),
      tag: null,
      price: "₹32999",
      body: t("plans.growth.description"),
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
      name: t("plans.custom.name"),
      tag: t("enterprise"),
      price: "Contact us",
      body: t("plans.custom.description"),
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

  return (
    <section className="py-32 px-6 relative overflow-hidden" id="pricing">
      {/* Ambient glow for the whole section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#5449e8]/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <FadeUp className="text-center mb-20 flex flex-col items-center">
          <CustomBadge title={t("badge")} />
          <h2
            className="text-5xl md:text-6xl tracking-tight text-white mb-6 mt-5"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {t.rich("title", {
              br: () => <br />,
              span: (chunks) => <span className="text-neutral-500">{chunks}</span>
            })}
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto text-lg leading-relaxed">
            {t("description")}
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <FadeUp key={plan.id} delay={i * 0.09}>
              <div
                className={cn(
                  "relative group p-8 rounded-3xl transition-all duration-500 h-full flex flex-col overflow-hidden",
                  plan.tag === t("mostPopular")
                    ? "bg-white/[0.05] border border-[#5449e8]/50 shadow-[0_0_40px_-15px_rgba(84,73,232,0.2)] hover:border-[#5449e8]/80"
                    : plan.tag === t("enterprise")
                      ? "bg-white/[0.02] border border-white/20 hover:bg-white/[0.04]"
                      : "bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.05] hover:border-white/10"
                )}
              >
                {/* Internal Glow for Popular Plan */}
                {plan.tag === t("mostPopular") && (
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#5449e8] rounded-full blur-[80px] opacity-20 group-hover:opacity-30 transition-opacity duration-700 -translate-y-1/2 translate-x-1/4" />
                )}

                <div className="relative z-10 flex flex-col h-full">
                  {/* Badge Area */}
                  <div className="mb-6 min-h-[28px]">
                    {plan.tag && (
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] px-3 py-1.5 rounded-full",
                          plan.tag === t("mostPopular")
                            ? "bg-[#5449e8]/20 text-[#8b7ff5] border border-[#5449e8]/30"
                            : "bg-white/5 text-neutral-400 border border-white/10"
                        )}
                      >
                        {plan.tag === t("mostPopular") && <Sparkles size={10} className="mr-0.5" />}
                        {plan.tag}
                      </span>
                    )}
                  </div>

                  {/* Header */}
                  <div className="mb-8 flex-grow">
                    <h3
                      className="text-2xl font-black text-white leading-tight mb-3 whitespace-pre-line"
                    >
                      {plan.name}
                    </h3>
                    <p className="text-sm text-neutral-500 leading-relaxed">{plan.body}</p>
                  </div>

                  {/* Features List */}
                  <div className="mb-8">
                    <ul className="space-y-4">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm">
                          <div
                            className={cn(
                              "mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0",
                              plan.tag === t("mostPopular")
                                ? "bg-[#5449e8] text-white"
                                : "bg-white/10 text-white"
                            )}
                          >
                            <Check size={10} strokeWidth={3} />
                          </div>
                          <span className="text-neutral-300 leading-tight">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="mt-auto">
                    <div className="mb-6 pt-6 border-t border-white/5">
                      <span className="text-xs text-neutral-500 uppercase tracking-widest font-bold">Price starting at</span>
                      <div
                        className="text-3xl font-black text-white mt-1"
                      >
                        {plan.price === "Custom" ? t("pricingLabel") : plan.price}
                      </div>
                    </div>

                    <Link
                      href={`/contact-sales?ser-int=go-online&plan=${plan.name.replace("\n", " ")}`}
                      className={cn(
                        "w-full inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-[14px] font-bold uppercase tracking-wide transition-all hover:-translate-y-px",
                        plan.tag === t("mostPopular")
                          ? "bg-[#5449e8] text-white shadow-[0_0_32px_rgba(84,73,232,0.4)]"
                          : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                      )}
                    >
                      {t("CTA")}
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
