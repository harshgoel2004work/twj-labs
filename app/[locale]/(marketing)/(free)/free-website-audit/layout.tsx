import type { Metadata } from "next";
import {
    baseUrl, buildHreflangAlternates, twitterDefaults, robotsDefaults, globalKeywords,
} from "@/lib/seo";

const pageUrl = `${baseUrl}/free-website-audit`;

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebApplication",
            "@id": `${pageUrl}/#app`,
            name: "Free Website Audit Tool — TWJ Labs",
            url: pageUrl,
            applicationCategory: "DeveloperApplication",
            operatingSystem: "All",
            description:
                "Instantly audit any website for Performance, SEO, Security, Green Hosting, Tech Stack, W3C HTML validity and Social Cards — completely free.",
            offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                description: "Free website audit — no signup required.",
            },
            provider: { "@id": `${baseUrl}/#organization` },
        },
        {
            "@type": "WebPage",
            "@id": `${pageUrl}/#webpage`,
            url: pageUrl,
            name: "Free Website Audit Tool | Performance, SEO & Security | TWJ Labs",
            description:
                "Run a free audit on any website. Get instant scores for Performance, SEO, Accessibility, Security, Green Hosting & more. Built by TWJ Labs.",
            breadcrumb: {
                "@type": "BreadcrumbList",
                itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
                    { "@type": "ListItem", position: 2, name: "Free Website Audit", item: pageUrl },
                ],
            },
            publisher: { "@id": `${baseUrl}/#organization` },
        },
        {
            "@type": "FAQPage",
            mainEntity: [
                {
                    "@type": "Question",
                    name: "Is this website audit tool really free?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes. TWJ Labs' website audit tool is completely free to use, with no account or signup required. It pulls data from Google PageSpeed, Mozilla Observatory, Green Web Foundation, W3C Validator, and more.",
                    },
                },
                {
                    "@type": "Question",
                    name: "What does this audit tool check?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "The audit covers: PageSpeed & Core Web Vitals (Performance, Accessibility, Best Practices, SEO), Security headers grade (Mozilla Observatory), Green hosting status, W3C HTML validity, Open Graph / Social Card preview, and Tech Stack detection.",
                    },
                },
                {
                    "@type": "Question",
                    name: "How can I fix the issues found in the audit?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "TWJ Labs offers a free consultation to walk through your audit results and provide a custom fix plan. Book a free call via the contact page.",
                    },
                },
            ],
        },
    ],
};

export const metadata: Metadata = {
    title: "Free Website Audit Tool | Performance, SEO, Security & More | TWJ Labs",
    description:
        "Instantly audit any website — Performance, SEO, Accessibility, Security grade, Green Hosting, Tech Stack, W3C HTML & Social Cards. 100% free. No signup. Powered by TWJ Labs.",

    keywords: [
        // Tool-intent (highest traffic)
        "free website audit tool",
        "free website speed test",
        "free SEO audit tool",
        "Google PageSpeed audit online",
        "website performance checker free",
        "website security checker free",
        "free Core Web Vitals checker",
        "website accessibility checker",
        "tech stack detector",
        "open graph preview tool",
        // International
        "free website audit tool USA",
        "free website audit UK",
        "website audit tool Australia",
        // Brand
        "TWJ Labs website audit",
        ...globalKeywords.global,
    ],

    alternates: buildHreflangAlternates("/free-website-audit"),

    openGraph: {
        type: "website",
        locale: "en_US",
        url: pageUrl,
        siteName: "The Walking Jumbo",
        title: "Free Website Audit Tool | Performance, SEO & Security | TWJ Labs",
        description:
            "Instant website audit — 6 data sources, 0 signups. Performance, SEO, Security, Green Hosting, Tech Stack & Social Cards.",
        images: [{ url: `${baseUrl}/opengraph-image.png`, width: 1200, height: 630 }],
    },

    twitter: {
        ...twitterDefaults,
        title: "Free Website Audit Tool | TWJ Labs",
        description: "Instant audit: Performance, SEO, Security, Green Hosting & more. 100% free.",
        images: [`${baseUrl}/opengraph-image.png`],
    },

    robots: robotsDefaults,
};

export default function FreeAuditLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
        </>
    );
}