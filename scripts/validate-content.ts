/**
 * Xác thực toàn bộ dữ liệu content/ bằng Zod trước khi build (PRD §15.3).
 * Chạy: npm run validate:content  (tự chạy ở bước prebuild).
 * Thoát mã != 0 nếu có bất kỳ file JSON nào sai hình dạng → CI/CD fail sớm.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { ZodTypeAny } from "zod";
import {
  contentSchemas,
  partnerSchema,
  siteSchema,
} from "../src/lib/data/schema";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT = join(ROOT, "content");

let errors = 0;
let checked = 0;

function readJson(path: string): unknown {
  return JSON.parse(readFileSync(path, "utf8"));
}

function validate(label: string, schema: ZodTypeAny, data: unknown) {
  checked++;
  const result = schema.safeParse(data);
  if (!result.success) {
    errors++;
    console.error(`✗ ${label}`);
    for (const issue of result.error.issues) {
      console.error(`    • ${issue.path.join(".") || "(root)"}: ${issue.message}`);
    }
  }
}

// Các thư mục entity (mỗi file 1 entity).
for (const [dir, schema] of Object.entries(contentSchemas)) {
  const abs = join(CONTENT, dir);
  if (!existsSync(abs)) {
    console.error(`✗ Thiếu thư mục content/${dir}`);
    errors++;
    continue;
  }
  for (const file of readdirSync(abs).filter((f) => f.endsWith(".json"))) {
    validate(`content/${dir}/${file}`, schema, readJson(join(abs, file)));
  }
}

// partners.json (mảng) + site.json (object).
const partners = readJson(join(CONTENT, "partners.json"));
if (Array.isArray(partners)) {
  partners.forEach((p, i) => validate(`content/partners.json[${i}]`, partnerSchema, p));
  if (!partners.some((p) => p?.isFeatured)) {
    console.error("✗ content/partners.json: cần ít nhất 1 partner có isFeatured=true");
    errors++;
  }
} else {
  console.error("✗ content/partners.json phải là một mảng");
  errors++;
}
validate("content/site.json", siteSchema, readJson(join(CONTENT, "site.json")));

if (errors > 0) {
  console.error(`\n✗ Xác thực content thất bại: ${errors} lỗi trên ${checked} file.`);
  process.exit(1);
}
console.log(`✓ Content hợp lệ: ${checked} file đã kiểm tra.`);
