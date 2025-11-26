"use client"

import { cn } from '@/lib/utils'
import { ArrowRight, TrendingUp, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import CustomBadge from './custom-badge'
import { OurWorkType } from '@/data/work-sample'
import { useParams } from 'next/navigation' // 1. Import useParams
import { getPortfolio } from '@/actions/get-portfolio'

const CaseStudiesSection = ({ darkMode = false }: { darkMode: boolean }) => {
  const params = useParams(); // 2. Get parameters

  const [work, setWork] = React.useState<OurWorkType[] | undefined>([])
          const [loading, setLoading] = React.useState<boolean>(false);
          const [initialLoaded, setInitialLoaded] = React.useState<boolean>(false);
      
          React.useEffect(() => {
              let mounted = true;
              const loadData = async () => {
                  setLoading(true);
                  try {
                      const portfolio = await getPortfolio();
                      if (!mounted) return;
                      setWork(portfolio);
                  } catch (error) {
                      console.error("Error fetching portfolio:", error);
                      if (!mounted) return;
                      setWork(undefined);
                  } finally {
                      if (!mounted) return;
                      setLoading(false);
                      setInitialLoaded(true);
                  }
              }
              loadData();
              return () => { mounted = false; }
          }, [])
  
  // 3. Filter Logic: 
  // We convert IDs to strings to ensure accurate comparison (e.g., "1" vs 1).
  // We filter out the current one FIRST, then slice the top 3 remaining.
  if(!work || work.length === 0) {
    return <div className='w-full py-24 flex items-center justify-center'>
        <p className='text-neutral-500'>Unable to load case studies.</p>
    </div>
  }

  const displayedCaseStudies = work
    .filter((caseStudy) => String(caseStudy.id) !== String(params?.id))
    .slice(0, 3);

  return (
    <div className={cn('w-full px-6 md:px-12 lg:px-24 font-manrope py-20 flex flex-col gap-4 items-center text-white', !darkMode && 'bg-[#F4F5F9] text-black')}>
      <div className="flex flex-col items-center gap-4 relative z-10 mb-4">
        <CustomBadge darkMode={darkMode} title="Case Studies" />

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-center leading-[1.1] max-w-3xl ">
          Not just words, real results
        </h1>

        <p className="text-neutral-500 text-center max-w-xl text-lg">
          Explore our success stories and see how we&apos;ve transformed businesses like yours.
        </p>
      </div>

      {/* 4. Map over the filtered array */}
      {displayedCaseStudies.map((caseStudy) => (
        <div key={caseStudy.id} className={`relative mt-6 flex flex-col lg:flex-row w-full rounded-lg overflow-hidden gap-6 border p-3 ${darkMode ? 'border-white/[0.1] bg-[#09090e]' : 'bg-white/50 border border-black/10 z-0 max-w-7xl mx-auto'}`}>
          
          {/* Background Effects */}
          <div className='w-full h-full absolute top-0 left-0 backdrop-blur-2xl z-[2]' />
          <div className='absolute -top-10 right-0 w-32 h-72 bg-violet-400/10 rotate-135 blur-[100px]' />
          
          {/* Image Section */}
          <div className='w-full lg:w-[55%] z-[3] overflow-hidden rounded-lg min-h-[300px] relative'>
            <Image 
                src={caseStudy.heroImage} 
                alt={caseStudy.companyName} 
                fill
                className='object-cover hover:scale-105 transition duration-500'
            />
          </div>

          {/* Content Section */}
          <div className="flex flex-col justify-center p-2 lg:p-5 lg:w-[45%] gap-8 relative z-[3]">

            {/* Client Logo Area */}
            <div className="flex items-center justify-between">
              <div className={cn("p-3 rounded-xl border", darkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-100")}>
                <Image src={caseStudy.companyLogo} alt={caseStudy.companyName} width={120} height={40} className="object-contain h-8 w-auto" />
              </div>
              <span className={cn("text-sm font-mono opacity-50", darkMode ? "text-white" : "text-black")}>
                {caseStudy.industry}
              </span>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                {caseStudy.heroLine || 'Revamping Digital Presence'}
              </h2>
              <p className={cn("text-sm md:text-base leading-relaxed line-clamp-3", darkMode ? "text-neutral-400" : "text-neutral-600")}>
                {caseStudy.description}
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-dashed border-opacity-20 relative" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-emerald-500 font-semibold text-lg">
                  <TrendingUp size={18} /> +{caseStudy.stats?.trafficGrowth || 'N/A'}
                </div>
                <p className="text-xs uppercase tracking-wider opacity-60 font-semibold">Conversion Rate</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-indigo-500 font-semibold text-lg">
                  <Users size={18} /> {caseStudy.stats?.userGrowth || 'N/A'}
                </div>
                <p className="text-xs uppercase tracking-wider opacity-60 font-semibold">User Growth</p>
              </div>
            </div>

            {/* CTA */}
            <Link
              href={`/work/${caseStudy.id}`}
              className={cn(
                "inline-flex w-fit items-center gap-2 text-sm font-semibold border-b pb-0.5 transition-all hover:gap-4",
                darkMode ? "text-white border-white/30 hover:text-indigo-300 hover:border-indigo-300" : "text-black border-black/20 hover:text-indigo-600 hover:border-indigo-600"
              )}
            >
              Read Full Case Study
              <ArrowRight size={16} />
            </Link>

          </div>
        </div>
      ))}

    </div>
  )
}

export default CaseStudiesSection