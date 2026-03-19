import { getTranslations } from "next-intl/server";
import WhiteLabelingClient from "@/components/white-labeling/white-labeling-client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'WhiteLabeling.Hero' });
  return {
    title: t('titlePart1') + " " + t('titlePart2'),
    description: t('description'),
  };
}

export default async function WhiteLabelingPage({ params }: { params: Promise<{ locale: string }> }) {
  // We don't strictly need to await it here if we don't use it, but for consistency:
  await params; 
  return <WhiteLabelingClient />;
}