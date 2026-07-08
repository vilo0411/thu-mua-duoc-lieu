/**
 * Prerender HTML tĩnh cho từng route (PRD §8 — crawlability).
 *
 * App là SPA render phía client: `dist/index.html` chỉ có <div id="root"></div>,
 * nên bot không chạy JS (Bing, scraper mạng xã hội, crawler LLM) thấy trang trắng,
 * còn Googlebot phải chờ hàng đợi render → index chậm. Bước này dựng một static
 * server phục vụ dist, mở từng route bằng trình duyệt thật (Puppeteer), đợi React
 * render + <Seo> bơm metadata vào <head>, rồi ghi DOM đã render ra
 * dist/<path>/index.html. Client vẫn tải bundle và hydrate như cũ.
 *
 * Chạy ở postbuild, SAU generate-sitemap. Cần `dist/` đã build xong.
 */
import express from "express";
import puppeteer from "puppeteer";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { Server } from "node:http";
import { collectRoutes } from "./lib/routes";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
const PORT = Number(process.env.PRERENDER_PORT || 4183);
const CONCURRENCY = Number(process.env.PRERENDER_CONCURRENCY || 4);
const NAV_TIMEOUT = 30_000;

if (!existsSync(join(DIST, "index.html"))) {
  console.error("✗ Prerender: chưa có dist/index.html — chạy `vite build` trước.");
  process.exit(1);
}

/** Static server phục vụ dist với SPA fallback (URL sâu → index.html). */
function startServer(): Promise<Server> {
  // Giữ template GỐC trong bộ nhớ: prerender sẽ ghi đè dist/index.html (trang home)
  // ngay trong lúc chạy, nên không được đọc lại từ đĩa — nếu không, các route sau
  // sẽ nhận trang đã render sẵn của home (canonical/nội dung bị nhiễm) rồi mount đè
  // lên, sinh thẻ trùng. `index: false` để static không tự trả index.html đã ghi.
  const template = readFileSync(join(DIST, "index.html"), "utf8");
  const app = express();
  app.use(express.static(DIST, { index: false }));
  // Fallback SPA: mọi navigation → template rỗng gốc để router client dựng trang.
  app.use((_req, res) => res.type("html").send(template));
  return new Promise((resolve) => {
    const server = app.listen(PORT, () => resolve(server));
  });
}

/** Đường dẫn file output cho một route logic ("/" → dist/index.html). */
function outFile(path: string): string {
  if (path === "/") return join(DIST, "index.html");
  const clean = path.replace(/^\//, "").replace(/\/$/, "");
  return join(DIST, clean, "index.html");
}

async function main() {
  const routes = collectRoutes().all;
  const server = await startServer();
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  let done = 0;
  const failed: string[] = [];
  const queue = [...routes];

  async function worker() {
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(NAV_TIMEOUT);
    for (;;) {
      const path = queue.shift();
      if (!path) break;
      try {
        await page.goto(`http://localhost:${PORT}${path}`, {
          waitUntil: "networkidle0",
        });
        // Đợi React render xong: #root có nội dung VÀ <Seo> đã bơm canonical vào <head>.
        await page.waitForFunction(
          () =>
            !!document.getElementById("root")?.childElementCount &&
            !!document.head.querySelector('link[rel="canonical"]'),
          { timeout: NAV_TIMEOUT },
        );
        const html = await page.evaluate(
          () => "<!doctype html>\n" + document.documentElement.outerHTML,
        );
        const file = outFile(path);
        mkdirSync(dirname(file), { recursive: true });
        writeFileSync(file, html);
        done++;
      } catch (err) {
        failed.push(path);
        console.warn(`  ! Bỏ qua ${path}: ${(err as Error).message.split("\n")[0]}`);
      }
    }
    await page.close();
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  await browser.close();
  server.close();

  console.log(
    `✓ Prerender: ${done}/${routes.length} trang → dist/**/index.html` +
      (failed.length ? ` (lỗi ${failed.length}: ${failed.join(", ")})` : ""),
  );
  // Route lỗi = HTML rỗng cho bot → coi là thất bại build để không deploy nhầm.
  if (failed.length) process.exit(1);
}

main().catch((err) => {
  console.error("✗ Prerender thất bại:", err);
  process.exit(1);
});
