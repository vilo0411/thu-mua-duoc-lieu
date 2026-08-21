# Workflow: /cluster — bản đồ cụm chủ đề

Input: tên cây/chủ đề, hoặc để trống để rà toàn site.

## Các bước

1. Đọc `Keyword_Mindmap_Structured.xlsx` (sheet `Content Clusters`) — đây là nguồn cụm từ khóa chính thức, không tạo bản sao.
2. Đối chiếu với nội dung đã publish: liệt kê `content/wiki/*.json`, `content/wiki-hub/*.json`, `content/cay/*.json`, `content/vung/*.json` (xem `knowledge/3-pipeline/published-content-index.md` để biết cách tra thay vì đọc lại toàn bộ file).
3. Với mỗi cụm trong mindmap, đánh dấu trạng thái: đã publish / đang ở `knowledge/4-content/` (giai đoạn nào) / chưa bắt đầu.
4. Với cây đã có hub nhưng thiếu money page tương ứng (hoặc ngược lại), hoặc wiki chung thiếu hub để link theo Rule 2 (PRD §8.3), liệt kê thành gap cụ thể — đây là input cho `/keyword-plan`.
5. Không tự động tạo file nội dung ở bước này — `/cluster` chỉ ra báo cáo, không viết bài.

## Output

Bảng/list: `cụm chủ đề — trạng thái — gap phát hiện (nếu có)`.
