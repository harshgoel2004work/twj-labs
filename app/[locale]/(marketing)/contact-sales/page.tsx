import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import ContactSalesClient from "@/components/contact-sales/contact-sales-client";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Contact.Hero' });
  
  return {
    title: t('badge') + " - TWJ Labs",
    description: t('description'),
  };
}

export default async function ContactSalesPage({ params }: { params: Promise<{ locale: string }> }) {
  await params;
  return (
    <Suspense fallback={<div className="min-h-screen w-full bg-[#060609]" />}>
      <ContactSalesClient />
    </Suspense>
  );
}