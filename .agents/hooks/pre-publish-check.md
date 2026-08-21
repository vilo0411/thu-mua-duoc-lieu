# Pre-Publish Check — gate bắt buộc trước khi ghi JSON vào `content/`

Tách riêng khỏi `/approve` và `/seo-optimize` vì cả 2 workflow đều gọi gate này ở bước cuối
(trước khi ghi/ghi đè JSON) — tránh lặp lại checklist ở 2 nơi và đảm bảo không workflow nào
bỏ sót bước.

## Khi nào chạy

- `/approve` Bước 3 (`2-draft` → `3-finalized`) và trước Bước 4 (ghi JSON).
- `/seo-optimize` Bước 5 (Self-check), trước khi trình diff cuối chờ xác nhận publish.

## Các bước (theo thứ tự, dừng ở bước đầu tiên FAIL)

1. **QA đếm được tự động** — chạy:
   ```
   npm run qa:draft -- knowledge/4-content/3-finalized/<slug>.md
   ```
   - Exit 0 → tiếp tục bước 2.
   - Exit 1 (CRITICAL/MAJOR) → **dừng lại**, sửa đúng các mục bị flag (không rewrite toàn bài), chạy lại script cho tới khi PASS. Không publish khi còn CRITICAL/MAJOR.
   - MINOR (đoạn >3 câu) không chặn publish nhưng nên sửa nếu không tốn nhiều công.

2. **Trùng lặp nội dung (chỉ áp dụng `content/wiki-hub/`)** — nếu bài đang publish/optimize là hub theo cây:
   - Sau khi ghi JSON tạm (hoặc trước khi ghi, so với bản dự kiến), so `standards[].controlMethod` và `pests[]` với các file hub khác đã publish. Nếu ≥3 file khác đã dùng y hệt đoạn `controlMethod` hoặc bộ `pests` giống hệt bài đang publish → **không được publish nguyên trạng**: bài phải có ít nhất phần `standards[].criteria`/`controlMethod` và `pests[]` viết riêng cho đặc thù cây đó (khí hậu vùng trồng, sâu bệnh đặc trưng, mật độ/thời vụ thực tế), không tái sử dụng nguyên văn boilerplate.
   - Chạy `npm run qa:dup` định kỳ (không bắt buộc mỗi lần publish 1 bài, vì quét toàn bộ thư mục) để theo dõi tỷ lệ % file còn dính boilerplate — xem báo cáo tại `scripts/output/duplicate-content-report.md`.

3. **Schema thực tế** — sau khi ghi JSON: `npm run validate:content`. Fail → sửa lại JSON vừa ghi, không giữ `content/` ở trạng thái fail schema.

4. **YMYL gate** — xác nhận lại 1 lần nữa bài không thuộc phạm vi công dụng/sức khỏe chưa qua review y khoa trước khi ghi vào `content/wiki/` hoặc `content/wiki-hub/` (không phải `content/_drafts/wiki-yte/`).

## Không override

Không bỏ qua bước 1 hoặc bước 3 kể cả khi người dùng vội — nếu người dùng muốn bỏ qua, phải hỏi lại rõ ràng và ghi nhận việc bỏ qua trong tóm tắt trả lời (không âm thầm bỏ qua).
