import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { HerbPriceDetail } from "../../types";

/** Thông tin hiển thị theo xu hướng giá — hướng tới người bán (nhà nông). */
const TREND_META: Record<HerbPriceDetail["trend"], { label: string; icon: React.ElementType; className: string }> = {
  up: { label: "Đang tăng giá", icon: TrendingUp, className: "bg-green-100 text-green-700 border-green-200" },
  stable: { label: "Giá ổn định", icon: Minus, className: "bg-amber-50 text-amber-700 border-amber-200" },
  down: { label: "Đang giảm", icon: TrendingDown, className: "bg-red-50 text-red-700 border-red-200" },
};

interface PriceBoardProps {
  prices: HerbPriceDetail[];
  /** Ngày cập nhật giá, ví dụ "Tuần này". Hiển thị để bà con thấy giá còn mới. */
  updatedLabel?: string;
}

/**
 * Bảng giá dạng THẺ (thay cho bảng ngang phải cuộn) — tối ưu cho nhà nông &
 * người lớn tuổi đọc trên điện thoại: chữ to, giá nổi bật, mũi tên xu hướng rõ.
 */
export const PriceBoard: React.FC<PriceBoardProps> = ({ prices, updatedLabel }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {prices.map((p, idx) => {
        const trend = TREND_META[p.trend];
        const TrendIcon = trend.icon;
        return (
          <div
            key={idx}
            className="bg-white border border-[#E6DDD0] rounded-2xl p-5 shadow-xs flex flex-col gap-3"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-sans font-bold text-lg text-[#4F433A] leading-snug">{p.grade}</h3>
              <span
                className={`inline-flex items-center gap-1 shrink-0 px-2.5 py-1 rounded-full border text-xs font-bold font-sans ${trend.className}`}
              >
                <TrendIcon className="w-3.5 h-3.5" strokeWidth={2.5} />
                {trend.label}
              </span>
            </div>

            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="font-mono font-extrabold text-2xl md:text-3xl text-[#1F7A46] tracking-tight">
                {p.priceRange}
              </span>
              <span className="font-sans font-semibold text-base text-gray-500">đ/{p.unit}</span>
            </div>

            <p className="text-[15px] text-gray-600 leading-relaxed font-sans border-t border-[#F0EAE1] pt-3">
              {p.specification}
            </p>
          </div>
        );
      })}
      {updatedLabel && (
        <p className="md:col-span-2 text-sm text-gray-500 font-sans italic">
          Giá tham khảo, cập nhật: <span className="font-semibold text-[#B85037]">{updatedLabel}</span>. Giá thực tế
          thương thảo theo từng lô hàng.
        </p>
      )}
    </div>
  );
};
