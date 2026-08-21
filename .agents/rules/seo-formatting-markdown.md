# Định dạng Markdown nháp (knowledge/4-content) — ánh xạ 1-1 sang JSON

Từ nay bài **mới** (`/drafting`) và bài **audit lại** (`/seo-optimize`) đều soạn/sửa ở dạng
Markdown trong `knowledge/4-content/2-draft/` và `3-finalized/`, KHÔNG sửa thẳng JSON.
JSON chỉ được ghi (hoặc ghi đè) vào `content/wiki/` hoặc `content/wiki-hub/` ở bước cuối
của `/approve` (finalized → publish). File `.md` không phải là nguồn xuất bản — chỉ là
bản làm việc.

Format dưới đây phải giữ nguyên đến từng ký tự heading/marker để chuyển đổi 2 chiều
không mất thông tin. Không tự sáng tạo heading khác đi.

## `content/wiki/*.json` (`wikiArticleSchema`)

```markdown
---
id: benh-heo-xanh-heo-vang
slug: benh-heo-xanh-heo-vang-nguyen-nhan-cach-tri
title: Bệnh héo xanh và héo vàng ở cây dược liệu: phân biệt và cách xử lý
seoTitle: Bệnh héo xanh và héo vàng: cách phân biệt, phòng trị   # optional
category: Phòng trừ sâu bệnh
author: Nguyễn Viết Lộc
readTime: 6 phút đọc
date: 06/08/2026
excerpt: Héo xanh và héo vàng đều làm cây dược liệu héo rũ...
image: /images/kien-thuc/benh-heo-xanh-heo-vang.webp
standardsTableTitle: Đặc điểm héo rũ trên một số loại cây dược liệu   # optional, chỉ khi có bảng
standardsTableHeaders: ["Cây dược liệu", "Biểu hiện", "Phòng ngừa"]   # optional, đúng 3 phần tử
---

## 1. Phân biệt héo xanh và héo vàng

Đoạn văn 1 của section.

Đoạn văn 2 của section.

> HIGHLIGHT: Câu chốt ý nhấn mạnh (tuỳ chọn, tối đa 1 dòng, đặt cuối section).

## 2. Điều kiện phát sinh

...

## Bảng: Đặc điểm héo rũ trên một số loại cây dược liệu

| Cây dược liệu | Biểu hiện | Phòng ngừa |
|---|---|---|
| ... | ... | ... |

## Sai lầm phổ biến

**Tiêu đề:** Tưới đẫm khi cây héo   <!-- optional, bỏ dòng này nếu pitfall không có title -->
Nội dung pitfall — 1 đoạn.

## FAQ

**Q: Câu hỏi 1?**
A: Câu trả lời 1.

**Q: Câu hỏi 2?**
A: Câu trả lời 2.
```

### Quy tắc parse ngược sang JSON

- Mỗi `##` ở body (trừ 3 heading đặc biệt bên dưới) → 1 phần tử `contentSections[]`, `heading` = text sau `##`.
- Các đoạn văn cách nhau bằng dòng trống trong section đó → `paragraphs[]`, theo đúng thứ tự.
- Dòng `> HIGHLIGHT: ...` (nếu có, luôn ở cuối section) → `highlight` của section đó, bỏ tiền tố `HIGHLIGHT: `.
- Heading đúng dạng `## Bảng: <text>` (hoặc `## Bảng tiêu chuẩn` nếu không có tiêu đề riêng) + bảng pipe ngay sau → `standardsTable[]` (`factor`/`standard`/`notes` theo đúng 3 cột), `<text>` → `standardsTableTitle`, header row của bảng → `standardsTableHeaders`.
- Heading đúng `## Sai lầm phổ biến` → `pitfall`. Dòng `**Tiêu đề:** ...` đầu tiên (nếu có) → `pitfall.title`, phần còn lại → `pitfall.body`.
- Heading đúng `## FAQ` → `faq[]`. Mỗi cặp `**Q: ...**` + dòng `A: ...` ngay sau → 1 phần tử `{question, answer}`.
- Các field scalar (`id`, `slug`, `title`, `seoTitle`, `category`, `author`, `readTime`, `date`, `excerpt`, `image`) lấy nguyên văn từ frontmatter YAML.

## `content/wiki-hub/*.json` (`wikiHubSchema`)

```markdown
---
id: ky-thuat-trong-ca-gai-leo
slug: ky-thuat-trong-ca-gai-leo
herbSlug: ca-gai-leo
herbName: Cà gai leo
title: Kỹ thuật trồng cà gai leo đạt chuẩn GACP
seoTitle: Kỹ thuật trồng cà gai leo chuẩn GACP   # optional
---

## Giới thiệu

Đoạn intro giới thiệu cây (1 đoạn duy nhất, map sang field `intro`).

## Tiêu chuẩn theo giai đoạn

| Giai đoạn | Tiêu chí | Cách kiểm soát |
|---|---|---|
| ... | ... | ... |

## Sâu bệnh

- **Tên sâu bệnh**: mô tả triệu chứng → cách xử lý
- **Tên sâu bệnh 2**: mô tả triệu chứng → cách xử lý

## FAQ

**Q: Câu hỏi?**
A: Câu trả lời.
```

### Quy tắc parse ngược sang JSON (wiki-hub)

- `## Giới thiệu` → toàn bộ đoạn văn ngay sau (nối lại nếu nhiều dòng liền) → `intro`.
- `## Tiêu chuẩn theo giai đoạn` + bảng pipe 3 cột cố định → `standards[]` (`stage`/`criteria`/`controlMethod`, đúng theo header cột, không đổi tên field dù header hiển thị khác).
- `## Sâu bệnh` + list `- **Tên**: triệu chứng → xử lý` → `pests[]` (`pestName`/`symptoms`/`remedy`), tách tại dấu `→` đầu tiên.
- `## FAQ` → giống wiki article.

### Bắt buộc: không tái sử dụng boilerplate giữa các hub khác nhau

Phát hiện thực tế (2026-08-20, xem `.agents/memory/DECISIONS.md`): 107/123 file `content/wiki-hub/` đang dùng
**y hệt** 1 bộ `pests[]` ("Bệnh thối rễ/héo rũ" + "Sâu ăn lá") và ~109/123 dùng chung nguyên văn 3/4
`controlMethod` — chỉ khác tên cây và vài con số. Đây là near-duplicate content thật, không phải trùng hợp
ngẫu nhiên do các cây có đặc điểm tương tự.

Khi viết `## Sâu bệnh` và `## Tiêu chuẩn theo giai đoạn` cho 1 hub mới (hoặc audit lại hub cũ qua
`/seo-optimize`):
- **`pests[]` phải là sâu bệnh đặc trưng thật của loài cây đó** (tra cứu SERP/tài liệu khuyến nông cho đúng
  cây, không copy từ hub khác). Chỉ dùng "Bệnh thối rễ/héo rũ" hoặc "Sâu ăn lá" nếu đây thực sự là vấn đề
  chính của cây đó VÀ mô tả triệu chứng/cách xử lý viết riêng theo điều kiện của cây (đất, vùng trồng, mùa vụ) — không copy nguyên văn.
- **`controlMethod` của từng `stage` phải phản ánh đặc thù cây** (pH đất, mật độ trồng, thời vụ, ngày thu
  hoạch, năng suất tham khảo) — không dùng lại câu chung chung kiểu "Cày bừa kỹ, phơi ải và bón vôi bột khử
  chua trước khi trồng 15–20 ngày" cho mọi cây nếu cây đó không thực sự cần quy trình giống hệt.
- Trước khi publish, chạy `npm run qa:dup` (xem `.agents/hooks/pre-publish-check.md`) — nếu bài mới trùng
  ≥3 file khác ở cùng đoạn, phải viết lại phần đó trước khi ghi JSON.

## Ràng buộc chung (áp dụng cả 2 loại)

- Cú pháp inline duy nhất được phép trong đoạn văn: `[nhãn](đường-dẫn)` cho link — theo đúng `seo-formatting-json.md`. Không dùng `**bold**`/`*italic*` bên trong đoạn văn thân bài (chỉ dùng `**...**` ở 2 vị trí quy định: `**Q: ...**` và `**Tiêu đề:**`).
- Giới hạn ký tự `title`/`seoTitle`/`excerpt` vẫn theo PRD §8.1 — áp dụng ngay trên giá trị frontmatter.
- Không thêm heading/field ngoài danh sách trên — bước chuyển JSON cuối cùng sẽ không biết map vào đâu và có thể bị bỏ sót khi `/approve`.
- Khi audit bài đã publish (`/seo-optimize`), bản `.md` khởi tạo bằng cách chạy `scripts/preview-content.ps1 -Path <file JSON> -OutDir knowledge/4-content/2-draft` (xuất đúng format này), sau đó sửa trên file `.md` đó — không sửa JSON gốc trong `content/` cho tới khi `/approve` publish.
