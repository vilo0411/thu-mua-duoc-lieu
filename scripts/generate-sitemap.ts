/**
 * Sinh sitemap tại build time (PRD §8.4). Chạy ở bước postbuild → ghi các file
 * sitemap-*.xml vào dist/.
 *
 * URL dùng origin canonical trong content/site.json (ghi đè bằng env SITE_URL nếu
 * cần cho từng môi trường deploy). Chỉ sinh combo cây × vùng CÓ THỰC — dựa trên
 * mảng regions của từng cây (PRD §11.2).
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { collectRoutes } from "./lib/routes";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT = join(ROOT, "content");
const DIST = join(ROOT, "dist");

const site = JSON.parse(readFileSync(join(CONTENT, "site.json"), "utf8"));
const ORIGIN = (process.env.SITE_URL || site.siteUrl).replace(/\/$/, "");

const routes = collectRoutes();

const today = new Date().toISOString().slice(0, 10);

function url(path: string): string {
  const clean = path === "/" ? "/" : `/${path.replace(/^\//, "").replace(/\/$/, "")}`;
  return `${ORIGIN}${clean === "/" ? "/" : clean}`;
}

function urlset(paths: string[]): string {
  const items = paths
    .map((p) => `  <url>\n    <loc>${url(p)}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>\n`;
}

const moneyPaths = routes.money;
const wikiPaths = routes.wiki;
const staticPaths = routes.static;

if (!existsSync(DIST)) mkdirSync(DIST, { recursive: true });

writeFileSync(join(DIST, "sitemap-money.xml"), urlset(moneyPaths));
writeFileSync(join(DIST, "sitemap-wiki.xml"), urlset(wikiPaths));
writeFileSync(join(DIST, "sitemap-static.xml"), urlset(staticPaths));

const index = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${ORIGIN}/sitemap-static.xml</loc><lastmod>${today}</lastmod></sitemap>
  <sitemap><loc>${ORIGIN}/sitemap-money.xml</loc><lastmod>${today}</lastmod></sitemap>
  <sitemap><loc>${ORIGIN}/sitemap-wiki.xml</loc><lastmod>${today}</lastmod></sitemap>
</sitemapindex>
`;
writeFileSync(join(DIST, "sitemap-index.xml"), index);

const total = moneyPaths.length + wikiPaths.length + staticPaths.length;
console.log(`✓ Sitemap: ${total} URL (money ${moneyPaths.length}, wiki ${wikiPaths.length}, static ${staticPaths.length}) → dist/ với origin ${ORIGIN}`);
