/**
 * Tiện ích chung cho các script kiểm tra chạy trên `dist/` sau prerender.
 *
 * Tách ra vì ba script (validate-schema, validate-html, validate-semantics) đều cần
 * đúng một danh sách file và đúng một định nghĩa "trang nào thì bỏ qua" — để lệch
 * nhau thì sẽ có script kiểm cái mà script kia miễn, rất khó lần ra.
 */
import { readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
export const DIST = join(ROOT, "dist");

/** Mọi file .html trong dist, đệ quy. */
export function htmlFiles(dir: string = DIST): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const abs = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...htmlFiles(abs));
    else if (entry.name.endsWith(".html")) out.push(abs);
  }
  return out;
}

/**
 * Stub redirect (herb×vùng cũ) chỉ là meta refresh + canonical, không phải trang
 * nội dung — không có h1, không có article, không có schema. Kiểm nó là báo động giả.
 */
export const isRedirectStub = (html: string): boolean => /http-equiv="refresh"/i.test(html);

/** 404.html là shell fallback SPA của GitHub Pages, không phải trang nội dung. */
export const isSpaShell = (relPath: string): boolean => relPath === "404.html";
