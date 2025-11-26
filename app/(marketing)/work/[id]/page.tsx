"use client"

import CaseStudiesSection from '@/components/shared/case-studies'
import WorkDetailsHero from '@/components/work/hero-section'
import { OurWorkType } from '@/data/work-sample'
import { cn } from '@/lib/utils'
import { SparkleIcon, Target, Lightbulb, Quote, TrendingUp } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'
import CustomBadge from '@/components/shared/custom-badge'
import { usePathname } from 'next/navigation'
import { getPortfolio } from '@/actions/get-portfolio'

const Loader: React.FC<{className?: string}> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center ${className}`} role="status" aria-live="polite">
      <svg className="w-12 h-12 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="text-indigo-500/30" />
        <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="4" className="text-indigo-500" strokeLinecap="round"/>
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

const SkeletonCard: React.FC = () => (
  <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] animate-pulse">
    <div className="h-10 w-10 rounded-xl bg-white/5 mb-4" />
    <div className="h-6 w-3/4 bg-white/5 mb-3" />
    <div className="h-8 w-full bg-white/5 mb-6" />
    <div className="space-y-3">
      <div className="h-4 w-full bg-white/5" />
      <div className="h-4 w-5/6 bg-white/5" />
      <div className="h-4 w-3/4 bg-white/5" />
    </div>
  </div>
)

const WorkDetailsPage = () => {
  const pathname = usePathname()
  const currentWorkId = pathname.split('/')[2]

  const [portfolio, setPortfolio] = React.useState<OurWorkType[] | undefined>([])
  const [loading, setLoading] = React.useState<boolean>(false)
  const [initialLoaded, setInitialLoaded] = React.useState<boolean>(false)

  React.useEffect(() => {
    let mounted = true
    const loadData = async () => {
      setLoading(true)
      try {
        const portfolio = await getPortfolio()
        if (!mounted) return
        setPortfolio(portfolio)
      } catch (error) {
        console.error('Error fetching portfolio:', error)
        if (!mounted) return
        setPortfolio(undefined)
      } finally {
        if (!mounted) return
        setLoading(false)
        setInitialLoaded(true)
      }
    }
    loadData()
    return () => { mounted = false }
  }, [])

  // 1) show an immersive full-page loader the first time we fetch
  if (loading && !initialLoaded) {
    return (
      <div className="w-full min-h-screen py-24 flex flex-col items-center justify-center bg-[#060609] text-white">
        <Loader />
        <p className="mt-6 text-neutral-400">Loading portfolio…</p>
      </div>
    )
  }

  // 2) If we tried to fetch and portfolio is undefined -> show error state
  if (!portfolio) {
    return (
      <div className="w-full py-24 flex items-center justify-center">
        <p className="text-neutral-500">Unable to load portfolio data.</p>
      </div>
    )
  }

  const currentWork = portfolio.find(w => w.id.toString() === currentWorkId)

  // 3) If currentWork is not found but we are still loading (e.g., navigation while fetching) show inline skeletons
  if (!currentWork) {
    return (
      <div className='bg-[#060609] text-white font-manrope w-full selection:bg-indigo-500/30'>
        <div className="w-full px-6 md:px-12 lg:px-24 py-24">
          <div className="max-w-7xl mx-auto">
            {/* Hero skeleton */}
            <div className="mb-12">
              <div className="h-10 w-40 rounded-md bg-white/5 animate-pulse mb-4" />
              <div className="h-14 w-full md:w-3/4 rounded-md bg-white/5 animate-pulse" />
            </div>

            {/* Problem/Solution skeleton grid */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20'>
              <SkeletonCard />
              <SkeletonCard />
            </div>

            {/* Results skeleton */}
            <div className="mt-12 w-full bg-[#F4F5F9] text-black rounded-t-[3rem]">
              <div className="p-12 max-w-4xl mx-auto">
                <div className="h-8 w-48 rounded bg-white/5 animate-pulse mb-6" />
                <div className="h-10 w-full rounded bg-white/5 animate-pulse mb-4" />
                <div className="h-6 w-full rounded bg-white/5 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Normal render when data is present
  return (
    <div className='bg-[#060609] text-white font-manrope w-full selection:bg-indigo-500/30'>
      {/* 1. HERO SECTION */}
      <WorkDetailsHero work={currentWork} />

      {/* 2. PROBLEM & SOLUTION GRID */}
      <section className="relative w-full py-24 px-6 md:px-12 lg:px-24 z-10">
        {/* Background Texture */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-b from-indigo-900/10 to-transparent blur-[100px] -z-10" />

        <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20'>

          {/* Problem Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className='flex flex-col gap-6 p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-500'
          >
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center mb-2">
              <Target className="text-rose-400" size={24} />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="h-px w-8 bg-rose-400/50"></span>
                <span className="text-xs font-bold uppercase tracking-widest text-rose-300">The Challenge</span>
              </div>
              <h2 className='text-3xl md:text-4xl font-bold leading-tight mb-4'>
                Problem Statement
              </h2>
              <p className='text-neutral-400 leading-relaxed'>
                {currentWork?.problemStatement}
              </p>
            </div>
          </motion.div>

          {/* Solution Column */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className='flex flex-col gap-6 p-8 rounded-3xl border border-white/5 bg-gradient-to-br from-indigo-900/5 to-purple-900/5'
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-2">
              <Lightbulb className="text-indigo-400" size={24} />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="h-px w-8 bg-indigo-400/50"></span>
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-300">The Strategy</span>
              </div>
              <h2 className='text-3xl md:text-4xl font-bold leading-tight mb-4'>
                Solution Overview
              </h2>
              <p className=' text-neutral-400 leading-relaxed'>
                {currentWork?.solution}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. LIGHT SECTION (RESULTS & TESTIMONIAL) */}
      <div className='w-full bg-[#F4F5F9] text-black rounded-t-[3rem] relative overflow-hidden'>

        <div className='w-full px-6 md:px-12 py-24 flex flex-col items-center relative z-10'>
          <div className='max-w-4xl mx-auto text-center'>
            <CustomBadge darkMode={false} title="Measurable Impact" />

            <h2 className='text-3xl md:text-4xl mt-6 lg:text-5xl font-bold tracking-tight mb-8 leading-[1.1]'>
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Results.</span>
            </h2>

            <div className="relative p-8 md:p-12 bg-white rounded-3xl shadow-xl shadow-indigo-100 border border-indigo-50">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-violet-400 rounded-t-3xl" />

              <p className='text-lg md:text-xl font-medium text-neutral-700 leading-relaxed'>
                {currentWork?.results}
              </p>
            </div>
          </div>
        </div>

        {currentWork?.testimonial?.quote && (
          <div className='w-full px-6 md:px-12 pb-16 flex flex-col items-center relative'>
            <div className='max-w-4xl mx-auto text-center'>
              <Quote className="w-12 h-12 text-indigo-200 mx-auto mb-6 fill-current" />

              <p className='text-2xl md:text-3xl font-medium leading-snug text-neutral-900 mb-10'>
                &quot;{currentWork?.testimonial?.quote}&quot;
              </p>

              <div className='flex items-center justify-center gap-4'>
                <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg">
                  {currentWork?.testimonial?.author.charAt(0)}
                </div>
                <div className='text-left'>
                  <p className='font-bold text-neutral-900 text-lg leading-none mb-1'>
                    {currentWork?.testimonial?.author}
                  </p>
                  <p className='text-neutral-500 text-sm font-medium'>
                    {currentWork?.testimonial?.designation}, {currentWork?.companyName}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="">
          <CaseStudiesSection darkMode={false}/>
        </div>
      </div>
    </div>
  )
}

export default WorkDetailsPage
