// ─── SEO / Meta Domain Models ─────────────────────────────────────────────────

export interface AlternateLanguage {
  lang: string;   // BCP 47, e.g. 'hi', 'en'
  url: string;    // absolute URL for that language version
}

export interface SeoMetaConfig {
  title: string;
  description: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;          // absolute URL
  ogType?: 'website' | 'article' | 'product';
  twitterCard?: 'summary' | 'summary_large_image';
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonicalUrl?: string;     // absolute URL
  noindex?: boolean;         // true for dashboard/private pages
  nofollow?: boolean;
  structuredData?: object | object[]; // JSON-LD
  alternateLanguages?: AlternateLanguage[];
  hreflang?: string;         // 'en', 'hi', 'x-default'
}

export interface RouteSeoCofig {
  path: string;              // route path, e.g. '/resume-generator'
  seo: SeoMetaConfig;
}

// ─── Structured data builders ──────────────────────────────────────────────────

export function buildWebApplicationSchema(appName: string, appUrl: string, description: string): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: appName,
    url: appUrl,
    description,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
      description: 'Free to preview. Pay ₹10 to download.',
    },
  };
}

export function buildFaqSchema(faqs: Array<{ q: string; a: string }>): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };
}

export function buildBreadcrumbSchema(crumbs: Array<{ name: string; url: string }>): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
}

export function buildSoftwareAppSchema(name: string, url: string, ratingValue = 4.8, ratingCount = 1200): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    url,
    applicationCategory: 'BusinessApplication',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: ratingValue.toString(),
      reviewCount: ratingCount.toString(),
    },
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  };
}
