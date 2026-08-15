/**
 * Kiểm tính hợp lệ HTML của mọi trang đã prerender. Chạy ở postbuild, SAU prerender.ts.
 *
 * Tiêu chí nghiệm thu của dự án là "mở https://validator.w3.org/ phải pass", nhưng bản
 * offline của bộ kiểm đó (vnu) cần Java — máy dev không có. `html-validate` là bộ kiểm
 * thuần npm, bắt gần như trọn vẹn nhóm lỗi cấu trúc mà Nu bắt (lồng thẻ sai, con trực
 * tiếp không hợp lệ của ul/dl/table, id trùng, giá trị ARIA sai, datetime sai định dạng)
 * nên nó gác cổng ở mọi lần build. `validate-w3c.ts` mới là bản đối chiếu với Nu thật,
 * chạy tay trước release vì cần mạng.
 *
 * Cấu hình rule nằm ở .htmlvalidate.json — đã tắt các rule thuộc phạm trù văn phong mà
 * Nu không coi là lỗi, để build không đỏ vì thứ W3C vốn cho qua. Đáng chú ý nhất là
 * `no-redundant-role`: site cố ý viết `role="list"` trên các `<ul>` đã bỏ bullet, vì
 * Safari/VoiceOver gỡ ngữ nghĩa danh sách khi `list-style: none` — thừa với HTML nhưng
 * không thừa với người dùng trình đọc màn hình.
 *
 * Biết trước một khoảng hở: html-validate mô hình nội dung hợp lệ của `<dl> > <div>`
 * lỏng hơn Nu. Phần đó được canh bù bằng một kiểm tra riêng trong validate-semantics.ts.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { HtmlValidate, formatterFactory, type Result } from "html-validate";
import { ROOT, htmlFiles } from "./lib/dist-html.js";

// html-validate v11 không tự dò .htmlvalidate.json khi dùng qua API, nên nạp tay —
// đồng thời giữ file đó làm nguồn duy nhất cho cả IDE lẫn script này.
const config = JSON.parse(readFileSync(join(ROOT, ".htmlvalidate.json"), "utf8"));
const validator = new HtmlValidate(config);

// Kiểm cả stub redirect: chúng cũng là HTML mà Google tải về.
const files = htmlFiles();
let checked = 0;
let errorCount = 0;
const reports: Result[] = [];

for (const file of files) {
  const report = await validator.validateString(readFileSync(file, "utf8"), file);
  checked++;
  if (!report.valid) {
    errorCount += report.errorCount;
    reports.push(...report.results);
  }
}

if (reports.length > 0) {
  const format = formatterFactory("stylish");
  console.error(format(reports));
  console.error(`\n✗ HTML không hợp lệ: ${errorCount} lỗi trên ${checked} trang.`);
  console.error("  Sửa hết rồi mới tới bước đối chiếu validator.w3.org.");
  process.exit(1);
}

console.log(`✓ HTML hợp lệ: ${checked} trang, 0 lỗi.`);
