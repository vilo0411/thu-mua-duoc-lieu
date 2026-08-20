# Content Pipeline — 4 giai đoạn

Workspace nháp cho bài **mới** (`/drafting`) **và** bài **audit lại đã publish** (`/seo-optimize`).
Cả 2 luồng đều soạn/sửa ở dạng **Markdown** (`.md`, theo `.agents/rules/seo-formatting-markdown.md`)
trong `2-draft/` và `3-finalized/` — không sửa thẳng JSON trong `content/`. JSON chỉ được
ghi (bài mới) hoặc ghi đè (bài audit) ở bước `/approve` cuối cùng.

```
0-sources/   → nguồn tham khảo thô đã thu thập cho 1 keyword (SERP notes, tài liệu kỹ thuật)
1-outline/   → outline đã duyệt (từ /outlining) HOẶC proposal audit chi tiết theo section (từ Bước 3 /seo-optimize), chưa viết nội dung đầy đủ
2-draft/     → bản nháp Markdown đầy đủ theo .agents/rules/seo-formatting-markdown.md (từ /drafting, hoặc bản seed + bản đã rewrite của /seo-optimize), kèm .diff.md khi audit, chưa /approve
3-finalized/ → bản Markdown đã qua QA + /approve, sẵn sàng chuyển sang JSON và ghi vào content/wiki/ hoặc content/wiki-hub/
```

## Quy tắc di chuyển giữa các giai đoạn

- Chỉ đi 1 chiều: 0 → 1 → 2 → 3 → `content/`. Không sửa ngược lại giai đoạn trước.
- Mỗi file dùng chung 1 slug xuyên suốt 4 giai đoạn để dễ tra cứu.
- `/approve` là bước duy nhất được phép di chuyển file giữa các giai đoạn (xem `.agents/workflows/approve.md`) — không tự tay đẩy file qua giai đoạn tiếp theo khi chưa qua workflow.
- File ở `3-finalized/` chỉ rời khỏi đây khi đã được chuyển sang JSON (agent transcribe theo `seo-formatting-markdown.md`), ghi vào `content/wiki/` hoặc `content/wiki-hub/`, và pass `npm run validate:content` — sau đó **mặc định vẫn giữ lại** `.md` (cùng file proposal ở `1-outline/` và `.diff.md`), chỉ xoá khi người dùng yêu cầu rõ.
- Với bài audit (`/seo-optimize`): bản `.md` seed khởi tạo bằng `scripts/preview-content.ps1 -Path <file JSON gốc> -OutDir knowledge/4-content/2-draft`; proposal chi tiết ghi vào `1-outline/<slug>.md`; diff cuối ghi vào `2-draft/<slug>.diff.md`. Khi publish, JSON được **ghi đè đúng file gốc** trong `content/wiki/` (giữ nguyên `id`/tên file theo `file-naming-standards.md`), không tạo file mới.
- Bài thuộc nhóm sức khỏe/công dụng (YMYL) đi thẳng vào `content/_drafts/wiki-yte/` ở bước cuối thay vì `content/wiki/`, theo đúng cổng review đã có (`content/_drafts/wiki-yte/README.md`) — không tự ý publish thẳng.
