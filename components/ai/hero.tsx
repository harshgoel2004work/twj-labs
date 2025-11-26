import { ArrowRight, SparkleIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { GridScan } from '../GridScan'
import CustomBadge from '../shared/custom-badge'

const AiHero = () => {
  return (
    <div className='w-full min-h-screen font-manrope relative text-white z-0 px-6 md:px-12 lg:px-24 overflow-x-hidden overflow-y-hidden pb-10'>
      <div className='absolute top-0 left-0 w-full h-full -z-10 opacity-20'>
        <GridScan
          sensitivity={0}
          lineThickness={1}
          linesColor="#432dd7"
          gridScale={0.1}
          scanColor="#615fff"
          scanOpacity={0.4}
          enablePost
          bloomIntensity={0.6}
          chromaticAberration={0.002}
          noiseIntensity={0.01}
          enableGyro={false}
          scanDuration={10}

        />
      </div>

        <div className=' w-full pt-42 md:pt-56 pb-20  grid grid-cols-1 md:grid-cols-5 md:gap-14 px-4 top-0 left-0 font-manrope space-y-4 '>
            <div className='flex flex-col items-center md:items-start col-span-3'>
                    <CustomBadge darkMode={true} title="AI integration & automation" />
                <h1 className='text-4xl md:text-5xl mt-3 font-semibold tracking-wide leading-tight max-w-3xl z-10 text-center md:text-start'>
                    Turn Your Website Into an Intelligent Growth Machine.
                </h1>
            </div>
            
            <div className='flex flex-col justify-end col-span-2 space-y-4 items-center md:items-start '>
                <p className='text-white/60 text-sm font-medium max-w-lg  pt-1 z-10 text-center md:text-start'>
                    Leverage the power of AI to automate tasks, enhance user experiences, and drive smarter business decisions with our cutting-edge AI integration solutions.
                </p>
                <div className='pt-3 flex flex-row items-center gap-4 z-10 w-full sm:w-auto'>
          <Link href={'/contact-sales'} className="w-full sm:w-auto text-center px-6.5 py-3.5 rounded-full text-sm font-semibold bg-[#5449e8] shadow-[inset_0_9px_15px_rgba(0,0,0,0.6)] shadow-violet-400 cursor-pointer hover:shadow-[inset_0_-8px_15px_rgba(0,0,0,0.6)] hover:shadow-violet-400 transition-all duration-500">
            Contact Sales
          </Link>
          <Link href={'/work'} className="w-full sm:w-auto justify-center px-6.5 py-3.5 rounded-full text-sm font-medium bg-white/10 backdrop-blur-md border border-white/20 text-white cursor-pointer hover:bg-white/20 transition-all duration-300 flex items-center gap-2">
            Our Work <ArrowRight size={16} />
          </Link>
        </div>
            </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 w-full gap-6'>
          <div className='overflow-hidden rounded-xl w-full aspect-square relative'>
            <Image 
                src={'/hero-ai-1-new.png'}
                width={1500}
                height={1500}
                alt='AI Image 1'
                className='w-full h-full object-cover'
            />
            <div className='absolute top-0 left-0 w-full h-full bg-linear-to-t from-black/60 via-black/20 to-transparent p-6 flex flex-col justify-end gap-2'>
              <h1 className='text-3xl font-bold'>Automate the Repetitive</h1>
              <p className='text-white/60 text-xs'>
                Let AI handle your manual tasks, workflows, and operations — so your team can stay focused on growth.
              </p>
            </div>  
          </div>
          <div className='md:col-span-2 overflow-hidden rounded-xl w-full relative'>
            <Image 
                src={'/hero-ai-2-new.png'}
                width={1500}
                height={1500}
                alt='AI Image 2'
                className='w-full aspect-square md:aspect-auto md:h-full object-cover'
            />
            <div className='absolute top-0 left-0  w-full h-full bg-linear-to-t from-black/60 via-black/20 to-transparent p-6 flex flex-col justify-end gap-2'>
              <h1 className='text-3xl font-bold'>Integrate AI Into Your Business Seamlessly</h1>
              <p className='text-white/60 text-xs'>
                Connect AI models, automate processes, and build intelligent systems that enhance efficiency across your entire workflow.
              </p>
            </div>  
          </div>
      </div>
        
    </div>
  )
}

export default AiHero