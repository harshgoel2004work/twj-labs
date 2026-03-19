"use client";

import { otherPricingPlans } from "@/data/pricing-plans";
import { CheckIcon, SparkleIcon, ArrowRight } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Link from 'next/link';

const currencyMap: Record<string, string> = {
  "en-US": "USD",
  "fr-FR": "EUR",
  "ja-JP": "JPY",
  "en-IN": "INR",
};

const conversionRates: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  JPY: 150,
  INR: 83,
};

function useScrollReveal(offset = 100) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      const start = windowH;
      const end = windowH - offset;
      const raw = (start - rect.top) / (start - end);
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);

  return { ref, progress };
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

// ── Isolated component so the hook is always called at component level ──────
interface AnimatedCardProps {
  service: any;
  animated: boolean;
  formatPrice: (amount: number) => string;
  planKey: string;
}

const AnimatedCard = ({ service, animated, formatPrice, planKey }: AnimatedCardProps) => {
  const t = useTranslations("OtherServices");
  const LIFT_PX = 140;
  const { ref, progress } = useScrollReveal(160);

  const easedProgress = animated ? easeOutCubic(progress) : 1;
  const translateY = animated ? -(LIFT_PX * (1 - easedProgress)) : 0;
  const opacity = animated ? easedProgress : 1;
  const scale = animated ? 0.92 + 0.08 * easedProgress : 1;

  // Features are now pulled from translations as an array
  const features = t.raw(`plans.${planKey}.features`) as string[];

  return (
    <div
      ref={animated ? ref : undefined}
      style={{
        transform: `translateY(${translateY}px) scale(${scale})`,
        opacity,
        willChange:
          animated && progress < 1 ? "transform, opacity" : "auto",
      }}
      className="group relative p-6 md:p-8 rounded-2xl bg-white border border-neutral-200 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-shadow duration-300 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
    >
      {/* Left Side: Info & Price */}
      <div className="lg:col-span-5 flex flex-col gap-4 border-b lg:border-b-0 lg:border-r border-neutral-100 pb-6 lg:pb-0 lg:pr-8">
        <div>
          <h3 className="font-semibold text-neutral-900 text-lg mb-1">
            {t(`plans.${planKey}.name`)}
          </h3>
          <p className="text-neutral-500 text-sm leading-relaxed">
            {t(`plans.${planKey}.description`)}
          </p>
        </div>

        <span className="text-xs font-medium text-neutral-400 uppercase tracking-wide -mb-1">
          {t("startingAt")}
        </span>

        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-neutral-900 tracking-tight">
            {formatPrice(service.basePrice)}
          </span>
          {service.billingPeriod && (
            <span className="text-neutral-400 font-medium text-sm">
              /{t(`plans.${planKey}.billingPeriod`) || service.billingPeriod}
            </span>
          )}
        </div>

        <Link 
          href={`/contact-sales?service=${service.id}`}
          className="mt-2 w-full sm:w-fit inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#5449e8] hover:bg-[#4338ca] text-white rounded-lg font-medium text-sm transition-all duration-200 shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40"
        >
          {t("cta")}
          <ArrowRight
            size={16}
            className="group-hover:translate-x-0.5 transition-transform"
          />
        </Link>
      </div>

      {/* Right Side: Features */}
      <div className="lg:col-span-7">
        <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-4">
          {t("included")}
        </h4>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 text-sm text-neutral-600">
          {features.map((feature: string, idx: number) => (
            <li key={idx} className="flex items-start gap-2.5">
              <div className="mt-0.5 p-0.5 rounded-full bg-indigo-50 text-[#5449e8] shrink-0">
                <CheckIcon size={14} strokeWidth={3} />
              </div>
              <span className="leading-tight">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Map plan names to translation keys
const planKeyMap: Record<string, string> = {
  'Social Media Management': 'socialmedia',
  'SEO Services': 'seo',
  'Copywriting Services': 'copywriting',
  'Website Maintenance': 'maintenance'
};

// ── Main section ─────────────────────────────────────────────────────────────
const OtherServicesPricing = () => {
  const t = useTranslations("OtherServices");
  const params = useParams();

  const locale = Array.isArray(params?.locale)
    ? params.locale[0]
    : params?.locale || "en-IN";

  const currency = currencyMap[locale] || "INR";

  const formatPrice = (amount: number) => {
    const rate = conversionRates[currency] || 1;
    const converted = amount * rate;
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: converted < 1 ? 3 : 0, // for copywriting 0.018 rate
    }).format(converted);
  };

  return (
    <section className="w-full px-6 py-20 md:py-32 flex flex-col gap-12 items-center bg-linear-to-b from-[#f8f9ff] to-[#eef1ff] text-neutral-900 font-manrope relative overflow-hidden">

      {/* Decorative background blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-96 bg-indigo-200/30 blur-[100px] rounded-full pointer-events-none" />

      {/* Header Section */}
      <div className="flex flex-col items-center gap-4 relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 bg-white/60 border border-indigo-100 backdrop-blur-md text-indigo-600 text-xs font-semibold uppercase tracking-wider shadow-sm">
          <SparkleIcon size={14} className="fill-indigo-600" />
          {t("badge")}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-center leading-[1.1] max-w-3xl">
          {t.rich("title", {
            br: () => <br className="hidden md:block" />
          })}
        </h1>

        <p className="text-neutral-500 text-center max-w-xl text-lg">
          {t("description")}
        </p>
      </div>

      {/* Cards Container */}
      <div className="flex flex-col gap-6 w-full max-w-5xl relative z-10">
        {otherPricingPlans.map((service, index) => (
          <AnimatedCard
            key={index}
            service={service}
            planKey={planKeyMap[service.name] || 'socialmedia'}
            animated={index > 0}      // first card is static; rest animate
            formatPrice={formatPrice}
          />
        ))}
      </div>
    </section>
  );
};

export default OtherServicesPricing;