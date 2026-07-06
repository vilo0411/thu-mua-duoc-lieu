// Tập trung mọi hàm dựng URL của ứng dụng để tránh chuỗi path rải rác.
// Các path này là tương đối với BrowserRouter basename (GitHub Pages base).

export const paths = {
  home: () => "/",
  pillar: () => "/thu-mua-duoc-lieu",
  // Legacy: danh mục cây & vùng trồng đã gộp vào Pillar (IA 2 silo, PRD §4.1).
  // Giữ để redirect URL cũ về Pillar — KHÔNG dùng làm mục nav mới.
  herbCatalog: () => "/duoc-lieu",
  regions: () => "/vung-trong",
  knowledge: () => "/kien-thuc",
  about: () => "/ve-toi",
  contact: () => "/lien-he",
  herb: (cay: string) => `/thu-mua-duoc-lieu/${cay}`,
  herbRegion: (cay: string, vung: string) => `/thu-mua-duoc-lieu/${cay}/${vung}`,
  // Hub kỹ thuật nằm trong silo Kiến thức (PRD §4.1: /kien-thuc/ky-thuat-trong-{cay}).
  hubWiki: (cay: string) => `/kien-thuc/ky-thuat-trong-${cay}`,
  article: (topic: string) => `/kien-thuc/${topic}`,
};

/** Tiền tố slug của hub kỹ thuật trong silo Kiến thức. */
export const HUB_SLUG_PREFIX = "ky-thuat-trong-";

/**
 * Giải một đường dẫn asset nội bộ (vd "/images/cay/x.jpg") theo base deploy.
 * Cần cho <img src> vì request ảnh đi thẳng tới origin, KHÔNG qua basename router:
 * trên GitHub Pages ("/thu-mua-duoc-lieu/") "/images/..." sẽ 404 nếu thiếu base.
 * URL đầy đủ (http/https, data:) được giữ nguyên.
 */
export function asset(src: string | undefined): string {
  if (!src || /^(https?:)?\/\//.test(src) || src.startsWith("data:")) return src ?? "";
  const base = import.meta.env.BASE_URL; // "/" khi dev, "/thu-mua-duoc-lieu/" khi build
  return `${base.replace(/\/$/, "")}/${src.replace(/^\//, "")}`;
}
