# Published Content Index

Không duy trì dưới dạng danh sách tĩnh (162 bài tại thời điểm viết file này — liệt kê tay chắc chắn lệch dần). Thay vào đó, tra cứu trực tiếp:

- **Danh sách bài + slug hiện có:** liệt kê thư mục `content/wiki/*.json` (wiki chung) và `content/wiki-hub/*.json` (hub theo cây).
- **Cây/vùng đã có money page:** `content/cay/*.json`, `content/vung/*.json`.
- **Kế hoạch từ khóa / cụm chủ đề đã lên kế hoạch:** `Keyword_Mindmap_Structured.xlsx` (sheet `Content Clusters`) — đây là nguồn keyword backlog chính thức của dự án, KHÔNG tạo backlog trùng lặp trong `knowledge/`.
- **Bài đang chờ cổng YMYL, chưa publish:** `content/_drafts/wiki-yte/*.json` — không tính là "đã publish", không đưa vào audit `/seo-optimize` hay đếm cluster coverage ở `/cluster`.

## Vì sao không log danh sách tĩnh ở đây

Repo mẫu `dsc-content-seo` dùng file index tĩnh vì nội dung của họ không nằm trong 1 hệ thống có schema/Zod validate + build-time glob. Ở dự án này, `content/wiki/` và `content/wiki-hub/` tự thân đã là index đáng tin cậy nhất — mọi workflow (`/cluster`, `/keyword-plan`, `/seo-optimize`) nên đọc trực tiếp 2 thư mục này thay vì một bản sao có nguy cơ lỗi thời.
