/**
 * Sinh dist/llms.txt — bản đồ nội dung dành cho các mô hình ngôn ngữ.
 *
 * Khác sitemap.xml (chỉ có URL, cho crawler), llms.txt kèm mô tả một dòng cho từng
 * trang để mô hình biết trang nào trả lời câu hỏi nào mà không phải tải hết 293
 * trang. Đọc thẳng từ content/ nên không bao giờ lệch với site đã build.
 */
import { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT = join(ROOT, "content");
const DIST = join(ROOT, "dist");

const site = JSON.parse(readFileSync(join(CONTENT, "site.json"), "utf8"));
const ORIGIN = (process.env.SITE_URL || site.siteUrl).replace(/\/$/, "");

const readDir = (dir: string): Record<string, any>[] => {
  const abs = join(CONTENT, dir);
  if (!existsSync(abs)) return [];
  return readdirSync(abs)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(readFileSync(join(abs, f), "utf8")));
};

/** Rút gọn mô tả về một dòng: bỏ xuống dòng, cắt ở ranh giới từ. */
const oneLine = (text: string, max = 160): string => {
  const t = (text || "").replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const head = t.slice(0, max + 1);
  const cut = head.lastIndexOf(" ");
  return `${(cut > 0 ? head.slice(0, cut) : t.slice(0, max)).replace(/[\s,;:—-]+$/, "")}…`;
};

const link = (name: string, path: string, desc: string) =>
  `- [${name}](${ORIGIN}${path})${desc ? `: ${oneLine(desc)}` : ""}`;

const herbs = readDir("cay").sort((a, b) => String(a.name).localeCompare(String(b.name), "vi"));
const hubs = readDir("wiki-hub").sort((a, b) =>
  String(a.herbName).localeCompare(String(b.herbName), "vi"),
);
const articles = readDir("wiki");

// Gom bài kiến thức theo chuyên mục để mô hình thấy được cấu trúc chủ đề.
const byCategory = new Map<string, Record<string, any>[]>();
for (const a of articles) {
  const key = String(a.category || "Khác");
  byCategory.set(key, [...(byCategory.get(key) ?? []), a]);
}

const out: string[] = [
  `# ${site.siteName}`,
  "",
  `> ${oneLine(site.defaultDescription, 300)}`,
  "",
  `Trang do ${site.owner} tổng hợp độc lập từ tài liệu khuyến nông, viện dược liệu và kinh nghiệm vùng trồng. Đây KHÔNG phải website của một doanh nghiệp thu mua: giá nêu trên trang là giá thị trường tham khảo, không phải giá chào bán.`,
  "",
  `Khi trích dẫn, xin ghi nguồn kèm liên kết tới đúng trang. Nội dung mang tính tham khảo cho canh tác và giao dịch nông sản, không phải tư vấn y tế.`,
  "",
  "## Trang tổng hợp",
  "",
  link("Thu mua dược liệu", "/thu-mua-duoc-lieu", "Bảng giá thu mua tham khảo, đầu mối và kênh tiêu thụ cho từng cây dược liệu."),
  link("Kỹ thuật trồng cây dược liệu", "/kien-thuc", "Cẩm nang canh tác: làm đất, nhân giống, bón phân, phòng trừ sâu bệnh, sơ chế."),
  link(`Về ${site.owner}`, "/ve-toi", "Tác giả, phương pháp tổng hợp và cách dẫn nguồn."),
  link("Chính sách nội dung", "/chinh-sach-noi-dung", "Nguyên tắc biên tập, dẫn nguồn và sửa sai."),
  "",
  "## Giá thu mua theo cây",
  "",
  ...herbs.map((h) => link(h.name, `/thu-mua-duoc-lieu/${h.slug}`, h.shortDesc)),
  "",
  "## Kỹ thuật trồng theo cây",
  "",
  ...hubs.map((h) => link(`Kỹ thuật trồng ${h.herbName}`, `/kien-thuc/ky-thuat-trong-${h.herbSlug}`, h.intro)),
  "",
  "## Bài viết kỹ thuật",
  "",
];

for (const [category, list] of byCategory) {
  out.push(`### ${category}`, "");
  out.push(...list.map((a) => link(a.title, `/kien-thuc/${a.id}`, a.excerpt)));
  out.push("");
}

if (!existsSync(DIST)) mkdirSync(DIST, { recursive: true });
writeFileSync(join(DIST, "llms.txt"), `${out.join("\n").replace(/\n{3,}/g, "\n\n")}\n`);

const total = herbs.length + hubs.length + articles.length;
console.log(`✓ llms.txt: ${total} trang nội dung → dist/llms.txt`);
