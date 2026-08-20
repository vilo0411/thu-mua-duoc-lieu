# Rules Summary — bản tóm tắt hard constraints

Bản gộp các ràng buộc **kiểm tra được trực tiếp** (độ dài, cấm cụm từ, cấm ký tự, cấu trúc bắt buộc) từ 7 file gốc, dùng để tiết kiệm token khi audit/rewrite các bài **không YMYL, không đổi cấu trúc lớn**. Không thay thế file gốc — chỉ là lớp lọc nhanh.

**Khi nào dùng file này thay vì đọc đủ 7 file gốc:** bài không thuộc `content/_drafts/wiki-yte/`, không cần đổi tên/slug, không có tình huống mơ hồ về persona hoặc silo. Nếu audit phát hiện case không rõ ràng (giọng lẫn persona, nghi ngờ YMYL, cấu trúc link phức tạp), **dừng lại và đọc file gốc tương ứng** trước khi quyết định — file tóm tắt không đủ chi tiết cho các case này.

**Nguồn gốc từng mục** (đọc file gốc nếu cần đầy đủ ngữ cảnh/ví dụ):

## Độ dài SEO (từ `seo-formatting-json.md`, PRD §8.1)
- `seoTitle`: 50–60 ký tự, chứa keyword chính, không cắt giữa âm tiết.
- `excerpt`: 150–160 ký tự.
- `paragraphs[]`: mỗi đoạn 2–3 câu, mỗi câu ≤ 25 từ.
- `standardsTable`: ≥ 3 cột, ≥ 4 hàng khi có.
- `faq[].answer`: câu trả lời trực tiếp mở đầu trong 40–60 từ.

## Cú pháp JSON (từ `seo-formatting-json.md`)
- Chỉ `[nhãn](url)` cho link — không markdown bold/italic nào khác được render.
- Không thêm field ngoài schema (`wikiArticleSchema` / `wikiHubSchema`).

## Draft ở dạng Markdown, không sửa JSON trực tiếp (từ `seo-formatting-markdown.md`)
- Bài mới và bài audit đều soạn/sửa ở `knowledge/4-content/2-draft/` và `3-finalized/` dạng `.md` (frontmatter + heading chuẩn: `## Bảng: ...`, `## Sai lầm phổ biến`, `## FAQ`, `> HIGHLIGHT: ...`).
- JSON trong `content/` chỉ được ghi/ghi đè ở bước `/approve` publish cuối cùng — không sửa thẳng JSON khi audit.
- Silo: wiki chung → hub → money (1 chiều); wiki tiêu chuẩn được phép link landing kèm UTM, wiki chung thì không.
- Wiki chung cần ≥ 3 link tới hub liên quan; không lặp anchor text y hệt cho cùng URL.

## Cấm — dấu hiệu AI-vibe (từ `seo-content-anti-ai.md`)
- Cấm mở/kết bài: "trong thời đại số/công nghệ 4.0", "tóm lại", "nhìn chung", "có thể nói rằng", "đóng vai trò quan trọng/không thể thiếu".
- Cấm tính từ rỗng không bằng chứng ("tuyệt vời", "hoàn hảo", "tối ưu").
- Cấm câu "vừa... vừa..." lặp lại.
- Xưng "tôi", đúng persona chính của trang (P1 hộ trồng nhỏ / P2 HTX-trang trại / P3 đầu mối thu gom — chi tiết ở `reader-personas.md`).
- Số liệu/case chỉ dùng khi có trong nguồn đã kiểm chứng — không tự bịa.

## Dấu câu / văn phong (từ `learning-loop.md`, đã phổ quát hoá)
- Dùng `-` (gạch nối ngắn), không dùng `—` (gạch ngang dài) trong nội dung.
- Hạn chế tối đa ngoặc kép/ngoặc đơn để nhấn mạnh từ ngữ.
- Không dịch nguyên văn thuật ngữ tiếng Anh — dùng từ phổ thông của nhà nông Việt Nam.
- Section giới thiệu bảng so sánh (`standardsTable`) đặt cuối `contentSections`.
- Bài wiki bắt buộc có section kết (lời khuyên/lời kết) ở cuối `contentSections`.

## File naming (từ `file-naming-standards.md`)
- Không đổi `id`/tên file/`slug` của bài đã publish khi optimize.
- `content/wiki-hub/*.json`: `herbSlug` phải khớp slug cây trong `content/cay/`.

## Gate cứng — không override (từ `workflow-integrity.md`)
- Không tự động đưa nội dung sức khỏe/công dụng vào `content/wiki/` bỏ qua `content/_drafts/wiki-yte/`.
- Proposal luôn dừng chờ xác nhận trước Rewrite, trừ khi người dùng nói rõ "làm luôn không cần hỏi".
- SERP research phải gọi tool web search thật — không suy diễn từ kiến thức sẵn có.

## Thuật ngữ chuẩn cần dùng nhất quán (rút gọn từ `glossary.md` — bảng đầy đủ xem file gốc)
Giá thể · Hoai mục/ủ hoai · GACP-WHO (không gọi "chuẩn organic") · GMP/GMP-WHO · HTX (viết tắt sau khi đã viết đủ 1 lần) · Sơ chế (không "chế biến") · Thu hái (không "thu hoạch") · Hoạt chất (không "chất bổ/chất chữa bệnh").
