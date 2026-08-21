# Workflow: /seo-optimize — tối ưu bài viết SEO đã publish

Nền tảng trung lập — file này được cả Claude Code và Antigravity load và thực thi trực tiếp, không có cú pháp riêng cho từng platform. Input: slug hoặc đường dẫn file JSON của 1 bài trong `content/wiki/` hoặc `content/wiki-hub/`.

Trước khi bắt đầu, load context rule (bắt buộc, không bỏ qua):
- **Case đơn giản** (bài không thuộc `content/_drafts/wiki-yte/`, không đổi tên/slug, không có tình huống mơ hồ về persona/silo): chỉ cần đọc `knowledge/3-pipeline/rules-summary.md` — bản gộp hard constraints từ các file rule, tiết kiệm token cho case lặp lại thường xuyên.
- **Case phức tạp hoặc khi audit phát hiện điều mơ hồ** (giọng lẫn persona, nghi ngờ YMYL, cấu trúc link phức tạp, hoặc bất kỳ lúc nào không chắc `rules-summary.md` đã đủ chi tiết): đọc đủ các file gốc, không suy diễn từ bản tóm tắt:
  - `.agents/rules/seo-content-anti-ai.md`
  - `.agents/rules/seo-formatting-json.md`
  - `.agents/rules/seo-formatting-markdown.md`
  - `.agents/rules/workflow-integrity.md`
  - `.agents/rules/file-naming-standards.md`
  - `knowledge/1-brand/reader-personas.md`
  - `knowledge/3-pipeline/glossary.md`
  - `knowledge/3-pipeline/learning-loop.md`
  - `PRD-nguyenvietloc-duoclieu.md` mục 8 (SEO Requirements) — ít nhất §8.1–§8.3

Workflow này dùng 3 vai trò định nghĩa ở `.agents/agents/`: **SEO Collector** (Bước 2), **Brand Guardian** (Bước 2 & 4), **Quality Guardian** (Bước 5). Đây là các vai mà agent thực thi lần lượt đảm nhận, không phải tiến trình riêng.

## Bước 1 — Intake

1. Xác định file JSON đích (`content/wiki/<slug>.json` hoặc `content/wiki-hub/<slug>.json`).
2. Nếu file nằm trong `content/_drafts/wiki-yte/` → **dừng lại, từ chối**. Giải thích: nhóm bài này đang chờ cổng review YMYL/E-E-A-T (xem `content/_drafts/wiki-yte/README.md`), không tối ưu/publish qua workflow này.
3. Đọc toàn bộ file, xác định đây là `wikiArticleSchema` hay `wikiHubSchema` (2 shape khác nhau — xem `seo-formatting-json.md`).
4. Khởi tạo bản nháp làm việc bằng cách chạy `scripts/preview-content.ps1 -Path content/wiki/<slug>.json -OutDir knowledge/4-content/2-draft` (hoặc `content/wiki-hub/` tương ứng) — script xuất đúng format Markdown ở `.agents/rules/seo-formatting-markdown.md` vào `knowledge/4-content/2-draft/<slug>.md`. Nếu file `.md` đã tồn tại (đang audit dở), dùng lại file đó thay vì ghi đè.
5. Từ đây, mọi chỉnh sửa (Bước 4) chỉ thực hiện trên `knowledge/4-content/2-draft/<slug>.md` — **không sửa trực tiếp JSON gốc trong `content/`** cho tới khi `/approve` publish. Ghi lại state gốc (nội dung JSON ban đầu) để so sánh diff cuối cùng.

## Bước 2 — Audit

Thực hiện với vai **SEO Collector** (`.agents/agents/seo-collector.md`) cho phần đối thủ/cơ hội, và vai **Brand Guardian** (`.agents/agents/brand-guardian.md`) cho phần voice/anti-AI. **Bắt buộc gọi tool web search thật** cho vai SEO Collector — không được suy diễn nội dung đối thủ từ kiến thức có sẵn. Nếu không gọi được tool web search (lỗi/không có quyền), phải nói rõ với người dùng rằng bước SERP research bị bỏ qua, không được im lặng bỏ qua rồi trình bày như đã research.

**Phân tích SERP bắt buộc (không được bỏ qua hoặc rút gọn thành 1 dòng):**
1. Search đúng keyword chính của bài (lấy từ `seoTitle`/`title` hoặc slug), lấy top 3-5 kết quả thực tế đang xếp hạng.
2. Với mỗi đối thủ: trích outline thật (danh sách H2/H3 theo đúng thứ tự xuất hiện), độ dài nội dung ước lượng, dạng phụ trợ đang dùng (bảng, FAQ, số liệu, hình ảnh, video, checklist...), góc nhìn/USP riêng nếu có.
3. Tổng hợp outline đối thủ thành 1 danh sách heading phổ biến (heading nào lặp lại ở ≥ 2 đối thủ = tín hiệu search intent mạnh).
4. Đối chiếu outline hiện tại của bài (đọc từ `contentSections`) với outline tổng hợp đối thủ ở bước 3 — liệt kê: heading đối thủ có mà bài chưa có, heading bài có mà đối thủ không có (có thể là điểm khác biệt tốt hoặc lạc đề), thứ tự trình bày có hợp lý hơn/kém hơn đối thủ không.
5. Từ mức độ lệch outline ở bước 4, kết luận **mức độ lệch tổng thể**: THẤP (outline về cơ bản khớp, chỉ thiếu vài đoạn/số liệu) / TRUNG BÌNH (thiếu 1-2 section quan trọng hoặc thứ tự chưa tối ưu) / CAO (outline hiện tại không còn khớp search intent — thiếu nhiều section đối thủ đều có, hoặc cấu trúc đã lỗi thời).

Kiểm tra và liệt kê vấn đề cụ thể, không đánh giá chung chung:
- Độ dài `title`/`seoTitle` (mục tiêu 50–60 ký tự, PRD §8.1) và `excerpt` (150–160 ký tự).
- Số lượng và hướng link nội bộ hiện có trong `paragraphs`/`intro` (wiki chung cần ≥ 3 link tới hub theo cây; kiểm tra không có link ngược chiều silo — PRD §8.3 Rule 1–2).
- Anchor text có bị lặp lại y hệt cho cùng URL đích không (kiểm tra sơ bộ trong chính bài, không cần audit toàn site).
- Cơ hội featured snippet chưa khai thác: câu hỏi trong `faq[]` có trả lời trực tiếp trong câu đầu chưa; có dữ liệu dạng bảng phù hợp `standardsTable` chưa (nếu là wiki article).
- Đoạn văn/kỹ thuật mô tả có bị mỏng, chung chung, hoặc lỗi thời không (so với kiến thức kỹ thuật thực tế về dược liệu).
- Vi phạm anti-AI: cụm mở đầu sáo rỗng, tính từ rỗng không có bằng chứng, câu "vừa...vừa..." lặp — theo `seo-content-anti-ai.md`.

## Bước 3 — Proposal (bắt buộc dừng lại chờ xác nhận trước khi sửa)

Ghi đề xuất ra file `knowledge/4-content/1-outline/<slug>.md` (đúng vị trí giai đoạn outline trong pipeline — proposal audit là 1 dạng outline kế hoạch sửa, không phải bản draft). Nếu file đã tồn tại từ lần audit trước, ghi đè bằng bản mới nhất.

Viết chi tiết theo từng section hiện có trong bài (theo đúng thứ tự `contentSections`), không chỉ 1 dòng nhãn:

```markdown
# Proposal audit: <slug>

Nguồn: content/wiki/<slug>.json (hoặc wiki-hub)
Ngày audit: <ngày>

## Nghiên cứu SERP đối thủ (vai SEO Collector)
Keyword search dùng: <keyword>
Đối thủ top 3-5 (URL + outline thật từng đối thủ):
- <domain 1>: <H2/H3 theo thứ tự> — độ dài ước lượng, phụ trợ đang dùng (bảng/FAQ/số liệu/...)
- <domain 2>: ...
- <domain 3>: ...

Outline tổng hợp đối thủ (heading lặp lại ở ≥ 2 đối thủ): <danh sách>

## So sánh outline hiện tại vs đối thủ
- Outline hiện tại (từ contentSections): <danh sách heading hiện có>
- Đối thủ có mà bài chưa có: <danh sách + đối thủ nào>
- Bài có mà đối thủ không có: <danh sách — ghi rõ đây là điểm khác biệt tốt hay có thể lạc đề>
- Thứ tự trình bày: <so với đối thủ, hợp lý hơn/kém hơn ở đâu>

## Định hướng tổng thể
Mức độ lệch outline: THẤP | TRUNG BÌNH | CAO
Lý do: <giải thích ngắn dựa trên bảng so sánh trên>

Đề xuất: CẬP NHẬT TỪNG PHẦN | VIẾT LẠI TOÀN BỘ
- CẬP NHẬT TỪNG PHẦN: mức lệch THẤP/TRUNG BÌNH — chỉ sửa các section có vấn đề, giữ cấu trúc chính (mặc định của workflow này).
- VIẾT LẠI TOÀN BỘ: mức lệch CAO — outline hiện tại không còn khớp search intent. Vẫn giữ nguyên `id`/slug/file JSON gốc (đây không phải bài mới), nhưng đề xuất outline mới theo đối thủ trước khi viết lại toàn bộ nội dung ở Bước 4. Nếu chọn hướng này, nêu rõ outline mới đề xuất (danh sách heading) trước khi liệt kê từng section bên dưới.

Nếu không gọi được tool web search (lỗi/không có quyền), ghi rõ ở đây: "Bỏ qua SERP research — lý do: <...>" — không được để trống mục này hoặc suy diễn nội dung đối thủ từ kiến thức sẵn có. Trong trường hợp này, mục Định hướng tổng thể ghi "Không xác định được — thiếu dữ liệu SERP" thay vì đoán.

## Section 1 — "<heading hiện tại>"
Hành động: GIỮ NGUYÊN | CẬP NHẬT | GỘP/TÁCH

Vấn đề phát hiện:
- <vấn đề cụ thể 1 — vd: đoạn 2 chung chung, không có số liệu/tên kỹ thuật>
- <vấn đề cụ thể 2 — vd: thiếu link tới hub X dù nội dung liên quan trực tiếp>

Đề xuất sửa cụ thể:
- <thay đổi 1: câu/đoạn nào, sửa theo hướng nào, áp dụng sweep nào (Specificity/Prove It/...)>
- <thay đổi 2>
- <link mới nếu có: [nhãn dự kiến](url), lý do>

## Section 2 — "<heading>"
...

## Mục mới đề xuất thêm (nếu có)
- <standardsTable / pitfall / faq item mới — nêu rõ nội dung dự kiến, không chỉ nói "thêm bảng">

## Không đổi
- <liệt kê ngắn các section giữ nguyên hoàn toàn, kèm lý do đã đạt chuẩn>
```

Mỗi "Đề xuất sửa cụ thể" phải đủ chi tiết để người dùng hình dung được câu/đoạn sẽ đổi thành gì (không chỉ nêu vấn đề) — nhưng chưa cần viết nguyên văn câu final, chỉ cần rõ hướng sửa. Không tự ý rewrite toàn bài nếu phần lớn nội dung đã ổn và Định hướng tổng thể là CẬP NHẬT TỪNG PHẦN — chỉ đề xuất sửa phần có vấn đề thật sự. Nếu Định hướng tổng thể là VIẾT LẠI TOÀN BỘ (mức lệch CAO), liệt kê "Section" theo outline mới đề xuất thay vì outline cũ, và với mỗi section ghi rõ đây là section giữ/gộp từ bài cũ hay hoàn toàn mới theo đối thủ.

Trong chat chỉ tóm tắt 3-5 dòng (số section đề xuất sửa, vấn đề nổi bật nhất) kèm đường dẫn file — không dán toàn bộ proposal vào chat.

**Kết thúc lượt trả lời tại đây.** Chờ người dùng đọc file và xác nhận (hoặc yêu cầu sửa proposal) ở lượt sau — không tự chuyển sang Bước 4 trong cùng câu trả lời dù đã trình bày xong.

## Bước 4 — Rewrite (7 Sweeps, chỉ áp dụng cho phần đã được duyệt ở Bước 3)

Áp tuần tự 7 lượt rà soát lên các đoạn được đánh dấu sửa (không cần chạy riêng biệt từng lượt như một quy trình máy móc — dùng như checklist khi viết lại):

1. **Clarity** — bỏ mơ hồ, câu tối nghĩa.
2. **Voice** — đúng giọng persona (`seo-content-anti-ai.md`), nhất quán xưng "tôi".
3. **So What** — mỗi đoạn phải trả lời được "vậy thì sao với người trồng/thu mua".
4. **Prove It** — thêm bằng chứng/số liệu có thật (không bịa).
5. **Specificity** — thay từ chung chung bằng tên kỹ thuật/vật liệu/tỷ lệ cụ thể.
6. **Emotion** — chạm đúng nỗi lo thực tế (mất mùa, hỏng cả lứa giống, bị ép giá...) khi phù hợp, không cường điệu.
7. **Zero Risk** — xử lý phản bác/lo ngại thường gặp của người đọc (vd: chi phí, độ khó thực hiện).

Sửa trực tiếp trên `knowledge/4-content/2-draft/<slug>.md`, giữ đúng heading/marker quy định ở `seo-formatting-markdown.md` (`## Bảng: ...`, `## Sai lầm phổ biến`, `## FAQ`, `> HIGHLIGHT: ...`) — sai lệch sẽ làm bước chuyển JSON ở `/approve` bỏ sót dữ liệu. Tuân thủ `seo-formatting-json.md` cho nội dung inline (không markdown bold trong đoạn văn thân bài, chỉ `[nhãn](url)` cho link). Khi thêm internal link mới, kiểm tra `knowledge/3-pipeline/anchor-index.md` trước để tránh trùng anchor text cho cùng URL, rồi append link vừa thêm vào file đó.

## Bước 5 — Self-check trước khi trình diff cuối (bắt buộc dừng lại chờ xác nhận trước khi publish)

Thực hiện với vai **Quality Guardian** (`.agents/agents/quality-guardian.md`) — checklist đầy đủ nằm ở file đó (schema, độ dài SEO, internal linking, anti-AI, YMYL gate), **cộng với** `.agents/hooks/pre-publish-check.md` (chạy `npm run qa:draft` trên file `.md` đang sửa; nếu là hub theo cây, kiểm tra không tái sử dụng boilerplate `standards[]`/`pests[]` từ các hub khác). Ghi diff (so với state gốc đã ghi ở Bước 1) ra file `knowledge/4-content/2-draft/<slug>.diff.md` (đoạn cũ → đoạn mới, theo từng section đã sửa). Trong chat chỉ tóm tắt kết quả checklist (pass/fail từng mục) và đường dẫn file diff — không dán toàn bộ diff vào chat.

**Kết thúc lượt trả lời tại đây.** Chờ người dùng xác nhận rõ ràng ở lượt sau ("ok, publish đi" hoặc tương đương) mới làm tiếp:
1. Di chuyển `knowledge/4-content/2-draft/<slug>.md` (và `.proposal.md`/`.diff.md`) sang `knowledge/4-content/3-finalized/`.
2. Chạy `/approve` để chuyển đổi sang JSON và **ghi đè đúng file gốc** trong `content/wiki/` hoặc `content/wiki-hub/` (giữ nguyên `id`/tên file — xem `.agents/workflows/approve.md` Bước 4 và `file-naming-standards.md`), sau đó `npm run validate:content` để xác nhận pass schema thực tế. Không tự xoá file `.md` nháp sau khi publish (xem `.agents/rules/workflow-integrity.md`).
3. Nếu rút ra bài học cụ thể chưa có trong rules, gợi ý chạy `/learn` (xem `.agents/rules/workflow-integrity.md`).
