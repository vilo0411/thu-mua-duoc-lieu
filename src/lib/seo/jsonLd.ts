/**
 * Bộ sinh JSON-LD (schema.org).
 *
 * Quy ước: mỗi hàm ở đây trả về MỘT NODE (không có `@context`). Trang gom các node
 * lại rồi bọc bằng `graph()` — cả trang chỉ phát đúng một thẻ
 * <script type="application/ld+json"> chứa `@graph`. Nhờ vậy các thực thể
 * (WebSite, Organization, Person, Taxon…) trỏ nhau bằng `@id` thay vì lặp lại nội
 * dung, và cùng một cây ở hai silo được nhận là cùng một thực thể.
 */
import type { HerbalMedicine } from "../../types";
import { SITE } from "../data";
import { canonical } from "./config";
import { ID, ref } from "./ids";
import { faqAnchorIds } from "../slug";

type Json = Record<string, unknown>;

const LANG = "vi-VN";

/** Bọc danh sách node thành graph hoàn chỉnh của một trang. */
export function graph(nodes: (Json | undefined | null | false)[]): Json {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.filter((n): n is Json => Boolean(n)),
  };
}

/** Bỏ key có giá trị rỗng (undefined, "", [], {}) để không phát field trống. */
function clean<T extends Json>(obj: T): T {
  const out: Json = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null || v === "") continue;
    if (Array.isArray(v) && v.length === 0) continue;
    out[k] = v;
  }
  return out as T;
}

/** Đáp án trong content dùng cú pháp markdown [nhãn](đường-dẫn); schema chỉ nhận chữ thuần. */
const plain = (text: string) => text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

function absoluteUrl(src?: string): string | undefined {
  if (!src) return undefined;
  if (/^https?:\/\//.test(src)) return src;
  const base = SITE.siteUrl.replace(/\/$/, "");
  return `${base}${src.startsWith("/") ? "" : "/"}${src}`;
}

/**
 * Chuẩn hoá ngày về ISO 8601. Content đang lưu dd/mm/yyyy — dạng đó KHÔNG hợp lệ
 * trong JSON-LD. Không parse được thì trả undefined để tuyệt đối không phát rác.
 */
export function toIsoDate(input?: string): string | undefined {
  if (!input) return undefined;
  const t = input.trim();
  if (/^\d{4}-\d{2}-\d{2}(T.*)?$/.test(t)) return t;
  const m = t.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
  if (!m) return undefined;
  const [, d, mo, y] = m;
  const day = Number(d);
  const month = Number(mo);
  if (month < 1 || month > 12 || day < 1 || day > 31) return undefined;
  return `${y}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

// ---------------------------------------------------------------------------
// Node nền — có mặt trên MỌI trang
// ---------------------------------------------------------------------------

export function website(): Json {
  return clean({
    "@type": "WebSite",
    "@id": ID.website(),
    name: SITE.siteName,
    // Google lấy "site name" hiển thị cạnh title link từ đây (chỉ đọc ở trang chủ).
    alternateName: SITE.siteShortName,
    url: canonical("/"),
    inLanguage: LANG,
    // KHÔNG lặp `description` ở đây: Organization đã mang đúng chuỗi đó, và WebSite
    // chỉ cần định danh + ngôn ngữ + trỏ về nhà xuất bản.
    publisher: ref(ID.org()),
  });
}

export function organization(contact?: Json): Json {
  return clean({
    "@type": "Organization",
    "@id": ID.org(),
    contactPoint: contact,
    name: SITE.siteName,
    alternateName: SITE.siteShortName,
    url: canonical("/"),
    description: SITE.defaultDescription,
    email: SITE.email,
    logo: SITE.logo ? ref(ID.logo()) : undefined,
    image: SITE.logo ? ref(ID.logo()) : undefined,
    founder: ref(ID.person()),
    publishingPrinciples: canonical("/chinh-sach-noi-dung"),
    sameAs: SITE.sameAs,
  });
}

/** ImageObject cho logo Organization. Chỉ phát khi site.json có khai `logo`. */
export function logoImage(): Json | undefined {
  const url = absoluteUrl(SITE.logo);
  if (!url) return undefined;
  return {
    "@type": "ImageObject",
    "@id": ID.logo(),
    url,
    contentUrl: url,
    caption: SITE.siteName,
  };
}

/** Tác giả duy nhất của site — thực thể trung tâm cho E-E-A-T. */
export function person(): Json {
  return clean({
    "@type": "Person",
    "@id": ID.person(),
    name: SITE.owner,
    url: SITE.authorUrl,
    image: absoluteUrl(SITE.authorImage),
    description:
      "Người tổng hợp độc lập về kỹ thuật trồng và giá thu mua dược liệu Việt Nam, đối chiếu từ các nguồn uy tín và có dẫn nguồn.",
    knowsAbout: SITE.knowsAbout,
    sameAs: SITE.sameAs,
    // Chiều ngược (Organization.founder → Person) đã khai ở organization().
    // KHÔNG dùng `founderOf`: schema.org không định nghĩa thuộc tính đó cho Person.
    worksFor: ref(ID.org()),
  });
}

/**
 * Các node nền dùng lại ở mọi trang. Truyền `contact` ở trang liên hệ để gắn
 * ContactPoint vào chính Organization thay vì tạo thực thể rời.
 */
export function baseNodes(contact?: Json): Json[] {
  return [website(), organization(contact), logoImage(), person()].filter(
    (n): n is Json => Boolean(n),
  );
}

// ---------------------------------------------------------------------------
// Node theo trang
// ---------------------------------------------------------------------------

export interface WebPageOpts {
  path: string;
  name: string;
  description: string;
  /** WebPage | CollectionPage | ProfilePage | ContactPage | AboutPage… */
  type?: string;
  datePublished?: string;
  dateModified?: string;
  /** Thực thể chính trang nói về (vd Taxon của cây). */
  about?: string;
  /** Node phụ thuộc trang: FAQPage, ItemList… */
  hasPart?: string[];
  primaryImage?: string;
}

export function webPage(o: WebPageOpts): Json {
  return clean({
    "@type": o.type || "WebPage",
    "@id": ID.webpage(o.path),
    url: canonical(o.path),
    name: o.name,
    description: o.description,
    isPartOf: ref(ID.website()),
    inLanguage: LANG,
    breadcrumb: ref(ID.breadcrumb(o.path)),
    primaryImageOfPage: o.primaryImage ? ref(o.primaryImage) : undefined,
    datePublished: toIsoDate(o.datePublished),
    dateModified: toIsoDate(o.dateModified),
    about: o.about ? ref(o.about) : undefined,
    hasPart: o.hasPart?.map(ref),
    // KHÔNG khai `speakable`: chỉ Google News/Assistant dùng, ở vài ngôn ngữ, nên
    // site này không được lợi gì — trong khi `cssSelector` (kiểu CssSelectorType)
    // luôn bị schema.org validator báo lỗi. Đoạn trả lời trực tiếp vẫn được đánh dấu
    // bằng class .seo-answer trong HTML cho mục đích biên tập.
  });
}

export function breadcrumbList(path: string, items: { name: string; path?: string }[]): Json {
  return {
    "@type": "BreadcrumbList",
    "@id": ID.breadcrumb(path),
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      ...(it.path ? { item: canonical(it.path) } : {}),
    })),
  };
}

export function faqPage(path: string, faq: { question: string; answer: string }[]): Json | undefined {
  if (!faq.length) return undefined;
  const ids = faqAnchorIds(faq);
  const url = canonical(path);
  return {
    "@type": "FAQPage",
    "@id": ID.faq(path),
    mainEntity: faq.map((f, i) => ({
      "@type": "Question",
      name: f.question,
      url: `${url}#${ids[i]}`,
      acceptedAnswer: { "@type": "Answer", text: plain(f.answer) },
    })),
  };
}

export interface ArticleOpts {
  headline: string;
  description: string;
  path: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  articleSection?: string;
  keywords?: string[];
  /** @id của thực thể bài viết nói về (Taxon). */
  about?: string;
  sources?: { title: string; url: string; publisher?: string }[];
}

export function article(o: ArticleOpts): Json {
  return clean({
    "@type": "Article",
    "@id": ID.article(o.path),
    headline: o.headline,
    description: o.description,
    image: o.image ? ref(ID.primaryImage(o.path)) : undefined,
    isPartOf: ref(ID.webpage(o.path)),
    mainEntityOfPage: ref(ID.webpage(o.path)),
    author: ref(ID.person()),
    publisher: ref(ID.org()),
    inLanguage: LANG,
    datePublished: toIsoDate(o.datePublished),
    dateModified: toIsoDate(o.dateModified),
    articleSection: o.articleSection,
    keywords: o.keywords,
    about: o.about ? ref(o.about) : undefined,
    citation: o.sources?.map((s) =>
      clean({
        "@type": "CreativeWork",
        name: s.title,
        url: s.url,
        publisher: s.publisher ? { "@type": "Organization", name: s.publisher } : undefined,
      }),
    ),
  });
}

/** Ảnh chính của trang. `credit` lấy từ credits.json khi ảnh mượn từ Wikimedia. */
export function primaryImage(
  path: string,
  src: string,
  caption?: string,
  credit?: { creditText?: string; license?: string; acquireLicensePage?: string },
): Json | undefined {
  const url = absoluteUrl(src);
  if (!url) return undefined;
  return clean({
    "@type": "ImageObject",
    "@id": ID.primaryImage(path),
    url,
    contentUrl: url,
    caption,
    creditText: credit?.creditText,
    license: credit?.license,
    acquireLicensePage: credit?.acquireLicensePage,
  });
}

// ---------------------------------------------------------------------------
// Thực thể cây (Taxon)
// ---------------------------------------------------------------------------

/**
 * Ghép `taxonIds` thành mảng sameAs. Thứ tự: Wikidata → Wikipedia vi → en → POWO
 * → GBIF. Trường trống bị bỏ qua; không có gì thì trả mảng rỗng để `clean()` xoá key.
 */
export function taxonSameAs(ids?: HerbalMedicine["taxonIds"]): string[] {
  if (!ids) return [];
  const out: string[] = [];
  if (ids.wikidata) out.push(`https://www.wikidata.org/wiki/${ids.wikidata}`);
  if (ids.wikipediaVi) out.push(ids.wikipediaVi);
  if (ids.wikipediaEn) out.push(ids.wikipediaEn);
  if (ids.powo) out.push(`https://powo.science.kew.org/taxon/${ids.powo}`);
  if (ids.gbif) out.push(`https://www.gbif.org/species/${ids.gbif}`);
  return out;
}

/**
 * Thực thể cây. LUÔN gọi với `herbPath` = trang thu mua, kể cả từ trang hub kỹ
 * thuật — hai silo phải sinh ra node giống hệt nhau để Google/LLM gộp làm một.
 *
 * `image`/`mainEntityOfPage` để dạng URL tuyệt đối chứ không phải `{@id}`: node này
 * còn được phát trên trang hub, nơi các node của trang thu mua không tồn tại — tham
 * chiếu bằng @id sẽ treo lơ lửng.
 */
export function taxon(herb: HerbalMedicine, herbPath: string): Json {
  const sci = herb.scientificName?.trim();
  return clean({
    "@type": "Taxon",
    "@id": ID.taxon(herbPath),
    name: herb.name,
    // Tên Latin đi vào alternateName + additionalProperty, KHÔNG dùng
    // `scientificName`/`TaxonName`: hai thứ đó thuộc phần mở rộng Bioschemas chứ
    // không có trong schema.org core, nên validator báo lỗi. alternateName vẫn là
    // chỗ đúng nghĩa (Latin đúng là một tên gọi khác của cây) và vẫn giúp khớp thực thể.
    alternateName: [...(herb.otherNames ?? []), ...(sci ? [sci] : [])],
    taxonRank: "species",
    additionalProperty: sci
      ? {
          "@type": "PropertyValue",
          name: "Tên khoa học",
          propertyID: "scientificName",
          value: sci,
        }
      : undefined,
    description: herb.bioCharacteristics?.slice(0, 300),
    image: absoluteUrl(herb.image),
    // Chỉ `mainEntityOfPage`, không kèm `url`: hai thuộc tính cùng trỏ một địa chỉ,
    // mà mainEntityOfPage nói rõ hơn — "trang chính viết về thực thể này".
    mainEntityOfPage: canonical(herbPath),
    sameAs: taxonSameAs(herb.taxonIds),
  });
}

/**
 * VideoObject cho carousel "Video thực địa". Google yêu cầu name + description +
 * thumbnailUrl + uploadDate; content hiện chỉ có id + title nên **không phát** —
 * thà thiếu còn hơn bịa uploadDate. Bật lại khi content bổ sung đủ trường.
 */
export function videos(): Json[] {
  return [];
}

// ---------------------------------------------------------------------------
// HowTo / ItemList
// ---------------------------------------------------------------------------

export function howTo(o: {
  path: string;
  name: string;
  description: string;
  steps: { name: string; text: string; anchor?: string }[];
}): Json | undefined {
  const steps = o.steps
    .map((s) => ({ ...s, text: s.text?.trim() ?? "" }))
    .filter((s) => s.name?.trim() && s.text);
  if (steps.length < 2) return undefined;
  const url = canonical(o.path);
  return {
    "@type": "HowTo",
    "@id": ID.howTo(o.path),
    name: o.name,
    description: o.description,
    inLanguage: LANG,
    step: steps.map((s, i) =>
      clean({
        "@type": "HowToStep",
        position: i + 1,
        name: s.name,
        text: s.text,
        url: s.anchor ? `${url}#${s.anchor}` : undefined,
      }),
    ),
  };
}

/** ItemList cho trang tổng hợp (pillar, /kien-thuc, sơ đồ trang). */
export function itemList(path: string, items: { name: string; path: string }[]): Json | undefined {
  if (!items.length) return undefined;
  return {
    "@type": "ItemList",
    "@id": ID.itemList(path),
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: canonical(it.path),
    })),
  };
}

/** ContactPoint gắn vào Organization ở trang liên hệ. */
export function contactPoint(): Json {
  return {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: SITE.email,
    url: canonical("/lien-he"),
    availableLanguage: { "@type": "Language", name: "Vietnamese", alternateName: "vi" },
  };
}
