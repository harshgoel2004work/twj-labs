'use client'

import { PricingPlanType } from '@/data/pricing-plans'
import { CheckIcon, XIcon } from 'lucide-react'
import React, { useEffect } from 'react'
import CustomBadge from './custom-badge'
import { getPricingPlans } from '@/actions/get-pricing'
import { safeParse, SkeletonCard } from '../pricing/pricing-hero'
import Link from 'next/link'

const PricingShared = ({
  forTitle,
  title,
  darkMode = true,
}: {
  forTitle: string
  title: string
  darkMode?: boolean
}) => {
  const [currentPlan, setCurrentPlan] = React.useState<PricingPlanType>();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [initialLoaded, setInitialLoaded] = React.useState<boolean>(false);

  useEffect( () => {
      let mounted = true;
      const loadData = async () => {
        setLoading(true);
        try {
          const plans:PricingPlanType[] = await getPricingPlans();
          if (!mounted) return;
          setCurrentPlan(plans.find((plan) => plan.title === forTitle));
        } catch (error) {
          console.error("Error fetching pricing plans:", error);
          if (!mounted) return;
          setCurrentPlan(undefined);
        } finally {
          if (!mounted) return;
          setLoading(false);
          setInitialLoaded(true);
        }
      }
      loadData();
      return () => { mounted = false; }
    }, []);

    

  return (
    <div
      className={`w-full min-h-screen px-6 md:px-24 pt-20 pb-28 font-manrope relative transition-colors duration-300 ${
        darkMode ? 'bg-[#060609] text-white' : 'bg-[#F4F5F9] text-black'
      }`}
    >
      {/* Header */}
      <div className='flex flex-col items-center gap-2'>
       <CustomBadge darkMode={darkMode} title="Pricing" />

        <h1
          className={`text-4xl md:text-4xl lg:text-5xl font-bold text-center tracking-tight leading-[1.2] max-w-3xl bg-clip-text text-transparent   ${
            darkMode
              ? 'bg-gradient-to-b from-white to-gray-400'
              : 'bg-gradient-to-b from-[#000000] to-[#3e374b]'
          }`}
        >
          {title}
        </h1>
      </div>

       {/* Show skeletons when loading and no data yet (first fetch) */}
          {loading && !initialLoaded && (
                      // render 3 skeletons by default
            Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} index={i} />)
          )}
    

      {/* Pricing Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14 max-w-6xl mx-auto'>
        {currentPlan?.plans.map((plan) => {
          const featuresList = safeParse(plan.features);
        const notIncludedList = safeParse(plan?.featuresNotIncluded);
          return (
          <div
            key={plan.id}
            className={`card-glow w-full rounded-lg p-2 flex flex-col relative overflow-hidden backdrop-blur-md border transition-all duration-300 ease-in-out pb-8 z-[0]
              ${
                darkMode
                  ? 'bg-[#100e14]/30 border-white/5'
                  : 'bg-white/50 border-black/10 shadow-md'
              }`}
          >
            {/* Dotted background */}
            <div
              className={`absolute inset-0 z-0 transition-colors duration-300 ${
                darkMode
                  ? 'bg-[radial-gradient(circle,rgba(255,255,255,0.04)_0.5px,transparent_1px)]'
                  : 'bg-[radial-gradient(circle,rgba(0,0,0,0.05)_0.5px,transparent_1px)]'
              } bg-[length:10px_10px]`}
            />

            {/* Plan Header */}
            <div
              className={`w-full h-40 rounded-lg flex items-end p-5 transition-colors duration-300 ${
                darkMode
                  ? 'bg-gradient-to-tr from-[#090909] via-[#151515] to-[#151119]'
                  : 'bg-gradient-to-tr from-[#d7d7fa] via-[#ededed] to-[#f1eff4]'
              }`}
            >
              <h2
                className={`text-3xl font-bold bg-clip-text text-transparent ${
                  darkMode
                    ? 'bg-gradient-to-r from-white to-[#a299b2]'
                    : 'bg-gradient-to-r from-[#000000] to-[#3e374b]'
                }`}
              >
                {plan.name}
              </h2>
            </div>

            {/* Plan Body */}
            <div
              className={`px-6 py-7 z-[2] space-y-9 transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-black'
              }`}
            >
              <p
                className={`text-sm ${
                  darkMode ? 'text-white/80' : 'text-black/80'
                }`}
              >
                {plan.description}
              </p>

              <button
                className={`px-4 py-2 rounded-md w-full font-medium text-sm cursor-pointer transition-all duration-500
                  ${
                                darkMode
                                  ? ' text-white bg-[#5449e8] shadow-[inset_0_9px_15px_rgba(0,0,0,0.6)] shadow-violet-400 cursor-pointer hover:shadow-[inset_0_-8px_15px_rgba(0,0,0,0.6)] hover:shadow-violet-400'
                                  : ' text-white bg-[#5449e8] shadow-[inset_0_9px_15px_rgba(0,0,0,0.6)] shadow-violet-400 cursor-pointer hover:shadow-[inset_0_-8px_15px_rgba(0,0,0,0.6)] hover:shadow-violet-400'
                              }`}
              >
                <Link href={`/contact-sales?ser-int=${currentPlan.title}&plan=${plan.name}`}>
                  Contact Sales
                </Link>
              </button>

              <hr className={`${darkMode ? 'border-white/10' : 'border-black/10'}`} />

              <div>
                {plan.everythingIncludedPrev && (
                  <p
                    className={`text-xs mb-4 ${
                      darkMode ? 'text-white/40' : 'text-black/50'
                    }`}
                  >
                    Includes everything from previous plans plus:
                  </p>
                )}

                <ul className='flex flex-col gap-3'>
                  {featuresList.map((feature) => (
                    <li
                      key={feature}
                      className={`text-xs font-medium flex items-center gap-1.5 ${
                        darkMode ? 'text-white/70' : 'text-black/80'
                      }`}
                    >
                      <div
                        className={`p-1 rounded-full transition-colors duration-300 ${
                          darkMode
                            ? 'bg-[#5449e810] text-[#5449e8]'
                            : 'bg-[#6c4efc]/10 text-[#6c4efc]'
                        }`}
                      >
                        <CheckIcon size={12} />
                      </div>
                      {feature}
                    </li>
                  ))}

                  {notIncludedList.map((feature) => (
                    <li
                      key={feature}
                      className={`text-xs font-medium flex items-center gap-1.5 ${
                        darkMode ? 'text-white/40' : 'text-black/40'
                      }`}
                    >
                      <div
                        className={`p-1 rounded-full ${
                          darkMode
                            ? 'bg-white/10 text-white/40'
                            : 'bg-black/10 text-black/40'
                        }`}
                      >
                        <XIcon size={12} />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )})}
      </div>
    </div>
  )
}

export default PricingShared
