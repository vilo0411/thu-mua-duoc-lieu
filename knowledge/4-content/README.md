# Content Pipeline — 4 giai đoạn

Workspace nháp cho bài **mới** (không dùng cho `/seo-optimize` — lệnh đó sửa trực tiếp file đã publish trong `content/`, có bước Proposal xác nhận riêng, không cần qua pipeline này).

```
0-sources/   → nguồn tham khảo thô đã thu thập cho 1 keyword (SERP notes, tài liệu kỹ thuật)
1-outline/   → outline đã duyệt (từ /outlining), chưa viết nội dung đầy đủ
2-draft/     → bản nháp JSON đầy đủ theo đúng schema (từ /drafting), chưa /approve
3-finalized/ → bản đã qua QA + /approve, sẵn sàng copy sang content/wiki/ hoặc content/wiki-hub/
```

## Quy tắc di chuyển giữa các giai đoạn

- Chỉ đi 1 chiều: 0 → 1 → 2 → 3 → `content/`. Không sửa ngược lại giai đoạn trước.
- Mỗi file dùng chung 1 slug xuyên suốt 4 giai đoạn để dễ tra cứu.
- `/approve` là bước duy nhất được phép di chuyển file giữa các giai đoạn (xem `.agents/workflows/approve.md`) — không tự tay đẩy file qua giai đoạn tiếp theo khi chưa qua workflow.
- File ở `3-finalized/` chỉ rời khỏi đây khi được copy vào `content/wiki/` hoặc `content/wiki-hub/` và pass `npm run validate:content` — sau đó có thể xoá khỏi `3-finalized/`.
- Bài thuộc nhóm sức khỏe/công dụng (YMYL) đi thẳng vào `content/_drafts/wiki-yte/` ở bước cuối thay vì `content/wiki/`, theo đúng cổng review đã có (`content/_drafts/wiki-yte/README.md`) — không tự ý publish thẳng.
