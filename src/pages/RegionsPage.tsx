import React from "react";
import { ChevronRight, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { HERBS_DATA, REGIONS_DATA } from "../lib/data";
import { Breadcrumb } from "../components/ui";
import { paths } from "../lib/paths";
import { Seo, regionsSeo } from "../lib/seo";

// Chọn một slug cây thuốc đại diện cho vùng để dựng URL /thu-mua-duoc-lieu/:cay/:vung.
const herbSlugForRegion = (regionSlug: string): string => {
  const herb = HERBS_DATA.find((h) => h.regions.some((r) => r.regionSlug === regionSlug));
  return herb ? herb.slug : "dinh-lang";
};

export const RegionsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-fade-in">
      <Seo {...regionsSeo()} />
      <Breadcrumb items={[{ label: "Trang chủ", onClick: () => navigate(paths.home()) }, { label: "Vùng trồng" }]} />

      {/* Hero */}
      <section className="bg-[#FAF8F5] border border-[#E6DDD0] rounded-2xl p-6 md:p-10 space-y-3">
        <span className="text-[#B85037] text-xs font-bold uppercase tracking-wider block">Bản đồ nguyên liệu</span>
        <h1 className="font-serif text-2xl md:text-4xl font-extrabold text-[#4F433A] tracking-tight">
          Các Vùng Trồng Dược Liệu Trọng Điểm
        </h1>
        <p className="text-gray-700 text-base md:text-lg max-w-3xl font-sans leading-relaxed">
          Mỗi vùng khí hậu thổ nhưỡng cho ra những cây thuốc thế mạnh riêng. Nhấp vào từng vùng để xem điều kiện tự nhiên, danh sách hợp tác xã liên kết và trạng thái bao tiêu.
        </p>
      </section>

      {/* Region grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {REGIONS_DATA.map((region) => (
          <div
            key={region.slug}
            onClick={() => navigate(paths.herbRegion(herbSlugForRegion(region.slug), region.slug))}
            className="bg-white border border-[#E6DDD0] hover:border-[#B85037] p-6 rounded-2xl cursor-pointer transition-all shadow-2xs hover:shadow-md group space-y-4"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-serif text-xl font-bold text-[#4F433A] group-hover:text-[#B85037] transition-colors flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#B85037]" />
                Vùng {region.name}
              </h3>
              <ChevronRight className="w-5 h-5 text-[#B85037] group-hover:translate-x-1 transition-transform shrink-0 mt-1" />
            </div>

            <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{region.characteristics}</p>

            <div className="flex flex-wrap gap-2 pt-1">
              {region.commonHerbs.map((h, idx) => (
                <span key={idx} className="text-xs bg-[#F5ECE1] text-[#B85037] border border-[#E6DDD0] px-2.5 py-1 rounded-full font-semibold">
                  {h}
                </span>
              ))}
            </div>

            <div className="text-xs text-gray-500 font-sans pt-2 border-t border-[#F5EFE6]">
              {region.provinces.length} tỉnh thành trọng điểm: {region.provinces.map((p) => p.name).join(", ")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
