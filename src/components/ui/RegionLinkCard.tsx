import React from "react";
import { ChevronRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

interface RegionLinkCardProps {
  name: string;
  icon?: React.ReactNode;
  provincesCount: number;
  to: string;
}

export const RegionLinkCard: React.FC<RegionLinkCardProps> = ({ name, provincesCount, to }) => {
  return (
    <article className="relative bg-[#FDFBF9] hover:bg-[#F5ECE1] border border-[#E6DDD0] hover:border-[#B85037] p-4 rounded-xl flex items-center justify-between gap-4 cursor-pointer transition-all shadow-2xs hover:shadow-xs group">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-[#F5ECE1] group-hover:bg-[#B85037]/10 flex items-center justify-center text-[#B85037]">
          <MapPin className="w-5 h-5" />
        </div>
        <div>
          {/* h3 chứ không phải h5: thẻ này nằm dưới một h2 trên trang, nhảy thẳng
              xuống h5 là gãy dàn heading. */}
          <h3 className="font-sans font-bold text-base text-[#4F433A] group-hover:text-[#B85037] transition-colors">
            <Link to={to} className="after:absolute after:inset-0 after:content-['']">
              {name}
            </Link>
          </h3>
          <span className="text-xs text-gray-500 font-sans">
            {provincesCount} tỉnh thành trồng trọng điểm
          </span>
        </div>
      </div>
      <div className="text-[#B85037] transform group-hover:translate-x-1 transition-transform">
        <ChevronRight className="w-5 h-5" />
      </div>
    </article>
  );
};
