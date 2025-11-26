import { Check, CreditCard } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import CustomBadge from '../shared/custom-badge'

const EcommerceFeatures = () => {
  return (
    <div className='w-full min-h-screen px-6 md:px-12 lg:px-24 pb-24 pt-12 font-manrope text-white'>
      <div className='flex flex-col items-center gap-2'>
        <CustomBadge title='Features' darkMode={true} />
        {/* Responsive Text Size */}
        <h1 className='text-3xl md:text-5xl lg:text-[44px] font-semibold tracking-wide bg-clip-text text-transparent bg-linear-to-l from-[#ffffff] to-[#a299b2] text-center leading-tight max-w-3xl z-10'>
            Ecommerce that sells
        </h1>
      </div>
      
      <div className='mt-16'>
        {/* Bento Grid Start */}
        <div className='grid w-full max-w-6xl grid-cols-1 lg:grid-cols-3 gap-5 mx-auto'>
            
            {/* CARD 1: Find it Fast */}
            <div className='card col-span-1 flex flex-col bg-[#0b0a0f21] justify-between relative sm:h-[300px] md:h-auto lg:max-h-[350px] w-full max-w-full p-5 rounded-[20px] border border-solid font-light overflow-hidden transition-all duration-300 ease-in-out border-white/10 z-[10] group'>
                <div className='relative min-h-[200px] w-full '>
                    {/* Floating Labels - Adjusted for safer positioning on mobile */}
                    <div className='bg-[#242431] rounded-full px-4 py-2 md:px-6 md:py-3 absolute top-[20%] md:top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/3 flex items-center justify-center shadow-lg z-10'>
                        <p className='font-medium text-xs md:text-sm whitespace-nowrap'>In Stock</p>
                    </div>
                    <div className='bg-[#242431] rounded-full px-4 py-2 md:px-6 md:py-3 absolute top-[45%] md:top-[40%] left-[20%] md:left-[20%] -translate-x-1/2 -translate-y-1/3 flex items-center justify-center scale-90 md:scale-80 opacity-60'>
                        <p className='font-medium text-xs md:text-sm whitespace-nowrap'>New</p>
                    </div>
                    <div className='bg-[#242431] rounded-full px-4 py-2 md:px-6 md:py-3 absolute top-[30%] md:top-[35%] left-[80%] md:left-[80%] -translate-x-1/2 -translate-y-1/3 flex items-center justify-center scale-90 md:scale-80 opacity-60'>
                        <p className='font-medium text-xs md:text-sm whitespace-nowrap'>On Sale</p>
                    </div>
                    <div className='bg-[#1c1635] border border-violet-500 rounded-full px-4 py-2 md:px-6 md:py-3 absolute top-[50%] md:top-[48%] left-1/2 md:left-[52%] -translate-x-1/2 -translate-y-1/3 flex items-center justify-center shadow-lg shadow-violet-500/20 z-10'>
                        <p className='font-medium text-xs md:text-sm whitespace-nowrap'>Limited Edition</p>
                    </div>
                </div>

                <span className='bg-[#6952FB]/20 w-[60%] aspect-square rounded-full z-[4] blur-[80px]'></span>
                <span className='absolute bottom-8 right-6 bg-[#3F9BD4]/20 w-[40%] aspect-square rounded-full z-[4] blur-[80px]'></span>
                <div className='absolute -left-[35%] -bottom-20 w-[150%] h-[70%] bg-[#09090B] blur-[40px] z-6' />
                
                <div className='absolute bottom-6 px-6  left-0 content w-full z-10 flex flex-col justify-end mt-auto'>
                    <h2 className='text-lg font-medium mb-1 z-10 relative'>Find it. Fast</h2>
                    <p className='text-xs text-white/70 z-10 relative'>
                        Semantic search + predictive filters help customers find products quickly.
                    </p>
                </div>
            </div>

            {/* CARD 2: Start Fresh */}
            <div className='card col-span-1 flex flex-col bg-[#0b0a0f21] justify-between relative min-h-[350px] lg:max-h-[350px] w-full max-w-full p-5 rounded-[20px] border border-solid font-light overflow-hidden transition-all duration-300 ease-in-out border-white/10 z-[10] group'>
                <div className='absolute left-0 top-0 w-full'>
                    <Image 
                        src='/bento-res/ecom/mid.svg'
                        alt='Webflow Development'
                        width={1000}
                        height={1000}
                        className='w-full object-fill z-[3] rounded-2xl opacity-90 mx-auto'
                    />
                </div>
                
                <div className='absolute -left-[35%] -bottom-20 w-[150%] h-[70%] bg-[#09090B] blur-[40px] z-6' />
                <div className='content w-full h-full z-10 flex flex-col justify-end mt-48 md:mt-0'>
                    <h2 className='text-lg font-medium mb-1 z-10 relative'>Start Fresh or Move Smoothly</h2>
                    <p className='text-xs text-white/70 z-10 relative'>
                        We handle the tech, so your customers see only the shine.
                    </p>
                </div>
            </div>

            {/* CARD 3: Browsers to Buyers */}
            <div className='card col-span-1 flex flex-col bg-[#0b0a0f21] justify-between relative min-h-[350px] lg:max-h-[350px] w-full max-w-full p-5 rounded-[20px] border border-solid font-light overflow-hidden transition-all duration-300 ease-in-out border-white/10 z-[10] group'>
                <div className='absolute inset-0 w-full h-full flex justify-center items-center'>
                     {/* Adjusted image positioning for responsiveness */}
                    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full'>
                        <Image 
                            src='/bento-res/ecom/3.svg'
                            alt='Webflow Development'
                            width={2000}
                            height={2000}
                            className='w-[60%] md:w-[50%] h-auto object-cover z-[3] rounded-2xl mx-auto absolute top-10 md:top-20 left-1/2 -translate-x-1/2'
                        />
                    </div>
                </div>

                <span className='bg-[#6952FB]/20 w-[60%] aspect-square rounded-full z-[4] blur-[80px]'></span>
                <span className='absolute bottom-8 right-6 bg-[#3F9BD4]/50 w-[40%] aspect-square rounded-full z-[4] blur-[80px]'></span>
                <div className='absolute -left-[35%] -bottom-20 w-[150%] h-[70%] bg-[#09090B] blur-[40px] z-6' />
                
                <div className='content w-full h-full z-10 flex flex-col justify-end'>
                    <h2 className='text-lg font-medium mb-1 z-10 relative'>Turning Browsers into Buyers</h2>
                    <p className='text-xs text-white/70 z-10 relative'>
                        Smart UX, speed, and checkout flow that make sales soar.
                    </p>
                </div>
            </div>

            {/* CARD 4: Checkout Flow (Wide Card) */}
            {/* Added lg:flex-row and min-h so it stacks on mobile */}
            <div className='card col-span-1 lg:col-span-3 flex flex-col lg:flex-row bg-[#0b0a0f21] justify-between relative min-h-[350px] lg:max-h-[350px] w-full max-w-full p-5 rounded-[20px] border border-solid font-light overflow-hidden transition-all duration-300 ease-in-out border-white/10 z-10 group'>
                
                <span className='bg-[#6952FB]/10 w-[50%] aspect-square rounded-full z-[4] blur-[80px]'></span>
                <span className='absolute bottom-8 right-6 bg-[#3F9BD4]/10 w-[40%] aspect-square rounded-full z-[4] blur-[80px]'></span>
                
                <div className='content w-full h-full absolute top-0 left-0 z-10 flex flex-col lg:flex-row'>
                    
                    {/* Text Section */}
                    <div className='px-6 md:px-10 py-10 lg:py-0 flex-1 h-full w-full flex flex-col items-center lg:items-start justify-center text-center lg:text-left'>
                        <h2 className='text-2xl md:text-4xl font-medium mb-1 z-10 relative flex flex-wrap justify-center lg:justify-start items-center gap-1'>
                            Faster Cart {`->`} Higher Conversion
                        </h2>
                        <p className='text-sm text-white/70 z-10 relative mt-2 md:mt-1 max-w-md lg:max-w-none'>
                            Remove friction from your checkout process with faster card payments, leading to higher conversion rates and increased sales.
                        </p>
                    </div>

                    {/* Visual Section: Checkout Flow */}
                    {/* Used scale-50 to shrink the flow on mobile so it fits the width */}
                    <div className='flex-1 flex items-center justify-center pb-10 lg:pb-0'>
                        <div className='flex items-center justify-center scale-50 sm:scale-75 md:scale-90 lg:scale-100 origin-center'>
                            <div className='cart flex flex-col items-center gap-1'>
                                <div className='w-16 aspect-square rounded-full bg-violet-500 items-center justify-center flex shadow-lg shadow-violet-500/30'>
                                    <Check />
                                </div>
                                <span className='text-sm mt-1'>Cart</span>
                            </div>
                            <span className='bg-violet-500 w-16 md:w-20 h-0.5 -translate-y-4 opacity-50'/>
                            
                            <div className='cart flex flex-col items-center gap-1'>
                                <div className='w-16 aspect-square rounded-full bg-violet-500 items-center justify-center flex shadow-lg shadow-violet-500/30'>
                                    <Check />
                                </div>
                                <span className='text-sm mt-1'>Address</span>
                            </div>
                            <span className='bg-violet-500 w-16 md:w-20 h-0.5 -translate-y-4 opacity-50'/>
                            
                            <div className='cart flex flex-col items-center gap-1'>
                                <div className='w-16 aspect-square rounded-full bg-violet-600 items-center justify-center flex shadow-xl shadow-violet-600/40 scale-110'>
                                    <CreditCard />
                                </div>
                                <span className='text-sm mt-1 font-semibold text-violet-300'>Payment</span>
                            </div>
                            <span className='bg-violet-500 w-16 md:w-20 h-0.5 -translate-y-4 opacity-50'/>
                            
                            <div className='cart flex flex-col items-center gap-1'>
                                <div className='w-16 aspect-square rounded-full border-2 border-dashed border-violet-500/50 items-center justify-center flex bg-violet-500/10'>
                                </div>
                                <span className='text-sm mt-1 text-white/50'>Success</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className='absolute -left-[35%] -bottom-20 w-[150%] h-[70%] bg-[#09090B] blur-[40px] z-6' />
            </div>

        </div>
      </div>
    </div>
  )
}

export default EcommerceFeatures