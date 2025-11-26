import { SparkleIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import CustomBadge from '../shared/custom-badge'
import Image from 'next/image'


const HeroWordpress = () => {
  return (
    <div className='w-full min-h-screen font-manrope relative text-white z-0 px-6  md:px-12 lg:px-24'>
        <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-8 pt-40'>
            <div className=' w-full  flex flex-col items-start top-0 left-0 font-manrope space-y-4 '>
                    <CustomBadge darkMode={true} title="WordPress Development" />
                    <h1 className='text-4xl md:text-[42px]  font-medium tracking-wide bg-clip-text text-transparent bg-radial from-[#ffffff] to-[#999fb2]  leading-tight max-w-3xl z-10'>
                        Building <span className='bg-radial bg-clip-text text-transparent from-[#ffffff] to-[#999fb2]'>Stunning</span> and <span className='bg-radial bg-clip-text text-transparent from-[#ffffff] to-[#999fb2]'>Responsive</span> <span className='text-transparent bg-clip-text bg-linear-to-r from-[#897bdb] to-[#5449e8]'>WordPress</span> Websites
                    </h1>
                    
                    <p className='text-white/60 text-sm font-medium max-w-lg  pt-1 z-10'>
                        Crafting compelling brand identities that resonate with your audience and drive business success.
                    </p>

                    <div className='pt-2 flex items-center gap-4 z-10'>
                        <Link href={'/contact-sales'} className="px-6.5 py-3.5 rounded-full text-sm font-semibold bg-[#5449e8] shadow-[inset_0_9px_15px_rgba(0,0,0,0.6)] shadow-violet-400 cursor-pointer hover:shadow-[inset_0_-8px_15px_rgba(0,0,0,0.6)] hover:shadow-violet-400 transition-all duration-500">
                            Contact Sales
                        </Link>
                    </div>
              </div>
            <div
                className="
                    [transform:perspective(800px)_rotateY(-12deg)_rotateX(4deg)]
                    transition-transform duration-1000 ease-in-out mt-6 md:mt-0
                    rounded-md
                    shadow-[0_0_0_1px_rgba(0,0,0,0.024),0_1px_0_0_rgba(0,0,0,0.05),0_0_8px_0_rgba(0,0,0,0.03),0_20px_30px_0_rgba(0,0,0,0.1)]
                    hover:[transform:perspective(800px)_rotateY(-4deg)]
                    bg-linear-to-b from-[#baa1e3]/7 to-[#e5e5e5]/2 p-1.5 z-3
                "
                >
                <Image src="/hero/hero-wordpress.png" alt="Webflow Development" width={1000} height={1000} className='w-full h-auto object-contain rounded-lg'/>
            </div>

            <div className='absolute w-full h-screen top-0 left-0'>
                        <div
            className="absolute w-full max-w-xl aspect-square rounded-full top-1/3 right-20  opacity-40 blur-[150px] animate-blob animation-delay-2000 z-2"
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

export default HeroWordpress