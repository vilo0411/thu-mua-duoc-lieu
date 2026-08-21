# Decisions — quyết định kiến trúc pipeline

Log các quyết định về **cấu trúc/quy trình pipeline** (khác `knowledge/3-pipeline/learning-loop.md` —
file đó chỉ ghi bài học văn phong/nội dung cụ thể). Ghi khi quyết định có thể gây tranh cãi lại sau này
hoặc ảnh hưởng nhiều workflow, kèm bối cảnh để không phải tranh luận lại từ đầu.

## 2026-08-20 — Thêm gate QA tự động (`scripts/qa-content.ts`) thay vì audit thuần bằng mắt

**Quyết định:** `/approve` và `/seo-optimize` giờ bắt buộc chạy `npm run qa:draft <slug>.md` (đếm
seoTitle/excerpt/câu/đoạn, quét cụm cấm anti-AI) trước khi cho publish — xem `.agents/hooks/pre-publish-check.md`.

**Vì sao:** `knowledge/3-pipeline/rules-summary.md` liệt kê nhiều rule đếm được trực tiếp (câu ≤25 từ,
đoạn 2-3 câu, seoTitle 50-60 ký tự...) nhưng trước đó Quality Guardian audit các rule này hoàn toàn bằng
mắt/LLM — dễ bỏ sót, tốn token, và không nhất quán giữa các lần chạy. Tham khảo từ
`seo-writer-agent-main/.antigravity/skills/qa-qc/count_words.py` (dự án gốc dùng script Python tương tự
để word-count, nhưng thu-mua-duoc-lieu dùng TypeScript/tsx để nhất quán với `validate-content.ts`,
`build-link-graph.ts` đã có sẵn).

**Giới hạn đã biết:** sentence-splitting là heuristic (dựa vào dấu câu + chữ hoa theo sau), không phải
NLP thật — có thể false-positive với câu chứa số thập phân bất thường hoặc viết tắt lạ. Coi kết quả MINOR
là gợi ý, không phải luật cứng.

## 2026-08-20 — Phát hiện: 107/123 file `content/wiki-hub/` bị near-duplicate content

**Phát hiện:** Quét `content/wiki-hub/*.json` (123 file, mỗi file = 1 loài cây dược liệu) cho thấy 107 file
dùng y hệt bộ `pests[]` ("Bệnh thối rễ/héo rũ" + "Sâu ăn lá", cùng `symptoms`/`remedy`) và 109 file dùng
nguyên văn 3/4 `controlMethod` theo `stage` — chỉ khác tên cây và vài con số trong `criteria`. Ví dụ đối
chiếu trực tiếp: `ky-thuat-trong-nghe.json` và `ky-thuat-trong-gung.json` — 2 cây khác họ, khác điều kiện
trồng, nhưng nội dung sâu bệnh + kỹ thuật canh tác gần như giống hệt nhau.

**Vì sao đây là vấn đề:** Đây chính là dạng nội dung mà `seo-content-anti-ai.md` (Khung 3S — Specifics)
đang cấm ("tên vật liệu/kỹ thuật thật... không nói chung chung"), nhưng 123 trang hub được sinh ra không
qua research riêng từng cây. Rủi ro thực tế: Google Helpful Content / duplicate-content dedup có thể chỉ
index 1-2 bản đại diện trong số ~107 trang giống nhau, phần lớn phần còn lại không lên top dù đã publish.
Đây là nguyên nhân chính đáng ngờ nhất cho việc "output không tốt" được người dùng phản ánh 2026-08-20.

**Quyết định:** Không rewrite hàng loạt 123 file trong 1 lần (rủi ro cao, cần research thật cho từng cây).
Thay vào đó:
1. Thêm rule bắt buộc ở `.agents/rules/seo-formatting-markdown.md` — hub mới/audit lại không được tái
   dùng boilerplate.
2. Thêm `npm run qa:dup` (`scripts/qa-content.ts dup`) để đo tỷ lệ % file còn dính boilerplate theo thời
   gian, dùng làm gate ở `pre-publish-check.md` cho mỗi lần publish/optimize hub mới.
3. Remediation 107 file cũ: xử lý dần qua `/seo-optimize` theo thứ tự ưu tiên (herb có traffic/giá trị thu
   mua cao trước) — **không** nằm trong phạm vi đợt thay đổi hạ tầng này, cần lên kế hoạch riêng vì mỗi
   file cần research kỹ thuật canh tác thật theo từng loài.

**Cách kiểm tra lại quyết định này còn đúng không:** chạy `npm run qa:dup`, xem
`scripts/output/duplicate-content-report.md` — nếu % file affected không giảm sau vài đợt `/seo-optimize`,
rule ở bước 1 chưa đủ mạnh, cần xét lại (vd: chặn cứng ở CI thay vì chỉ nhắc trong workflow).
