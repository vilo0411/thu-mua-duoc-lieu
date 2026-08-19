# Workflow: /learn — ghi bài học vào learning loop

Input: mô tả ngắn bài học rút ra (từ người dùng, hoặc do agent tự đề xuất sau 1 workflow khác và được người dùng xác nhận).

## Các bước

1. Kiểm tra bài học có phải thông tin **mới** không — nếu đã có sẵn trong `.agents/rules/seo-content-anti-ai.md` hoặc `.agents/rules/seo-formatting-json.md`, không ghi trùng, chỉ nhắc lại rule đã có.
2. Diễn đạt lại thành 1 dòng theo format: quy tắc rút ra + vì sao (tình huống cụ thể dẫn tới bài học).
3. Append vào `knowledge/3-pipeline/learning-loop.md`, mục Log, không sửa/xoá các dòng cũ.
4. Nếu bài học đủ phổ quát (áp dụng cho mọi bài, không riêng tình huống nào), đề xuất với người dùng có nên nâng cấp nó thành 1 dòng trong file rule tương ứng hay không — chỉ làm khi được đồng ý, không tự ý sửa rules.
