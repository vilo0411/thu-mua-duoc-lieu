# SEO Formatting Rules — JSON content (thu mua dược liệu)

Nội dung site này là **JSON**, không phải Markdown thô. Không dùng cú pháp `#`/`##`/`**bold**` — các field dưới đây render trực tiếp thành HTML theo template cố định (`src/pages/WikiArticlePage.tsx`, `src/lib/data/schema.ts`). Chỉ chỉnh sửa giá trị field, giữ nguyên tên field và cấu trúc mảng.

## Cú pháp inline duy nhất được hỗ trợ trong `paragraphs`

Link nội bộ/ngoài: `[nhãn](đường-dẫn)` — parse bởi `LINK_RE` trong `WikiArticlePage.tsx`. Không có bold/italic markdown nào khác được render — nếu viết `**...**` nó sẽ hiện ra literal trên trang.

## `content/wiki/*.json` (bài wiki chung — `wikiArticleSchema`)

- `title`: tiêu đề biên tập, có thể dài hơn giới hạn SEO.
- `seoTitle` (optional): dùng khi `title` vượt quá `TITLE_MAX = 55` ký tự (xem `src/lib/seo/meta.ts` `fitTitle()`); nên nằm trong khoảng 50–60 ký tự theo PRD §8.1, chứa keyword chính, không cắt giữa âm tiết tiếng Việt.
- `excerpt`: đóng vai trò meta description → 150–160 ký tự (PRD §8.1).
- `contentSections[]`: mỗi phần tử có `heading` (render H2), `paragraphs[]` (mỗi đoạn 2–3 câu, mỗi câu ≤ 25 từ cho dễ đọc trên mobile), `highlight` (optional, callout nhấn 1 câu chốt ý).
- `standardsTable` / `standardsTableTitle` / `standardsTableHeaders` (optional): dùng khi có dữ liệu so sánh dạng bảng — ưu tiên cho featured snippet dạng bảng (≥3 cột, ≥4 hàng theo `seoTitle`/PRD).
- `pitfall` (optional): callout "sai lầm phổ biến" — 1 đoạn, có thể có `title`.
- `faq[]`: viết câu hỏi đúng dạng người dùng tìm kiếm thật (People Also Ask), câu trả lời mở đầu bằng câu trả lời trực tiếp trong 40–60 từ trước khi giải thích thêm — tối ưu cho đoạn trích nổi bật dạng đoạn văn.

## `content/wiki-hub/*.json` (hub theo cây — `wikiHubSchema`)

Cấu trúc khác wiki chung — không có `contentSections`/`standardsTable`/`pitfall`:
- `intro`: đoạn mở đầu giới thiệu cây.
- `standards[]`: mỗi phần tử `{ stage, criteria, controlMethod }` — giai đoạn sinh trưởng, tiêu chí, cách kiểm soát.
- `pests[]`: mỗi phần tử `{ pestName, symptoms, remedy }` — sâu bệnh, triệu chứng, cách xử lý.
- `faq[]`: cùng nguyên tắc như trên.
- Không thêm field ngoài schema — sẽ fail `npm run validate:content`.

## Internal linking (tham chiếu PRD §8.3, không lặp lại toàn bộ)

- Silo: wiki chung → hub theo cây (không link thẳng sang money từ wiki, trừ wiki tiêu chuẩn).
- Mỗi bài wiki chung nên có ≥ 3 link `[nhãn](/duong-dan-hub)` tới các hub cây liên quan.
- Không lặp anchor text giống hệt nhau cho cùng 1 URL đích trong toàn site — vary tự nhiên khi thêm link mới.
- Link ra landing/CTA chỉ đặt ở money page + wiki tiêu chuẩn, kèm UTM theo PRD §8.3 — bài wiki/hub tối ưu qua workflow này **không** tự thêm link landing mới trừ khi được yêu cầu rõ.
