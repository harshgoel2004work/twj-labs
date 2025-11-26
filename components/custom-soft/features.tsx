import { SparkleIcon } from 'lucide-react'
import React from 'react'

const CustomFeatures = () => {
  return (
    <div className='w-full min-h-screen px-24 -translate-y-30 font-manrope '>
      <div className='flex flex-col items-center gap-2'>
        <p className='text-xs flex items-center gap-1.5 rounded-full px-4 py-1.5 bg-black/40 backdrop-blur-md  text-white/70 z-10'><SparkleIcon size={15} fill='#6c4efc' stroke='none'/>Features</p>
        <h1 className='text-[44px] font-semibold tracking-wide bg-clip-text text-transparent bg-linear-to-l from-[#ffffff] to-[#a299b2] text-center leading-tight max-w-3xl z-10'>
            Custom Software Solutions Tailored for You
        </h1>
      </div>
      
      <div className='mt-16'>
        {/* <BentoGridSecondDemo /> */}
      </div>
    </div>
  )
}

export default CustomFeatures