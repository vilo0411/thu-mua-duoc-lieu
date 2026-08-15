/**
 * Nguồn sự thật duy nhất về danh sách URL của site (PRD §4.1, §11.2).
 * Dùng chung cho generate-sitemap.ts (sinh sitemap) và prerender.ts (sinh HTML tĩnh)
 * để hai bước không bao giờ lệch nhau về tập route.
 *
 * Chỉ sinh combo cây×vùng CÓ THỰC — dựa trên mảng `regions` của từng cây.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const CONTENT = join(ROOT, "content");

const readDir = (dir: string): any[] =>
  existsSync(join(CONTENT, dir))
    ? readdirSync(join(CONTENT, dir))
        .filter((f) => f.endsWith(".json"))
        .map((f) => JSON.parse(readFileSync(join(CONTENT, dir, f), "utf8")))
    : [];

export interface SiteRoutes {
  /** Money silo: pillar + cây (KHÔNG còn cấp vùng — đã gộp về trang cây). */
  money: string[];
  /** Wiki silo: index + hub theo cây + wiki chung. */
  wiki: string[];
  /** Trang tĩnh (home, giới thiệu, liên hệ). */
  static: string[];
  /**
   * Combo cây×vùng cũ → redirect về trang cây. Không nằm trong sitemap/`all`:
   * prerender ghi riêng thành stub HTML (canonical + meta refresh) trỏ về `to`
   * để hợp nhất tín hiệu, tránh cannibalization từ khoá cấp vùng.
   */
  redirects: { from: string; to: string }[];
  /** Toàn bộ path CÓ NỘI DUNG (đã gộp), dùng để prerender. KHÔNG gồm redirects. */
  all: string[];
}

export function collectRoutes(): SiteRoutes {
  const herbs = readDir("cay");
  const wikiArticles = readDir("wiki");
  const hubs = readDir("wiki-hub");

  const money = ["/thu-mua-duoc-lieu"];
  const redirects: { from: string; to: string }[] = [];
  for (const h of herbs) {
    const herbPath = `/thu-mua-duoc-lieu/${h.slug}`;
    money.push(herbPath);
    for (const r of h.regions ?? []) {
      redirects.push({ from: `${herbPath}/${r.regionSlug}`, to: herbPath });
    }
  }

  // Cấu hình redirect thủ công cho các đường dẫn cũ của Đương quy B và Đương quy N
  redirects.push(
    { from: "/thu-mua-duoc-lieu/duong-quy-b", to: "/thu-mua-duoc-lieu/duong-quy" },
    { from: "/thu-mua-duoc-lieu/duong-quy-n", to: "/thu-mua-duoc-lieu/duong-quy" },
    { from: "/thu-mua-duoc-lieu/duong-quy-b/bac-trung-bo", to: "/thu-mua-duoc-lieu/duong-quy" },
    { from: "/thu-mua-duoc-lieu/duong-quy-b/dong-bac", to: "/thu-mua-duoc-lieu/duong-quy" },
    { from: "/thu-mua-duoc-lieu/duong-quy-n/tay-nguyen", to: "/thu-mua-duoc-lieu/duong-quy" },
    { from: "/thu-mua-duoc-lieu/duong-quy-n/bac-trung-bo", to: "/thu-mua-duoc-lieu/duong-quy" },
    { from: "/kien-thuc/ky-thuat-trong-duong-quy-b", to: "/kien-thuc/ky-thuat-trong-duong-quy" },
    { from: "/kien-thuc/ky-thuat-trong-duong-quy-n", to: "/kien-thuc/ky-thuat-trong-duong-quy" }
  );

  const wiki = ["/kien-thuc"];
  for (const hub of hubs) wiki.push(`/kien-thuc/ky-thuat-trong-${hub.herbSlug}`);
  for (const a of wikiArticles) wiki.push(`/kien-thuc/${a.id}`);

  const staticPaths = [
    "/",
    "/ve-toi",
    "/lien-he",
    "/chinh-sach-bao-mat",
    "/dieu-khoan-su-dung",
    "/mien-tru-trach-nhiem",
    "/chinh-sach-noi-dung",
    "/so-do-trang",
  ];

  return {
    money,
    wiki,
    static: staticPaths,
    redirects,
    all: [...staticPaths, ...money, ...wiki],
  };
}
