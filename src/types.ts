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

/** Mã định danh loài ở các CSDL ngoài, dùng dựng `sameAs` cho Taxon. */
export interface TaxonIds {
  /** Q-id Wikidata, vd "Q161125". */
  wikidata?: string;
  /** URL bài Wikipedia tiếng Việt. */
  wikipediaVi?: string;
  /** URL bài Wikipedia tiếng Anh. */
  wikipediaEn?: string;
  /** Id POWO (Plants of the World Online — Kew), phần sau /taxon/. */
  powo?: string;
  /** Id loài trên GBIF, vd "3189866". */
  gbif?: string;
}

/** Nguồn tham khảo của một bài viết → JSON-LD `citation` + mục "Nguồn tham khảo". */
export interface ContentSource {
  title: string;
  url: string;
  publisher?: string;
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
  /**
   * Mã định danh của loài ở các cơ sở dữ liệu ngoài → dựng `sameAs` cho node Taxon,
   * giúp Google/LLM nối trang này với đúng thực thể thực vật. Sinh bằng
   * `scripts/fetch-taxon-ids.ts` rồi duyệt tay; cây nào không chắc thì để trống —
   * khai sai thực thể còn hại hơn không khai.
   */
  taxonIds?: TaxonIds;
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
   * Bỏ trống thì mặc định "Thu mua {name}". Ghi đè khi cây cần cụm khác
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
  /** <title> ngắn dành riêng cho SERP; thiếu thì tự cắt từ title. */
  seoTitle?: string;
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
  /** Tiêu đề bảng standardsTable; mặc định nếu thiếu. */
  standardsTableTitle?: string;
  /** 3 header cột cho standardsTable; mặc định nếu thiếu. */
  standardsTableHeaders?: [string, string, string];
  /** Callout "sai lầm phổ biến" riêng theo bài; không render nếu thiếu. */
  pitfall?: { title?: string; body: string };
  /** Đánh dấu bài mô tả một quy trình → phát thêm JSON-LD HowTo. */
  howTo?: boolean;
  /** Nguồn tham khảo; render cuối bài và phát thành `citation`. */
  sources?: ContentSource[];
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
  /** Tên site rút gọn → WebSite.alternateName, nguồn "site name" Google ghép vào title link. */
  siteShortName?: string;
  defaultTitle: string;
  defaultDescription: string;
  /** Ảnh OG mặc định (path nội bộ) cho trang không tự set image. */
  defaultImage: string;
  locale: string;
  authorUrl: string;
  /** Logo Organization (path nội bộ). Bỏ trống thì KHÔNG khai `logo` trong schema. */
  logo?: string;
  /** Ảnh chân dung tác giả → `Person.image`. */
  authorImage?: string;
  /** Hồ sơ ngoài (mạng xã hội, profile) → `sameAs`. Mảng rỗng thì không phát key. */
  sameAs?: string[];
  /** Lĩnh vực chuyên môn của tác giả → `Person.knowsAbout`. */
  knowsAbout?: string[];
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
  /** <title> ngắn dành riêng cho SERP; thiếu thì tự cắt từ title. */
  seoTitle?: string;
  intro: string;
  standards: {
    stage: string;
    criteria: string;
    controlMethod: string;
  }[];
  pests: PestRemedy[];
  /** Nguồn tham khảo; render cuối trang hub và phát thành `citation`. */
  sources?: ContentSource[];
  faq: { question: string; answer: string }[];
}
