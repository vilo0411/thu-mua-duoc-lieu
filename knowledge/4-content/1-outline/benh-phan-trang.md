# Proposal audit: benh-phan-trang

Nguồn: content/wiki/benh-phan-trang.json
Ngày audit: 2026-08-20

## Nghiên cứu SERP đối thủ (vai SEO Collector)
Keyword search dùng: bệnh phấn trắng
Đối thủ top 3-5 (URL + outline thật từng đối thủ):
- sfarm.vn: H2: Dấu hiệu nhận biết, H2: Nguyên nhân và điều kiện phát triển, H2: Biện pháp phòng và trị bệnh (H3: Phòng bệnh, H3: Trị bệnh) - Độ dài ước lượng: ~1000 từ, phụ trợ: hình ảnh minh họa, danh sách liệt kê.
- hoptrisummit.com: H2: Dấu hiệu nhận biết (H3: Lớp bột đặc trưng, H3: Ảnh hưởng lên cây, H3: Khác biệt rầy phấn trắng), H2: Nguyên nhân và điều kiện phát triển, H2: Giải pháp phòng ngừa và kiểm soát (H3: Biện pháp canh tác, H3: Biện pháp điều trị) - Độ dài ước lượng: ~1200 từ, phụ trợ: hình ảnh, danh sách, giới thiệu chế phẩm hóa học và sinh học của hãng.
- cayantrai.vn: H2: Bệnh phấn trắng (H3: Tác nhân, H3: Triệu chứng, H3: Điều kiện phát triển), H2: Cách phòng ngừa & trị bệnh (H3: Sinh học, H3: Hóa học), H2: Phân biệt với rầy phấn trắng - Độ dài ước lượng: ~1500 từ, phụ trợ: hình ảnh, hướng dẫn công thức tự chế tại nhà (sữa pha loãng, baking soda).

Outline tổng hợp đối thủ (heading lặp lại ở ≥ 2 đối thủ):
- Dấu hiệu nhận biết / Triệu chứng bệnh phấn trắng
- Nguyên nhân và điều kiện phát triển của nấm bệnh
- Biện pháp phòng ngừa (canh tác)
- Cách trị bệnh phấn trắng (sinh học, hóa học)
- Phân biệt bệnh phấn trắng và rầy phấn trắng (rất quan trọng)

## So sánh outline hiện tại vs đối thủ
- Outline hiện tại (từ contentSections):
  1. Bệnh phấn trắng là gì?
  2. Điều kiện phát sinh
  3. Cách phòng bệnh phấn trắng
  4. Cách trị khi cây đã nhiễm
  5. Mức độ ảnh hưởng trên các cây dược liệu
  6. Lời khuyên của Nguyễn Viết Lộc cho bà con
  (Bảng so sánh các cây dược liệu, Sai lầm phổ biến, FAQ)
- Đối thủ có mà bài chưa có:
  - Phân biệt với rầy phấn trắng ở mức độ section lớn (bài hiện tại đang lồng trong FAQ). Tuy nhiên, việc đặt ở FAQ cũng là một giải pháp tối ưu cho snippet tìm kiếm, sẽ giữ lại ở FAQ nhưng bổ sung một câu lưu ý ngắn trong phần điều trị để dẫn dắt bà con.
- Bài có mà đối thủ không có:
  - Section 5 ("Mức độ ảnh hưởng trên các cây dược liệu" kèm bảng so sánh chi tiết Cúc hoa vàng, Bạc hà Á, Đơn lá đỏ) và Section 6 ("Lời khuyên của Nguyễn Viết Lộc"). Đây là USP rất lớn của bài viết, hướng thẳng vào đối tượng hộ trồng cây dược liệu thay vì nói chung chung về hoa cảnh hay cây ăn trái của đối thủ.
- Thứ tự trình bày: Rất hợp lý và mạch lạc, đi từ lý thuyết đến thực hành, kết lại bằng bảng so sánh trực quan và FAQ thực tế.

## Định hướng tổng thể
Mức độ lệch outline: THẤP
Lý do: Outline hiện tại đã bao phủ hoàn hảo search intent của người trồng, tập trung tốt vào cây dược liệu, không thiếu các mảng thông tin cốt lõi mà đối thủ có.

Đề xuất: CẬP NHẬT TỪNG PHẦN
- Giữ nguyên cấu trúc các section chính.
- Tập trung tinh chỉnh câu chữ theo 7 Sweeps để nâng cao E-E-A-T (vai Brand Guardian).
- Khắc phục các vi phạm kỹ thuật về độ dài SEO (seoTitle, excerpt), dấu câu (loại bỏ em-dash), thuật ngữ chuẩn hóa (GACP-WHO), và cấu trúc bảng (thêm 1 hàng dữ liệu để bảng đạt ≥ 4 hàng).

---

## Chi tiết đề xuất sửa đổi

### Metadata & SEO Title, Excerpt
- **seoTitle**: Sửa từ "Bệnh phấn trắng: dấu hiệu và cách phòng trị" (43 ký tự) thành "Bệnh phấn trắng trên cây dược liệu: Dấu hiệu và cách trị" (57 ký tự) để chứa từ khóa chính, bổ sung ngữ cảnh ngành dược liệu và đạt độ dài tiêu chuẩn 50-60 ký tự.
- **excerpt**: Sửa từ 200 ký tự xuống còn 154 ký tự: "Bệnh phấn trắng do nấm làm giảm năng suất cây dược liệu. Tôi hướng dẫn cách nhận biết dấu hiệu và biện pháp phòng trị sinh học an toàn cho vườn trồng." để đạt chuẩn 150-160 ký tự.

### Section 1 — "1. Bệnh phấn trắng là gì?"
- **Hành động**: CẬP NHẬT
- **Vấn đề phát hiện**: Văn phong mở đầu hơi phẳng, chưa thể hiện rõ kinh nghiệm thực tế.
- **Đề xuất sửa cụ thể**: Sửa câu đầu để mang dấu ấn cá nhân của Nguyễn Viết Lộc. Giữ nguyên liên kết đến `[sâu bệnh hại dược liệu](/kien-thuc/sau-benh-hai-cay-duoc-lieu)`. Sử dụng sweep Specificity cho mô tả triệu chứng.

### Section 2 — "2. Điều kiện phát sinh"
- **Hành động**: CẬP NHẬT
- **Vấn đề phát hiện**: Dùng dấu gạch ngang dài `—` vi phạm quy định dấu câu của dự án.
- **Đề xuất sửa cụ thể**: Thay `—` bằng dấu gạch nối ngắn `-`. Cụ thể hóa điều kiện nhiệt độ (15-26°C) và độ ẩm (trên 85%) theo tài liệu kỹ thuật để tăng tính thuyết phục (sweep Specificity & Prove It).

### Section 3 — "3. Cách phòng bệnh phấn trắng"
- **Hành động**: CẬP NHẬT
- **Vấn đề phát hiện**: Các đoạn còn ngắn, thiếu các chi tiết nhỏ trong canh tác nhưng cực kỳ quan trọng đối với nấm phấn trắng.
- **Đề xuất sửa cụ thể**: Bổ sung chi tiết tránh tưới nước lên tán lá vào chiều muộn/buổi tối (gây đọng nước tạo ẩm cục bộ thuận lợi cho nấm) và việc thu gom tàn dư lá bệnh ra khỏi vườn.

### Section 4 — "4. Cách trị khi cây đã nhiễm"
- **Hành động**: CẬP NHẬT
- **Vấn đề phát hiện**: 
  - Đề xuất dùng baking soda nhưng không đưa ra công thức cụ thể để người học làm theo.
  - Từ "chuẩn dược liệu GACP" chưa chuẩn hóa theo glossary ("GACP-WHO").
- **Đề xuất sửa cụ thể**:
  - Thêm công thức pha dung dịch baking soda: 1 muỗng cà phê baking soda pha với vài giọt nước rửa chén trong 3 lít nước phun đều tán lá.
  - Thay đổi anchor text thành `[tiêu chuẩn GACP-WHO](/kien-thuc/tieu-chuan-gacp)` để tăng E-E-A-T và tuân thủ glossary.

### Section 5 — "5. Mức độ ảnh hưởng trên các cây dược liệu"
- **Hành động**: CẬP NHẬT
- **Vấn đề phát hiện**: Đoạn giới thiệu bảng so sánh còn chung chung.
- **Đề xuất sửa cụ thể**: Viết lại đoạn dẫn dắt với giọng văn của Nguyễn Viết Lộc, nhấn mạnh kinh nghiệm quan sát thực tế trên vườn để bà con chú ý.

### Section 6 — "6. Lời khuyên của Nguyễn Viết Lộc cho bà con"
- **Hành động**: CẬP NHẬT
- **Vấn đề phát hiện**: Đoạn khuyên còn hơi mỏng, chưa giải quyết được nỗi lo của hộ trồng (sweep Emotion và Zero Risk).
- **Đề xuất sửa cụ thể**: Viết lại để thể hiện sự đồng cảm với bà con khi vườn bị phấn trắng hại làm giảm chất lượng thu gom, nhấn mạnh triết lý phòng bệnh chủ động để bảo toàn giá trị dược chất.

### Bảng: "Đặc điểm bệnh phấn trắng trên một số loại cây dược liệu tiêu biểu"
- **Hành động**: CẬP NHẬT
- **Vấn đề phát hiện**: Bảng hiện tại chỉ có 3 hàng dữ liệu, vi phạm tiêu chuẩn của dự án là phải có ≥ 4 hàng khi có bảng so sánh.
- **Đề xuất sửa cụ thể**: Bổ sung thêm 1 hàng cho cây [Hoắc hương](/kien-thuc/ky-thuat-trong-hoac-huong) (lớp bột mịn bám mặt lá làm rụng lá nhanh, giảm hàm lượng tinh dầu) nâng số hàng lên thành 4 hàng dữ liệu.

### Sai lầm phổ biến
- **Hành động**: GIỮ NGUYÊN
- **Vấn đề phát hiện**: Nội dung tốt, chỉ cần chỉnh sửa lỗi bảng mã hiển thị của heading từ `## Sai láº§m phá»• biáº¿n` thành `## Sai lầm phổ biến`.

### FAQ
- **Hành động**: CẬP NHẬT
- **Vấn đề phát hiện**: 
  - Sửa lỗi bảng mã hiển thị ở FAQ (nếu có).
  - Tinh chỉnh câu trả lời đầu tiên của mỗi câu hỏi để đảm bảo phần trả lời trực tiếp ngắn gọn, nằm trong khoảng 40-60 từ để tối ưu Featured Snippet.
