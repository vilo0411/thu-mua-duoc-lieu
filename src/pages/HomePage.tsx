import React from "react";
import { ChevronRight, Sprout, Coins, Compass } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { HERBS_DATA, REGIONS_DATA, PARTNER_COMPANY, SITE_OWNER, WIKI_ARTICLES, FEATURED_PARTNER, buildLandingUrl } from "../lib/data";
import { ArticleCard, CtaBanner, HerbCard, HomeHero, MissionStory, PillarDoorCard } from "../components/ui";
import { paths } from "../lib/paths";
import { Seo, homeSeo } from "../lib/seo";

// Ảnh nền cho hero & band sứ mệnh — biến thể phân giải cao của herb.image (Unsplash).
const HERO_IMAGE = "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=1600&auto=format&fit=crop";
const MISSION_IMAGE = "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=1200&auto=format&fit=crop";

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

      {/* 1. Hero full-bleed — ảnh + luận điểm thương hiệu + dải số liệu */}
      <HomeHero
        ownerName={SITE_OWNER}
        imageUrl={HERO_IMAGE}
        stats={stats}
        onSeePrices={() => navigate(paths.pillar())}
        onLearn={() => navigate(paths.knowledge())}
      />

      {/* 2. "Hai lối vào" — bộ định tuyến 2 silo, chữ ký định tuyến của trang chủ */}
      <section id="homepage-doors" className="mt-14 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-terracotta font-mono text-xs font-bold uppercase tracking-[0.15em]">// Bạn muốn bắt đầu từ đâu?</span>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-ink-soft tracking-tight">
            Chọn lối vào phù hợp với bạn
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>
      </section>

      {/* 3. Band câu chuyện / sứ mệnh — điểm nhớ chính (signature) */}
      <MissionStory
        imageUrl={MISSION_IMAGE}
        partnerName={PARTNER_COMPANY.name}
        onReadStory={() => navigate(paths.about())}
      />

      {/* 4. Featured Herbs Grid */}
      <section id="homepage-featured-herbs" className="mt-16 space-y-6">
        <div className="flex flex-col sm:flex-row items-baseline justify-between gap-2 border-b border-line pb-4">
          <div>
            <span className="text-terracotta font-mono text-xs font-bold uppercase tracking-[0.15em] block mb-1">// Cây thuốc thế mạnh</span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-ink-soft tracking-tight">
              Danh mục thảo dược thu mua chính
            </h2>
          </div>
          <button
            onClick={() => navigate(paths.pillar())}
            className="text-terracotta hover:text-terracotta-dark text-sm font-bold inline-flex items-center gap-1 hover:underline cursor-pointer"
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

      {/* 5. Featured Knowledge Posts — nội dung độc quyền silo Kiến thức */}
      <section id="homepage-articles" className="mt-16 space-y-6">
        <div className="flex flex-col sm:flex-row items-baseline justify-between gap-2 border-b border-line pb-4">
          <div>
            <span className="text-terracotta font-mono text-xs font-bold uppercase tracking-[0.15em] block mb-1">// Kiến thức quý báu</span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-ink-soft tracking-tight">
              Kiến thức canh tác nổi bật từ {SITE_OWNER}
            </h2>
          </div>
          <button
            onClick={() => navigate(paths.knowledge())}
            className="text-terracotta hover:text-terracotta-dark text-sm font-bold inline-flex items-center gap-1 hover:underline cursor-pointer"
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

      {/* 6. Về tác giả — E-E-A-T byline */}
      <section id="homepage-author" className="mt-16 bg-paper-2 border border-line rounded-2xl p-7 md:p-10 flex flex-col sm:flex-row items-start gap-6">
        <div className="w-20 h-20 shrink-0 rounded-full bg-terracotta text-white font-serif font-bold text-2xl flex items-center justify-center shadow-sm">
          {SITE_OWNER.split(" ").map((w) => w[0]).join("").slice(-3)}
        </div>
        <div className="space-y-3">
          <div>
            <span className="text-terracotta font-mono text-xs font-bold uppercase tracking-[0.15em] block mb-1">// Người đứng sau trang này</span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-ink-soft tracking-tight">{SITE_OWNER}</h2>
          </div>
          <p className="text-gray-600 text-sm md:text-base font-sans leading-relaxed max-w-2xl">
            Tôi là người trực tiếp đi khảo sát vùng trồng, nhà máy sấy chiết và theo sát giá thu mua. Trang này là blog cá nhân <strong className="text-ink-soft">độc lập</strong> — chia sẻ thẳng thắn kinh nghiệm thực địa, không tô hồng, để bà con và hợp tác xã tự tin bán đúng giá trị.
          </p>
          <button
            onClick={() => navigate(paths.about())}
            className="inline-flex items-center gap-1.5 font-sans font-bold text-sm text-terracotta hover:text-terracotta-dark hover:underline cursor-pointer"
          >
            <Compass className="w-4 h-4" /> Tìm hiểu về tôi
          </button>
        </div>
      </section>

      {/* 7. CTA cuối — mời kết nối đầu mối bao tiêu (outbound + UTM) */}
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
