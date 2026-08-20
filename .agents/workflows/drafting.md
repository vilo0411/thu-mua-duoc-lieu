# Workflow: /drafting — viết bản nháp Markdown từ outline đã duyệt

Input: slug có outline đã duyệt tại `knowledge/4-content/1-outline/<slug>.md`.

Load trước: `.agents/rules/seo-content-anti-ai.md`, `.agents/rules/seo-formatting-json.md`, `.agents/rules/seo-formatting-markdown.md`, `.agents/rules/file-naming-standards.md`, `knowledge/1-brand/reader-personas.md`, `knowledge/3-pipeline/glossary.md`, `knowledge/3-pipeline/learning-loop.md`, `knowledge/3-pipeline/anchor-index.md`.

## Các bước

1. Xác nhận outline tồn tại và đã được người dùng duyệt (nếu không chắc, hỏi lại thay vì tự viết từ outline chưa duyệt).
2. Viết đầy đủ nội dung theo đúng nội dung của schema đích (`wikiArticleSchema` hoặc `wikiHubSchema`, xem `src/lib/data/schema.ts`), nhưng **soạn ở dạng Markdown** đúng format `.agents/rules/seo-formatting-markdown.md` (không viết JSON ở bước này). Áp dụng 7 Sweeps ngay từ bản nháp đầu (không cần viết ẩu rồi optimize lại — xem checklist 7 Sweeps ở `.agents/workflows/seo-optimize.md` Bước 4).
3. Đảm bảo:
   - `title`/`seoTitle`/`excerpt` (trong frontmatter) đúng giới hạn ký tự (PRD §8.1).
   - Đủ ≥3 internal link tới hub liên quan nếu là wiki chung (PRD Rule 2), kiểm tra `anchor-index.md` trước khi chọn anchor text, và append link mới vào đó.
   - `id`/`slug` đúng chuẩn `file-naming-standards.md`.
   - Heading/marker đúng chính xác các mẫu quy định (`## Bảng: ...`, `## Sai lầm phổ biến`, `## FAQ`, `> HIGHLIGHT: ...`) — sai lệch sẽ làm bước chuyển JSON ở `/approve` bị bỏ sót dữ liệu.
4. Thực hiện vai **Brand Guardian** rà lại bản nháp trước khi lưu.
5. Ghi bản nháp Markdown hoàn chỉnh vào `knowledge/4-content/2-draft/<slug>.md`.
6. Trình bản nháp cho người dùng — dừng chờ xác nhận trước `/approve`. Nếu người dùng yêu cầu sửa, dùng `/revise`.
