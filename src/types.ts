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

/** Mức phổ biến của cây tại một vùng (PRD §6.1 ty_le_pho_bien). */
export type PopularityLevel = "chinh" | "phu" | "it";

export interface HerbRegionInfo {
  regionSlug: string;
  regionName: string;
  provinces: string[];
  outputEstimate: string;
  /** Cây trồng ở vùng là chính/phụ/ít — quyết định độ đậm nội dung combo (PRD §6.1). */
  popularity: PopularityLevel;
}

/** Nhóm dược liệu theo bộ phận thu mua chính (PRD §6.1 nhom). */
export type HerbGroup = "cu-re" | "hoa-la" | "nam" | "vo" | "than";

export interface HerbTechnique {
  season: string; // thời vụ
  soil: string; // đất phù hợp
  ph: string; // độ pH đất
  density: string; // mật độ trồng, vd "10.000 cây/ha"
  harvestTime: string; // thời gian tới thu hoạch
  yield: string; // năng suất
  propagation: string[]; // cách nhân giống, vd ["giâm cành", "ươm hạt"]
}

/** Sâu bệnh thường gặp trên cây (PRD §6.1 sau_benh_thuong_gap). */
export interface HerbPest {
  pestName: string;
  level: "rat-pho-bien" | "co-gap" | "hiem";
  symptom: string;
  remedy: string;
}

/** Một video nhúng (YouTube/TikTok) hiển thị trong carousel "Video thực địa" của trang cây. */
export interface HerbMedia {
  type: "youtube" | "tiktok";
  /** ID video thuần (không phải URL đầy đủ), vd YouTube "dQw4w9WgXcQ". */
  id: string;
  /** Caption ngắn hiển thị dưới video. */
  title?: string;
}

export interface HerbalMedicine {
  id: string;
  slug: string;
  name: string;
  /** Tên khoa học (Latin). Có thể để trống khi chưa xác định chắc chắn. */
  scientificName: string;
  otherNames: string[];
  group: HerbGroup;
  /** Đặc điểm nhận diện hàng tươi/khô khi thu mua (nguồn: danh mục thu mua Vietmec). */
  identification?: {
    fresh?: string;
    dry?: string;
  };
  /** Sản lượng tối thiểu bên bao tiêu cần gom mỗi kỳ, vd "50 kg/tháng". */
  demandQuantity?: string;
  /** Mức độ ưu tiên thu mua: "hot" = đang cần gấp. */
  priorityLevel?: "hot" | "normal";
  priceRange: string;
  shortDesc: string;
  image: string;
  /** Video thực địa (YouTube/TikTok) cho carousel. Tùy chọn — vắng thì ẩn section. */
  media?: HerbMedia[];
  description: string;
  bioCharacteristics: string; // đặc điểm sinh học 200-300 từ
  usageValue: string; // giá trị sử dụng (không đi sâu chữa bệnh)
  stats: HerbStats[];
  /** Tháng xuống giống & thu hoạch (1–12) cho Lịch mùa vụ tương tác. Tùy chọn. */
  seasonCalendar?: {
    sow: number[];
    harvest: number[];
  };
  prices: HerbPriceDetail[];
  regions: HerbRegionInfo[];
  technique: HerbTechnique;
  pests: HerbPest[];
  techniquesLink: string;
  standards: string[];
  keywordsTarget: string[];
  /**
   * Từ khoá chính (focus keyword) của landing — dùng cho <title>, <h1> và mô tả.
   * Bỏ trống thì mặc định "Thu mua dược liệu {name}". Ghi đè khi cây cần cụm khác
   * (vd "thu mua atiso khô", "giá thu mua ba kích").
   */
  focusKeyword?: string;
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
  /** Ảnh OG mặc định (path nội bộ) cho trang không tự set image. */
  defaultImage: string;
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
