import { Metadata } from "next";
import WorkPageClient from "@/components/work/work-page-client";
import { baseUrl, buildHreflangAlternates, twitterDefaults, robotsDefaults, globalKeywords } from "@/lib/seo";

const pageUrl = `${baseUrl}/work`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${pageUrl}/#webpage`,
      url: pageUrl,
      name: "Portfolio & Case Studies | TWJ Labs",
      description: "Explore TWJ Labs' work — Next.js websites, AI SaaS products, and e-commerce for clients in the US, UK, India, Australia, and New Zealand.",
      publisher: { "@id": `${baseUrl}/#organization` },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Our Work", item: pageUrl },
        ],
      },
    },
    {
      "@type": "ItemList",
      name: "TWJ Labs Global Portfolio",
      url: pageUrl,
      description: "Case studies from web, SaaS and AI projects delivered for clients worldwide.",
    },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Portfolio & Case Studies | Global Web Development | TWJ Labs India",
    description:
      "See how TWJ Labs has helped startups and businesses across the US, UK, Australia, New Zealand & India build high-performance Next.js and AI-powered digital products.",
    keywords: [
      "web development portfolio India",
      "Next.js case studies",
      "SaaS development examples India",
      "AI web projects portfolio",
      "offshore web agency portfolio",
      "international web development case studies",
      ...globalKeywords.global,
    ],
    alternates: buildHreflangAlternates("/work"),
    openGraph: {
      type: "website",
      locale: "en_US",
      url: pageUrl,
      siteName: "The Walking Jumbo",
      title: "Portfolio & Case Studies | Global Clients | TWJ Labs",
      description: "Real projects, real results. US, UK, AU & India clients. Next.js, AI & SaaS.",
      images: [{ url: `${baseUrl}/opengraph-image.png`, width: 1200, height: 630 }],
    },
    twitter: { ...twitterDefaults, title: "Portfolio | TWJ Labs", description: "Real projects for global clients.", images: [`${baseUrl}/opengraph-image.png`] },
    robots: robotsDefaults,
  };
}

const WorkPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  await params;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <WorkPageClient />
    </>
  );
};

export default WorkPage;