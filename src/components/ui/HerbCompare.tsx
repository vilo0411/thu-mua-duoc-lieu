import React from "react";
import { GitCompare, X } from "lucide-react";
import type { HerbalMedicine, HerbGroup } from "../../types";

const GROUP_LABEL: Record<HerbGroup, string> = {
  "cu-re": "Củ, rễ",
  "hoa-la": "Hoa, lá",
  nam: "Nấm",
  vo: "Vỏ",
  than: "Thân, cành",
};

const MAX = 3;

interface Row {
  label: string;
  get: (h: HerbalMedicine) => React.ReactNode;
}

const ROWS: Row[] = [
  { label: "Dải giá cao nhất", get: (h) => <span className="font-mono font-bold text-[#1F7A46]">{h.prices[0]?.priceRange} đ/{h.prices[0]?.unit}</span> },
  { label: "Nhóm dược liệu", get: (h) => GROUP_LABEL[h.group] },
  { label: "Bộ phận thu hoạch", get: (h) => h.stats.find((s) => s.label.toLowerCase().includes("bộ phận"))?.value ?? "—" },
  { label: "Thời gian tới thu hoạch", get: (h) => h.technique.harvestTime },
  { label: "Đất phù hợp", get: (h) => h.technique.soil },
  { label: "Năng suất", get: (h) => h.technique.yield },
  { label: "Số vùng trồng chính", get: (h) => `${h.regions.length} vùng` },
];

interface HerbCompareProps {
  herbs: HerbalMedicine[];
  onPickHerb?: (slug: string) => void;
}

/** Chọn 2–3 cây để so sánh nhanh giá, nhóm, thời gian thu hoạch, năng suất… */
export const HerbCompare: React.FC<HerbCompareProps> = ({ herbs, onPickHerb }) => {
  const [selected, setSelected] = React.useState<string[]>([herbs[0]?.slug, herbs[1]?.slug].filter(Boolean));

  const toggle = (slug: string) => {
    setSelected((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= MAX) return prev;
      return [...prev, slug];
    });
  };

  const chosen = selected.map((s) => herbs.find((h) => h.slug === s)).filter(Boolean) as HerbalMedicine[];

  return (
    <div className="space-y-4">
      {/* Chọn cây */}
      <div className="flex flex-wrap gap-2">
        {herbs.map((h) => {
          const on = selected.includes(h.slug);
          const full = selected.length >= MAX && !on;
          return (
            <button
              key={h.slug}
              type="button"
              onClick={() => toggle(h.slug)}
              disabled={full}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-sm font-sans font-semibold transition-colors ${
                on
                  ? "bg-[#B85037] border-[#B85037] text-white"
                  : full
                    ? "bg-gray-50 border-[#E6DDD0] text-gray-300 cursor-not-allowed"
                    : "bg-white border-[#E6DDD0] text-[#4F433A] hover:border-[#B85037] cursor-pointer"
              }`}
            >
              {h.name}
              {on && <X className="w-3.5 h-3.5" />}
            </button>
          );
        })}
      </div>

      {chosen.length < 2 ? (
        <p className="text-sm text-gray-500 italic font-sans flex items-center gap-2">
          <GitCompare className="w-4 h-4" /> Chọn ít nhất 2 cây (tối đa {MAX}) để xem bảng so sánh.
        </p>
      ) : (
        <div className="w-full overflow-x-auto rounded-2xl border border-[#E6DDD0] shadow-xs">
          <table className="w-full border-collapse" style={{ minWidth: `${140 + chosen.length * 150}px` }}>
            <thead>
              <tr className="bg-[#F5EDE0]">
                <th className="text-left px-4 py-3 font-sans font-bold text-sm text-[#4F433A] w-[140px]">Tiêu chí</th>
                {chosen.map((h) => (
                  <th key={h.slug} className="px-4 py-3 text-left border-l border-[#E6DDD0]">
                    <button
                      type="button"
                      onClick={() => onPickHerb?.(h.slug)}
                      className="font-sans font-bold text-[15px] text-[#B85037] hover:underline cursor-pointer"
                    >
                      {h.name}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, ri) => (
                <tr key={row.label} className={`border-t border-[#E6DDD0] ${ri % 2 ? "bg-[#FBF9F5]" : "bg-white"}`}>
                  <td className="px-4 py-3 font-sans font-semibold text-sm text-[#7A6E62] align-top">{row.label}</td>
                  {chosen.map((h) => (
                    <td key={h.slug} className="px-4 py-3 border-l border-[#F0EAE1] text-[15px] text-[#2D2521] font-sans align-top">
                      {row.get(h)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
