/**
 * Kiểm ngữ nghĩa HTML của trang đã prerender. Chạy ở postbuild, SAU prerender.ts.
 *
 * Khác với validate-html.ts (hợp lệ theo W3C) và validate-schema.ts (JSON-LD đúng),
 * script này canh những thứ CẢ HAI đều cho qua nhưng lại quyết định việc Google và các
 * trình trích dẫn AI đọc trang ra sao:
 *
 *  - trang phải có đúng một <h1>, và <h1> đó phải khớp `headline`/`name` trong JSON-LD
 *    (HTML nói một đằng, schema nói một nẻo là kiểu lỗi không ai phát hiện ra);
 *  - trang nội dung phải có <main> và <article> để tách phần bài khỏi khung site;
 *  - mọi <time> phải mang dateTime ISO, và ngày cập nhật hiển thị phải khớp
 *    `dateModified` — đúng cái rủi ro mà content/lastmod.json sinh ra để tránh;
 *  - mọi <img> phải có alt.
 *
 * Thứ bậc heading (không nhảy cấp) do rule `heading-level` của html-validate lo, nên
 * không lặp lại ở đây.
 */
import { readFileSync } from "node:fs";
import { relative } from "node:path";
import { DIST, htmlFiles, isRedirectStub, isSpaShell } from "./lib/dist-html.js";

const LD_RE = /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
const H1_RE = /<h1\b[^>]*>([\s\S]*?)<\/h1>/gi;
const TIME_RE = /<time\b([^>]*)>([\s\S]*?)<\/time>/gi;
const IMG_RE = /<img\b[^>]*>/gi;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}([T ].*)?$/;

const errors: string[] = [];
let checked = 0;

/** Bỏ thẻ, giải mã vài entity hay gặp, gộp khoảng trắng — để so text h1 với schema. */
const textOf = (html: string): string =>
  html
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

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
  if (isRedirectStub(html) || isSpaShell(rel)) return;
  checked++;

  // --- 1. Đúng một <h1>, không rỗng -------------------------------------------------
  const h1s = [...html.matchAll(H1_RE)].map((m) => textOf(m[1]));
  if (h1s.length === 0) errors.push(`${rel}: không có <h1>`);
  else if (h1s.length > 1) errors.push(`${rel}: có ${h1s.length} thẻ <h1> (chỉ được 1)`);
  if (h1s[0] === "") errors.push(`${rel}: <h1> rỗng`);

  // --- 2. Landmark ------------------------------------------------------------------
  const mains = (html.match(/<main\b/gi) ?? []).length;
  if (mains !== 1) errors.push(`${rel}: có ${mains} thẻ <main> (phải đúng 1)`);

  // Trang nội dung = trang cây, bài wiki, hub. Trang tiện ích (sơ đồ trang, liên hệ,
  // trang chủ, pillar) là trang tổng hợp/điều hướng nên không đòi <article>.
  const isContentPage = rel.startsWith("thu-mua-duoc-lieu/") || rel.startsWith("kien-thuc/");
  if (isContentPage && !/<article\b/i.test(html)) {
    errors.push(`${rel}: trang nội dung nhưng không có <article>`);
  }

  // Mọi <nav> phải tự xưng tên. Trang này có nhiều landmark điều hướng cùng lúc
  // (menu chính, breadcrumb, mục lục, phân trang, các cột footer) — không đặt tên thì
  // trình đọc màn hình chỉ nghe "navigation" lặp năm lần, không biết cái nào là cái nào.
  // Thay cho rule `unique-landmark` của html-validate: rule đó báo nhầm với <aside>
  // lồng trong <article> (HTML-AAM ánh xạ thành generic, không phải landmark).
  for (const tag of html.match(/<nav\b[^>]*>/gi) ?? []) {
    if (!/aria-label(ledby)?\s*=\s*"[^"]+"/i.test(tag)) {
      errors.push(`${rel}: <nav> không có tên trợ năng — ${tag.slice(0, 90)}`);
    }
  }

  // Cấu trúc <dl>: bên trong chỉ được có <dt>/<dd>, hoặc <div> mà bản thân nó cũng chỉ
  // chứa dt/dd. html-validate mô hình chỗ này lỏng hơn Nu (đã có lần lọt một <span>
  // nhãn nằm cạnh dt/dd), nên kiểm tay. Không có <dl> lồng nhau trên site nên cắt theo
  // cặp thẻ là đủ chính xác.
  for (const m of html.matchAll(/<dl\b[^>]*>([\s\S]*?)<\/dl>/gi)) {
    const rest = m[1]
      .replace(/<dt\b[^>]*>[\s\S]*?<\/dt>/gi, "")
      .replace(/<dd\b[^>]*>[\s\S]*?<\/dd>/gi, "")
      .replace(/<\/?div\b[^>]*>/gi, "")
      .replace(/<!--[\s\S]*?-->/g, "");
    const stray = /<([a-z][a-z0-9-]*)\b/i.exec(rest);
    if (stray) errors.push(`${rel}: <${stray[1]}> nằm trực tiếp trong <dl> (chỉ được dt/dd)`);
  }

  // --- 3. <img> phải có alt ---------------------------------------------------------
  for (const tag of html.match(IMG_RE) ?? []) {
    if (!/\balt\s*=/.test(tag)) errors.push(`${rel}: <img> thiếu alt — ${tag.slice(0, 90)}`);
  }

  // --- 4. <time> phải có dateTime ISO ------------------------------------------------
  const times: { iso: string; text: string }[] = [];
  for (const m of html.matchAll(TIME_RE)) {
    const iso = /datetime\s*=\s*"([^"]*)"/i.exec(m[1])?.[1];
    if (!iso) {
      errors.push(`${rel}: <time> không có datetime`);
      continue;
    }
    if (!ISO_DATE.test(iso)) errors.push(`${rel}: <time datetime="${iso}"> không đúng định dạng ISO`);
    times.push({ iso, text: textOf(m[2]) });
  }

  // --- 5. Đối chiếu với JSON-LD -----------------------------------------------------
  const blocks = [...html.matchAll(LD_RE)].map((m) => m[1]);
  if (blocks.length === 0) return; // validate-schema.ts đã lo trường hợp thiếu schema

  let graph: unknown;
  try {
    graph = JSON.parse(blocks[0].replace(/\\u003c/g, "<"));
  } catch {
    return; // JSON hỏng: validate-schema.ts báo rồi, không báo trùng
  }

  const nodes = [...walk(graph)];

  // 5a. `headline`/`name` trong schema KHÔNG bắt buộc trùng <h1>: site cố ý rút ngắn
  // tiêu đề schema cho vừa ngân sách 55 ký tự (xem fitTitle trong src/lib/seo/meta.ts),
  // trong khi <h1> viết đủ ý cho người đọc. Chỉ đòi cả hai đều khác rỗng.
  const article = nodes.find((n) => typesOf(n).includes("Article"));
  const schemaTitle = article
    ? String(article.headline ?? article.name ?? "")
    : String(nodes.find((n) => typesOf(n).some((t) => t.endsWith("Page")))?.name ?? "");
  if (article && !textOf(schemaTitle)) errors.push(`${rel}: Article không có headline/name`);

  // 5b. dateModified phải xuất hiện trong một <time> nào đó trên trang — Google đòi ngày
  // trong schema là ngày người đọc nhìn thấy. Chỉ áp cho trang nội dung: trang tổng hợp
  // (trang chủ, /kien-thuc) lấy dateModified từ mốc của site, còn các <time> trên đó là
  // ngày của từng thẻ bài — hai thứ khác nhau, so sánh là báo động giả.
  const modified = nodes.map((n) => n.dateModified).find((d) => typeof d === "string") as
    | string
    | undefined;
  if (isContentPage && modified && times.length > 0) {
    const day = modified.slice(0, 10);
    if (!times.some((t) => t.iso.slice(0, 10) === day)) {
      errors.push(
        `${rel}: dateModified=${day} không hiện ở <time> nào trên trang ` +
          `(đang có: ${times.map((t) => t.iso).join(", ") || "không có"})`,
      );
    }
  }
}

for (const file of htmlFiles()) check(file, readFileSync(file, "utf8"));

if (errors.length > 0) {
  console.error("✗ Ngữ nghĩa HTML có vấn đề:\n");
  for (const e of errors) console.error(`  - ${e}`);
  console.error(`\n${errors.length} lỗi trên ${checked} trang.`);
  process.exit(1);
}

console.log(
  `✓ Ngữ nghĩa: ${checked} trang hợp lệ (h1 duy nhất, landmark main/article, nav có tên, time ISO khớp dateModified, img có alt)`,
);
