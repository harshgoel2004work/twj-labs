"use client"

import { ChevronRight, SparkleIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { IconType } from 'react-icons'
import { FaCode, FaPaintBrush, FaRobot, FaSearch, FaShoppingCart, FaUniversalAccess, FaWordpress } from 'react-icons/fa'
import CustomBadge from '../shared/custom-badge'
import { services } from '@/data/services'



export default function WhatWeDoSection() {
  return (
    // Changed px-24 to px-6 md:px-24 for mobile spacing
    <div className='w-full min-h-screen px-6 md:px-24 pt-14 pb-20 font-manrope'>
      <div className='flex flex-col items-center gap-0'>
        <CustomBadge darkMode={true} title="What We Do" />
        {/* Adjusted text size for mobile */}
        <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] max-w-4xl bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/60 pt-2">
          What are we great at?
        </h1>

        <p className="text-center max-w-xl mt-2 mb-5 text-sm md:text-base text-neutral-500">
          Explore our success stories and see how we&apos;ve transformed businesses like yours.
        </p>
      </div>

      <div className='mt-8 w-full z-20'>
        <BentoGrid />
      </div>

      <div className='flex items-center flex-wrap justify-center gap-4 mt-6 z-10'>
        {services[1].servicesList?.map((service) => (
          <Link href={service.url} key={service.id} className='px-4 py-2 rounded-md border border-white/15 bg-[#0b0a0f] flex items-center gap-2  md:w-fit'>
            <service.icon className='text-violet-400/60' size={14} />
            <p className='text-xs font-medium text-white/60'>{service.name}</p>
          </Link>
        ))}

      </div>
    </div>
  )
}


const BentoGrid = () => {
  return (
    // Kept md:grid-cols-7, but defaults to grid-cols-1 on mobile
    <div className='grid grid-cols-1 md:grid-cols-7 gap-4 max-w-7xl mx-auto text-white'>

      <WordpressCard />

      <WebflowCard />

      <AccessibilityCard />

      <CustomDevCard />
      <AIIntegrationCard />


      <WebDesignCard />

      <EcommerceCard />

    </div>

  )
}


const WordpressCard = () => {
  return (
    // Added md:col-span-4 (mobile will be full width)
    <div className='card md:col-span-4 relative min-h-[380px] w-full max-w-full p-[1px] rounded-[20px] font-light overflow-hidden transition-all duration-300 ease-in-out z-[10] group bg-gradient-to-b from-white/10 to-white/5'>
      <div className='relative flex flex-col justify-between w-full h-full p-5 rounded-[19px] overflow-hidden bg-[#09090B]'>

        {/* Adjusted padding for mobile to prevent image squeeze */}
        <div className='group-hover:-translate-y-2 transition duration-[1.5s] absolute left-0 top-0 px-6 pt-10 md:px-16 md:pt-10 group-hover:scale-105 w-full'>
          <Image
            src='/bento-res/wordpress-console.svg'
            alt='Webflow Development'
            width={1000}
            height={1000}
            className='w-full object-cover z-[3] rounded-2xl opacity-90 max-w-2xl mx-auto'
          />
        </div>
        <Image
          src='/bento-res/wordpress-texture.svg'
          alt='Webflow Development'
          width={1000}
          height={1000}
          className='w-full object-cover z-[3] rounded-2xl opacity-90 max-w-2xl mx-auto absolute top-0 left-0 pointer-events-none select-none'
        />
        <span className=' bg-[#6952FB]/10 w-[30%] aspect-square rounded-full z-[4] blur-[80px]'></span>
        <span className='absolute bottom-8 right-6 bg-[#3F9BD4]/10 w-[30%] aspect-square rounded-full z-[4] blur-[80px]'></span>

        <div className='absolute -left-[35%] -bottom-20 w-[150%] h-[70%] bg-[#09090B] blur-[40px] z-6' />

        <div className='content w-full h-full z-[10] flex flex-col justify-end'>
          <h2 className='text-lg font-medium mb-1 z-10 relative'>Wordpress Development</h2>
          <p className='text-xs text-white/70 z-10 relative'>
            Wordpress websites tailored to your business needs
          </p>
        </div>

      </div>
    </div>
  );
};

const WebflowCard = () => {
  return (
    // Added md:col-span-3
    <div className='card md:col-span-3 flex flex-col justify-between relative min-h-[380px] w-full max-w-full p-5 rounded-[20px] border border-solid font-light overflow-hidden transition-all duration-300 ease-in-out bg-[#09090B] border-white/10 z-[10] group'>

      {/* Reduced left padding on mobile (pl-6) vs desktop (md:pl-28) */}
      <div className='-translate-4 group-hover:translate-y-[75%] h-[120%] group-hover:translate-x-[75%] transition ease-in-out duration-[2s] absolute top-0 pl-6 md:pl-28 group-hover:scale-300'>
        <Image
          src='/bento-res/webflow-designer.svg'
          alt='Webflow Development'
          width={1000}
          height={1000}
          className='h-full object-left z-[3] rounded-2xl opacity-90 max-w-2xl mx-auto'
        />
      </div>
      <Image
        src='/bento-res/webflow-texture.svg'
        alt='Webflow Development'
        width={1000}
        height={1000}
        className='w-full object-cover z-[3] rounded-2xl opacity-2 max-w-2xl mx-auto absolute top-0 left-0 pointer-events-none select-none'
      />
      <span className=' bg-[#6952FB]/10 w-[50%] aspect-square rounded-full z-[5] blur-[50px]'></span>
      <span className='absolute bottom-8 right-6 bg-[#3F9BD4]/10 w-[50%] aspect-square rounded-full z-[5] blur-[50px]'></span>
      <div className='absolute -left-[35%] -bottom-20 w-[150%] h-[70%] bg-[#09090B] blur-[40px] z-6' />
      <div className='content w-full h-full z-[10] flex flex-col justify-end'>
        <h2 className='text-lg font-medium mb-1 z-10 relative'>Webflow Development</h2>
        <p className='text-xs text-white/70 z-10 relative'>Custom, responsive sites</p>
      </div>
    </div>
  )
}

const AccessibilityCard = () => {
  return (
    // Added md:col-span-3
    <div className='card md:col-span-3 flex flex-col justify-between relative w-full max-w-full p-5 rounded-[20px] border border-solid font-light overflow-hidden transition-all duration-300 ease-in-out bg-[#09090B] border-white/10 z-[10] group min-h-[300px]'>

      <div className='h-full transition ease-in-out duration-500 absolute top-0 left-0 w-full '>
        <Image
          src='/bento-res/acc-color.png'
          alt='Accessibility Testing & Compliance'
          width={1000}
          height={1000}
          className='absolute w-[60%] -bottom-20 -right-12 object-left z-[3] rounded-2xl opacity-90 max-w-2xl mx-auto group-hover:-translate-x-3 transition-transform duration-1000 ease-in-out group-hover:scale-110'
        />
        <Image
          src='/bento-res/acc-font.png'
          alt='Accessibility Testing & Compliance'
          width={1000}
          height={1000}
          className='absolute w-[55%] top-8 -left-7 object-right z-[3] rounded-2xl opacity-90 max-w-2xl mx-auto group-hover:translate-x-3 transition-transform duration-1000 ease-in-out group-hover:scale-110'
        />
      </div>
      <Image
        src='/bento-res/webflow-texture.svg'
        alt='Webflow Development'
        width={1000}
        height={1000}
        className='w-full object-cover z-[3] rounded-2xl opacity-0 max-w-2xl mx-auto absolute top-0 left-0 pointer-events-none select-none'
      />
      <span className=' bg-[#6952FB]/10 w-[50%] aspect-square rounded-full z-[5] blur-[50px]'></span>
      <span className='absolute bottom-8 right-6 bg-[#3F9BD4]/5 w-[50%] aspect-square rounded-full z-[5] blur-[50px]'></span>
      <div className='absolute -left-[35%] -bottom-20 w-[150%] h-[70%] bg-[#09090B] blur-[40px] z-6' />
      <div className='content w-full h-full z-[10] flex justify-between items-center'>
        <div className='flex flex-col mt-auto'>
          <h2 className='text-lg font-medium mb-1 z-10 relative'>Accessibility Testing & Compliance</h2>
          <p className='text-xs text-white/70 z-10 relative'>
            Ensure your website is accessible to all users
          </p>

        </div>

      </div>
    </div>
  )
}

const AIIntegrationCard = () => {
  return (
    // Added md:col-span-2
    <div className='card md:col-span-2 flex flex-col bg-[#0b0a0f21] justify-between relative min-h-[300px] w-full max-w-full p-5 rounded-[20px] border border-solid font-light overflow-hidden transition-all duration-300 ease-in-out border-white/10 z-[10] group'>

      <div className='left-1/2 top-2/5 -translate-1/2 absolute '>
        <Image
          src='/bento-res/ai/n8n.svg'
          alt='Webflow Development'
          width={1000}
          height={1000}
          className='w-[45%] object-cover z-[3] rounded-2xl opacity-90 mx-auto'
        />

      </div>

      <div className='w-full h-full absolute top-0 left-0 opacity-20 group-hover:opacity-100 transition duration-700'>
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
      <span className=' bg-[#6952FB]/10 w-[50%] aspect-square rounded-full z-[4] blur-[80px]'></span>
      <span className='absolute bottom-8 right-6 bg-[#3F9BD4]/10 w-[40%] aspect-square rounded-full z-[4] blur-[80px]'></span>


      <div className='absolute -left-[35%] -bottom-20 w-[150%] h-[70%] bg-[#09090B] blur-[40px] z-6' />
      <div className='content w-full h-full z-10 flex flex-col justify-end'>
        <h2 className='text-lg font-medium mb-1 z-10 relative'>AI Integration & Automation</h2>
        <p className='text-xs text-white/70 z-10 relative'>
          Leverage AI to streamline your business processes and boost productivity.
        </p>
      </div>
    </div>
  )
}

const CustomDevCard = () => {
  return (
    // Added md:col-span-2
    <Link href={'/custom-software'} className='card md:col-span-2 flex flex-col bg-[#0b0a0f21] justify-between relative min-h-[300px] w-full max-w-full p-5 rounded-[20px] border border-solid font-light overflow-hidden transition-all duration-300 ease-in-out border-white/10 z-[10] group'>

      {/* playground */}
      <div className='transition duration-500 absolute left-0 top-0 px-4 pt-6 w-full h-full'>
        <Image
          src='/bento-res/custom-1.png'
          alt='custom code development'
          width={1000}
          height={1000}
          className='w-[24%] aspect-square z-[3] opacity-100 mx-auto border-2 border-white/5 rounded-full absolute top-2/5 -translate-1/2 left-1/2'
        />
        <Image
          src='/bento-res/custom/c-2.svg'
          alt='custom code development'
          width={1000}
          height={1000}
          className='w-[16%] aspect-square z-[3] opacity-80 mx-auto border-2 border-white/5 rounded-full absolute top-10 left-10 '
        />
        <Image
          src='/bento-res/custom/c-3.svg'
          alt='custom code development'
          width={1000}
          height={1000}
          className='w-[17%] aspect-square z-[3] opacity-90 mx-auto border-2 border-white/5 rounded-full absolute top-14 right-7 '
        />
        <Image
          src='/bento-res/custom/c-3.svg'
          alt='custom code development'
          width={1000}
          height={1000}
          className='w-[14%] aspect-square z-[3] opacity-100 mx-auto border-2 border-white/5 rounded-full absolute bottom-20 right-12 blur-[1px]'
        />
        <Image
          src='/bento-res/custom/c4.svg'
          alt='custom code development'
          width={1000}
          height={1000}
          className='w-[14%] aspect-square z-[3] opacity-90 mx-auto border-2 border-white/5 rounded-full absolute bottom-17 left-1/4 blur-[1px]'
        />
        <Image
          src='/bento-res/custom/c5.svg'
          alt='custom code development'
          width={1000}
          height={1000}
          className='w-[14%] aspect-square z-[3] opacity-80 mx-auto border-2 border-white/5 rounded-full absolute -top-4 left-1/2 -translate-x-1/2 blur-[1px]'
        />

        {/* LINES */}
        <span
          className="absolute top-[33%] left-[49%] w-[1px] h-[20%] translate-y-[-24%] translate-x-[-34%] bg-white/5 opacity-30 origin-top rotate-[185deg] overflow-hidden"
        >
          <div className='w-full h-[10%] absolute top-0 left-0 bg-violet-500/0 code-box group-hover:bg-violet-500/100 transition-all duration-500'>

          </div>
        </span>

        <span
          className="absolute top-[38%] left-[40%] w-[1px] h-[17%] translate-y-[-24%] translate-x-[-34%] bg-white/5 opacity-30 origin-top rotate-[123deg]"
        ><div className='w-full h-[10%] absolute top-0 left-0 bg-violet-500/0 code-box group-hover:bg-violet-500/100 transition-all duration-500'>

          </div></span>

        <span
          className="absolute top-[38%] right-[40%] w-[1px] h-[17%] translate-y-[-24%] translate-x-[-34%] bg-white/5 opacity-30 origin-top rotate-[-110deg]"
        ><div className='w-full h-[10%] absolute top-0 left-0 bg-violet-500/0 code-box group-hover:bg-violet-500/100 transition-all duration-500'>


          </div></span>

        <span
          className="absolute bottom-[30%] left-[60%] w-[1px] h-[23%] bg-white/5 opacity-30 origin-top rotate-[315deg]"
        ><div className='w-full h-[10%] absolute top-0 left-0 bg-violet-500/0 code-box group-hover:bg-violet-500/100 transition-all duration-500'>

          </div></span>

        <span
          className="absolute bottom-[30%] left-[42%] w-[1px] h-[23%] bg-white/5 opacity-30 origin-top rotate-[-335deg]"
        ><div className='w-full h-[10%] absolute top-0 left-0 bg-violet-500/0 code-box group-hover:bg-violet-500/100 transition-all duration-500'>

          </div></span>

      </div>

      <Image
        src='/bento-res/crypto.png'
        alt='Webflow Development'
        width={1000}
        height={1000}
        className='w-full object-cover z-[-1] rounded-2xl opacity-5 max-w-2xl mx-auto absolute top-0 left-0 pointer-events-none select-none'
      />
      <span className=' bg-[#6952FB]/10 transition duration-500 group-hover:bg-[#6952FB]/50 w-[50%] aspect-square rounded-full z-[2] blur-[80px]'></span>
      <span className='absolute bottom-8 right-6 bg-[#3F9BD4]/10 transition duration-500 group-hover:bg-[#3F9BD4]/50 w-[40%] aspect-square rounded-full z-[2] blur-[80px]'></span>


      <div className='absolute -left-[35%] -bottom-20 w-[150%] h-[70%] bg-[#09090B] blur-[40px] z-6' />
      <div className='content w-full h-full z-10 flex flex-col justify-end'>
        <h2 className='text-lg font-medium mb-1 z-10 relative'>Custom Sofware Development</h2>
        <p className='text-xs text-white/70 z-10 relative'>
          Wether it is ERP systems or websites built on tech stack, we’ve got you covered.
        </p>
      </div>
    </Link>
  )
}

const EcommerceCard = () => {
  return (
    // Added md:col-span-5
    <Link href='/ecommerce' className='card md:col-span-5 relative min-h-[380px] w-full max-w-full p-[1px] rounded-[20px] font-light overflow-hidden transition-all duration-300 ease-in-out z-[10] group bg-gradient-to-b from-white/10 to-white/5'>
      <div className='relative flex flex-col justify-between w-full h-full p-5 rounded-[19px] overflow-hidden bg-[#09090B]'>

        <div className='-translate-4 group-hover:translate-y-[95%] h-[120%] group-hover:translate-x-[90%] transition ease-in-out duration-[2s] absolute top-20 left-[40%] group-hover:scale-300'>
          <Image
            src='/bento-res/shopify.svg'
            alt='Webflow Development'
            width={1000}
            height={1000}
            className='h-full object-left z-[3] rounded-2xl opacity-90 max-w-2xl mx-auto rounded-xl overflow-hidden'
          />
        </div>
        <div className='-translate-4 transition ease-in-out duration-[2s] absolute -left-4 -top-4 group-hover:-translate-y-[60%] group-hover:-translate-x-[60%] group-hover:scale-250'>
          <Image
            src='/bento-res/shopify-ana.svg'
            alt='Webflow Development'
            width={1000}
            height={1000}
            className=' object-left w-64 z-[3] rounded-2xl opacity-90 max-w-2xl mx-auto rounded-xl overflow-hidden'
          />
        </div>
        <Image
          src='/bento-res/wordpress-texture.svg'
          alt='Webflow Development'
          width={1000}
          height={1000}
          className='w-full object-cover z-[3] rounded-2xl opacity-90 max-w-2xl mx-auto absolute top-0 left-0 pointer-events-none select-none'
        />
        <span className=' bg-[#6952FB]/10 w-[30%] aspect-square rounded-full z-[4] blur-[80px]'></span>
        <span className='absolute bottom-8 right-6 bg-[#3F9BD4]/10 w-[30%] aspect-square rounded-full z-[4] blur-[80px]'></span>

        <div className='absolute -left-[35%] -bottom-20 w-[150%] h-[70%] bg-[#09090B] blur-[40px] z-6' />

        <div className='content w-full h-full z-[10] flex flex-col justify-end'>
          <h2 className='text-lg font-medium mb-1 z-10 relative'>Ecommerce Development</h2>
          <p className='text-xs text-white/70 z-10 relative'>
            Building scalable and user-friendly online stores tailored to your brand
          </p>
        </div>

      </div>
    </Link>
  );
};

const WebDesignCard = () => {
  return (
    // Added md:col-span-2
    <Link href='/web-design' className='card group md:col-span-2 flex flex-col bg-[#0b0a0f21] justify-between relative w-full max-w-full p-5 rounded-[20px] border border-solid font-light overflow-hidden transition-all duration-300 ease-in-out border-white/10 z-[10] min-h-[300px]'>

      <div className="absolute left-1/2 top-1/2 w-[40%] -translate-x-1/2 -translate-y-5/7 opacity-50 z-2 group-hover:opacity-80 transition-all duration-500 ease-in-out">
        <svg
          width="400"
          height="600"
          viewBox="0 0 400 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="
      w-full h-full 
      transition-all duration-500 ease-in-out
      [&_path]:fill-white
      [&_path]:transition-all [&_path]:duration-500
      group-hover:[&_path:nth-child(1)]:fill-[#24CB71]
      group-hover:[&_path:nth-child(2)]:fill-[#FF7237]
      group-hover:[&_path:nth-child(3)]:fill-[#00B6FF]
      group-hover:[&_path:nth-child(4)]:fill-[#FF3737]
      group-hover:[&_path:nth-child(5)]:fill-[#874FFF]
    "
        >
          <path d="M0 500C0 444.772 44.772 400 100 400H200V500C200 555.228 155.228 600 100 600C44.772 600 0 555.228 0 500Z" />
          <path d="M200 0V200H300C355.228 200 400 155.228 400 100C400 44.772 355.228 0 300 0H200Z" />
          <path d="M299.167 400C354.395 400 399.167 355.228 399.167 300C399.167 244.772 354.395 200 299.167 200C243.939 200 199.167 244.772 199.167 300C199.167 355.228 243.939 400 299.167 400Z" />
          <path d="M0 100C0 155.228 44.772 200 100 200H200V0H100C44.772 0 0 44.772 0 100Z" />
          <path d="M0 300C0 355.228 44.772 400 100 400H200V200H100C44.772 200 0 244.772 0 300Z" />
        </svg>

        <span className='bg-[#24CB71] blur-[50px] z-1 w-16 aspect-square rounded-full absolute bottom-0 opacity-10 group-hover:opacity-100 transition duration-700'></span>
        <span className='bg-[#FF7237] blur-[50px] z-1 w-16 aspect-square rounded-full absolute top-0 right-0 opacity-10 group-hover:opacity-100 transition duration-700'></span>
        <span className='bg-[#00B6FF] blur-[50px] z-1 w-16 aspect-square rounded-full absolute top-1/2 right-0 -translate-y-1/2 opacity-10 group-hover:opacity-100 transition duration-700'></span>
        <span className='bg-[#FF3737] blur-[50px] z-1 w-16 aspect-square rounded-full absolute top-0 left-0 opacity-10 group-hover:opacity-100 transition duration-700'></span>
        <span className='bg-[#874FFF] blur-[50px] z-1 w-16 aspect-square rounded-full absolute top-1/2 left-0 -translate-y-1/2 opacity-10 group-hover:opacity-100 transition duration-700'></span>
      </div>

      <span className='bg-[#6952FB]/10 w-[50%] aspect-square rounded-full z-[4] blur-[80px]'></span>
      <span className='absolute bottom-8 right-6 bg-[#3F9BD4]/10 w-[40%] aspect-square rounded-full z-[4] blur-[80px]'></span>

      <div className='absolute -left-[35%] -bottom-20 w-[150%] h-[70%] bg-[#09090B] blur-[40px] z-6' />
      <div className='content w-full h-full z-10 flex flex-col justify-end'>
        <h2 className='text-lg font-medium mb-1 z-10 relative'>Web Design</h2>
        <p className='text-xs text-white/70 z-10 relative'>
          Designing visually stunning and user-friendly websites
        </p>
      </div>
    </Link>

  )
}