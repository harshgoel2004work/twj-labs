import React from 'react'
import { LampContainer } from '../ui/lamp'
import { ArrowRight, SparkleIcon } from 'lucide-react'
import Link from 'next/link'
import PrismaticBurst from '../PrismaticBurst'
import { GlowingEffect } from '../ui/glowing-effect'
import { RiNextjsFill } from 'react-icons/ri'
import { GlowingEffectDemoSecond } from './glowing-demo'
import Image from 'next/image'
import CustomBadge from '../shared/custom-badge'

const HeroCustomSoft = () => {
  return (
    <div className='w-full min-h-screen font-manrope relative text-white z-0 px-24 overflow-x-hidden overflow-y-hidden'>
      <div className="absolute top-0 left-0 inset-0  w-full overflow-hidden">
            <PrismaticBurst
              animationType="rotate3d"
              intensity={0.5}
              speed={0.2}
              distort={2}
              paused={false}
              offset={{ x: 0, y: 0 }}
              hoverDampness={0.3}
              rayCount={10}
              mixBlendMode="overlay"
              colors={['#a684ff', '#5449e8', '#ffffff']}
            />
        </div>
      <div className=' w-full pt-40 pb-20  flex flex-col justify-center items-center px-4 top-0 left-0 font-manrope space-y-4 px-24 '>
            <CustomBadge darkMode={true} title="Custom Website/Software Development" />
            <h1 className='text-[44px] font-semibold tracking-wide bg-clip-text text-transparent bg-radial from-[#ffffff70] to-[#999fb2] text-center leading-tight max-w-3xl z-10'>
                Custom <span className='bg-radial bg-clip-text text-transparent from-[#ffffff] to-[#999fb2]'>Software</span> Development That Drives <span className='bg-radial bg-clip-text text-transparent from-[#ffffff] to-[#999fb2]'>Innovation</span>
            </h1>
            
            <p className='text-white/60 text-sm font-medium max-w-lg text-center pt-1 z-10'>
                Tailored software solutions designed to meet your unique business needs and propel your growth.
            </p>
      </div>

      

      <div>
        <div className="relative h-full rounded-2xl border border-white/10 p-2 md:rounded-3xl md:p-3 mx-auto max-w-6xl">
        <GlowingEffect
          blur={0}
          borderWidth={3}
          spread={80}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p bg-black shadow-[0px_0px_27px_0px_#2D2D2D]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
           <Image 
                           src="/hero/2.png"
                           alt="Ecommerce Hero Image"
                           width={1500}
                           height={1500}
                           className='w-full'
                           />
                           
          </div>
        </div>
      </div>
      </div>
      <div className='bg-[#060508] w-full scale-150 h-96 rounded-full absolute bottom-0 blur-2xl z-[2]'>

                </div>

            <div className='bg-[#060508] z-[-2]'>
                    <div className='absolute inset-0 w-full h-full '>
                        <div className='absolute inset-0 w-full h-full bg-radial from-black/0 to-black  '/>
                        
                    </div>
                </div>


        
    </div>
  )
}

export default HeroCustomSoft