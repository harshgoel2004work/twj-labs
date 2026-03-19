'use client'

import { UseCase, useCases } from '@/data/use-cases'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { ArrowUpRightIcon, BoltIcon } from '@heroicons/react/24/solid'
import Plasma from '@/components/Plasma' // your existing component

const accentMap: Record<string, string> = {
  b2b: '#8140e6',
  ecommerce: '#2563eb',
  saas: '#0891b2',
  healthcare: '#059669',
  education: '#d97706',
  finance: '#16a34a',
  realestate: '#b45309',
  hospitality: '#be185d',
}

const getAccent = (link: string) => accentMap[link] ?? '#ff6b35'

export default function UseCasesHeroSection({ useCase }: { useCase: UseCase }) {
  const [mounted, setMounted] = useState(false)
  const accent = getAccent(useCase.link)

  useEffect(() => setMounted(true), [])

  return (
    <div className="relative">
      {/* ── Plasma background — right half ── */}
      <div className="absolute z-0 w-full lg:w-1/2 right-0 h-full top-0">
        <Plasma
          color={accent}
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
        className="relative w-full min-h-screen flex items-center max-w-7xl mx-auto"

      >
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');`}</style>




        {/* ── Content ── */}
        <div
          className="relative z-20 flex flex-col max-w-3xl px-6 lg:px-0"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'none' : 'translateY(16px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
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
              className="flex items-center justify-center w-5 h-5 rounded-full flex-shrink-0 backdrop-blur-lg"
              style={{ background: accent }}
            >
              <BoltIcon className="w-2.5 h-2.5 text-white" />
            </div>
            {'Now available for your industry'}
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: 'clamp(2.3rem, 4.8vw, 4.2rem)',
              fontFamily: "'Syne', sans-serif",
              lineHeight: 1.07,
              letterSpacing: '-0.03em',
              color: '#fff',
            }}
          >
            {useCase.heroHeading}
            {/* <span
              className="block"
              style={{ color: accent }}
            >
              for {useCase.title}
            </span> */}
          </h1>

          {/* Sub */}
          <p
            className="mt-5 mb-9"
            style={{
              fontSize: 15,
              fontWeight: 400,
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.38)',
              maxWidth: 400,
            }}
          >
            {useCase.heroSubheading}
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-6">
            <Link
              href="/contact-sales"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[14px] font-bold uppercase tracking-wide text-white transition-all hover:-translate-y-px"
              style={{
                background: accent,
                boxShadow: `0 0 32px ${accent}66`,
                letterSpacing: '0.05em',
              }}
            >
              Get Started
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
              Discover More
            </Link>
          </div>
        </div>
      </section>
    </div>

  )
}