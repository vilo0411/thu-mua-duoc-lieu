/**
 * Sinh content/lastmod.json — bản đồ "file content → ngày sửa cuối (ISO)".
 *
 * Lấy từ lịch sử git thay vì mtime của filesystem: clone/checkout mới sẽ đặt mtime
 * = thời điểm checkout, khiến mọi trang đột nhiên "vừa cập nhật" — tín hiệu sai cho
 * Google. Ngày git mới phản ánh đúng lần sửa nội dung thật.
 *
 * Chạy ở prebuild. Kết quả dùng cho cả `dateModified` trong JSON-LD lẫn `<lastmod>`
 * trong sitemap, để hai nơi không bao giờ lệch nhau.
 */
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT = join(ROOT, "content");
const DIRS = ["cay", "wiki", "wiki-hub"] as const;

const today = new Date().toISOString().slice(0, 10);

/** Ngày commit cuối chạm vào file, dạng YYYY-MM-DD. Rỗng nếu file chưa được commit. */
function gitLastModified(relPath: string): string | undefined {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cs", "--", relPath], {
      cwd: ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Khoá theo giá trị BÊN TRONG file, không theo tên file: một số hub lệch tên
 * (ky-thuat-trong-actiso.json nhưng herbSlug "atiso"), tra theo tên file sẽ trượt.
 */
function logicalKey(dir: (typeof DIRS)[number], json: Record<string, string>): string | undefined {
  if (dir === "cay") return json.slug;
  if (dir === "wiki") return json.id;
  return json.herbSlug; // wiki-hub: khoá theo cây, khớp với URL /kien-thuc/ky-thuat-trong-{cay}
}

const map: Record<string, string> = {};

for (const dir of DIRS) {
  const abs = join(CONTENT, dir);
  if (!existsSync(abs)) continue;
  for (const file of readdirSync(abs).filter((f) => f.endsWith(".json"))) {
    const rel = `content/${dir}/${file}`;
    const key = logicalKey(dir, JSON.parse(readFileSync(join(abs, file), "utf8")));
    if (!key) {
      throw new Error(`${rel}: thiếu trường khoá (slug/id/herbSlug) để dựng lastmod`);
    }
    // File mới chưa commit → dùng ngày build, đúng nghĩa "vừa thay đổi".
    map[`${dir}/${key}`] = gitLastModified(rel) ?? today;
  }
}

map["_site"] = gitLastModified("content/site.json") ?? today;

const outPath = join(CONTENT, "lastmod.json");
writeFileSync(outPath, `${JSON.stringify(map, null, 2)}\n`);
console.log(`✓ lastmod: ${Object.keys(map).length} mục → content/lastmod.json`);
