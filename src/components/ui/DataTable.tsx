import React from "react";

interface DataTableProps {
  headers: string[];
  rows: (string | React.ReactNode)[][];
  /** Mô tả bảng nói về gì — hiện dưới dạng <caption>. Bỏ trống thì bảng không có tiêu đề. */
  caption?: string;
  /**
   * Id của heading đã mô tả bảng ở ngay trên. Dùng thay `caption` khi tiêu đề đã hiển
   * thị bên ngoài, để nối bảng với tiêu đề mà không lặp lại chữ cho người đọc.
   */
  labelledBy?: string;
}

/**
 * Bảng dữ liệu. `<caption>` + `scope` không chỉ để trợ năng: đó là thứ cho trình đọc
 * màn hình và trình phân tích của công cụ tìm kiếm biết ô nào thuộc hàng/cột nào,
 * thay vì thấy một khối chữ phẳng.
 */
export const DataTable: React.FC<DataTableProps> = ({ headers, rows, caption, labelledBy }) => {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-[#E6DDD0] shadow-xs my-4">
      <table className="w-full text-left border-collapse min-w-[600px]" aria-labelledby={labelledBy}>
        {caption && (
          <caption className="text-left px-5 py-3 text-sm text-gray-600 font-sans caption-top">
            {caption}
          </caption>
        )}
        <thead>
          <tr className="bg-[#F5EDE0] border-b border-[#E6DDD0]">
            {headers.map((header, idx) => (
              <th
                key={idx}
                scope="col"
                className="px-5 py-4 font-sans font-semibold text-sm text-[#4F433A] tracking-wide"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E6DDD0]">
          {rows.map((row, rIdx) => (
            <tr
              key={rIdx}
              className={`hover:bg-[#FAF6F0] transition-colors ${
                rIdx % 2 === 0 ? "bg-[#FDFBF9]" : "bg-[#FBF9F5]"
              }`}
            >
              {row.map((cell, cIdx) =>
                // Ô đầu mỗi hàng là nhãn của hàng đó (vd "Độ ẩm"), nên là <th scope="row">.
                cIdx === 0 ? (
                  <th
                    key={cIdx}
                    scope="row"
                    className="px-5 py-4 text-[#2D2521] text-base leading-relaxed font-sans font-semibold text-left"
                  >
                    {cell}
                  </th>
                ) : (
                  <td key={cIdx} className="px-5 py-4 text-[#2D2521] text-base leading-relaxed font-sans">
                    {cell}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
