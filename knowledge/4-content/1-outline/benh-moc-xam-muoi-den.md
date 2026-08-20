# Proposal audit: benh-moc-xam-muoi-den

Nguồn: content/wiki/benh-moc-xam-muoi-den.json
Ngày audit: 2026-08-20

## Nghiên cứu SERP đối thủ (vai SEO Collector)
- **Đối thủ đã có**: Các bài viết từ Hop Tri, Vườn Sài Gòn, Bác Sĩ Cây Xanh, và các cổng thông tin nông nghiệp. 
  - *Mốc xám (Botrytis cinerea)*: Tập trung vào triệu chứng đốm hoại tử xám có quầng vàng trên lá, hoa thối nhũn, quả non teo tóp phủ mốc xám mịn. Phát triển mạnh ở 15-23°C, ẩm độ >90%.
  - *Muội đen (nấm bồ hóng Capnodium/Meliola)*: Giải thích rõ mối quan hệ cộng sinh với rầy, rệp sáp, rệp muội, bọ phấn trắng tiết dịch ngọt. Hầu hết đều nhấn mạnh việc diệt côn trùng chích hút là gốc rễ, rửa trôi muội đen bằng nước áp lực cao hoặc thuốc gốc đồng.
- **Khoảng trống**: Chưa có bài viết nào kết hợp và so sánh chi tiết hai bệnh này trên cùng một cẩm nang dành riêng cho cây dược liệu lấy lá/hoa (nơi chất lượng thẩm mỹ quyết định giá thu mua và tiêu chuẩn GACP). Thiếu các hướng dẫn dùng chế phẩm sinh học (Trichoderma, nano bạc đồng, nước tỏi ớt) để đáp ứng chuẩn dược liệu sạch hóa chất bảo vệ thực vật.
- **Đề xuất từ SERP**:
  - Bổ sung thông số kỹ thuật môi trường (nhiệt độ, ẩm độ) cho mốc xám phát triển để tăng tính thuyết phục (sweep Specificity/Prove It).
  - Làm rõ hơn các loại côn trùng chích hút tạo dịch ngọt cho muội đen (rệp sáp, rệp muội, bọ phấn trắng).
  - Tăng số lượng hàng trong `standardsTable` lên ít nhất 4 hàng (hiện tại mới có 3 hàng) để đáp ứng quy định SEO (thêm cây Hoắc hương).
  - Sửa lỗi mã hóa ký tự (chữ Bảng và Sai lầm phổ biến bị lỗi font khi xuất từ script).
  - Thay thế toàn bộ dấu gạch ngang dài `—` bằng dấu gạch nối ngắn `-`.

## Metadata & SEO Lengths
- **Title**: "Bệnh mốc xám và muội đen hại lá cây dược liệu: cách nhận biết, xử lý" (74 ký tự) - Giữ nguyên.
- **seoTitle**: "Bệnh mốc xám, muội đen hại lá: cách xử lý" (41 ký tự) -> Đề xuất đổi thành: "Cách phòng trị bệnh mốc xám và muội đen hại lá dược liệu" (56 ký tự) - Đạt chuẩn 50-60 ký tự, chứa từ khóa chính, tự nhiên.
- **excerpt**: "Mốc xám và muội đen đều tạo lớp phủ bất thường trên lá nhưng nguyên nhân khác nhau. Tôi tổng hợp lại cách phân biệt hai bệnh này và hướng xử lý phù hợp cho từng loại." (166 ký tự) -> Đề xuất rút ngắn thành: "Mốc xám và muội đen tạo lớp phủ trên lá nhưng bản chất khác nhau. Tôi hướng dẫn cách phân biệt và xử lý triệt để hai bệnh này cho từng loại dược liệu." (154 ký tự) - Đạt chuẩn 150-160 ký tự.

## Section 1 — "1. Bệnh mốc xám là gì?"
- **Hành động**: CẬP NHẬT
- **Vấn đề phát hiện**: Thiếu số liệu môi trường cụ thể khiến thông tin bị mỏng. Thiếu link nội bộ sang hub dược liệu liên quan ở phần thân bài.
- **Đề xuất sửa cụ thể**:
  - Bổ sung ngưỡng nhiệt độ (15-23°C) và độ ẩm (trên 90%) mà nấm *Botrytis cinerea* phát triển mạnh.
  - Thêm ví dụ thực tế nấm tấn công các cây lấy lá nhiều tinh dầu và chèn link nội bộ: "Đặc biệt là các loại cây lấy lá nhiều tinh dầu như [cây Hoắc hương](/kien-thuc/ky-thuat-trong-hoac-huong)..." (Sweep Specificity).

## Section 2 — "2. Bệnh muội đen là gì? Khác gì mốc xám"
- **Hành động**: CẬP NHẬT
- **Vấn đề phát hiện**: Có chứa dấu gạch ngang dài `—` vi phạm quy tắc định dạng. Thiếu tên các loại côn trùng chích hút cụ thể (rệp sáp, rệp muội, bọ phấn trắng). Thiếu link nội bộ sang hub dược liệu liên quan ở phần thân bài.
- **Đề xuất sửa cụ thể**:
  - Thay thế dấu `—` bằng `-`.
  - Chỉ rõ tác nhân gây dịch ngọt: rệp sáp, rệp muội, bọ phấn trắng.
  - Lồng ghép link nội bộ: "Hiện tượng này rất phổ biến trên các loại cây bụi gỗ như [cây Đinh lăng](/kien-thuc/ky-thuat-trong-dinh-lang) khi bị rệp tấn công..." (Vừa bổ sung dẫn chứng vừa giải quyết internal link).

## Section 3 — "3. Cách phòng và xử lý"
- **Hành động**: CẬP NHẬT
- **Vấn đề phát hiện**: Cách xử lý còn mang tính chất khái quát chung chung. Cần đưa ra giải pháp cụ thể, sinh học hơn cho P1 (nhà vườn nhỏ lẻ).
- **Đề xuất sửa cụ thể**:
  - Với mốc xám: Nhấn mạnh việc phun phòng bằng chế phẩm nấm đối kháng *Trichoderma* hoặc nano bạc đồng định kỳ, đặc biệt trước đợt mưa kéo dài.
  - Với muội đen: Đề xuất rửa trôi lớp muội đen bằng nước áp lực cao hoặc dung dịch xà phòng sinh học loãng sau khi đã xử lý côn trùng chích hút bằng nước tỏi ớt hoặc chế phẩm sinh học BT (Bacillus thuringiensis).
  - Lồng ghép link nội bộ: "Đối với các ruộng trồng [cây tía tô](/kien-thuc/ky-thuat-trong-tia-to), việc giữ khoảng cách hàng..." (Vừa bổ sung link hub vừa giữ tính thực tế).

## Section 4 — "4. Mức độ ảnh hưởng trên các cây dược liệu"
- **Hành động**: CẬP NHẬT
- **Vấn đề phát hiện**: Đoạn văn mỏng, chưa nhấn mạnh nỗi lo của bà con về việc suy giảm chất lượng lá dược liệu dẫn đến bị ép giá hoặc không đạt chuẩn GACP-WHO (thiếu Sweep Emotion/So What).
- **Đề xuất sửa cụ thể**:
  - Viết lại nhấn mạnh: Lá dược liệu bị mốc hoặc muội đen sẽ mất hoạt chất, giảm thẩm mỹ, thương lái sẽ ép giá hoặc từ chối thu mua. Hậu quả là hỏng cả vụ thu hái, ảnh hưởng trực tiếp đến thu nhập của bà con.

## Section 5 — "5. Lời khuyên của Nguyễn Viết Lộc cho bà con"
- **Hành động**: CẬP NHẬT
- **Vấn đề phát hiện**: Phần lời kết hơi ngắn, chưa đủ sâu sắc để tạo niềm tin và khẳng định uy tín của tác giả.
- **Đề xuất sửa cụ thể**:
  - Khuyên bà con kết hợp quản lý ẩm độ đất và theo dõi côn trùng định kỳ 2 lần/tuần.
  - Nhấn mạnh nguyên tắc: "Phòng bệnh hơn chữa bệnh, giữ vườn thông thoáng là chìa khóa rẻ tiền nhất nhưng hiệu quả nhất".

## Mục mới đề xuất thêm (nếu có)
- **standardsTable**: Thêm hàng thứ 4 cho cây Hoắc hương:
  - Cây dược liệu: `[Hoắc hương](/kien-thuc/ky-thuat-trong-hoac-huong)`
  - Biểu hiện bệnh đặc trưng: "Đầu ngọn và lá non thối nhũn xám tro (mốc xám), hoặc lá bị phủ muội đen do rệp sáp."
  - Biện pháp phòng ngừa riêng biệt: "Cắt tỉa cành gốc tạo độ thoáng, định kỳ phun chế phẩm nấm đối kháng Trichoderma phòng ngừa."
  - *Lý do*: Đáp ứng quy tắc standardsTable có tối thiểu 4 hàng (hiện tại chỉ có 3 hàng).
- **Sửa lỗi mã hóa ký tự**:
  - Dòng `## Báº£ng: ...` -> Đổi thành `## Bảng: Đặc điểm mốc xám, muội đen trên một số loại cây dược liệu tiêu biểu`
  - Dòng `## Sai láº§m phá»• biáº¿n` -> Đổi thành `## Sai lầm phổ biến`

## Không đổi
- **faq**: Các câu hỏi FAQ hiện tại có cấu trúc câu trả lời trực tiếp khá tốt, chỉ cần tinh chỉnh nhẹ về dấu câu (thay em-dash bằng hyphen ở câu 2) và cấu trúc câu để đạt độ trôi chảy tối ưu.
- **pitfall**: Nội dung cảnh báo chỉ phun thuốc trừ nấm cho muội đen rất thực tế, giữ nguyên định hướng nhưng tinh chỉnh hành văn cho sắc nét.
