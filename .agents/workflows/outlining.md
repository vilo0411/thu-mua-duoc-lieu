# Workflow: /outlining — research SERP + tạo outline

Input: 1 keyword/slug đã chọn (từ `/keyword-plan` hoặc do người dùng chỉ định trực tiếp).

Load trước: `.agents/rules/seo-formatting-json.md`, `.agents/rules/file-naming-standards.md`, `knowledge/1-brand/reader-personas.md`, `knowledge/3-pipeline/glossary.md`.

## Các bước

1. Xác định loại trang đích: wiki chung (`wikiArticleSchema`) hay hub theo cây (`wikiHubSchema`) — 2 schema khác field, xem `seo-formatting-json.md`.
2. Thực hiện vai **SEO Collector** (`.agents/agents/seo-collector.md`): research SERP, xác định search intent, gap đối thủ.
3. Xác định persona chính (`knowledge/1-brand/reader-personas.md`) và search intent (thông tin / hướng dẫn / so sánh).
4. Xây outline theo đúng shape field của schema đích:
   - Wiki chung: danh sách `contentSections[].heading` dự kiến, có cần `standardsTable` không, có `pitfall` không, danh sách câu hỏi dự kiến cho `faq[]`, tối thiểu 3 hub dự kiến sẽ link tới (PRD Rule 2).
   - Hub: các `standards[]` (stage/criteria/controlMethod) và `pests[]` (pestName/symptoms/remedy) dự kiến, danh sách `faq[]` dự kiến.
5. Ghi outline vào `knowledge/4-content/1-outline/<slug>.md` (Markdown outline, chưa phải JSON cuối).
6. Trình outline cho người dùng — **dừng lại chờ xác nhận** trước khi `/drafting` (theo `.agents/rules/workflow-integrity.md`).

Nếu chủ đề chạm vào công dụng sức khỏe/chữa bệnh, đánh dấu rõ trong outline là "có khả năng thuộc YMYL — sẽ đi vào `content/_drafts/wiki-yte/` khi hoàn thiện, không publish thẳng".
