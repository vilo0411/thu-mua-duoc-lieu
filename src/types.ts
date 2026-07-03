export interface HerbStats {
  label: string;
  value: string;
}

export interface HerbPriceDetail {
  grade: string;
  specification: string;
  priceRange: string;
  unit: string;
  trend: "up" | "down" | "stable";
}

export interface HerbRegionInfo {
  regionSlug: string;
  regionName: string;
  provinces: string[];
  outputEstimate: string;
}

export interface HerbalMedicine {
  id: string;
  slug: string;
  name: string;
  scientificName: string;
  priceRange: string;
  shortDesc: string;
  image: string;
  description: string;
  stats: HerbStats[];
  prices: HerbPriceDetail[];
  regions: HerbRegionInfo[];
  techniquesLink: string;
  standards: string[];
  faq: { question: string; answer: string }[];
}

export interface ProvinceDetail {
  name: string;
  area: string;
  harvestPeriod: string;
  activeCooperatives: string;
}

export interface RegionData {
  slug: string;
  name: string;
  characteristics: string;
  advantages: string;
  provinces: ProvinceDetail[];
  commonHerbs: string[];
}

export interface WikiArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  author: string;
  readTime: string;
  date: string;
  excerpt: string;
  image: string;
  contentSections: {
    heading: string;
    paragraphs: string[];
    highlight?: string;
  }[];
  standardsTable?: {
    factor: string;
    standard: string;
    notes: string;
  }[];
  faq: { question: string; answer: string }[];
}

export interface Partner {
  slug: string;
  name: string;
  fullName: string;
  isFeatured: boolean;
  stockCode: string;
  facility: string;
  experience: string;
  desc: string;
  bullets: string[];
  trustSignals: string[];
  landingUrl: string;
  /** Query string mẫu, hỗ trợ placeholder {cay}, {page_type}, {cta_position}. */
  utmTemplate: string;
}

export interface SiteConfig {
  owner: string;
  email: string;
  displayUrl: string;
  /** Origin canonical đầy đủ, dùng cho sitemap / OG / canonical. */
  siteUrl: string;
  siteName: string;
  defaultTitle: string;
  defaultDescription: string;
  locale: string;
  authorUrl: string;
}

export interface PestRemedy {
  pestName: string;
  symptoms: string;
  remedy: string;
}

export interface WikiHub {
  id: string;
  slug: string;
  herbSlug: string;
  herbName: string;
  title: string;
  intro: string;
  standards: {
    stage: string;
    criteria: string;
    controlMethod: string;
  }[];
  pests: PestRemedy[];
  faq: { question: string; answer: string }[];
}
