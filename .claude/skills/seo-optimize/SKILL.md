---
name: seo-optimize
description: Tối ưu 1 bài viết SEO đã publish trong content/wiki/ hoặc content/wiki-hub/ theo khung 7-Sweeps (Clarity, Voice, So What, Prove It, Specificity, Emotion, Zero Risk). Dùng khi người dùng gõ /seo-optimize hoặc yêu cầu "tối ưu bài viết", "seo-optimize", "audit và viết lại bài đã publish".
---

Đọc và thực thi đầy đủ theo đúng thứ tự, không bỏ qua bước nào:

1. `.agents/rules/seo-content-anti-ai.md`
2. `.agents/rules/seo-formatting-json.md`
3. `.agents/workflows/seo-optimize.md`

Slug hoặc đường dẫn file JSON của bài cần tối ưu lấy từ tham số người dùng cung cấp kèm lệnh (nếu không có, hỏi lại người dùng). Làm theo đúng các bước Intake → Audit → Proposal (dừng chờ xác nhận) → Rewrite (7 Sweeps) → Self-check mô tả trong `.agents/workflows/seo-optimize.md`.
