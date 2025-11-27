"use client"

import { cn } from '@/lib/utils'
import { ProcessType } from '@/types'
import { SparkleIcon } from 'lucide-react'
import Image from 'next/image'
import CustomBadge from './custom-badge'
import React from 'react'
import { iconMap } from '../icon-map'



const OurProcessDynamic = ({
  process,
  title,
  image,
  darkMode=false,
}: {
  process: ProcessType[]
  title: string
  image?: string
  darkMode?: boolean
}) => {
  const [currentStep, setCurrentStep] = React.useState<number>(1)
  const stepRefs = React.useRef<(HTMLDivElement | null)[]>([])

  const IconComponent = iconMap[process[currentStep - 1]?.icon || ''] || SparkleIcon;

  const activeProcessStep = React.useMemo(() => {
    return process.find((p) => p.step === currentStep) || process[0]
  }, [currentStep, process])


  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const step = parseInt(entry.target.getAttribute('data-step') || '1', 10)
            setCurrentStep(step)
          }
        })
      },
      {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0,
      }
    )

    const refs = stepRefs.current
    refs.forEach((ref) => ref && observer.observe(ref))

    return () => {
      refs.forEach((ref) => ref && observer.unobserve(ref))
    }
  }, [])

  return (
    <div
      className={cn(
        'w-full px-6 md:px-24 font-manrope py-16 md:py-20 pb-24 flex flex-col gap-4 items-center transition-colors duration-300',
        darkMode ? 'bg-[#060609] text-white' : 'bg-[#F4F5F9] text-black'
      )}
    >
      {/* Header */}
      <div className="flex flex-col items-center gap-4 md:gap-6 relative z-10 mb-3 text-center">
        <CustomBadge darkMode={darkMode} title="How we work" />

        <h2 className={cn("text-4xl md:text-4xl lg:text-5xl font-bold text-center tracking-tight leading-[1.2] max-w-3xl bg-clip-text text-transparent bg-gradient-to-b  py-3", darkMode ? " from-white via-white to-white/60" : "from-neutral-900 to-neutral-700")}>
          {title}
        </h2>
      </div>

      {/* Process Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-5 gap-12 mt-8 md:mt-12 w-full max-w-7xl'>
        
        {/* Image Section - Hidden on mobile/tablet to prioritize content flow */}
        <div
          className={cn(
            'hidden lg:block w-full rounded-lg overflow-hidden aspect-[16/10] col-span-3 sticky top-32 h-max transition-colors duration-300',
            darkMode ? 'bg-[#0c0c12]' : 'bg-white'
          )}
        >
          {activeProcessStep && image && (
            <Image
              src={image}
              alt={activeProcessStep.title}
              width={1000}
              height={1000}
              key={image}
              className='transition-opacity duration-300'
            />
          )}
        </div>

        {/* Steps */}
        <div className='col-span-1 lg:col-span-2'>
          {process.map((item, index) => (
            <div
              key={item.step}
              className='flex gap-4 md:gap-8 lg:gap-12'
              data-step={item.step}
              ref={(el) => { stepRefs.current[index] = el }}
            >
              {/* Step Icon & Line */}
              <div className='flex flex-col items-center shrink-0'>
                <div
                  className={cn(
                    'rounded-full p-2 transition-all duration-300 z-10',
                    currentStep === item.step
                      ? darkMode
                        ? 'bg-[#6c4efc] text-white shadow-lg shadow-[#6c4efc]/30 scale-110'
                        : 'bg-[#654be9] text-[#f2f0ff] shadow-lg shadow-[#654be9]/30 scale-110'
                      : darkMode
                        ? 'bg-gray-700 text-[#cbbcff] opacity-70 cursor-pointer'
                        : 'bg-violet-200 text-[#654be9] opacity-70 cursor-pointer'
                  )}
                  onClick={() => setCurrentStep(item.step)}
                >
                  {item.icon && <IconComponent size={16} />}
                </div>

                {/* Vertical Line */}
                <span
                  className={cn(
                    'border-r border-dotted transition-opacity h-full min-h-[12rem] md:min-h-[14rem]',
                    darkMode ? 'border-[#6c4efc]/50' : 'border-[#654be9]',
                    { 'opacity-0': item.step === process.length }
                  )}
                />
              </div>

              {/* Step Card */}
              <div
                className={cn(
                  'border rounded-lg p-4 md:p-4.5 mb-5 transition-all duration-300 w-full h-fit',
                  darkMode
                    ? 'border-white/[0.1] bg-[#0c0c12]'
                    : 'border-black/10 bg-[#fcf9ff]',
                  currentStep === item.step
                    ? darkMode
                      ? 'shadow-lg shadow-[#6c4efc]/20'
                      : 'shadow-lg shadow-[#654be9]/20'
                    : 'opacity-70 cursor-pointer'
                )}
                onClick={() => setCurrentStep(item.step)}
              >
                <p className='font-semibold text-xs text-[#6c4efc]'>
                  STEP-0{item.step}
                </p>
                <h1 className='text-lg font-bold mt-1'>{item.title}</h1>
                <p className='text-sm font-medium opacity-70 mt-1 leading-relaxed'>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OurProcessDynamic