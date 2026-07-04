import React from "react";
import { MapPin } from "lucide-react";

export interface RegionNode {
  slug: string;
  name: string;
  count: number;
}

/** Toạ độ sơ đồ (%) sắp theo trục Bắc → Nam, lệch Tây/Đông cho giống hình VN. */
const GEO: Record<string, { top: number; left: number }> = {
  "tay-bac": { top: 6, left: 14 },
  "dong-bac": { top: 12, left: 60 },
  "dong-bang-song-hong": { top: 29, left: 46 },
  "bac-trung-bo": { top: 48, left: 40 },
  "tay-nguyen": { top: 69, left: 26 },
  "dong-nam-bo": { top: 85, left: 50 },
};

interface RegionMapProps {
  regions: RegionNode[];
  selected: string | null;
  onSelect: (slug: string | null) => void;
}

/**
 * Bản đồ sơ đồ các vùng nguyên liệu, bấm được. Không dùng ảnh/asset ngoài (CSP):
 * các "chấm vùng" đặt theo trục Bắc–Nam để gợi hình chữ S. Bấm để lọc danh mục cây.
 */
export const RegionMap: React.FC<RegionMapProps> = ({ regions, selected, onSelect }) => {
  const nodes = regions.filter((r) => GEO[r.slug]);
  // Nối các chấm bằng đường gạch đứt (spine) tạo cảm giác bản đồ.
  const spine = nodes
    .map((r) => GEO[r.slug])
    .sort((a, b) => a.top - b.top)
    .map((p) => `${p.left},${p.top}`)
    .join(" ");

  return (
    <div className="bg-gradient-to-b from-[#EEF4EA] to-[#F5ECE1] border border-[#E6DDD0] rounded-2xl p-4">
      <div className="flex items-center justify-between mb-2 gap-2">
        <span className="inline-flex items-center gap-1.5 text-sm font-sans font-semibold text-[#4F7942]">
          <MapPin className="w-4 h-4" />
          Bấm chọn vùng trồng
        </span>
        {selected && (
          <button
            type="button"
            onClick={() => onSelect(null)}
            className="text-xs font-sans font-semibold text-[#B85037] hover:underline cursor-pointer"
          >
            Xem tất cả vùng ✕
          </button>
        )}
      </div>

      <div className="relative w-full max-w-sm mx-auto aspect-3/4">
        <svg viewBox="0 0 100 133" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          <polyline
            points={spine.split(" ").map((pt) => { const [x, y] = pt.split(","); return `${x},${Number(y) * 1.33}`; }).join(" ")}
            fill="none"
            stroke="#B85037"
            strokeWidth="0.6"
            strokeDasharray="2 2"
            opacity="0.4"
          />
        </svg>

        {nodes.map((r) => {
          const pos = GEO[r.slug];
          const active = selected === r.slug;
          return (
            <button
              key={r.slug}
              type="button"
              onClick={() => onSelect(active ? null : r.slug)}
              style={{ top: `${pos.top}%`, left: `${pos.left}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 group cursor-pointer`}
            >
              <span
                className={`w-4 h-4 rounded-full border-2 border-white shadow-sm transition-transform group-hover:scale-125 ${
                  active ? "bg-[#B85037] scale-125" : "bg-[#4F7942]"
                }`}
              />
              <span
                className={`whitespace-nowrap px-2 py-0.5 rounded-full text-xs font-sans font-bold border shadow-2xs transition-colors ${
                  active
                    ? "bg-[#B85037] text-white border-[#B85037]"
                    : "bg-white/90 text-[#4F433A] border-[#E6DDD0] group-hover:border-[#B85037]"
                }`}
              >
                {r.name} <span className="opacity-70">({r.count})</span>
              </span>
            </button>
          );
        })}
      </div>
      <p className="text-center text-xs text-gray-500 italic mt-2 font-sans">Sơ đồ minh hoạ vị trí tương đối các vùng</p>
    </div>
  );
};
