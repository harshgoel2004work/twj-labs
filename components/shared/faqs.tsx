'use client'

import { SparkleIcon } from 'lucide-react'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import CustomBadge from './custom-badge'

import { useTranslations } from 'next-intl'

const FaqsSection = ({ darkMode = false }: { darkMode?: boolean }) => {
  const t = useTranslations('Home.Faqs');
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const faqs = [
    { question: t('q1'), answer: t('a1') },
    { question: t('q2'), answer: t('a2') },
    { question: t('q3'), answer: t('a3') },
    { question: t('q4'), answer: t('a4') },
    { question: t('q5'), answer: t('a5') },
    { question: t('q6'), answer: t('a6') },
    { question: t('q7'), answer: t('a7') },
  ];

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div
      className={cn(
        'w-full  px-6 lg:px-24 font-manrope py-20 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start transition-colors duration-300 max-w-[90rem] mx-auto',
        darkMode ? ' text-white' : 'bg-[#F4F5F9] text-black'
      )}
    >
      {/* Left Column */}
      <div className='flex flex-col items-center md:items-start gap-2 col-span-1 px-4'>
        <CustomBadge darkMode={darkMode} title={t('badge')} />
                      
        
        <h1 className={cn("text-4xl mt-1 md:text-5xl font-bold tracking-tight leading-[1.1] max-w-3xl bg-gradient-to-l md:text-start text-center from-white to-gray-400 bg-clip-text text-transparent py-1",darkMode
              ? 'bg-gradient-to-l from-white to-gray-400'
              : 'bg-gradient-to-l from-[#000000] to-[#3e374b]'
          )}>
          {t('title')}
                </h1>
                
                <p className="opacity-60  max-w-xl mt-2 mb-5 md:text-start text-center">
          {t('sub')}
                </p>
       
      </div>

      {/* Right Column – Accordion */}
      <div className='col-span-1 w-full flex flex-col gap-4'>
        {faqs.map((faq, index) => (
          <div
            key={index}
            onClick={() => toggleAccordion(index)}
            className={cn(
              'border rounded-md p-4 transition-all duration-200 cursor-pointer backdrop-blur-md',
              darkMode
                ? 'bg-[#0a0a0e]/90 border-white/10 hover:border-[#6c4efc]/50'
                : 'bg-white border-black/10 hover:border-[#6c4efc]/50 shadow-sm',
              activeIndex === index && 'border-[#6c4efc]/50'
            )}
          >
            {/* Question Row */}
            <div className='flex justify-between items-center'>
              <h2
                className={cn(
                  'font-medium opacity-80 transition-colors duration-300',
                  darkMode ? 'text-white' : 'text-black'
                )}
              >
                {faq.question}
              </h2>
              <motion.span
                animate={{ rotate: activeIndex === index ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  'font-bold text-xl select-none transition-colors duration-300',
                  darkMode ? 'text-[#a894ff]' : 'text-[#6c4efc]'
                )}
              >
                +
              </motion.span>
            </div>

            {/* Animated Answer */}
            <AnimatePresence initial={false}>
              {activeIndex === index && (
                <motion.div
                  key='content'
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className='overflow-hidden'
                >
                  <p
                    className={cn(
                      'mt-3 text-sm leading-relaxed transition-colors duration-300',
                      darkMode ? 'text-white/70' : 'text-black/70'
                    )}
                  >
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FaqsSection
