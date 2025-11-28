import { SparkleIcon } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const CustomBadge = ({darkMode=true, title}:{darkMode?: boolean, title: string}) => {
  return (
    <>
    {darkMode ? (
 <div className={cn(
            "inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-medium uppercase tracking-wider bg-white/5 border-white/10 text-indigo-300 z-10"
           
        )}>
          <SparkleIcon size={12} className="fill-current" />
          {title}
        </div>
    ):(
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 bg-white/60 border border-indigo-100 backdrop-blur-md text-indigo-600 text-xs font-semibold uppercase tracking-wider shadow-sm z-10">
                  <SparkleIcon size={14} className="fill-indigo-600" />
                    {title}
                </div>
    )}
    </>
  )
}

export default CustomBadge