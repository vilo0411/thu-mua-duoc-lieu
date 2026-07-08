// One-off: đổi định vị "chuyên gia / đúc kết / biên soạn từ kinh nghiệm" →
// "người tổng hợp" trong trường intro của mọi content/wiki-hub/*.json.
// Các template đồng nhất nên thay chuỗi cố định là an toàn & idempotent.
// Chạy: `node scripts/reposition-intro.mjs`
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const dir = join(dirname(fileURLToPath(import.meta.url)), "..", "content", "wiki-hub");

const REPLACEMENTS = [
  [
    "được chuyên gia Nguyễn Viết Lộc đúc kết từ thực địa tại các vùng trồng",
    "được tôi tổng hợp từ tài liệu khuyến nông và kinh nghiệm bà con vùng trồng",
  ],
  // "Chuyên gia Nguyễn Viết Lộc tổng hợp/hướng dẫn ..." → bỏ mác "Chuyên gia"
  ["Chuyên gia Nguyễn Viết Lộc ", "Nguyễn Viết Lộc "],
  [
    "Nội dung do Nguyễn Viết Lộc biên soạn dựa trên kinh nghiệm vùng nguyên liệu",
    "Nội dung do Nguyễn Viết Lộc tổng hợp từ tài liệu khuyến nông và kinh nghiệm vùng nguyên liệu",
  ],
];

let changed = 0;
for (const f of readdirSync(dir).filter((n) => n.endsWith(".json"))) {
  const p = join(dir, f);
  let src = readFileSync(p, "utf8");
  const before = src;
  for (const [from, to] of REPLACEMENTS) src = src.split(from).join(to);
  if (src !== before) {
    writeFileSync(p, src);
    changed++;
  }
}
console.log(`Đã cập nhật ${changed} file wiki-hub.`);
