"use client"

import ColorBends from '@/components/ColorBends'
import { PlanType,  PricingPlanType } from '@/data/pricing-plans'
import { cn } from '@/lib/utils'
import { ArrowRight, Check, Sparkles, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect } from 'react'
import CustomBadge from '@/components/shared/custom-badge'
import { getPricingPlans } from '@/actions/get-pricing'
import Link from 'next/link'

type ServiceType = 'webflow' | 'wordpress' | 'ecommerce' | 'ai' | 'custom' | 'webDesign' | 'accessibility';

const serviceMap: Record<string, number> = {
  webflow: 0,
  wordpress: 1,
  ecommerce: 2,
  ai: 3,
  custom: 4,
  webDesign: 5,
  accessibility: 6,
}

// ✅ 1. Helper to safely parse JSON strings into Arrays
export const safeParse = (data: string | string[] | undefined | null): string[] => {
  if (!data) return [];
  if (Array.isArray(data)) return data; 
  try {
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("Failed to parse features:", e);
    return [];
  }
};

const PricingHero = () => {
  const [activeService, setActiveService] = React.useState<ServiceType>('webflow');
  const darkMode = true;

  // Get current active plans dynamically
  const [plansCategory, setPlansCategory] = React.useState<PricingPlanType[]>();
  const [currentPlans, setCurrentPlans] = React.useState<PlanType[]>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [initialLoaded, setInitialLoaded] = React.useState<boolean>(false);

  

  useEffect( () => {
    let mounted = true;
    const loadData = async () => {

      
      setLoading(true);
      try {
        const plans:PricingPlanType[] = await getPricingPlans();
        if (!mounted) return;

        setPlansCategory(plans);
      
        
        // Safety check to ensure the category exists
        const categoryData = plans[serviceMap[activeService]];
        if (categoryData) {
            setCurrentPlans(categoryData.plans);
        }
      } catch (error) {
        console.error("Error fetching pricing plans:", error);
        if (!mounted) return;
        setCurrentPlans(undefined);
      } finally {
        if (!mounted) return;
        setLoading(false);
        setInitialLoaded(true);
      }

      
    }
    loadData();
    return () => { mounted = false; }
  }, [activeService]);

  // Rearrange plans so the featured plan is placed in the middle
  const displayedPlans = React.useMemo(() => {
    if (!currentPlans) return undefined;
    const arr = [...currentPlans];
    const featuredIndex = arr.findIndex(p => p.featured);
    if (featuredIndex > -1) {
      const [featured] = arr.splice(featuredIndex, 1);
      const targetIndex = Math.floor(arr.length / 2);
      arr.splice(targetIndex, 0, featured);
    }
    return arr;
  }, [currentPlans]);

  return (
    <div className='relative w-full overflow-hidden bg-[#060609] min-h-screen'>
      
      {/* Background Ambience */}
      <div className='absolute w-full h-full top-0 left-0 inset-0 z-0 opacity-60 pointer-events-none'>
        <ColorBends
          colors={["#5449e8"]}
          rotation={0}
          speed={0.1}
          scale={1.5}
          frequency={1}
          warpStrength={1.04}
          mouseInfluence={0.1}
          parallax={0.1}
          noise={0.2}
          transparent={true}
        />
      </div>

      {/* Main Container */}
      <div className='relative z-10 max-w-[90rem] mx-auto px-6 md:px-12 lg:px-24 py-24 md:py-32'>
        
        {/* Header Section */}
        <div className='flex flex-col items-center gap-6 text-center'>
          <CustomBadge title='Pricing' darkMode={darkMode} />
          
          <h1 className='text-4xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] max-w-4xl bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/60'>
            Tailored Pricing Plans to <br className='hidden md:block' /> Suit Your Business Needs
          </h1>
          
          <p className='text-sm md:text-base md:text-lg text-neutral-400 max-w-2xl leading-relaxed'>
            All packages are customizable to fit your needs. Let&apos;s hop on a call and scope out your project details to find the perfect fit.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className='mt-12 w-full flex justify-center'>
          <div className='w-full max-w-full overflow-x-auto no-scrollbar pb-4 md:pb-0'>
            <div className='bg-[#0b090d]/80 backdrop-blur-xl border border-white/10 rounded-full p-1.5 flex items-center gap-1 w-max mx-auto'>
              {Object.keys(serviceMap).map((service) => (
                <button
                  key={service}
                  onClick={() => setActiveService(service as ServiceType)}
                  className={cn(
                    'relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap outline-none focus:outline-none',
                    activeService === service
                      ? 'text-white shadow-lg'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  )}
                >
                  {activeService === service && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-[#5449e8] rounded-full shadow-[0_0_20px_rgba(84,73,232,0.5)]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  {/* Fallback title from static data if dynamic fails, or strict mapping */}
                  <span className="relative z-10">{plansCategory?.[serviceMap[service]]?.title || service}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className='mt-16 w-full '>
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeService + (loading ? '-loading' : '')}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
            >
              {loading && !initialLoaded && (
                Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} index={i} />)
              )}

              {loading && initialLoaded && displayedPlans?.map((plan, index) => (
                <SkeletonCard key={`skeleton-${index}`} index={index} />
              ))}

              {!loading && displayedPlans?.map((plan, index) => (
                <PricingCard 
                    key={plan.id} 
                    activeServiceName={activeService}
                    plan={plan} 
                    darkMode={darkMode} 
                    index={index}
                />
              ))}

              {!loading && !displayedPlans && (
                <div className='col-span-full text-center text-slate-400 py-12'>
                  Unable to load plans. Please try again later.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {loading && !initialLoaded && (
        <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-auto">
          <div className="backdrop-blur-sm bg-black/40 absolute inset-0" />
          <div className="relative z-10 flex flex-col items-center gap-4">
            <Spinner />
            <span className="text-sm text-slate-300">Loading pricing plans…</span>
          </div>
        </div>
      )}

      <div aria-live="polite" className="sr-only">
        {loading ? 'Loading pricing plans' : 'Pricing plans loaded'}
      </div>
    </div>
  )
}

export const SkeletonCard = ({ index = 0 }: { index?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group relative w-full rounded-2xl p-0.5 flex flex-col"
    >
      <div className="relative h-full w-full rounded-xl overflow-hidden p-6 md:p-8 flex flex-col bg-neutral-950">
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none bg-[radial-gradient(#ffffff14_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="relative z-10 mb-8">
          <div className="h-6 w-32 rounded bg-slate-800 animate-pulse mb-3" />
          <div className="h-2 w-12 rounded bg-slate-800 animate-pulse mb-4" />
          <div className="h-4 w-full max-w-[240px] rounded bg-slate-800 animate-pulse" />
        </div>

        <div className="relative z-10 flex-grow space-y-4 mb-8">
          <ul className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <div className="h-4 w-4 rounded-full bg-slate-800 animate-pulse shrink-0" />
                <div className="h-3 w-full max-w-[180px] rounded bg-slate-800 animate-pulse" />
              </li>
            ))}
          </ul>
        </div>

        <div className="relative z-10 mt-auto pt-6 border-t border-white/5">
          <button disabled className="w-full py-4 rounded-xl text-sm font-bold tracking-wide uppercase bg-white/5 text-white/30 cursor-not-allowed">
            Loading...
          </button>
        </div>
      </div>
    </motion.div>
  )
}

const Spinner = () => (
  <svg className="animate-spin h-12 w-12 text-white" viewBox="0 0 24 24" role="img" aria-hidden="true">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
  </svg>
)

const PricingCard = ({
  plan,
  darkMode,
  index,
  activeServiceName // Added this prop to match your usage in main component
}: {
  plan: PlanType;
  darkMode: boolean;
  index: number;
  activeServiceName?: string;
}) => {

  // ✅ 2. Parse the strings here before rendering
  // Even if TypeScript says it's a string[], runtime might be a JSON string from SQLite
  const featuresList = safeParse(plan.features);
  const notIncludedList = safeParse(plan.featuresNotIncluded);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5, ease: "easeOut" }}
      className={cn(
        "group relative flex flex-col w-full min-h-full",
        plan.featured ? "z-10 scale-[1.02] lg:scale-105" : "z-0 scale-100"
      )}
    >
      {/* 1. GLOWING BORDER GRADIENT LAYER */}
      <div
        className={cn(
          "absolute inset-0 rounded-3xl transition-all duration-500",
          plan.featured
            ? "bg-gradient-to-b from-[#5449e8]  to-transparent shadow-[inset_0_1px_0px_rgba(0,0,0,0.6)] shadow-violet-400 opacity-100 blur-[1px]"
            : "bg-gradient-to-b from-white/20 via-white/5 to-transparent opacity-50 group-hover:opacity-100"
        )}
      />

      {/* 2. MAIN CARD CONTAINER */}
      <div
        className={cn(
          "relative flex flex-col h-full rounded-[23px] p-8  transition-colors duration-300 m-[1px] ove",
          darkMode ? "bg-[#0c0c12]" : "bg-white"
        )}
      >
        {/* --- Background Ambience --- */}
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-white/[0.01] rounded-3xl to-transparent pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png")' }} />
        
        {plan.featured && (
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/30 rounded-full blur-[60px] pointer-events-none" />
        )}

        {/* --- FEATURED BADGE --- */}
        {plan.featured && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#5449e8] shadow-[inset_0_9px_15px_rgba(0,0,0,0.6)] shadow-violet-400 text-[10px] font-bold uppercase tracking-widest text-white border border-white/20">
              <Sparkles size={10} className="fill-white" /> Most Popular
            </span>
          </div>
        )}

        {/* --- HEADER SECTION --- */}
        <div className="relative z-10 mb-8">
          <h3 className={cn(
              "text-xl font-bold tracking-tight mb-3",
              darkMode ? "text-white" : "text-slate-900"
          )}>
            {plan.name}
          </h3>
          
          <p className={cn(
              "text-sm leading-relaxed min-h-[40px]",
              darkMode ? "text-slate-400" : "text-slate-500"
          )}>
            {plan.description}
          </p>

           {/* <div className="mt-6 mb-2">
                <div className={cn("text-3xl font-black tracking-tight", darkMode ? "text-white" : "text-slate-900")}>
                    {plan.price === 'contact-sales' ? (
                        <span className="text-xl">Contact Sales</span>
                    ) : (
                        plan.price
                    )}
                </div>
            </div> */}
        </div>

        {/* --- DIVIDER --- */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* --- FEATURES LIST --- */}
        <div className="relative z-10 flex-grow space-y-5">
          {plan.everythingIncludedPrev && (
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              Everything in previous +
            </p>
          )}

          <ul className="space-y-4">
            {/* ✅ 3. Map over the parsed variables */}
            {featuresList.map((feature, i) => (
              <li key={`f-${i}`} className="flex items-start gap-3">
                <div className={cn(
                    "mt-0.5 flex items-center justify-center w-5 h-5 rounded-full shrink-0 border",
                    plan.featured 
                        ? "bg-indigo-500 border-indigo-500 text-white shadow-sm shadow-indigo-500/50" 
                        : "bg-white/5 border-white/10 text-slate-400"
                )}>
                  <Check size={12} strokeWidth={3} />
                </div>
                <span className={cn(
                    "text-sm font-medium leading-tight",
                    darkMode ? "text-slate-200" : "text-slate-700"
                )}>
                    {feature}
                </span>
              </li>
            ))}

            {notIncludedList.map((feature, i) => (
              <li key={`nf-${i}`} className="flex items-start gap-3 opacity-50 grayscale">
                <div className="mt-0.5 flex items-center justify-center w-5 h-5 rounded-full shrink-0 border border-white/5 bg-white/[0.02] text-slate-600">
                  <X size={12} strokeWidth={3} />
                </div>
                <span className={cn(
                    "text-sm font-medium leading-tight line-through decoration-slate-600",
                    darkMode ? "text-slate-500" : "text-slate-400"
                )}>
                    {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* --- CTA BUTTON --- */}
        <div className="relative z-10 mt-8 pt-6 border-t border-white/5">
          <button
            className={cn(
              "group/btn relative w-full px-5 py-3 rounded-xl text-sm font-bold tracking-wide uppercase overflow-hidden transition-all duration-300 cursor-pointer",
              plan.featured
                ? "  font-semibold bg-[#5449e8] shadow-[inset_0_9px_15px_rgba(0,0,0,0.6)] shadow-violet-400 cursor-pointer hover:shadow-[inset_0_-8px_15px_rgba(0,0,0,0.6)] text-white hover:shadow-violet-400 transition-all duration-500"
                : "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20"
            )}
          >
            <Link href={`/contact-sales?ser-int=${activeServiceName}&plan=${plan.name}`}>
            {/* Shimmer Effect on Hover */}
            <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out z-20" />
            
            <span className="relative z-10 flex items-center justify-center gap-2 ">
              Contact Sales
              <ArrowRight size={16} className={cn(
                  "transition-transform duration-300 group-hover/btn:translate-x-1",
                  plan.featured ? "text-white" : "text-white"
              )} />
            </span>
            </Link>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PricingHero