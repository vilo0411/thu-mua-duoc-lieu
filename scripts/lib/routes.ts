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
  /** Money silo: pillar + cây + combo cây×vùng có thực. */
  money: string[];
  /** Wiki silo: index + hub theo cây + wiki chung. */
  wiki: string[];
  /** Trang tĩnh (home, giới thiệu, liên hệ). */
  static: string[];
  /** Toàn bộ path (đã gộp), dùng để prerender. */
  all: string[];
}

export function collectRoutes(): SiteRoutes {
  const herbs = readDir("cay");
  const wikiArticles = readDir("wiki");
  const hubs = readDir("wiki-hub");

  const money = ["/thu-mua-duoc-lieu"];
  for (const h of herbs) {
    money.push(`/thu-mua-duoc-lieu/${h.slug}`);
    for (const r of h.regions ?? []) {
      money.push(`/thu-mua-duoc-lieu/${h.slug}/${r.regionSlug}`);
    }
  }

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
  ];

  return {
    money,
    wiki,
    static: staticPaths,
    all: [...staticPaths, ...money, ...wiki],
  };
}
