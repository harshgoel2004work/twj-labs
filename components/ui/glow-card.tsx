'use client'

import { IconType } from 'react-icons'
import React, { useRef, useState } from 'react'
import { cn } from '@/lib/utils' // Assuming you have a cn utility, or standard className string
import { iconMap } from '../icon-map'

export default function GlowingCard({
  item,
  darkMode = false,
}: {
  item: { title: string; description: string; icon: string }
  darkMode?: boolean
}) {
  const divRef = useRef<HTMLDivElement>(null)
  const [, setIsFocused] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const IconComponent = iconMap[item.icon] || null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return

    const div = divRef.current
    const rect = div.getBoundingClientRect()

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleFocus = () => {
    setIsFocused(true)
    setOpacity(1)
  }

  const handleBlur = () => {
    setIsFocused(false)
    setOpacity(0)
  }

  const handleMouseEnter = () => {
    setOpacity(1)
  }

  const handleMouseLeave = () => {
    setOpacity(0)
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'relative group h-full w-full rounded-2xl border overflow-hidden transition-all duration-300',
        darkMode 
          ? 'bg-[#0c0c12] border-white/10 hover:border-white/20' 
          : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md'
      )}
    >
      {/* 1. The Moving Spotlight Gradient */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${
            darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(99,102,241,0.15)'
          }, transparent 40%)`,
        }}
      />

      {/* 2. Inner Content Wrapper (for z-index layering) */}
      <div className="relative h-full flex flex-col p-8 z-10">
        
        {/* Dot Pattern Background (Subtle) */}
        <div className={cn(
            "absolute inset-0 z-0 opacity-[0.4] pointer-events-none",
            darkMode 
                ? "bg-[radial-gradient(#ffffff33_1px,transparent_1px)] bg-size-[20px_20px]" 
                : "bg-[radial-gradient(#00000033_1px,transparent_1px)] bg-size-[20px_20px]"
        )} />

        {/* Header: Icon */}
        <div className={cn(
            "mb-6 w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-110",
            darkMode 
                ? "bg-white/5 border-white/10 group-hover:bg-white/10" 
                : "bg-indigo-50 border-indigo-100 group-hover:bg-indigo-100"
        )}>
           {IconComponent && <IconComponent
            size={22}
            className={cn(
                "transition-colors duration-300",
                darkMode 
                    ? "text-indigo-300 group-hover:text-white" 
                    : "text-indigo-600 group-hover:text-indigo-700"
            )}
          />}
        </div>

        {/* Content: Title & Desc */}
        <div className="grow">
            <h3 className={cn(
                "text-xl font-bold mb-3 transition-colors duration-300",
                darkMode 
                    ? "text-white group-hover:text-indigo-200" 
                    : "text-slate-900 group-hover:text-indigo-700"
            )}>
                {item.title}
            </h3>
            
            <p className={cn(
                "text-sm leading-relaxed",
                darkMode ? "text-slate-400" : "text-slate-500"
            )}>
                {item.description}
            </p>
        </div>

        {/* Footer: Subtle Arrow or decoration */}
        <div className={cn(
            "mt-6 pt-6 border-t flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0",
            darkMode ? "border-white/10" : "border-slate-100"
        )}>
             
        </div>
      </div>
    </div>
  )
}