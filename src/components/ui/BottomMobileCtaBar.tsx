import React, { useState } from "react";
import { Leaf, X } from "lucide-react";
import { LandingLink } from "./LandingLink";

export const BottomMobileCtaBar: React.FC<{ herbName?: string; cay?: string }> = ({
  herbName = "dược liệu",
  cay,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#D08620] border-t border-amber-500 p-4 shadow-xl z-40 animate-slide-up flex items-center justify-between md:max-w-2xl md:mx-auto md:rounded-t-xl">
      <div className="flex-1 pr-3 flex items-center gap-2 text-white">
        <Leaf className="w-5 h-5 shrink-0 text-amber-100 hidden sm:block" />
        <div className="text-xs sm:text-sm font-sans leading-tight">
          Cần bán <strong className="text-white">{herbName}</strong> được giá, cam kết bao tiêu?
        </div>
      </div>
      <div className="flex items-center gap-2">
        <LandingLink
          cay={cay}
          pageType="money_cay"
          ctaPosition="mobile_sticky"
          showArrow={false}
          className="bg-white hover:bg-amber-50 text-[#9F5E08] font-sans font-bold text-xs sm:text-sm px-4 py-2 rounded-md shadow-sm transition-transform active:scale-95 whitespace-nowrap cursor-pointer inline-block"
        />
        <button
          onClick={() => setIsVisible(false)}
          className="text-amber-100 hover:text-white p-1"
          aria-label="Đóng thanh liên hệ"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
