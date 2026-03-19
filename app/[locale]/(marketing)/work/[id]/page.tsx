import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import CaseStudyClient from "@/components/work/case-study-client";
import { getSanityCaseStudyById } from "@/actions/get-portfolio";

export async function generateMetadata({ params }: { params: Promise<{ id: string, locale: string }> }): Promise<Metadata> {
  const { id, locale } = await params;
  const data = await getSanityCaseStudyById(id);
  const t = await getTranslations({ locale, namespace: 'CaseStudies' });
  
  return {
    title: (data?.companyName || t('hero.title')) + " - Case Study",
    description: data?.description || t('analysis.description'),
  };
}

export default async function WorkDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CaseStudyClient id={id} />;
}