import React from "react";
import { Building2, CheckCircle2, Clock } from "lucide-react";
import { FEATURED_PARTNER } from "../../lib/data";
import { LandingLink } from "./LandingLink";

interface FeaturedPartnerCardProps {
  herbName?: string;
  /** Slug cây cho UTM (bỏ trống ở trang tổng). */
  cay?: string;
  /** Loại trang cho UTM (PRD §12.2). */
  pageType?: string;
}

// Không hardcode tên đối tác trong template (PRD §15.4) — mọi thông tin lấy từ
// content/partners.json qua FEATURED_PARTNER.
export const FeaturedPartnerCard: React.FC<FeaturedPartnerCardProps> = ({
  herbName = "Đinh lăng",
  cay,
  pageType = "money_cay",
}) => {
  const partner = FEATURED_PARTNER;

  return (
    <div className="border-2 border-[#B85037] bg-white rounded-2xl p-6 md:p-8 my-6 relative shadow-md transition-all hover:shadow-lg">
      <div className="absolute top-0 right-0 transform translate-x-0 -translate-y-1/2 bg-[#B85037] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xs">
        Đề xuất ưu tiên
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h4 className="font-serif text-2xl font-bold text-[#B85037]">
            {partner.fullName}
          </h4>
          <span className="bg-[#F5ECE1] text-[#B85037] text-xs font-semibold px-2 py-1 rounded border border-[#E6DDD0]">
            {partner.stockCode}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-600 border-b border-[#F0EAE1] pb-4">
          <div className="flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-[#B85037]" />
            <span>{partner.facility}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#B85037]" />
            <span>{partner.experience}</span>
          </div>
        </div>

        <p className="text-base text-[#2D2521] leading-relaxed font-sans">{partner.desc}</p>

        <div className="space-y-2.5 my-4 bg-[#FAF7F2] p-4 rounded-xl border border-[#F0EAE1]">
          <h5 className="font-sans font-bold text-sm text-[#4F433A] uppercase tracking-wider mb-2">
            Quyền lợi liên kết bao tiêu cùng {partner.name}:
          </h5>
          {partner.bullets.map((bullet, idx) => (
            <div key={idx} className="flex items-start gap-2 text-sm text-[#2D2521]">
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <span>{bullet}</span>
            </div>
          ))}
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="text-xs text-gray-500 italic max-w-sm text-center sm:text-left">
            * Nhấp vào nút để gửi thông số lô hàng của bà con. Thông tin sẽ được tự động chuyển đến Trưởng phòng Thu mua khu vực của {partner.name}.
          </div>
          <LandingLink
            cay={cay}
            pageType={pageType}
            ctaPosition="partner_card"
            showArrow={false}
            className="w-full sm:w-auto bg-[#B85037] hover:bg-[#9F3E28] text-white font-sans font-bold text-base px-6 py-3.5 rounded-lg shadow-md transition-all transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer text-center inline-block"
          >
            <span>Gửi thông tin lô hàng {herbName}</span>
          </LandingLink>
        </div>
      </div>
    </div>
  );
};
