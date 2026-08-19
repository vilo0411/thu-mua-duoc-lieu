# Learning Loop — bài học tích lũy (instincts)

Ghi lại bài học **cụ thể, tái sử dụng được** rút ra sau mỗi lần `/seo-optimize`, `/drafting`, hoặc khi người dùng sửa/feedback trực tiếp — qua lệnh `/learn`. Đọc file này ở bước Intake của mọi workflow viết/sửa nội dung (đã khai trong `.agents/workflows/seo-optimize.md` và các workflow khác) để không lặp lại lỗi cũ.

## Nguyên tắc ghi

- Mỗi mục: **quy tắc rút ra** + **vì sao** (tình huống dẫn tới bài học) — không ghi chung chung kiểu "viết hay hơn".
- Không ghi thông tin đã có sẵn ở rules (`seo-content-anti-ai.md`, `seo-formatting-json.md`) — chỉ ghi cái MỚI phát sinh từ thực tế viết/sửa bài mà rules chưa có.
- Nếu 1 bài học trở nên phổ quát (áp dụng mọi bài, không riêng tình huống nào), cân nhắc nâng cấp nó vào file rule tương ứng thay vì để mãi ở đây.
## Log

- [19/08/2026] Quy tắc: Tránh dịch nguyên văn thuật ngữ nông nghiệp tiếng Anh (như "food crops" -> "cây trồng lấy ăn"), hãy dùng từ phổ thông của nhà nông Việt Nam như "cây lương thực, rau màu". — Vì sao: Phát hiện lỗi dịch gượng gạo ở câu gốc bài `cay-duoc-lieu-la-gi.json`.
- [19/08/2026] Quy tắc: Đặt section giới thiệu bảng so sánh (`standardsTable`) ở vị trí cuối cùng trong `contentSections`. — Vì sao: Bài `cay-duoc-lieu-la-gi.json` render bảng ở cuối trang; việc đẩy section giới thiệu xuống cuối cùng giúp văn bản và bảng hiển thị liền mạch, tránh đứt gãy cấu trúc nội dung.
- [19/08/2026] Quy tắc: Hạn chế tối đa dùng dấu ngoặc kép hoặc ngoặc đơn để nhấn mạnh từ ngữ trong đoạn văn. - Vì sao: Giúp văn phong tự nhiên, trơn tru và tránh tạo cảm giác gượng gạo cho người đọc khi tối ưu bài `gia-the-la-gi.json`.
- [19/08/2026] Quy tắc: Sử dụng dấu gạch nối ngắn `-` thay vì dấu gạch ngang dài `—` trong nội dung văn bản. - Vì sao: Đồng bộ ký tự hiển thị trên trang theo feedback trực tiếp của người dùng tại bài `gia-the-la-gi.json`.
- [19/08/2026] Quy tắc: Các bài viết wiki bắt buộc phải có section kết bài (dạng lời khuyên hoặc lời kết của tác giả) ở cuối `contentSections`. - Vì sao: Tránh tình trạng bài viết bị ngắt quãng hoặc dừng đột ngột sau bảng so sánh trong bài `gia-the-la-gi.json`.
