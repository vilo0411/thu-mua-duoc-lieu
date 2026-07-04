import React from "react";
import { useNavigate } from "react-router-dom";
import { HERBS_DATA, PARTNER_COMPANY, FEATURED_PARTNER, buildLandingUrl } from "../lib/data";
import { Breadcrumb, CtaBanner, FaqAccordion, FeaturedPartnerCard, NeutralPartnerCard, HerbCatalog, SeasonalCalendar, HerbCompare } from "../components/ui";
import { paths } from "../lib/paths";
import { Seo, pillarSeo } from "../lib/seo";

export const PillarPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-10 animate-fade-in">
      <Seo {...pillarSeo()} />
      <Breadcrumb items={[{ label: "Trang chủ", onClick: () => navigate(paths.home()) }, { label: "Thu mua dược liệu" }]} />

      {/* Compact Hero */}
      <section className="bg-[#F5ECE1] border border-[#E6DDD0] rounded-2xl p-6 md:p-10 space-y-3">
        <h1 className="font-serif text-2xl md:text-4xl font-extrabold text-[#4F433A] tracking-tight">
          Cổng Thông Tin & Bảng Giá Thu Mua Dược Liệu Toàn Quốc
        </h1>
        <p className="text-gray-700 text-base md:text-lg max-w-3xl font-sans leading-relaxed">
          Nơi tổng hợp giá cả giao dịch nông sản, tiêu chuẩn hóa nghiệm dược phẩm tại các nhà máy trung tâm của <strong className="text-[#B85037]">{PARTNER_COMPANY.name}</strong> giúp bà con nông hộ, hợp tác xã bán nông sản đúng giá trị thực tế.
        </p>
      </section>

      {/* Market Overview Section */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#4F433A]">Tổng quan tình hình thị trường dược liệu Quý II/2026</h2>
        <div className="bg-white border border-[#E6DDD0] rounded-xl p-5 text-gray-700 leading-relaxed space-y-3">
          <p>
            Hiện nay, nhu cầu thu mua nguyên liệu thô đầu vào đạt tiêu chuẩn GACP-WHO tại các nhà máy sản xuất đông dược trong nước và xuất khẩu đang tăng mạnh, đạt mức tăng trưởng 18% so với cùng kỳ năm ngoái. Tuy nhiên, nguồn cung sạch, canh tác hữu cơ rõ ràng xuất xứ nguồn gốc vẫn đang rơi vào tình trạng khan hiếm nghiêm trọng.
          </p>
          <p>
            Chính vì thế, các tập đoàn lớn như <strong className="text-[#B85037]">{PARTNER_COMPANY.name}</strong> sẵn sàng đẩy cao giá thu mua đối với các lô hàng rễ củ (Đinh lăng, Ba kích, Hà thủ ô) đạt tuổi khai thác chín muồi và được phơi sấy khô sạch tạp chất bằng công nghệ cao lò sấy điện khép kín.
          </p>
        </div>
      </section>

      {/* Interactive catalog: bản đồ vùng bấm được + bộ lọc nhanh */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row items-baseline justify-between gap-2">
          <h3 className="font-serif text-xl font-bold text-[#4F433A]">
            Tra cứu giá thu mua theo cây &amp; vùng trồng
          </h3>
          <span className="text-xs text-gray-500 italic">Chọn vùng trên bản đồ hoặc lọc theo nhóm dược liệu</span>
        </div>
        <HerbCatalog />
      </section>

      {/* Seasonal calendar */}
      <section className="space-y-4">
        <h3 className="font-serif text-xl font-bold text-[#4F433A]">Lịch mùa vụ dược liệu — nên trồng &amp; thu hoạch tháng nào?</h3>
        <p className="text-sm text-gray-600 font-sans">Bấm vào một tháng để xem nhanh cây nào nên xuống giống và cây nào vào vụ thu hoạch trong tháng đó.</p>
        <SeasonalCalendar herbs={HERBS_DATA} onPickHerb={(slug) => navigate(paths.herb(slug))} />
      </section>

      {/* Herb compare */}
      <section className="space-y-4">
        <h3 className="font-serif text-xl font-bold text-[#4F433A]">So sánh nhanh giữa các cây dược liệu</h3>
        <p className="text-sm text-gray-600 font-sans">Đang phân vân trồng cây gì? Chọn 2–3 cây để đặt giá, thời gian thu hoạch và năng suất cạnh nhau.</p>
        <HerbCompare herbs={HERBS_DATA} onPickHerb={(slug) => navigate(paths.herb(slug))} />
      </section>

      {/* Highlighted partner cards */}
      <section className="space-y-6">
        <h3 className="font-serif text-xl font-bold text-[#4F433A] border-b border-[#F0EAE1] pb-2">
          Xác minh & Đề xuất đơn vị thu mua uy tín hàng đầu
        </h3>
        <p className="text-sm text-gray-600 font-sans">
          Tôi thường xuyên tổ chức các chuyến đi khảo sát thực địa nhà máy sấy chiết, vùng quy hoạch giống. Dưới đây là đối tác đề xuất tin cậy nhất được bảo lãnh hợp đồng bao tiêu:
        </p>
        <FeaturedPartnerCard herbName="Dược liệu hỗn hợp" pageType="pillar" />
        <NeutralPartnerCard />
      </section>

      {/* FAQ Accordion */}
      <section className="space-y-4">
        <h3 className="font-serif text-xl font-bold text-[#4F433A] border-b border-[#F0EAE1] pb-2">Bà con hỏi - Nguyễn Việt Lộc giải đáp về thu mua</h3>
        <FaqAccordion
          items={[
            { question: `Quy chuẩn kiểm nghiệm chất lượng rễ củ tại nhà máy ${PARTNER_COMPANY.name} thế nào?`, answer: "Sản phẩm khi chở về nhà máy sẽ được bốc dỡ mẫu ngẫu nhiên tại 5 điểm của xe container. Mẫu sẽ được đưa ngay vào phòng Lab kiểm nghiệm bằng phương pháp sắc ký lớp mỏng để xác định lượng saponin/hoạt chất sinh học. Song song đó là sấy sừng khô đo độ ẩm <11% và hóa nghiệm xác định dư lượng chì, thạch tín hay chất hóa học bảo vệ thực vật. Nếu đạt toàn bộ mới ký nhận phiếu xuất kho giải ngân thanh toán." },
            { question: "Nông hộ nhỏ lẻ diện tích vài sào thì làm thế nào tham gia chuỗi bao tiêu?", answer: `Đối với nông hộ canh tác nhỏ lẻ quy mô dưới 1 héc-ta, bà con nên chủ động đề xuất ban lãnh đạo nông nghiệp thôn bản kết hợp thành lập một Tổ hợp tác hoặc Hợp tác xã nông nghiệp kiểu mới. Hợp tác xã sẽ là pháp nhân đại diện chung đứng ra ký kết hợp đồng bao tiêu lớn với ${PARTNER_COMPANY.name}, đồng hành gom nông sản chuyên nghiệp tiện chuyến container.` },
          ]}
        />
      </section>

      <CtaBanner
        title="Đồng hành làm giàu từ đồi núi dốc dược liệu"
        description={`Tham gia ngay chuỗi liên kết bền vững GACP cùng ${PARTNER_COMPANY.name} để thoát cảnh 'được mùa mất giá' bấp bênh thương lái ép rẻ.`}
        buttonText="Gửi đăng ký kết nối thu mua"
        href={buildLandingUrl(FEATURED_PARTNER, { pageType: "pillar", ctaPosition: "footer" })}
      />
    </div>
  );
};
