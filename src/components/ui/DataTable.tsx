import React from "react";

interface DataTableProps {
  headers: string[];
  rows: (string | React.ReactNode)[][];
}

export const DataTable: React.FC<DataTableProps> = ({ headers, rows }) => {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-[#E6DDD0] shadow-xs my-4">
      <table className="w-full text-left border-collapse min-w-[600px]">
        <thead>
          <tr className="bg-[#F5EDE0] border-b border-[#E6DDD0]">
            {headers.map((header, idx) => (
              <th key={idx} className="px-5 py-4 font-sans font-semibold text-sm text-[#4F433A] tracking-wide">
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
              {row.map((cell, cIdx) => (
                <td key={cIdx} className="px-5 py-4 text-[#2D2521] text-base leading-relaxed font-sans">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
