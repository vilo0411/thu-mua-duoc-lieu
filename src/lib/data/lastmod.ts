/**
 * Ngày sửa cuối của từng file content, sinh từ lịch sử git bởi
 * scripts/generate-lastmod.ts (chạy ở prebuild).
 *
 * Dùng cho `dateModified` trong JSON-LD và dòng "Cập nhật …" hiển thị trên trang —
 * Google yêu cầu ngày trong schema khớp ngày người đọc nhìn thấy, nên hai chỗ phải
 * lấy chung từ đây.
 */
import lastmodJson from "../../../content/lastmod.json";

const MAP = lastmodJson as Record<string, string>;

/** `dir` là thư mục content ("cay" | "wiki" | "wiki-hub"), `slug` là tên file không đuôi. */
export function lastModified(dir: "cay" | "wiki" | "wiki-hub", slug: string): string | undefined {
  return MAP[`${dir}/${slug}`];
}

/** Ngày cập nhật của cấu hình site — mốc cho các trang tĩnh không có file content riêng. */
export const SITE_LASTMOD: string | undefined = MAP._site;

/** Hiển thị cho người đọc: "2026-08-15" → "15/08/2026". */
export function formatVnDate(iso?: string): string | undefined {
  if (!iso) return undefined;
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m ? `${m[3]}/${m[2]}/${m[1]}` : undefined;
}
