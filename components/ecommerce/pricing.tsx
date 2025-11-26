import { pricingPlan } from '@/data/pricing-plans'
import { CheckIcon, SparkleIcon, XIcon } from 'lucide-react'
import React from 'react'

const PricingForEcommerce = () => {
    const ecommercePricing = pricingPlan.find(plan => plan.title === 'Ecommerce')
  return (
    <div className='w-full min-h-screen px-24 pt-20 pb-28 font-manrope z-0 relative '>
      <div className='flex flex-col items-center gap-2'>
        <p className='text-xs flex items-center gap-1.5 rounded-full px-4 py-1.5 bg-black/40 backdrop-blur-md  text-white/70 z-10'><SparkleIcon size={15} fill='#6c4efc' stroke='none'/>Pricing</p>
        <h1 className='text-[44px] font-semibold tracking-wide bg-clip-text text-transparent bg-linear-to-l from-[#ffffff] to-[#a299b2] text-center leading-tight max-w-3xl z-10'>
            Let&apos;s talk money
        </h1>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14 max-w-6xl mx-auto'>
        {ecommercePricing?.plans.map((plan, index) => (
            <div key={plan.id} className='card-glow  w-full rounded-lg p-2 flex flex-col bg-[#100e14]/30 backdrop-blur-md  border  transition-all duration-300 ease-in-out relative overflow-hidden border-white/5 z-[0] pb-8'>
                {/* dotted background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.03)_0.5px,transparent_1px)] bg-[length:10px_10px]  z-0" />
                <div className='w-full h-40 rounded-lg bg-linear-to-tr from-[#090909] via-[#151515] to-[#151119] flex items-end p-5    '>
                    <h2 className='text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-white to-[#a299b2]'>
                        {plan.name}
                    </h2>
                </div>

                <div className='px-6 py-7 z-[2] text-white space-y-9'>
                    <p>{plan.description}</p>
                    <button className='px-4 py-2 bg-[#5449e8] shadow-[inset_0_9px_15px_rgba(0,0,0,0.6)] shadow-violet-400 transition duration-500 hover:shadow-[inset_0_-8px_15px_rgba(0,0,0,0.6)] hover:shadow-violet-400 text-white rounded-md w-full font-medium text-sm cursor-pointer'>
                        Contact Sales
                    </button>
                    <hr className='opacity-10'/>

                    <div>
                        {plan.everythingIncludedPrev && (
                        <p className='text-xs text-white/40 mb-4'>Includes everything from previous plans plus:</p>
                        )}
                        <ul className='flex flex-col gap-3'>
                        {plan.features.map((feature) => (
                            <li key={feature} className='text-xs font-medium text-white/70 flex items-center gap-1.5'>
                            <div className='p-1 rounded-full bg-[#5449e810] text-[#5449e8]'>
                                <CheckIcon size={12}/>
                            </div>
                            {feature}
                            </li>
                        ))}
                        {plan.featuresNotIncluded?.map((feature) => (
                            <li key={feature} className='text-xs font-medium text-white/40 flex items-center gap-1.5'>
                            <div className='p-1 rounded-full bg-white/10 text-white/40'>
                                <XIcon size={12}/>
                            </div>
                            {feature}
                            </li>
                        ))}
                        </ul>
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default PricingForEcommerce