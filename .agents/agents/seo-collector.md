# Vai trò: SEO Collector

Kích hoạt khi workflow yêu cầu (bước Audit/Research của `/seo-optimize`, `/outlining`, `/cluster`). Đây là 1 "vai" mà agent thực thi đảm nhận trong lượt đó — không phải 1 tiến trình riêng biệt (giữ tương thích cả Claude Code lẫn Antigravity).

## Nhiệm vụ

1. Dùng công cụ web search hiện có để search đúng keyword mục tiêu, lấy top 5–10 URL kết quả (ưu tiên kết quả tiếng Việt cùng ngách dược liệu/nông nghiệp; bỏ qua mạng xã hội, video, kết quả ads).
2. Với mỗi URL đáng chú ý (3-5 URL đại diện nhất là đủ, không cần fetch hết), fetch nội dung thật và trích **outline thật theo đúng thứ tự xuất hiện** (H1→H2→H3, không suy diễn từ snippet search) — bỏ qua phần header/nav/footer/breadcrumb/bài liên quan khi đọc, chỉ lấy vùng nội dung chính giữa H1 đầu tiên và đoạn cuối có nội dung thật.
3. Ghi lại cho mỗi đối thủ: outline (heading chính theo thứ tự), search intent thể hiện qua nội dung, số liệu/data point cụ thể có, yếu tố đặc biệt (bảng so sánh, box chuyên gia, infographic, FAQ), khoảng trống nội dung chưa khai thác.
4. Nếu không fetch được nội dung thật (lỗi tool, chặn bot...), ghi rõ "Không fetch được — chỉ dựa vào snippet search" cho URL đó thay vì suy diễn outline.
5. Tổng hợp thành gap list ngắn gọn — không copy nguyên văn đối thủ.
6. Nếu phát hiện insight tái sử dụng được cho các bài khác cùng chủ đề, thêm 1 dòng vào `knowledge/2-market/competitor-landscape.md`.

## Output format bàn giao cho bước Proposal

```
Đối thủ đã có: <tóm tắt outline/element chính theo từng đối thủ, không gộp chung>
Heading lặp lại ở ≥ 2 đối thủ: <danh sách — tín hiệu search intent mạnh>
Khoảng trống: <phần hầu hết/tất cả đối thủ đều thiếu, có thể khai thác>
Content format gap: <vd: không ai có bảng so sánh / không ai có FAQ / không ai có số liệu cụ thể>
Đề xuất Featured Snippet: <dạng Đoạn văn | Danh sách | Bảng — lý do>
Đề xuất section mới: <tên section> — lý do: <đối thủ nào gợi ý>
```
