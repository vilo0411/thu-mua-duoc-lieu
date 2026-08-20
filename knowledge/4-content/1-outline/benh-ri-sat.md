# Proposal audit: benh-ri-sat-gi-sat-dau-hieu-cach-tri

Nguồn: content/wiki/benh-ri-sat.json
Ngày audit: 2026-08-20

## Nghiên cứu SERP đối thủ (vai SEO Collector)
Keyword search dùng: bệnh rỉ sắt dấu hiệu cách trị
Đối thủ top 3-5 (URL + outline thật từng đối thủ):
- namix.vn: Bệnh rỉ sắt là gì? → Dấu hiệu nhận biết bệnh rỉ sắt trên cây trồng → Nguyên nhân gây bệnh và điều kiện phát sinh → Cách phòng ngừa và điều trị bệnh rỉ sắt hiệu quả (Biện pháp canh tác, Biện pháp hóa học, Biện pháp sinh học) → Cách chăm sóc một số loại cây thường bị bệnh rỉ sắt. Độ dài: ~1500 từ. Phụ trợ: FAQ, hình ảnh minh họa.
- nhatvietagc.com.vn: Triệu chứng và nguyên nhân → Giải pháp từ Nông dược Nhật Việt → Biện pháp phòng trừ tổng hợp (Canh tác, Kiểm tra, 4 đúng). Độ dài: ~1000 từ. Phụ trợ: hình ảnh sản phẩm thuốc, FAQ.
- taydojsc.com.vn: Dấu hiệu nhận biết → Nguyên nhân và điều kiện phát triển → Cách phòng và trị bệnh. Độ dài: ~800 từ. Phụ trợ: FAQ, danh sách gạch đầu dòng.

Outline tổng hợp đối thủ (heading lặp lại ở ≥ 2 đối thủ): Bệnh rỉ sắt là gì/Nguyên nhân phát sinh, Dấu hiệu nhận biết, Biện pháp phòng ngừa (canh tác), Biện pháp điều trị (sinh học/hóa học), Đặc điểm trên từng cây/loại cây.

## So sánh outline hiện tại vs đối thủ
- Outline hiện tại (từ contentSections):
  1. Bệnh rỉ sắt là gì và nguyên nhân phát sinh
  2. Dấu hiệu nhận biết bệnh rỉ sắt trên lá cây trồng
  3. Biện pháp canh tác phòng bệnh rỉ sắt chủ động
  4. Cách điều trị bệnh rỉ sắt hiệu quả và an toàn
  5. Mức độ ảnh hưởng trên các cây dược liệu
  6. Lời khuyên cuối của Nguyễn Viết Lộc cho bà con
- Đối thủ có mà bài chưa có: Không có section lớn nào bị thiếu, cấu trúc bài hiện tại đã bao phủ rất tốt toàn bộ search intent.
- Bài có mà đối thủ không có: Section 6 "Lời khuyên cuối của Nguyễn Viết Lộc cho bà con" (Tạo USP riêng và củng cố persona Nguyễn Viết Lộc).
- Thứ tự trình bày: Cần điều chỉnh vị trí của Section 5 và Section 6. Hiện tại, Section 5 giới thiệu bảng so sánh (`standardsTable`) nhưng lại đứng trước Section 6 (lời khuyên cuối), trong khi bảng so sánh được render ở cuối trang. Việc này làm đứt gãy tính liên mạch của văn bản và bảng.

## Định hướng tổng thể
Mức độ lệch outline: THẤP
Lý do: Cấu trúc heading của bài đã chuẩn chỉnh theo search intent của người nông dân. Chỉ cần điều chỉnh nhỏ về thứ tự section giới thiệu bảng so sánh và tối ưu hóa câu chữ.

Đề xuất: CẬP NHẬT TỪNG PHẦN
- Giữ nguyên cấu trúc chính, swap vị trí Section 5 và Section 6 để phần giới thiệu bảng nằm sát bảng.
- Sửa lỗi mã hóa hiển thị ("Báº£ng" và "Sai láº§m phá»• biáº¿n") trong bản nháp Markdown.
- Rà soát độ dài câu (≤ 25 từ) và số lượng câu trong đoạn (2-3 câu).
- Đổi từ "thu hoạch" thành "thu hái" theo đúng GACP-WHO (quy định glossary).
- Sửa lỗi typo "Cát cánh" thành "Cát căn" ở cột 1 của bảng so sánh để khớp với link `/kien-thuc/ky-thuat-trong-cat-can`.

## Section 1 — "1. Bệnh rỉ sắt là gì và nguyên nhân phát sinh"
Hành động: CẬP NHẬT

Vấn đề phát hiện:
- Các câu trong đoạn văn quá dài (>25 từ): Câu 1 dài 39 từ, Câu 2 dài 32 từ, Câu 4 dài 37 từ.

Đề xuất sửa cụ thể:
- Tách các câu dài thành câu ngắn ≤ 25 từ để người đọc (nhất là nông dân) dễ theo dõi bằng điện thoại di động.
- Paragraph 1 sửa thành: "Bệnh rỉ sắt (còn gọi là gỉ sắt) là một trong các nhóm [sâu bệnh hại dược liệu](/kien-thuc/sau-benh-hai-cay-duoc-lieu) rất phổ biến. Bệnh do các loài nấm ký sinh chuyên tính thuộc bộ Pucciniales gây ra. Khi bào tử chín, chúng nứt ra giải phóng lớp bột mịn màu vàng cam hoặc nâu đỏ giống như rỉ sét."
- Paragraph 2 sửa thành: "Đây là nhóm nấm ký sinh bắt buộc, chỉ hút dinh dưỡng từ tế bào lá còn sống. Khi bám vào lá, chúng đâm sợi nấm sâu vào trong tế bào để hút nhựa. Quá trình này phá hủy diệp lục, làm vỡ tế bào và khiến cây bị giảm khả năng quang hợp nghiêm trọng."

## Section 2 — "2. Dấu hiệu nhận biết bệnh rỉ sắt trên lá cây trồng"
Hành động: CẬP NHẬT

Vấn đề phát hiện:
- Paragraph 2 có 4 câu (vượt chuẩn 2-3 câu), câu 1 hơi dài (26 từ).
- Câu highlight hơi dài (32 từ).

Đề xuất sửa cụ thể:
- Tách và gộp Paragraph 2 thành 3 câu ngắn gọn: "Khi các vết u nứt ra, lớp bột mịn màu vàng cam hoặc nâu đỏ sẽ lộ rõ dưới lá. Bà con quệt tay vào sẽ thấy bột nấm bám dính như bụi phấn. Mặt trên lá lúc này chuyển vàng úa rồi rụng sớm, thậm chí bệnh lan sang cả cuống và quả."
- Rút gọn highlight: "Cách kiểm tra nhanh: Hãy lật mặt dưới lá và quệt nhẹ ngón tay. Nếu dính lớp bột màu vàng cam, cây của bà con đã nhiễm bệnh rỉ sắt."

## Section 3 — "3. Biện pháp canh tác phòng bệnh rỉ sắt chủ động"
Hành động: CẬP NHẬT

Vấn đề phát hiện:
- Có các câu dài: Câu 2 (27 từ), Câu 3 (35 từ), Câu 7 (29 từ).

Đề xuất sửa cụ thể:
- Viết lại Paragraph 1 ngắn gọn, súc tích: "Bà con cần chủ động kiểm soát độ ẩm để phòng bệnh rỉ sắt hiệu quả. Nấm phát triển mạnh nhất ở nhiệt độ 15 đến 25 độ C cùng độ ẩm trên 90%. Do đó, hãy trồng mật độ hợp lý và [diệt cỏ dại](/kien-thuc/cach-diet-co-dai) quanh gốc để vườn luôn thông thoáng."
- Viết lại Paragraph 2 để kiểm soát độ dài câu và số câu (3 câu): "Chế độ dinh dưỡng cho cây cũng cần được chú trọng. Việc lạm dụng phân đạm hóa học sẽ làm lá mềm mỏng, giúp nấm dễ đâm xuyên. Bà con nên bón tăng kali để lá cứng cáp, kết hợp phun nấm đối kháng Trichoderma phòng ngừa đầu mùa mưa."

## Section 4 — "4. Cách điều trị bệnh rỉ sắt hiệu quả và an toàn"
Hành động: CẬP NHẬT

Vấn đề phát hiện:
- Có câu dài: Câu 1 (37 từ), Câu 3 (28 từ).
- Highlight dùng từ "thu hoạch" và "chuẩn dược liệu GACP" cần đồng bộ lại.

Đề xuất sửa cụ thể:
- Viết lại Paragraph 1: "Khi thấy lá chớm bệnh, bà con cần ngắt bỏ ngay và mang tiêu hủy xa vườn. Bào tử rỉ sắt rất nhẹ, dễ phát tán xa hàng km theo chiều gió. Chúng cũng có thể bám vào quần áo của tôi và bà con khi ra vào chăm sóc."
- Viết lại Paragraph 2: "Nếu bệnh nặng, bà con hãy phun chế phẩm sinh học Chaetomium hoặc thuốc gốc đồng để sát khuẩn lá. Việc phun thuốc hóa học nội hấp chứa Hexaconazole chỉ nên là giải pháp cuối cùng. Tôi khuyên bà con phải tuân thủ nghiêm ngặt thời gian cách ly để tránh tồn dư hóa chất."
- Sửa Highlight: "Lưu ý cho vườn dược liệu: Không lạm dụng thuốc hóa học sát ngày thu hái. Hãy ưu tiên thuốc sinh học để đảm bảo tiêu chuẩn thu mua đạt [quy trình GACP-WHO](/kien-thuc/tieu-chuan-gacp)." (Đổi "thu hoạch" thành "thu hái", đổi anchor text của `/kien-thuc/tieu-chuan-gacp` thành "quy trình GACP-WHO" để tránh lặp anchor text "chuẩn dược liệu GACP" của nguồn cũ).

## Section 5 — "5. Mức độ ảnh hưởng trên các cây dược liệu"
Hành động: GỘP/TÁCH VÀ SWAP VỊ TRÍ
- Di chuyển section này xuống thành Section 6 (ở vị trí cuối cùng trong `contentSections`, đứng ngay trước `## Bảng: ...`).

Vấn đề phát hiện:
- Đọc rời rạc vì bị Section 6 (Lời khuyên) ngăn cách với bảng dữ liệu.
- Paragraph 2 chỉ có 1 câu và dài (27 từ).

Đề xuất sửa cụ thể:
- Đổi tiêu đề thành "6. Mức độ ảnh hưởng trên các cây dược liệu".
- Sửa Paragraph 2 thành 2 câu ngắn gọn: "Bảng dưới đây tổng hợp dấu hiệu rỉ sắt trên ba loại dược liệu phổ biến. Thông tin này sẽ giúp ích cho bà con trong danh mục thu mua đạt chuẩn."

## Section 6 — "6. Lời khuyên cuối của Nguyễn Viết Lộc cho bà con"
Hành động: GỘP/TÁCH VÀ SWAP VỊ TRÍ
- Di chuyển section này lên thành Section 5.

Vấn đề phát hiện:
- Chứa các câu dài: Câu 1 (26 từ), Câu 2 (28 từ), Câu 3 (28 từ).
- Sử dụng từ "thu hoạch".

Đề xuất sửa cụ thể:
- Đổi tiêu đề thành "5. Lời khuyên cuối của Nguyễn Viết Lộc cho bà con".
- Viết lại Paragraph 1: "Bệnh rỉ sắt lây lan nhanh nhưng có thể kiểm soát nếu bà con thăm vườn thường xuyên. Hãy chủ động lật mặt dưới lá để kiểm tra sớm. Đừng để cả vườn vàng úa mới tìm cách xử lý vì sẽ rất tốn kém."
- Viết lại Paragraph 2: "Đất thoát nước tốt và mật độ trồng thưa là những yếu tố phòng bệnh hàng đầu. Việc thu dọn lá bệnh chu đáo cũng giúp ngăn ngừa lây lan hiệu quả. Chúc bà con canh tác an toàn và đạt năng suất thu hái tốt nhất."

## Mục mới đề xuất thêm (nếu có)
- Không thêm section mới.
- Trong bảng so sánh, cột 1 hàng 3 sửa thành `[Cát căn](/kien-thuc/ky-thuat-trong-cat-can)` (sửa từ "Cát cánh") để hướng link đúng về wiki-hub Cát căn.
- Sửa từ "thu hoạch" thành "thu hái" ở cột 3 hàng 1 trong bảng: "sau mỗi đợt cắt thu hái lứa lá."

## Không đổi
- Toàn bộ các thông tin cốt lõi về kỹ thuật, nấm gây hại và dấu hiệu đặc trưng trong bảng được giữ nguyên để bảo đảm tính chuẩn xác.
