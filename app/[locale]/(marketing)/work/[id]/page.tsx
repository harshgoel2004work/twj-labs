import { Metadata } from "next";
import CaseStudyClient from "@/components/work/case-study-client";
import { getSanityCaseStudyById } from "@/actions/get-portfolio";
import { baseUrl, buildHreflangAlternates, twitterDefaults, robotsDefaults } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const data = await getSanityCaseStudyById(id);
  const company = data?.companyName || "Client";
  const pageUrl = `${baseUrl}/work/${id}`;
  const coverImage = data?.coverImage || `${baseUrl}/opengraph-image.png`;
  const description = data?.description ||
    `How TWJ Labs built a high-performance Next.js product for ${company}. India-based agency serving US, UK, AU & NZ clients.`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        articleSection: "Case Study",
        headline: `${company} Case Study | TWJ Labs`,
        description,
        url: pageUrl,
        image: { "@type": "ImageObject", url: coverImage, width: 1200, height: 630 },
        author: { "@id": `${baseUrl}/#organization` },
        publisher: { "@id": `${baseUrl}/#organization` },
        datePublished: data?.publishedAt || new Date().toISOString(),
        dateModified: data?.updatedAt || new Date().toISOString(),
        mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
        about: { "@type": "Organization", name: company },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Work", item: `${baseUrl}/work` },
          { "@type": "ListItem", position: 3, name: company, item: pageUrl },
        ],
      },
    ],
  };

  return {
    title: `${company} Case Study | TWJ Labs`,
    description: description.slice(0, 160),
    keywords: [`${company} web development`, "case study web agency India", "offshore web dev results"],
    alternates: buildHreflangAlternates(`/work/${id}`),
    openGraph: {
      type: "article",
      locale: "en_US",
      url: pageUrl,
      siteName: "The Walking Jumbo",
      title: `${company} Case Study | TWJ Labs`,
      description: description.slice(0, 200),
      publishedTime: data?.publishedAt,
      images: [{ url: coverImage, width: 1200, height: 630, alt: `${company} case study` }],
    },
    twitter: { ...twitterDefaults, title: `${company} | TWJ Labs`, description: description.slice(0, 200), images: [coverImage] },
    robots: robotsDefaults,
    other: { "ld+json": JSON.stringify(jsonLd) },
  };
}

export default async function WorkDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getSanityCaseStudyById(id);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${data?.companyName || "Client"} Case Study | TWJ Labs`,
    description: data?.description,
    url: `${baseUrl}/work/${id}`,
    author: { "@type": "Organization", name: "The Walking Jumbo" },
    publisher: { "@type": "Organization", name: "The Walking Jumbo", url: baseUrl },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <CaseStudyClient id={id} />
    </>
  );
}