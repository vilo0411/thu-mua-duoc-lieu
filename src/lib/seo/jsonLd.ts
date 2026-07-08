/**
 * Bộ sinh JSON-LD (schema.org) theo PRD §8.2.
 * Mỗi hàm trả về một object thuần; component <Seo> sẽ serialize vào thẻ
 * <script type="application/ld+json">.
 */
import { SITE } from "../data";
import { canonical } from "./config";

type Json = Record<string, unknown>;

/** Author dùng chung cho mọi article (PRD §8.2). */
export function personAuthor(): Json {
  return {
    "@type": "Person",
    name: SITE.owner,
    url: SITE.authorUrl,
  };
}

export function breadcrumbList(items: { name: string; path?: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      ...(it.path ? { item: canonical(it.path) } : {}),
    })),
  };
}

export function faqPage(faq: { question: string; answer: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function article(opts: {
  headline: string;
  description: string;
  path: string;
  image?: string;
  datePublished?: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    ...(opts.image ? { image: opts.image } : {}),
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
    mainEntityOfPage: canonical(opts.path),
    author: personAuthor(),
    publisher: {
      "@type": "Organization",
      name: SITE.siteName,
      url: SITE.siteUrl,
    },
  };
}

export function product(opts: {
  name: string;
  description: string;
  image?: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: opts.name,
    description: opts.description,
    ...(opts.image ? { image: opts.image } : {}),
    category: "Dược liệu",
  };
}

export function howTo(opts: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.name,
    description: opts.description,
    step: opts.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

export function website(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.siteName,
    url: SITE.siteUrl,
  };
}

export function organizationOfBlogger(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.siteName,
    url: SITE.siteUrl,
    founder: personAuthor(),
  };
}

export function personProfile(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.owner,
    url: SITE.authorUrl,
    description: `Người tổng hợp độc lập về kỹ thuật trồng và giá thu mua dược liệu Việt Nam, đối chiếu từ các nguồn uy tín và có dẫn nguồn.`,
  };
}
