import React from "react";
import { AlertTriangle, ArrowRight, User } from "lucide-react";
import { Link } from "react-router-dom";
import { WIKI_ARTICLES } from "../lib/data";
import { Breadcrumb, DataTable, StickyToc } from "../components/ui";
import { paths } from "../lib/paths";
import { Seo, articleSeo } from "../lib/seo";
import { NotFoundPage } from "./NotFoundPage";

// Cho phép nhúng link nội bộ/ngoài ngay trong đoạn văn JSON bằng cú pháp markdown [nhãn](đường-dẫn).
// Link nội bộ ("/...") render bằng <Link> của react-router → là thẻ <a href> thật, crawl được
// và tự gắn basename khi deploy GitHub Pages; link ngoài (http) mở tab mới an toàn.
const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;
const linkClass =
  "text-terracotta font-semibold underline decoration-terracotta/40 underline-offset-2 hover:decoration-terracotta";

function renderRich(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  LINK_RE.lastIndex = 0;
  while ((m = LINK_RE.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const [, label, href] = m;
    parts.push(
      href.startsWith("/") ? (
        <Link key={m.index} to={href} className={linkClass}>
          {label}
        </Link>
      ) : (
        <a key={m.index} href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {label}
        </a>
      ),
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length ? parts : text;
}

export const WikiArticlePage: React.FC<{ articleId: string }> = ({ articleId }) => {
  const article = WIKI_ARTICLES.find((a) => a.id === articleId);
  if (!article) return <NotFoundPage />;

  const sections = article.contentSections.map((sec, idx) => ({
    id: `art-sec-${idx}`,
    label: sec.heading.length > 35 ? sec.heading.slice(0, 35) + "…" : sec.heading,
  }));

  // Scroll-spy: mục lục sáng theo section đang xem — section cuối cùng có mép trên đã vượt mốc ~120px.
  const [activeId, setActiveId] = React.useState("art-sec-0");
  React.useEffect(() => {
    const ids = article.contentSections.map((_, idx) => `art-sec-${idx}`);
    const onScroll = () => {
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [article.id]);

  return (
    <div className="space-y-10 animate-fade-in">
      <Seo {...articleSeo(article)} />
      <Breadcrumb items={[
        { label: "Trang chủ", href: paths.home() },
        { label: "Kiến thức", href: paths.knowledge() },
        { label: article.title },
      ]} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-paper via-paper-2 to-line border border-line rounded-2xl p-6 md:p-10 space-y-4">
        <div className="flex items-center gap-2">
          <span className="bg-terracotta text-white text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wider">
            {article.category}
          </span>
          <span className="text-xs text-gray-500 font-sans">{article.date} • {article.readTime}</span>
        </div>
        <h1 className="font-serif text-2xl md:text-4xl font-extrabold text-ink-soft leading-tight tracking-tight">
          {article.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-ink-soft font-sans border-t border-line pt-4">
          <User className="w-4.5 h-4.5 text-terracotta" />
          <span>Tác giả bài viết: <strong className="text-terracotta">{article.author}</strong></span>
        </div>
      </section>

      {/* Article Body */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="hidden lg:block lg:col-span-1">
          <StickyToc
            items={sections}
            activeId={activeId}
            onSelect={(id) => {
              setActiveId(id);
              const el = document.getElementById(id);
              if (el) {
                const y = el.getBoundingClientRect().top + window.scrollY - 100;
                window.scrollTo({ top: y, behavior: "smooth" });
              }
            }}
          />
        </div>

        <div className="lg:col-span-3 space-y-8 text-base text-ink leading-relaxed font-sans">
          <p className="text-lg text-gray-700 italic font-sans leading-relaxed border-l-4 border-earth pl-4">
            {article.excerpt}
          </p>

          {article.contentSections.map((sec, idx) => (
            <div key={idx} id={`art-sec-${idx}`} className="space-y-4 pt-4 first:pt-0">
              <h2 className="font-serif text-xl md:text-2xl font-bold text-ink-soft border-b border-line pb-2">
                {sec.heading}
              </h2>
              {sec.paragraphs.map((p, pIdx) => (
                <p key={pIdx}>{renderRich(p)}</p>
              ))}
              {sec.highlight && (
                <div className="bg-paper-2 p-4 rounded-xl border border-terracotta/20 border-l-4 border-l-terracotta text-ink-soft font-sans font-semibold italic text-sm">
                  {sec.highlight}
                </div>
              )}
            </div>
          ))}

          {article.standardsTable && (
            <div className="space-y-4 pt-4">
              <h2 className="font-serif text-lg font-bold text-ink-soft">
                {article.standardsTableTitle ?? "Bảng tra cứu tiêu chuẩn tiêu biểu"}
              </h2>
              <DataTable
                headers={article.standardsTableHeaders ?? ["Nhóm", "Tiêu chuẩn", "Ghi chú"]}
                rows={article.standardsTable.map((s) => [
                  <strong className="text-ink-soft font-sans">{s.factor}</strong>,
                  s.standard,
                  <span className="text-sm text-gray-600">{s.notes}</span>,
                ])}
              />
            </div>
          )}

          {/* Common Mistakes callout — chỉ hiện khi bài có dữ liệu pitfall riêng */}
          {article.pitfall && (
            <div className="bg-sand border border-terracotta/30 rounded-xl p-5 my-6 space-y-2">
              <h2 className="font-sans font-bold text-base text-terracotta flex items-center gap-1.5">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                {article.pitfall.title ?? "Sai lầm phổ biến bà con nông dân cần tuyệt đối tránh:"}
              </h2>
              <p className="text-sm text-gray-700">{article.pitfall.body}</p>
            </div>
          )}

          {/* Related articles */}
          <section className="space-y-4 pt-8 border-t border-line">
            <h2 className="font-serif text-xl font-bold text-ink-soft">Các chuyên mục tin cậy độc giả nông học đón đọc nhiều nhất</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {WIKI_ARTICLES.filter((a) => a.id !== article.id).slice(0, 2).map((art) => (
                <Link
                  key={art.id}
                  to={paths.article(art.id)}
                  className="border border-line hover:border-terracotta p-5 rounded-xl cursor-pointer bg-white hover:bg-paper-2 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] bg-sand border border-line text-earth px-2 py-0.5 rounded uppercase font-bold tracking-wider">{art.category}</span>
                    <h3 className="font-serif text-base font-bold text-ink-soft group-hover:text-terracotta transition-colors line-clamp-2">{art.title}</h3>
                  </div>
                  <span className="text-xs text-terracotta font-semibold flex items-center gap-1 mt-3">Đọc cẩm nang này <ArrowRight className="w-3.5 h-3.5" /></span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
