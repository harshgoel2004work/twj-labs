import AboutHero from '@/components/about/hero'
import ToolsSection from '@/components/about/tools'
import DarkVeil from '@/components/DarkVeil'
import CaseStudiesSection from '@/components/shared/case-studies'
import FaqsSection from '@/components/shared/faqs'
import React from 'react'
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'About.Hero' });
  return {
    title: t('badge'),
    description: t('missionContent'),
  };
}

const AboutPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  await params;
  return (
    <div>
      {/* ── Ambient background glows ── */}
            <div className="pointer-events-none absolute inset-0 ">
              <div className="opacity-50" style={{ width: "100%", height: "900px", position: "relative" }}>
                <DarkVeil
                  hueShift={2}
                  noiseIntensity={0}
                  scanlineIntensity={0}
                  speed={1}
                  scanlineFrequency={0}
                  warpAmount={2}
                />
              </div>
            </div>
            <div className='h-[50vh]'>

            </div>
      <AboutHero />
      <ToolsSection />
      {/* <AboutBento /> */}
      <CaseStudiesSection darkMode={true} />
      <FaqsSection darkMode={true}/>
    </div>
  )
}

export default AboutPage