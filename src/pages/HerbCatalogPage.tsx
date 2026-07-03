import React, { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { HERBS_DATA } from "../lib/data";
import { Breadcrumb, HerbCard } from "../components/ui";
import { paths } from "../lib/paths";
import { Seo, herbCatalogSeo } from "../lib/seo";

export const HerbCatalogPage: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return HERBS_DATA;
    return HERBS_DATA.filter(
      (h) =>
        h.name.toLowerCase().includes(q) ||
        h.scientificName.toLowerCase().includes(q) ||
        h.shortDesc.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="space-y-8 animate-fade-in">
      <Seo {...herbCatalogSeo()} />
      <Breadcrumb items={[{ label: "Trang chủ", onClick: () => navigate(paths.home()) }, { label: "Danh mục cây thuốc" }]} />

      {/* Hero */}
      <section className="bg-[#F5ECE1] border border-[#E6DDD0] rounded-2xl p-6 md:p-10 space-y-3">
        <span className="text-[#B85037] text-xs font-bold uppercase tracking-wider block">Toàn bộ danh mục</span>
        <h1 className="font-serif text-2xl md:text-4xl font-extrabold text-[#4F433A] tracking-tight">
          Danh Mục Cây Dược Liệu Thu Mua
        </h1>
        <p className="text-gray-700 text-base md:text-lg max-w-3xl font-sans leading-relaxed">
          Tra cứu nhanh toàn bộ các loại thảo dược đang được thu mua bao tiêu, kèm dải giá tham khảo và mô tả đặc điểm. Nhấp vào từng cây để xem bảng giá phân hạng chi tiết.
        </p>
      </section>

      {/* Search filter */}
      <div className="relative max-w-md">
        <input
          type="text"
          placeholder="Lọc theo tên cây thuốc..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-white border border-[#E6DDD0] text-[#2D2521] placeholder-gray-400 rounded-lg pl-10 pr-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-[#B85037]"
        />
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
      </div>

      <p className="text-sm text-gray-500 font-sans">
        Hiển thị <strong className="text-[#4F433A]">{filtered.length}</strong> / {HERBS_DATA.length} loại dược liệu
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((herb) => (
            <HerbCard
              key={herb.id}
              name={herb.name}
              scientificName={herb.scientificName}
              priceRange={herb.priceRange}
              shortDesc={herb.shortDesc}
              image={herb.image}
              onClick={() => navigate(paths.herb(herb.slug))}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-[#E6DDD0] rounded-xl p-10 text-center text-gray-400 italic">
          Không tìm thấy dược liệu nào khớp với "{query}".
        </div>
      )}
    </div>
  );
};
