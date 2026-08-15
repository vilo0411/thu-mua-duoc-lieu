/**
 * Đối chiếu với bộ kiểm HTML THẬT của W3C (Nu Html Checker) — chính cái chạy sau
 * https://validator.w3.org/.
 *
 * Vì sao tách khỏi postbuild: script này gọi mạng và dịch vụ có giới hạn tần suất, nên
 * không thể chạy 543 trang mỗi lần build. `validate-html.ts` (html-validate, offline)
 * mới là cổng gác thường trực; script này là bằng chứng định kỳ rằng cổng gác đó chưa
 * bỏ lọt gì so với Nu. Chạy trước mỗi lần phát hành:  npm run validate:w3c
 *
 * Bản offline của Nu (vnu-jar) cần Java — máy dev hiện không có, nên dùng API.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { DIST } from "./lib/dist-html.js";

const ENDPOINT = "https://validator.w3.org/nu/?out=json";

/** Một trang đại diện cho mỗi khuôn mẫu — thêm khuôn mới thì thêm vào đây. */
const SAMPLES = [
  { label: "trang chủ", file: "index.html" },
  { label: "pillar thu mua", file: "thu-mua-duoc-lieu.html" },
  { label: "trang cây", file: "thu-mua-duoc-lieu/ba-kich.html" },
  { label: "bài wiki", file: "kien-thuc/bao-quan-duoc-lieu.html" },
  { label: "hub kỹ thuật", file: "kien-thuc/ky-thuat-trong-ba-kich.html" },
  { label: "thư viện kiến thức", file: "kien-thuc.html" },
  { label: "sơ đồ trang", file: "so-do-trang.html" },
  { label: "liên hệ", file: "lien-he.html" },
];

interface NuMessage {
  type: string;
  subType?: string;
  message: string;
  lastLine?: number;
  firstColumn?: number;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

let failed = 0;

for (const { label, file } of SAMPLES) {
  const path = join(DIST, file);
  if (!existsSync(path)) {
    console.error(`✗ ${label} (${file}): không có file — chạy \`npm run build\` trước.`);
    failed++;
    continue;
  }

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      // Nu từ chối request không có User-Agent nhận dạng được.
      "User-Agent": "duoclieu-validate-w3c/1.0",
    },
    body: readFileSync(path),
  });

  if (!res.ok) {
    console.error(`✗ ${label}: validator trả HTTP ${res.status} ${res.statusText}`);
    failed++;
    continue;
  }

  const { messages = [] } = (await res.json()) as { messages?: NuMessage[] };
  // "error" là lỗi thật; "info/warning" Nu vẫn cho pass nên không tính là hỏng.
  const errs = messages.filter((m) => m.type === "error");

  if (errs.length === 0) {
    const warns = messages.filter((m) => m.type === "info" && m.subType === "warning").length;
    console.log(`✓ ${label} (${file}) — 0 lỗi${warns ? `, ${warns} cảnh báo` : ""}`);
  } else {
    failed++;
    console.error(`✗ ${label} (${file}) — ${errs.length} lỗi:`);
    for (const m of errs.slice(0, 20)) {
      console.error(`    dòng ${m.lastLine ?? "?"}:${m.firstColumn ?? "?"}  ${m.message}`);
    }
    if (errs.length > 20) console.error(`    … và ${errs.length - 20} lỗi nữa`);
  }

  // Nhẹ tay với dịch vụ công cộng.
  await sleep(1500);
}

if (failed > 0) {
  console.error(`\n✗ ${failed}/${SAMPLES.length} trang chưa pass validator.w3.org`);
  process.exit(1);
}
console.log(`\n✓ Cả ${SAMPLES.length} trang đại diện pass validator.w3.org`);
