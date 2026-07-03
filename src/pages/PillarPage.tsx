import React from "react";
import { ChevronRight, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { HERBS_DATA, PARTNER_COMPANY, REGIONS_DATA } from "../lib/data";
import { Breadcrumb, CtaBanner, DataTable, FaqAccordion, FeaturedPartnerCard, NeutralPartnerCard } from "../components/ui";
import { useShipmentModal } from "../lib/ShipmentModalContext";
import { paths } from "../lib/paths";
import { Seo, pillarSeo } from "../lib/seo";

export const PillarPage: React.FC = () => {
  const navigate = useNavigate();
  const { open } = useShipmentModal();

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

      {/* Full pricing table */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row items-baseline justify-between gap-2">
          <h3 className="font-serif text-xl font-bold text-[#4F433A]">
            Bảng giá thu mua chi tiết dược liệu hôm nay (Tham khảo tại ruộng)
          </h3>
          <span className="text-xs text-gray-500 italic">Cập nhật liên tục theo ngày bởi chuyên viên thu mua</span>
        </div>

        <DataTable
          headers={["Tên dược liệu", "Bộ phận dùng chính", "Quy cách kỹ thuật chuẩn", "Dải giá hôm nay (VNĐ/kg)", "Xu hướng"]}
          rows={HERBS_DATA.map((herb) => {
            const bestPrice = herb.prices[0];
            return [
              <button
                onClick={() => navigate(paths.herb(herb.slug))}
                className="font-sans font-bold text-[#B85037] hover:underline hover:text-[#9F3E28] block text-left text-base"
              >
                {herb.name} (Xem chi tiết →)
              </button>,
              herb.stats.find((s) => s.label === "Bộ phận thu hoạch")?.value || "Rễ, củ",
              <span className="text-sm line-clamp-1 text-gray-600">{bestPrice ? bestPrice.specification : "Độ ẩm <12%"}</span>,
              <span className="font-semibold text-[#4F433A]">{bestPrice ? `${bestPrice.priceRange} VNĐ` : herb.priceRange}</span>,
              <span className="inline-flex items-center gap-1 text-green-700 font-bold bg-green-50 px-2 py-1 rounded text-xs uppercase">
                Tăng ổn định
              </span>,
            ];
          })}
        />
      </section>

      {/* Highlighted partner cards */}
      <section className="space-y-6">
        <h3 className="font-serif text-xl font-bold text-[#4F433A] border-b border-[#F0EAE1] pb-2">
          Xác minh & Đề xuất đơn vị thu mua uy tín hàng đầu
        </h3>
        <p className="text-sm text-gray-600 font-sans">
          Tôi thường xuyên tổ chức các chuyến đi khảo sát thực địa nhà máy sấy chiết, vùng quy hoạch giống. Dưới đây là đối tác đề xuất tin cậy nhất được bảo lãnh hợp đồng bao tiêu:
        </p>
        <FeaturedPartnerCard herbName="Dược liệu hỗn hợp" />
        <NeutralPartnerCard />
      </section>

      {/* Region cards with links */}
      <section className="space-y-4">
        <h3 className="font-serif text-xl font-bold text-[#4F433A]">Danh sách vùng trồng chính và chỉ số thu hoạch</h3>
        <p className="text-sm text-gray-600">
          Mỗi loại cây thuốc phát triển tốt nhất trên các dải khí hậu thổ nhưỡng chuyên biệt. Nhấp vào tên vùng để xem đặc điểm và danh sách Hợp tác xã liên kết.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {REGIONS_DATA.map((region) => (
            <div
              key={region.slug}
              onClick={() => navigate(paths.herbRegion("dinh-lang", region.slug))}
              className="bg-white border border-[#E6DDD0] hover:border-[#B85037] p-5 rounded-xl cursor-pointer transition-all shadow-2xs hover:shadow-xs flex justify-between items-center group"
            >
              <div className="space-y-1">
                <h4 className="font-sans font-bold text-lg text-[#4F433A] group-hover:text-[#B85037] transition-colors flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#B85037]" />
                  Vùng {region.name}
                </h4>
                <p className="text-xs text-gray-500 line-clamp-1 max-w-sm">Cây thuốc chính: {region.commonHerbs.join(", ")}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#B85037] group-hover:translate-x-1 transition-transform" />
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="space-y-4">
        <h3 className="font-serif text-xl font-bold text-[#4F433A] border-b border-[#F0EAE1] pb-2">Bà con hỏi - Nguyễn Việt Lộc giải đáp về thu mua</h3>
        <FaqAccordion
          items={[
            { question: "Quy chuẩn kiểm nghiệm chất lượng rễ củ tại nhà máy VIETMEC thế nào?", answer: "Sản phẩm khi chở về nhà máy sẽ được bốc dỡ mẫu ngẫu nhiên tại 5 điểm của xe container. Mẫu sẽ được đưa ngay vào phòng Lab kiểm nghiệm bằng phương pháp sắc ký lớp mỏng để xác định lượng saponin/hoạt chất sinh học. Song song đó là sấy sừng khô đo độ ẩm <11% và hóa nghiệm xác định dư lượng chì, thạch tín hay chất hóa học bảo vệ thực vật. Nếu đạt toàn bộ mới ký nhận phiếu xuất kho giải ngân thanh toán." },
            { question: "Nông hộ nhỏ lẻ diện tích vài sào thì làm thế nào tham gia chuỗi bao tiêu?", answer: "Đối với nông hộ canh tác nhỏ lẻ quy mô dưới 1 héc-ta, bà con nên chủ động đề xuất ban lãnh đạo nông nghiệp thôn bản kết hợp thành lập một Tổ hợp tác hoặc Hợp tác xã nông nghiệp kiểu mới. Hợp tác xã sẽ là pháp nhân đại diện chung đứng ra ký kết hợp đồng bao tiêu lớn với tập đoàn sấy VIETMEC, đồng hành gom nông sản chuyên nghiệp tiện chuyến container." },
          ]}
        />
      </section>

      <CtaBanner
        title="Đồng hành làm giàu từ đồi núi dốc dược liệu"
        description="Tham gia ngay chuỗi liên kết bền vững GACP cùng VIETMEC để thoát cảnh 'được mùa mất giá' bấp bênh thương lái ép rẻ."
        buttonText="Gửi đăng ký kết nối thu mua"
        onClick={() => open("Dược liệu thô")}
      />
    </div>
  );
};
