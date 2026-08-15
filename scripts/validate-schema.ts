/**
 * Kiểm tra JSON-LD trong HTML đã prerender. Chạy ở postbuild, SAU prerender.ts.
 *
 * Schema hỏng thường im lặng: trang vẫn hiển thị bình thường, chỉ có công cụ tìm
 * kiếm là bỏ qua. Script này biến những lỗi đó thành build đỏ — đặc biệt là tham
 * chiếu `@id` treo (hệ quả dễ gặp nhất khi refactor các node của graph) và sự tái
 * xuất của Product/Offer (đã chủ ý loại bỏ vì site không bán hàng).
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");

const LD_RE = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}([T ].*)?$/;
const BANNED_TYPES = new Set([
  // Site không bán hàng — khai Offer là structured data gây hiểu lầm.
  "Product",
  "Offer",
  "AggregateOffer",
  // Thuộc phần mở rộng Bioschemas, không có trong schema.org core → validator báo lỗi.
  "TaxonName",
]);

/**
 * Thuộc tính trông hợp lý nhưng KHÔNG được schema.org định nghĩa cho loại đang dùng.
 * Cả ba từng lọt vào output và bị schema.org validator bắt.
 */
const BANNED_PROPS: Record<string, string> = {
  founderOf: "schema.org không có thuộc tính này cho Person — dùng Organization.founder (chiều ngược)",
  scientificName: "thuộc Bioschemas, không có trong schema.org core — dùng alternateName/additionalProperty",
  speakable: "cssSelector luôn bị validator từ chối và tính năng chỉ dành cho Google News",
};

const errors: string[] = [];
let checked = 0;

function htmlFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const abs = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...htmlFiles(abs));
    else if (entry.name.endsWith(".html")) out.push(abs);
  }
  return out;
}

/** Duyệt mọi object lồng nhau trong graph. */
function* walk(node: unknown): Generator<Record<string, unknown>> {
  if (Array.isArray(node)) {
    for (const item of node) yield* walk(item);
  } else if (node && typeof node === "object") {
    yield node as Record<string, unknown>;
    for (const v of Object.values(node as Record<string, unknown>)) yield* walk(v);
  }
}

const typesOf = (node: Record<string, unknown>): string[] => {
  const t = node["@type"];
  return Array.isArray(t) ? t.map(String) : t ? [String(t)] : [];
};

function check(file: string, html: string) {
  const rel = relative(DIST, file);

  // Stub redirect (meta refresh + noindex) cố tình không mang schema.
  if (/http-equiv="refresh"/i.test(html)) return;
  // 404.html là shell fallback SPA của GitHub Pages, không phải trang nội dung.
  if (rel === "404.html") return;

  const blocks = [...html.matchAll(LD_RE)].map((m) => m[1]);
  if (blocks.length === 0) {
    if (!/name="robots"[^>]*noindex/i.test(html)) {
      errors.push(`${rel}: không có khối ld+json nào`);
    }
    return;
  }
  if (blocks.length > 1) {
    // Nhiều thẻ = React đã nhân đôi metadata, hoặc có chỗ chèn JSON-LD ngoài <Seo>.
    errors.push(`${rel}: có ${blocks.length} khối ld+json, phải đúng 1 khối @graph`);
    return;
  }

  let data: Record<string, unknown>;
  try {
    data = JSON.parse(blocks[0]);
  } catch (e) {
    errors.push(`${rel}: ld+json không parse được (${(e as Error).message})`);
    return;
  }
  checked++;

  if (data["@context"] !== "https://schema.org") {
    errors.push(`${rel}: thiếu @context "https://schema.org"`);
  }
  const graph = data["@graph"];
  if (!Array.isArray(graph) || graph.length === 0) {
    errors.push(`${rel}: thiếu @graph hoặc @graph rỗng`);
    return;
  }

  // Node cấp cao nhất là những @id có thể được tham chiếu.
  const declared = new Set<string>();
  for (const node of graph as Record<string, unknown>[]) {
    const id = node["@id"];
    if (typeof id !== "string") continue;
    if (declared.has(id)) errors.push(`${rel}: trùng @id ${id}`);
    declared.add(id);
  }

  const typesPresent = new Set<string>();
  for (const node of walk(graph)) {
    const keys = Object.keys(node);
    for (const t of typesOf(node)) {
      typesPresent.add(t);
      if (BANNED_TYPES.has(t)) {
        errors.push(`${rel}: có @type ${t} — schema giá đã bị loại bỏ khỏi site`);
      }
    }

    for (const [prop, why] of Object.entries(BANNED_PROPS)) {
      if (prop in node) errors.push(`${rel}: thuộc tính ${prop} không hợp lệ — ${why}`);
    }

    // Tham chiếu treo: object chỉ có {"@id": …} nhưng @id đó không tồn tại trong graph.
    if (keys.length === 1 && keys[0] === "@id" && typeof node["@id"] === "string") {
      if (!declared.has(node["@id"] as string)) {
        errors.push(`${rel}: tham chiếu tới @id không tồn tại — ${node["@id"]}`);
      }
    }

    for (const field of ["datePublished", "dateModified", "uploadDate"]) {
      const v = node[field];
      if (v !== undefined && (typeof v !== "string" || !ISO_DATE.test(v))) {
        errors.push(`${rel}: ${field} không phải ISO 8601 — ${JSON.stringify(v)}`);
      }
    }

    for (const field of ["name", "headline", "text", "url"]) {
      if (node[field] === "") errors.push(`${rel}: ${field} là chuỗi rỗng`);
    }

    const sameAs = node.sameAs;
    if (sameAs !== undefined) {
      const list = Array.isArray(sameAs) ? sameAs : [sameAs];
      if (list.length === 0) errors.push(`${rel}: sameAs rỗng, nên bỏ hẳn key`);
      for (const u of list) {
        if (typeof u !== "string" || !/^https?:\/\//.test(u)) {
          errors.push(`${rel}: sameAs không phải URL tuyệt đối — ${JSON.stringify(u)}`);
        }
      }
    }
  }

  for (const required of ["WebSite", "Organization", "BreadcrumbList"]) {
    if (!typesPresent.has(required)) errors.push(`${rel}: thiếu node ${required}`);
  }
  // WebPage có nhiều biến thể (CollectionPage, ProfilePage, ContactPage…).
  if (![...typesPresent].some((t) => t.endsWith("Page"))) {
    errors.push(`${rel}: thiếu node WebPage (hoặc biến thể *Page)`);
  }
}

/**
 * Kiểm tra chéo: cùng một cây thì node Taxon trên trang thu mua và trang hub kỹ
 * thuật phải trùng khít — đó chính là thứ nối hai silo về một thực thể.
 */
function crossCheckTaxa(files: string[]) {
  const byId = new Map<string, { file: string; json: string }>();
  for (const file of files) {
    const html = readFileSync(file, "utf8");
    const m = LD_RE.exec(html);
    LD_RE.lastIndex = 0;
    if (!m) continue;
    let data: Record<string, unknown>;
    try {
      data = JSON.parse(m[1]);
    } catch {
      continue;
    }
    for (const node of (data["@graph"] as Record<string, unknown>[]) ?? []) {
      if (!typesOf(node).includes("Taxon")) continue;
      const id = String(node["@id"]);
      const json = JSON.stringify(node);
      const prev = byId.get(id);
      if (prev && prev.json !== json) {
        errors.push(
          `Taxon ${id} khác nhau giữa ${relative(DIST, prev.file)} và ${relative(DIST, file)}`,
        );
      } else if (!prev) {
        byId.set(id, { file, json });
      }
    }
  }
  return byId.size;
}

if (!existsSync(DIST)) {
  console.error("✗ Chưa có dist/ — chạy build trước.");
  process.exit(1);
}

const files = htmlFiles(DIST);
for (const file of files) check(file, readFileSync(file, "utf8"));
const taxaCount = crossCheckTaxa(files);

if (errors.length) {
  console.error(`✗ Schema: ${errors.length} lỗi\n`);
  for (const e of errors.slice(0, 40)) console.error(`  - ${e}`);
  if (errors.length > 40) console.error(`  … và ${errors.length - 40} lỗi nữa`);
  process.exit(1);
}

console.log(`✓ Schema: ${checked} trang hợp lệ, ${taxaCount} thực thể Taxon nhất quán`);
