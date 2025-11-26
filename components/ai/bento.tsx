import { SparkleIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import CustomBadge from '../shared/custom-badge'

const AIBento = () => {
  return (
    <div className='w-full min-h-screen px-6 md:px-12 lg:px-24 pb-24 pt-12 font-manrope text-white'>
      <div className='flex flex-col items-center gap-2'>
        <CustomBadge title='Features' darkMode={true} />
        {/* Responsive Text Size */}
        <h1 className='text-3xl md:text-5xl lg:text-[44px] font-semibold tracking-wide bg-clip-text text-transparent bg-linear-to-l from-[#ffffff] to-[#a299b2] text-center leading-tight max-w-3xl z-10'>
            AI that works for you
        </h1>
      </div>
      
      <div className='mt-16'>
        {/* Bento Grid Start */}
        <div className='grid w-full max-w-6xl grid-cols-1 lg:grid-cols-3 gap-5 mx-auto'>
            
            {/* 1. Chatbot Card */}
            <div className='card col-span-1 flex flex-col bg-[#0b0a0f21] justify-between relative min-h-[350px] w-full max-w-full p-5 rounded-[20px] border border-solid font-light overflow-hidden transition-all duration-300 ease-in-out border-white/10 z-[10] group'>
                 <div className='left-1/2 -translate-x-1/2 -top-8 absolute w-full opacity-60 group-hover:opacity-100 group-hover:-translate-y-[565%] group-hover:translate-x-[385%] group-hover:scale-1400 transition duration-[2s] ease-in-out'>
                  <Image 
                  src='/bento-res/ai/chat.svg'
                  alt='Webflow Development'
                  width={2000}
                  height={2000}
                  className='w-[70%] h-full object-cover z-[3] rounded-2xl mx-auto'
                />
                
                </div>
                <span className='bg-[#6952FB]/20 w-[60%] aspect-square rounded-full z-[4] blur-[80px]'></span>
                <span className='absolute bottom-8 right-6 bg-[#3F9BD4]/20 w-[40%] aspect-square rounded-full z-[4] blur-[80px]'></span>
                <div className='absolute -left-[35%] -bottom-20 w-[150%] h-[70%] bg-[#09090B] blur-[40px] z-6' />
                <div className='content w-full h-full z-10 flex flex-col justify-end'>
                    <h2 className='text-lg font-medium mb-1 z-10 relative'>Chatbot Integration</h2>
                    <p className='text-xs text-white/70 z-10 relative'>
                    Integrate AI chatbots into your website for enhanced user engagement.    
                    </p>
                </div>
            </div>

            {/* 2. N8N Card */}
            <div className='card col-span-1 flex flex-col bg-[#0b0a0f21] justify-between relative min-h-[350px] w-full max-w-full p-5 rounded-[20px] border border-solid font-light overflow-hidden transition-all duration-300 ease-in-out border-white/10 z-[10] group'>
                  
                  <div className='left-1/2 top-2/5 -translate-1/2 absolute '>
                  <Image 
                  src='/bento-res/ai/n8n.svg'
                  alt='Webflow Development'
                  width={1000}
                  height={1000}
                  className='w-[45%] object-cover z-[3] rounded-2xl opacity-90 mx-auto'
                />
                
                </div>
            
                <div className='w-full h-full absolute top-0 left-0 '>
                  <Image 
                  src='/bento-res/ai/ai.svg'
                  alt='Webflow Development'
                  width={1000}
                  height={1000}
                  className='w-full object-cover z-[3] rounded-2xl opacity-90 mx-auto'
                />
                
                </div>
            
                <span className='left-1/2 top-2/5 -translate-1/2 absolute w-[50%] aspect-square rounded-full z-[5] blur-[80px] bg-[#862059]/5 group-hover:bg-[#862059]/30 transition duration-700'></span>
            
                <Image 
                  src='/bento-res/branding-texture.svg'
                  alt='Webflow Development'
                  width={1000}
                  height={1000}
                  className='w-full object-cover z-[-1] rounded-2xl opacity-2 max-w-2xl mx-auto absolute top-0 left-0 pointer-events-none select-none'
                />
                <span className='bg-[#6952FB]/10 w-[50%] aspect-square rounded-full z-[4] blur-[80px]'></span>
                <span className='absolute bottom-8 right-6 bg-[#3F9BD4]/10 w-[40%] aspect-square rounded-full z-[4] blur-[80px]'></span>
                
            
                <div className='absolute -left-[35%] -bottom-20 w-[150%] h-[70%] bg-[#09090B] blur-[40px] z-6' />
                <div className='content w-full h-full z-10 flex flex-col justify-end'>
                    <h2 className='text-lg font-medium mb-1 z-10 relative'>Automation using n8n</h2>
                    <p className='text-xs text-white/70 z-10 relative'>
                    Create automated workflows with n8n&apos;s powerful platform.
                    </p>
                </div>
            </div>

            {/* 3. API Integrations Card */}
            <div className='card col-span-1 flex flex-col bg-[#0b0a0f21] justify-between relative min-h-[350px] w-full max-w-full p-5 rounded-[20px] border border-solid font-light overflow-hidden transition-all duration-300 ease-in-out border-white/10 z-[10] group'>
                  
                  <div className='left-1/2 -translate-x-1/2 top-2/5 -translate-y-1/2 absolute w-full opacity-60'>
                  <Image 
                  src='/bento-res/ai/api.svg'
                  alt='Webflow Development'
                  width={2000}
                  height={2000}
                  className='w-[50%] h-full object-cover z-[3] rounded-2xl mx-auto'
                />

                <Image 
                  src='/bento-res/ai/1.png'
                  alt='Webflow Development'
                  width={2000}
                  height={2000}
                  className='absolute left-1/3 -translate-x-1/2 top-0 w-[12%] object-cover z-[3] rounded-2xl logo-levitate mx-auto opacity-0 group-hover:opacity-100 transition duration-500 ease-in-out'
                />
                <Image 
                  src='/bento-res/ai/2.png'
                  alt='Webflow Development'
                  width={2000}
                  height={2000}
                  className='absolute left-7/10 -translate-x-1/2 top-4 w-[9%] object-cover z-[3] rounded-2xl logo-levitate mx-auto opacity-0 group-hover:opacity-100 transition duration-500 ease-in-out'
                />
                <Image 
                  src='/bento-res/ai/3.png'
                  alt='Webflow Development'
                  width={2000}
                  height={2000}
                  className='absolute left-3/10 -translate-x-1/2 bottom-0 w-[12%] object-cover z-[3] rounded-2xl logo-levitate mx-auto opacity-0 group-hover:opacity-100 transition duration-500 ease-in-out'
                />
                <Image 
                  src='/bento-res/ai/4.png'
                  alt='Webflow Development'
                  width={2000}
                  height={2000}
                  className='absolute left-7/10 -translate-x-1/2 bottom-4 w-[10%] object-cover z-[3] rounded-2xl logo-levitate mx-auto opacity-0 group-hover:opacity-100 transition duration-500 ease-in-out'
                />
                
                </div>
            <span className='bg-[#6952FB]/20 w-[60%] aspect-square rounded-full z-[4] blur-[80px]'></span>
                <span className='absolute bottom-8 right-6 bg-[#3F9BD4]/50 w-[40%] aspect-square rounded-full z-[4] blur-[80px]'></span>
                <div className='absolute -left-[35%] -bottom-20 w-[150%] h-[70%] bg-[#09090B] blur-[40px] z-6' />
                <div className='content w-full h-full z-10 flex flex-col justify-end'>
                    <h2 className='text-lg font-medium mb-1 z-10 relative'>API-based AI Integrations</h2>
                    <p className='text-xs text-white/70 z-10 relative'>
                    Embed custom AI APIs into your apps or websites for text, image, or speech capabilities.    
                    </p>
                </div>
            </div>

            {/* 4. Leading AI Services Card (Full Width) */}
            <div className='card col-span-1 lg:col-span-3 flex flex-col bg-[#0b0a0f21] justify-between relative min-h-[350px] max-h-[350px] w-full max-w-full p-5 rounded-[20px] border border-solid font-light overflow-hidden transition-all duration-300 ease-in-out border-white/10 z-10 group'>
                
                {/* Responsive Image Row: Adjusted padding and width for mobile */}
                <div className='w-full h-full absolute -top-7 left-0 flex items-center justify-center gap-0 px-2 md:px-10 lg:px-32'>
                  <Image 
                  src='/bento-res/ai/claude.png'
                  alt='Webflow Development'
                  width={1000}
                  height={1000}
                  className='hidden md:block w-12 sm:w-20 md:w-24 lg:w-32 aspect-square object-cover z-[3] rounded-2xl opacity-50 mx-auto group-hover:opacity-100 transition duration-1000 ease-in-out group-hover:scale-100'
                /> 
                <Image 
                  src='/bento-res/ai/grok.png'
                  alt='Webflow Development'
                  width={1000}
                  height={1000}
                  className='w-12 sm:w-20 md:w-24 lg:w-32 aspect-square object-cover z-[3] rounded-2xl opacity-50 mx-auto group-hover:opacity-100 transition duration-1000 ease-in-out group-hover:scale-110'
                /> 
                <Image 
                  src='/bento-res/ai/make.png'
                  alt='Webflow Development'
                  width={1000}
                  height={1000}
                  className='w-12 sm:w-20 md:w-24 lg:w-32 aspect-square object-cover z-[3] rounded-2xl opacity-50 mx-auto group-hover:opacity-100 transition duration-1000 ease-in-out group-hover:scale-120'
                /> 
                <Image 
                  src='/bento-res/ai/n8n.png'
                  alt='Webflow Development'
                  width={1000}
                  height={1000}
                  className='w-12 sm:w-20 md:w-24 lg:w-32 aspect-square object-cover z-[3] rounded-2xl opacity-50 mx-auto group-hover:opacity-100 transition duration-1000 ease-in-out group-hover:scale-130'
                /> 
                <Image 
                  src='/bento-res/ai/zapier.png'
                  alt='Webflow Development'
                  width={1000}
                  height={1000}
                  className='w-12 sm:w-20 md:w-24 lg:w-32 aspect-square object-cover z-[3] rounded-2xl opacity-50 mx-auto group-hover:opacity-100 transition duration-1000 ease-in-out group-hover:scale-120'
                /> 
                <Image 
                  src='/bento-res/ai/gemini.png'
                  alt='Webflow Development'
                  width={1000}
                  height={1000}
                  className='w-12 sm:w-20 md:w-24 lg:w-32 aspect-square object-cover z-[3] rounded-2xl opacity-50 mx-auto group-hover:opacity-100 transition duration-1000 ease-in-out group-hover:scale-110'
                /> 
                <Image 
                  src='/bento-res/ai/openai.png'
                  alt='Webflow Development'
                  width={1000}
                  height={1000}
                  className='hidden md:block w-12 sm:w-20 md:w-24 lg:w-32 aspect-square object-cover z-[3] rounded-2xl opacity-50 mx-auto group-hover:opacity-100 transition duration-1000 ease-in-out group-hover:scale-100'
                /> 
                </div>
            
                <Image 
                  src='/bento-res/ai/texture.svg'
                  alt='Webflow Development'
                  width={1000}
                  height={1000}
                  className='w-full object-cover z-[-1] rounded-2xl opacity-50 mx-auto absolute -top-10 left-0 pointer-events-none select-none'
                />
                <span className='bg-[#6952FB]/10 w-[50%] aspect-square rounded-full z-[4] blur-[80px]'></span>
                <span className='absolute bottom-8 right-6 bg-[#3F9BD4]/10 w-[40%] aspect-square rounded-full z-[4] blur-[80px]'></span>
                
            
                <div className='absolute -left-[35%] -bottom-20 w-[150%] h-[70%] bg-[#09090B] blur-[40px] z-6' />
                <div className='content w-full h-full absolute left-6 bottom-6 z-10 flex flex-col justify-end pr-8'>
                    <h2 className='text-lg font-medium mb-1 z-10 relative'>
                    Integration with Leading AI Services
                    </h2>
                    <p className='text-xs text-white/70 z-10 relative'>
                    Seamlessly connect with top AI platforms like OpenAI, Anthropic, and Google Gemini to enhance your applications.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default AIBento