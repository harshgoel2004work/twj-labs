"use client";

import { useTranslations } from "next-intl";
import { BoltIcon, ArrowUpRightIcon } from "lucide-react";
import { Link } from "@/i18n/routing";
import Plasma from "@/components/Plasma";

export function GoOnlineHero() {
  const t = useTranslations("GoOnline");

  return (
    <div className="relative">
      {/* ── Plasma background — right half ── */}
      <div className="absolute z-0 w-full md:w-1/2 right-0 h-full">
        <Plasma
          color={"#5449e8"}
          speed={0.6}
          direction="forward"
          scale={1.1}
          opacity={1}
          mouseInteractive={false}
        />
      </div>

      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, #060606 0%, transparent 15%, transparent 85%, #060606 100%)',
        }}
      />
      <section
        className="relative w-full min-h-screen flex items-center max-w-7xl mx-auto px-6 md:px-0"
      >
        {/* ── Content ── */}
        <div
          className="relative z-20 flex flex-col max-w-3xl"
        >
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2.5 w-fit rounded-full px-4 py-2 mb-8 text-[13px] font-medium"
            style={{
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.04)',
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            <div
              className="flex items-center justify-center w-5 h-5 font-manrope! rounded-full flex-shrink-0"
              style={{ background: "#5449e8" }}
            >
              <BoltIcon className="w-2.5 h-2.5 text-white" />
            </div>
            {t('Badge')}
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: 'clamp(2.6rem, 4.8vw, 4.2rem)',
              fontFamily: "'Syne', sans-serif",
              lineHeight: 1.07,
              letterSpacing: '-0.03em',
              color: '#fff',
            }}
          >
            {t('TitlePart1')}
            <span
              className="block"
              style={{ color: "#5449e8" }}
            >
              {t('TitlePart2')}
            </span>
          </h1>

          {/* Sub */}
          <p
            className="mt-5 mb-9 font-manrope!"
            style={{
              fontSize: 15,
              fontWeight: 400,
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.38)',
              maxWidth: 400,
            }}
          >
            {t('Subtitle')}
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-6">
            <Link
              href="/contact-sales"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-bold uppercase tracking-wide text-white transition-all hover:-translate-y-px"
              style={{
                background: "#5449e8",
                boxShadow: `0 0 32px #5449e866`,
                letterSpacing: '0.05em',
              }}
            >
              {t('CTA')}
              <ArrowUpRightIcon className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/work"
              className="text-[14px] font-medium underline underline-offset-4 transition-colors"
              style={{
                color: 'rgba(255,255,255,0.45)',
                textDecorationColor: 'rgba(255,255,255,0.18)',
                letterSpacing: '0.04em',
              }}
            >
              {t('Discover')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
