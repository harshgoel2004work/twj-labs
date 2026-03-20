/**
 * ============================================================
 * FILE: lib/seo.ts
 * ============================================================
 * Shared SEO utilities used across all pages.
 * Import from this file to keep all pages consistent.
 * ============================================================
 */

export const baseUrl = "https://www.twjlabs.com";

// ─── Hreflang Alternates ──────────────────────────────────────
// Since all target markets speak English, we differentiate by
// REGION (not language). This tells Google to serve the correct
// regional version to US, UK, AU, NZ, and IN visitors.
// x-default = fallback for any region not listed below.
export function buildHreflangAlternates(path: string = "") {
    const url = `${baseUrl}${path}`;
    return {
        canonical: url,
        languages: {
            "x-default": url,   // Catch-all for unassigned regions
            "en": url,  // Generic English
            "en-US": url,  // United States
            "en-GB": url,  // United Kingdom
            "en-AU": url,  // Australia
            "en-NZ": url,  // New Zealand
            "en-IN": url,  // India
            "en-CA": url,  // Canada (bonus — large tech market)
        },
    };
}

// ─── Global areaServed (reused in all Service/LocalBusiness schemas) ──
export const globalAreaServed = [
    // India
    { "@type": "Country", name: "India" },
    { "@type": "City", name: "Delhi" },
    { "@type": "City", name: "Ghaziabad" },
    { "@type": "City", name: "Noida" },
    { "@type": "City", name: "Mumbai" },
    { "@type": "City", name: "Bangalore" },
    // North America
    { "@type": "Country", name: "United States" },
    { "@type": "City", name: "New York" },
    { "@type": "City", name: "San Francisco" },
    { "@type": "City", name: "Austin" },
    { "@type": "Country", name: "Canada" },
    { "@type": "City", name: "Toronto" },
    // Europe
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "City", name: "London" },
    { "@type": "Country", name: "Germany" },
    { "@type": "Country", name: "Netherlands" },
    { "@type": "Country", name: "France" },
    // Pacific
    { "@type": "Country", name: "Australia" },
    { "@type": "City", name: "Sydney" },
    { "@type": "City", name: "Melbourne" },
    { "@type": "Country", name: "New Zealand" },
    { "@type": "City", name: "Auckland" },
];

// ─── Base Organization Schema ─────────────────────────────────
// Used as the anchor `@id` reference across all pages.
export const organizationSchema = {
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: "The Walking Jumbo",
    alternateName: "TWJ Labs",
    url: baseUrl,
    logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
        width: 300,
        height: 80,
    },
    description:
        "TWJ Labs is a global web development agency specializing in Next.js, AI Integration, and Custom SaaS. Based in India, delivering world-class digital products to clients in the US, UK, Australia, New Zealand, Europe, and beyond.",
    foundingDate: "2022",
    founders: [
        {
            "@type": "Person",
            name: "Harsh Goel",
            url: "https://www.linkedin.com/in/harshgoel-cs",
            jobTitle: "Founder & CEO",
        },
    ],
    address: {
        "@type": "PostalAddress",
        addressLocality: "Ghaziabad",
        addressRegion: "Uttar Pradesh",
        postalCode: "201010",
        addressCountry: "IN",
    },
    contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        url: `${baseUrl}/contact-sales`,
        availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
        "https://twitter.com/thewalkingjumbo",
        "https://www.linkedin.com/company/thewalkingjumbo",
        "https://www.instagram.com/thewalkingjumbo",
    ],
    // Signals to Google's AI what the business is known for
    knowsAbout: [
        "Next.js Development",
        "React.js",
        "TypeScript",
        "AI Integration",
        "Custom SaaS Development",
        "E-commerce Development",
        "UI/UX Design",
        "Headless CMS",
        "SEO Optimization",
        "Web Performance",
    ],
    areaServed: globalAreaServed,
    // Offshore development value prop — key for attracting US/UK/AU clients
    slogan: "World-Class Web Development. India-Based. Globally Delivered.",
};

// ─── Base Twitter / OG Defaults ──────────────────────────────
export const twitterDefaults = {
    card: "summary_large_image" as const,
    site: "@thewalkingjumbo",
    creator: "@thewalkingjumbo",
};

export const robotsDefaults = {
    index: true,
    follow: true,
    googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1 as const,
        "max-image-preview": "large" as const,
        "max-snippet": -1 as const,
    },
};

// ─── Market-Specific Keywords Per Region ─────────────────────
// Use these to supplement page-level keywords.
// Foreign clients search differently from Indian clients.
export const globalKeywords = {
    // What US clients search when looking for offshore dev agencies
    northAmerica: [
        "offshore web development agency USA",
        "hire Next.js developer from India USA",
        "Indian web development agency for US clients",
        "outsource web development to India USA",
        "affordable web agency for US startups",
        "remote web development team USA",
        "top web development outsourcing company",
    ],
    // UK has strong appetite for Indian dev agencies
    uk: [
        "offshore web agency UK",
        "Indian software agency for UK businesses",
        "hire Next.js developer UK",
        "outsource web development India UK",
        "affordable web development UK",
        "web agency India for UK clients",
    ],
    // Australia has a large outsourcing market to India
    australia: [
        "web development agency Australia",
        "outsource web development Australia",
        "Indian web developers for Australian businesses",
        "affordable SaaS development Australia",
        "hire web developer from India Australia",
        "Next.js developer Australia",
    ],
    newZealand: [
        "web development agency New Zealand",
        "outsource website development New Zealand",
        "hire web developer India New Zealand",
        "affordable web agency New Zealand",
    ],
    // Universal offshore intent keywords
    global: [
        "offshore web development agency",
        "outsource web development to India",
        "best web development agency India for international clients",
        "hire remote Next.js developer",
        "Indian software development agency",
        "top web agency India international",
        "world-class web development India pricing",
        "Next.js agency for startups worldwide",
        "AI integration agency international",
        "SaaS development company India",
    ],
};