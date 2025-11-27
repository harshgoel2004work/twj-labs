"use client"
import CurvedLoop from "@/components/CurvedLoop";
import HeroSection from "@/components/home/hero";
import TestimonialsSection from "@/components/home/testimonials";
import TheTWJDifference from "@/components/home/twj-difference";

import PricingHero from "@/components/pricing/pricing-section-other";
import CaseStudiesSection from "@/components/shared/case-studies";
import FaqsSection from "@/components/shared/faqs";
import dynamic from "next/dynamic";


const WhatWeDoSection = dynamic(() => import('@/components/home/what-we-do'), {
  // This creates a placeholder of the exact same height (approx) 
  // to prevents layout shift (CLS) while it loads.
  loading: () => <div className="w-full min-h-screen bg-[#060609]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="h-96 bg-neutral-900 animate-pulse rounded-lg"></div>
    </div>
  </div>,
})

export default function Home() {
  // const [showLoading, setShowLoading] = useState(() => {
  //   // Guard for environments where window/sessionStorage may be unavailable
  //   if (typeof window === "undefined" || typeof sessionStorage === "undefined") {
  //     return false;
  //   }
  //   // 1. Check if we've already shown the splash this session
  //   const hasSeenSplash = sessionStorage.getItem("splash_shown");

  //   // 2. Check if device is desktop (wider than 768px)
  //   const isDesktop = window.innerWidth >= 768;

  //   // Show loading only when not desktop and not already shown this session
  //   return !(hasSeenSplash || isDesktop);
  // });

  // const handleLoadingComplete = () => {
  //   // Unmount the component
  //   setShowLoading(false);
  //   // Mark as shown for this session
  //   sessionStorage.setItem("splash_shown", "true");
  // };

  return (
    <div className="bg-[#060609] text-white w-full min-h-screen font-manrope">
      
      {/* Conditionally render Loading. 
          The 'md:hidden' class inside Loading.tsx handles the visual hiding on desktop 
          immediately to prevent FOUC (Flash of Unstyled Content) 
      */}
      {/* {showLoading && <Loading onComplete={handleLoadingComplete} />} */}

      <HeroSection />

      <WhatWeDoSection />

      <div className="pb-16 md:-translate-y-12">
        <CurvedLoop 
        marqueeText="Think ✦  Grow ✦ Imagine ✦ Build ✦"
        speed={0.6}
        curveAmount={300}
        direction="right"
        interactive={true}
        className="custom-text-style opacity-5"
        />
      </div>

      <TheTWJDifference />

      <CaseStudiesSection darkMode={false}/>
      
      <TestimonialsSection darkMode={false}/>

      <PricingHero />

      <FaqsSection darkMode={true}/>

    </div>
  );
}