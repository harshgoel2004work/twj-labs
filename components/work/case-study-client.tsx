"use client"

import CaseStudiesSection from '@/components/shared/case-studies'
import { usePathname } from 'next/navigation'
import { getSanityCaseStudyById } from '@/actions/get-portfolio'
import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import DarkVeil from '@/components/DarkVeil'
import { useTranslations } from 'next-intl'

// ── Types ──────────────────────────────────────────────────────────────────────
export interface SanityDetailedWorkType {
  _id: string
  companyName: string
  companyLogo: string
  industry: string
  description: string
  heroImage: string
  gallery: string[]
  projectType: string
  completionDate: string
  technologies: string[]
  siteUrl: string
  problem: string
  solution: string
  results: string
  testimonialQuote: string
  testimonialName: string
  testimonialDesignation: string
  conversionRate: string
  userGrowth: string
  fullPageImage:string;
}

// ── Loader ─────────────────────────────────────────────────────────────────────
const Loader = () => (
  <div className="w-full min-h-screen flex flex-col items-center justify-center bg-black" role="status">
    <div className="relative w-10 h-10">
      <div className="absolute inset-0 border border-indigo-500/20 rounded-full animate-ping" />
      <div className="absolute inset-2 border border-indigo-500/40 rounded-full animate-pulse" />
      <div className="absolute inset-4 bg-indigo-500/20 rounded-full" />
    </div>
  </div>
)

export default function CaseStudyClient({ id }: { id: string }) {
  const t = useTranslations('CaseStudies')

  const [currentWork, setCurrentWork] = React.useState<SanityDetailedWorkType | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [initialLoaded, setInitialLoaded] = React.useState(false)

  React.useEffect(() => {
    let mounted = true
    const loadData = async () => {
      if (!id) return
      setLoading(true)
      try {
        const data = await getSanityCaseStudyById(id)
        if (!mounted) return
        setCurrentWork(data)
      } catch (e) {
        console.error(e)
        if (!mounted) return
        setCurrentWork(null)
      } finally {
        if (!mounted) return
        setLoading(false)
        setInitialLoaded(true)
      }
    }
    loadData()
    return () => { mounted = false }
  }, [id])

  if (loading && !initialLoaded) return <Loader />

  if (!currentWork && initialLoaded) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-black">
        <p className="text-white/40 text-sm tracking-widest uppercase">
          {t('notFound')}
        </p>
      </div>
    )
  }

  if (!currentWork) return <Loader />

  // Safely get gallery images for the layout blocks
  const images = currentWork.gallery || []

  return (
    <div className="bg-black text-white w-full min-h-screen font-sans selection:bg-indigo-500/30">
      
       {/* ── Ambient background glows ── */}
            <div className="pointer-events-none absolute inset-0 blur-2xl">
              <div className="opacity-50" style={{ width: "100%", height: "1000px", position: "relative" }}>
                <DarkVeil
                  hueShift={2}
                  noiseIntensity={0}
                  scanlineIntensity={0}
                  speed={1}
                  scanlineFrequency={0}
                  warpAmount={2}
                />
              </div>
            </div>

      {/* ── 1. HERO SECTION ── */}
      <section className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-16">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-8">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 max-w-2xl"
          >
            {/* Date Badge */}
            <div className="flex items-center gap-3 bg-white/[0.03] border border-white/10 rounded-full p-1 pr-4 w-fit mb-8">
              <span className="bg-violet-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                {t('hero.date')}
              </span>
              <span className="text-white/60 text-xs">
                {currentWork.completionDate || '2026'}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-6 leading-[1.1]">
              {currentWork.companyName}
            </h1>

            {/* Description */}
            <p className="text-white/50 text-base md:text-lg leading-relaxed mb-10 max-w-xl font-light">
              {currentWork.description || `${currentWork.companyName} is a cutting-edge creative agency that brings innovative designs and strategic solutions to life.`}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-3">
              {(currentWork.technologies)?.map((tag, i) => (
                <span key={i} className="bg-white/[0.04] border border-white/5 text-indigo-300 px-4 py-2 rounded-lg text-xs font-medium tracking-wide">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right Info Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-[360px] bg-[#090a11] border border-white/[0.08] rounded-2xl p-8 backdrop-blur-sm"
          >
            <div className="mb-6">
              <h4 className="text-white/40 text-[11px] uppercase tracking-wider mb-1.5">{t('hero.projectType')}</h4>
              <p className="text-white/90 text-sm font-medium">{currentWork.projectType.charAt(0).toUpperCase() + currentWork.projectType.substring(1,)}</p>
            </div>
            
            <div className="mb-6">
              <h4 className="text-white/40 text-[11px] uppercase tracking-wider mb-1.5">{t('hero.category')}</h4>
              <p className="text-white/90 text-sm font-medium">{currentWork.industry || 'Artist E-Commerce Portfolio'}</p>
            </div>

            <div className="mb-8 relative">
              <h4 className="text-white/40 text-[11px] uppercase tracking-wider mb-1.5">{t('hero.client')}</h4>
              <p className="text-white/90 text-sm font-medium">{currentWork.companyName}</p>
              
              
            </div>

            {currentWork.siteUrl && (
              <a 
                href={currentWork.siteUrl} 
                target="_blank" 
                rel="noreferrer"
                className="block w-full text-center bg-[#564ae9] hover:bg-indigo-600 text-white rounded-xl py-3.5 text-sm font-medium transition-all shadow-[0_0_20px_rgba(30,80,255,0.3)] hover:shadow-[0_0_30px_rgba(30,80,255,0.5)]"
              >
                {t('hero.viewSite')}
              </a>
            )}
          </motion.div>
        </div>

        {/* Hero Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 md:mt-24 w-full h-[400px] md:h-[700px] relative rounded-[2rem] overflow-hidden border border-white/10"
        >
          <Image 
            src={currentWork.heroImage} 
            alt={currentWork.companyName} 
            fill 
            className="object-cover"
            priority
          />
        </motion.div>
      </section>

      {/* ── 2. ANALYSIS / RESULTS SECTION ── */}
      {(currentWork.results || images.length >= 2) && (
        <section className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-12 py-20 border-t border-white/5">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-6">
              {t('analysis.title')}
            </h2>
            <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-4xl font-light">
              {t('analysis.description')}
            </p>
          </motion.div>

          <div className="space-y-10 mb-16">
            

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h3 className="text-lg font-medium mb-4">{t('analysis.resultsTitle')}</h3>
              <p className="text-white/50 text-sm leading-relaxed max-w-4xl font-light">
                {currentWork.results}
              </p>
            </motion.div>
          </div>

          {/* 2-Grid Images */}
          {images.length >= 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative h-[300px] md:h-[400px] rounded-[2rem] overflow-hidden border border-white/10">
                <Image src={images[0]} alt="Analysis 1" fill className="object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="relative h-[300px] md:h-[400px] rounded-[2rem] overflow-hidden border border-white/10">
                <Image src={images[1]} alt="Analysis 2" fill className="object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            </div>
          )}
        </section>
      )}

      {/* ── 3. PROBLEM SECTION ── */}
      {currentWork.problem && (
        <section className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-12 py-20 border-t border-white/5">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-6">
              {t('problem.title')}
            </h2>
            <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-4xl font-light">
              {t('problem.description')}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-lg font-medium">{t('problem.issueTitle')}</h3>
              
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-4xl font-light">
              {currentWork.problem}
            </p>
          </motion.div>

          {/* Single Wide Image */}
          {images.length >= 3 && (
            <div className="w-full relative h-[400px] md:h-[600px] rounded-[2rem] overflow-hidden border border-white/10">
              <Image src={images[2]} alt="Problem visual" fill className="object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          )}
        </section>
      )}

      {/* ── 4. SOLUTION SECTION ── */}
      {currentWork.solution && (
        <section className="relative z-10 max-w-[1100px] mx-auto px-6 md:px-12 py-20 border-t border-white/5">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-6">
              {t('solution.title')}
            </h2>
            <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-4xl font-light">
              {t('solution.description')}
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-lg font-medium">{t('solution.communicationTitle')}</h3>
              <span className="bg-[#8452f0] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">{t('solution.emailBadge')}</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-4xl font-light">
              {currentWork.solution}
            </p>
          </motion.div>

          {/* Remaining Images */}
          {images.length >= 4 && (
            <div className="w-full relative h-[400px] md:h-[600px] rounded-[2rem] overflow-hidden border border-white/10">
              <Image src={images[3]} alt="Solution visual" fill className="object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          )}
          
          {currentWork.fullPageImage && (
            <div className="w-full relative rounded-[2rem] overflow-hidden h-fit border border-white/10">
              <Image src={currentWork.fullPageImage} alt="Full Page Screenshot" width={1000} height={1000} className="object-cover h-full hover:scale-105 transition-transform duration-700" />
            </div>
          )}
        </section>
      )}

      <CaseStudiesSection darkMode={true} />

    </div>
  );
}
