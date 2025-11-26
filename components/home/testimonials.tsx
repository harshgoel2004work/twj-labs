import { cn } from '@/lib/utils'
import { Quote, Star } from 'lucide-react' // Removed SparkleIcon as it wasn't used
import React from 'react'
import CustomBadge from '../shared/custom-badge'

const TestimonialsSection = ({ darkMode = false }: { darkMode: boolean }) => {
  return (
    <section className={cn(
      // ADDED: -mt-[1px] to fix the sub-pixel gap line on mobile
      'w-full py-24 px-6 relative flex flex-col items-center justify-center -mt-[1px]',
      darkMode ? 'bg-[#060609] text-white' : 'bg-[#F4F5F9] text-black'
    )}>
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full pointer-events-none">
         <div className={cn("absolute inset-0 rounded-full blur-[100px] opacity-10", 
            darkMode ? "bg-violet-600" : "bg-violet-300")} 
         />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        
        {/* Badge */}
       <CustomBadge darkMode={darkMode} title="Client Feedback" />

        {/* Large Quote Icon Decoration */}
        <Quote className={cn("absolute top-0 left-0 w-12 h-12 -translate-x-full -translate-y-1/2 opacity-10 hidden md:block", 
            darkMode ? "text-white" : "text-black")} 
        />

        {/* Main Quote */}
        <h2 className="text-2xl md:text-3xl mt-6 lg:text-4xl font-semibold tracking-tight leading-[1.3] mb-10">
          &quot;The Walking Jumbo has been{' '}
          <span className={cn("text-transparent bg-clip-text bg-gradient-to-r", 
            darkMode ? "from-violet-400 to-indigo-400" : "from-violet-500 to-indigo-500")}>
            invaluable to me
          </span>{' '}
          for what we do in our office. I highly{' '}
          <span className={cn("text-transparent bg-clip-text bg-gradient-to-r", 
            darkMode ? "from-violet-400 to-indigo-400" : "from-violet-500 to-indigo-500")}>
            recommend it to anyone
          </span>{' '}
          looking for speed without compromising quality.&quot;
        </h2>

        {/* Author & Trust Block */}
        <div className="flex flex-col items-center gap-4">
            
            {/* Stars */}
            <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                ))}
            </div>

            <div className="flex items-center gap-4 mt-2">
                {/* Avatar Placeholder */}
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-tr from-violet-500 to-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    MG
                </div>
                
                <div className="text-left">
                    <p className="font-semibold text-lg leading-none mb-1">Manish Goel</p>
                    <p className={cn("text-sm", darkMode ? "text-slate-400" : "text-slate-500")}>
                        Director @ Netedge Technology
                    </p>
                </div>
            </div>
        </div>

      </div>
    </section>
  )
}

export default TestimonialsSection