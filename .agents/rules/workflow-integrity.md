# Workflow Integrity Rules

Áp dụng cho mọi workflow trong `.agents/workflows/`.

## Context bắt buộc trước khi bắt đầu

Không workflow nào được bỏ qua bước load rules/knowledge liên quan chỉ vì "có vẻ đơn giản". Nếu 1 file bắt buộc (rule, knowledge) không tồn tại hoặc không đọc được, dừng lại và báo lỗi thay vì tự suy diễn nội dung của nó.

## SERP research là hành động thật, không phải diễn giải

Mọi bước gắn nhãn "vai SEO Collector" (`.agents/agents/seo-collector.md`) phải thực sự gọi tool web search — không được tự suy diễn nội dung đối thủ từ kiến thức sẵn có rồi trình bày như thể đã research. Nếu bỏ qua bước này (dù cố ý hay do quên), phải nói rõ với người dùng, không im lặng bỏ qua.

## Cổng dừng chờ xác nhận

Các bước sau **luôn** phải dừng lại chờ người dùng xác nhận trước khi đi tiếp, không tự động hoá trừ khi người dùng yêu cầu rõ (vd: "làm luôn không cần hỏi"):
- Proposal trước khi Rewrite (mọi workflow sửa nội dung đã publish hoặc gần publish).
- Outline trước khi Drafting (`/outlining` → `/write`).
- Draft trước khi Approve (`/drafting` → `/approve`).

## YMYL gate là bất biến

Không workflow nào (kể cả `/write` chạy full pipeline tự động) được phép tự động di chuyển nội dung sức khỏe/công dụng dược liệu vào `content/wiki/` mà bỏ qua `content/_drafts/wiki-yte/`. Đây là rule cứng, không override bằng flag `--auto` hay tương tự.

## Một nguồn sự thật

Không sao chép nội dung rule/workflow giữa `.claude/commands/`, `.antigravity/`, và `.agents/`. Các adapter platform chỉ trỏ tới `.agents/` — khi cần sửa logic, sửa ở `.agents/`, không sửa ở file adapter.

## Ghi nhận sau khi hoàn thành

Sau khi 1 workflow hoàn tất và người dùng xác nhận kết quả tốt, nếu có bài học cụ thể rút ra (không phải điều đã có sẵn trong rules), gợi ý người dùng chạy `/learn` để ghi vào `knowledge/3-pipeline/learning-loop.md`.
