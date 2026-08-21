/**
 * QA tự động cho pipeline SEO content (thay thế audit "bằng mắt" ở /approve và /seo-optimize).
 * Enforce các rule đếm được trực tiếp từ `.agents/rules/rules-summary.md` + `seo-content-anti-ai.md`:
 * độ dài seoTitle/excerpt, số câu/đoạn, độ dài câu, cụm từ AI-vibe bị cấm.
 *
 * Chạy:
 *   tsx scripts/qa-content.ts draft <đường-dẫn.md>   → audit 1 file draft/finalized markdown
 *   tsx scripts/qa-content.ts dup                    → quét trùng lặp nội dung wiki-hub đã publish
 *
 * Exit: 0 = PASS, 1 = FAIL (có lỗi CRITICAL/MAJOR), 2 = lỗi input (file không tồn tại...)
 */
import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT = join(ROOT, "content");
const OUT_DIR = join(ROOT, "scripts", "output");

type Severity = "CRITICAL" | "MAJOR" | "MINOR";
interface Issue {
  severity: Severity;
  where: string;
  message: string;
}

// Cụm "AI-vibe" bị cấm — nguồn: .agents/rules/seo-content-anti-ai.md
const FORBIDDEN_PHRASES = [
  "trong thời đại số",
  "công nghệ 4.0",
  "tóm lại",
  "nhìn chung",
  "có thể nói rằng",
  "đóng vai trò quan trọng",
  "đóng vai trò không thể thiếu",
  "tuyệt vời",
  "hoàn hảo",
  "tối ưu nhất",
];

function countWords(s: string): number {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

// Heuristic: coi dấu . ! ? theo sau bởi khoảng trắng + chữ hoa là ranh giới câu.
// Tránh split sai ở số thập phân (5.8 – 6.2) vì sau số không có chữ hoa ngay sau.
function splitSentences(paragraph: string): string[] {
  const cleaned = paragraph.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1"); // bỏ markdown link, giữ anchor text
  const parts = cleaned.split(/(?<=[.!?])\s+(?=[A-ZÀ-Ỹ])/g);
  return parts.map((p) => p.trim()).filter(Boolean);
}

function parseFrontmatter(raw: string): { fm: Record<string, string>; body: string } {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { fm: {}, body: raw };
  const fm: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^([a-zA-Z]+):\s*(.*)$/);
    if (!kv) continue;
    let val = kv[2].trim();
    val = val.replace(/^#.*$/, "").trim(); // bỏ comment cuối dòng dạng "# optional"
    val = val.replace(/^"(.*)"$/, "$1");
    fm[kv[1]] = val;
  }
  return { fm, body: m[2] ?? "" };
}

function isProseParagraph(block: string): boolean {
  const t = block.trim();
  if (!t) return false;
  if (t.startsWith("|")) return false; // bảng
  if (t.startsWith(">")) return false; // HIGHLIGHT
  if (t.startsWith("**Q:") || t.startsWith("A:")) return false; // FAQ
  if (t.startsWith("**Tiêu đề:**")) return false; // pitfall title
  if (t.startsWith("- ")) return false; // list (vd Sâu bệnh trong hub .md preview)
  return true;
}

function auditDraft(path: string): Issue[] {
  const issues: Issue[] = [];
  const raw = readFileSync(path, "utf-8");
  const { fm, body } = parseFrontmatter(raw);

  if (fm.seoTitle) {
    const len = fm.seoTitle.length;
    if (len < 50 || len > 60) {
      issues.push({
        severity: "MAJOR",
        where: "frontmatter.seoTitle",
        message: `Độ dài ${len} ký tự (mục tiêu 50-60): "${fm.seoTitle}"`,
      });
    }
  }
  if (fm.excerpt) {
    const len = fm.excerpt.length;
    if (len < 150 || len > 160) {
      issues.push({
        severity: "MAJOR",
        where: "frontmatter.excerpt",
        message: `Độ dài ${len} ký tự (mục tiêu 150-160): "${fm.excerpt}"`,
      });
    }
  }

  // Chia theo section (## heading), bỏ qua section không phải prose thường (FAQ/Sai lầm phổ biến/Bảng).
  const sections = body.split(/^## /m).slice(1);
  for (const section of sections) {
    const lines = section.split("\n");
    const heading = lines[0].trim();
    if (/^(FAQ|Sai lầm phổ biến)/.test(heading) || heading.startsWith("Bảng")) continue;

    const sectionBody = lines.slice(1).join("\n");
    const blocks = sectionBody.split(/\n\s*\n/).filter((b) => b.trim());
    for (const block of blocks) {
      if (!isProseParagraph(block)) continue;
      const flat = block.replace(/\n/g, " ").trim();
      const sentences = splitSentences(flat);
      if (sentences.length > 3) {
        issues.push({
          severity: "MINOR",
          where: `## ${heading}`,
          message: `Đoạn có ${sentences.length} câu (mục tiêu 2-3): "${flat.slice(0, 60)}..."`,
        });
      }
      for (const s of sentences) {
        const wc = countWords(s);
        if (wc > 25) {
          issues.push({
            severity: "MAJOR",
            where: `## ${heading}`,
            message: `Câu ${wc} từ (mục tiêu ≤25): "${s.slice(0, 70)}..."`,
          });
        }
      }
    }
  }

  const lowerBody = body.toLowerCase();
  for (const phrase of FORBIDDEN_PHRASES) {
    if (lowerBody.includes(phrase)) {
      issues.push({
        severity: "CRITICAL",
        where: "anti-AI blacklist",
        message: `Chứa cụm cấm: "${phrase}"`,
      });
    }
  }
  // "vừa...vừa..." lặp trong cùng câu
  const sentencesAll = body.split(/\n+/).flatMap((l) => splitSentences(l));
  for (const s of sentencesAll) {
    const matches = s.match(/\bvừa\b/gi);
    if (matches && matches.length >= 2) {
      issues.push({
        severity: "MAJOR",
        where: "anti-AI pattern",
        message: `Câu "vừa...vừa..." lặp: "${s.slice(0, 70)}..."`,
      });
    }
  }

  return issues;
}

// --- Duplicate-content scan cho content/wiki-hub (thin/near-duplicate boilerplate) ---

function normalize(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

function scanDuplicates() {
  const dir = join(CONTENT, "wiki-hub");
  const files = readdirSync(dir).filter((f) => f.endsWith(".json"));

  const stageText = new Map<string, string[]>(); // stage::controlMethod (chuẩn hoá) -> [file]
  const pestSig = new Map<string, string[]>(); // pestName set -> [file]

  for (const f of files) {
    const data = JSON.parse(readFileSync(join(dir, f), "utf-8"));
    for (const s of data.standards ?? []) {
      const key = `${normalize(s.stage)}::${normalize(s.controlMethod)}`;
      if (!stageText.has(key)) stageText.set(key, []);
      stageText.get(key)!.push(f);
    }
    const sig = (data.pests ?? [])
      .map((p: { pestName: string }) => normalize(p.pestName))
      .sort()
      .join(" | ");
    if (sig) {
      if (!pestSig.has(sig)) pestSig.set(sig, []);
      pestSig.get(sig)!.push(f);
    }
  }

  const DUP_THRESHOLD = 3; // ≥3 file dùng y hệt 1 đoạn = boilerplate, không phải trùng ngẫu nhiên
  const stageDup = [...stageText.entries()].filter(([, fs]) => fs.length >= DUP_THRESHOLD);
  const pestDup = [...pestSig.entries()].filter(([, fs]) => fs.length >= DUP_THRESHOLD);

  const totalFiles = files.length;
  const filesWithStageDup = new Set(stageDup.flatMap(([, fs]) => fs));
  const filesWithPestDup = new Set(pestDup.flatMap(([, fs]) => fs));
  const affectedFiles = new Set([...filesWithStageDup, ...filesWithPestDup]);

  let report = `# Duplicate Content Report — content/wiki-hub\n\n`;
  report += `Quét: ${totalFiles} file. **${affectedFiles.size} file (${Math.round((affectedFiles.size / totalFiles) * 100)}%)** chứa ít nhất 1 đoạn boilerplate dùng chung ≥${DUP_THRESHOLD} file khác.\n\n`;
  report += `> Đây là near-duplicate content — rủi ro SEO thật (Google Helpful Content / duplicate content dedup có thể chỉ index 1 bản đại diện, các bản còn lại không lên top). Ưu tiên viết lại các \`standards[].controlMethod\`/\`pests[]\` theo đặc thù từng cây thay vì tái sử dụng nguyên văn.\n\n`;

  report += `## Đoạn "standards" trùng lặp (stage + controlMethod y hệt)\n\n`;
  if (stageDup.length === 0) {
    report += `Không phát hiện.\n\n`;
  } else {
    for (const [key, fs] of stageDup.sort((a, b) => b[1].length - a[1].length)) {
      const [stage, method] = key.split("::");
      report += `- **${fs.length} file** dùng chung stage "${stage}": "${method.slice(0, 90)}..."\n`;
      report += `  - Files: ${fs.join(", ")}\n`;
    }
    report += `\n`;
  }

  report += `## "pests" trùng lặp (bộ sâu bệnh y hệt giữa các cây khác nhau)\n\n`;
  if (pestDup.length === 0) {
    report += `Không phát hiện.\n\n`;
  } else {
    for (const [sig, fs] of pestDup.sort((a, b) => b[1].length - a[1].length)) {
      report += `- **${fs.length} file** dùng chung bộ sâu bệnh: "${sig}"\n`;
      report += `  - Files: ${fs.join(", ")}\n`;
    }
    report += `\n`;
  }

  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });
  const outPath = join(OUT_DIR, "duplicate-content-report.md");
  writeFileSync(outPath, report, "utf-8");
  console.log(report);
  console.log(`\nBáo cáo đầy đủ: ${outPath}`);

  return affectedFiles.size;
}

function printIssues(issues: Issue[], label: string) {
  const bySeverity = { CRITICAL: 0, MAJOR: 0, MINOR: 0 };
  for (const i of issues) bySeverity[i.severity]++;

  console.log(`\n=== QA: ${label} ===`);
  if (issues.length === 0) {
    console.log("PASS — không phát hiện lỗi.");
    return;
  }
  for (const i of issues) {
    console.log(`[${i.severity}] ${i.where} — ${i.message}`);
  }
  console.log(
    `\nTổng: ${bySeverity.CRITICAL} CRITICAL, ${bySeverity.MAJOR} MAJOR, ${bySeverity.MINOR} MINOR`
  );
}

function main() {
  const [, , cmd, arg] = process.argv;

  if (cmd === "draft") {
    if (!arg || !existsSync(arg)) {
      console.error("Dùng: tsx scripts/qa-content.ts draft <đường-dẫn.md> (file không tồn tại)");
      process.exit(2);
    }
    const issues = auditDraft(arg);
    printIssues(issues, arg);
    const fail = issues.some((i) => i.severity === "CRITICAL" || i.severity === "MAJOR");
    process.exit(fail ? 1 : 0);
  }

  if (cmd === "dup") {
    const affected = scanDuplicates();
    process.exit(affected > 0 ? 1 : 0);
  }

  console.error("Dùng: tsx scripts/qa-content.ts draft <path.md> | dup");
  process.exit(2);
}

main();
