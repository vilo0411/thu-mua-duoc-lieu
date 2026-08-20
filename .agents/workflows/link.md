# Workflow: /link — rà và sửa internal linking

Input: 1 slug cụ thể, hoặc 1 cây/chủ đề để rà nhiều bài liên quan.

## Các bước

1. Đọc `PRD-nguyenvietloc-duoclieu.md` §8.3 (7 rule silo) và `knowledge/3-pipeline/anchor-index.md`.
2. Với bài đích, liệt kê link nội bộ hiện có (từ cú pháp `[nhãn](url)` trong `paragraphs`/`intro`) và kiểm tra:
   - Đúng chiều silo (Rule 1): wiki không link thẳng money trừ wiki tiêu chuẩn.
   - Đủ số lượng tối thiểu theo loại trang (Rule 2–5).
   - Anchor text không lặp y hệt cho cùng URL đích trong toàn site đã ghi nhận ở `anchor-index.md` (Rule 6).
   - Nếu có link ra landing: đúng nơi được phép, kèm UTM đúng format (Rule 7).
   - **URL có thật:** trước khi đề xuất bất kỳ link mới nào, xác nhận file JSON đích thật sự tồn tại trong `content/wiki/`, `content/wiki-hub/` hoặc `content/cay/` (đối chiếu `scripts/lib/routes.ts` để suy ra đúng path URL) — không tự đoán slug từ tên bài.
3. Tìm cơ hội link theo **ngữ nghĩa/chủ đề liên quan**, không chỉ theo khớp từ khóa y hệt trong câu có sẵn. Một đoạn văn nói về cùng chủ đề, khái niệm liên quan, hoặc bước tiếp theo tự nhiên của quy trình đang mô tả đều là cơ hội hợp lệ — kể cả khi cụm từ khóa chính xác của trang đích không xuất hiện nguyên văn.
4. Nếu không có câu sẵn nào phù hợp để gắn link tự nhiên, được phép **viết thêm 1 câu hoặc mở rộng 1 câu hiện có** (ngắn, đúng giọng văn bài viết, không lạc chủ đề) chỉ để tạo chỗ gắn link tự nhiên — không viết lại cả đoạn.
5. Đề xuất link cần thêm/sửa, mỗi đề xuất nêu: vị trí chèn, anchor text đề xuất (đa dạng, đọc tự nhiên trong câu — không gượng ép nhồi từ khóa), nội dung câu mới/mở rộng (nếu có), lý do (đúng rule nào + vì sao liên quan ngữ nghĩa).
6. Sau khi người dùng xác nhận, chỉnh sửa trực tiếp field `paragraphs`/`intro` liên quan — không đổi cấu trúc JSON khác.
7. Append các link mới vào `knowledge/3-pipeline/anchor-index.md`.
8. Nếu vừa sửa nhiều bài hoặc cả 1 cây/chủ đề trong 1 lượt, chạy `npm run link-graph` để sinh báo cáo (`scripts/output/link-graph.html`) và kiểm tra không phát sinh orphan page mới hoặc link vi phạm silo ngoài phạm vi vừa sửa.

Workflow này tập trung vào link, được phép thêm câu ngắn để làm chỗ gắn link tự nhiên (bước 4), nhưng không viết lại/tái cấu trúc nội dung bài. Nếu phát hiện vấn đề nội dung khác (thiếu section, giọng văn...), báo riêng và gợi ý `/seo-optimize` thay vì tự làm luôn.
