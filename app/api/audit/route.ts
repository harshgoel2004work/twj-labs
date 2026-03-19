import { NextRequest, NextResponse } from "next/server";

/* ─── helpers ─────────────────────────────────────────────────── */
function getHostname(url: string): string {
  try { return new URL(url).hostname; } catch { return url; }
}

/* ─── Tech stack detector from raw HTML ──────────────────────── */
// Replace the detectTechStack function in audit-route.ts

function detectTechStack(html: string, headers: Record<string, string>): { name: string; category: string; icon: string }[] {
  const tech: { name: string; category: string; icon: string }[] = [];
  const seen = new Set<string>();

  const add = (name: string, category: string, icon: string) => {
    if (!seen.has(name)) { seen.add(name); tech.push({ name, category, icon }); }
  };

  // ── Headers (most reliable signals) ──────────────────────────
  const server = headers["server"] ?? "";
  const powered = headers["x-powered-by"] ?? "";
  const via = headers["via"] ?? "";

  if (/nginx/i.test(server))              add("Nginx", "Server", "N");
  if (/apache/i.test(server))             add("Apache", "Server", "A");
  if (/cloudflare/i.test(server))         add("Cloudflare", "CDN", "☁");
  if (/vercel/i.test(server) || headers["x-vercel-id"]) add("Vercel", "Hosting", "△");
  if (headers["x-netlify"])               add("Netlify", "Hosting", "N");
  if (/php/i.test(powered))               add("PHP", "Language", "P");
  if (/next\.js/i.test(powered) || headers["x-nextjs-cache"]) add("Next.js", "Framework", "▲");
  if (headers["x-shopify-stage"] || headers["x-shopify-request-id"]) add("Shopify", "E-commerce", "S");

  // ── <meta> generator tag (very reliable) ─────────────────────
  const generatorMatch = html.match(/<meta[^>]+name=["']generator["'][^>]+content=["']([^"']+)["']/i)
    ?? html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']generator["']/i);
  if (generatorMatch) {
    const gen = generatorMatch[1];
    if (/wordpress/i.test(gen))  add("WordPress", "CMS", "W");
    if (/webflow/i.test(gen))    add("Webflow", "Website Builder", "W");
    if (/wix/i.test(gen))        add("Wix", "Website Builder", "W");
    if (/squarespace/i.test(gen)) add("Squarespace", "Website Builder", "S");
    if (/ghost/i.test(gen))      add("Ghost", "CMS", "G");
    if (/drupal/i.test(gen))     add("Drupal", "CMS", "D");
    if (/joomla/i.test(gen))     add("Joomla", "CMS", "J");
    if (/shopify/i.test(gen))    add("Shopify", "E-commerce", "S");
    if (/framer/i.test(gen))     add("Framer", "Website Builder", "F");
  }

  // ── Script src patterns (very specific paths, not content) ───
  const scriptSrcs: string[] = [];
  const scriptSrcRegex = /<script[^>]+src=["']([^"']+)["']/gi;
  let m;
  while ((m = scriptSrcRegex.exec(html)) !== null) scriptSrcs.push(m[1]);
  const allSrcs = scriptSrcs.join(" ");

  if (/_next\/static/.test(allSrcs))                       add("Next.js", "Framework", "▲");
  if (/\/wp-content\/|\/wp-includes\//.test(allSrcs))      add("WordPress", "CMS", "W");
  if (/cdn\.shopify\.com/.test(allSrcs))                   add("Shopify", "E-commerce", "S");
  if (/static\.webflow\.com/.test(allSrcs))                add("Webflow", "Website Builder", "W");
  if (/assets\.squarespace\.com/.test(allSrcs))            add("Squarespace", "Website Builder", "S");
  if (/cdn\.wix\.com|wixstatic\.com/.test(allSrcs))        add("Wix", "Website Builder", "W");
  if (/framerusercontent\.com/.test(allSrcs))              add("Framer", "Website Builder", "F");
  if (/cdn\.jsdelivr\.net\/npm\/bootstrap/.test(allSrcs))  add("Bootstrap", "CSS Framework", "B");
  if (/gtag\/js|googletagmanager\.com/.test(allSrcs))      add("Google Analytics", "Analytics", "G");
  if (/js\.intercomcdn\.com|widget\.intercom\.io/.test(allSrcs)) add("Intercom", "Support", "I");
  if (/static\.hotjar\.com/.test(allSrcs))                 add("Hotjar", "Analytics", "H");
  if (/crisp\.chat/.test(allSrcs))                         add("Crisp", "Support", "C");
  if (/js\.stripe\.com/.test(allSrcs))                     add("Stripe", "Payments", "$");
  if (/cdn\.segment\.com/.test(allSrcs))                   add("Segment", "Analytics", "S");
  if (/browser\.sentry-cdn\.com/.test(allSrcs))            add("Sentry", "Monitoring", "S");
  if (/cdn\.sanity\.io/.test(allSrcs))                     add("Sanity", "CMS", "S");

  // ── Link hrefs (stylesheets etc.) ────────────────────────────
  const linkHrefs: string[] = [];
  const linkRegex = /<link[^>]+href=["']([^"']+)["']/gi;
  while ((m = linkRegex.exec(html)) !== null) linkHrefs.push(m[1]);
  const allLinks = linkHrefs.join(" ");

  if (/\/wp-content\/|\/wp-includes\//.test(allLinks)) add("WordPress", "CMS", "W");
  if (/static\.webflow\.com/.test(allLinks))           add("Webflow", "Website Builder", "W");
  if (/fonts\.googleapis\.com/.test(allLinks))         add("Google Fonts", "Fonts", "G");

  // ── HTML body signatures (specific, unmistakable) ────────────
  if (/data-wf-site|webflow-badge/i.test(html))       add("Webflow", "Website Builder", "W");
  if (/shopify-features|Shopify\.theme/i.test(html))  add("Shopify", "E-commerce", "S");
  if (/wp-json|\/wp-admin/i.test(html))               add("WordPress", "CMS", "W");
  if (/data-next-page|__NEXT_DATA__/i.test(html))     add("Next.js", "Framework", "▲");
  if (/nuxt-link|__nuxt/i.test(html))                 add("Nuxt.js", "Framework", "N");
  if (/data-gatsby-|gatsby-focus-wrapper/i.test(html)) add("Gatsby", "Framework", "G");
  if (/data-reactroot|__reactFiber/i.test(html))      add("React", "Library", "⚛");
  if (/ng-version|angular\.json/i.test(html))         add("Angular", "Framework", "A");

  return tech.slice(0, 14);
}

/* ─── OG tag parser ──────────────────────────────────────────── */
function parseOGTags(html: string): Record<string, string> {
  const result: Record<string, string> = {};
  const metaRegex = /<meta[^>]+>/gi;
  const propertyRegex = /property=["'](og:[^"']+)["']/i;
  const nameRegex = /name=["'](twitter:[^"']+)["']/i;
  const contentRegex = /content=["']([^"']*)["']/i;
  const titleRegex = /<title[^>]*>([^<]*)<\/title>/i;

  const titleMatch = html.match(titleRegex);
  if (titleMatch) result["title"] = titleMatch[1].trim();

  let match;
  while ((match = metaRegex.exec(html)) !== null) {
    const tag = match[0];
    const propMatch = propertyRegex.exec(tag) || nameRegex.exec(tag);
    const contentMatch = contentRegex.exec(tag);
    if (propMatch && contentMatch) result[propMatch[1]] = contentMatch[1];
  }

  return result;
}

/* ─── MAIN HANDLER ───────────────────────────────────────────── */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const rawUrl = searchParams.get("url");
  const strategy = searchParams.get("strategy") ?? "mobile";

  if (!rawUrl) return NextResponse.json({ error: "URL is required" }, { status: 400 });

  let url = rawUrl;
  if (!/^https?:\/\//.test(url)) url = "https://" + url;
  const hostname = getHostname(url);

  /* ── Run all APIs in parallel ── */
  const [
    pagespeedResult,
    mozillaResult,
    greenResult,
    w3cResult,
    siteHtmlResult,
  ] = await Promise.allSettled([

    /* 1. Google PageSpeed */
    fetch(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed` +
      `?url=${encodeURIComponent(url)}&strategy=${strategy}` +
      `&category=performance&category=accessibility&category=best-practices&category=seo` +
      `&key=${process.env.GOOGLE_PAGESPEED_API_KEY}`,
      { next: { revalidate: 0 } }
    ).then(r => r.json()),

    /* 2. Mozilla HTTP Observatory */
    fetch(
      `https://http-observatory.security.mozilla.org/api/v1/analyze?host=${hostname}`,
      { method: "POST", next: { revalidate: 0 } }
    ).then(r => r.json()).catch(() => null),

    /* 3. Green Web Foundation */
    fetch(
      `https://api.thegreenwebfoundation.org/greencheck/${hostname}`,
      { next: { revalidate: 0 } }
    ).then(r => r.json()).catch(() => null),

    /* 4. W3C HTML Validator */
    fetch(
      `https://validator.w3.org/nu/?doc=${encodeURIComponent(url)}&out=json`,
      {
        headers: { "User-Agent": "TWJLabs-Audit-Bot/1.0" },
        next: { revalidate: 0 }
      }
    ).then(r => r.json()).catch(() => null),

    /* 5. Fetch raw HTML for OG + tech stack */
    fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; TWJLabs-Audit/1.0)",
        "Accept": "text/html",
      },
      next: { revalidate: 0 },
      signal: AbortSignal.timeout(10000),
    }).then(async r => ({ html: await r.text(), headers: Object.fromEntries(r.headers.entries()) }))
      .catch(() => null),
  ]);

  /* ── PageSpeed (required) ── */
  if (pagespeedResult.status === "rejected") {
    return NextResponse.json({ error: "Failed to reach Google PageSpeed API." }, { status: 500 });
  }
  const psData = pagespeedResult.value;
  if (psData.error) {
    const msg = psData.error?.errors?.[0]?.message ?? psData.error?.message ?? "Google could not analyse this URL.";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
  if (!psData.lighthouseResult) {
    return NextResponse.json({ error: "No Lighthouse data returned. The URL may be unreachable." }, { status: 400 });
  }

  /* ── Mozilla Observatory ── */
  let security = null;
  if (mozillaResult.status === "fulfilled" && mozillaResult.value) {
    const m = mozillaResult.value;
    security = {
      grade: m.grade ?? "N/A",
      score: m.score ?? 0,
      state: m.state ?? "unknown",
      tests_passed: m.tests_passed ?? 0,
      tests_failed: m.tests_failed ?? 0,
      tests_quantity: m.tests_quantity ?? 0,
    };
  }

  /* ── Green Hosting ── */
  let greenHosting = null;
  if (greenResult.status === "fulfilled" && greenResult.value) {
    const g = greenResult.value;
    greenHosting = {
      green: g.green ?? false,
      hosted_by: g.hosted_by ?? null,
      url: g.url ?? hostname,
    };
  }

  /* ── W3C Validation ── */
  let w3c = null;
  if (w3cResult.status === "fulfilled" && w3cResult.value?.messages) {
    const msgs = w3cResult.value.messages as any[];
    const errors = msgs.filter((m: any) => m.type === "error").slice(0, 8);
    const warnings = msgs.filter((m: any) => m.type === "info" && m.subType === "warning").slice(0, 5);
    w3c = {
      error_count: msgs.filter((m: any) => m.type === "error").length,
      warning_count: msgs.filter((m: any) => m.type === "info").length,
      errors: errors.map((m: any) => ({ message: m.message, line: m.lastLine })),
      warnings: warnings.map((m: any) => ({ message: m.message, line: m.lastLine })),
      valid: msgs.filter((m: any) => m.type === "error").length === 0,
    };
  }

  /* ── OG Tags + Tech Stack ── */
  let ogTags = null;
  let techStack = null;
  if (siteHtmlResult.status === "fulfilled" && siteHtmlResult.value) {
    const { html, headers } = siteHtmlResult.value;
    ogTags = parseOGTags(html);
    techStack = detectTechStack(html, headers);
  }

  return NextResponse.json({
    pagespeed: psData,
    security,
    greenHosting,
    w3c,
    ogTags,
    techStack,
  });
}