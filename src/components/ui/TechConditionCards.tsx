import React from "react";
import { CalendarDays, FlaskConical, Grid3x3, Mountain, Package, Sprout, TrendingUp } from "lucide-react";
import type { HerbTechnique } from "../../types";

interface TechConditionCardsProps {
  technique: HerbTechnique;
}

/**
 * Lưới thẻ có icon cho các thông số điều kiện & kỹ thuật trồng — thay cho bảng
 * chữ dày đặc, giúp bà con quét mắt nắm nhanh từng yếu tố canh tác.
 */
export const TechConditionCards: React.FC<TechConditionCardsProps> = ({ technique: t }) => {
  const items = [
    { icon: CalendarDays, label: "Thời vụ trồng", value: t.season },
    { icon: Mountain, label: "Đất phù hợp", value: t.soil },
    { icon: FlaskConical, label: "Độ pH đất", value: t.ph },
    { icon: Grid3x3, label: "Mật độ trồng", value: t.density },
    { icon: Sprout, label: "Cách nhân giống", value: t.propagation.join(", ") },
    { icon: Package, label: "Thời gian thu hoạch", value: t.harvestTime },
    { icon: TrendingUp, label: "Năng suất tham khảo", value: t.yield },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
      {items.map((it) => (
        <div key={it.label} className="flex items-start gap-3.5 bg-white border border-[#E6DDD0] rounded-xl p-4">
          <div className="w-10 h-10 rounded-full bg-sand text-terracotta flex items-center justify-center shrink-0">
            <it.icon className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-sans font-semibold uppercase tracking-wide text-gray-500 mb-1">{it.label}</div>
            <div className="text-[15px] font-sans font-medium text-ink-soft leading-snug">{it.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
