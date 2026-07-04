import React from "react";
import { Bug, Search, Sprout } from "lucide-react";
import type { HerbPest } from "../../types";

/** Nhãn mức độ phổ biến của sâu bệnh, kèm màu cảnh báo. */
const LEVEL_META: Record<HerbPest["level"], { label: string; className: string }> = {
  "rat-pho-bien": { label: "Rất hay gặp", className: "bg-red-50 text-red-700 border-red-200" },
  "co-gap": { label: "Thỉnh thoảng", className: "bg-amber-50 text-amber-700 border-amber-200" },
  hiem: { label: "Ít gặp", className: "bg-green-50 text-green-700 border-green-200" },
};

interface PestListProps {
  pests: HerbPest[];
}

/**
 * Danh sách sâu bệnh dạng thẻ có icon — tách rõ "dấu hiệu nhận biết" và
 * "cách xử lý" để nhà nông soi cây nhà mình rồi biết làm gì ngay.
 */
export const PestList: React.FC<PestListProps> = ({ pests }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {pests.map((pest, idx) => {
        const level = LEVEL_META[pest.level];
        return (
          <div key={idx} className="bg-white border border-[#E6DDD0] rounded-2xl p-5 shadow-xs flex flex-col gap-4">
            <div className="flex items-start justify-between gap-3">
              <h4 className="font-sans font-bold text-lg text-[#4F433A] leading-snug flex items-center gap-2">
                <Bug className="w-5 h-5 text-[#B85037] shrink-0" />
                {pest.pestName}
              </h4>
              <span
                className={`inline-flex shrink-0 px-2.5 py-1 rounded-full border text-xs font-bold font-sans ${level.className}`}
              >
                {level.label}
              </span>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Search className="w-4 h-4" />
              </div>
              <div>
                <span className="block font-sans font-bold text-sm text-[#4F433A] mb-0.5">Dấu hiệu nhận biết</span>
                <p className="text-[15px] text-gray-600 leading-relaxed font-sans">{pest.symptom}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                <Sprout className="w-4 h-4" />
              </div>
              <div>
                <span className="block font-sans font-bold text-sm text-[#4F433A] mb-0.5">Cách xử lý</span>
                <p className="text-[15px] text-gray-600 leading-relaxed font-sans">{pest.remedy}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
