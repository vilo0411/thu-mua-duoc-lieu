# Workflow: /approve — duyệt và chuyển giai đoạn pipeline

Input: slug ở giai đoạn hiện tại (`1-outline`, `2-draft`, hoặc `3-finalized`). Ở `2-draft`/`3-finalized`, bản làm việc là **Markdown** (`.agents/rules/seo-formatting-markdown.md`) — JSON chỉ xuất hiện ở bước publish cuối cùng.

## Các bước

1. Xác định giai đoạn hiện tại của slug trong `knowledge/4-content/`.
2. Với `1-outline` → `2-draft`: xác nhận outline đã được người dùng duyệt rõ ràng trong hội thoại, sau đó có thể chạy tiếp `/drafting`.
3. Với `2-draft` → `3-finalized`: thực hiện vai **Quality Guardian** (`.agents/agents/quality-guardian.md`) — chạy đầy đủ checklist (heading/marker đúng format Markdown, độ dài SEO trong frontmatter, internal linking, anti-AI, YMYL gate) **và** chạy `.agents/hooks/pre-publish-check.md` bước 1 (`npm run qa:draft`). Chỉ chuyển giai đoạn nếu tất cả pass. Vẫn ở dạng `.md`, chỉ đổi thư mục sang `3-finalized/`.
4. Với `3-finalized` → publish (bước duy nhất sinh ra JSON):
   1. Đọc file `.md` ở `3-finalized/<slug>.md`, chuyển đổi thủ công sang JSON đúng theo bảng "Quy tắc parse ngược sang JSON" trong `.agents/rules/seo-formatting-markdown.md` — giữ nguyên tuyệt đối văn bản, chỉ đổi cấu trúc trình bày.
   2. Xác định file đích: bài **mới** → tạo `content/wiki/<id>.json` hoặc `content/wiki-hub/<id>.json` (tên file theo `file-naming-standards.md`). Bài **audit lại** (từ `/seo-optimize`) → **ghi đè đúng file JSON gốc đã publish**, không tạo file mới, không đổi `id`/tên file.
   3. Nếu nội dung thuộc YMYL, ghi vào `content/_drafts/wiki-yte/` thay vì `content/wiki/` và dừng — không tự publish tiếp.
5. Chạy đủ `.agents/hooks/pre-publish-check.md` bước 2-4: nếu bài là `content/wiki-hub/`, đối chiếu `standards[]`/`pests[]` với các hub khác đã publish để tránh boilerplate trùng lặp; sau đó `npm run validate:content` để xác nhận pass schema thực tế. Nếu fail, sửa lại JSON vừa ghi cho khớp schema rồi chạy lại — không xoá `.md` ở `3-finalized/` cho tới khi pass.
6. **Không tự xoá** file `.md` ở `3-finalized/`, file proposal ở `1-outline/<slug>.md` (nếu bài đến từ `/seo-optimize`), và `.diff.md` liên quan — giữ lại mặc định. Chỉ xoá khi người dùng yêu cầu rõ ràng ở lượt trả lời riêng, sau khi đã thấy JSON publish thành công.
7. Báo kết quả cho người dùng, kèm đường dẫn file JSON cuối cùng và đường dẫn file `.md` nháp vẫn còn giữ lại.

Không bỏ qua bước nào kể cả khi người dùng có vẻ vội — nếu cần rút gọn, hỏi rõ người dùng có muốn bỏ qua QA hay không thay vì tự quyết.
