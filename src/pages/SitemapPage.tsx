import React from "react";
import { Link } from "react-router-dom";
import { HERBS_DATA, WIKI_HUBS, WIKI_ARTICLES } from "../lib/data";
import { paths } from "../lib/paths";
import { Seo, sitemapSeo } from "../lib/seo";
import { Breadcrumb } from "../components/ui";
import type { HerbGroup, HerbalMedicine } from "../types";

const GROUP_LABELS: Record<HerbGroup, string> = {
  "cu-re": "Củ & rễ",
  "hoa-la": "Hoa & lá",
  than: "Thân & cành",
  vo: "Vỏ cây",
  nam: "Nấm",
};
const GROUP_ORDER: HerbGroup[] = ["cu-re", "hoa-la", "than", "vo", "nam"];

const byName = (a: HerbalMedicine, b: HerbalMedicine) =>
  a.name.localeCompare(b.name, "vi");

/** Tiêu đề khối lớn: eyebrow + tiêu đề serif, kèm số lượng trang trong khối. */
const GroupTitle: React.FC<{ eyebrow: string; title: string; count?: number }> = ({ eyebrow, title, count }) => (
  <header className="border-b border-line pb-3">
    <span className="inline-block text-xs font-sans font-bold uppercase tracking-[0.2em] text-terracotta">{eyebrow}</span>
    <h2 className="mt-1 font-serif text-2xl font-bold text-ink-soft tracking-tight">
      {title}
      {typeof count === "number" && <span className="ml-2 text-base font-sans font-medium text-gray-400">({count} trang)</span>}
    </h2>
  </header>
);

const linkCls = "text-ink-soft hover:text-terracotta hover:underline transition-colors";
const subLinkCls = "text-xs text-gray-500 hover:text-terracotta hover:underline transition-colors";

export const SitemapPage: React.FC = () => {

  const herbsByGroup = GROUP_ORDER
    .map((g) => ({ group: g, herbs: HERBS_DATA.filter((h) => h.group === g).sort(byName) }))
    .filter((x) => x.herbs.length > 0);

  const comboCount = HERBS_DATA.reduce((n, h) => n + (h.regions?.length ?? 0), 0);
  const hubs = [...WIKI_HUBS].sort((a, b) => a.herbName.localeCompare(b.herbName, "vi"));

  const staticLinks = [
    { to: paths.home(), label: "Trang chủ" },
    { to: paths.pillar(), label: "Thu mua dược liệu — bảng giá & đầu mối" },
    { to: paths.knowledge(), label: "Kiến thức trồng & sơ chế" },
    { to: paths.about(), label: "Về tôi" },
    { to: paths.contact(), label: "Liên hệ" },
    { to: paths.editorial(), label: "Chính sách nội dung" },
    { to: paths.privacy(), label: "Chính sách bảo mật" },
    { to: paths.terms(), label: "Điều khoản sử dụng" },
    { to: paths.disclaimer(), label: "Miễn trừ trách nhiệm" },
  ];

  return (
    <div className="animate-fade-in space-y-12">
      <Seo {...sitemapSeo()} />

      <div>
        <Breadcrumb items={[{ label: "Trang chủ", href: paths.home() }, { label: "Sơ đồ trang" }]} />
      </div>

      <header className="max-w-2xl space-y-3">
        <h1 className="font-serif text-3xl md:text-4xl font-extrabold text-ink-soft tracking-tight leading-tight">Sơ đồ trang</h1>
        <p className="text-[15px] text-gray-600 font-sans leading-relaxed">
          Toàn bộ trang trên {" "}
          <span className="font-semibold">Thư Viện Dược Liệu</span> — bảng giá thu mua từng cây, vùng trồng, kỹ thuật canh tác và các trang thông tin. Bấm vào tên để xem chi tiết.
        </p>
      </header>

      {/* Trang chính */}
      <section className="space-y-5">
        <GroupTitle eyebrow="Điều hướng" title="Trang chính" />
        <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3 text-[15px] font-sans">
          {staticLinks.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className={linkCls}>{l.label}</Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Thu mua dược liệu */}
      <section className="space-y-8">
        <GroupTitle eyebrow="Thu mua dược liệu" title="Bảng giá theo cây" count={HERBS_DATA.length} />
        <p className="text-sm text-gray-500 font-sans -mt-4">
          Mỗi cây có trang bảng giá riêng; các liên kết nhỏ bên dưới là trang thu mua theo từng vùng trồng ({comboCount} trang vùng).
        </p>
        {herbsByGroup.map(({ group, herbs }) => (
          <div key={group} className="space-y-4">
            <h3 className="font-sans font-bold text-sm uppercase tracking-wider text-gray-500">
              {GROUP_LABELS[group]} <span className="text-gray-400">({herbs.length})</span>
            </h3>
            <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3 text-[15px] font-sans">
              {herbs.map((h) => (
                <li key={h.id} className="space-y-1">
                  <Link to={paths.herb(h.slug)} className={`${linkCls} capitalize font-medium`}>
                    Thu mua dược liệu {h.name}
                  </Link>
                  {h.regions && h.regions.length > 0 && (
                    <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                      {h.regions.map((r) => (
                        <Link key={r.regionSlug} to={paths.herbRegion(h.slug, r.regionSlug)} className={subLinkCls}>
                          {r.regionName}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Kiến thức */}
      <section className="space-y-8">
        <GroupTitle eyebrow="Kiến thức" title="Kỹ thuật & bài viết" count={hubs.length + WIKI_ARTICLES.length} />

        <div className="space-y-4">
          <h3 className="font-sans font-bold text-sm uppercase tracking-wider text-gray-500">
            Kỹ thuật trồng theo cây <span className="text-gray-400">({hubs.length})</span>
          </h3>
          <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3 text-[15px] font-sans">
            {hubs.map((hub) => (
              <li key={hub.id}>
                <Link to={paths.hubWiki(hub.herbSlug)} className={`${linkCls} capitalize`}>
                  Kỹ thuật trồng {hub.herbName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {WIKI_ARTICLES.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-sans font-bold text-sm uppercase tracking-wider text-gray-500">
              Bài viết chuyên đề <span className="text-gray-400">({WIKI_ARTICLES.length})</span>
            </h3>
            <ul className="space-y-2 text-[15px] font-sans">
              {WIKI_ARTICLES.map((a) => (
                <li key={a.id}>
                  <Link to={paths.article(a.id)} className={linkCls}>{a.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
};
