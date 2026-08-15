import type { WikiArticle } from "../../types";

const modules = import.meta.glob<{ default: WikiArticle }>(
  "../../../content/wiki/*.json",
  { eager: true },
);

/**
 * Thứ tự hiển thị trong thư viện Kiến thức. Bài đầu tiên của mỗi chuyên mục cũng quyết định
 * thứ tự các tab chuyên mục, nên mỗi cụm mở đầu bằng bài pillar rồi tới bài chi tiết.
 * Bài không liệt kê ở đây rơi xuống cuối, giữ nguyên thứ tự alphabet của tên file.
 */
const DISPLAY_ORDER = [
  // Cụm "Kiến thức cơ bản" — cửa vào cho người mới.
  "cay-duoc-lieu-la-gi",
  "phan-loai-giong-cay-duoc-lieu",
  // Cụm nền tảng "Kỹ thuật gieo trồng".
  "ky-thuat-trong-cay-duoc-lieu",
  "dat-trong-cay-duoc-lieu",
  "gia-the-la-gi",
  "cach-tron-dat-trong-cay",
  "cach-uom-hat-giong",
  "cach-u-hat-giong",
  "cach-giam-canh",
  "nuoi-cay-mo-te-bao",
  "phan-bon-cho-cay-duoc-lieu",
  "cach-bon-lot-bon-thuc",
  "cach-diet-co-dai",
  // Cụm "Phòng trừ sâu bệnh".
  "sau-benh-hai-cay-duoc-lieu",
  "benh-than-thu",
  "benh-phan-trang",
  "benh-dom-la",
  "benh-ri-sat",
  "benh-lo-co-re-thoi-re",
  "benh-moc-suong",
  "benh-nut-than-xi-mu",
  "benh-heo-xanh-heo-vang",
  "benh-kham-la",
  "benh-moc-xam-muoi-den",
  "tuyen-trung-re",
  "cach-tri-rep-sap",
  // Cụm "Chế biến sau thu hoạch".
  "ky-thuat-so-che-duoc-lieu",
  "ky-thuat-say-duoc-lieu",
  "sao-vang-ha-tho",
  "ngam-so-che-duoc-lieu",
  "ky-thuat-u-len-men",
  "bao-quan-duoc-lieu",
  // Cụm "Tiêu chuẩn & kiểm định".
  "tieu-chuan-gacp",
  "tieu-chuan-vietgap",
  "tieu-chuan-huu-co-quoc-te",
  "tieu-chuan-gmp",
  "kiem-dinh-duoc-lieu",
  // Các bài chuyên đề khác.
  "lien-ket-ba-ben-vietmec",
  "phan-biet-cay-duoc-lieu-gia",
];

const orderOf = (id: string) => {
  const i = DISPLAY_ORDER.indexOf(id);
  return i === -1 ? DISPLAY_ORDER.length : i;
};

export const WIKI_ARTICLES: WikiArticle[] = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => orderOf(a.id) - orderOf(b.id) || a.id.localeCompare(b.id));

export const getArticleById = (id: string): WikiArticle | undefined =>
  WIKI_ARTICLES.find((a) => a.id === id);
