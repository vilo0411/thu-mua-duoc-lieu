import React from "react";
import { useNavigate } from "react-router-dom";
import { HERBS_DATA } from "../lib/data";
import { Breadcrumb, CtaBanner, FaqAccordion, SaleChannelsCard, HerbCatalog, SeasonalCalendar, FeaturedPartnerCard, InfoBox } from "../components/ui";
import { ShieldCheck } from "lucide-react";
import { paths } from "../lib/paths";
import { Seo, pillarSeo, PILLAR_FAQ } from "../lib/seo";

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
            Thu mua dược liệu &amp; cây dược liệu: bảng giá, đầu mối và công ty uy tín
          </h1>
          <p className="text-gray-700 text-base md:text-lg font-sans leading-relaxed">
            Tra nhanh giá thu mua, tiêu chuẩn kiểm định và nơi bán cho từng cây dược liệu, kèm danh bạ đầu mối &amp; công ty thu mua uy tín — giúp bà con nông hộ, hợp tác xã bán đúng giá trị thực, không bị thương lái ép.
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

        {/* Đầu mối & công ty thu mua — phục vụ nhóm từ khoá "đầu mối/nơi/địa chỉ/công ty thu mua".
            Định vị người tổng hợp: đây là danh bạ + hướng dẫn, không phải bên trực tiếp thu mua. */}
        <section>
          <SectionHeader
            eyebrow="Đầu mối & công ty"
            title="Đầu mối & công ty thu mua dược liệu uy tín"
            desc="Bà con muốn tìm nơi bán, địa chỉ hoặc công ty thu mua cây dược liệu? Đây là cách nhận biết một đầu mối tử tế và đơn vị bao tiêu mà tôi đang tổng hợp lại."
          />
          <div className="mt-8 space-y-6">
            <p className="max-w-3xl text-[15px] text-gray-700 font-sans leading-relaxed">
              Thị trường dược liệu có đủ loại người mua: thương lái đường dài, đại lý chợ đầu mối, hợp tác xã và các công ty chế biến — dược. Không phải ai trả giá cao nhất cũng là chỗ bán tốt nhất; điều quan trọng là đầu mối đó có ổn định đầu ra, cân đong minh bạch và thanh toán sòng phẳng hay không.
            </p>

            <InfoBox title="4 dấu hiệu của một đầu mối thu mua đáng tin" icon={<ShieldCheck className="w-5 h-5" />}>
              <ul className="grid gap-x-8 gap-y-1.5 sm:grid-cols-2 list-disc pl-5">
                <li><strong>Công bố tiêu chuẩn rõ ràng:</strong> nói trước độ ẩm, phân hạng, chỉ tiêu hoạt chất — không phải mua xong mới trừ lùi.</li>
                <li><strong>Có pháp nhân, địa chỉ cụ thể:</strong> công ty hoặc HTX có mã số thuế, nhà xưởng, người phụ trách thu mua khu vực rõ ràng.</li>
                <li><strong>Giá tham chiếu theo vụ:</strong> báo giá sát bảng giá thị trường, chênh trong khoảng 15–20% chứ không ép sâu.</li>
                <li><strong>Cam kết bao tiêu bằng văn bản:</strong> có hợp đồng, cọc hoặc thỏa thuận sản lượng cho vụ sau.</li>
              </ul>
            </InfoBox>

            <p className="max-w-3xl text-[15px] text-gray-700 font-sans leading-relaxed">
              Dưới đây là đơn vị bao tiêu tôi ưu tiên giới thiệu vì đáp ứng các tiêu chí trên. Đây là kênh gợi ý để bà con so sánh, không phải nơi tôi trực tiếp thu mua — bà con vẫn nên tự xác minh trước khi giao hàng.
            </p>

            <FeaturedPartnerCard herbName="dược liệu" pageType="pillar" />
          </div>
        </section>

        {/* Theo khu vực — phục vụ từ khoá "thu mua dược liệu tại Hà Nội / miền Bắc". */}
        <section>
          <SectionHeader
            eyebrow="Theo khu vực"
            title="Thu mua dược liệu tại Hà Nội & miền Bắc"
            desc="Hai khu vực bà con hỏi nhiều nhất — điểm tập kết, chợ đầu mối và đường đi của hàng."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-[#F0EAE1] bg-white p-6 shadow-xs">
              <h3 className="font-serif text-xl font-bold text-ink-soft mb-3">Thu mua dược liệu tại Hà Nội</h3>
              <p className="text-[15px] text-gray-700 font-sans leading-relaxed">
                Hàng dược liệu thường về hai điểm tập kết lớn là phố Lãn Ông (buôn bán thuốc bắc — thuốc nam lâu đời) và chợ Ninh Hiệp (Gia Lâm) — nơi các đại lý gom sỉ và phân phối đi cả nước. Đây là chỗ khảo giá tốt, nhưng nông hộ bán lẻ dễ bị ép hạng; muốn bán số lượng ổn định nên kết nối thẳng công ty chế biến hoặc HTX đứng ra gom.
              </p>
            </div>
            <div className="rounded-2xl border border-[#F0EAE1] bg-white p-6 shadow-xs">
              <h3 className="font-serif text-xl font-bold text-ink-soft mb-3">Thu mua dược liệu tại miền Bắc</h3>
              <p className="text-[15px] text-gray-700 font-sans leading-relaxed">
                Vùng nguyên liệu trọng điểm gồm <strong>Tây Bắc</strong> (Sơn La, Hòa Bình, Lào Cai — hà thủ ô, atiso, đương quy) và <strong>Đông Bắc</strong> (Cao Bằng, Bắc Kạn, Lạng Sơn — hồi, quế, ba kích). Hàng từ các vùng này phần lớn chạy về Hà Nội hoặc bán trực tiếp cho nhà máy đặt tại địa phương. Bà con xem chi tiết từng vùng trồng và giá theo cây ngay trong công cụ tra cứu phía trên.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <SectionHeader eyebrow="Hỏi đáp" title="Bà con hỏi — Nguyễn Viết Lộc giải đáp" />
          <div className="mt-8 max-w-3xl">
            <FaqAccordion items={PILLAR_FAQ} />
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
