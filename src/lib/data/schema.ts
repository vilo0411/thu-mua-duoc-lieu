/**
 * Zod schema xác thực dữ liệu content JSON tại build time (PRD §15.3 — Type-safe).
 *
 * LƯU Ý: file này CHỈ được import bởi scripts/validate-content.ts (chạy qua tsx ở
 * bước prebuild). KHÔNG import từ code phía client để tránh kéo zod vào bundle —
 * loaders trong lib/data chỉ import JSON đã được xác thực và ép kiểu theo types.ts.
 *
 * Các interface trong src/types.ts và các schema dưới đây phải được giữ đồng bộ.
 */
import { z } from "zod";

const trend = z.enum(["up", "down", "stable"]);
const faqItem = z.object({ question: z.string().min(1), answer: z.string().min(1) });

export const herbSchema = z.object({
  id: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/, "slug phải là chữ thường không dấu, dùng '-'"),
  name: z.string().min(1),
  scientificName: z.string().min(1),
  priceRange: z.string().min(1),
  shortDesc: z.string().min(1),
  image: z.string().url(),
  description: z.string().min(1),
  stats: z.array(z.object({ label: z.string().min(1), value: z.string().min(1) })).min(1),
  prices: z
    .array(
      z.object({
        grade: z.string().min(1),
        specification: z.string().min(1),
        priceRange: z.string().min(1),
        unit: z.string().min(1),
        trend,
      }),
    )
    .min(1),
  regions: z.array(
    z.object({
      regionSlug: z.string().min(1),
      regionName: z.string().min(1),
      provinces: z.array(z.string().min(1)),
      outputEstimate: z.string().min(1),
    }),
  ),
  techniquesLink: z.string().min(1),
  standards: z.array(z.string().min(1)).min(1),
  faq: z.array(faqItem),
});

export const regionSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  characteristics: z.string().min(1),
  advantages: z.string().min(1),
  provinces: z
    .array(
      z.object({
        name: z.string().min(1),
        area: z.string().min(1),
        harvestPeriod: z.string().min(1),
        activeCooperatives: z.string().min(1),
      }),
    )
    .min(1),
  commonHerbs: z.array(z.string().min(1)),
});

export const wikiArticleSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  category: z.string().min(1),
  author: z.string().min(1),
  readTime: z.string().min(1),
  date: z.string().min(1),
  excerpt: z.string().min(1),
  image: z.string().url(),
  contentSections: z
    .array(
      z.object({
        heading: z.string().min(1),
        paragraphs: z.array(z.string().min(1)).min(1),
        highlight: z.string().optional(),
      }),
    )
    .min(1),
  standardsTable: z
    .array(z.object({ factor: z.string().min(1), standard: z.string().min(1), notes: z.string().min(1) }))
    .optional(),
  faq: z.array(faqItem),
});

export const wikiHubSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  herbSlug: z.string().min(1),
  herbName: z.string().min(1),
  title: z.string().min(1),
  intro: z.string().min(1),
  standards: z
    .array(z.object({ stage: z.string().min(1), criteria: z.string().min(1), controlMethod: z.string().min(1) }))
    .min(1),
  pests: z.array(z.object({ pestName: z.string().min(1), symptoms: z.string().min(1), remedy: z.string().min(1) })),
  faq: z.array(faqItem),
});

export const partnerSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  fullName: z.string().min(1),
  isFeatured: z.boolean(),
  stockCode: z.string().min(1),
  facility: z.string().min(1),
  experience: z.string().min(1),
  desc: z.string().min(1),
  bullets: z.array(z.string().min(1)).min(1),
  trustSignals: z.array(z.string().min(1)).min(1),
  landingUrl: z.string().url(),
  utmTemplate: z.string().min(1),
});

export const siteSchema = z.object({
  owner: z.string().min(1),
  email: z.string().min(1),
  displayUrl: z.string().min(1),
  siteUrl: z.string().url(),
  siteName: z.string().min(1),
  defaultTitle: z.string().min(1),
  defaultDescription: z.string().min(1),
  locale: z.string().min(1),
  authorUrl: z.string().url(),
});

/** Bản đồ thư mục content → schema tương ứng, dùng bởi validator. */
export const contentSchemas = {
  cay: herbSchema,
  vung: regionSchema,
  wiki: wikiArticleSchema,
  "wiki-hub": wikiHubSchema,
} as const;
