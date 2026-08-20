# Proposal audit: benh-nut-than-xi-mu

Nguồn: content/wiki/benh-nut-than-xi-mu.json
Ngày audit: 2026-08-20

## Nghiên cứu SERP đối thủ (vai SEO Collector)
Keyword search dùng: bệnh nứt thân xì mủ nguyên nhân dấu hiệu cách điều trị
Đối thủ top 3-5 (URL + outline thật từng đối thủ):
- Hợp Trí (hoptrisummit.com): Tác nhân gây bệnh (nấm Phytophthora spp.), Triệu chứng gây hại (thân cành chảy nhựa, thối rễ, vàng rụng lá, thối trái), Điều kiện phát triển (nhiệt độ, ẩm độ, ngập úng, pH thấp, vết thương do côn trùng sâu đục thân), Biện pháp phòng trừ (canh tác thoát nước, quét vôi, quét thuốc đặc trị gốc đồng/Phosphonate/Metalaxyl, tưới bảo vệ rễ).
- Phân bón 3 Tốt (phanbon3tot.com): Nguyên nhân gây bệnh nứt thân xì mủ, Triệu chứng nhận biết (trên lá, thân cành, rễ, trái), Quy trình xử lý và phục hồi (cạo sạch loét, quét thuốc sát khuẩn gốc đồng, xử lý rễ/đất bằng vi sinh đối kháng Trichoderma, bồi dưỡng phân hữu cơ kích rễ tái tạo), Biện pháp phòng ngừa (thoát nước, bón phân hữu cơ hoai mục).
- Nông nghiệp Dế Mèn (nongnghiepdemen.vn): Bệnh nứt thân xì mủ là gì?, Dấu hiệu của bệnh nứt thân xì mủ (chảy gôm nâu, vỏ nứt loét thâm đen gỗ), Nguyên nhân gây bệnh (do Phytophthora - nấm trứng Oomycetes ưa nước), Cách phòng trị bệnh nứt thân xì mủ hiệu quả (cạo vỏ quét thuốc gốc đồng/hóa học, tưới ngừa vi sinh Chaetomium/Trichoderma, cải thiện đất thoát nước gốc).

Outline tổng hợp đối thủ (heading lặp lại ở ≥ 2 đối thủ):
- Nguyên nhân gây bệnh nứt thân xì mủ (tác nhân Phytophthora, điều kiện môi trường).
- Dấu hiệu nhận biết bệnh (thân cành, lá, rễ, trái).
- Quy trình xử lý khi cây bị bệnh (cạo loét, quét thuốc, tưới gốc).
- Biện pháp phòng ngừa (thoát nước, bón phân cân đối, vi sinh đối kháng, quét vôi).

## So sánh outline hiện tại vs đối thủ
- Outline hiện tại (từ contentSections):
  1. Bệnh nứt thân xì mủ là gì?
  2. Nguyên nhân và điều kiện phát sinh
  3. Cách phòng và xử lý
  4. Mức độ ảnh hưởng trên các cây dược liệu
  5. Lời khuyên của Nguyễn Viết Lộc cho bà con
- Đối thủ có mà bài chưa có: Chi tiết về tác nhân sinh học là nấm Phytophthora spp. (nấm trứng Oomycetes ưa ẩm); chi tiết các điều kiện thuận lợi (pH đất thấp < 5.0, bón thừa phân đạm hóa học làm tế bào mọng nước, vết thương hở do sâu bệnh/dụng cụ canh tác); chi tiết các hoạt chất trị nấm Phytophthora phổ biến (Metalaxyl, Mancozeb, Fosetyl Aluminium) và kỹ thuật quét thuốc, xử lý phục hồi rễ.
- Bài có mà đối thủ không có: Bảng mức độ ảnh hưởng trên một số cây dược liệu tiêu biểu (Cát căn, Đinh lăng, Quế). Đây là điểm khác biệt rất tốt vì đây là blog chuyên sâu về dược liệu.
- Thứ tự trình bày: Chưa tối ưu theo học hỏi từ `learning-loop.md`. Section giới thiệu bảng so sánh (Section 4) nằm trước section kết bài/lời khuyên (Section 5). Theo quy tắc, cần đẩy section giới thiệu bảng xuống dưới section Lời khuyên để bảng so sánh render liền mạch ở cuối bài viết.

## Định hướng tổng thể
Mức độ lệch outline: TRUNG BÌNH
Lý do: Bài đã có cấu trúc cơ bản tốt nhưng còn thiếu tính chuyên sâu về mặt kỹ thuật (tên hoạt chất, tác nhân nấm trứng Oomycetes, pH đất) và thứ tự hiển thị bảng/lời khuyên chưa chuẩn theo learning loop.

Đề xuất: CẬP NHẬT TỪNG PHẦN
- Giữ nguyên cấu trúc JSON gốc và các id/slug.
- Điều chỉnh nội dung các section để tăng tính Specificity và bổ sung các hoạt chất trị nấm cụ thể.
- Hoán đổi vị trí Section 4 (Mức độ ảnh hưởng...) và Section 5 (Lời khuyên...) để section giới thiệu bảng nằm ở cuối cùng của `contentSections`.
- Đồng bộ dấu câu: thay thế dấu gạch ngang dài `—` bằng dấu gạch nối ngắn `-` trên toàn bài; sửa lỗi hiển thị các ký tự ở tiêu đề bảng và sai lầm phổ biến.
- Tối ưu hóa `seoTitle` lên 50-60 ký tự (hiện tại 43 ký tự) và rút gọn `excerpt` xuống 150-160 ký tự (hiện tại 183 ký tự).

---

## Section 1 — "1. Bệnh nứt thân xì mủ là gì?"
Hành động: CẬP NHẬT
- Vấn đề phát hiện: Dùng dấu gạch ngang dài `—`, thiếu tính cụ thể về tác nhân sinh học Phytophthora (nấm trứng Oomycetes ưa nước).
- Đề xuất sửa cụ thể:
  - Thay thế `—` bằng `-`.
  - Thay thế cụm từ chung chung bằng: "bệnh chủ yếu do nấm trứng Oomycetes (loài Phytophthora spp.) tấn công phần gốc và vỏ sát mặt đất".
  - Giọng xưng "tôi" nhất quán.

## Section 2 — "2. Nguyên nhân và điều kiện phát sinh"
Hành động: CẬP NHẬT
- Vấn đề phát hiện: Nội dung còn mỏng, chưa làm rõ vai trò của nước, pH đất thấp và vết thương hở do dụng cụ hoặc sâu bệnh đục thân.
- Đề xuất sửa cụ thể:
  - Bổ sung: Nấm Phytophthora tồn tại lâu trong đất dưới dạng bào tử ngủ nghỉ, lan truyền rất nhanh qua nước mưa hoặc nước tưới tràn.
  - Làm rõ điều kiện thuận lợi: đất có pH thấp (dưới 5.0), ngập úng gốc dài ngày, bón thừa phân đạm hóa học làm vỏ cây non mọng nước, hoặc cây bị sây sát gốc thân do cuốc cỏ, sâu hại cắn phá.

## Section 3 — "3. Cách phòng và xử lý"
Hành động: CẬP NHẬT
- Vấn đề phát hiện: Thiếu tên hoạt chất hóa học cụ thể để diệt nấm loãn (Phytophthora); dùng dấu gạch ngang dài `—`; quy trình xử lý cạo vết loét còn sơ sài.
- Đề xuất sửa cụ thể:
  - Sửa `—` thành `-`.
  - Cụ thể hóa kỹ thuật phòng: Lên luống cao, làm rãnh thoát nước sâu, định kỳ quét vôi từ gốc lên 80-100cm trước mùa mưa.
  - Cụ thể hóa kỹ thuật trị: Dùng dao sắc đã khử trùng cạo sạch vết thâm đen đến tận gỗ trắng lành, gom vỏ bệnh đem tiêu hủy ngoài vườn để tránh nấm bào tử lây lan. Quét thuốc đặc trị chứa hoạt chất như Metalaxyl hoặc Mancozeb đậm đặc trực tiếp lên vết cạo. Tưới vi sinh đối kháng Trichoderma hoặc Chaetomium vùng rễ để diệt nấm ẩn trong đất.

## Section 4 (Mới hoán đổi) — "4. Lời khuyên của Nguyễn Viết Lộc cho bà con"
Hành động: CẬP NHẬT (Chuyển từ Section 5 cũ lên Section 4)
- Vấn đề phát hiện: Nội dung ngắn, khuyên quét vôi chưa chỉ rõ độ cao và định kỳ thực hiện.
- Đề xuất sửa cụ thể:
  - Chỉ rõ chiều cao quét vôi gốc (khoảng 80-100cm tính từ mặt đất lên) để ngăn nấm lan truyền từ đất. Khuyên bón lót phân hữu cơ hoai mục kết hợp nấm đối kháng định kỳ mỗi vụ để xây dựng màng chắn sinh học bảo vệ rễ lâu dài.

## Section 5 (Mới hoán đổi) — "5. Mức độ ảnh hưởng trên các cây dược liệu"
Hành động: CẬP NHẬT (Chuyển từ Section 4 cũ xuống Section 5)
- Vấn đề phát hiện: Đây là đoạn giới thiệu bảng so sánh, nay được xếp ở cuối `contentSections` để nối liền mạch với bảng.
- Đề xuất sửa cụ thể:
  - Tinh chỉnh văn phong ngắn gọn, hướng người trồng xuống xem bảng so sánh bên dưới để nhận diện đặc trưng trên Đinh lăng, Quế, Cát căn.

---

## Không đổi
- Giữ nguyên các thông tin YAML frontmatter khác ngoại trừ `seoTitle` và `excerpt` để đảm bảo chuẩn SEO.
- Giữ nguyên các liên kết đã có trong bài viết (Cát căn, Đinh lăng, Quế, thán thư, chuẩn dược liệu GACP) để giữ tính toàn vẹn của silo liên kết.
