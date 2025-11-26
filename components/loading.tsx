"use client"

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SparkleIcon } from 'lucide-react'

interface LoadingProps {
  onComplete?: () => void;
}

const Loading = ({ onComplete }: LoadingProps) => {
  const [progress, setProgress] = useState(0)
  const [loadingComplete, setLoadingComplete] = useState(false)

  // Simulate loading progress
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        // Randomize the speed slightly for a more "real" feel
        const diff = Math.random() * 30
        const newProgress = Math.min(prev + diff, 100)
        
        if (newProgress === 100) {
          clearInterval(timer)
          // Wait a bit at 100% before triggering the exit state
          setTimeout(() => setLoadingComplete(true), 500) 
        }
        return newProgress
      })
    }, 150)

    return () => clearInterval(timer)
  }, [])

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!loadingComplete && (
        <motion.div
          // Added md:hidden to ensure it never flashes on desktop even before JS runs
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] text-white font-manrope md:hidden"
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%", 
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } // Custom bezier for smooth "curtain up" effect
          }}
        >
          {/* Background Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-600/20 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-md px-6">
            
            {/* Logo / Icon */}
            <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="p-3 bg-white/5 border border-white/10 rounded-xl"
            >
                <SparkleIcon className="text-violet-400 w-6 h-6 animate-pulse" />
            </motion.div>

            {/* Progress Percentage */}
            <div className="flex flex-col items-center">
                <h1 className="text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
                {Math.floor(progress)}%
                </h1>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden relative">
              <motion.div 
                className="h-full bg-violet-500 rounded-full box-shadow-lg shadow-violet-500/50"
                style={{ width: `${progress}%` }}
                layoutId="progress-bar"
              />
            </div>

            {/* Mobile Experience Notice */}
            <div className="mt-8 text-center animate-fade-in-up">
                <p className="text-xs text-neutral-500 uppercase tracking-widest font-semibold mb-1">
                    Experience Notice
                </p>
                <p className="text-sm text-neutral-400">
                    For the best immersive experience,<br/> please view on a desktop device.
                </p>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Loading