# Workflow: /revise — sửa bản nháp theo feedback

Input: slug có bản nháp tại `knowledge/4-content/2-draft/<slug>.md` (hoặc `1-outline` nếu feedback ở giai đoạn outline, hoặc `3-finalized` nếu feedback đến sau QA) + feedback cụ thể từ người dùng. Bản nháp là Markdown theo `.agents/rules/seo-formatting-markdown.md` — không có JSON ở giai đoạn này.

## Các bước

1. Đọc bản nháp hiện tại và feedback.
2. Áp dụng đúng phần feedback yêu cầu — không nhân tiện viết lại toàn bộ các phần không được nhắc tới.
3. Rà lại checklist liên quan tới phần vừa sửa (độ dài SEO nếu sửa title/excerpt, anti-AI nếu sửa giọng văn, schema nếu thêm/bớt field).
4. Cập nhật file tại đúng vị trí cũ (`1-outline/` hoặc `2-draft/`), không tạo file mới.
5. Trình lại phần đã sửa cho người dùng xác nhận.

Nếu feedback lặp lại 1 lỗi đã từng xảy ra ở bài khác, cân nhắc gợi ý `/learn` để ghi vào `knowledge/3-pipeline/learning-loop.md` thay vì chỉ sửa 1 lần.
