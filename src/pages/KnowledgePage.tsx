import React from "react";
import { useNavigate } from "react-router-dom";
import { Sprout, ArrowRight } from "lucide-react";
import { WIKI_ARTICLES, WIKI_HUBS, getHerbBySlug, PARTNER_COMPANY, FEATURED_PARTNER, buildLandingUrl } from "../lib/data";
import { ArticleCard, Breadcrumb, CtaBanner } from "../components/ui";
import { paths } from "../lib/paths";
import { Seo, knowledgeSeo } from "../lib/seo";

export const KnowledgePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-fade-in">
      <Seo {...knowledgeSeo()} />
      <Breadcrumb items={[{ label: "Trang chủ", onClick: () => navigate(paths.home()) }, { label: "Kiến thức" }]} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#F5ECE1] to-[#FDFBF9] border border-[#E6DDD0] rounded-2xl p-6 md:p-10 space-y-3">
        <span className="text-[#B85037] text-xs font-bold uppercase tracking-wider block">Cẩm nang nông học</span>
        <h1 className="font-serif text-2xl md:text-4xl font-extrabold text-[#4F433A] tracking-tight">
          Kiến Thức Canh Tác &amp; Chế Biến Dược Liệu
        </h1>
        <p className="text-gray-700 text-base md:text-lg max-w-3xl font-sans leading-relaxed">
          Tổng hợp các bài viết chuyên sâu do <strong className="text-[#B85037]">Nguyễn Việt Lộc</strong> biên soạn độc lập: kỹ thuật gieo trồng đạt chuẩn GACP-WHO, phân biệt giống thật giả, xử lý sâu bệnh hữu cơ và công nghệ sấy sau thu hoạch.
        </p>
      </section>

      {/* Hub kỹ thuật theo từng cây */}
      {WIKI_HUBS.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-baseline justify-between border-b border-[#F0EAE1] pb-4">
            <h2 className="font-serif text-2xl font-bold text-[#4F433A]">Cẩm nang kỹ thuật theo cây</h2>
            <span className="text-sm text-gray-500">{WIKI_HUBS.length} cây</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {WIKI_HUBS.map((hub) => {
              const herb = getHerbBySlug(hub.herbSlug);
              return (
                <div
                  key={hub.id}
                  onClick={() => navigate(paths.hubWiki(hub.herbSlug))}
                  className="bg-white rounded-xl overflow-hidden border border-[#E6DDD0] hover:border-[#B85037] shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col sm:flex-row h-full"
                >
                  <div className="sm:w-2/5 aspect-video sm:aspect-auto bg-gray-100 overflow-hidden relative">
                    <img
                      src={herb?.image}
                      alt={hub.herbName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-[#4F7942] text-white text-xs font-bold px-2 py-1 rounded-sm uppercase tracking-wider flex items-center gap-1">
                      <Sprout className="w-3.5 h-3.5" />
                      Kỹ thuật trồng
                    </div>
                  </div>
                  <div className="p-5 sm:w-3/5 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <h4 className="font-serif text-lg md:text-xl font-bold text-[#4F433A] group-hover:text-[#B85037] transition-colors leading-snug">
                        {hub.title}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{hub.intro}</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#B85037] pt-1">
                      Xem cẩm nang {hub.herbName}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Article list */}
      <section className="space-y-6">
        <div className="flex items-baseline justify-between border-b border-[#F0EAE1] pb-4">
          <h2 className="font-serif text-2xl font-bold text-[#4F433A]">Tất cả bài viết</h2>
          <span className="text-sm text-gray-500">{WIKI_ARTICLES.length} bài viết</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {WIKI_ARTICLES.map((art) => (
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

      <CtaBanner
        title="Cần tư vấn kỹ thuật trồng cho vùng nguyên liệu của bạn?"
        description={`Gửi thông tin để đội ngũ kỹ sư nông nghiệp của ${PARTNER_COMPANY.name} đồng hành khảo sát thực địa và chuyển giao quy trình canh tác đạt chuẩn.`}
        buttonText="Gửi yêu cầu tư vấn"
        href={buildLandingUrl(FEATURED_PARTNER, { pageType: "knowledge", ctaPosition: "footer" })}
      />
    </div>
  );
};
