"use client"

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ProcessType } from '@/types'
import { SparkleIcon } from 'lucide-react'
import { iconMap } from '../icon-map'
import CustomBadge from './custom-badge'

const OurProcessDynamic = ({
  process,
  title,
  image,
  darkMode = false,
}: {
  process: ProcessType[]
  title: string
  image?: string
  darkMode?: boolean
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const step = parseInt(entry.target.getAttribute('data-step') || '1', 10)
            setCurrentStep(step)
          }
        })
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0.1 }
    )

    stepRefs.current.forEach((ref) => ref && observer.observe(ref))
    return () => stepRefs.current.forEach((ref) => ref && observer.unobserve(ref))
  }, [])

  return (
    <section className={cn(
      'relative w-full px-6 py-24 md:px-12 lg:px-24 transition-colors duration-500',
      darkMode ? ' text-white' : 'bg-[#fafafa] text-black'
    )}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col items-center mb-20 text-center">
          <CustomBadge darkMode={darkMode} title="Our Methodology" />
          <h2 
            className="text-4xl md:text-6xl tracking-tight mt-6 max-w-4xl leading-[1.1]"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {title}
          </h2>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Visual Showcase - Static Image Container */}
          <div className="hidden lg:block lg:col-span-7 sticky top-40 h-[480px]">
            <div className={cn(
              "relative w-full h-full rounded-2xl overflow-hidden border transition-all duration-700",
              darkMode ? "border-white/10 bg-neutral-900/50" : "border-black/5 bg-white shadow-sm"
            )}>
              {/* Main Image - No dynamic key, so it never re-renders/flashes */}
              {image && (
                <Image
                  src={image}
                  alt="Process illustration"
                  fill
                  className="object-cover transition-opacity duration-1000"
                  priority
                />
              )}

              {/* Only the Icon Badge animates on step change */}
              <div className="absolute bottom-8 left-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="p-4 rounded-2xl backdrop-blur-xl bg-black/40 border border-white/20 shadow-2xl flex items-center gap-3"
                  >
                    {React.createElement(iconMap[process[currentStep - 1]?.icon || ''] || SparkleIcon, {
                      className: "w-6 h-6 text-white"
                    })}
                    <span className="text-white text-sm font-medium pr-2">
                      Step 0{currentStep}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Scrolling Content */}
          <div className="lg:col-span-5 flex flex-col gap-12">
            {process.map((item, index) => {
              const isActive = currentStep === item.step

              return (
                <div
                  key={item.step}
                  ref={(el) => { stepRefs.current[index] = el }}
                  data-step={item.step}
                  className={cn(
                    "relative pl-10 transition-all duration-500",
                    isActive ? "opacity-100 translate-x-1" : "opacity-30 translate-x-0"
                  )}
                >
                  {/* Vertical Rail Progress */}
                  <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-neutral-800/20 dark:bg-white/10">
                    {isActive && (
                      <motion.div 
                        layoutId="activeLine"
                        className="absolute top-0 left-[-1px] w-[3px] bg-indigo-500 h-full rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </div>

                  <div className="py-2">
                    <span className={cn(
                        "text-[10px] font-bold tracking-[0.2em] uppercase mb-2 block",
                        isActive ? "text-indigo-500" : "text-neutral-500"
                    )}>
                      Phase 0{item.step}
                    </span>
                    <h3 className="text-2xl font-bold tracking-tight mb-3">
                      {item.title}
                    </h3>
                    <p className={cn(
                      "text-sm leading-relaxed max-w-md",
                      darkMode ? "text-neutral-400" : "text-neutral-600"
                    )}>
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurProcessDynamic