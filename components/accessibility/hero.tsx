import { ArrowRight, SparkleIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import CustomBadge from '../shared/custom-badge'

const HeroAccessibility = () => {
  return (
    <div className='w-full pb-20 font-manrope relative text-white z-0 px-6 md:px-12 lg:px-24 overflow-hidden'>
      
      {/* Background Image */}
      <div className='absolute w-full h-full bg-[url("/hero/accessibility.png")] bg-center bg-cover bg-no-repeat left-0 top-0 bg-[#060609]/80 z-[-1] opacity-30'></div>

      {/* CONTENT */}
      <div className='w-full pt-32 md:pt-40 pb-10 md:pb-20 flex flex-col justify-center items-center top-0 left-0 font-manrope space-y-4'>
        <CustomBadge darkMode={true} title="Accessibility Testing & Compliance" />
        
        {/* Responsive Text */}
        <h1 className='text-4xl md:text-5xl font-semibold tracking-wide bg-clip-text text-transparent bg-linear-to-r from-[#ecebff] to-[#a199b2] text-center leading-tight max-w-2xl z-10'>
          Making Internet Accessible for All
        </h1>

        <p className='text-white/60 text-sm md:text-base font-medium max-w-lg text-center pt-1 z-10'>
          We specialize in ensuring compliance with accessibility standards and enhancing user experience for all individuals.
        </p>

        {/* Buttons: Stack on mobile, Row on Desktop */}
        <div className='pt-3 flex flex-row items-center gap-4 z-10 w-full sm:w-auto'>
          <Link href={'/contact-sales'} className="w-full sm:w-auto text-center px-6.5 py-3.5 rounded-full text-sm font-semibold bg-[#5449e8] shadow-[inset_0_9px_15px_rgba(0,0,0,0.6)] shadow-violet-400 cursor-pointer hover:shadow-[inset_0_-8px_15px_rgba(0,0,0,0.6)] hover:shadow-violet-400 transition-all duration-500">
            Contact Sales
          </Link>
          <Link href={'/work'} className="w-full sm:w-auto justify-center px-6.5 py-3.5 rounded-full text-sm font-medium bg-white/10 backdrop-blur-md border border-white/20 text-white cursor-pointer hover:bg-white/20 transition-all duration-300 flex items-center gap-2">
            Our Work <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* VISUALS */}
      <div className='w-full flex items-center justify-center pb-10 relative'>
        
        {/* Main Central Image - Scales on mobile */}
        <div className='bg-[#ffffff]/2 w-full md:w-auto rounded-lg backdrop-blur-xl z-10'>
          <Image
            src="/hero/acc-no-bg-1.svg"
            alt="Accessibility Illustration"
            width={1000}
            height={1000}
            className='w-full md:w-150 rounded-lg'
          />
        </div>

        {/* Ghost/Blur behind main image */}
        <div className='bg-[#ffffff]/2 w-full md:w-auto rounded-lg backdrop-blur-xl absolute opacity-50 top-0'>
           <Image
            src="/hero/acc-no-bg-1.svg"
            alt="Accessibility Illustration"
            width={1000}
            height={1000}
            className='w-full md:w-150 rounded-lg'
          />
        </div>

        {/* Floating Side Images - Hidden on Mobile/Tablet (lg:block) to prevent overflow */}
        <div className='hidden lg:block bg-[#ffffff]/2 w-fit rounded-lg backdrop-blur-xl absolute -translate-x-[110%] xl:-translate-x-[140%] top-10 opacity-80 blur-[1px]'>
          <Image
            src="/hero/acc-nb-2.svg"
            alt="Accessibility Illustration"
            width={1000}
            height={1000}
            className='w-80 xl:w-90 rounded-lg'
          />
        </div>
        
        <div className='hidden lg:block bg-[#ffffff]/2 w-fit rounded-lg backdrop-blur-xl absolute translate-x-[105%] xl:translate-x-[134%] bottom-8 opacity-80 blur-[1px]'>
          <Image
            src="/hero/acc-nb-3.svg"
            alt="Accessibility Illustration"
            width={1000}
            height={1000}
            className='w-80 xl:w-90 rounded-lg'
          />
        </div>
      </div>
    </div>
  )
}

export default HeroAccessibility