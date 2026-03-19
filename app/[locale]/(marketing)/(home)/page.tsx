"use client"
import CurvedLoop from "@/components/CurvedLoop";
import AboutSection from "@/components/home/about-us-section";
import FeaturesSection from "@/components/home/features-1";
import Features2Section from "@/components/home/features-2";
import HeroSection from "@/components/home/hero";
import HowWeWorkSection from "@/components/home/how-we-work";
import ResultsSection from "@/components/home/results-section";
import ServicesSection from "@/components/home/services-section";
import TheTWJDifference from "@/components/home/twj-difference";
import MagicRings from "@/components/MagicRings";

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
    <div className="bg-[#050508] text-white w-full min-h-screen font-manrope relative">

      {/* Conditionally render Loading. 
          The 'md:hidden' class inside Loading.tsx handles the visual hiding on desktop 
          immediately to prevent FOUC (Flash of Unstyled Content) 
      */}
      {/* {showLoading && <Loading onComplete={handleLoadingComplete} />} */}

      <HeroSection />
      <AboutSection />
      <div className="absolute left-0 w-[99.5vw] h-screen overflow-x-hidden top-[150vh]">
        <MagicRings
          color="#441eae"
          colorTwo="#a48bea"
          ringCount={7}
          speed={0}
          attenuation={10}
          lineThickness={2}
          baseRadius={0.4}
          radiusStep={0.1}
          scaleRate={0.1}
          opacity={1}
          blur={0}
          noiseAmount={0.1}
          rotation={0}
          ringGap={1.5}
          fadeIn={0.7}
          fadeOut={0.5}
          followMouse={false}
          mouseInfluence={0}
          hoverScale={1}
          parallax={0.01}
          clickBurst={false}
        />
      </div>
      <FeaturesSection />
      <ResultsSection />
      <HowWeWorkSection />

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

      <ServicesSection />
      <Features2Section />

      {/* <WhatWeDoSection /> */}



      <TheTWJDifference />

      <CaseStudiesSection darkMode={true} />

      {/* <TestimonialsSection darkMode={false}/> */}

      <PricingHero />

      <FaqsSection darkMode={true} />

    </div>
  );
}