# Báo Cáo Phân Tích Cụm Chủ Đề (Topical Map Analysis)

Báo cáo này đối chiếu bản đồ từ khóa trong `topical-map-duoc-lieu.csv` với các bài viết đã xuất bản trong hệ thống nội dung (silo Wiki, Hub theo cây, Money cây/vùng) để xác định mức độ phủ nội dung (Topical Coverage) và các lỗ hổng nội dung (Content Gaps).

---

## 1. Thống Kê Tổng Quan (Topical Coverage Summary)

Tổng số từ khóa trong topical map: **82 từ khóa**
*   **Đã triển khai / Xuất bản**: **50 từ khóa** (Tỷ lệ phủ: **~61%**)
    *   *Đã xuất bản dưới dạng bài Wiki chuyên biệt*: 25 từ khóa
    *   *Đã lồng ghép trong nội dung bài Wiki liên quan*: 13 từ khóa
    *   *Đã phủ trong trang sản phẩm Money (Cay)*: 9 từ khóa
    *   *Đã phủ trong trang Hub kỹ thuật (Hub)*: 1 từ khóa
    *   *Đã triển khai & gộp bài (theo Excel)*: 2 từ khóa
*   **Chưa bắt đầu (Content Gaps)**: **32 từ khóa** (Tỷ lệ thiếu: **~39%**)

---

## 2. Danh Sách Lỗ Hổng Nội Dung (Content Gaps - Chưa Bắt Đầu)

Dưới đây là 32 từ khóa chưa được triển khai, được phân loại theo các cụm chủ đề chính để phục vụ làm đầu vào cho kế hoạch từ khóa tiếp theo (`/keyword-plan`):

### Cụm 1: Đất trồng & Giá thể (Kỹ thuật gieo trồng -> đất trồng)
*Số lượng: 11 từ khóa. Cụm này đang thiếu các bài hướng dẫn chi tiết cho từng loại thổ nhưỡng và kỹ thuật xử lý đất.*
*   `tỷ lệ trộn đất trồng rau`
*   `các loại đất trồng cây`
*   `đất cát trồng cây gì`
*   `đất mặn trồng cây gì`
*   `đất phèn trồng cây gì`
*   `đất phù sa thích hợp trồng cây gì`
*   `đất sét trồng cây gì`
*   `cách đo ph đất`
*   `nâng ph đất`
*   `cách làm đất tơi xốp`

### Cụm 2: Nhân giống & Xử lý giống (Kỹ thuật gieo trồng -> giống cây)
*Số lượng: 10 từ khóa. Cụm này đang thiếu các cẩm nang hướng dẫn kỹ thuật nhân giống vô tính/hữu tính chi tiết.*
*   `các phương pháp nhân giống cây trồng`
*   `chiết cành bằng nước`
*   `phương pháp ghép cành`
*   `phương pháp chiết cành`
*   `phương pháp nhân giống vô tính`
*   `phương pháp nhân giống hữu tính`
*   `cách xử lý hạt giống`

### Cụm 3: Chăm sóc & Dinh dưỡng (Kỹ thuật chăm sóc -> bón phân & diệt cỏ)
*Số lượng: 7 từ khóa. Thiếu cẩm nang sâu về phân chuồng và phân bón vô cơ/hữu cơ.*
*   `cách bón thúc`
*   `phân chuồng là gì`
*   `cách ủ phân chuồng`
*   `phân chuồng hoai mục`
*   `các loại phân hữu cơ`
*   `các loại phân bón vô cơ`
*   `cách diệt cỏ tranh`

### Cụm 4: Sơ chế sau thu hoạch (Sơ chế -> Phơi & Sấy khô)
*Số lượng: 3 từ khóa. Thiếu bài viết sâu về công nghệ sấy hiện đại.*
*   `phơi sấy dược liệu`
*   `phương pháp sấy lạnh`
*   `quy trình sấy thăng hoa`

### Cụm 5: Dịch vụ, Thu mua & Giá cả (Giá & Thu mua)
*Số lượng: 5 từ khóa.*
*   `giá đinh lăng`
*   `giá atiso`
*   `thu mua dược liệu`
*   `thu mua dược liệu tại hà nội`
*   `thu mua dược liệu tại miền Bắc`

---

## 3. Các Từ Khóa Đã Triển Khai Chi Tiết (Implemented Content Mapping)

| Hàng trong CSV | Từ khóa | Cụm chủ đề gốc | Trạng thái đối chiếu | File/URL đích tương ứng |
| :--- | :--- | :--- | :--- | :--- |
| **Row 2** | bảo quản dược liệu | Sơ chế -> Bảo quản | Đã xuất bản (Wiki) | `content/wiki/bao-quan-duoc-lieu.json` |
| **Row 3** | cách bón lót | Kỹ thuật gieo trồng -> Bón phân | Đã xuất bản (Wiki) | `content/wiki/cach-bon-lot-bon-thuc.json` |
| **Row 5** | loại phân nào dùng để bón lót | Kỹ thuật gieo trồng -> Bón phân | Đã xuất bản (Wiki - lồng ghép) | `content/wiki/cach-bon-lot-bon-thuc.json` |
| **Row 6** | cách diệt cỏ dại | Kỹ thuật Chăm sóc -> diệt cỏ | Đã xuất bản (Wiki) | `content/wiki/cach-diet-co-dai.json` |
| **Row 7** | trộn đất trồng cây | Kỹ thuật gieo trồng -> đất trồng | Đã xuất bản (Wiki - lồng ghép) | `content/wiki/benh-lo-co-re-thoi-re.json` |
| **Row 8** | cách giâm cành | Kỹ thuật gieo trồng -> giống cây | Đã xuất bản (Wiki) | `content/wiki/cach-giam-canh.json` |
| **Row 9** | cách giâm cành đinh lăng | Kỹ thuật gieo trồng -> giống cây | Đã xuất bản (Wiki) | `content/wiki/cach-giam-canh.json` |
| **Row 10** | cách ủ hạt giống | Kỹ thuật gieo trồng -> giống cây | Đã xuất bản (Wiki - lồng ghép) | `content/wiki/cach-u-hat-giong.json` |
| **Row 11** | bệnh đốm lá | Phòng trừ sâu bệnh -> Các bệnh | Đã xuất bản (Wiki) | `content/wiki/benh-dom-la.json` |
| **Row 12** | bệnh lở cổ rễ | Phòng trừ sâu bệnh -> Các bệnh | Đã xuất bản (Wiki) | `content/wiki/benh-lo-co-re-thoi-re.json` |
| **Row 13** | bệnh mốc sương | Phòng trừ sâu bệnh -> Các bệnh | Đã xuất bản (Wiki) | `content/wiki/benh-moc-suong.json` |
| **Row 16** | kỹ thuật trồng cây dược liệu | Kỹ thuật trồng -> Cây dược liệu | Đã xuất bản (Wiki) | `content/wiki/ky-thuat-trong-cay-duoc-lieu.json` |
| **Row 17** | tiêu chuẩn gmp | Tiêu chuẩn trồng -> Cây dược liệu | Đã xuất bản (Wiki) | `content/wiki/tieu-chuan-gmp.json` |
| **Row 18** | tiêu chuẩn gacp | Tiêu chuẩn trồng -> Cây dược liệu | Đã xuất bản (Wiki) | `content/wiki/tieu-chuan-gacp.json` |
| **Row 19** | tiêu chuẩn gmp who | Tiêu chuẩn trồng -> Cây dược liệu | Đã xuất bản (Wiki) | `content/wiki/tieu-chuan-gmp.json` |
| **Row 20** | Kỹ thuật trồng Ba kích | Kỹ thuật trồng -> Cây thu củ/rễ | Đã xuất bản (Cay) | `content/cay/ba-kich.json` |
| **Row 21** | Kỹ thuật trồng đinh lăng | Kỹ thuật trồng -> Cây thu củ/rễ | Đã xuất bản (Cay) | `content/cay/dinh-lang.json` |
| **Row 22** | Kỹ thuật trồng Hà thủ ô | Kỹ thuật trồng -> Cây thu củ/rễ | Đã xuất bản (Cay) | `content/cay/ha-thu-o.json` |
| **Row 23** | Kỹ thuật trồng actiso | Kỹ thuật trồng -> Cây thu hoa/lá | Đã xuất bản (Hub) | `content/wiki-hub/ky-thuat-trong-actiso.json` |
| **Row 24** | cách trị rệp sáp | Sâu hại & Côn trùng -> Côn trùng | Đã xuất bản (Wiki) | `content/wiki/cach-tri-rep-sap.json` |
| **Row 25** | trộn vỏ trấu vào đất | Kỹ thuật gieo trồng -> đất trồng | Đã triển khai (Excel) | (Gộp vào bài `gia-the-la-gi` & `cach-tron-dat-trong-cay`) |
| **Row 26** | trộn xơ dừa với đất | Kỹ thuật gieo trồng -> đất trồng | Đã triển khai (Excel) | (Gộp vào bài `gia-the-la-gi` & `cach-tron-dat-trong-cay`) |
| **Row 28** | diệt cỏ bằng muối | Kỹ thuật Chăm sóc -> diệt cỏ | Đã xuất bản (Wiki - lồng ghép) | `content/wiki/cach-diet-co-dai.json` |
| **Row 29** | cách ươm hạt giống | Kỹ thuật gieo trồng -> giống cây | Đã xuất bản (Wiki) | `content/wiki/cach-uom-hat-giong.json` |
| **Row 30** | bệnh nứt thân xì mủ | Phòng trừ sâu bệnh -> Các bệnh | Đã xuất bản (Wiki) | `content/wiki/benh-nut-than-xi-mu.json` |
| **Row 31** | bệnh phấn trắng | Phòng trừ sâu bệnh -> Các bệnh | Đã xuất bản (Wiki) | `content/wiki/benh-phan-trang.json` |
| **Row 32** | bệnh rỉ sắt | Phòng trừ sâu bệnh -> Các bệnh | Đã xuất bản (Wiki) | `content/wiki/benh-ri-sat.json` |
| **Row 33** | bệnh thán thư | Phòng trừ sâu bệnh -> Các bệnh | Đã xuất bản (Wiki) | `content/wiki/benh-than-thu.json` |
| **Row 34** | bệnh thối rễ | Phòng trừ sâu bệnh -> Các bệnh | Đã xuất bản (Wiki - lồng ghép) | `content/wiki/benh-dom-la.json` |
| **Row 35** | giá thể là gì | Kỹ thuật gieo trồng -> giống cây | Đã xuất bản (Wiki) | `content/wiki/gia-the-la-gi.json` |
| **Row 36** | kiểm định dược liệu | kiểm định dược liệu | Đã xuất bản (Wiki) | `content/wiki/kiem-dinh-duoc-lieu.json` |
| **Row 37** | Kỹ thuật trồng nấm linh chi | Kỹ thuật trồng -> Nấm dược liệu | Đã xuất bản (Cay) | `content/cay/nam-linh-chi.json` |
| **Row 38** | phơi âm can | Sơ chế -> Phơi & Sấy khô | Đã xuất bản (Wiki - lồng ghép) | `content/wiki/ky-thuat-say-duoc-lieu.json` |
| **Row 44** | thu mua atiso | Thu mua -> Cây dược liệu | Đã xuất bản (Cay) | `content/cay/actiso.json` |
| **Row 45** | thu mua nấm linh chi | Thu mua -> Cây dược liệu | Đã xuất bản (Cay) | `content/cay/nam-linh-chi.json` |
| **Row 46** | thu mua Hà thủ ô | Thu mua -> Cây dược liệu | Đã xuất bản (Cay) | `content/cay/ha-thu-o.json` |
| **Row 47** | thu mua Ba kích | Thu mua -> Cây dược liệu | Đã xuất bản (Cay) | `content/cay/ba-kich.json` |
| **Row 48** | thu mua đinh lăng | Thu mua -> Cây dược liệu | Đã xuất bản (Cay) | `content/cay/dinh-lang.json` |
| **Row 50** | sơ chế dược liệu | Sơ chế -> Sơ chế thô | Đã xuất bản (Wiki - lồng ghép) | `content/wiki/bao-quan-duoc-lieu.json` |
| **Row 55** | phương pháp nuôi cấy mô tế bào thực vật | Kỹ thuật gieo trồng -> giống cây | Đã xuất bản (Wiki) | `content/wiki/nuoi-cay-mo-te-bao.json` |
| **Row 59** | cách ủ hạt giống | Kỹ thuật gieo trồng -> giống cây | Đã xuất bản (Wiki - lồng ghép) | `content/wiki/cach-u-hat-giong.json` |
| **Row 68** | độ ph của đất | Kỹ thuật gieo trồng -> đất trồng | Đã xuất bản (Wiki - lồng ghép) | `content/wiki/dat-trong-cay-duoc-lieu.json` |
| **Row 71** | kim loại nặng trong đất | Kỹ thuật gieo trồng -> đất trồng | Đã xuất bản (Wiki - lồng ghép) | `content/wiki/dat-trong-cay-duoc-lieu.json` |
| **Row 77** | bệnh héo xanh | Phòng trừ sâu bệnh -> Các bệnh | Đã xuất bản (Wiki) | `content/wiki/benh-heo-xanh-heo-vang.json` |
| **Row 78** | bệnh héo vàng | Phòng trừ sâu bệnh -> Các bệnh | Đã xuất bản (Wiki - lồng ghép) | `content/wiki/benh-heo-xanh-heo-vang.json` |
| **Row 79** | bệnh khảm lá | Phòng trừ sâu bệnh -> Các bệnh | Đã xuất bản (Wiki) | `content/wiki/benh-kham-la.json` |
| **Row 80** | bệnh mốc xám | Phòng trừ sâu bệnh -> Các bệnh | Đã xuất bản (Wiki) | `content/wiki/benh-moc-xam-muoi-den.json` |
| **Row 81** | bệnh thối củ | Phòng trừ sâu bệnh -> Các bệnh | Đã xuất bản (Wiki - lồng ghép) | `content/wiki/benh-lo-co-re-thoi-re.json` |
| **Row 82** | bệnh muội đen | Phòng trừ sâu bệnh -> Các bệnh | Đã xuất bản (Wiki - lồng ghép) | `content/wiki/benh-moc-xam-muoi-den.json` |
| **Row 83** | tuyến trùng rễ | Phòng trừ sâu bệnh -> Các bệnh | Đã xuất bản (Wiki) | `content/wiki/tuyen-trung-re.json` |

---

## 4. Phát Hiện Lỗ Hổng Cấu Trúc Link (Silo Linking Gaps)

Khi phân tích cấu trúc liên kết nội bộ theo **Rule 2 (PRD §8.3)**: *"Mọi wiki phải có Block 4 'Áp dụng cho cây nào' — liên kết đến ít nhất 3 hub theo cây"*, chúng tôi đã phát hiện lỗ hổng hệ thống:

*   **100% các bài Wiki về sâu bệnh (`benh-*.json`)**: Đều tuân thủ rất tốt quy tắc này, có bảng liên kết (`standardsTable`) đầy đủ tới >= 3 trang Hub kỹ thuật của các cây dược liệu tương ứng.
*   **28 bài viết Wiki khác (các bài về kỹ thuật, tiêu chuẩn, cách ngâm ủ, sơ chế)**: Đang thiếu hoàn toàn hoặc có dưới 3 liên kết đến các trang Hub theo cây trong bảng `standardsTable`. Ví dụ điển hình:
    *   `bao-quan-duoc-lieu.json` (0 dòng trong standardsTable)
    *   `cach-diet-co-dai.json` (0 dòng trong standardsTable)
    *   `cach-giam-canh.json` (0 dòng trong standardsTable)
    *   `cach-u-hat-giong.json` (0 dòng trong standardsTable)
    *   `ky-thuat-say-duoc-lieu.json` (chỉ có 2 dòng dạng text thường, chưa gắn link chuẩn)

> [!IMPORTANT]
> Đây là lỗ hổng SEO cấu trúc lớn cần được ưu tiên tối ưu hóa (`/seo-optimize` hoặc `/link`) để tăng dòng chảy Link Juice giữa các tầng Silo Wiki và Hub của trang web.
