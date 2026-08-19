# Workflow: /approve — duyệt và chuyển giai đoạn pipeline

Input: slug ở giai đoạn hiện tại (`1-outline`, `2-draft`, hoặc `3-finalized`).

## Các bước

1. Xác định giai đoạn hiện tại của slug trong `knowledge/4-content/`.
2. Với `1-outline` → `2-draft`: xác nhận outline đã được người dùng duyệt rõ ràng trong hội thoại, sau đó có thể chạy tiếp `/drafting`.
3. Với `2-draft` → `3-finalized`: thực hiện vai **Quality Guardian** (`.agents/agents/quality-guardian.md`) — chạy đầy đủ checklist (schema, độ dài SEO, internal linking, anti-AI, YMYL gate). Chỉ chuyển giai đoạn nếu tất cả pass.
4. Với `3-finalized` → publish: copy file JSON sang `content/wiki/` hoặc `content/wiki-hub/` (theo `id`/tên file đã chuẩn ở `file-naming-standards.md`); nếu nội dung thuộc YMYL, copy vào `content/_drafts/wiki-yte/` thay vì `content/wiki/` và dừng — không tự publish tiếp.
5. Chạy `npm run validate:content` sau khi copy vào `content/` để xác nhận pass schema thực tế.
6. Báo kết quả cho người dùng, kèm đường dẫn file cuối cùng.

Không bỏ qua bước nào kể cả khi người dùng có vẻ vội — nếu cần rút gọn, hỏi rõ người dùng có muốn bỏ qua QA hay không thay vì tự quyết.
