import React from "react";
import { ArrowRight, Award, MapPin, Zap } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { HERBS_DATA, REGIONS_DATA, SITE_OWNER } from "../lib/data";
import { Breadcrumb, DataTable, FeaturedPartnerCard, InfoBox } from "../components/ui";
import { paths } from "../lib/paths";
import { Seo, herbRegionSeo } from "../lib/seo";
import { NotFoundPage } from "./NotFoundPage";

const POPULARITY_LABEL: Record<string, string> = {
  chinh: "vùng trồng trọng điểm",
  phu: "vùng trồng phụ trợ",
  it: "vùng trồng rải rác",
};

export const MoneyVungPage: React.FC = () => {
  const { cay = "", vung = "" } = useParams();
  const navigate = useNavigate();

  const herb = HERBS_DATA.find((h) => h.slug === cay);
  const region = REGIONS_DATA.find((r) => r.slug === vung);
  // Chỉ render combo cây × vùng CÓ THỰC (PRD §11.2) — còn lại trả 404, tránh
  // soft-404 và nội dung mỏng/trùng lặp.
  const herbRegion = herb?.regions.find((r) => r.regionSlug === vung);
  if (!herb || !region || !herbRegion) return <NotFoundPage />;

  const popularityLabel = POPULARITY_LABEL[herbRegion.popularity] ?? "vùng trồng";

  return (
    <div className="space-y-10 animate-fade-in">
      <Seo {...herbRegionSeo(herb, region)} />
      <Breadcrumb items={[
        { label: "Trang chủ", onClick: () => navigate(paths.home()) },
        { label: "Thu mua dược liệu", onClick: () => navigate(paths.pillar()) },
        { label: herb.name, onClick: () => navigate(paths.herb(herb.slug)) },
        { label: `Vùng ${region.name}` },
      ]} />

      {/* Hero */}
      <section className="bg-paper-2 border border-line rounded-2xl p-6 md:p-10 space-y-3">
        <div className="inline-flex items-center gap-1 bg-sand text-terracotta text-xs font-bold px-2.5 py-1 rounded font-sans uppercase">
          {popularityLabel} · sản lượng {herbRegion.outputEstimate}
        </div>
        <h1 className="font-serif text-2xl md:text-4xl font-extrabold text-ink-soft tracking-tight">
          Thu Mua {herb.name} Tại {region.name}: Giá &amp; Vùng Trồng
        </h1>
        <p className="text-gray-700 text-base md:text-lg max-w-3xl font-sans leading-relaxed">
          {region.name} là {popularityLabel} của cây {herb.name} với sản lượng ước tính {herbRegion.outputEstimate}. Bài
          viết tổng hợp đặc điểm thổ nhưỡng, các tỉnh trọng điểm và cách gửi hàng để bà con, HTX trong vùng bán được giá
          tốt. Nội dung do <strong className="text-ink-soft">{SITE_OWNER}</strong> tổng hợp độc lập từ nguồn tham khảo.
        </p>
      </section>

      {/* Bảng dữ liệu vùng */}
      <InfoBox title={`Các tỉnh trọng điểm trồng ${herb.name} tại ${region.name}`} icon={<MapPin className="w-5 h-5" />}>
        <p className="text-sm text-gray-600 mb-4">
          Diện tích quy hoạch, mùa vụ và mức độ liên kết bao tiêu tại từng địa phương trong vùng:
        </p>
        <DataTable
          headers={["Tỉnh thành", "Diện tích quy hoạch (ha)", "Mùa vụ thu hoạch chính", "Liên kết bao tiêu"]}
          rows={region.provinces.map((p) => [
            <strong className="text-ink-soft font-sans">{p.name}</strong>,
            p.area,
            p.harvestPeriod,
            <span className="text-green-700 font-bold bg-green-50 px-2 py-0.5 rounded text-xs">{p.activeCooperatives}</span>,
          ])}
        />
      </InfoBox>

      {/* Mô tả từng tỉnh — H3/tỉnh, ăn keyword tỉnh (PRD §5.4 Block 3) */}
      <section className="space-y-5">
        <h2 className="font-serif text-xl font-bold text-ink-soft border-b border-line pb-2">
          Đặc điểm trồng {herb.name} theo từng tỉnh
        </h2>
        {region.provinces.map((p, idx) => (
          <div key={idx} className="bg-white border border-line rounded-xl p-5 space-y-1.5 shadow-2xs">
            <h3 className="font-serif text-lg font-bold text-ink-soft">
              Thu mua {herb.name} tại {p.name}
            </h3>
            <p className="text-ink text-base leading-relaxed font-sans">
              Tại {p.name}, {herb.name} được canh tác trên quy mô {p.area}, thu hoạch chính vào {p.harvestPeriod}. Với
              điều kiện {region.characteristics.charAt(0).toLowerCase() + region.characteristics.slice(1)} bà con nên gom
              hàng theo {p.activeCooperatives.toLowerCase()} để thuận tiện cho xe thu mua và đạt sản lượng chung đủ lớn cho
              một chuyến bao tiêu.
            </p>
          </div>
        ))}
      </section>

      {/* Đặc điểm cây trồng ở vùng */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-line rounded-xl p-6 space-y-3 shadow-2xs">
          <h3 className="font-serif text-xl font-bold text-ink-soft flex items-center gap-2">
            <Zap className="w-5 h-5 text-terracotta" />
            Thổ nhưỡng &amp; khí hậu vùng {region.name}
          </h3>
          <p className="text-ink text-base leading-relaxed font-sans">{region.characteristics}</p>
        </div>

        <div className="bg-white border border-line rounded-xl p-6 space-y-3 shadow-2xs">
          <h3 className="font-serif text-xl font-bold text-ink-soft flex items-center gap-2">
            <Award className="w-5 h-5 text-earth" />
            Lợi thế canh tác {herb.name} tại đây
          </h3>
          <p className="text-ink text-base leading-relaxed font-sans">{region.advantages}</p>
          <p className="text-sm text-gray-600 font-sans">
            Đặc thù kỹ thuật: {herb.name} nhân giống bằng {herb.technique.propagation.join(", ")}, cho thu hoạch sau{" "}
            {herb.technique.harvestTime}.
          </p>
        </div>
      </section>

      {/* Quy trình gửi hàng + partner card */}
      <section className="space-y-4">
        <h2 className="font-serif text-xl font-bold text-ink-soft">Gửi hàng &amp; đấu nối bao tiêu theo khu vực</h2>
        <p className="text-sm text-gray-600 font-sans">
          Bà con trong vùng {region.name} có thể gom hàng qua HTX rồi kết nối trực tiếp với đầu mối thu mua uy tín để
          chốt giá và điều xe. Một đơn vị bà con có thể tham khảo:
        </p>
        <FeaturedPartnerCard herbName={`${herb.name} tại ${region.name}`} cay={herb.slug} pageType="money_vung" />
      </section>

      {/* Điều hướng nội bộ */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          onClick={() => navigate(paths.herb(herb.slug))}
          className="bg-paper-2 hover:bg-white border border-line hover:border-terracotta p-5 rounded-xl cursor-pointer transition-all flex items-center justify-between group"
        >
          <div>
            <span className="text-xs text-terracotta font-semibold">Xem trang tổng</span>
            <h4 className="font-serif text-lg font-bold text-ink-soft group-hover:text-terracotta transition-colors mt-0.5">Giá &amp; phân loại thu mua {herb.name}</h4>
          </div>
          <ArrowRight className="w-5 h-5 text-terracotta group-hover:translate-x-1 transition-transform" />
        </div>

        <div
          onClick={() => navigate(paths.hubWiki(herb.slug))}
          className="bg-paper-2 hover:bg-white border border-line hover:border-terracotta p-5 rounded-xl cursor-pointer transition-all flex items-center justify-between group"
        >
          <div>
            <span className="text-xs text-earth font-semibold">Tài liệu kỹ thuật</span>
            <h4 className="font-serif text-lg font-bold text-ink-soft group-hover:text-terracotta transition-colors mt-0.5">Cẩm nang kỹ thuật trồng {herb.name}</h4>
          </div>
          <ArrowRight className="w-5 h-5 text-terracotta group-hover:translate-x-1 transition-transform" />
        </div>
      </section>
    </div>
  );
};
