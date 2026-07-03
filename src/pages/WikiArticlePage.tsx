import React from "react";
import { AlertTriangle, ArrowRight, User } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { WIKI_ARTICLES } from "../lib/data";
import { Breadcrumb, DataTable, StickyToc } from "../components/ui";
import { paths } from "../lib/paths";
import { Seo, articleSeo } from "../lib/seo";

export const WikiArticlePage: React.FC = () => {
  const { topic = "" } = useParams();
  const navigate = useNavigate();

  const article = WIKI_ARTICLES.find((a) => a.id === topic) || WIKI_ARTICLES[0];

  const sections = article.contentSections.map((sec, idx) => ({
    id: `art-sec-${idx}`,
    label: sec.heading.substring(0, 35) + "...",
  }));

  return (
    <div className="space-y-10 animate-fade-in">
      <Seo {...articleSeo(article)} />
      <Breadcrumb items={[
        { label: "Trang chủ", onClick: () => navigate(paths.home()) },
        { label: "Kiến thức", onClick: () => navigate(paths.knowledge()) },
        { label: article.title },
      ]} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#FDFBF9] via-[#FAF6F0] to-[#EFE6DA] border border-[#E6DDD0] rounded-2xl p-6 md:p-10 space-y-4">
        <div className="flex items-center gap-2">
          <span className="bg-[#B85037] text-white text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wider">
            {article.category}
          </span>
          <span className="text-xs text-gray-500 font-sans">{article.date} • {article.readTime}</span>
        </div>
        <h1 className="font-serif text-2xl md:text-4xl font-extrabold text-[#4F433A] leading-tight tracking-tight">
          {article.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-[#4F433A] font-sans border-t border-[#E6DDD0] pt-4">
          <User className="w-4.5 h-4.5 text-[#B85037]" />
          <span>Tác giả bài viết: <strong className="text-[#B85037]">{article.author}</strong></span>
        </div>
      </section>

      {/* Article Body */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="hidden lg:block lg:col-span-1">
          <StickyToc
            items={sections}
            activeId="art-sec-0"
            onSelect={(id) => {
              const el = document.getElementById(id);
              if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
            }}
          />
        </div>

        <div className="lg:col-span-3 space-y-8 text-base text-[#2D2521] leading-relaxed font-sans">
          <p className="text-lg text-gray-700 italic font-sans leading-relaxed border-l-4 border-[#D08620] pl-4">
            {article.excerpt}
          </p>

          {article.contentSections.map((sec, idx) => (
            <div key={idx} id={`art-sec-${idx}`} className="space-y-4 pt-4 first:pt-0">
              <h3 className="font-serif text-xl md:text-2xl font-bold text-[#4F433A] border-b border-[#F0EAE1] pb-2">
                {sec.heading}
              </h3>
              {sec.paragraphs.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
              {sec.highlight && (
                <div className="bg-[#FAF6F0] p-4 rounded-xl border border-[#B85037]/20 border-l-4 border-l-[#B85037] text-[#4F433A] font-sans font-semibold italic text-sm">
                  {sec.highlight}
                </div>
              )}
            </div>
          ))}

          {article.standardsTable && (
            <div className="space-y-4 pt-4">
              <h4 className="font-serif text-lg font-bold text-[#4F433A]">Quy chuẩn phân tích sấy ráo mẫu tiêu biểu</h4>
              <DataTable
                headers={["Nhóm dược thảo tuyển mẫu", "Quy cách độ ẩm chuẩn hóa lý", "Gợi ý khuyên dùng bảo quản"]}
                rows={article.standardsTable.map((s) => [
                  <strong className="text-[#4F433A] font-sans">{s.factor}</strong>,
                  s.standard,
                  <span className="text-sm text-gray-600">{s.notes}</span>,
                ])}
              />
            </div>
          )}

          {/* Common Mistakes callout */}
          <div className="bg-[#FDF4F2] border border-[#B85037]/30 rounded-xl p-5 my-6 space-y-2">
            <h5 className="font-sans font-bold text-base text-[#B85037] flex items-center gap-1.5">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              Sai lầm phổ biến bà con nông dân cần tuyệt đối tránh:
            </h5>
            <p className="text-sm text-gray-700">
              Ủ bạt sấy kín khí! Khi thu hái xong chưa có xe tải bốc đi, bà con dồn đống phủ bạt kín để ráo nắng. Chỉ sau 4h, lượng nhiệt ủ nội sinh sẽ làm thâm đen ruột củ sâm Đinh lăng, thối hỏng Ba kích, biến toàn bộ thành hàng phế phẩm bị nhà máy từ chối nhận mua ngay tại cổng.
            </p>
          </div>

          {/* Related articles */}
          <section className="space-y-4 pt-8 border-t border-[#F0EAE1]">
            <h4 className="font-serif text-xl font-bold text-[#4F433A]">Các chuyên mục tin cậy độc giả nông học đón đọc nhiều nhất</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {WIKI_ARTICLES.filter((a) => a.id !== article.id).slice(0, 2).map((art) => (
                <div
                  key={art.id}
                  onClick={() => navigate(paths.article(art.id))}
                  className="border border-[#E6DDD0] hover:border-[#B85037] p-5 rounded-xl cursor-pointer bg-white hover:bg-[#FAF8F4] transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] bg-[#FAF2E8] border border-[#E6DDD0] text-[#D08620] px-2 py-0.5 rounded uppercase font-bold tracking-wider">{art.category}</span>
                    <h5 className="font-serif text-base font-bold text-[#4F433A] group-hover:text-[#B85037] transition-colors line-clamp-2">{art.title}</h5>
                  </div>
                  <span className="text-xs text-[#B85037] font-semibold flex items-center gap-1 mt-3">Đọc cẩm nang này <ArrowRight className="w-3.5 h-3.5" /></span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
