import { Suspense } from "react";
import ContactSalesClient from "@/components/contact-sales/contact-sales-client";
import { Metadata } from "next";
import { baseUrl, buildHreflangAlternates, globalAreaServed, twitterDefaults, robotsDefaults, globalKeywords } from "@/lib/seo";

const pageUrl = `${baseUrl}/contact-sales`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": `${pageUrl}/#webpage`,
      url: pageUrl,
      name: "Contact TWJ Labs | Hire a Global Web Development Agency",
      description: "Get in touch to discuss your web project. TWJ Labs serves clients in the US, UK, Australia, New Zealand, India & Europe.",
      publisher: { "@id": `${baseUrl}/#organization` },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Contact Sales", item: pageUrl },
        ],
      },
    },
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": `${baseUrl}/#localbusiness`,
      name: "The Walking Jumbo",
      url: baseUrl,
      telephone: "", // ← add number
      email: "",     // ← add email
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ghaziabad",
        addressRegion: "Uttar Pradesh",
        postalCode: "201010",
        addressCountry: "IN",
      },
      geo: { "@type": "GeoCoordinates", latitude: 28.6692, longitude: 77.4538 },
      // Full global areaServed on contact page = most powerful local+international signal
      areaServed: globalAreaServed,
      currenciesAccepted: "INR, USD, GBP, AUD, EUR",
      paymentAccepted: "Bank Transfer, PayPal, Wise, Stripe",
    },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Contact TWJ Labs | Hire Web Developers in India for US, UK & AU",
    description:
      "Ready to build? Contact TWJ Labs — an India-based web agency trusted by US, UK, Australian & New Zealand clients. Free consultation. 24-hour response time.",
    keywords: [
      "hire web developer India for US clients",
      "contact web development agency India",
      "outsource website project India",
      "hire offshore developer",
      "get a website built by Indian agency",
      ...globalKeywords.global,
      ...globalKeywords.northAmerica,
      ...globalKeywords.uk,
      ...globalKeywords.australia,
    ],
    alternates: buildHreflangAlternates("/contact-sales"),
    openGraph: {
      type: "website",
      locale: "en_US",
      url: pageUrl,
      siteName: "The Walking Jumbo",
      title: "Contact TWJ Labs | India Web Agency for Global Clients",
      description: "Tell us about your project. Free consultation, 24hr response. Clients in US, UK, AU & NZ welcome.",
      images: [{ url: `${baseUrl}/opengraph-image.png`, width: 1200, height: 630 }],
    },
    twitter: {
      ...twitterDefaults,
      title: "Contact TWJ Labs | Web Agency for US, UK & AU",
      description: "Free consultation. 24hr response. Offshore rates, world-class quality.",
      images: [`${baseUrl}/opengraph-image.png`],
    },
    robots: robotsDefaults,
  };
}

export default async function ContactSalesPage({ params }: { params: Promise<{ locale: string }> }) {
  await params;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Suspense fallback={<div className="min-h-screen w-full bg-[#060609]" />}>
        <ContactSalesClient />
      </Suspense>
    </>
  );
}