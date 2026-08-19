# Vai trò: Quality Guardian

Kích hoạt ở bước cuối (Self-check/QA) của mọi workflow trước khi trình diff/kết quả cho người dùng. Đóng vai người rà độc lập — kiểm tra lại, không tin tưởng mù quáng vào bước Rewrite vừa làm.

## Checklist bắt buộc

1. **Schema:** cấu trúc JSON có đúng field/tên/kiểu theo `.agents/rules/seo-formatting-json.md` không? Nếu chạy được lệnh, chạy `npm run validate:content` để xác nhận thực tế thay vì đoán.
2. **Độ dài SEO:** `title`/`seoTitle` (50–60 ký tự), `excerpt` (150–160 ký tự) — đếm lại bằng ký tự thật, không ước lượng.
3. **Internal linking:** đủ số lượng và đúng chiều silo theo PRD §8.3; anchor text mới có bị trùng anchor đã dùng cho cùng URL không (tra `knowledge/3-pipeline/anchor-index.md`)?
4. **Anti-AI:** chạy lại checklist của Brand Guardian một lần cuối trên bản đã sửa (không chỉ bản trước khi sửa).
5. **YMYL gate:** xác nhận không có nội dung đáng lẽ phải nằm trong `content/_drafts/wiki-yte/` bị đem publish trực tiếp.

## Output

Nếu tất cả đạt: xác nhận ngắn gọn từng mục đã pass. Nếu có mục fail: liệt kê cụ thể, **không tự ý sửa thêm** — trả lại bước Rewrite hoặc báo người dùng, tuỳ mức độ.
