# Workflow: /setup — khởi tạo / cập nhật knowledge base

Chạy 1 lần khi bootstrap hệ thống, hoặc lại mỗi khi có thay đổi lớn (PRD cập nhật, brand info đổi) cần đồng bộ vào `knowledge/`. Thực hiện với vai **Research Agent** (`.agents/agents/research-agent.md`).

## Các bước

1. Đọc `PRD-nguyenvietloc-duoclieu.md`, `content/site.json`, và 1–2 bài mẫu chất lượng tốt trong `content/wiki/` (vd `gia-the-la-gi.json`) để nắm brand/voice hiện tại.
2. So sánh với `knowledge/1-brand/brand-profile.md` và `knowledge/1-brand/reader-personas.md` — nếu có thông tin mới/khác, cập nhật (không viết lại toàn bộ nếu phần lớn vẫn đúng).
3. Kiểm tra `knowledge/3-pipeline/glossary.md` có thiếu thuật ngữ quan trọng đang dùng lặp lại trong nhiều bài không — bổ sung nếu có.
4. Xác nhận cấu trúc `knowledge/4-content/{0-sources,1-outline,2-draft,3-finalized}/` còn nguyên (không cần tạo lại nếu đã có).
5. Báo cáo ngắn gọn cho người dùng: đã cập nhật gì, có gì cần họ xác nhận thủ công (vd: thông tin brand mới chưa chắc chắn).

Không tự tạo lại `.agents/rules/*.md` hay `.agents/workflows/*.md` trong `/setup` — đó là logic hệ thống, không phải dữ liệu brand/knowledge.
