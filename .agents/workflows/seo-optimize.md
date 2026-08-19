# Workflow: /seo-optimize — tối ưu bài viết SEO đã publish

Nền tảng trung lập — file này được cả Claude Code và Antigravity load và thực thi trực tiếp, không có cú pháp riêng cho từng platform. Input: slug hoặc đường dẫn file JSON của 1 bài trong `content/wiki/` hoặc `content/wiki-hub/`.

Trước khi bắt đầu, load các file rule sau (bắt buộc, không bỏ qua):
- `.agents/rules/seo-content-anti-ai.md`
- `.agents/rules/seo-formatting-json.md`
- `.agents/rules/workflow-integrity.md`
- `.agents/rules/file-naming-standards.md`
- `knowledge/1-brand/reader-personas.md`
- `knowledge/3-pipeline/glossary.md`
- `knowledge/3-pipeline/learning-loop.md`
- `PRD-nguyenvietloc-duoclieu.md` mục 8 (SEO Requirements) — ít nhất §8.1–§8.3

Workflow này dùng 3 vai trò định nghĩa ở `.agents/agents/`: **SEO Collector** (Bước 2), **Brand Guardian** (Bước 2 & 4), **Quality Guardian** (Bước 5). Đây là các vai mà agent thực thi lần lượt đảm nhận, không phải tiến trình riêng.

## Bước 1 — Intake

1. Xác định file JSON đích (`content/wiki/<slug>.json` hoặc `content/wiki-hub/<slug>.json`).
2. Nếu file nằm trong `content/_drafts/wiki-yte/` → **dừng lại, từ chối**. Giải thích: nhóm bài này đang chờ cổng review YMYL/E-E-A-T (xem `content/_drafts/wiki-yte/README.md`), không tối ưu/publish qua workflow này.
3. Đọc toàn bộ file, xác định đây là `wikiArticleSchema` hay `wikiHubSchema` (2 shape khác nhau — xem `seo-formatting-json.md`).
4. Ghi lại state gốc (để so sánh diff cuối cùng) — không sửa trực tiếp cho tới khi qua Bước 3 (Proposal) và được người dùng xác nhận.

## Bước 2 — Audit

Thực hiện với vai **SEO Collector** (`.agents/agents/seo-collector.md`) cho phần đối thủ/cơ hội, và vai **Brand Guardian** (`.agents/agents/brand-guardian.md`) cho phần voice/anti-AI. **Bắt buộc gọi tool web search thật** cho vai SEO Collector — không được suy diễn nội dung đối thủ từ kiến thức có sẵn. Nếu không gọi được tool web search (lỗi/không có quyền), phải nói rõ với người dùng rằng bước SERP research bị bỏ qua, không được im lặng bỏ qua rồi trình bày như đã research. Kiểm tra và liệt kê vấn đề cụ thể, không đánh giá chung chung:
- Độ dài `title`/`seoTitle` (mục tiêu 50–60 ký tự, PRD §8.1) và `excerpt` (150–160 ký tự).
- Số lượng và hướng link nội bộ hiện có trong `paragraphs`/`intro` (wiki chung cần ≥ 3 link tới hub theo cây; kiểm tra không có link ngược chiều silo — PRD §8.3 Rule 1–2).
- Anchor text có bị lặp lại y hệt cho cùng URL đích không (kiểm tra sơ bộ trong chính bài, không cần audit toàn site).
- Cơ hội featured snippet chưa khai thác: câu hỏi trong `faq[]` có trả lời trực tiếp trong câu đầu chưa; có dữ liệu dạng bảng phù hợp `standardsTable` chưa (nếu là wiki article).
- Đoạn văn/kỹ thuật mô tả có bị mỏng, chung chung, hoặc lỗi thời không (so với kiến thức kỹ thuật thực tế về dược liệu).
- Vi phạm anti-AI: cụm mở đầu sáo rỗng, tính từ rỗng không có bằng chứng, câu "vừa...vừa..." lặp — theo `seo-content-anti-ai.md`.

## Bước 3 — Proposal (bắt buộc dừng lại chờ xác nhận trước khi sửa)

Trình bày danh sách ngắn gọn theo từng section: **giữ nguyên / cập nhật / thêm mới**, mỗi mục kèm lý do cụ thể (thiếu link nội bộ, đoạn mỏng, vi phạm anti-AI, cơ hội snippet...). Không tự ý rewrite toàn bài nếu phần lớn nội dung đã ổn — chỉ đề xuất sửa phần có vấn đề thật sự.

Chờ người dùng xác nhận proposal trước khi qua Bước 4.

## Bước 4 — Rewrite (7 Sweeps, chỉ áp dụng cho phần đã được duyệt ở Bước 3)

Áp tuần tự 7 lượt rà soát lên các đoạn được đánh dấu sửa (không cần chạy riêng biệt từng lượt như một quy trình máy móc — dùng như checklist khi viết lại):

1. **Clarity** — bỏ mơ hồ, câu tối nghĩa.
2. **Voice** — đúng giọng persona (`seo-content-anti-ai.md`), nhất quán xưng "tôi".
3. **So What** — mỗi đoạn phải trả lời được "vậy thì sao với người trồng/thu mua".
4. **Prove It** — thêm bằng chứng/số liệu có thật (không bịa).
5. **Specificity** — thay từ chung chung bằng tên kỹ thuật/vật liệu/tỷ lệ cụ thể.
6. **Emotion** — chạm đúng nỗi lo thực tế (mất mùa, hỏng cả lứa giống, bị ép giá...) khi phù hợp, không cường điệu.
7. **Zero Risk** — xử lý phản bác/lo ngại thường gặp của người đọc (vd: chi phí, độ khó thực hiện).

Giữ nguyên tuyệt đối tên field và cấu trúc JSON — chỉ thay đổi giá trị string/array item. Tuân thủ `seo-formatting-json.md` (không markdown bold, chỉ `[nhãn](url)` cho link). Khi thêm internal link mới, kiểm tra `knowledge/3-pipeline/anchor-index.md` trước để tránh trùng anchor text cho cùng URL, rồi append link vừa thêm vào file đó.

## Bước 5 — Self-check trước khi trình diff cuối

Thực hiện với vai **Quality Guardian** (`.agents/agents/quality-guardian.md`) — checklist đầy đủ nằm ở file đó (schema, độ dài SEO, internal linking, anti-AI, YMYL gate). Chạy `npm run validate:content` nếu có thể chạy lệnh. Trình bày diff cuối cùng cho người dùng review.

Sau khi người dùng xác nhận kết quả tốt, nếu rút ra bài học cụ thể chưa có trong rules, gợi ý chạy `/learn` (xem `.agents/rules/workflow-integrity.md`).
