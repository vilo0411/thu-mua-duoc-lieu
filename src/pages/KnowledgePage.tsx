import React from "react";
import { useNavigate } from "react-router-dom";
import { WIKI_ARTICLES } from "../lib/data";
import { ArticleCard, Breadcrumb, CtaBanner } from "../components/ui";
import { useShipmentModal } from "../lib/ShipmentModalContext";
import { paths } from "../lib/paths";
import { Seo, knowledgeSeo } from "../lib/seo";

export const KnowledgePage: React.FC = () => {
  const navigate = useNavigate();
  const { open } = useShipmentModal();

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
        description="Gửi thông tin để đội ngũ kỹ sư nông nghiệp của VIETMEC đồng hành khảo sát thực địa và chuyển giao quy trình canh tác đạt chuẩn."
        buttonText="Gửi yêu cầu tư vấn"
        onClick={() => open("Dược liệu nông sản")}
      />
    </div>
  );
};
