import { getTranslations } from "next-intl/server";
import WorkPageClient from "@/components/work/work-page-client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Work' });
  return {
    title: t('titlePart1') + " " + t('titlePart2'),
    description: t('subtitle'),
  };
}

const WorkPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  await params;
  return <WorkPageClient />;
}

export default WorkPage;