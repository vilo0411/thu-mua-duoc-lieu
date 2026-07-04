import React from "react";
import { Calculator, ArrowRight } from "lucide-react";
import type { HerbPriceDetail } from "../../types";

/** Tách chuỗi "140.000 - 180.000" thành [140000, 180000]. Dấu "." là ngăn nghìn. */
const parsePriceRange = (s: string): [number, number] => {
  const nums = (s.match(/[\d.]+/g) ?? [])
    .map((x) => parseInt(x.replace(/\./g, ""), 10))
    .filter((n) => !Number.isNaN(n));
  if (nums.length === 0) return [0, 0];
  if (nums.length === 1) return [nums[0], nums[0]];
  return [nums[0], nums[1]];
};

const fmt = (n: number) => new Intl.NumberFormat("vi-VN").format(Math.round(n));

const QUICK_KG = [10, 50, 100, 500];

interface HerbPriceCalculatorProps {
  prices: HerbPriceDetail[];
  herbName: string;
  /** Link outbound tới đối tác bao tiêu (kèm UTM) — chốt chuyển đổi sau khi tính. */
  ctaHref: string;
}

/**
 * Máy tính "Lô hàng bán được bao nhiêu tiền?" — nhập số kg, chọn loại,
 * hiện ngay khoảng tiền ước tính rồi mời gửi lô hàng cho đối tác thu mua.
 */
export const HerbPriceCalculator: React.FC<HerbPriceCalculatorProps> = ({ prices, herbName, ctaHref }) => {
  const [gradeIdx, setGradeIdx] = React.useState(0);
  const [kg, setKg] = React.useState<number>(100);

  const grade = prices[gradeIdx];
  const [low, high] = parsePriceRange(grade.priceRange);
  const qty = Number.isFinite(kg) && kg > 0 ? kg : 0;
  const estLow = low * qty;
  const estHigh = high * qty;
  const hasResult = qty > 0;

  return (
    <div className="bg-gradient-to-br from-[#FDFBF9] to-[#F5ECE1] border border-[#E6DDD0] rounded-2xl p-6 shadow-xs space-y-5">
      <h3 className="font-serif text-xl font-bold text-[#4F433A] flex items-center gap-2">
        <Calculator className="w-6 h-6 text-[#B85037]" />
        Ước tính lô hàng {herbName} của bạn bán được bao nhiêu?
      </h3>

      {/* Chọn loại hàng */}
      <div className="space-y-2">
        <label className="block font-sans font-semibold text-[#4F433A] text-[15px]">1. Chọn loại hàng của bạn</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {prices.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setGradeIdx(idx)}
              className={`text-left px-4 py-3 rounded-xl border font-sans transition-all cursor-pointer ${
                idx === gradeIdx
                  ? "bg-[#B85037] border-[#B85037] text-white shadow-sm"
                  : "bg-white border-[#E6DDD0] text-[#4F433A] hover:border-[#B85037]"
              }`}
            >
              <span className="block font-bold text-[15px]">{p.grade}</span>
              <span className={`block text-sm ${idx === gradeIdx ? "text-white/90" : "text-gray-500"}`}>
                {p.priceRange} đ/{p.unit}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Nhập khối lượng */}
      <div className="space-y-2">
        <label htmlFor="kg-input" className="block font-sans font-semibold text-[#4F433A] text-[15px]">
          2. Nhập khối lượng (kg)
        </label>
        <input
          id="kg-input"
          type="number"
          inputMode="numeric"
          min={0}
          value={Number.isFinite(kg) ? kg : ""}
          onChange={(e) => setKg(parseFloat(e.target.value))}
          className="w-full px-4 py-3 rounded-xl border border-[#E6DDD0] bg-white font-mono font-bold text-xl text-[#4F433A] focus:border-[#B85037] focus:outline-none"
          placeholder="Ví dụ: 100"
        />
        <div className="flex flex-wrap gap-2">
          {QUICK_KG.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setKg(v)}
              className="px-3 py-1.5 rounded-full border border-[#E6DDD0] bg-white text-sm font-sans font-semibold text-[#4F433A] hover:border-[#B85037] hover:text-[#B85037] transition-colors cursor-pointer"
            >
              {v} kg
            </button>
          ))}
        </div>
      </div>

      {/* Kết quả */}
      {hasResult && (
        <div className="bg-white border border-[#E6DDD0] rounded-xl p-5 space-y-3 animate-fade-in">
          <span className="block font-sans text-[15px] text-gray-600">
            {fmt(qty)} kg <strong className="text-[#4F433A]">{grade.grade}</strong> ước tính bán được khoảng:
          </span>
          <div className="font-mono font-extrabold text-[#1F7A46] leading-tight">
            <span className="text-2xl md:text-3xl">{fmt(estLow)}</span>
            <span className="text-xl mx-1">–</span>
            <span className="text-2xl md:text-3xl">{fmt(estHigh)}</span>
            <span className="font-sans text-lg text-gray-500 ml-1">đồng</span>
          </div>
          <a
            href={ctaHref}
            className="inline-flex items-center gap-2 bg-[#B85037] hover:bg-[#9d4230] text-white font-sans font-bold text-[15px] px-5 py-3 rounded-xl shadow-sm transition-colors"
          >
            Gửi lô hàng này để chốt giá thu mua
            <ArrowRight className="w-4 h-4" />
          </a>
          <p className="text-xs text-gray-500 font-sans italic">
            Con số chỉ mang tính tham khảo theo bảng giá tuần này. Giá chốt tùy chất lượng thực tế của lô hàng.
          </p>
        </div>
      )}
    </div>
  );
};
