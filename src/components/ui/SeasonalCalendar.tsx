import React from "react";
import { Sprout, Wheat, ArrowRight } from "lucide-react";
import type { HerbalMedicine } from "../../types";

const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

interface SeasonalCalendarProps {
  herbs: HerbalMedicine[];
  onPickHerb?: (slug: string) => void;
}

/**
 * Lịch mùa vụ theo tháng (month-first) — thân thiện với bà con trên điện thoại:
 * bấm một tháng để xem ngay cây nào nên xuống giống và cây nào vào vụ thu hoạch,
 * thay cho ma trận ô màu khó đọc. Chỉ tính các cây có dữ liệu mùa vụ.
 */
export const SeasonalCalendar: React.FC<SeasonalCalendarProps> = ({ herbs, onPickHerb }) => {
  const rows = React.useMemo(() => herbs.filter((h) => h.seasonCalendar), [herbs]);
  const [month, setMonth] = React.useState<number>(() => new Date().getMonth() + 1);

  const sow = rows.filter((h) => h.seasonCalendar!.sow.includes(month));
  const harvest = rows.filter((h) => h.seasonCalendar!.harvest.includes(month));

  const HerbChips: React.FC<{ list: HerbalMedicine[]; empty: string }> = ({ list, empty }) =>
    list.length ? (
      <div className="flex flex-wrap gap-2">
        {list.map((h) => (
          <button
            key={h.slug}
            type="button"
            onClick={() => onPickHerb?.(h.slug)}
            className="inline-flex items-center gap-1 px-3.5 py-2 rounded-full bg-white border border-[#E6DDD0] text-sm font-sans font-semibold text-[#4F433A] hover:border-[#B85037] hover:text-[#B85037] cursor-pointer transition-colors"
          >
            {h.name}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ))}
      </div>
    ) : (
      <p className="text-sm text-gray-400 italic font-sans">{empty}</p>
    );

  return (
    <div className="space-y-4">
      {/* Chọn tháng */}
      <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5">
        {MONTHS.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMonth(m)}
            className={`py-2.5 rounded-lg text-sm font-sans font-bold cursor-pointer transition-colors ${
              month === m ? "bg-[#B85037] text-white shadow-xs" : "bg-[#F5EDE0] text-[#4F433A] hover:bg-[#EADFCD]"
            }`}
          >
            T{m}
          </button>
        ))}
      </div>

      {/* Hai danh sách của tháng đang chọn */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#F3F7F0] border border-[#CFE0C4] rounded-xl p-4 space-y-3">
          <h4 className="font-sans font-bold text-[#3D6130] flex items-center gap-2">
            <Sprout className="w-5 h-5" /> Nên xuống giống trong Tháng {month}
          </h4>
          <HerbChips list={sow} empty="Không có cây nào xuống giống tháng này." />
        </div>
        <div className="bg-[#FBF3E3] border border-[#EBD9B4] rounded-xl p-4 space-y-3">
          <h4 className="font-sans font-bold text-[#96701E] flex items-center gap-2">
            <Wheat className="w-5 h-5" /> Vào vụ thu hoạch trong Tháng {month}
          </h4>
          <HerbChips list={harvest} empty="Không có cây nào vào vụ thu hoạch tháng này." />
        </div>
      </div>

      <p className="text-xs text-gray-500 font-sans italic">
        Đang hiển thị {rows.length} cây có dữ liệu mùa vụ. Bấm tên cây để xem giá thu mua & chi tiết.
      </p>
    </div>
  );
};
