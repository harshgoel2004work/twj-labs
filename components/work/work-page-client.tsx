"use client";

import Image from 'next/image';
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { getSanityCaseStudies } from '@/actions/get-portfolio';
import { useTranslations } from 'next-intl';

// Define the type based on what our GROQ query returns
export interface SanityWorkType {
  _id: string;
  companyName: string;
  companyLogo: string;
  industry: string;
  description: string;
  heroImage: string;
  conversionRate: string;
  userGrowth: string;
  technologies: string[];
  projectType: string;
}

// Animation variants for the container
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Animation variants for individual cards
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function WorkPageClient() {
    const t = useTranslations('Work');
    const [portfolio, setPortfolio] = React.useState<SanityWorkType[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [initialLoaded, setInitialLoaded] = React.useState<boolean>(false);

    React.useEffect(() => {
        let mounted = true;
        const loadData = async () => {
            setLoading(true);
            try {
                const data = await getSanityCaseStudies();
                if (!mounted) return;
                setPortfolio(data);
            } catch (error) {
                console.error("Error fetching portfolio:", error);
                if (!mounted) return;
                setPortfolio([]);
            } finally {
                if (!mounted) return;
                setLoading(false);
                setInitialLoaded(true);
            }
        };
        loadData();
        return () => { mounted = false; };
    }, []);

  return (
    <div className='bg-[#060609] text-white w-full min-h-screen font-manrope selection:bg-indigo-500/30'>
      
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
         <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
         <div className="absolute bottom-[-10%] right-[20%] w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Section */}
        <div className='w-full pt-32 pb-24 flex flex-col items-center justify-center text-center space-y-6'>
           <div
              className={`inline-flex items-center gap-2.5 mb-8 transition-all duration-700 ease-out rounded-full px-2 py-1.5 backdrop-blur-lg bg-white/5 border border-white/5`}
              style={{ transitionDelay: "0ms" }}
            >
              <span className="rounded-full bg-linear-to-b from-violet-700 to-violet-500 px-2.5 py-1 text-[11px] font-bold tracking-wider text-white uppercase">
                {t('badge.name')}
              </span>
              <span className="text-[13px] text-white/80 tracking-wide pr-2">
                {t('badge.description')}
              </span>
            </div>
            
            <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className='text-5xl md:text-6xl lg:text-6xl tracking-tight text-white leading-[1.1] max-w-4xl'
                style={{ fontFamily: "'Syne',sans-serif" }}
            >
               {t('titlePart1')}<br />
               {t('titlePart2')}
            </motion.h1>
            
            {/* ── sub ── */}
            <p className="text-center text-[14.5px] leading-relaxed text-white/40 max-w-md mb-9">
              {t('subtitle')}
            </p>
            <button
              type="submit"
              className="w-fit py-3 px-8 rounded-xl text-sm font-semibold bg-[#5449e8] shadow-[inset_0_9px_15px_rgba(0,0,0,0.6)] shadow-violet-400 text-white hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              {t('cta')}
            </button>
        </div>

        {/* Work Grid */}
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-24 z-20'
        >
          {/* Show skeletons during initial load */}
          {loading && !initialLoaded && (
            Array.from({ length: 6 }).map((_, idx) => <SkeletonWorkCard key={`skeleton-${idx}`} index={idx} />)
          )}

          {/* Render actual portfolio when available and not loading */}
          {!loading && portfolio && portfolio.length > 0 && (
            portfolio.map((item) => (
              <OurWorkCard key={item._id} work={item} />
            ))
          )}

          {/* When not loading and no portfolio */}
          {!loading && (!portfolio || portfolio.length === 0) && (
            <div className='col-span-full text-center text-neutral-400 py-12'>
              {initialLoaded ? t('noItems') : t('error')}
            </div>
          )}
        </motion.div>
      </div>

      {/* Centered Loading Overlay (blocks interaction during first load) */}
      {loading && !initialLoaded && (
        <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-auto">
          <div className="backdrop-blur-sm bg-black/40 absolute inset-0" />
          <div className="relative z-10 flex flex-col items-center gap-4">
            <Spinner />
            <span className="text-sm text-neutral-300">{t('loading')}</span>
          </div>
        </div>
      )}

      {/* ARIA live region */}
      <div aria-live="polite" className="sr-only">
        {loading ? t('loading') : 'Portfolio loaded'}
      </div>
    </div>
  );
}

/* ----------------------
   OurWorkCard
   ---------------------- */
export const OurWorkCard = ({ work }: { work: SanityWorkType }) => {
  return (
    <div className='z-20 bg-white/5 rounded-4xl p-1.5 border border-white/5'>
        <Link href={`/our-work/${work._id}`} className="block h-full ">
            <div className="group relative bg-[#0c0c12] border border-black/80 rounded-3xl overflow-hidden hover:border-black/50 transition-all duration-500 h-full flex flex-col shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),_0_20px_40px_-10px_rgba(0,0,0,0.5)]">
                
                {/* 1. Image Area - Simplified and full-aspect */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-[1.3rem]">
                    {work.heroImage && (
                        <Image
                            src={work.heroImage}
                            alt={work.companyName}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                    )}

                    {/* NEW: Black Overlay on hover */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

                    {/* NEW: Project Type sliding in from top-right on hover */}
                    {work.projectType && (
                        <div className="absolute top-4 right-4 z-20 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75 px-3 py-1.5 rounded-full text-xs font-medium tracking-wide bg-black/60 backdrop-blur-md border border-white/10 text-white shadow-lg">
                            {work.projectType}
                        </div>
                    )}
                    
                    {/* Dark gradient overlay at the very bottom for better text contrast */}
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-[#0c0c12] to-transparent z-0 pointer-events-none" />
                </div>

                {/* 2. Content Area - Simplified Footer */}
                {/* Added z-20 so it sits above the new hover overlay */}
                <div className="px-6 py-3 flex items-center justify-between gap-4 absolute z-20 w-[96%] -translate-x-1/2 left-1/2 bottom-3 rounded-2xl bg-linear-to-b from-[#141624] via-[#090a11] to-[#0d0e17] border border-white/5">
                    
                    {/* NEW: Title & Logo Wrapper */}
                    <div className="flex items-center gap-3 overflow-hidden">
                        {work.companyLogo && (
                            <div className="relative w-6 h-6 shrink-0 rounded-full">
                                <Image
                                    src={work.companyLogo}
                                    alt={`${work.companyName} logo`}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        )}
                        <h3 className="text-white text-sm md:text-base tracking-tight truncate">
                            {work.companyName || "Untitled Project"}
                        </h3>
                    </div>

                    {/* Year / Industry Badge */}
                    <div className="px-3 py-1.5 rounded-xl text-[11px] font-mono tracking-wide bg-black/40 border border-white/5 text-white/70 shrink-0">
                        {work.industry || 2026}
                    </div>
                </div>
            </div>
        </Link>
    </div>
  );
};

/* ----------------------
   Skeleton Work Card
   ---------------------- */
const SkeletonWorkCard = ({ index = 0 }: { index?: number }) => {
  return (
    <motion.div variants={cardVariants} initial="hidden" animate="show" transition={{ delay: (index || 0) * 0.03 }}>
      <div className="group relative bg-[#0c0c12] border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 h-full flex flex-col p-0">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-800/50 animate-pulse" />

        <div className="p-6 flex flex-col flex-grow relative">
          <div className="h-6 w-16 rounded-full bg-neutral-800/80 animate-pulse mb-3" />
          
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="h-6 w-20 rounded-full bg-neutral-800/80 animate-pulse" />
            <div className="h-6 w-16 rounded-full bg-neutral-800/80 animate-pulse" />
          </div>

          <div className="mt-auto">
            <div className="h-4 w-full rounded bg-neutral-800/50 animate-pulse mb-2" />
            <div className="h-4 w-3/4 rounded bg-neutral-800/50 animate-pulse" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Spinner = () => (
  <svg className="animate-spin h-12 w-12 text-white" viewBox="0 0 24 24" role="img" aria-hidden="true">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
  </svg>
);
