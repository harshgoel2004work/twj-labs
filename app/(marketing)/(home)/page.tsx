
import CurvedLoop from "@/components/CurvedLoop";
import HeroSection from "@/components/home/hero";
import TestimonialsSection from "@/components/home/testimonials";
import ToolsWeUseSection from "@/components/home/tools";
import TheTWJDifference from "@/components/home/twj-difference";
import WhatWeDoSection from "@/components/home/what-we-do";
import FooterWithCTA from "@/components/layout/footer-with-cta";
import Navbar from "@/components/layout/navbar";
import PricingHero from "@/components/pricing/pricing-section-other";
import CaseStudiesSection from "@/components/shared/case-studies";
import FaqsSection from "@/components/shared/faqs";

export default function Home() {
  return (
    <div className="bg-[#060609] text-white w-full min-h-screen font-manrope ">

      <HeroSection />

      

      <WhatWeDoSection />

      <div className="pb-16 -translate-y-12">
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

      {/* <PricingHero /> */}

      <FaqsSection darkMode={true}/>

      
    </div>
  );
}
