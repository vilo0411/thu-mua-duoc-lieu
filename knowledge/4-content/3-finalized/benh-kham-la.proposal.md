# Đề xuất tối ưu hóa bài viết (SEO Proposal) — benh-kham-la

- **Bài viết:** Bệnh khảm lá ở cây dược liệu: nguyên nhân và cách xử lý
- **File gốc:** `content/wiki/benh-kham-la.json`
- **File nháp:** `knowledge/4-content/2-draft/benh-kham-la.md`

Dưới đây là chi tiết đề xuất tối ưu theo từng phần của bài viết nhằm đáp ứng E-E-A-T, chống AI-vibe và tuân thủ các quy tắc silo/anchor text của dự án.

---

## 1. Tối ưu Frontmatter (SEO Meta)

- **Trạng thái:** Cập nhật.
- **Chi tiết & Lý do:**
  - `excerpt` hiện tại có độ dài **185 ký tự**, vượt quá giới hạn khuyến nghị (150-160 ký tự).
  - *Đề xuất mới:* `"Khảm lá ở cây dược liệu do virus gây ra và chưa có thuốc đặc trị. Tôi tổng hợp cách nhận biết côn trùng môi giới và quy trình phòng bệnh để bảo vệ vườn trồng."` (Độ dài: 159 ký tự).

---

## 2. Phần thân bài (contentSections)

### ## 1. Bệnh khảm lá là gì?
- **Trạng thái:** Cập nhật.
- **Chi tiết & Lý do:**
  - Loại bỏ dấu ba chấm `...` (AI-placeholder) và sửa cấu trúc lặp ý ("do virus gây ra" xuất hiện lặp trong 2 câu liên tiếp).
  - Thay thế dấu gạch ngang dài `—` bằng dấu gạch nối ngắn `-` để tuân thủ quy tắc văn phong.
  - Thay đổi anchor text cho link `/kien-thuc/sau-benh-hai-cay-duoc-lieu`: Đổi từ `"sâu bệnh hại dược liệu"` (đã được sử dụng ở bài `benh-ri-sat`) thành `"dịch hại trên cây dược liệu"` để tránh trùng lặp anchor text.

### ## 2. Đường lây bệnh
- **Trạng thái:** Cập nhật.
- **Chi tiết & Lý do:**
  - Làm rõ danh sách côn trùng chích hút trung gian truyền bệnh bao gồm: bọ phấn trắng, rệp, bọ trĩ thay vì chỉ viết chung chung `(rệp, bọ trĩ...)`.
  - Giữ nguyên lý giải về đường lây qua nhân giống vô tính vì đây là kỹ thuật rất quan trọng đối với hộ trồng nhỏ lẻ.

### ## 3. Cách phòng và hạn chế lây lan
- **Trạng thái:** Cập nhật.
- **Chi tiết & Lý do:**
  - Chuyển đổi dấu em-dash `—` thành `-`.
  - Thay đổi thuật ngữ `"chuẩn dược liệu GACP"` thành `"quy trình canh tác GACP-WHO"` để đồng bộ hóa với bảng thuật ngữ `glossary.md` và thay đổi anchor text cho `/kien-thuc/tieu-chuan-gacp` để tránh lặp anchor text `"chuẩn dược liệu GACP"` đã dùng ở bài khác.
  - Cải thiện câu văn lặp từ ở phần khuyên nhổ bỏ cây bệnh: *"Cây đã biểu hiện khảm lá rõ nên nhổ bỏ, tiêu hủy sớm để bảo vệ cả vườn, không nên giữ lại vì thương tiếc vì virus không chữa khỏi."* -> Sửa lại thành giọng xưng "tôi" chân thực, tránh lặp từ và khuyên cụ thể cách tiêu hủy.

### ## 4. Mức độ ảnh hưởng trên các cây dược liệu
- **Trạng thái:** Cập nhật nhẹ.
- **Chi tiết & Lý do:**
  - Tối ưu hóa lời dẫn giới thiệu bảng so sánh để tự nhiên và thuyết phục hơn đối với người trồng (Persona P1).

### ## 5. Lời khuyên của Nguyễn Viết Lộc cho bà con (Section kết bắt buộc)
- **Trạng thái:** Cập nhật.
- **Chi tiết & Lý do:**
  - Tăng tính chuyên môn và cụ thể (Specificity): Thay vì chỉ khuyên khử trùng chung chung, tôi khuyên cụ thể việc dùng cồn 70 độ hoặc nước vôi trong để lau dụng cụ sau mỗi lần cắt tỉa giữa các cây.

---

## 3. Các thành phần bổ sung

### ## Bảng: Đặc điểm bệnh khảm lá trên một số loại cây dược liệu tiêu biểu (standardsTable)
- **Trạng thái:** Giữ nguyên.
- **Chi tiết & Lý do:**
  - Bảng đã có cấu trúc chuẩn 3 cột, 3 hàng, liên kết chính xác đến các wiki-hub tương ứng (`/kien-thuc/ky-thuat-trong-ca-gai-leo`, `/kien-thuc/ky-thuat-trong-cu-gai`, `/kien-thuc/ky-thuat-trong-kho-qua`).

### ## Sai lầm phổ biến (pitfall)
- **Trạng thái:** Cập nhật nhẹ.
- **Chi tiết & Lý do:**
  - Thay thế dấu em-dash `—` bằng dấu gạch nối ngắn `-`. Giọng văn cảnh báo quyết liệt về việc tiếc nuối cây bệnh mà giữ lại làm giống.

### ## FAQ
- **Trạng thái:** Giữ nguyên.
- **Chi tiết & Lý do:**
  - Cả 3 câu hỏi FAQ đều có câu trả lời trực tiếp ngay ở câu đầu tiên và độ dài nằm trong chuẩn 40-60 từ, rất tốt cho Featured Snippet.
