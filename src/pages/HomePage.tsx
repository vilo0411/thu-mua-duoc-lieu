import React from "react";
import { ArrowRight, BookOpen, ChevronRight, Leaf, ShieldCheck, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { HERBS_DATA, PARTNER_COMPANY, SITE_OWNER, WIKI_ARTICLES } from "../lib/data";
import { ArticleCard, CtaBanner, HerbCard } from "../components/ui";
import { useShipmentModal } from "../lib/ShipmentModalContext";
import { paths } from "../lib/paths";
import { Seo, homeSeo } from "../lib/seo";

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { open } = useShipmentModal();

  return (
    <div className="space-y-12 animate-fade-in">
      <Seo {...homeSeo()} />
      {/* Hero Section */}
      <section id="homepage-hero" className="relative bg-gradient-to-br from-[#FDFBF9] via-[#FBF7F0] to-[#F5ECE1] border-b border-[#E6DDD0] py-16 md:py-24 overflow-hidden rounded-2xl p-6 md:p-12 my-4">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#B85037]/5 rounded-full -mr-32 -mt-32 pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-80 h-80 bg-[#D08620]/5 rounded-full -ml-32 -mb-32 pointer-events-none" />

        <div className="max-w-3xl space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5ECE1] border border-[#E6DDD0] text-[#B85037]">
            <Leaf className="w-4 h-4 shrink-0 animate-pulse" />
            <span className="font-sans font-semibold text-xs tracking-wider uppercase">Kiến thức nông nghiệp độc lập & Kết nối bao tiêu</span>
          </div>

          <h1 className="font-serif text-3xl md:text-5xl font-extrabold text-[#4F433A] leading-tight tracking-tight">
            Bảo Tồn Dược Liệu Việt,<br />
            <span className="text-[#B85037]">Đảm Bảo Đầu Ra</span> Bền Vững Cho Bà Con
          </h1>

          <p className="text-[#2D2521] text-lg md:text-xl font-sans leading-relaxed max-w-2xl">
            Cổng thông tin chuyên biệt chia sẻ kỹ thuật trồng dược liệu đạt chuẩn GACP-WHO và cập nhật bảng giá thu mua minh bạch từ các nhà máy sấy lớn của tập đoàn dược liệu Việt Nam <strong className="text-[#B85037]">{PARTNER_COMPANY.name}</strong>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              id="hero-primary-cta"
              onClick={() => navigate(paths.pillar())}
              className="bg-[#B85037] hover:bg-[#9F3E28] text-white font-sans font-bold text-base px-8 py-4 rounded-lg shadow-md transition-all transform hover:scale-[1.02] cursor-pointer text-center inline-flex items-center justify-center gap-2"
            >
              <span>Xem giá thu mua hôm nay</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              id="hero-secondary-cta"
              onClick={() => navigate(paths.article("ky-thuat-say-duoc-lieu-chuan-gacp"))}
              className="bg-white border border-[#E6DDD0] hover:border-[#B85037] text-[#4F433A] hover:text-[#B85037] font-sans font-semibold text-base px-8 py-4 rounded-lg shadow-2xs transition-all text-center cursor-pointer"
            >
              Tìm hiểu kỹ thuật sấy chuẩn
            </button>
          </div>
        </div>
      </section>

      {/* 3-Column Value Props with Icons */}
      <section id="homepage-value-props" className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-[#E6DDD0] rounded-xl p-6 space-y-3 shadow-2xs">
          <div className="w-12 h-12 rounded-lg bg-[#FAF6F0] flex items-center justify-center text-[#B85037]">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#4F433A]">Giá thu mua cập nhật</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Theo dõi biến động thị trường dược liệu thực tế tại các vùng trồng, giá phân loại rõ ràng theo chất lượng củ rễ, thân cành hay lá khô khô ráo.
          </p>
        </div>

        <div className="bg-white border border-[#E6DDD0] rounded-xl p-6 space-y-3 shadow-2xs">
          <div className="w-12 h-12 rounded-lg bg-[#FAF6F0] flex items-center justify-center text-[#D08620]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#4F433A]">Kết nối đầu mối uy tín</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Hỗ trợ kết nối trực tiếp với phòng thu mua của <strong className="text-[#B85037]">{PARTNER_COMPANY.name}</strong> - đơn vị bao tiêu xuất khẩu chính ngạch uy tín lâu đời tại Việt Nam.
          </p>
        </div>

        <div className="bg-white border border-[#E6DDD0] rounded-xl p-6 space-y-3 shadow-2xs">
          <div className="w-12 h-12 rounded-lg bg-[#FAF6F0] flex items-center justify-center text-[#B85037]">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#4F433A]">Kỹ thuật thực địa chuyên sâu</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Cẩm nang canh tác nông sản sạch đạt GACP-WHO, từ tuyển chọn giống cấy mô, xử lý mốc rễ hữu cơ đến công nghệ chưng cất sấy điện chất lượng cao.
          </p>
        </div>
      </section>

      {/* Featured Herbs Grid (6-8 cards) */}
      <section id="homepage-featured-herbs" className="space-y-6">
        <div className="flex flex-col sm:flex-row items-baseline justify-between gap-2 border-b border-[#F0EAE1] pb-4">
          <div>
            <span className="text-[#B85037] text-xs font-bold uppercase tracking-wider block mb-1">Cây thuốc thế mạnh</span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#4F433A] tracking-tight">
              Danh mục thảo dược thu mua chính
            </h2>
          </div>
          <button
            onClick={() => navigate(paths.herbCatalog())}
            className="text-[#B85037] hover:text-[#9F3E28] text-sm font-bold inline-flex items-center gap-1 hover:underline cursor-pointer"
          >
            Xem toàn bộ bảng giá cây thuốc <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HERBS_DATA.slice(0, 8).map((herb) => (
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
      </section>

      {/* Trust Section: 4-5 criteria with icons */}
      <section id="homepage-trust" className="bg-[#FAF8F5] border border-[#E6DDD0] rounded-2xl p-8 md:p-10 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[#B85037] text-xs font-bold uppercase tracking-wider block">Kinh nghiệm thực tế</span>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#4F433A]">
            Tiêu chí chọn nơi thu mua dược liệu uy tín
          </h2>
          <p className="text-gray-600 text-sm md:text-base font-sans">
            Tôi (<strong className="text-[#4F433A]">{SITE_OWNER}</strong>) đúc kết các bài học xương máu giúp bà con nông dân nhận diện đối tác tin cậy, tránh bẫy của thương lái ép giá.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {[
            {
              title: "Cam kết bao tiêu bằng văn bản pháp lý",
              desc: "Tránh xa các lời hứa hẹn truyền miệng. Một đơn vị thu mua chuẩn phải có hợp đồng mua bán rõ ràng, cam kết mức giá bảo hiểm sàn từ đầu vụ gieo giống.",
            },
            {
              title: "Sở hữu nhà máy chiết xuất công nghiệp",
              desc: `Các doanh nghiệp lớn như ${PARTNER_COMPANY.name} sở hữu nhà máy GMP-WHO khổng lồ, luôn cần nguồn cung nguyên liệu cực lớn và liên tục để vận hành máy móc sấy chiết, đảm bảo sức mua bền vững.`,
            },
            {
              title: "Phân loại chất lượng và bảng giá cụ thể",
              desc: "Bảng giá phải phân chia rõ ràng theo kích thước củ, bộ phận già trẻ và độ ẩm sấy khô. Mọi quy chuẩn kiểm định hóa nghiệm dược tính phải minh bạch và thống nhất tại phòng lab.",
            },
            {
              title: "Đồng hành chuyển giao kỹ thuật trồng",
              desc: "Họ sẵn sàng cử kỹ sư nông nghiệp giàu kinh nghiệm về tận vườn, hỗ trợ hướng dẫn bà con phòng trừ sâu bệnh bằng vi sinh hữu cơ để sản phẩm đầu ra đạt yêu cầu kiểm tra dư lượng.",
            },
          ].map((item, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="w-10 h-10 shrink-0 rounded-full bg-[#B85037]/10 text-[#B85037] flex items-center justify-center font-bold">
                {idx + 1}
              </div>
              <div className="space-y-1">
                <h4 className="font-sans font-bold text-base text-[#4F433A]">{item.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Knowledge Posts (large cards) */}
      <section id="homepage-articles" className="space-y-6">
        <div className="flex flex-col sm:flex-row items-baseline justify-between gap-2 border-b border-[#F0EAE1] pb-4">
          <div>
            <span className="text-[#B85037] text-xs font-bold uppercase tracking-wider block mb-1">Kiến thức quý báu</span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#4F433A] tracking-tight">
              Kiến thức canh tác nổi bật từ Nguyễn Việt Lộc
            </h2>
          </div>
          <button
            onClick={() => navigate(paths.knowledge())}
            className="text-[#B85037] hover:text-[#9F3E28] text-sm font-bold inline-flex items-center gap-1 hover:underline cursor-pointer"
          >
            Đọc toàn bộ cẩm nang nông nghiệp <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {WIKI_ARTICLES.slice(0, 2).map((art) => (
            <ArticleCard
              key={art.id}
              title={art.title}
              category={art.category}
              excerpt={art.excerpt}
              image={art.image}
              readTime={art.readTime}
              author={art.author}
              date={art.date}
              onClick={() => navigate(paths.article(art.id))}
            />
          ))}
        </div>
      </section>

      {/* Full-width CTA Banner */}
      <CtaBanner
        title="Có thảo dược chín muồi cần đầu ra bao tiêu?"
        description={`Liên hệ ngay phòng thu mua nguyên liệu của tập đoàn ${PARTNER_COMPANY.name} để gửi đăng ký thông số lô hàng nông sản và nhận báo giá sàn bảo lãnh tốt nhất khu vực.`}
        buttonText="Gửi thông tin lô hàng ngay"
        onClick={() => open()}
      />

      {/* Latest posts feed */}
      <section id="latest-posts" className="space-y-4">
        <h3 className="font-serif text-xl font-bold text-[#4F433A] border-b border-[#F0EAE1] pb-2">Báo cáo thực địa & Tin tức mới</h3>
        <div className="divide-y divide-gray-150 bg-white border border-[#E6DDD0] rounded-xl p-5 shadow-2xs">
          <div className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <div>
              <span className="text-xs text-[#B85037] font-semibold uppercase tracking-wider">Cập nhật 02/07/2026</span>
              <h5 className="font-sans font-bold text-base text-[#4F433A] hover:text-[#B85037] transition-colors cursor-pointer mt-1" onClick={() => navigate(paths.herb("ba-kich"))}>
                Khảo sát vùng trồng Ba kích tím tại huyện Ba Chẽ, Quảng Ninh: Hàm lượng hoạt chất anthraglycosid tăng mạnh nhờ mùa mưa sớm.
              </h5>
            </div>
            <span className="text-xs text-gray-400 font-mono shrink-0">Nguyễn Việt Lộc</span>
          </div>
          <div className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <div>
              <span className="text-xs text-[#D08620] font-semibold uppercase tracking-wider">Thị trường</span>
              <h5 className="font-sans font-bold text-base text-[#4F433A] hover:text-[#B85037] transition-colors cursor-pointer mt-1" onClick={() => navigate(paths.herb("dinh-lang"))}>
                Nhà máy trung tâm {PARTNER_COMPANY.name} nâng 10% công suất thu mua rễ củ Đinh lăng sấy đạt ẩm &lt;11% phục vụ đơn hàng dược phẩm xuất khẩu.
              </h5>
            </div>
            <span className="text-xs text-gray-400 font-mono shrink-0">Phòng phân tích thị trường</span>
          </div>
          <div className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <div>
              <span className="text-xs text-green-600 font-semibold uppercase tracking-wider">Cảnh báo</span>
              <h5 className="font-sans font-bold text-base text-[#4F433A] hover:text-[#B85037] transition-colors cursor-pointer mt-1" onClick={() => navigate(paths.article("phan-biet-cay-duoc-lieu-gia"))}>
                Phát hiện nhiều lô giống Cà gai leo dại giả mạo đạt nồng độ hoạt chất gần bằng không bán trôi nổi trên mạng xã hội tại Nghệ An.
              </h5>
            </div>
            <span className="text-xs text-gray-400 font-mono shrink-0">Ban nông nghiệp HTX</span>
          </div>
        </div>
      </section>
    </div>
  );
};
