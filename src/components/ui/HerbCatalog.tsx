import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { HERBS_DATA, REGIONS_DATA } from "../../lib/data";
import { paths } from "../../lib/paths";
import type { HerbGroup, HerbalMedicine } from "../../types";
import { RegionMap, type RegionNode } from "./RegionMap";

const GROUP_LABEL: Record<HerbGroup, string> = {
  "cu-re": "Củ, rễ",
  "hoa-la": "Hoa, lá",
  nam: "Nấm",
  vo: "Vỏ",
  than: "Thân, cành",
};

const TREND_ICON = { up: TrendingUp, down: TrendingDown, stable: Minus } as const;

/**
 * Gom danh sách vùng (slug → tên + số cây) từ dữ liệu cây. CHỈ giữ vùng có trang
 * thật (tồn tại trong REGIONS_DATA) để bản đồ không dẫn tới combo cây×vùng 404.
 */
const buildRegionNodes = (): RegionNode[] => {
  const valid = new Set(REGIONS_DATA.map((r) => r.slug));
  const map = new Map<string, { name: string; count: number }>();
  for (const h of HERBS_DATA) {
    for (const r of h.regions) {
      if (!valid.has(r.regionSlug)) continue;
      const cur = map.get(r.regionSlug);
      if (cur) cur.count += 1;
      else map.set(r.regionSlug, { name: r.regionName, count: 1 });
    }
  }
  return [...map.entries()].map(([slug, v]) => ({ slug, name: v.name, count: v.count }));
};

/**
 * Danh mục cây tương tác: bản đồ vùng bấm được + bộ lọc nhanh theo nhóm/vùng +
 * lưới thẻ cây. Bản đồ và bộ lọc dùng chung state để lọc tức thời phía trình duyệt.
 */
export const HerbCatalog: React.FC = () => {
  const navigate = useNavigate();
  const [group, setGroup] = React.useState<HerbGroup | "all">("all");
  const [region, setRegion] = React.useState<string | null>(null);

  const regionNodes = React.useMemo(buildRegionNodes, []);
  const groups = React.useMemo(
    () => [...new Set(HERBS_DATA.map((h) => h.group))] as HerbGroup[],
    [],
  );

  const filtered = HERBS_DATA.filter(
    (h) => (group === "all" || h.group === group) && (region === null || h.regions.some((r) => r.regionSlug === region)),
  );

  const regionName = region ? regionNodes.find((r) => r.slug === region)?.name : null;

  const openHerb = (h: HerbalMedicine) => {
    navigate(region ? paths.herbRegion(h.slug, region) : paths.herb(h.slug));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 items-start">
      {/* Cột trái: bản đồ + lọc nhóm */}
      <div className="space-y-4 lg:sticky lg:top-4">
        <RegionMap regions={regionNodes} selected={region} onSelect={setRegion} />
        <div className="space-y-2">
          <span className="block text-sm font-sans font-semibold text-[#4F433A]">Lọc theo nhóm dược liệu</span>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setGroup("all")}
              className={`px-3 py-1.5 rounded-full border text-sm font-sans font-semibold cursor-pointer transition-colors ${
                group === "all" ? "bg-[#4F433A] border-[#4F433A] text-white" : "bg-white border-[#E6DDD0] text-[#4F433A] hover:border-[#B85037]"
              }`}
            >
              Tất cả
            </button>
            {groups.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGroup(g)}
                className={`px-3 py-1.5 rounded-full border text-sm font-sans font-semibold cursor-pointer transition-colors ${
                  group === g ? "bg-[#4F433A] border-[#4F433A] text-white" : "bg-white border-[#E6DDD0] text-[#4F433A] hover:border-[#B85037]"
                }`}
              >
                {GROUP_LABEL[g]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cột phải: kết quả */}
      <div className="space-y-4">
        <p className="text-sm text-gray-600 font-sans">
          Đang xem <strong className="text-[#4F433A]">{filtered.length}</strong> cây
          {regionName && <> tại vùng <strong className="text-[#B85037]">{regionName}</strong></>}
          {group !== "all" && <> · nhóm <strong className="text-[#B85037]">{GROUP_LABEL[group]}</strong></>}
          {regionName && <> — bấm cây để xem giá & đặc điểm ngay tại vùng này.</>}
        </p>

        {filtered.length === 0 ? (
          <p className="text-sm text-gray-500 italic py-8 text-center">Không có cây nào khớp bộ lọc. Thử bỏ bớt điều kiện.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((h) => {
              const price = h.prices[0];
              const TrendI = price ? TREND_ICON[price.trend] : Minus;
              return (
                <button
                  key={h.slug}
                  type="button"
                  onClick={() => openHerb(h)}
                  className="text-left bg-white border border-[#E6DDD0] hover:border-[#B85037] rounded-2xl p-4 shadow-xs hover:shadow-md transition-all group flex flex-col gap-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-serif font-bold text-lg text-[#4F433A] group-hover:text-[#B85037] transition-colors leading-snug">
                      {h.name}
                    </h4>
                    <span className="shrink-0 text-xs font-sans font-semibold bg-[#F5ECE1] text-[#B85037] border border-[#E6DDD0] px-2 py-0.5 rounded-full">
                      {GROUP_LABEL[h.group]}
                    </span>
                  </div>
                  {price && (
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-mono font-extrabold text-xl text-[#1F7A46]">{price.priceRange}</span>
                      <span className="font-sans text-sm text-gray-500">đ/{price.unit}</span>
                      <TrendI className="w-4 h-4 text-green-600 ml-auto" />
                    </div>
                  )}
                  <span className="text-sm text-gray-500 font-sans">Thu hoạch: {h.technique.harvestTime}</span>
                  <span className="inline-flex items-center gap-1 text-sm font-sans font-bold text-[#B85037] mt-auto">
                    {region ? `Xem giá tại ${regionName}` : "Xem bảng giá & chi tiết"}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
