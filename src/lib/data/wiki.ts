import type { WikiArticle } from "../../types";

const modules = import.meta.glob<{ default: WikiArticle }>(
  "../../../content/wiki/*.json",
  { eager: true },
);

const DISPLAY_ORDER = [
  // Cụm nền tảng "Kỹ thuật gieo trồng" — đứng đầu thư viện Kiến thức.
  "gia-the-la-gi",
  "cach-tron-dat-trong-cay",
  "cach-uom-hat-giong",
  "cach-u-hat-giong",
  "cach-giam-canh",
  "cach-bon-lot-bon-thuc",
  "cach-diet-co-dai",
  // Cụm "Phòng trừ sâu bệnh".
  "benh-than-thu",
  "benh-phan-trang",
  "benh-dom-la",
  "benh-ri-sat",
  "benh-lo-co-re-thoi-re",
  "benh-moc-suong",
  "benh-nut-than-xi-mu",
  "cach-tri-rep-sap",
  // Cụm "Tiêu chuẩn & kiểm định".
  "tieu-chuan-gacp",
  "tieu-chuan-gmp",
  "kiem-dinh-duoc-lieu",
  // Các bài chuyên đề khác.
  "ky-thuat-say-duoc-lieu",
  "lien-ket-ba-ben-vietmec",
  "phan-biet-cay-duoc-lieu-gia",
];

export const WIKI_ARTICLES: WikiArticle[] = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => {
    const ia = DISPLAY_ORDER.indexOf(a.id);
    const ib = DISPLAY_ORDER.indexOf(b.id);
    return (ia === -1 ? Infinity : ia) - (ib === -1 ? Infinity : ib);
  });

export const getArticleById = (id: string): WikiArticle | undefined =>
  WIKI_ARTICLES.find((a) => a.id === id);
