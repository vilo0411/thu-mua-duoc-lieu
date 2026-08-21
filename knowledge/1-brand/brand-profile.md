# Brand Profile — Thư Viện Dược Liệu (duoclieu.nguyenvietloc.com)

Nguồn gốc dữ liệu: `content/site.json`, `PRD-nguyenvietloc-duoclieu.md`. File này diễn giải cho việc viết nội dung — không lặp lại field kỹ thuật, chỉ thêm bối cảnh định vị thương hiệu.

## Định vị

- **Loại hình:** Blog SEO cá nhân (pSEO), phong cách PBN — **không phải** trang thương mại/doanh nghiệp. Site name: "Thư Viện Dược Liệu".
- **Chủ sở hữu/tác giả duy nhất:** Nguyễn Viết Lộc (`content/site.json` → `owner`, `authorUrl: /ve-toi`).
- **Domain:** subdomain mới của `nguyenvietloc.com`, chưa có authority → mọi bài phải chuẩn kỹ thuật SEO để tối đa cơ hội rank (PRD mục "Lưu ý dự án").
- **Mission tuyên bố (`site.json` → `defaultDescription`):** "Trang tổng hợp kỹ thuật trồng, sơ chế và cập nhật giá thu mua dược liệu Việt Nam đạt chuẩn GACP-WHO từ các nguồn uy tín — cho hộ trồng, hợp tác xã và đầu mối thu gom."

## Vai trò với thương hiệu liên kết (VIETMEC)

Site là blog độc lập nhưng có liên kết ba bên tới landing thu mua (xem `content/wiki/lien-ket-ba-ben-vietmec.json`, PRD §8.3 Rule 7). Không viết như thể site này là kênh chính thức của VIETMEC — giữ giọng "blogger chia sẻ kinh nghiệm, có giới thiệu đầu mối uy tín", không phải "chúng tôi bán/thu mua".

## Kiến trúc nội dung (silo) — bối cảnh khi viết

```
Wiki chung (kiến thức phổ thông)
   └─► Hub theo cây (kỹ thuật trồng 1 loại dược liệu cụ thể)
          └─► Money cây / Money vùng (giá thu mua, đầu mối)
```
Mọi quyết định viết/link phải tôn trọng chiều silo này (chi tiết: `.agents/rules/seo-formatting-json.md`, PRD §8.3).

## Voice

Xem `.agents/rules/seo-content-anti-ai.md` — nguồn duy nhất cho giọng văn, không lặp lại ở đây để tránh lệch khi 1 trong 2 file được sửa.
