"use client"

import { cn } from '@/lib/utils'
import { SparkleIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react' // Import React with its hooks
import { IconType } from 'react-icons'
import {
  FaSearch,
  FaPencilRuler,
  FaCode,
  FaRocket,
} from "react-icons/fa";

type ProcessType = {
  step: number
  title: string
  description: string
  image: string
  icon: IconType
}

const process: ProcessType[] = [
  {
    step: 1,
    title: "Discovery & Planning",
    description:
      "Understanding your business goals, target audience, and unique requirements to create a tailored e-commerce solution.",
    image: "/our-process/ecommerce/1.png",
    icon: FaSearch,
  },
  {
    step: 2,
    title: "Design & Prototyping",
    description:
      "Crafting visually appealing and user-friendly designs that reflect your brand identity and enhance the shopping experience.",
    image: "/our-process/ecommerce/2.png",
    icon: FaPencilRuler,
  },
  {
    step: 3,
    title: "Development & Integration",
    description:
      "Building a robust e-commerce platform with seamless integration of payment gateways, inventory management, and other essential features.",
    image: "/our-process/ecommerce/3.png",
    icon: FaCode,
  },
  {
    step: 4,
    title: "Testing & Launch",
    description:
      "Conducting thorough testing to ensure functionality, performance, and security before launching your online store to the world.",
    image: "/our-process/ecommerce/4.png",
    icon: FaRocket,
  },
];

const OurProcessForEcommerce = () => {
  const [currentStep, setCurrentStep] = React.useState<number>(1);
  
  // Create a ref to store an array of DOM elements (for each step)
  const stepRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  // Find the process item that matches the currentStep
  // Use useMemo to avoid recalculating on every render unless currentStep changes
  const activeProcessStep = React.useMemo(() => {
    return process.find((p) => p.step === currentStep) || process[0];
  }, [currentStep]);

  // Set up the IntersectionObserver
  React.useEffect(() => {
    const observerOptions = {
      root: null, // Observe intersections relative to the viewport
      // This margin creates a horizontal "line" at 50% viewport height
      // Items are "intersecting" only when they cross this center line
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0, // Trigger as soon as any part of the element crosses the margin
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        // When an element is intersecting (crossing the center line)
        if (entry.isIntersecting) {
          // Get the step number from the data attribute
          const step = parseInt(entry.target.getAttribute('data-step') || '1', 10);
          setCurrentStep(step);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all the step elements stored in our ref array
    const refs = stepRefs.current;
    refs.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    // Cleanup function to unobserve all elements when the component unmounts
    return () => {
      refs.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className='w-full px-24 font-manrope py-20 pb-24 flex flex-col gap-4 items-center bg-[#e8e8ff] text-black'>
        <div className='flex flex-col items-center gap-2'>
            <p className='text-xs flex items-center gap-1.5 rounded-full px-4 py-1.5  backdrop-blur-md  text-black/70 z-10'><SparkleIcon size={15} fill='#6c4efc' stroke='none'/>Our Process</p>
            <h1 className='text-[44px] font-semibold tracking-wide bg-clip-text text-transparent bg-radial from-[#000000] to-[#3e374b] text-center leading-tight max-w-3xl z-10'>
                Our E-commerce Development Process
            </h1>
          </div>

      <div className='grid grid-cols-1 md:grid-cols-5 gap-12 mt-12'>
        <div className='image w-full rounded-lg overflow-hidden aspect-16/10 bg-white col-span-3 sticky top-24 h-max'>
          {/* Make the Image dynamic based on activeProcessStep */}
          <Image 
            src={activeProcessStep.image} 
            alt={activeProcessStep.title} 
            width={1000} 
            height={1000}
            // Add a key to help React trigger transitions or re-renders
            key={activeProcessStep.image}
            className='transition-opacity duration-300' 
          />
        </div>
        <div className='col-span-2'>
          {process.map((item, index) => (
            <div 
              key={item.step} 
              className='flex gap-12'
              // Add a data-step attribute to be read by the observer
              data-step={item.step}
              // Use a callback ref to add the element to our ref array
              ref={(el) => {stepRefs.current[index] = el}}
            >
              <div className='flex flex-col items-center'>
                <div 
                  className={cn(
                    'bg-[#654be9] text-[#f2f0ff] rounded-full p-2 transition-all duration-300', 
                    currentStep === item.step 
                      ? 'shadow-lg shadow-[#654be9]/30 scale-110' 
                      : 'opacity-70 cursor-pointer bg-violet-300 text-[#654be9]'
                  )}
                  // Add onClick to allow manual step changing
                  onClick={() => setCurrentStep(item.step)}
                >
                  <item.icon size={16} className=''/>
                </div>
                <span className={cn(
                  ' border-r border-[#654be9] h-52 border-dotted transition-opacity', 
                  {'opacity-0': item.step === process.length}
                )}/>
              </div>

              <div 
                className={cn(
                  'border rounded-lg border-black/10 p-4.5 bg-[#fcf9ff] mb-5 transition-all duration-300', 
                  currentStep === item.step 
                    ? 'shadow-lg shadow-[#654be9]/20' 
                    : 'opacity-70 cursor-pointer'
                )}
                // Add onClick to allow manual step changing
                onClick={() => setCurrentStep(item.step)}
              >
                <p className='font-semibold text-xs text-[#654be9]'>STEP-0{item.step}</p>
                <h1 className='text-lg font-bold mt-1'>{item.title}</h1>
                <p className='text-sm font-medium opacity-70 mt-1'>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OurProcessForEcommerce