import React from "react";
import { useNavigate } from "react-router-dom";
import { HERBS_DATA } from "../lib/data";
import { Breadcrumb, CtaBanner, FaqAccordion, SaleChannelsCard, HerbCatalog, SeasonalCalendar } from "../components/ui";
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

        {/* Kênh tiêu thụ */}
        <section>
          <SectionHeader
            eyebrow="Kênh tiêu thụ"
            title="Bán dược liệu qua kênh nào?"
            desc="Ba kênh phổ biến — mỗi kênh có ưu/nhược riêng tùy quy mô và tiêu chuẩn hàng của bà con."
          />
          <div className="mt-8">
            <SaleChannelsCard herbName="Dược liệu" pageType="pillar" />
          </div>
        </section>

        {/* FAQ */}
        <section>
          <SectionHeader eyebrow="Hỏi đáp" title="Bà con hỏi — Nguyễn Việt Lộc giải đáp" />
          <div className="mt-8 max-w-3xl">
            <FaqAccordion
              items={[
                {
                  question: "Trồng nhỏ lẻ vài sào có bán được cho nhà máy không?",
                  answer: "Nhà máy thường mua theo lô lớn (tối thiểu vài tấn/chuyến xe). Nông hộ canh tác dưới 1ha nên liên kết qua HTX hoặc tổ hợp tác địa phương để gom hàng chung. HTX đứng ra ký hợp đồng và phân chia lợi nhuận theo tỷ lệ đóng góp. Đây là con đường bền vững hơn bán lẻ cho thương lái.",
                },
                {
                  question: "Làm thế nào biết giá mình đang bán có bị ép thấp không?",
                  answer: "Bà con tham khảo bảng giá theo từng cây trên trang này (cập nhật theo vụ), sau đó so sánh với giá thương lái đang trả. Nếu chênh lệch lớn hơn 15–20%, đáng cân nhắc gom hàng theo HTX để bán thẳng nhà máy. Yếu tố khác cũng ảnh hưởng giá: độ ẩm, phân hạng chất lượng, thời điểm bán trong vụ.",
                },
              ]}
            />
          </div>
        </section>

        <CtaBanner
          title="Cần tư vấn kênh bán phù hợp với vùng của bạn?"
          description="Gửi thông tin cây trồng, khu vực và quy mô — tôi sẽ phản hồi cụ thể về kênh tiêu thụ và tiêu chuẩn chất lượng cần đạt."
          buttonText="Gửi câu hỏi tư vấn"
          href="/lien-he"
        />
      </div>
    </div>
  );
};
