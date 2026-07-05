import React from "react";
import { ChevronRight, Leaf, ShieldCheck, Bug, Clock, Thermometer, Sprout, Package } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { HERBS_DATA, PARTNER_COMPANY, FEATURED_PARTNER, buildLandingUrl } from "../lib/data";
import { Breadcrumb, CtaBanner, FaqAccordion, FeaturedPartnerCard, NeutralPartnerCard, PriceBoard, PestList, HerbPriceCalculator } from "../components/ui";

/** Chọn icon cho thẻ thông số dựa trên từ khoá trong nhãn, giúp bà con liếc là nhận ra. */
const statIcon = (label: string): React.ElementType => {
  const l = label.toLowerCase();
  if (l.includes("bộ phận")) return Package;
  if (l.includes("nhiệt")) return Thermometer;
  if (l.includes("thời gian") || l.includes("thu hoạch") || l.includes("năm")) return Clock;
  if (l.includes("đất") || l.includes("trồng")) return Sprout;
  return Leaf;
};
import { paths } from "../lib/paths";
import { Seo, herbSeo } from "../lib/seo";
import { NotFoundPage } from "./NotFoundPage";

export const MoneyCayPage: React.FC = () => {
  const { cay = "" } = useParams();
  const navigate = useNavigate();

  const herb = HERBS_DATA.find((h) => h.slug === cay);
  if (!herb) return <NotFoundPage />;

  const calcCtaHref = buildLandingUrl(FEATURED_PARTNER, { cay: herb.slug, pageType: "money_cay", ctaPosition: "calculator" });

  return (
    <div className="space-y-10 animate-fade-in">
      <Seo {...herbSeo(herb)} />
      <Breadcrumb items={[
        { label: "Trang chủ", onClick: () => navigate(paths.home()) },
        { label: "Thu mua dược liệu", onClick: () => navigate(paths.pillar()) },
        { label: herb.name },
      ]} />

      {/* Hero */}
      <section className="relative bg-gradient-to-r from-paper to-sand border border-line rounded-2xl p-6 md:p-10 flex flex-col md:flex-row gap-6 items-center">
        <div className="md:w-1/3 aspect-4/3 w-full bg-gray-100 rounded-xl overflow-hidden shadow-xs shrink-0">
          <img src={herb.image} alt={herb.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
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
            Thị Trường Thu Mua & Bảng Giá Dược Liệu {herb.name}
          </h1>
          {herb.scientificName && (
            <p className="text-gray-600 text-sm italic font-mono">Tên khoa học: {herb.scientificName}</p>
          )}
          <p className="text-gray-700 text-base leading-relaxed font-sans">{herb.description}</p>
        </div>
      </section>

      {/* Quick Info */}
      <section className="space-y-4">
        <h3 className="font-serif text-xl font-bold text-ink-soft">Thông số đặc điểm thương mại</h3>
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
        <section className="space-y-4">
          <h3 className="font-serif text-xl font-bold text-ink-soft flex items-center gap-2">
            <Package className="w-6 h-6 text-terracotta" />
            Đặc điểm nhận diện hàng {herb.name} khi thu mua
          </h3>
          <p className="text-sm text-gray-600 font-sans">
            Bà con đối chiếu mô tả dưới đây để phân loại đúng phẩm cấp trước khi cân hàng, tránh bị trừ ký do lẫn tạp:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {herb.identification.fresh && (
              <div className="bg-green-50/60 border border-green-200 rounded-xl p-5 space-y-2">
                <h4 className="font-sans font-bold text-green-800 flex items-center gap-1.5">
                  <Sprout className="w-4 h-4" /> Hàng tươi
                </h4>
                <p className="text-[15px] text-ink leading-relaxed whitespace-pre-line font-sans">{herb.identification.fresh}</p>
              </div>
            )}
            {herb.identification.dry && (
              <div className="bg-paper-2 border border-line rounded-xl p-5 space-y-2">
                <h4 className="font-sans font-bold text-ink-soft flex items-center gap-1.5">
                  <Package className="w-4 h-4" /> Hàng khô
                </h4>
                <p className="text-[15px] text-ink leading-relaxed whitespace-pre-line font-sans">{herb.identification.dry}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Pricing table */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row items-baseline justify-between gap-2">
          <h3 className="font-serif text-xl font-bold text-ink-soft">
            Bảng giá phân hạng thu mua rễ tươi/sấy khô ({herb.name}) hôm nay
          </h3>
          <span className="text-xs text-green-700 font-semibold italic">Đầy đủ các bộ phận giao dịch</span>
        </div>

        <PriceBoard prices={herb.prices} updatedLabel="Tuần này" />
      </section>

      {/* Price calculator */}
      <section>
        <HerbPriceCalculator prices={herb.prices} herbName={herb.name} ctaHref={calcCtaHref} />
      </section>

      {/* Partner cards */}
      <section className="space-y-4">
        <h3 className="font-serif text-xl font-bold text-ink-soft border-b border-line pb-2">Đề xuất kênh bán hàng {herb.name} minh bạch</h3>
        <FeaturedPartnerCard herbName={herb.name} cay={herb.slug} pageType="money_cay" />
        <NeutralPartnerCard />
      </section>

      {/* Standards */}
      <section className="bg-white border border-line rounded-xl p-6 space-y-4">
        <h3 className="font-serif text-xl font-bold text-ink-soft flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-green-600" />
          Yêu cầu tiêu chuẩn kiểm định dược phẩm của nhà máy sấy
        </h3>
        <p className="text-sm text-gray-600 font-sans">
          Mọi lô hàng {herb.name} trước khi đưa vào kho lò chưng cất sấy điện của doanh nghiệp bao tiêu đều phải đạt tối thiểu 4 tiêu chí khắt khe sau:
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

      {/* Region cards */}
      {herb.regions.length > 0 && (
      <section className="space-y-4">
        <h3 className="font-serif text-xl font-bold text-ink-soft">Các vùng canh tác chính và sản lượng bao tiêu</h3>
        <p className="text-sm text-gray-600 font-sans">Nhấp vào vùng trồng để kết nối hợp tác xã kiểu mới tại vùng để gom hàng chung chuyến xe thu mua:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {herb.regions.map((reg, idx) => (
            <div
              key={idx}
              onClick={() => navigate(paths.herbRegion(herb.slug, reg.regionSlug))}
              className="bg-paper hover:bg-sand border border-line hover:border-terracotta p-4 rounded-xl cursor-pointer transition-all flex justify-between items-center group"
            >
              <div>
                <h5 className="font-sans font-bold text-ink-soft group-hover:text-terracotta transition-colors">{reg.regionName}</h5>
                <p className="text-xs text-gray-500 font-sans mt-0.5">Sản lượng dự kiến: {reg.outputEstimate}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-terracotta group-hover:translate-x-1 transition-transform" />
            </div>
          ))}
        </div>
      </section>
      )}

      {/* Pests & diseases */}
      {herb.pests.length > 0 && (
        <section className="space-y-4">
          <h3 className="font-serif text-xl font-bold text-ink-soft flex items-center gap-2 border-b border-line pb-2">
            <Bug className="w-6 h-6 text-terracotta" />
            Sâu bệnh thường gặp & cách xử lý cho {herb.name}
          </h3>
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
          <h4 className="font-serif text-xl font-bold text-ink-soft">Kỹ thuật gieo trồng chăm sóc {herb.name} đúng quy chuẩn nông nghiệp sạch</h4>
          <p className="text-sm text-gray-600 max-w-xl">Cung cấp bởi chuyên gia Nguyễn Việt Lộc, đồng biên soạn từ giáo trình tập huấn GACP của đối tác thu mua.</p>
        </div>
        <button
          onClick={() => navigate(paths.hubWiki(herb.slug))}
          className="shrink-0 bg-white border border-terracotta hover:bg-terracotta hover:text-white text-terracotta font-sans font-bold text-sm px-5 py-3 rounded-lg shadow-2xs transition-all cursor-pointer"
        >
          Xem cẩm nang kỹ thuật trồng {herb.name} →
        </button>
      </section>

      {/* FAQ */}
      {herb.faq.length > 0 && (
      <section className="space-y-4">
        <h3 className="font-serif text-xl font-bold text-ink-soft border-b border-line pb-2">Câu hỏi thường gặp nhất về thu mua {herb.name}</h3>
        <FaqAccordion items={herb.faq} />
      </section>
      )}

      <CtaBanner
        title={`Gửi lô hàng ${herb.name} để đấu nối bao tiêu`}
        description={`Nhận ngay phản hồi của Trưởng ban mua hàng khu vực của tập đoàn sấy sạch dược phẩm ${PARTNER_COMPANY.name} để thương thảo giá thu mua sàn của bà con.`}
        buttonText="Bắt đầu gửi thông số lô hàng"
        href={buildLandingUrl(FEATURED_PARTNER, { cay: herb.slug, pageType: "money_cay", ctaPosition: "footer" })}
      />
    </div>
  );
};
