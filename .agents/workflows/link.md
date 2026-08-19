# Workflow: /link — rà và sửa internal linking

Input: 1 slug cụ thể, hoặc 1 cây/chủ đề để rà nhiều bài liên quan.

## Các bước

1. Đọc `PRD-nguyenvietloc-duoclieu.md` §8.3 (7 rule silo) và `knowledge/3-pipeline/anchor-index.md`.
2. Với bài đích, liệt kê link nội bộ hiện có (từ cú pháp `[nhãn](url)` trong `paragraphs`/`intro`) và kiểm tra:
   - Đúng chiều silo (Rule 1): wiki không link thẳng money trừ wiki tiêu chuẩn.
   - Đủ số lượng tối thiểu theo loại trang (Rule 2–5).
   - Anchor text không lặp y hệt cho cùng URL đích trong toàn site đã ghi nhận ở `anchor-index.md` (Rule 6).
   - Nếu có link ra landing: đúng nơi được phép, kèm UTM đúng format (Rule 7).
3. Đề xuất link cần thêm/sửa, mỗi đề xuất nêu: vị trí chèn, anchor text đề xuất, lý do (đúng rule nào).
4. Sau khi người dùng xác nhận, chỉnh sửa trực tiếp field `paragraphs`/`intro` liên quan — không đổi cấu trúc JSON khác.
5. Append các link mới vào `knowledge/3-pipeline/anchor-index.md`.

Workflow này không viết lại nội dung — chỉ thêm/sửa link. Nếu phát hiện vấn đề nội dung khác (thiếu section, giọng văn...), báo riêng và gợi ý `/seo-optimize` thay vì tự làm luôn.
