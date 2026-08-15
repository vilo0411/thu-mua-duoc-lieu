/**
 * Dò mã định danh loài trên Wikidata cho các cây trong content/cay, để dựng `sameAs`
 * cho node Taxon trong JSON-LD.
 *
 * KHÔNG ghi thẳng vào content. Tên Latin có đồng danh và tên đồng nghĩa, nên khớp tự
 * động có thể trỏ nhầm loài — mà `sameAs` sai thì tệ hơn không có `sameAs`. Quy trình
 * hai bước:
 *
 *   1. npx tsx scripts/fetch-taxon-ids.ts
 *      → ghi scripts/out/taxon-candidates.json để người duyệt.
 *   2. Xoá/sửa mục sai (hoặc đặt "approved": false), rồi:
 *      npx tsx scripts/fetch-taxon-ids.ts --apply
 *      → ghi `taxonIds` vào content/cay/*.json cho các mục approved.
 *
 * Chỉ khớp qua P225 (tên phân loại) đúng nguyên văn — không dùng tìm kiếm toàn văn,
 * vì tìm toàn văn hay trả về chi/họ hoặc loài gần giống.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const CAY_DIR = path.join(ROOT, "content", "cay");
const OUT_DIR = path.join(ROOT, "scripts", "out");
const OUT_FILE = path.join(OUT_DIR, "taxon-candidates.json");

const UA = "duoclieu.nguyenvietloc.com taxon-id fetcher (contact: nvloc0411@gmail.com)";
const SPARQL = "https://query.wikidata.org/sparql";

const APPLY = process.argv.includes("--apply");
/** Giới hạn slug cần xử lý, ví dụ: npx tsx scripts/fetch-taxon-ids.ts ba-kich dinh-lang */
const ONLY = process.argv.slice(2).filter((a) => !a.startsWith("--"));

interface Candidate {
  slug: string;
  name: string;
  scientificName: string;
  /** true khi P225 khớp đúng một loài — mục này gần như chắc chắn đúng. */
  confident: boolean;
  /** Đặt false để bỏ qua khi chạy --apply. Mặc định = confident. */
  approved: boolean;
  wikidata?: string;
  wikidataLabel?: string;
  wikidataDescription?: string;
  wikipediaVi?: string;
  wikipediaEn?: string;
  powo?: string;
  gbif?: string;
  /** Ứng viên khác khi P225 khớp nhiều thực thể — cần người chọn. */
  alternatives?: { id: string; label?: string; description?: string }[];
  note?: string;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Truy vấn Wikidata: lấy thực thể có P225 = tên Latin, kèm nhãn/mô tả vi+en, bài
 * Wikipedia vi/en (sitelink), GBIF (P846) và POWO (P5037) trong MỘT lượt.
 */
async function queryTaxon(scientificName: string): Promise<Candidate["alternatives"] & object> {
  const q = `
SELECT ?item ?itemLabel ?itemDescription ?gbif ?powo ?viArticle ?enArticle WHERE {
  ?item wdt:P225 "${scientificName.replace(/"/g, '\\"')}" .
  # Chỉ lấy thực thể (Q…). P225 còn dính vào lexeme (L…-S…) — nghĩa của từ, không
  # phải loài — và chúng làm kết quả trông như mơ hồ trong khi thực ra không.
  FILTER(STRSTARTS(STR(?item), "http://www.wikidata.org/entity/Q"))
  OPTIONAL { ?item wdt:P846 ?gbif . }
  OPTIONAL { ?item wdt:P5037 ?powo . }
  OPTIONAL { ?viArticle schema:about ?item ; schema:isPartOf <https://vi.wikipedia.org/> . }
  OPTIONAL { ?enArticle schema:about ?item ; schema:isPartOf <https://en.wikipedia.org/> . }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "vi,en". }
} LIMIT 10`;

  const res = await fetch(`${SPARQL}?query=${encodeURIComponent(q)}&format=json`, {
    headers: { "User-Agent": UA, Accept: "application/sparql-results+json" },
  });
  if (!res.ok) throw new Error(`Wikidata HTTP ${res.status}`);
  const json = await res.json();
  return json.results.bindings as never;
}

const val = (b: Record<string, { value: string }>, k: string) => b[k]?.value;
const qidOf = (uri?: string) => uri?.replace(/^.*\/(Q\d+)$/, "$1");

async function main() {
  const files = fs
    .readdirSync(CAY_DIR)
    .filter((f) => f.endsWith(".json"))
    .filter((f) => !ONLY.length || ONLY.includes(f.replace(/\.json$/, "")));

  if (APPLY) return apply(files);

  const out: Candidate[] = [];
  let found = 0;

  for (const file of files) {
    const herb = JSON.parse(fs.readFileSync(path.join(CAY_DIR, file), "utf8"));
    const sci = String(herb.scientificName || "").trim();
    const base = { slug: herb.slug, name: herb.name, scientificName: sci };

    if (!sci) {
      out.push({ ...base, confident: false, approved: false, note: "thiếu scientificName" });
      continue;
    }

    let rows: Record<string, { value: string }>[];
    try {
      rows = (await queryTaxon(sci)) as never;
    } catch (e) {
      out.push({ ...base, confident: false, approved: false, note: `lỗi truy vấn: ${(e as Error).message}` });
      await sleep(1200);
      continue;
    }

    if (rows.length === 0) {
      out.push({ ...base, confident: false, approved: false, note: "không tìm thấy P225 khớp" });
    } else {
      const r = rows[0];
      const confident = rows.length === 1;
      out.push({
        ...base,
        confident,
        approved: confident,
        wikidata: qidOf(val(r, "item")),
        wikidataLabel: val(r, "itemLabel"),
        wikidataDescription: val(r, "itemDescription"),
        wikipediaVi: val(r, "viArticle"),
        wikipediaEn: val(r, "enArticle"),
        powo: val(r, "powo"),
        gbif: val(r, "gbif"),
        ...(confident
          ? {}
          : {
              note: `${rows.length} thực thể cùng tên — chọn tay rồi đặt approved: true`,
              alternatives: rows.slice(1).map((x) => ({
                id: qidOf(val(x, "item"))!,
                label: val(x, "itemLabel"),
                description: val(x, "itemDescription"),
              })),
            }),
      });
      found++;
    }
    // Lịch sự với API công cộng của Wikimedia.
    await sleep(1200);
  }

  // Chạy theo slug thì GỘP vào file cũ, không ghi đè: nếu không, dò lại một cây sẽ
  // xoá sạch kết quả đã duyệt của 121 cây kia.
  let merged = out;
  if (ONLY.length && fs.existsSync(OUT_FILE)) {
    const prev: Candidate[] = JSON.parse(fs.readFileSync(OUT_FILE, "utf8"));
    const bySlug = new Map(prev.map((c) => [c.slug, c]));
    for (const c of out) bySlug.set(c.slug, c);
    merged = [...bySlug.values()].sort((a, b) => a.slug.localeCompare(b.slug));
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(OUT_FILE, `${JSON.stringify(merged, null, 2)}\n`);

  const confident = out.filter((c) => c.confident).length;
  console.log(
    `✓ Dò xong ${out.length} cây: ${found} có kết quả, ${confident} chắc chắn.\n` +
      `  Duyệt lại ${path.relative(ROOT, OUT_FILE)} rồi chạy: npx tsx scripts/fetch-taxon-ids.ts --apply`,
  );
}

function apply(files: string[]) {
  if (!fs.existsSync(OUT_FILE)) {
    console.error(`✗ Chưa có ${path.relative(ROOT, OUT_FILE)} — chạy không kèm --apply trước.`);
    process.exit(1);
  }
  const candidates: Candidate[] = JSON.parse(fs.readFileSync(OUT_FILE, "utf8"));
  const bySlug = new Map(candidates.map((c) => [c.slug, c]));
  let written = 0;

  for (const file of files) {
    const abs = path.join(CAY_DIR, file);
    const herb = JSON.parse(fs.readFileSync(abs, "utf8"));
    const c = bySlug.get(herb.slug);
    if (!c?.approved || !c.wikidata) continue;

    const ids: Record<string, string> = { wikidata: c.wikidata };
    if (c.wikipediaVi) ids.wikipediaVi = c.wikipediaVi;
    if (c.wikipediaEn) ids.wikipediaEn = c.wikipediaEn;
    if (c.powo) ids.powo = c.powo;
    if (c.gbif) ids.gbif = c.gbif;

    if (JSON.stringify(herb.taxonIds) === JSON.stringify(ids)) continue;

    // Chèn ngay sau `group` để giữ thứ tự khoá ổn định, diff dễ đọc.
    const next: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(herb)) {
      if (k === "taxonIds") continue;
      next[k] = v;
      if (k === "group") next.taxonIds = ids;
    }
    if (!next.taxonIds) next.taxonIds = ids;

    fs.writeFileSync(abs, `${JSON.stringify(next, null, 2)}\n`);
    written++;
  }

  const skipped = candidates.filter((c) => !c.approved).length;
  console.log(`✓ Ghi taxonIds cho ${written} cây. Bỏ qua ${skipped} mục chưa duyệt.`);
}

main();
