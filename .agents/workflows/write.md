# Workflow: /write — pipeline đầy đủ cho bài mới

Orchestrator: gọi tuần tự các workflow khác, không tự viết tắt các bước. Input: keyword/chủ đề (có thể đã qua `/keyword-plan` hoặc do người dùng chỉ định trực tiếp).

## Trình tự

1. Nếu chưa có đề xuất keyword rõ ràng: chạy `.agents/workflows/keyword-plan.md` trước (có thể cần `.agents/workflows/cluster.md` trước đó nếu chưa có báo cáo gần đây).
2. `.agents/workflows/outlining.md` — research SERP + outline. **Dừng chờ xác nhận outline.**
3. `.agents/workflows/drafting.md` — viết bản nháp JSON đầy đủ. **Dừng chờ xác nhận draft** (dùng `.agents/workflows/revise.md` nếu cần sửa).
4. `.agents/workflows/approve.md` — chạy QA (vai Quality Guardian) và chuyển `2-draft` → `3-finalized` → publish vào `content/wiki/` hoặc `content/wiki-hub/` (hoặc `content/_drafts/wiki-yte/` nếu YMYL).
5. Sau khi publish, gợi ý chạy `.agents/workflows/link.md` nếu bài mới cần được link tới từ các bài liên quan khác (không chỉ link đi từ bài mới).

Không bỏ qua bước 2–3 dù người dùng nói "viết luôn cho tôi" — vẫn phải trình outline và draft để xác nhận, trừ khi người dùng nói rõ muốn bỏ qua cổng xác nhận (khi đó vẫn giữ nguyên cổng YMYL ở bước 4, không thể bỏ qua — xem `.agents/rules/workflow-integrity.md`).
