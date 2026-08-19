import openpyxl
import sys

sys.stdout.reconfigure(encoding='utf-8')

wb = openpyxl.load_workbook('Keyword_Mindmap_Structured.xlsx')
sheet = wb['Keyword Mapping']

rows = list(sheet.iter_rows(values_only=True))
header = rows[0]
data_rows = rows[1:]

status_idx = header.index('Trạng thái')
cid_idx = header.index('Cluster ID')
kw_idx = header.index('Từ khóa (Keyword)')
title_idx = header.index('Ý định tìm kiếm / Gợi ý SEO Title')

status_counts = {}
for r in data_rows:
    st = r[status_idx]
    status_counts[st] = status_counts.get(st, 0) + 1

print("Status counts in Keyword Mapping:")
for st, cnt in status_counts.items():
    print(f"  - {st}: {cnt}")

print("\nDetail of non-completed keywords if any:")
for r in data_rows:
    st = r[status_idx]
    if st not in ['Đã viết xong', 'Đã bổ sung xong', 'Đã có bài', 'Đã viết - hoãn xuất bản (chờ EEAT)', 'Đã bổ sung xong', 'Đã viết - hoãn xuất bản (chờ EEAT)']:
        print(f"  - [{r[cid_idx]}] {r[kw_idx]} ({st}) -> {r[title_idx]}")
