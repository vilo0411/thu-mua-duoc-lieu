# Workflow: /image — chiến lược hình ảnh cho 1 bài

Input: slug bài viết. Lưu ý: agent không tự sinh/tải ảnh — workflow này chỉ ra hướng dẫn và alt text, người dùng tự chuẩn bị file ảnh.

## Các bước

1. Đọc field `image` hiện tại (nếu có) và nội dung bài để hiểu chủ đề chính từng section.
2. Đề xuất:
   - Ảnh đại diện (field `image`): mô tả nội dung nên có (vd: cận cảnh giá thể phối trộn, không dùng ảnh chung chung không liên quan tới dược liệu Việt Nam).
   - Alt text cho ảnh đại diện: mô tả cụ thể, chứa keyword chính một cách tự nhiên, không nhồi nhét.
   - Đường dẫn file theo convention hiện có: `/images/kien-thuc/<slug-ngắn>.webp` (xem ảnh mẫu trong `content/wiki/*.json`).
3. Nếu người dùng có ảnh thật muốn dùng, nhắc chuyển sang WebP bằng script sẵn có trong `scripts/` (image optimization đã có ở dự án — kiểm tra `package.json` để lấy đúng tên lệnh, không đoán tên) trước khi gán vào field `image`.
4. Không tự thêm ảnh vào `contentSections` — schema hiện tại không có field ảnh theo từng section, chỉ có 1 ảnh đại diện.

## Output

Đề xuất mô tả ảnh + alt text + đường dẫn file dự kiến — chờ người dùng cung cấp file ảnh thật rồi mới cập nhật field `image` trong JSON.
