import { SparkleIcon } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const CustomBadge = ({darkMode=true, title}:{darkMode?: boolean, title: string}) => {
  return (
    <>
    {darkMode ? (
 <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
          <span className="text-[12px] font-medium text-white/70 tracking-wide">{title}</span>
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