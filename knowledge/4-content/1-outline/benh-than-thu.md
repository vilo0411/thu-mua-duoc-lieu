# Proposal audit: benh-than-thu

Nguồn: content/wiki/benh-than-thu.json
Ngày audit: 2026-08-20

## Nghiên cứu SERP đối thủ (vai SEO Collector)
Keyword search dùng: bệnh thán thư dấu hiệu cách phòng trị
Đối thủ top 3-5 (URL + outline thật từng đối thủ):
- hoptrisummit.com:
  - H2: Bệnh thán thư là gì?
  - H2: Dấu hiệu nhận biết bệnh thán thư
  - H2: Điều kiện phát sinh và phát triển bệnh thán thư
  - H2: Biện pháp phòng trừ bệnh thán thư hiệu quả
  - USP: Tập trung các giải pháp thuốc bảo vệ thực vật đặc trị của Hợp Trí (Norshield, Keviar, AgriLife) kết hợp dinh dưỡng.
- sfarm.vn:
  - H2: Bệnh thán thư là gì?
  - H2: Tác nhân gây bệnh thán thư
  - H2: Triệu chứng bệnh thán thư trên các bộ phận cây
  - H2: Điều kiện phát triển của bệnh thán thư
  - H2: Biện pháp phòng trừ bệnh thán thư hiệu quả
  - USP: Hướng dẫn kỹ thuật nông nghiệp hữu cơ, nhấn mạnh việc sử dụng nấm đối kháng Trichoderma, dọn dẹp vệ sinh vườn, bón phân hữu cơ.
- bacte.vn:
  - H2: Bệnh thán thư hại cây trồng là gì?
  - H2: Tác nhân và triệu chứng gây hại
  - H2: Cách phòng ngừa và điều trị bệnh thán thư
  - USP: Phân tích chi tiết tác nhân Colletotrichum spp. và kết hợp cả thuốc sinh học lẫn hóa học.

Outline tổng hợp đối thủ (heading lặp lại ở ≥ 2 đối thủ):
- Bệnh thán thư là gì / Tác nhân gây bệnh
- Dấu hiệu / Triệu chứng nhận biết (trên lá, thân, quả)
- Điều kiện phát sinh và phát triển bệnh
- Biện pháp phòng ngừa và điều trị (canh tác, sinh học, hóa học)

## So sánh outline hiện tại vs đối thủ
- Outline hiện tại (từ contentSections):
  - 1. Bệnh thán thư là gì, do đâu?
  - 2. Dấu hiệu nhận biết trên cây
  - 3. Điều kiện phát sinh
  - 4. Cách phòng và trị thán thư
  - 5. Mức độ ảnh hưởng trên các cây dược liệu
  - 6. Lời khuyên của Nguyễn Viết Lộc cho bà con
- Đối thủ có mà bài chưa có:
  - Chi tiết về tên khoa học của nấm (*Colletotrichum* spp.) và cơ chế lây lan qua giọt nước mưa hoặc bào tử bay trong không khí.
- Bài có mà đối thủ không có:
  - Section 5: Bảng đặc điểm thán thư trên các cây dược liệu tiêu biểu (Kim ngân hoa, Đinh lăng, Cà gai leo). Đây là điểm khác biệt cực kỳ tốt, nhắm đúng ngách dược liệu của trang web.
  - Section 6: Lời khuyên cá nhân của Nguyễn Viết Lộc (xây dựng E-E-A-T cá nhân).
- Thứ tự trình bày: Cấu trúc hiện tại rất hợp lý, đi từ khái niệm -> dấu hiệu -> điều kiện -> giải pháp -> bảng so sánh thực tế -> lời khuyên.

## Định hướng tổng thể
Mức độ lệch outline: THẤP
Lý do: Cấu trúc outline hiện tại đã bao phủ đầy đủ search intent của đối thủ, đồng thời bổ sung bảng đối chiếu dược liệu rất giá trị. Chỉ cần tối ưu hóa nội dung chi tiết của từng section để đạt chuẩn E-E-A-T, sửa lỗi chính tả/encoding ở các heading Markdown (`Báº£ng`, `Sai láº§m phá»• biáº¿n`), và bổ sung thêm 1 hàng cho bảng so sánh để đạt tiêu chuẩn tối thiểu 4 hàng của dự án.

Đề xuất: CẬP NHẬT TỪNG PHẦN
- CẬP NHẬT TỪNG PHẦN: Sửa đổi các section hiện có để nâng cao tính cụ thể (Specificity), bổ sung hoạt chất/tác nhân khoa học (Prove It), điều chỉnh độ dài câu chữ và liên kết nội bộ theo silo chuẩn.

## Section 1 — "1. Bệnh thán thư là gì, do đâu?"
Hành động: CẬP NHẬT

Vấn đề phát hiện:
- Có đoạn bị lửng lơ dấu ba chấm: "...phổ biến gây đốm lõm trên nhiều cây trồng...".
- Thiếu thông tin kỹ thuật về tác nhân (nấm *Colletotrichum* spp.).
- Anchor text "sâu bệnh hại dược liệu" cho link `/kien-thuc/sau-benh-hai-cay-duoc-lieu` bị lặp từ bài khác.

Đề xuất sửa cụ thể:
- Hoàn thiện câu bị lửng lơ. Bổ sung tên khoa học nấm *Colletotrichum* spp. và cách thức mầm bệnh tồn tại trong đất hoặc tàn dư cây bệnh.
- Đổi anchor text thành "nhóm sâu bệnh hại trên dược liệu" để tránh trùng lặp anchor text trong anchor-index.md.
- Đảm bảo mỗi câu ≤ 25 từ, đoạn gồm 2-3 câu.

## Section 2 — "2. Dấu hiệu nhận biết trên cây"
Hành động: CẬP NHẬT

Vấn đề phát hiện:
- Các dấu hiệu liệt kê còn sơ sài, thiếu mô tả trực quan cụ thể về ổ bào tử hoặc màu sắc biến đổi của vết bệnh.

Đề xuất sửa cụ thể:
- Mô tả chi tiết hơn về vết bệnh lõm xuống, sự xuất hiện của các vòng tròn đồng tâm và chấm đen li ti (ổ bào tử) khi thời tiết ẩm ướt kéo dài.
- Tách bạch rõ biểu hiện trên lá, thân cành và hoa quả thành các câu ngắn gọn dễ đọc.

## Section 3 — "3. Điều kiện phát sinh"
Hành động: CẬP NHẬT

Vấn đề phát hiện:
- Thiếu thông tin số liệu cụ thể về nhiệt độ và ẩm độ thích hợp cho nấm thán thư phát triển.

Đề xuất sửa cụ thể:
- Bổ sung ngưỡng nhiệt độ (25-30 độ C) và độ ẩm không khí (> 85%) là môi trường lý tưởng để bào tử nấm nảy mầm.
- Giải thích rõ cơ chế lây lan cơ giới qua hạt mưa bắn hoặc dụng cụ cắt tỉa chưa khử trùng.

## Section 4 — "4. Cách phòng và trị thán thư"
Hành động: CẬP NHẬT

Vấn đề phát hiện:
- Các biện pháp canh tác, sinh học và hóa học gộp chung trong các câu dài, khó theo dõi.
- Thiếu tên các hoạt chất hóa học cụ thể và nguyên tắc an toàn cho dược liệu.
- Anchor text của link `/kien-thuc/cach-tron-dat-trong-cay` có thể cụ thể hơn; link `/kien-thuc/tieu-chuan-gacp` và `/kien-thuc/benh-dom-la` cần chỉnh anchor text tránh trùng lặp.

Đề xuất sửa cụ thể:
- Tách rõ rệt ba nhóm biện pháp: Canh tác, Sinh học và Hóa học thành các đoạn văn riêng biệt.
- Biện pháp sinh học: Nêu rõ việc dùng nấm đối kháng *Trichoderma* hoặc chế phẩm *Bacillus subtilis*.
- Biện pháp hóa học: Bổ sung các hoạt chất được phép như Azoxystrobin, Difenoconazole hoặc thuốc gốc đồng (Copper Hydroxide), nhấn mạnh việc tuân thủ thời gian cách ly nghiêm ngặt để đảm bảo an toàn dược liệu.
- Thay đổi anchor text:
  - `/kien-thuc/cach-tron-dat-trong-cay` dùng "phương pháp trộn đất trồng".
  - `/kien-thuc/tieu-chuan-gacp` dùng "tiêu chuẩn canh tác GACP-WHO".
  - `/kien-thuc/benh-dom-la` dùng "bệnh đốm lá".

## Section 5 — "5. Mức độ ảnh hưởng trên các cây dược liệu"
Hành động: CẬP NHẬT

Vấn đề phát hiện:
- Nội dung mỏng, chỉ có 2 câu giới thiệu bảng.

Đề xuất sửa cụ thể:
- Viết lại mượt mà hơn, nhấn mạnh tầm quan trọng của việc theo dõi sát sao biểu hiện bệnh trên từng đối tượng cây trồng cụ thể để có hướng xử lý kịp thời.

## Section 6 — "6. Lời khuyên của Nguyễn Viết Lộc cho bà con"
Hành động: CẬP NHẬT

Vấn đề phát hiện:
- Khá ngắn, có thể tăng thêm tính thuyết phục bằng lời khuyên cụ thể về kỹ thuật tưới nước.

Đề xuất sửa cụ thể:
- Nhấn mạnh lời khuyên về việc tránh tưới phun mưa vào buổi chiều tối, khuyến khích lắp đặt hệ thống tưới nhỏ giọt để giữ gốc ẩm nhưng tán lá luôn khô ráo.

## Bảng mới đề xuất thêm (nếu có)
- Không thêm bảng mới, nhưng cập nhật bảng `standardsTable` hiện có:
  - Thêm hàng thứ 4: **Cây dược liệu Hoắc hương** (slug: `/kien-thuc/ky-thuat-trong-hoac-huong`, anchor text: "cây dược liệu Hoắc hương").
  - Biểu hiện thán thư: "Lá xuất hiện đốm tròn màu nâu lõm nhẹ, lan rộng làm cháy khô một phần phiến lá và rụng sớm."
  - Biện pháp riêng biệt: "Trồng khoảng cách thưa, thường xuyên tỉa bỏ cành sát đất để gốc cây thông thoáng."

## Sửa lỗi hiển thị heading Markdown
- Sửa `## Báº£ng: Đặc điểm bệnh thán thư...` thành `## Bảng: Đặc điểm bệnh thán thư...`
- Sửa `## Sai láº§m phá»• biáº¿n` thành `## Sai lầm phổ biến`

## Không đổi
- Giữ nguyên các thông tin metadata cốt lõi như `id`, `slug`, `category`, `author` để đảm bảo tính nhất quán của hệ thống dữ liệu.
