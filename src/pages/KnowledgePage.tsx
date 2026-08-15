import React from "react";
import { Link } from "react-router-dom";
import { Sprout, ArrowRight, Search, X } from "lucide-react";
import { WIKI_ARTICLES, WIKI_HUBS, getHerbBySlug } from "../lib/data";
import { ArticleCard, Breadcrumb, CtaBanner, Pagination } from "../components/ui";
import { paths, asset } from "../lib/paths";
import { norm, matchesFields } from "../lib/search";
import { Seo, knowledgeSeo } from "../lib/seo";
import type { HerbGroup, WikiArticle } from "../types";

const GROUP_LABEL: Record<HerbGroup, string> = {
  "cu-re": "Củ, rễ",
  "hoa-la": "Hoa, lá",
  nam: "Nấm",
  vo: "Vỏ",
  than: "Thân, cành",
};

// Số hub hiện ban đầu khi chưa lọc; phần còn lại ẩn sau nút "Xem thêm" để trang gọn.
const HUB_CAP = 9;

// Số bài mỗi trang trong thư viện bài viết chuyên đề (lưới 3 cột × 3 hàng).
const ARTICLES_PER_PAGE = 9;

// Tra tiêu đề bài theo id (dùng cho ItemList SEO và các bước quy trình).
const ARTICLE_BY_ID = new Map(WIKI_ARTICLES.map((a) => [a.id, a] as const));
const articleTitle = (id: string) => ARTICLE_BY_ID.get(id)?.title ?? id;

// Pillar: 6 bước quy trình trồng dược liệu, mỗi bước trỏ tới bài nền tảng tương ứng.
// Đây là phần điều phối link equity từ trang tổng xuống cụm "Kỹ thuật gieo trồng".
const FOUNDATION_STEPS: { step: string; desc: string; ids: string[] }[] = [
  { step: "1. Chuẩn bị giá thể & đất", desc: "Hiểu giá thể và phối trộn đất tơi xốp, thoát nước.", ids: ["gia-the-la-gi", "cach-tron-dat-trong-cay"] },
  { step: "2. Xử lý & ủ hạt giống", desc: "Kích mầm cho hạt nứt nanh, nảy đều.", ids: ["cach-u-hat-giong"] },
  { step: "3. Ươm cây con", desc: "Nuôi cây con khỏe, sạch bệnh trước khi ra ruộng.", ids: ["cach-uom-hat-giong"] },
  { step: "4. Nhân giống vô tính", desc: "Giâm cành giữ đúng giống, cho thu sớm.", ids: ["cach-giam-canh"] },
  { step: "5. Bón phân đúng cách", desc: "Bón lót tạo nền, bón thúc theo giai đoạn.", ids: ["cach-bon-lot-bon-thuc"] },
  { step: "6. Làm cỏ & chăm sóc", desc: "Kiểm soát cỏ dại an toàn cho dược liệu.", ids: ["cach-diet-co-dai"] },
];

// Cụm bài phòng trừ sâu bệnh thường gặp — link nổi bật trên pillar để phân phối link equity.
const DISEASE_ARTICLE_IDS = [
  "benh-than-thu",
  "benh-phan-trang",
  "benh-dom-la",
  "benh-ri-sat",
  "benh-lo-co-re-thoi-re",
  "benh-moc-suong",
  "benh-nut-than-xi-mu",
  "cach-tri-rep-sap",
];

// Cụm tiêu chuẩn & kiểm định — hỗ trợ định vị "đầu mối đạt chuẩn", đưa vào ItemList pillar.
const STANDARD_ARTICLE_IDS = ["tieu-chuan-gacp", "tieu-chuan-gmp", "kiem-dinh-duoc-lieu"];

export const KnowledgePage: React.FC = () => {
  const [query, setQuery] = React.useState("");
  const [group, setGroup] = React.useState<HerbGroup | "all">("all");
  const [expanded, setExpanded] = React.useState(false);
  const [articleCat, setArticleCat] = React.useState<string>("all");
  const [articleQuery, setArticleQuery] = React.useState("");
  const [articlePage, setArticlePage] = React.useState(1);

  // Ghép hub với dữ liệu cây (ảnh, nhóm, tên khác) để hiển thị + tìm kiếm; sắp theo tên cây.
  const hubItems = React.useMemo(
    () =>
      WIKI_HUBS.map((hub) => ({ hub, herb: getHerbBySlug(hub.herbSlug) })).sort((a, b) =>
        a.hub.herbName.localeCompare(b.hub.herbName, "vi"),
      ),
    [],
  );
  const groups = React.useMemo(
    () => [...new Set(hubItems.map((i) => i.herb?.group).filter(Boolean))] as HerbGroup[],
    [hubItems],
  );

  const nq = norm(query);
  const filtered = React.useMemo(
    () =>
      hubItems.filter(
        ({ hub, herb }) =>
          (group === "all" || herb?.group === group) &&
          matchesFields([hub.herbName, hub.title, hub.herbSlug, ...(herb?.otherNames ?? [])], nq),
      ),
    [hubItems, group, nq],
  );

  const hasFilter = !!nq || group !== "all";
  const visible = expanded || hasFilter ? filtered : filtered.slice(0, HUB_CAP);
  const hiddenCount = filtered.length - visible.length;

  // ItemList cho pillar: cụm bài nền tảng + toàn bộ hub kỹ thuật theo cây.
  const seoListItems = React.useMemo(
    () => [
      ...FOUNDATION_STEPS.flatMap((s) => s.ids).map((id) => ({ name: articleTitle(id), path: paths.article(id) })),
      ...DISEASE_ARTICLE_IDS.map((id) => ({ name: articleTitle(id), path: paths.article(id) })),
      ...STANDARD_ARTICLE_IDS.map((id) => ({ name: articleTitle(id), path: paths.article(id) })),
      ...hubItems.map(({ hub }) => ({ name: `Kỹ thuật trồng ${hub.herbName}`, path: paths.hubWiki(hub.herbSlug) })),
    ],
    [hubItems],
  );

  // Gộp bài viết theo chuyên mục; WIKI_ARTICLES đã sắp theo DISPLAY_ORDER nên cụm nền tảng lên đầu.
  const articlesByCategory = React.useMemo(() => {
    const map = new Map<string, WikiArticle[]>();
    for (const a of WIKI_ARTICLES) {
      const list = map.get(a.category) ?? [];
      list.push(a);
      map.set(a.category, list);
    }
    return [...map.entries()];
  }, []);

  // Thư viện bài viết: lọc theo chuyên mục + từ khoá, rồi cắt trang.
  const nqArticle = norm(articleQuery);
  const filteredArticles = React.useMemo(
    () =>
      WIKI_ARTICLES.filter(
        (a) =>
          (articleCat === "all" || a.category === articleCat) &&
          matchesFields([a.title, a.excerpt, a.category], nqArticle),
      ),
    [articleCat, nqArticle],
  );
  const articlePages = Math.max(1, Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE));
  const page = Math.min(articlePage, articlePages); // giữ hợp lệ khi bộ lọc thu hẹp kết quả
  const pagedArticles = filteredArticles.slice((page - 1) * ARTICLES_PER_PAGE, page * ARTICLES_PER_PAGE);

  // Đổi bộ lọc thì về trang 1; đổi trang thì kéo lên đầu khu thư viện cho khỏi lạc chỗ đọc.
  const changeFilter = (next: () => void) => {
    next();
    setArticlePage(1);
  };
  const goPage = (p: number) => {
    setArticlePage(p);
    document.getElementById("thu-vien-bai-viet")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <Seo {...knowledgeSeo(seoListItems)} />
      <Breadcrumb items={[{ label: "Trang chủ", href: paths.home() }, { label: "Kỹ thuật trồng cây dược liệu" }]} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-sand to-paper border border-line rounded-2xl p-6 md:p-10 space-y-3">
        <span className="text-terracotta font-mono text-xs font-bold uppercase tracking-[0.15em] block mb-1">// Cẩm nang nông học</span>
        <h1 className="font-serif text-2xl md:text-4xl font-extrabold text-ink-soft tracking-tight">
          Kỹ Thuật Trồng Cây Dược Liệu
        </h1>
        <p className="text-gray-700 text-base md:text-lg max-w-3xl font-sans leading-relaxed">
          Do <strong className="text-terracotta">Nguyễn Viết Lộc</strong> tổng hợp từ nguồn uy tín: từ chuẩn bị giá thể, gieo ươm, nhân giống, bón phân, phòng trừ sâu bệnh đến sơ chế sau thu hoạch — kèm cẩm nang kỹ thuật riêng cho {WIKI_HUBS.length} cây dược liệu, sắp xếp lại cho bà con dễ áp dụng.
        </p>
      </section>

      {/* Quy trình trồng dược liệu — 6 bước nền tảng, mỗi bước dẫn tới bài kỹ thuật chi tiết */}
      <section aria-labelledby="quy-trinh-h" className="space-y-5">
        <div className="border-b border-line pb-4">
          <h2 id="quy-trinh-h" className="font-serif text-2xl font-bold text-ink-soft">Quy trình trồng dược liệu qua 6 bước</h2>
          <p className="text-sm text-gray-600 font-sans mt-1">Nắm khung chung trước, rồi bấm vào từng bước để đọc kỹ thuật chi tiết.</p>
        </div>
        {/* <ol>: "6 bước" là một quy trình có thứ tự — thứ tự ở đây là ý nghĩa. */}
        <ol role="list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none m-0 p-0">
          {FOUNDATION_STEPS.map((s) => (
            <li key={s.step} className="bg-white border border-line rounded-xl p-5 flex flex-col gap-2">
              <h3 className="font-serif text-lg font-bold text-ink-soft">{s.step}</h3>
              <p className="text-sm text-gray-600 font-sans leading-relaxed flex-1">{s.desc}</p>
              <ul role="list" className="flex flex-col gap-1.5 pt-1 list-none m-0 p-0">
                {s.ids.map((id) => (
                  <li key={id}>
                    <Link
                      to={paths.article(id)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-terracotta hover:text-terracotta-dark hover:underline"
                    >
                      <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span className="line-clamp-1">{articleTitle(id)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      {/* Hub kỹ thuật theo từng cây — lưới gọn, tìm/lọc để scale khi có nhiều bài */}
      {hubItems.length > 0 && (
        <section aria-labelledby="cam-nang-h" className="space-y-5">
          <div className="flex items-baseline justify-between border-b border-line pb-4">
            <h2 id="cam-nang-h" className="font-serif text-2xl font-bold text-ink-soft">Cẩm nang kỹ thuật theo cây</h2>
            <span className="text-sm text-gray-500">{hubItems.length} cây</span>
          </div>

          {/* Ô tìm + lọc nhóm */}
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-line bg-white focus-within:border-terracotta transition-colors md:max-w-sm w-full">
              <Search className="w-5 h-5 text-terracotta shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoComplete="off"
                placeholder="Tìm cây, ví dụ: ha thu o, kim ngan…"
                className="w-full bg-transparent text-base font-sans text-ink placeholder:text-gray-400 focus:outline-none"
              />
              {query && (
                <button type="button" onClick={() => setQuery("")} aria-label="Xoá" className="shrink-0 text-gray-400 hover:text-terracotta cursor-pointer">
                  <X className="w-4.5 h-4.5" />
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {(["all", ...groups] as const).map((g) => {
                const active = group === g;
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGroup(g)}
                    aria-pressed={active}
                    className={`px-3 py-1.5 rounded-full border text-sm font-sans font-semibold cursor-pointer transition-colors ${
                      active ? "bg-terracotta border-terracotta text-white" : "bg-white border-line text-ink-soft hover:border-terracotta hover:text-terracotta"
                    }`}
                  >
                    {g === "all" ? "Tất cả" : GROUP_LABEL[g]}
                  </button>
                );
              })}
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="text-sm text-gray-500 italic py-10 text-center">
              Không tìm thấy cẩm nang nào khớp. Thử gõ ngắn gọn hơn hoặc bỏ bộ lọc nhóm.
            </p>
          ) : (
            <>
              <ul role="list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 list-none m-0 p-0">
                {visible.map(({ hub, herb }) => (
                  <li key={hub.id} className="grid">
                  <article className="relative text-left bg-white rounded-xl overflow-hidden border border-line hover:border-terracotta shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col">
                    <div className="aspect-video bg-gray-100 overflow-hidden relative">
                      <img
                        src={asset(herb?.image)}
                        alt={`Kỹ thuật trồng ${hub.herbName}`}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2.5 left-2.5 bg-pine-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider inline-flex items-center gap-1">
                        <Sprout className="w-3 h-3" aria-hidden="true" />
                        Kỹ thuật trồng
                      </span>
                    </div>
                    <div className="p-4 flex flex-col flex-1 gap-1">
                      {herb && (
                        <span className="text-[11px] font-sans font-bold uppercase tracking-[0.12em] text-terracotta">{GROUP_LABEL[herb.group]}</span>
                      )}
                      <h3 className="font-serif text-lg font-bold text-ink-soft group-hover:text-terracotta transition-colors leading-snug">
                        <Link to={paths.hubWiki(hub.herbSlug)} className="after:absolute after:inset-0 after:content-['']">
                          {hub.herbName}
                        </Link>
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1">{herb?.shortDesc ?? hub.intro}</p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-bold text-terracotta mt-1">
                        Xem cẩm nang
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                      </span>
                    </div>
                  </article>
                  </li>
                ))}
              </ul>

              {hiddenCount > 0 && (
                <div className="flex justify-center pt-1">
                  <button
                    type="button"
                    onClick={() => setExpanded(true)}
                    className="px-5 py-2.5 rounded-xl border border-line bg-white text-ink-soft font-sans font-semibold text-sm hover:border-terracotta hover:text-terracotta transition-colors cursor-pointer"
                  >
                    Xem thêm {hiddenCount} cẩm nang
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      )}

      {/* Thư viện bài viết chuyên đề — một khu duy nhất có tab chuyên mục, ô tìm và phân trang,
          thay cho 5 khối xếp dọc trước đây (trang dài, khó quét mắt trên điện thoại). */}
      <section id="thu-vien-bai-viet" aria-labelledby="thu-vien-h" className="space-y-5 scroll-mt-24">
        <div className="flex items-baseline justify-between border-b border-line pb-4">
          <h2 id="thu-vien-h" className="font-serif text-2xl font-bold text-ink-soft">Thư viện bài viết kỹ thuật</h2>
          <span className="text-sm text-gray-500">{WIKI_ARTICLES.length} bài viết</span>
        </div>

        {/* Ô tìm + tab chuyên mục */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-line bg-white focus-within:border-terracotta transition-colors md:max-w-sm w-full">
            <Search className="w-5 h-5 text-terracotta shrink-0" />
            <input
              type="text"
              value={articleQuery}
              onChange={(e) => changeFilter(() => setArticleQuery(e.target.value))}
              autoComplete="off"
              placeholder="Tìm bài viết, ví dụ: bon phan, sau benh…"
              className="w-full bg-transparent text-base font-sans text-ink placeholder:text-gray-400 focus:outline-none"
            />
            {articleQuery && (
              <button
                type="button"
                onClick={() => changeFilter(() => setArticleQuery(""))}
                aria-label="Xoá"
                className="shrink-0 text-gray-400 hover:text-terracotta cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {([["all", WIKI_ARTICLES.length] as const, ...articlesByCategory.map(([c, arts]) => [c, arts.length] as const)]).map(
              ([cat, count]) => {
                const active = articleCat === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => changeFilter(() => setArticleCat(cat))}
                    aria-pressed={active}
                    className={`px-3 py-1.5 rounded-full border text-sm font-sans font-semibold cursor-pointer transition-colors ${
                      active ? "bg-terracotta border-terracotta text-white" : "bg-white border-line text-ink-soft hover:border-terracotta hover:text-terracotta"
                    }`}
                  >
                    {cat === "all" ? "Tất cả" : cat} <span className={active ? "opacity-80" : "text-gray-400"}>({count})</span>
                  </button>
                );
              },
            )}
          </div>
        </div>

        {filteredArticles.length === 0 ? (
          <p className="text-sm text-gray-500 italic py-10 text-center">
            Không tìm thấy bài viết nào khớp. Thử gõ ngắn gọn hơn hoặc chọn lại chuyên mục.
          </p>
        ) : (
          <>
            <ul role="list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 list-none m-0 p-0">
              {pagedArticles.map((art) => (
                <li key={art.id} className="grid">
                <ArticleCard
                  compact
                  title={art.title}
                  category={art.category}
                  excerpt={art.excerpt}
                  image={art.image}
                  readTime={art.readTime}
                  author={art.author}
                  date={art.date}
                  to={paths.article(art.id)}
                />
                </li>
              ))}
            </ul>
            <Pagination page={page} totalPages={articlePages} onChange={goPage} label="bài viết" />
          </>
        )}

        {/* Mục lục đầy đủ: phân trang chỉ render 9 thẻ nên các bài còn lại vẫn cần một đường link
            trong HTML để người đọc (và bot) tới được — giữ luôn link nội bộ cho mọi bài. */}
        <details className="border border-line rounded-xl bg-white p-4">
          <summary className="cursor-pointer font-sans font-semibold text-sm text-ink-soft hover:text-terracotta">
            Xem danh sách đầy đủ {WIKI_ARTICLES.length} bài viết
          </summary>
          <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
            {articlesByCategory.map(([category, arts]) => (
              <div key={category} className="space-y-1.5">
                {/* Nhãn nhóm trong hộp thu gọn, KHÔNG phải một mục của trang → không
                    dùng heading, tránh chen vào dàn h2/h3 của trang. */}
                <p className="font-sans text-xs font-bold uppercase tracking-[0.12em] text-terracotta m-0">{category}</p>
                <ul role="list" className="space-y-1 list-none m-0 p-0">
                  {arts.map((a) => (
                    <li key={a.id}>
                      <Link to={paths.article(a.id)} className="text-sm text-ink hover:text-terracotta hover:underline">
                        {a.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </details>
      </section>

      <CtaBanner
        title="Cần tư vấn kỹ thuật trồng cho vùng của bạn?"
        description="Hỏi cụ thể về loại cây, vùng đất, mùa vụ — tôi sẽ tra cứu, tổng hợp giúp và chỉ nguồn tham khảo."
        buttonText="Gửi câu hỏi kỹ thuật"
        href="/lien-he"
      />
    </div>
  );
};
