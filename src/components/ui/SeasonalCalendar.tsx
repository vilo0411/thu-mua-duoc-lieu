import React from "react";
import { CalendarDays, Sprout, Wheat } from "lucide-react";
import type { HerbalMedicine } from "../../types";

const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

interface SeasonalCalendarProps {
  herbs: HerbalMedicine[];
  onPickHerb?: (slug: string) => void;
}

/**
 * Lịch mùa vụ tương tác: hàng = cây, cột = 12 tháng. Ô xanh lá = xuống giống,
 * ô vàng = thu hoạch. Bấm một tháng để xem nhanh tháng đó nên làm gì.
 */
export const SeasonalCalendar: React.FC<SeasonalCalendarProps> = ({ herbs, onPickHerb }) => {
  const [month, setMonth] = React.useState<number | null>(null);
  const rows = herbs.filter((h) => h.seasonCalendar);

  const sowThisMonth = month ? rows.filter((h) => h.seasonCalendar!.sow.includes(month)) : [];
  const harvestThisMonth = month ? rows.filter((h) => h.seasonCalendar!.harvest.includes(month)) : [];

  return (
    <div className="space-y-4">
      {/* Chú thích */}
      <div className="flex flex-wrap gap-4 text-sm font-sans">
        <span className="inline-flex items-center gap-1.5 text-[#4F433A]">
          <span className="w-4 h-4 rounded bg-[#4F7942] inline-block" /> <Sprout className="w-4 h-4 text-[#4F7942]" /> Xuống giống
        </span>
        <span className="inline-flex items-center gap-1.5 text-[#4F433A]">
          <span className="w-4 h-4 rounded bg-[#E0A02F] inline-block" /> <Wheat className="w-4 h-4 text-[#E0A02F]" /> Thu hoạch
        </span>
      </div>

      <div className="w-full overflow-x-auto rounded-2xl border border-[#E6DDD0] shadow-xs">
        <div className="min-w-[560px]">
          {/* Header tháng */}
          <div className="grid" style={{ gridTemplateColumns: "130px repeat(12, minmax(0, 1fr))" }}>
            <div className="bg-[#F5EDE0] px-3 py-2.5 font-sans font-bold text-sm text-[#4F433A]">Cây / Tháng</div>
            {MONTHS.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMonth(month === m ? null : m)}
                className={`px-1 py-2.5 text-center text-xs font-sans font-bold border-l border-[#E6DDD0] cursor-pointer transition-colors ${
                  month === m ? "bg-[#B85037] text-white" : "bg-[#F5EDE0] text-[#4F433A] hover:bg-[#EADFCD]"
                }`}
              >
                T{m}
              </button>
            ))}
          </div>

          {/* Hàng từng cây */}
          {rows.map((h, ri) => (
            <div
              key={h.slug}
              className="grid border-t border-[#E6DDD0]"
              style={{ gridTemplateColumns: "130px repeat(12, minmax(0, 1fr))" }}
            >
              <button
                type="button"
                onClick={() => onPickHerb?.(h.slug)}
                className={`text-left px-3 py-2.5 font-sans font-semibold text-sm text-[#4F433A] hover:text-[#B85037] cursor-pointer ${
                  ri % 2 ? "bg-[#FBF9F5]" : "bg-white"
                }`}
              >
                {h.name}
              </button>
              {MONTHS.map((m) => {
                const isSow = h.seasonCalendar!.sow.includes(m);
                const isHarvest = h.seasonCalendar!.harvest.includes(m);
                const dim = month !== null && month !== m;
                let bg = "transparent";
                if (isSow && isHarvest) bg = "linear-gradient(135deg,#4F7942 50%,#E0A02F 50%)";
                else if (isSow) bg = "#4F7942";
                else if (isHarvest) bg = "#E0A02F";
                return (
                  <div
                    key={m}
                    className={`border-l border-[#F0EAE1] flex items-center justify-center py-2.5 transition-opacity ${
                      dim ? "opacity-30" : ""
                    } ${ri % 2 ? "bg-[#FBF9F5]" : "bg-white"}`}
                  >
                    {(isSow || isHarvest) && (
                      <span className="w-4 h-4 rounded-sm" style={{ background: bg }} />
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Tóm tắt tháng đang chọn */}
      {month && (
        <div className="bg-[#FAF6F0] border border-[#E6DDD0] rounded-xl p-4 space-y-2 animate-fade-in">
          <h4 className="font-sans font-bold text-[#4F433A] flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-[#B85037]" />
            Tháng {month} bà con nên làm gì?
          </h4>
          <p className="text-[15px] text-[#2D2521] font-sans">
            <Sprout className="inline w-4 h-4 text-[#4F7942] mr-1" />
            <strong>Xuống giống:</strong>{" "}
            {sowThisMonth.length ? sowThisMonth.map((h) => h.name).join(", ") : "—"}
          </p>
          <p className="text-[15px] text-[#2D2521] font-sans">
            <Wheat className="inline w-4 h-4 text-[#E0A02F] mr-1" />
            <strong>Thu hoạch:</strong>{" "}
            {harvestThisMonth.length ? harvestThisMonth.map((h) => h.name).join(", ") : "—"}
          </p>
        </div>
      )}
    </div>
  );
};
