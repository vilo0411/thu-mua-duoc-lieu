# Proposal audit: benh-moc-suong

Nguồn: content/wiki/benh-moc-suong.json
Ngày audit: 2026-08-20

## Nghiên cứu SERP đối thủ (vai SEO Collector, bổ sung 2026-08-20 — thiếu ở bản audit gốc)
Đối thủ đã có: Top kết quả cho "bệnh mốc sương"/"bệnh sương mai" đều viết cho cây trồng đại trà (cà chua, khoai tây, nho, mít, dưa chuột, rau màu) — vd [nguyenlieusinhhoc.com](https://nguyenlieusinhhoc.com/benh-moc-suong-tren-cay-nho/), [sinochem.com.vn](https://sinochem.com.vn/thuoc-tri-benh-moc-suong-ca-chua-hieu-qua-va-ky-thuat-phong-tru-ben-vung/), [hoptrisummit.com](https://www.hoptrisummit.com/tin-tuc/tin-nong-nghiep/benh-suong-mai), [dasshu.vn](https://dasshu.vn/cach-tri-nam-phytophthora/). Outline chung: nguyên nhân (nấm Phytophthora/Peronospora) → triệu chứng (đốm úng nước, mốc trắng-xám mặt dưới lá) → điều kiện phát sinh (ẩm, mát 18-25°C) → thuốc đặc trị theo tên thương mại (Ridomil Gold, Phytocide 50WP, HIDA 15WG, Ceres 600SL) → biện pháp canh tác.
Khoảng trống: Không đối thủ nào viết riêng cho nhóm cây dược liệu — toàn bộ generic cho rau màu/cây ăn quả, không nhắc thời gian cách ly khi dùng thuốc hóa học (quan trọng với dược liệu vì ảnh hưởng chuẩn GACP/dư lượng), không có bảng so sánh biểu hiện theo từng loại cây cụ thể.
Đề xuất section/thay đổi từ SERP: Bài đã publish giữ đúng hướng khai thác khoảng trống này (bảng so sánh theo 4 cây dược liệu + link chuẩn GACP + lưu ý cách ly khi dùng hoạt chất hóa học ở Section 3) — không cần thêm section mới ngoài các đề xuất bên dưới.

**Lưu ý quy trình**: Mục này được bổ sung sau khi bài đã publish, vì bản audit gốc bỏ qua bước SERP research bắt buộc (vi phạm `.agents/rules/workflow-integrity.md`). Đã cập nhật template Proposal ở `.agents/workflows/seo-optimize.md` và `.agents/workflows/outlining.md` để bắt buộc ghi lại mục này ngay từ đầu ở các lần audit sau.

## 1. Tối ưu Metadata (Frontmatter)
- **seoTitle**: Tăng chiều dài từ 43 ký tự lên 58 ký tự để tối ưu CTR và chứa từ khóa mục tiêu:
  - Hiện tại: `"Bệnh mốc sương: dấu hiệu và cách phòng trị"`
  - Đề xuất: `"Bệnh mốc sương ở cây dược liệu: Dấu hiệu và cách phòng trị"`
- **excerpt**: Rút ngắn từ 183 ký tự xuống còn 156 ký tự (đúng chuẩn 150-160 ký tự theo PRD §8.1):
  - Hiện tại: `"Mốc sương là bệnh lây lan cực nhanh trong thời tiết lạnh ẩm, có thể phá cả ruộng chỉ trong vài ngày. Tôi tổng hợp lại dấu hiệu, điều kiện phát sinh và cách phòng trị kịp thời cho cây trồng."`
  - Đề xuất: `"Bệnh mốc sương lây nhanh khi trời lạnh ẩm, dễ xóa sổ cả ruộng dược liệu chỉ sau vài ngày. Tôi tổng hợp dấu hiệu và cách phòng trị kịp thời cho bà con."`

---

## 2. Chi tiết từng Section trong Body

### Section 1 — "1. Bệnh mốc sương là gì?"
- **Hành động**: CẬP NHẬT
- **Vấn đề phát hiện**:
  - Câu đầu tiên quá dài (38 từ), vượt tiêu chuẩn dễ đọc trên di động (≤ 25 từ).
  - Có dấu gạch ngang dài `—` cần thay thế.
  - Sử dụng ngoặc kép và dấu ngoặc đơn không cần thiết.
- **Đề xuất sửa cụ thể**:
  - Chia câu dài thành 3 câu ngắn. Thay thế `—` bằng dấu gạch nối ngắn `-`. Loại bỏ danh sách nấm trong ngoặc đơn để tăng tính thực tế cho hộ trồng.
  - Văn bản mới:
    > "Mốc sương là bệnh do nấm noãn Phytophthora gây ra. Bệnh nổi tiếng với tốc độ lây lan nhanh và sức tàn phá lớn. Khi gặp thời tiết thuận lợi, cả ruộng dược liệu có thể cháy rụi chỉ trong vài ngày.
    >
    > Bệnh tấn công cả lá, thân và quả, tạo các vết úng nước lan nhanh. Đặc trưng nhất là lớp mốc trắng xám như sương ở mặt dưới lá vào sáng sớm."
  - **HIGHLIGHT**: Chuyển dấu `—` thành `-`. Loại bỏ ngoặc đơn giải thích.
    > "Dấu hiệu nhận biết: vết bệnh xanh tái hoặc nâu đen úng nước lan nhanh từ mép lá. Khi trời ẩm, mặt dưới vết bệnh có lớp mốc trắng xám mịn."

### Section 2 — "2. Điều kiện phát sinh"
- **Hành động**: CẬP NHẬT
- **Vấn đề phát hiện**:
  - Chứa dấu gạch ngang dài `—`.
  - Có câu ghép dài cần tách ngắn hơn để thân thiện với giao diện di động.
- **Đề xuất sửa cụ thể**:
  - Tách câu và chỉnh sửa dấu câu cho trơn tru.
  - Văn bản mới:
    > "Bệnh bùng phát mạnh khi trời mát lạnh, độ ẩm cao, nhiều sương mù và mưa phùn kéo dài. Lá cây ẩm ướt liên tục là điều kiện lý tưởng để nấm nảy mầm.
    >
    > Bào tử nấm phát tán nhanh theo gió và nguồn nước. Nếu bà con không xử lý kịp, chỉ một ổ bệnh nhỏ cũng dễ bùng phát thành dịch cho cả vườn."

### Section 3 — "3. Cách phòng và trị mốc sương"
- **Hành động**: CẬP NHẬT
- **Vấn đề phát hiện**:
  - Chứa link lặp lại `[phấn trắng](/kien-thuc/benh-phan-trang)` hai lần trong cùng một section, gây thừa thãi.
  - Có nhiều câu ghép phức tạp và từ ngữ mang tính lý thuyết y khoa/sinh học cao.
  - Sử dụng nhiều dấu ngoặc đơn để chú thích hoạt chất và chế phẩm sinh học.
- **Đề xuất sửa cụ thể**:
  - Rút gọn các câu dài, bỏ dấu ngoặc đơn và chuyển chú thích hoạt chất thành các cụm từ liệt kê tự nhiên phù hợp với ngôn ngữ bà con nhà nông.
  - Loại bỏ link phấn trắng thứ hai (chỉ giữ lại ở đoạn phân biệt đầu tiên).
  - Văn bản mới:
    > "Đối với mốc sương, phòng bệnh luôn là ưu tiên hàng đầu. Tôi khuyên bà con nên trồng mật độ vừa phải, cắt tỉa cành sát gốc để tán lá luôn thông thoáng. Đồng thời, cần lên luống cao thoát nước tốt và tránh tưới nước lên lá vào chiều muộn.
    >
    > Khi phát hiện vết bệnh đầu tiên, tôi thường ngắt bỏ và tiêu hủy ngay các lá bệnh ra xa nguồn nước. Sau đó, phun ngay các chế phẩm sinh học chứa vi khuẩn Bacillus subtilis hoặc nấm đối kháng Trichoderma để chặn đứng đường lây lan.
    >
    > Nếu thời tiết mưa phùn lạnh kéo dài, áp lực bệnh tăng cao, bà con có thể dùng các hoạt chất chuyên trị nấm noãn như metalaxyl hoặc mancozeb. Tuy nhiên, vì là cây dược liệu, tôi khuyên bà con ưu tiên các hoạt chất gốc đồng an toàn. Nếu buộc phải dùng thuốc hóa học, bà con bắt buộc phải tuân thủ nghiêm ngặt thời gian cách ly.
    >
    > Để phân biệt, bà con nên nhớ mốc sương rất dễ nhầm với bệnh [phấn trắng](/kien-thuc/benh-phan-trang). Tuy nhiên, hai bệnh này khác nhau hoàn toàn về vị trí vết bệnh và cách xử lý thực tế.
    >
    > Cuối vụ trồng, hãy dọn sạch lá bệnh khô rụng để tránh mầm bệnh tồn dư trong đất. Đồng thời, bà con nên canh tác theo [chuẩn dược liệu GACP](/kien-thuc/tieu-chuan-gacp). Việc này giúp ruộng luôn khỏe mạnh và đạt tiêu chuẩn thu mua tốt nhất."

### Section 4 — "Mức độ ảnh hưởng trên các cây dược liệu" & Section 5 — "Lời khuyên của Nguyễn Viết Lộc cho bà con"
- **Hành động**: ĐỔI THỨ TỰ (Section 5 lên trước Section 4) & CẬP NHẬT
- **Vấn đề phát hiện**:
  - Bảng so sánh (`standardsTable`) được định nghĩa ở cấp độ root của JSON và luôn được render ở cuối bài viết. Việc để Section 5 (Lời khuyên) nằm dưới Section 4 (Giới thiệu bảng) dẫn đến việc render bị đứt gãy cấu trúc (Section 4 giới thiệu bảng -> Section 5 chen vào -> Bảng xuất hiện).
  - Đẩy Section 4 (Giới thiệu bảng) xuống cuối cùng của `contentSections` để hiển thị liền mạch với bảng dữ liệu.
  - Rút ngắn câu trong phần lời khuyên và sửa đổi các câu giới thiệu cho khớp với bảng dữ liệu 4 hàng mới.
- **Đề xuất sửa cụ thể**:
  - **Mục 4 mới ("Lời khuyên của Nguyễn Viết Lộc cho bà con")**:
    > "Tôi khuyên bà con thường xuyên tỉa cành rậm rạp và bón đủ phân kali để lá cây cứng cáp. Điều này giúp hạn chế tối đa nguy cơ mốc sương lây lan diện rộng.
    >
    > Bà con tuyệt đối không tưới phun mưa vào chiều tối, tránh để nước đọng ẩm qua đêm trên tán lá."
  - **Mục 5 mới ("Mức độ ảnh hưởng trên các cây dược liệu")**:
    > "Mốc sương gây hại nghiêm trọng nhất cho nhóm dược liệu ưa khí hậu mát mẻ hoặc trồng vụ đông xuân. Bệnh tấn công mạnh vào những thời điểm trời nhiều sương ẩm.
    >
    > Dưới đây là bảng so sánh biểu hiện bệnh mốc sương và cách xử lý trên bốn cây dược liệu tiêu biểu."

---

## 3. Tối ưu Bảng So Sánh (standardsTable)
- **Hành động**: CẬP NHẬT
- **Vấn đề phát hiện**:
  - Hiện bảng chỉ có 3 dòng dữ liệu (Actiso, Cúc hoa vàng, Ngải diệp). Để tối ưu Featured Snippet dạng bảng, cần tối thiểu 4 dòng dữ liệu theo PRD.
- **Đề xuất sửa cụ thể**:
  - Bổ sung thêm dòng thứ 4 cho cây **Bạc hà Á** (một loại dược liệu ưa lạnh ẩm, rất dễ nhiễm bệnh sương mai/mốc sương).
  - Nội dung hàng mới:
    - **Cây dược liệu**: `[Bạc hà Á](/kien-thuc/ky-thuat-trong-bac-ha)`
    - **Biểu hiện mốc sương đặc trưng**: `Lá xuất hiện đốm vàng nhạt chuyển nâu đen, mặt dưới phủ lớp mốc mịn xám tím khi trời lạnh ẩm kéo dài.`
    - **Biện pháp phòng ngừa riêng biệt**: `Trồng mật độ vừa phải, khơi thông rãnh thoát nước sau mưa, cắt tỉa thu hoạch sớm các lứa chớm bệnh.`

---

## 4. Tối ưu FAQ (People Also Ask)
- **Hành động**: GIỮ NGUYÊN (đã đạt chuẩn tối ưu)
- **Giải thích**: Các câu hỏi FAQ hiện tại đã có câu trả lời trực tiếp trong khoảng 40-60 từ ở câu đầu tiên, đáp ứng tốt tiêu chuẩn Featured Snippet dạng đoạn văn.
