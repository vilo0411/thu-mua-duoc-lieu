import React from "react";
import { useNavigate } from "react-router-dom";
import { Sprout, ArrowRight, Search, X } from "lucide-react";
import { WIKI_ARTICLES, WIKI_HUBS, getHerbBySlug } from "../lib/data";
import { ArticleCard, Breadcrumb, CtaBanner } from "../components/ui";
import { paths, asset } from "../lib/paths";
import { norm, matchesFields } from "../lib/search";
import { Seo, knowledgeSeo } from "../lib/seo";
import type { HerbGroup } from "../types";

const GROUP_LABEL: Record<HerbGroup, string> = {
  "cu-re": "Củ, rễ",
  "hoa-la": "Hoa, lá",
  nam: "Nấm",
  vo: "Vỏ",
  than: "Thân, cành",
};

// Số hub hiện ban đầu khi chưa lọc; phần còn lại ẩn sau nút "Xem thêm" để trang gọn.
const HUB_CAP = 9;

export const KnowledgePage: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = React.useState("");
  const [group, setGroup] = React.useState<HerbGroup | "all">("all");
  const [expanded, setExpanded] = React.useState(false);

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

  return (
    <div className="space-y-8 animate-fade-in">
      <Seo {...knowledgeSeo()} />
      <Breadcrumb items={[{ label: "Trang chủ", onClick: () => navigate(paths.home()) }, { label: "Kiến thức" }]} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-sand to-paper border border-line rounded-2xl p-6 md:p-10 space-y-3">
        <span className="text-terracotta font-mono text-xs font-bold uppercase tracking-[0.15em] block mb-1">// Cẩm nang nông học</span>
        <h1 className="font-serif text-2xl md:text-4xl font-extrabold text-ink-soft tracking-tight">
          Kiến Thức Canh Tác &amp; Chế Biến Dược Liệu
        </h1>
        <p className="text-gray-700 text-base md:text-lg max-w-3xl font-sans leading-relaxed">
          Tổng hợp từ thực địa bởi <strong className="text-terracotta">Nguyễn Việt Lộc</strong>: kỹ thuật gieo trồng, phân biệt giống, xử lý sâu bệnh hữu cơ và sơ chế sau thu hoạch — viết cho bà con áp dụng được ngay.
        </p>
      </section>

      {/* Hub kỹ thuật theo từng cây — lưới gọn, tìm/lọc để scale khi có nhiều bài */}
      {hubItems.length > 0 && (
        <section className="space-y-5">
          <div className="flex items-baseline justify-between border-b border-line pb-4">
            <h2 className="font-serif text-2xl font-bold text-ink-soft">Cẩm nang kỹ thuật theo cây</h2>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {visible.map(({ hub, herb }) => (
                  <button
                    key={hub.id}
                    type="button"
                    onClick={() => navigate(paths.hubWiki(hub.herbSlug))}
                    className="text-left bg-white rounded-xl overflow-hidden border border-line hover:border-terracotta shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col"
                  >
                    <div className="aspect-video bg-gray-100 overflow-hidden relative">
                      <img
                        src={asset(herb?.image)}
                        alt={`Kỹ thuật trồng ${hub.herbName}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2.5 left-2.5 bg-pine-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider inline-flex items-center gap-1">
                        <Sprout className="w-3 h-3" />
                        Kỹ thuật trồng
                      </span>
                    </div>
                    <div className="p-4 flex flex-col flex-1 gap-1">
                      {herb && (
                        <span className="text-[11px] font-sans font-bold uppercase tracking-[0.12em] text-terracotta">{GROUP_LABEL[herb.group]}</span>
                      )}
                      <h4 className="font-serif text-lg font-bold text-ink-soft group-hover:text-terracotta transition-colors leading-snug">
                        {hub.herbName}
                      </h4>
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1">{herb?.shortDesc ?? hub.intro}</p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-bold text-terracotta mt-1">
                        Xem cẩm nang
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </button>
                ))}
              </div>

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

      {/* Article list */}
      <section className="space-y-6">
        <div className="flex items-baseline justify-between border-b border-line pb-4">
          <h2 className="font-serif text-2xl font-bold text-ink-soft">Tất cả bài viết</h2>
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
        title="Cần tư vấn kỹ thuật trồng cho vùng của bạn?"
        description="Hỏi cụ thể về loại cây, vùng đất, mùa vụ — tôi sẽ trả lời thẳng từ kinh nghiệm thực địa."
        buttonText="Gửi câu hỏi kỹ thuật"
        href="/lien-he"
      />
    </div>
  );
};
