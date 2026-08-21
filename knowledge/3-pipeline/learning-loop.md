# Learning Loop — bài học tích lũy (instincts)

Ghi lại bài học **cụ thể, tái sử dụng được** rút ra sau mỗi lần `/seo-optimize`, `/drafting`, hoặc khi người dùng sửa/feedback trực tiếp — qua lệnh `/learn`. Đọc file này ở bước Intake của mọi workflow viết/sửa nội dung (đã khai trong `.agents/workflows/seo-optimize.md` và các workflow khác) để không lặp lại lỗi cũ.

## Nguyên tắc ghi

- Mỗi mục: **quy tắc rút ra** + **vì sao** (tình huống dẫn tới bài học) — không ghi chung chung kiểu "viết hay hơn".
- Không ghi thông tin đã có sẵn ở rules (`seo-content-anti-ai.md`, `seo-formatting-json.md`) — chỉ ghi cái MỚI phát sinh từ thực tế viết/sửa bài mà rules chưa có.
- Nếu 1 bài học trở nên phổ quát (áp dụng mọi bài, không riêng tình huống nào), cân nhắc nâng cấp nó vào file rule tương ứng thay vì để mãi ở đây.
- Bài học về **văn phong/nội dung 1 bài cụ thể** → ghi ở đây. Quyết định về **cấu trúc/quy trình pipeline** (thêm gate, đổi workflow...) → ghi ở `.agents/memory/DECISIONS.md` thay vì đây.
## Log

- [19/08/2026] Quy tắc: Tránh dịch nguyên văn thuật ngữ nông nghiệp tiếng Anh (như "food crops" -> "cây trồng lấy ăn"), hãy dùng từ phổ thông của nhà nông Việt Nam như "cây lương thực, rau màu". — Vì sao: Phát hiện lỗi dịch gượng gạo ở câu gốc bài `cay-duoc-lieu-la-gi.json`.
- [19/08/2026] Quy tắc: Đặt section giới thiệu bảng so sánh (`standardsTable`) ở vị trí cuối cùng trong `contentSections`. — Vì sao: Bài `cay-duoc-lieu-la-gi.json` render bảng ở cuối trang; việc đẩy section giới thiệu xuống cuối cùng giúp văn bản và bảng hiển thị liền mạch, tránh đứt gãy cấu trúc nội dung.
- [19/08/2026] Quy tắc: Hạn chế tối đa dùng dấu ngoặc kép hoặc ngoặc đơn để nhấn mạnh từ ngữ trong đoạn văn. - Vì sao: Giúp văn phong tự nhiên, trơn tru và tránh tạo cảm giác gượng gạo cho người đọc khi tối ưu bài `gia-the-la-gi.json`.
- [19/08/2026] Quy tắc: Sử dụng dấu gạch nối ngắn `-` thay vì dấu gạch ngang dài `—` trong nội dung văn bản. - Vì sao: Đồng bộ ký tự hiển thị trên trang theo feedback trực tiếp của người dùng tại bài `gia-the-la-gi.json`.
- [19/08/2026] Quy tắc: Các bài viết wiki bắt buộc phải có section kết bài (dạng lời khuyên hoặc lời kết của tác giả) ở cuối `contentSections`. - Vì sao: Tránh tình trạng bài viết bị ngắt quãng hoặc dừng đột ngột sau bảng so sánh trong bài `gia-the-la-gi.json`.
- [20/08/2026] Quy tắc: Với bài không thuộc `content/_drafts/wiki-yte/`, không đổi slug, không mơ hồ về persona/silo, chỉ cần đọc `knowledge/3-pipeline/rules-summary.md` (bản gộp hard constraint) thay vì load đủ 7 file rule gốc ở bước Intake của `/seo-optimize`; case phức tạp hoặc audit phát hiện điều mơ hồ vẫn phải đọc file gốc. - Vì sao: Đo thực tế 1 lần chạy `/seo-optimize` (bài `tieu-chuan-gacp.json`) cho thấy bước load 7 file rule chiếm ~37% tổng token cả pipeline, trong khi phần lớn nội dung là hard constraint kiểm tra được (độ dài ký tự, cấm cụm từ/ký tự) không cần full context mỗi lần.
