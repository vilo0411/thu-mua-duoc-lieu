import React from "react";
import { MapPin } from "lucide-react";

export interface RegionNode {
  slug: string;
  name: string;
  count: number;
}

/** Thứ tự Bắc → Nam để danh sách vùng gợi đúng địa lý (thông tin nằm ở thứ tự). */
const ORDER = ["tay-bac", "dong-bac", "dong-bang-song-hong", "bac-trung-bo", "tay-nguyen", "dong-nam-bo"];

interface RegionMapProps {
  regions: RegionNode[];
  selected: string | null;
  onSelect: (slug: string | null) => void;
}

/**
 * Danh sách vùng nguyên liệu bấm được, xếp theo trục Bắc → Nam. Mỗi dòng: chấm vùng +
 * tên + số cây; bấm để lọc danh mục, bấm lại để bỏ. Thay sơ đồ chấm cũ cho dễ quét & gọn.
 */
export const RegionMap: React.FC<RegionMapProps> = ({ regions, selected, onSelect }) => {
  const nodes = React.useMemo(
    () =>
      regions
        .filter((r) => ORDER.includes(r.slug))
        .sort((a, b) => ORDER.indexOf(a.slug) - ORDER.indexOf(b.slug)),
    [regions],
  );

  return (
    <div className="bg-white border border-[#E6DDD0] rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3 gap-2">
        <span className="inline-flex items-center gap-1.5 text-sm font-sans font-bold text-[#4F433A]">
          <MapPin className="w-4 h-4 text-[#4F7942]" />
          Vùng trồng
        </span>
        {selected && (
          <button
            type="button"
            onClick={() => onSelect(null)}
            className="text-xs font-sans font-semibold text-[#B85037] hover:underline cursor-pointer"
          >
            Toàn quốc
          </button>
        )}
      </div>

      <ul className="space-y-1">
        {nodes.map((r) => {
          const active = selected === r.slug;
          return (
            <li key={r.slug}>
              <button
                type="button"
                onClick={() => onSelect(active ? null : r.slug)}
                aria-pressed={active}
                className={`w-full flex items-center gap-2.5 rounded-lg pl-2.5 pr-2 py-2 text-sm font-sans cursor-pointer border transition-colors ${
                  active
                    ? "bg-[#B85037]/10 border-[#B85037] text-[#B85037] font-bold"
                    : "bg-transparent border-transparent text-[#4F433A] font-semibold hover:bg-[#F5ECE1]/70"
                }`}
              >
                <span className={`w-2 h-2 rounded-full shrink-0 ${active ? "bg-[#B85037]" : "bg-[#4F7942]"}`} />
                <span className="flex-1 text-left truncate">{r.name}</span>
                <span
                  className={`shrink-0 text-xs font-semibold px-1.5 py-0.5 rounded-full ${
                    active ? "bg-[#B85037] text-white" : "bg-[#F5ECE1] text-[#7A6E62]"
                  }`}
                >
                  {r.count}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
