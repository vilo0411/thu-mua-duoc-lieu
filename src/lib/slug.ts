/**
 * Slug hoá tiếng Việt để dựng id anchor ổn định cho heading/FAQ.
 *
 * Dùng chung giữa component (thuộc tính `id` thật trên DOM) và JSON-LD
 * (`Question.url`, `HowToStep.url`) — hai bên BẮT BUỘC gọi cùng hàm này, nếu lệch
 * thì schema trỏ tới anchor không tồn tại.
 */
import { norm } from "./search";

export function slugify(text: string, maxLen = 60): string {
  const s = norm(text)
    .replace(/[^a-z0-9\s-]/g, " ")
    .trim()
    .replace(/[\s-]+/g, "-");
  if (s.length <= maxLen) return s;
  // Cắt ở ranh giới từ để anchor không đứt giữa chừng.
  const head = s.slice(0, maxLen + 1);
  const cut = head.lastIndexOf("-");
  return (cut > 0 ? head.slice(0, cut) : s.slice(0, maxLen)).replace(/-+$/, "");
}

/** Id anchor của một bước trong quy trình (<ProcessSteps> ↔ HowToStep.url). */
export function stepAnchorId(stage: string): string {
  return `buoc-${slugify(stage, 40)}`;
}

/**
 * Id anchor cho cả danh sách FAQ của một trang, đã khử trùng lặp.
 * Nhận cả mảng (thay vì từng câu) để bảo đảm id là duy nhất trong trang — điều
 * kiện để `Question.url` trong schema trỏ đúng một phần tử DOM.
 */
export function faqAnchorIds(faq: { question: string }[]): string[] {
  const seen = new Map<string, number>();
  return faq.map((f, i) => {
    const base = slugify(f.question, 50) || `cau-hoi-${i + 1}`;
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    return n === 0 ? `faq-${base}` : `faq-${base}-${n + 1}`;
  });
}
