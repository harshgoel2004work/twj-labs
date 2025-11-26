import { SparkleIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import LaserFlow from '../LaserFlow'
import CustomBadge from '../shared/custom-badge'
import Image from 'next/image'

const HeroWebflow = () => {
  return (
    <div className='w-full min-h-screen font-manrope relative text-white z-0 px-6 md:px-12 lg:px-24 overflow-hidden'>
        <div className='w-full flex flex-col gap-8 max-w-[96rem] mx-auto'>
            
            {/* Text Section: Adjusted height to be flexible on mobile (min-h) and fixed on desktop */}
            <div className='w-full flex flex-col items-start top-0 left-0 font-manrope space-y-4 min-h-[60vh] lg:h-[71vh] pt-28 md:pt-36 lg:pt-40 relative z-20'>
                    <CustomBadge darkMode={true} title="Webflow Development" />
                    
                    {/* Responsive Text Sizes */}
                    <h1 className='text-3xl md:text-4xl lg:text-[44px] font-medium tracking-wide bg-clip-text text-transparent bg-radial from-[#ffffff] to-[#999fb2] leading-tight max-w-2xl z-10'>
                        Building <span className='bg-radial bg-clip-text text-transparent from-[#ffffff] to-[#999fb2]'>Stunning</span> and <span className='bg-radial bg-clip-text text-transparent from-[#ffffff] to-[#999fb2]'>Responsive</span> <span className='text-transparent bg-clip-text bg-linear-to-r from-[#897bdb] to-[#5449e8]'>Webflow</span> Websites
                    </h1>
                    
                    <p className='text-white/60 text-sm md:text-base font-medium max-w-lg pt-1 z-10'>
                        Crafting compelling brand identities that resonate with your audience and drive business success.
                    </p>

                    <div className='pt-2 flex items-center gap-4 z-10 w-full sm:w-auto'>
                        <Link href={'/contact-sales'} className="w-full sm:w-auto text-center px-6.5 py-3.5 rounded-full text-sm font-semibold bg-[#5449e8] shadow-[inset_0_9px_15px_rgba(0,0,0,0.6)] shadow-violet-400 cursor-pointer hover:shadow-[inset_0_-8px_15px_rgba(0,0,0,0.6)] hover:shadow-violet-400 transition-all duration-500">
                            Contact Sales
                        </Link>
                    </div>
            </div>

            {/* Laser Background - Hidden on very small screens if needed, or kept as background */}
            <div className='absolute right-0 top-0 h-[100vh] lg:h-[155vh] w-full lg:w-auto pointer-events-none opacity-50 lg:opacity-100'>
                <LaserFlow 
                  color='#544990'
                />
            </div>

            {/* Image Showcase Section */}
            <div className='relative'>
                <div className='absolute w-full h-full max-w-7xl left-1/2 -translate-x-1/2 bg-gradient-to-b from-[#423490] to-[#0b0a0f] opacity-100 blur-[50px] rounded-xl'></div>
                
                <div className='relative box bg-neutral-950 z-[10] max-h-screen overflow-hidden w-full max-w-7xl mx-auto p-2 rounded-xl'>
                    <Image 
                        src="/hero/webflow-1.svg" 
                        alt="Webflow Development" 
                        width={1000} 
                        height={1000} 
                        className='w-full h-auto object-contain rounded-lg opacity-80'
                    />
                </div>
                
                <div className='bg-[#060508] w-full scale-150 h-40 lg:h-60 rounded-full absolute bottom-0 blur-2xl z-[10]'></div>
            </div>

            {/* Background Blob Animation */}
            <div className='absolute w-full h-screen top-0 left-0 pointer-events-none'>
                <div
                    className="absolute w-full max-w-[200px] md:max-w-xl aspect-square rounded-full top-1/4 md:top-1/3 left-0 md:left-20 opacity-40 blur-[100px] md:blur-[150px] animate-blob animation-delay-2000 z-2"
                    style={{
                        background:
                        'radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(248, 83%, 70%, 0.1) 0%, hsla(248, 83%, 60%, 0.5) 50%, hsla(248, 83%, 50%, 0) 80%)',
                    }}
                />
            </div>
        </div>
    </div>
  )
}

export default HeroWebflow