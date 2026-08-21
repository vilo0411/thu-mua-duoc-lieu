---
name: seo-optimize
description: Tối ưu 1 bài viết SEO đã publish trong content/wiki/ hoặc content/wiki-hub/ — bắt buộc phân tích SERP/outline/nội dung đối thủ trước để đề xuất CẬP NHẬT TỪNG PHẦN hay VIẾT LẠI TOÀN BỘ, rồi áp khung 7-Sweeps (Clarity, Voice, So What, Prove It, Specificity, Emotion, Zero Risk). Dùng khi người dùng gõ /seo-optimize hoặc yêu cầu "tối ưu bài viết", "seo-optimize", "audit và viết lại bài đã publish".
---

Đọc và thực thi đầy đủ theo đúng thứ tự, không bỏ qua bước nào:

1. `.agents/rules/seo-content-anti-ai.md`
2. `.agents/rules/seo-formatting-json.md`
3. `.agents/rules/seo-formatting-markdown.md`
4. `.agents/workflows/seo-optimize.md`

Slug hoặc đường dẫn file JSON của bài cần tối ưu lấy từ tham số người dùng cung cấp kèm lệnh (nếu không có, hỏi lại người dùng). Làm theo đúng các bước Intake (xuất bản nháp `.md` vào `knowledge/4-content/2-draft/`) → Audit → Proposal (dừng chờ xác nhận) → Rewrite (7 Sweeps, sửa trên `.md`) → Self-check → `/approve` để ghi JSON ngược lại `content/wiki/` hoặc `content/wiki-hub/`, mô tả trong `.agents/workflows/seo-optimize.md`. Không sửa JSON trực tiếp trong `content/` ở bất kỳ bước nào trước `/approve`.
