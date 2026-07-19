import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { asset } from "../../lib/paths";

interface HerbCardProps {
  name: string;
  scientificName: string;
  priceRange: string;
  shortDesc: string;
  image: string;
  to: string;
}

export const HerbCard: React.FC<HerbCardProps> = ({ name, scientificName, priceRange, shortDesc, image, to }) => {
  return (
    <Link
      to={to}
      className="bg-white rounded-xl overflow-hidden border border-[#E6DDD0] hover:border-[#B85037] shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col h-full"
    >
      <div className="relative aspect-4/3 overflow-hidden bg-gray-100">
        <img
          src={asset(image)}
          alt={name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-[#B85037]/90 text-white text-xs font-semibold px-2.5 py-1 rounded-md backdrop-blur-xs font-sans">
          {priceRange}
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-[#4F433A] group-hover:text-[#B85037] transition-colors tracking-tight">
              {name}
            </h3>
            <span className="text-xs text-gray-400 italic font-mono">{scientificName}</span>
          </div>
          <p className="text-[#2D2521] text-sm leading-relaxed line-clamp-3">
            {shortDesc}
          </p>
        </div>
        <div className="pt-2 text-sm font-semibold text-[#B85037] group-hover:text-[#9F3E28] inline-flex items-center gap-1">
          <span>Xem chi tiết giá & thu mua</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};
