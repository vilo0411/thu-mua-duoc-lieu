import React from "react";
import { Leaf, ShieldCheck, Bug, Clock, Thermometer, Sprout, Package, MapPin } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { HERBS_DATA, getRegionBySlug } from "../lib/data";
import { Breadcrumb, CtaBanner, FaqAccordion, SaleChannelsCard, PriceBoard, PestList, HerbPriceCalculator, MediaCarousel } from "../components/ui";

/** Chọn icon cho thẻ thông số dựa trên từ khoá trong nhãn, giúp bà con liếc là nhận ra. */
const statIcon = (label: string): React.ElementType => {
  const l = label.toLowerCase();
  if (l.includes("bộ phận")) return Package;
  if (l.includes("nhiệt")) return Thermometer;
  if (l.includes("thời gian") || l.includes("thu hoạch") || l.includes("năm")) return Clock;
  if (l.includes("đất") || l.includes("trồng")) return Sprout;
  return Leaf;
};
import { paths, asset } from "../lib/paths";
import { Seo, herbSeo, herbFocusKeyword } from "../lib/seo";
import { NotFoundPage } from "./NotFoundPage";

const POPULARITY_LABEL: Record<string, string> = {
  chinh: "vùng trồng trọng điểm",
  phu: "vùng trồng phụ trợ",
  it: "vùng trồng rải rác",
};

export const MoneyCayPage: React.FC = () => {
  const { cay = "" } = useParams();

  const herb = HERBS_DATA.find((h) => h.slug === cay);
  if (!herb) return <NotFoundPage />;

  const calcCtaHref = `#kenh-tieu-thu`;

  return (
    <div className="space-y-14 md:space-y-20 animate-fade-in">
      <Seo {...herbSeo(herb)} />
      <Breadcrumb items={[
        { label: "Trang chủ", href: paths.home() },
        { label: "Thu mua dược liệu", href: paths.pillar() },
        { label: herb.name },
      ]} />

      {/* Hero */}
      <section className="relative bg-gradient-to-r from-paper to-sand border border-line rounded-2xl p-6 md:p-10 flex flex-col md:flex-row gap-6 items-center">
        <div className="md:w-1/3 aspect-4/3 w-full bg-gray-100 rounded-xl overflow-hidden shadow-xs shrink-0">
          <img src={asset(herb.image)} alt={herb.name} referrerPolicy="no-referrer" loading="eager" fetchPriority="high" decoding="async" className="w-full h-full object-cover" />
        </div>
        <div className="md:w-2/3 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-paper-2 border border-line text-xs font-semibold text-terracotta font-sans">
              <Leaf className="w-3.5 h-3.5" />
              <span>Cây thuốc trọng điểm quốc gia</span>
            </div>
            {herb.priorityLevel === "hot" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-red-50 border border-red-200 text-xs font-bold text-red-600 font-sans uppercase tracking-wide">
                🔥 Đang cần gom gấp
              </span>
            )}
            {herb.demandQuantity && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-green-50 border border-green-200 text-xs font-semibold text-green-700 font-sans">
                <Package className="w-3.5 h-3.5" /> Cần tối thiểu {herb.demandQuantity}
              </span>
            )}
          </div>
          <h1 className="font-serif text-2xl md:text-4xl font-extrabold text-ink-soft tracking-tight">
            {herbFocusKeyword(herb)} {new Date().getFullYear()}: bảng giá &amp; kênh thu mua
          </h1>
          {herb.scientificName && (
            <p className="text-gray-600 text-sm italic font-mono">Tên khoa học: {herb.scientificName}</p>
          )}
          <p className="text-gray-700 text-base leading-relaxed font-sans">{herb.description}</p>
        </div>
      </section>

      {/* Video thực địa (YouTube/TikTok) — chỉ hiện khi cây có khai báo media */}
      {herb.media && herb.media.length > 0 && (
        <MediaCarousel items={herb.media} heading="Video vùng trồng" />
      )}

      {/* Quick Info */}
      <section className="space-y-6">
        <h2 className="font-serif text-xl font-bold text-ink-soft">Thông số đặc điểm thương mại</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {herb.stats.map((stat, idx) => {
            const Icon = statIcon(stat.label);
            return (
              <div key={idx} className="bg-paper-2 border border-line rounded-xl p-4 flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-sand text-terracotta flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="block font-sans font-semibold text-ink-soft text-sm">{stat.label}</span>
                  <span className="block font-sans text-ink-soft font-bold text-lg leading-tight">{stat.value}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Nhận diện hàng tươi / khô (dữ liệu thu mua thực tế) */}
      {(herb.identification?.fresh || herb.identification?.dry) && (
        <section className="space-y-6">
          <h2 className="font-serif text-xl font-bold text-ink-soft flex items-center gap-2">
            <Package className="w-6 h-6 text-terracotta" />
            Đặc điểm nhận diện hàng {herb.name} khi thu mua
          </h2>
          <p className="text-sm text-gray-600 font-sans">
            Bà con đối chiếu mô tả dưới đây để phân loại đúng phẩm cấp trước khi cân hàng, tránh bị trừ ký do lẫn tạp:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {herb.identification.fresh && (
              <div className="bg-green-50/60 border border-green-200 rounded-xl p-5 space-y-2">
                <h3 className="font-sans font-bold text-green-800 flex items-center gap-1.5">
                  <Sprout className="w-4 h-4" /> Hàng tươi
                </h3>
                <p className="text-[15px] text-ink leading-relaxed whitespace-pre-line font-sans">{herb.identification.fresh}</p>
              </div>
            )}
            {herb.identification.dry && (
              <div className="bg-paper-2 border border-line rounded-xl p-5 space-y-2">
                <h3 className="font-sans font-bold text-ink-soft flex items-center gap-1.5">
                  <Package className="w-4 h-4" /> Hàng khô
                </h3>
                <p className="text-[15px] text-ink leading-relaxed whitespace-pre-line font-sans">{herb.identification.dry}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Pricing table */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row items-baseline justify-between gap-2">
          <h2 className="font-serif text-xl font-bold text-ink-soft">
            Bảng giá phân hạng thu mua rễ tươi/sấy khô ({herb.name}) hôm nay
          </h2>
          <span className="text-xs text-green-700 font-semibold italic">Đầy đủ các bộ phận giao dịch</span>
        </div>

        <PriceBoard prices={herb.prices} updatedLabel="Tuần này" />
      </section>

      {/* Price calculator */}
      <section>
        <HerbPriceCalculator prices={herb.prices} herbName={herb.name} ctaHref={calcCtaHref} />
      </section>

      {/* Kênh bán hàng */}
      <section id="kenh-tieu-thu" className="space-y-6 scroll-mt-24">
        <h2 className="font-serif text-xl font-bold text-ink-soft border-b border-line pb-2">Kênh thu mua {herb.name}</h2>
        <SaleChannelsCard herbName={herb.name} cay={herb.slug} pageType="money_cay" />
        <p className="text-sm text-gray-600 font-sans">
          Xem thêm:{" "}
          <Link to={paths.pillar()} className="text-terracotta font-semibold hover:underline">
            bảng giá &amp; đầu mối thu mua dược liệu cho toàn bộ {HERBS_DATA.length} cây
          </Link>
          .
        </p>
      </section>

      {/* Standards */}
      <section className="bg-white border border-line rounded-xl p-6 space-y-5">
        <h2 className="font-serif text-xl font-bold text-ink-soft flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-green-600" />
          Tiêu chuẩn chất lượng để bán được giá tốt
        </h2>
        <p className="text-sm text-gray-600 font-sans">
          Đây là các tiêu chí nhà máy chế biến thường kiểm tra khi nhận hàng {herb.name}. Đạt càng nhiều tiêu chí, bà con càng dễ thương lượng giá cao:
        </p>
        <ul className="space-y-3.5 pl-1">
          {herb.standards.map((std, idx) => (
            <li key={idx} className="flex items-start gap-3 text-ink text-base leading-relaxed">
              <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-1">✓</div>
              <span>{std}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Vùng trồng — nội dung nằm ngay trong bài cây (không tách trang cấp vùng) */}
      {herb.regions.length > 0 && (
      <section className="space-y-6">
        <h2 className="font-serif text-xl font-bold text-ink-soft border-b border-line pb-2">
          Vùng trồng &amp; thu mua {herb.name} trọng điểm
        </h2>
        <p className="text-sm text-gray-600 font-sans">
          {herb.name} được thu mua tập trung tại các vùng dưới đây. Bà con ở những tỉnh này gom hàng qua HTX/đầu mối
          địa phương để đủ sản lượng cho một chuyến bao tiêu:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {herb.regions.map((reg, idx) => {
            const detail = getRegionBySlug(reg.regionSlug);
            const popularityLabel = POPULARITY_LABEL[reg.popularity] ?? "vùng trồng";
            return (
              <div key={idx} className="bg-paper border border-line rounded-xl p-5 space-y-2.5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-serif text-lg font-bold text-ink-soft flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-terracotta shrink-0" />
                    Thu mua {herb.name} tại {reg.regionName}
                  </h3>
                  <span className="shrink-0 text-[11px] font-sans font-bold uppercase bg-sand text-terracotta px-2 py-0.5 rounded">
                    {popularityLabel}
                  </span>
                </div>
                {reg.provinces.length > 0 && (
                  <p className="text-sm text-ink font-sans">
                    <span className="font-semibold text-ink-soft">Tỉnh trọng điểm:</span> {reg.provinces.join(", ")}
                  </p>
                )}
                <p className="text-sm text-ink font-sans">
                  <span className="font-semibold text-ink-soft">Sản lượng dự kiến:</span> {reg.outputEstimate}
                </p>
                {detail?.characteristics && (
                  <p className="text-[15px] text-ink leading-relaxed font-sans">{detail.characteristics}</p>
                )}
                {detail?.advantages && (
                  <p className="text-sm text-gray-600 leading-relaxed font-sans">{detail.advantages}</p>
                )}
              </div>
            );
          })}
        </div>
      </section>
      )}

      {/* Pests & diseases */}
      {herb.pests.length > 0 && (
        <section className="space-y-6">
          <h2 className="font-serif text-xl font-bold text-ink-soft flex items-center gap-2 border-b border-line pb-2">
            <Bug className="w-6 h-6 text-terracotta" />
            Sâu bệnh thường gặp & cách xử lý cho {herb.name}
          </h2>
          <p className="text-sm text-gray-600 font-sans">
            Bà con soi cây nhà mình theo dấu hiệu bên dưới để nhận biết sớm và xử lý bằng chế phẩm an toàn, giữ hàng đạt
            chuẩn thu mua:
          </p>
          <PestList pests={herb.pests} />
        </section>
      )}

      {/* Technique block */}
      <section className="bg-gradient-to-br from-paper to-paper-2 border border-line rounded-xl p-6 flex flex-col sm:flex-row gap-6 items-center justify-between">
        <div className="space-y-2">
          <span className="text-terracotta font-mono text-xs font-bold uppercase tracking-[0.15em] block mb-1">// Tài liệu hướng dẫn</span>
          <h2 className="font-serif text-xl font-bold text-ink-soft">Kỹ thuật gieo trồng chăm sóc {herb.name} đúng quy chuẩn nông nghiệp sạch</h2>
          <p className="text-sm text-gray-600 max-w-xl">Do Nguyễn Viết Lộc tổng hợp từ nguồn uy tín — từ chọn giống, chăm sóc đến thu hoạch và sơ chế đúng cách.</p>
        </div>
        <Link
          to={paths.hubWiki(herb.slug)}
          className="shrink-0 bg-white border border-terracotta hover:bg-terracotta hover:text-white text-terracotta font-sans font-bold text-sm px-5 py-3 rounded-lg shadow-2xs transition-all cursor-pointer"
        >
          Xem ngay kỹ thuật trồng {herb.name} →
        </Link>
      </section>

      {/* FAQ */}
      {herb.faq.length > 0 && (
      <section className="space-y-6">
        <h2 className="font-serif text-xl font-bold text-ink-soft border-b border-line pb-2">Câu hỏi thường gặp nhất về thu mua {herb.name}</h2>
        <FaqAccordion items={herb.faq} />
      </section>
      )}

      <CtaBanner
        title={`Có thắc mắc về giá hoặc kênh bán ${herb.name}?`}
        description="Bà con cứ hỏi cụ thể — vùng trồng, số lượng, chất lượng hàng — tôi sẽ tư vấn kênh phù hợp nhất."
        buttonText="Gửi câu hỏi cho tôi"
        href="/lien-he"
      />
    </div>
  );
};
