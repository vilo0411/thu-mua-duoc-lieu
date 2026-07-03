import React from "react";
import { ArrowRight, Award, MapPin, Zap } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { HERBS_DATA, REGIONS_DATA, SITE_OWNER } from "../data/mockData";
import { Breadcrumb, DataTable, FeaturedPartnerCard, InfoBox } from "../components/ui";
import { paths } from "../lib/paths";

export const MoneyVungPage: React.FC = () => {
  const { cay = "", vung = "" } = useParams();
  const navigate = useNavigate();

  const herb = HERBS_DATA.find((h) => h.slug === cay) || HERBS_DATA[0];
  const region = REGIONS_DATA.find((r) => r.slug === vung) || REGIONS_DATA[0];

  return (
    <div className="space-y-10 animate-fade-in">
      <Breadcrumb items={[
        { label: "Trang chủ", onClick: () => navigate(paths.home()) },
        { label: "Thu mua dược liệu", onClick: () => navigate(paths.pillar()) },
        { label: herb.name, onClick: () => navigate(paths.herb(herb.slug)) },
        { label: `Vùng ${region.name}` },
      ]} />

      {/* Hero */}
      <section className="bg-[#FAF8F5] border border-[#E6DDD0] rounded-2xl p-6 md:p-10 space-y-3">
        <div className="inline-flex items-center gap-1 bg-[#F5ECE1] text-[#B85037] text-xs font-bold px-2.5 py-1 rounded font-sans uppercase">
          Vùng trọng điểm liên kết
        </div>
        <h1 className="font-serif text-2xl md:text-4xl font-extrabold text-[#4F433A] tracking-tight">
          Vùng Trồng Dược Liệu {herb.name} Tại {region.name}
        </h1>
        <p className="text-gray-700 text-base md:text-lg max-w-3xl font-sans leading-relaxed">
          Phân tích các đặc trưng điều kiện tự nhiên thổ nhưỡng, độ ẩm đất cát pha sỏi và danh mục hợp tác xã đang tham gia mô hình bao tiêu GACP bền vững cùng tôi (<strong className="text-[#4F433A]">{SITE_OWNER}</strong>) và nhà máy trung tâm.
        </p>
      </section>

      {/* Info box with vùng data table */}
      <InfoBox title={`Chỉ số sản xuất và Hợp tác xã liên kết tại ${region.name}`} icon={<MapPin className="w-5 h-5" />}>
        <p className="text-sm text-gray-600 mb-4">Dưới đây là các đơn vị đại diện kiểu mới đứng ra gom hàng nông sản trực tiếp cho xe tải của nhà máy của chúng tôi:</p>
        <DataTable
          headers={["Tỉnh thành trọng điểm", "Diện tích quy hoạch (ha)", "Mùa vụ thu hoạch chính", "Trạng thái liên kết bao tiêu"]}
          rows={region.provinces.map((p) => [
            <strong className="text-[#4F433A] font-sans">{p.name}</strong>,
            p.area,
            p.harvestPeriod,
            <span className="text-green-700 font-bold bg-green-50 px-2 py-0.5 rounded text-xs">{p.activeCooperatives}</span>,
          ])}
        />
      </InfoBox>

      {/* Characteristics */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-[#E6DDD0] rounded-xl p-6 space-y-3 shadow-2xs">
          <h3 className="font-serif text-xl font-bold text-[#4F433A] flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#B85037]" />
            Đặc điểm tự nhiên & Thổ nhưỡng vùng
          </h3>
          <p className="text-[#2D2521] text-base leading-relaxed font-sans">{region.characteristics}</p>
        </div>

        <div className="bg-white border border-[#E6DDD0] rounded-xl p-6 space-y-3 shadow-2xs">
          <h3 className="font-serif text-xl font-bold text-[#4F433A] flex items-center gap-2">
            <Award className="w-5 h-5 text-[#D08620]" />
            Ưu thế dược tính của thảo mộc bản địa
          </h3>
          <p className="text-[#2D2521] text-base leading-relaxed font-sans">{region.advantages}</p>
        </div>
      </section>

      {/* Compact partner card */}
      <section className="space-y-4">
        <h3 className="font-serif text-xl font-bold text-[#4F433A]">Đấu nối gom hàng trực tiếp theo khu vực</h3>
        <p className="text-sm text-gray-600 font-sans">Trưởng khu vực thu mua trung tâm của tập đoàn bao tiêu sấy sẽ điều xe bốc dỡ trực tiếp tại các xã điểm thu gom của HTX đối tác:</p>
        <FeaturedPartnerCard herbName={`${herb.name} tại vùng ${region.name}`} />
      </section>

      {/* Navigation cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          onClick={() => navigate(paths.herb(herb.slug))}
          className="bg-[#FAF8F4] hover:bg-white border border-[#E6DDD0] hover:border-[#B85037] p-5 rounded-xl cursor-pointer transition-all flex items-center justify-between group"
        >
          <div>
            <span className="text-xs text-[#B85037] font-semibold">Quay lại mục trước</span>
            <h4 className="font-serif text-lg font-bold text-[#4F433A] group-hover:text-[#B85037] transition-colors mt-0.5">Giá tổng quan &amp; Phân loại cây {herb.name}</h4>
          </div>
          <ArrowRight className="w-5 h-5 text-[#B85037] group-hover:translate-x-1 transition-transform" />
        </div>

        <div
          onClick={() => navigate(paths.hubWiki(herb.slug))}
          className="bg-[#FAF8F4] hover:bg-white border border-[#E6DDD0] hover:border-[#B85037] p-5 rounded-xl cursor-pointer transition-all flex items-center justify-between group"
        >
          <div>
            <span className="text-xs text-[#D08620] font-semibold">Tài liệu kỹ thuật</span>
            <h4 className="font-serif text-lg font-bold text-[#4F433A] group-hover:text-[#B85037] transition-colors mt-0.5">Cẩm nang gieo trồng giống {herb.name}</h4>
          </div>
          <ArrowRight className="w-5 h-5 text-[#B85037] group-hover:translate-x-1 transition-transform" />
        </div>
      </section>
    </div>
  );
};
