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
  /** Tên cây, dùng cho câu dẫn nêu rõ đây là giá tham khảo chứ không phải giá chào bán. */
  herbName?: string;
}

/**
 * Bảng giá dạng THẺ (thay cho bảng ngang phải cuộn) — tối ưu cho nhà nông &
 * người lớn tuổi đọc trên điện thoại: chữ to, giá nổi bật, mũi tên xu hướng rõ.
 *
 * Mỗi thẻ là <article> + <dl>: giữ nguyên bố cục thẻ nhưng mọi giá trị đều có nhãn
 * đi kèm, nên máy đọc nối được hạng ↔ giá ↔ quy cách. Trang KHÔNG phát schema
 * Product/Offer (đây là giá thị trường tham khảo, không phải lời chào bán), nên
 * markup này chính là bề mặt dữ liệu giá cho công cụ tìm kiếm và trợ lý AI.
 */
export const PriceBoard: React.FC<PriceBoardProps> = ({ prices, updatedLabel, herbName }) => {
  return (
    <div>
      <p className="text-[15px] text-gray-600 leading-relaxed font-sans mb-4">
        Giá thu mua tham khảo{herbName ? ` ${herbName}` : ""} theo từng phân hạng, do tôi tổng hợp từ
        các nguồn thu mua và vùng trồng — đây <strong>không phải giá chào bán</strong> của website.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {prices.map((p) => {
          const trend = TREND_META[p.trend];
          const TrendIcon = trend.icon;
          return (
            <article
              key={p.grade}
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

              <dl className="m-0">
                <dt className="sr-only">Giá thu mua tham khảo</dt>
                <dd className="m-0 flex items-baseline gap-1.5 flex-wrap">
                  <span className="font-mono font-extrabold text-2xl md:text-3xl text-[#1F7A46] tracking-tight">
                    {p.priceRange}
                  </span>
                  <span className="font-sans font-semibold text-base text-gray-500">đ/{p.unit}</span>
                </dd>

                <dt className="sr-only">Quy cách</dt>
                <dd className="m-0 text-[15px] text-gray-600 leading-relaxed font-sans border-t border-[#F0EAE1] pt-3 mt-3">
                  {p.specification}
                </dd>
              </dl>
            </article>
          );
        })}
      </div>
      {updatedLabel && (
        <p className="mt-4 text-sm text-gray-500 font-sans italic">
          Giá tham khảo, cập nhật: <span className="font-semibold text-[#B85037]">{updatedLabel}</span>. Giá thực tế
          thương thảo theo từng lô hàng.
        </p>
      )}
    </div>
  );
};
