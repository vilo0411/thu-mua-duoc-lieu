import React from "react";
import { useNavigate } from "react-router-dom";
import { HERBS_DATA, PARTNER_COMPANY, FEATURED_PARTNER, buildLandingUrl } from "../lib/data";
import { Breadcrumb, CtaBanner, FaqAccordion, FeaturedPartnerCard, NeutralPartnerCard, HerbCatalog, SeasonalCalendar } from "../components/ui";
import { paths } from "../lib/paths";
import { Seo, pillarSeo } from "../lib/seo";

/** Tiêu đề mục dùng chung: eyebrow nhỏ + tiêu đề serif + mô tả, giới hạn bề rộng cho dễ đọc. */
const SectionHeader: React.FC<{ eyebrow: string; title: string; desc?: string }> = ({ eyebrow, title, desc }) => (
  <header className="max-w-2xl space-y-3">
    <span className="inline-block text-xs font-sans font-bold uppercase tracking-[0.2em] text-terracotta">{eyebrow}</span>
    <h2 className="font-serif text-2xl md:text-[2rem] leading-tight font-bold text-ink-soft tracking-tight">{title}</h2>
    {desc && <p className="text-[15px] text-gray-600 font-sans leading-relaxed">{desc}</p>}
  </header>
);

export const PillarPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in">
      <Seo {...pillarSeo()} />

      <div className="mb-8">
        <Breadcrumb items={[{ label: "Trang chủ", onClick: () => navigate(paths.home()) }, { label: "Thu mua dược liệu" }]} />
      </div>

      {/* Hero — lời hứa của trang, thoáng và ít viền */}
      <section className="bg-sand rounded-3xl px-6 py-10 md:px-12 md:py-16">
        <div className="max-w-2xl space-y-4">
          <span className="inline-block text-xs font-sans font-bold uppercase tracking-[0.2em] text-terracotta">Cổng thông tin dược liệu</span>
          <h1 className="font-serif text-3xl md:text-5xl font-extrabold text-ink-soft tracking-tight leading-[1.1]">
            Bảng giá & thông tin thu mua dược liệu toàn quốc
          </h1>
          <p className="text-gray-700 text-base md:text-lg font-sans leading-relaxed">
            Tra nhanh giá thu mua, tiêu chuẩn kiểm định và nơi bán cho từng cây — giúp bà con nông hộ, hợp tác xã bán đúng giá trị thực, không bị thương lái ép.
          </p>
        </div>
      </section>

      {/* Công cụ tra cứu hợp nhất — ô tìm chính + duyệt theo vùng/nhóm, liền mạch ngay dưới hero */}
      <div className="mt-6 md:mt-8">
        <HerbCatalog />
      </div>

      {/* Các mục còn lại — nhịp rộng để trang có khoảng thở */}
      <div className="mt-20 md:mt-28 space-y-20 md:space-y-28">
        {/* Lịch mùa vụ */}
        <section>
          <SectionHeader
            eyebrow="Lịch mùa vụ"
            title="Tháng này nên trồng & thu hoạch cây gì?"
            desc="Chọn một tháng để xem nhanh cây nào nên xuống giống và cây nào vào vụ thu hoạch."
          />
          <div className="mt-8">
            <SeasonalCalendar herbs={HERBS_DATA} onPickHerb={(slug) => navigate(paths.herb(slug))} />
          </div>
        </section>

        {/* Đối tác thu mua */}
        <section>
          <SectionHeader
            eyebrow="Đơn vị thu mua"
            title="Đối tác bao tiêu được đề xuất"
            desc="Được chọn qua các chuyến khảo sát thực địa nhà máy sấy chiết và vùng quy hoạch giống."
          />
          <div className="mt-8 space-y-6">
            <FeaturedPartnerCard herbName="Dược liệu hỗn hợp" pageType="pillar" />
            <NeutralPartnerCard />
          </div>
        </section>

        {/* FAQ */}
        <section>
          <SectionHeader eyebrow="Hỏi đáp" title="Bà con hỏi — Nguyễn Việt Lộc giải đáp" />
          <div className="mt-8 max-w-3xl">
            <FaqAccordion
              items={[
                { question: `Quy chuẩn kiểm nghiệm chất lượng rễ củ tại nhà máy ${PARTNER_COMPANY.name} thế nào?`, answer: "Sản phẩm khi chở về nhà máy sẽ được bốc dỡ mẫu ngẫu nhiên tại 5 điểm của xe container. Mẫu sẽ được đưa ngay vào phòng Lab kiểm nghiệm bằng phương pháp sắc ký lớp mỏng để xác định lượng saponin/hoạt chất sinh học. Song song đó là sấy sừng khô đo độ ẩm <11% và hóa nghiệm xác định dư lượng chì, thạch tín hay chất hóa học bảo vệ thực vật. Nếu đạt toàn bộ mới ký nhận phiếu xuất kho giải ngân thanh toán." },
                { question: "Nông hộ nhỏ lẻ diện tích vài sào thì làm thế nào tham gia chuỗi bao tiêu?", answer: `Đối với nông hộ canh tác nhỏ lẻ quy mô dưới 1 héc-ta, bà con nên chủ động đề xuất ban lãnh đạo nông nghiệp thôn bản kết hợp thành lập một Tổ hợp tác hoặc Hợp tác xã nông nghiệp kiểu mới. Hợp tác xã sẽ là pháp nhân đại diện chung đứng ra ký kết hợp đồng bao tiêu lớn với ${PARTNER_COMPANY.name}, đồng hành gom nông sản chuyên nghiệp tiện chuyến container.` },
              ]}
            />
          </div>
        </section>

        <CtaBanner
          title="Đồng hành làm giàu từ đồi núi dốc dược liệu"
          description={`Tham gia ngay chuỗi liên kết bền vững GACP cùng ${PARTNER_COMPANY.name} để thoát cảnh 'được mùa mất giá' bấp bênh thương lái ép rẻ.`}
          buttonText="Gửi đăng ký kết nối thu mua"
          href={buildLandingUrl(FEATURED_PARTNER, { pageType: "pillar", ctaPosition: "footer" })}
        />
      </div>
    </div>
  );
};
