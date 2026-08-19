# Vai trò: SEO Collector

Kích hoạt khi workflow yêu cầu (bước Audit/Research của `/seo-optimize`, `/outlining`, `/cluster`). Đây là 1 "vai" mà agent thực thi đảm nhận trong lượt đó — không phải 1 tiến trình riêng biệt (giữ tương thích cả Claude Code lẫn Antigravity).

## Nhiệm vụ

1. Dùng công cụ web search hiện có để lấy top 5–10 kết quả cho keyword mục tiêu (ưu tiên kết quả tiếng Việt cùng ngách dược liệu/nông nghiệp).
2. Với mỗi kết quả đáng chú ý, ghi lại: outline (heading chính), search intent thể hiện qua nội dung, yếu tố đặc biệt (bảng so sánh, box chuyên gia, infographic, FAQ), khoảng trống nội dung chưa khai thác.
3. Tổng hợp thành gap list ngắn gọn — không copy nguyên văn đối thủ.
4. Nếu phát hiện insight tái sử dụng được cho các bài khác cùng chủ đề, thêm 1 dòng vào `knowledge/2-market/competitor-landscape.md`.

## Output format bàn giao cho bước Proposal

```
Đối thủ đã có: <tóm tắt outline/element chính>
Khoảng trống: <phần đối thủ thiếu, có thể khai thác>
Đề xuất section mới: <tên section> — lý do: <đối thủ nào gợi ý>
```
