# File Naming Standards

## Slug / filename

- `content/wiki/<slug>.json`: `id` = tên file (không đuôi `.json`), `slug` (field bên trong) là phần URL sau `/kien-thuc/` — 2 giá trị này có thể khác nhau (xem `gia-the-la-gi.json`: `id: "gia-the-la-gi"`, `slug: "gia-the-la-gi-cac-loai-gia-the-trong-duoc-lieu"`). Không đổi `id`/tên file của bài đã publish khi optimize — sẽ gãy link nội bộ và mất lịch sử URL đã index.
- `content/wiki-hub/<slug>.json`: filename theo pattern `ky-thuat-trong-<ten-cay-khong-dau>.json`, field `herbSlug` phải khớp slug cây tương ứng trong `content/cay/`.
- Slug mới (bài chưa publish, qua `/outlining` → `/drafting`) dùng không dấu, cách nhau bằng `-`, khớp `slug.regex(/^[a-z0-9-]+$/)` ở các schema có ràng buộc này (`schema.ts`).

## Vị trí file theo giai đoạn

- Nháp: `knowledge/4-content/{0-sources,1-outline,2-draft,3-finalized}/<slug>.*`
- Publish: `content/wiki/<id>.json` hoặc `content/wiki-hub/<id>.json`
- YMYL chờ duyệt: `content/_drafts/wiki-yte/<id>.json`

## Không đổi tên khi optimize

`/seo-optimize` chỉ sửa nội dung field bên trong file đã publish, **không** đổi tên file, không đổi `id`, không đổi `slug` trừ khi người dùng yêu cầu rõ ràng (đổi slug ảnh hưởng URL đã index, cần cân nhắc redirect — ngoài phạm vi workflow này).
