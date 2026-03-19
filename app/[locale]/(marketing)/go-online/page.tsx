import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

import { GoOnlineHero } from "@/components/go-online/hero";
import { GoOnlineTicker } from "@/components/go-online/ticker";
import { GoOnlineFeatures } from "@/components/go-online/features";
import { GoOnlineProcess } from "@/components/go-online/process";
import { GoOnlinePricing } from "@/components/go-online/pricing";
import TheTWJDifference from "@/components/home/twj-difference";
import FaqsSection from "@/components/shared/faqs";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'GoOnline' });
  return {
    title: t('TitlePart1') + " " + t('TitlePart2'),
    description: t('Subtitle'),
  };
}

export default async function GoOnlinePage({ params }: { params: Promise<{ locale: string }> }) {
  await params;
  return (
    <div className="bg-[#060609] text-white min-h-screen">
      <GoOnlineHero />
      <GoOnlineTicker />
      <GoOnlineFeatures />
      <GoOnlineProcess />
      <GoOnlinePricing />

      <TheTWJDifference />
      <FaqsSection darkMode={true} />
    </div>
  );
}