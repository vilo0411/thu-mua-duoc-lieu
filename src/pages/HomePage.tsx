import React from "react";
import { ChevronRight, Leaf, Sprout, Coins, Compass } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { HERBS_DATA, REGIONS_DATA, PARTNER_COMPANY, SITE_OWNER, WIKI_ARTICLES, FEATURED_PARTNER, buildLandingUrl } from "../lib/data";
import { ArticleCard, CtaBanner, HerbCard, PillarDoorCard } from "../components/ui";
import { paths } from "../lib/paths";
import { Seo, homeSeo } from "../lib/seo";

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // Dải số liệu tin cậy ở hero — suy từ dữ liệu thật, không hardcode.
  const stats = [
    { value: `${HERBS_DATA.length}+`, label: "cây dược liệu" },
    { value: `${REGIONS_DATA.length}`, label: "vùng trồng trọng điểm" },
    { value: `${WIKI_ARTICLES.length}+`, label: "bài kỹ thuật thực địa" },
  ];

  return (
    <div className="animate-fade-in">
      <Seo {...homeSeo()} />
      {/* Hero — luận điểm thương hiệu + dải số liệu (KHÔNG lặp công cụ giá của Thu mua) */}
      <section id="homepage-hero" className="relative bg-gradient-to-br from-[#FDFBF9] via-[#FBF7F0] to-[#F5ECE1] border border-[#E6DDD0] overflow-hidden rounded-2xl p-6 md:p-12 lg:py-16">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#B85037]/5 rounded-full -mr-32 -mt-32 pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-80 h-80 bg-[#D08620]/5 rounded-full -ml-32 -mb-32 pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5ECE1] border border-[#E6DDD0] text-[#B85037]">
            <Leaf className="w-4 h-4 shrink-0 animate-pulse" />
            <span className="font-sans font-semibold text-xs tracking-wider uppercase">Blog cá nhân độc lập của {SITE_OWNER}</span>
          </div>

          <h1 className="font-serif text-3xl md:text-5xl font-extrabold text-[#4F433A] leading-tight tracking-tight">
            Trồng Dược Liệu Đúng Kỹ Thuật,<br />
            <span className="text-[#B85037]">Bán Được Giá</span> Xứng Đáng
          </h1>

          <p className="text-[#2D2521] text-lg font-sans leading-relaxed max-w-2xl">
            Nơi tôi chia sẻ kinh nghiệm canh tác chuẩn GACP-WHO và theo sát giá thu mua thực tế — để bà con không còn cảnh "được mùa mất giá".
          </p>
        </div>

        {/* Dải số liệu tin cậy */}
        <div className="relative z-10 mt-8 flex flex-wrap gap-x-10 gap-y-4">
          {stats.map((s) => (
            <div key={s.label} className="flex items-baseline gap-2">
              <span className="font-serif font-extrabold text-3xl md:text-4xl text-[#B85037] tracking-tight">{s.value}</span>
              <span className="font-sans text-sm text-[#4F433A] max-w-24 leading-tight">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* "Hai lối vào" — bộ định tuyến 2 silo, chữ ký riêng của trang chủ */}
      <section id="homepage-doors" className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
        <PillarDoorCard
          icon={Sprout}
          tone="green"
          eyebrow="Silo kiến thức"
          title="Học kỹ thuật trồng"
          desc="Cẩm nang chọn giống, chăm sóc, phòng sâu bệnh và sơ chế sấy đạt chuẩn GACP-WHO."
          ctaLabel="Vào thư viện kiến thức"
          onClick={() => navigate(paths.knowledge())}
        />
        <PillarDoorCard
          icon={Coins}
          tone="terracotta"
          eyebrow="Silo thu mua"
          title="Xem giá & bán dược liệu"
          desc="Tra bảng giá theo cây và vùng trồng, so sánh, kết nối đầu mối bao tiêu uy tín."
          ctaLabel="Xem bảng giá thu mua"
          onClick={() => navigate(paths.pillar())}
        />
      </section>

      {/* Featured Herbs Grid (6-8 cards) */}
      <section id="homepage-featured-herbs" className="mt-16 space-y-6">
        <div className="flex flex-col sm:flex-row items-baseline justify-between gap-2 border-b border-[#F0EAE1] pb-4">
          <div>
            <span className="text-[#B85037] text-xs font-bold uppercase tracking-wider block mb-1">Cây thuốc thế mạnh</span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#4F433A] tracking-tight">
              Danh mục thảo dược thu mua chính
            </h2>
          </div>
          <button
            onClick={() => navigate(paths.pillar())}
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

      {/* Featured Knowledge Posts (large cards) — nội dung độc quyền silo Kiến thức */}
      <section id="homepage-articles" className="mt-16 space-y-6">
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

      {/* Về tác giả — E-E-A-T, texture editorial riêng của trang chủ */}
      <section id="homepage-author" className="mt-16 bg-[#FAF8F5] border border-[#E6DDD0] rounded-2xl p-7 md:p-10 flex flex-col sm:flex-row items-start gap-6">
        <div className="w-20 h-20 shrink-0 rounded-full bg-[#B85037] text-white font-serif font-bold text-2xl flex items-center justify-center shadow-sm">
          {SITE_OWNER.split(" ").map((w) => w[0]).join("").slice(-3)}
        </div>
        <div className="space-y-3">
          <div>
            <span className="text-[#B85037] text-xs font-bold uppercase tracking-wider block mb-1">Người đứng sau trang này</span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#4F433A] tracking-tight">{SITE_OWNER}</h2>
          </div>
          <p className="text-gray-600 text-sm md:text-base font-sans leading-relaxed max-w-2xl">
            Tôi là người trực tiếp đi khảo sát vùng trồng, nhà máy sấy chiết và theo sát giá thu mua. Trang này là blog cá nhân <strong className="text-[#4F433A]">độc lập</strong> — chia sẻ thẳng thắn kinh nghiệm thực địa, không tô hồng, để bà con và hợp tác xã tự tin bán đúng giá trị.
          </p>
          <button
            onClick={() => navigate(paths.about())}
            className="inline-flex items-center gap-1.5 font-sans font-bold text-sm text-[#B85037] hover:text-[#9F3E28] hover:underline cursor-pointer"
          >
            <Compass className="w-4 h-4" /> Tìm hiểu về tôi
          </button>
        </div>
      </section>

      {/* Latest posts feed */}
      <section id="latest-posts" className="mt-16 space-y-4">
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

      {/* CTA cuối — mời khám phá, không lặp copy "đăng ký thu mua" của trang Thu mua */}
      <div className="mt-16">
        <CtaBanner
          title="Sẵn sàng bán dược liệu đúng giá?"
          description={`Khi cây vào vụ, kết nối trực tiếp phòng thu mua của ${PARTNER_COMPANY.name} để nhận báo giá bao tiêu cho lô hàng của bạn.`}
          buttonText="Kết nối đầu mối bao tiêu"
          href={buildLandingUrl(FEATURED_PARTNER, { pageType: "home", ctaPosition: "footer" })}
        />
      </div>
    </div>
  );
};
