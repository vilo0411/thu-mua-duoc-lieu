# Bài chờ xuất bản — nhóm "Ứng dụng & Chữa bệnh" (Pillar 7)

9 bài trong thư mục này (`C33`–`C41` trong `Keyword_Mindmap_Structured.xlsx`, sheet `Content Clusters`) đã viết nội dung xong nhưng **cố tình để ngoài `content/wiki/`** nên không được build lên site.

## Vì sao hoãn

Nội dung sức khỏe/công dụng dược liệu thuộc nhóm YMYL (Your Money or Your Life) theo tiêu chí xếp hạng của Google — cần mức độ E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) cao hơn hẳn content kỹ thuật trồng trọt: tác giả có chuyên môn y dược đứng tên, trích dẫn nguồn/nghiên cứu, quy trình review y khoa trước khi đăng. Site hiện chưa có quy trình này, nên xuất bản ngay có rủi ro về uy tín và thứ hạng SEO nếu Google đánh giá thấp độ tin cậy.

## Điều kiện để xuất bản

Trước khi chuyển bài nào sang `content/wiki/`, nên có:
1. Người có chuyên môn y dược/Đông y review nội dung, chỉnh sửa nếu cần
2. Cân nhắc bổ sung tên/thông tin người review vào bài (tín hiệu E-E-A-T)
3. Rà lại các tuyên bố công dụng — hiện đã viết theo hướng thận trọng (gắn "theo kinh nghiệm dân gian/y học cổ truyền", không khẳng định chữa khỏi bệnh, luôn khuyến cáo gặp bác sĩ) nhưng vẫn nên có người chuyên môn xác nhận lại

## Cách xuất bản khi sẵn sàng

Di chuyển file `.json` cần đăng từ đây về lại `content/wiki/`, sau đó chạy validate-content như bình thường.
