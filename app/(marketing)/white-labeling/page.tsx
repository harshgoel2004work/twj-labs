import HeroSection from "@/components/home/hero";
import TheTWJDifference from "@/components/home/twj-difference";
import CaseStudiesSection from "@/components/shared/case-studies";
import TestimonialsSection from "@/components/home/testimonials";
import FaqsSection from "@/components/shared/faqs";
import { Metadata } from "next";
import { ShieldCheck, Zap, BarChart3, Users2, Globe, Code2, Paintbrush, Search } from "lucide-react";
import CurvedLoop from "@/components/CurvedLoop";

export const metadata: Metadata = {
  title: "White Label Solutions - Scale Your Agency with TWJ",
  description: "Premium white-label development, design, and SEO services for agencies. Scale your capacity without increasing overhead.",
};

const benefits = [
  {
    title: "Instant Scalability",
    description: "Expand your service offerings and handle larger projects without hiring new full-time staff.",
    icon: Zap,
    color: "text-yellow-500",
  },
  {
    title: "Expert Execution",
    description: "Deliver high-end solutions backed by our team of specialized developers and designers.",
    icon: ShieldCheck,
    color: "text-blue-500",
  },
  {
    title: "Silent Partnership",
    description: "We work behind the scenes. Your clients only see your brand and high-quality results.",
    icon: Users2,
    color: "text-purple-500",
  },
  {
    title: "Higher Margins",
    description: "Optimize your costs and increase profitability by leveraging our efficient production workflows.",
    icon: BarChart3,
    color: "text-emerald-500",
  },
];

const whiteLabelServices = [
  {
    title: "White Label Development",
    description: "React, Next.js, Webflow, and WordPress development under your brand.",
    icon: Code2,
  },
  {
    title: "White Label Design",
    description: "Premium UI/UX and graphic design that matches your agency's standards.",
    icon: Paintbrush,
  },
  {
    title: "White Label SEO",
    description: "Comprehensive SEO audits, on-page optimization, and reporting.",
    icon: Search,
  },
  {
    title: "White Label AI Solutions",
    description: "Custom AI chatbots and automation tools for your enterprise clients.",
    icon: Globe,
  },
];

export default function WhiteLabelingPage() {
  return (
    <div className="bg-[#060609] text-white w-full min-h-screen font-manrope">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-widest text-[#5449e8] mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5449e8]"></span>
            </span>
            Agency Partnership
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/60">
            Scale Your Agency with <span className="text-[#5449e8]">White Labeling</span>
          </h1>
          
          <p className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Deliver premium digital solutions to your clients under your own brand. We handle the execution, you take the credit.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <button className="px-8 py-4 bg-[#5449e8] text-white rounded-xl font-bold text-lg hover:bg-opacity-90 transition-all">
                Become a Partner
             </button>
             <button className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-xl font-bold text-lg hover:bg-white/10 transition-all">
                Learn our Process
             </button>
          </div>
        </div>

        {/* Background Ambience */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[#5449e8]/10 blur-[120px] rounded-full -z-10 opacity-30"></div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Why Partner with TWJ?</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Our white-label partnership is designed to help agencies grow faster and deliver better results for their clients.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group">
                <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${benefit.color}`}>
                  <benefit.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{benefit.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="pb-16 md:-translate-y-12">
        <CurvedLoop 
        marqueeText="Quality ✦  Scale ✦ Reliability ✦ Expertise ✦"
        speed={0.6}
        curveAmount={300}
        direction="right"
        interactive={true}
        className="opacity-5"
        />
      </div>

      {/* Services Section */}
      <section className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-8">Our White Label Services</h2>
              <div className="space-y-6">
                {whiteLabelServices.map((service, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all">
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-[#5449e8]/10 text-[#5449e8] flex items-center justify-center">
                      <service.icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{service.title}</h4>
                      <p className="text-neutral-400 text-sm">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-[#5449e8]/20 to-transparent border border-white/10 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[#060609]/40 backdrop-blur-sm z-0"></div>
                <div className="relative z-10 text-center p-8">
                   <div className="w-20 h-20 bg-[#5449e8] rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-2xl shadow-indigo-500/40">
                      <Users2 size={40} className="text-white" />
                   </div>
                   <h3 className="text-2xl font-bold mb-4">Your Silent Execution Partner</h3>
                   <p className="text-neutral-400 text-sm">We've helped 50+ agencies deliver 300+ projects successfully.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TheTWJDifference />

      <CaseStudiesSection darkMode={false}/>
      
      <TestimonialsSection darkMode={false}/>

      <FaqsSection darkMode={true}/>

    </div>
  );
}
