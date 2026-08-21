import React from "react";
import { AlertTriangle, ArrowRight, User } from "lucide-react";
import { Link } from "react-router-dom";
import { WIKI_ARTICLES } from "../lib/data";
import { Breadcrumb, DataTable, FaqAccordion, SourceList, StickyToc } from "../components/ui";
import { WikiInteractiveSection } from "../components/wiki/WikiInteractiveSection";
import { paths } from "../lib/paths";
import { lastModified, formatVnDate } from "../lib/data/lastmod";
import { Seo, articleSeo, articleSectionId, toIsoDate } from "../lib/seo";
import { NotFoundPage } from "./NotFoundPage";
import { renderRich } from "../lib/renderRich";

export const WikiArticlePage: React.FC<{ articleId: string }> = ({ articleId }) => {
  const article = WIKI_ARTICLES.find((a) => a.id === articleId);
  if (!article) return <NotFoundPage />;

  const hasFaq = (article.faq?.length ?? 0) > 0;
  // Ngày cập nhật phải hiện trên trang: Google đòi ngày trong schema khớp ngày người đọc thấy.
  // Giữ cả hai dạng — ISO cho <time dateTime> (máy), chuỗi Việt cho mắt người.
  const updatedIso = lastModified("wiki", article.id);
  const updated = formatVnDate(updatedIso);
  const publishedIso = toIsoDate(article.date);
  // Id neo mang nghĩa (slug hoá heading) thay vì art-sec-0: chèn thêm section không
  // làm gãy link cũ, và JSON-LD `HowToStep.url` trỏ được vào đúng mục.
  const sections = [
    ...article.contentSections.map((sec, idx) => ({
      id: articleSectionId(sec.heading, idx),
      label: sec.heading.length > 35 ? sec.heading.slice(0, 35) + "…" : sec.heading,
    })),
    ...(hasFaq ? [{ id: "art-faq", label: "Câu hỏi thường gặp" }] : []),
  ];

  // Scroll-spy: mục lục sáng theo section đang xem — section cuối cùng có mép trên đã vượt mốc ~120px.
  const [activeId, setActiveId] = React.useState(sections[0]?.id ?? "");
  React.useEffect(() => {
    const ids = sections.map((s) => s.id);
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
    // <article> bọc toàn bài: đây là ranh giới "nội dung chính" mà công cụ tìm kiếm và
    // trình trích dẫn AI dựa vào để tách bài khỏi khung site. Trước đây chỉ có <div>.
    <article className="space-y-10 animate-fade-in">
      <Seo {...articleSeo(article)} />
      <Breadcrumb items={[
        { label: "Trang chủ", href: paths.home() },
        { label: "Kiến thức", href: paths.knowledge() },
        { label: article.title },
      ]} />

      {/* Hero = <header> của bài, không phải một <section> ngang hàng các mục nội dung */}
      <header className="relative bg-gradient-to-br from-paper via-paper-2 to-line border border-line rounded-2xl p-6 md:p-10 space-y-4">
        <div className="flex items-center gap-2">
          <span className="bg-terracotta text-white text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wider">
            {article.category}
          </span>
          <span className="text-xs text-gray-500 font-sans">
            {/* <time dateTime> lấy ISO từ cùng hàm mà JSON-LD dùng, nên ngày người đọc
                thấy và ngày trong schema không thể lệch nhau. Không parse được thì bỏ
                hẳn thẻ <time> — dateTime sai định dạng là lỗi W3C. */}
            {publishedIso ? <time dateTime={publishedIso}>{article.date}</time> : article.date}
            {" • "}
            {article.readTime}
            {updated && (
              <> • Cập nhật: <time dateTime={updatedIso}>{updated}</time></>
            )}
          </span>
        </div>
        <h1 className="font-serif text-2xl md:text-4xl font-extrabold text-ink-soft leading-tight tracking-tight">
          {article.title}
        </h1>
        <div className="flex items-center gap-3 text-sm text-ink-soft font-sans border-t border-line pt-4">
          <User className="w-4.5 h-4.5 text-terracotta" aria-hidden="true" />
          <span>
            Tác giả bài viết:{" "}
            <Link to={paths.about()} rel="author" className="font-bold text-terracotta hover:underline">
              {article.author}
            </Link>
          </span>
        </div>
      </header>

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
          {/* .seo-answer: đánh dấu đoạn trả lời trực tiếp câu hỏi chính của trang (dùng cho biên tập). */}
          <p className="seo-answer text-lg text-gray-700 italic font-sans leading-relaxed border-l-4 border-earth pl-4">
            {article.excerpt}
          </p>

<WikiInteractiveSection article={article} />

          {/* Mỗi mục là một <section> có tên (aria-labelledby trỏ vào chính h2 của nó).
              Id ngoài cùng GIỮ NGUYÊN `articleSectionId` vì StickyToc scroll-spy và
              `HowToStep.url` trong JSON-LD đều trỏ vào đó. */}
          {article.contentSections.map((sec, idx) => {
            const secId = articleSectionId(sec.heading, idx);
            return (
              <section key={idx} id={secId} aria-labelledby={`${secId}-h`} className="space-y-4 pt-4 first:pt-0 scroll-mt-24">
                <h2 id={`${secId}-h`} className="font-serif text-xl md:text-2xl font-bold text-ink-soft border-b border-line pb-2">
                  {sec.heading}
                </h2>
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{renderRich(p)}</p>
                ))}
                {/* <aside>: ý phụ làm nổi bật bên lề mạch chính, không phải một đoạn thân bài. */}
                {sec.highlight && (
                  <aside className="bg-paper-2 p-4 rounded-xl border border-terracotta/20 border-l-4 border-l-terracotta text-ink-soft font-sans font-semibold italic text-sm">
                    {renderRich(sec.highlight)}
                  </aside>
                )}
              </section>
            );
          })}

          {article.standardsTable && (
            <section aria-labelledby="bang-tieu-chuan" className="space-y-4 pt-4">
              <h2 id="bang-tieu-chuan" className="font-serif text-lg font-bold text-ink-soft scroll-mt-24">
                {article.standardsTableTitle ?? "Bảng tra cứu tiêu chuẩn tiêu biểu"}
              </h2>
              <DataTable
                labelledBy="bang-tieu-chuan"
                headers={article.standardsTableHeaders ?? ["Nhóm", "Tiêu chuẩn", "Ghi chú"]}
                rows={article.standardsTable.map((s) => [
                  <strong className="text-ink-soft font-sans">{renderRich(s.factor)}</strong>,
                  renderRich(s.standard),
                  <span className="text-sm text-gray-600">{renderRich(s.notes)}</span>,
                ])}
              />
            </section>
          )}

          {/* Common Mistakes callout — chỉ hiện khi bài có dữ liệu pitfall riêng.
              <aside> + <strong>, KHÔNG phải <h2>: đây là hộp cảnh báo bên lề, để nó là
              heading thì nó chen vào dàn mục lục của bài như thể một chương ngang hàng. */}
          {article.pitfall && (
            <aside aria-labelledby="art-pitfall" className="bg-sand border border-terracotta/30 rounded-xl p-5 my-6 space-y-2">
              <p id="art-pitfall" className="font-sans font-bold text-base text-terracotta flex items-center gap-1.5">
                <AlertTriangle className="w-5 h-5 shrink-0" aria-hidden="true" />
                {article.pitfall.title ?? "Sai lầm phổ biến bà con nông dân cần tuyệt đối tránh:"}
              </p>
              <p className="text-sm text-gray-700">{renderRich(article.pitfall.body)}</p>
            </aside>
          )}

          {/* FAQ — dữ liệu này vốn chỉ nằm trong JSON-LD FAQPage; hiển thị luôn trên trang để
              nội dung schema khớp với nội dung người đọc thấy (yêu cầu của Google). */}
          {hasFaq && (
            <section id="art-faq" aria-labelledby="art-faq-h" className="space-y-3 pt-4 scroll-mt-24">
              <h2 id="art-faq-h" className="font-serif text-xl md:text-2xl font-bold text-ink-soft border-b border-line pb-2">
                Câu hỏi thường gặp
              </h2>
              <FaqAccordion items={article.faq!} renderAnswer={renderRich} />
            </section>
          )}

          {/* Nguồn tham khảo là siêu dữ liệu về bài, không phải một chương của bài → <footer>. */}
          <footer>
            <SourceList sources={article.sources} />
          </footer>
        </div>
      </div>

      {/* Bài liên quan nằm NGOÀI mạch nội dung chính: đây là điều hướng sang bài khác,
          không phải một phần của bài đang đọc. */}
      <section aria-labelledby="art-related" className="space-y-4 pt-8 border-t border-line">
        <h2 id="art-related" className="font-serif text-xl font-bold text-ink-soft">Các chuyên mục tin cậy độc giả nông học đón đọc nhiều nhất</h2>
        <ul role="list" className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none m-0 p-0">
          {WIKI_ARTICLES.filter((a) => a.id !== article.id).slice(0, 2).map((art) => (
            <li key={art.id} className="grid">
              <article className="relative border border-line hover:border-terracotta p-5 rounded-xl cursor-pointer bg-white hover:bg-paper-2 transition-all flex flex-col justify-between group">
                <div className="space-y-2">
                  <span className="text-[10px] bg-sand border border-line text-earth px-2 py-0.5 rounded uppercase font-bold tracking-wider">{art.category}</span>
                  <h3 className="font-serif text-base font-bold text-ink-soft group-hover:text-terracotta transition-colors line-clamp-2">
                    <Link to={paths.article(art.id)} className="after:absolute after:inset-0 after:content-['']">
                      {art.title}
                    </Link>
                  </h3>
                </div>
                <span className="text-xs text-terracotta font-semibold flex items-center gap-1 mt-3">Đọc cẩm nang này <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" /></span>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
};
