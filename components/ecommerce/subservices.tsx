"use client"

import { AppWindow, ShoppingCartIcon, SparkleIcon, StoreIcon } from 'lucide-react'
import React from 'react'
import GlowingCard from '../ui/glow-card'
import { FaShopify } from 'react-icons/fa'
import { IoColorPalette } from 'react-icons/io5'



const EcomSubservices = () => {
  return (
    <div className='w-full min-h-screen px-24 pt-20 pb-28 font-manrope z-0 relative '>
      <div className='flex flex-col items-center gap-2'>
        <p className='text-xs flex items-center gap-1.5 rounded-full px-4 py-1.5 bg-black/40 backdrop-blur-md  text-white/70 z-10'><SparkleIcon size={15} fill='#6c4efc' stroke='none'/>Services Offered</p>
        <h1 className='text-[44px] font-semibold tracking-wide bg-clip-text text-transparent bg-linear-to-l from-[#ffffff] to-[#a299b2] text-center leading-tight max-w-3xl z-10'>
            Complete E-commerce solutions
        </h1>
      </div>

      <div className='mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto gap-8 relative z-0'>
        <div className='absolute -top-1/3 left-1/2 -translate-x-1/2 w-140 aspect-square rounded-full bg-[#654be9]/10 blur-[150px] z-[3]' />
        <div className='absolute -bottom-1/3 left-1/2 -translate-x-1/2 w-170 aspect-square rounded-full bg-[#4b70e9]/10 blur-[150px] z-[3]' />
        {subservices.map((service, index) => (
            <GlowingCard key={index} item={service} />
        ))}
      </div>
    </div>
  )
}

export default EcomSubservices