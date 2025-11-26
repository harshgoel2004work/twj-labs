import { OurWorkType } from '@/data/work-sample'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const OurWorkCardSmall = ({work}:{work:OurWorkType}) => {
  return (
    <div className='bg-[#0b090d] border border-white/5 rounded-lg p-1 flex space-x-5 '>
        <div className='w-[40%] rounded-xl overflow-hidden oj'>
            <Image src={work.heroImage} alt={work.companyName} width={1000} height={1000} className='h-full w-full object-cover' />
        </div>
        <div className='w-[60%]  flex flex-col py-3 pr-4 pl-1'>
            <h3 className='text-white font-semibold mb-2'>{work.companyName}</h3>
            <p className='text-gray-400 text-sm line-clamp-2'>{work.description}</p>
            <Link href={`/work/${work.id}`} className='text-sm text-violet-300 inline-block mt-2'>View Case Study</Link>
        </div>
        
    </div>
  )
}

export default OurWorkCardSmall