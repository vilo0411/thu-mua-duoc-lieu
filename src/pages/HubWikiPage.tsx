import React, { useEffect, useState } from "react";
import { Bug, ChevronDown, Coins, Droplets, HelpCircle, Leaf, Package, Sprout } from "lucide-react";
import { Link } from "react-router-dom";
import { HERBS_DATA, WIKI_HUBS } from "../lib/data";
import { Breadcrumb, FaqAccordion, GrowthTimeline, LandingLink, PestList, ProcessSteps, SourceList, StickyToc, TechConditionCards } from "../components/ui";
import { paths, asset } from "../lib/paths";
import { lastModified, formatVnDate } from "../lib/data/lastmod";
import { Seo, hubSeo } from "../lib/seo";
import { NotFoundPage } from "./NotFoundPage";
import type { HerbPest } from "../types";

const GROUP_LABEL: Record<string, string> = {
  "cu-re": "nhóm củ – rễ",
  "hoa-la": "nhóm hoa – lá",
  nam: "nhóm nấm dược liệu",
  vo: "nhóm vỏ",
  than: "nhóm thân – cành",
};

/**
 * Link wheel giữa các bài kỹ thuật trồng: xếp tất cả hub thành một vòng cố định
 * (theo nhóm dược liệu rồi tên cây để liên kết cùng chủ đề), mỗi bài trỏ tới N bài
 * kế tiếp trong vòng. Cách này phân bổ link nội bộ đều, khép kín thành một wheel và
 * đảm bảo mọi bài đều nhận được liên kết vào — thay cho việc trỏ chung về vài bài tổng.
 */
const GROUP_RING_ORDER = ["cu-re", "hoa-la", "than", "vo", "nam"];
const herbGroupOf = (herbSlug: string) =>
  HERBS_DATA.find((h) => h.slug === herbSlug)?.group ?? "hoa-la";

const HUB_RING = [...WIKI_HUBS].sort((a, b) => {
  const ga = GROUP_RING_ORDER.indexOf(herbGroupOf(a.herbSlug));
  const gb = GROUP_RING_ORDER.indexOf(herbGroupOf(b.herbSlug));
  return ga - gb || a.herbName.localeCompare(b.herbName, "vi");
});

/** N bài kỹ thuật kế tiếp trong vòng (quấn vòng) làm liên kết liên quan cho một hub. */
const relatedHubs = (herbSlug: string, n = 2) => {
  const i = HUB_RING.findIndex((h) => h.herbSlug === herbSlug);
  if (i < 0) return [];
  const count = Math.min(n, HUB_RING.length - 1);
  return Array.from({ length: count }, (_, k) => HUB_RING[(i + 1 + k) % HUB_RING.length]);
};

/**
 * Lưới link từ mỗi hub cây → cụm bài "Kỹ thuật gieo trồng" nền tảng (123 → 7).
 * Bài phổ quát luôn có; bài nhân giống chọn theo `technique.propagation` của cây.
 */
const CORE_ARTICLES = [
  { id: "gia-the-la-gi", label: "Giá thể là gì? Các loại giá thể trồng dược liệu" },
  { id: "cach-tron-dat-trong-cay", label: "Cách trộn đất trồng cây dược liệu" },
  { id: "cach-bon-lot-bon-thuc", label: "Bón lót và bón thúc: cách bón & chọn phân" },
  { id: "cach-diet-co-dai", label: "Cách diệt cỏ dại cho vườn dược liệu" },
];
const SEED_ARTICLES = [
  { id: "cach-u-hat-giong", label: "Cách ủ hạt giống kích mầm nhanh" },
  { id: "cach-uom-hat-giong", label: "Cách ươm hạt giống nảy mầm đều" },
];
const CUTTING_ARTICLE = { id: "cach-giam-canh", label: "Cách giâm cành đúng kỹ thuật" };

const foundationLinksFor = (propagation: string[]) => {
  const text = propagation.join(" ").toLowerCase();
  const list = [...CORE_ARTICLES];
  if (/hạt|gieo|ươm/.test(text)) list.push(...SEED_ARTICLES);
  if (/giâm|hom|cành/.test(text)) list.push(CUTTING_ARTICLE);
  return list;
};

/** Cụm bài phòng trừ sâu bệnh generic — link từ phần "Sâu bệnh" của mọi hub (123 → 8). */
const DISEASE_ARTICLES = [
  { id: "benh-than-thu", label: "Bệnh thán thư" },
  { id: "benh-phan-trang", label: "Bệnh phấn trắng" },
  { id: "benh-dom-la", label: "Bệnh đốm lá" },
  { id: "benh-ri-sat", label: "Bệnh rỉ sắt (gỉ sắt)" },
  { id: "benh-lo-co-re-thoi-re", label: "Lở cổ rễ & thối rễ" },
  { id: "benh-moc-suong", label: "Bệnh mốc sương" },
  { id: "benh-nut-than-xi-mu", label: "Nứt thân xì mủ" },
  { id: "cach-tri-rep-sap", label: "Cách trị rệp sáp" },
];

/** Các mục nội dung (tĩnh) — dùng cho mục lục, trạng thái mở, và scroll-spy. */
const SECTIONS = [
  { id: "sec-gioi-thieu", label: "1. Giới thiệu tổng quan", icon: Leaf },
  { id: "sec-dieu-kien", label: "2. Điều kiện & kỹ thuật trồng", icon: Sprout },
  { id: "sec-cham-soc", label: "3. Quy trình chăm sóc đạt chuẩn", icon: Droplets },
  { id: "sec-sau-benh", label: "4. Sâu bệnh & giải pháp", icon: Bug },
  { id: "sec-thu-hoach", label: "5. Thu hoạch & sơ chế", icon: Package },
  { id: "sec-thi-truong", label: "6. Thị trường thu mua", icon: Coins },
  { id: "sec-faq", label: "7. Câu hỏi thường gặp", icon: HelpCircle },
];
const SECTION_IDS = SECTIONS.map((s) => s.id);

/**
 * Một mục nội dung gập/mở của trang Hub kỹ thuật.
 * Dùng grid-rows 0fr↔1fr để animate mọi chiều cao mà không kẹp nội dung;
 * nội dung luôn nằm trong DOM (chỉ ẩn bằng overflow) để giữ khả năng index SEO.
 */
const AccordionSection: React.FC<{
  id: string;
  icon: React.ElementType;
  title: React.ReactNode;
  open: boolean;
  onToggle: (id: string) => void;
  children: React.ReactNode;
}> = ({ id, icon: Icon, title, open, onToggle, children }) => (
  <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-24 border border-line rounded-xl bg-white overflow-hidden">
    <h2 className="m-0">
      <button
        type="button"
        id={`${id}-h`}
        onClick={() => onToggle(id)}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        className="w-full flex items-center gap-3 text-left px-4 md:px-6 py-4 hover:bg-paper-2 transition-colors cursor-pointer"
      >
        <span className="shrink-0 w-8 h-8 rounded-full bg-sand text-terracotta flex items-center justify-center" aria-hidden="true">
          <Icon className="w-4 h-4" />
        </span>
        <span className="flex-1 font-serif text-base md:text-xl font-bold text-ink-soft">{title}</span>
        <ChevronDown aria-hidden="true" className={`w-5 h-5 text-terracotta shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
    </h2>
    <div
      id={`${id}-panel`}
      role="region"
      aria-labelledby={`${id}-h`}
      className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
    >
      <div className="overflow-hidden">
        <div className="px-4 md:px-6 pb-6 pt-1 space-y-4 border-t border-line">{children}</div>
      </div>
    </div>
  </section>
);

export const HubWikiPage: React.FC<{ herbSlug: string }> = ({ herbSlug }) => {
  const [activeTocSection, setActiveTocSection] = useState(SECTION_IDS[0]);
  // Mặc định mở tất cả các mục; người dùng có thể tự gập lại.
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(SECTION_IDS));

  // Scroll-spy: mục lục sáng theo mục đang ở gần đầu khung nhìn.
  useEffect(() => {
    const OFFSET = 120; // bù cho header dính + khoảng thở
    const onScroll = () => {
      let current = SECTION_IDS[0];
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= OFFSET) current = id;
      }
      setActiveTocSection(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [herbSlug]);

  const herb = HERBS_DATA.find((h) => h.slug === herbSlug);
  const hub = WIKI_HUBS.find((h) => h.herbSlug === herbSlug);
  if (!herb || !hub) return <NotFoundPage />;

  const t = herb.technique;
  // Ngày cập nhật phải hiện trên trang: Google đòi ngày trong schema khớp ngày người đọc thấy.
  const updatedIso = lastModified("wiki-hub", herbSlug);
  const updated = formatVnDate(updatedIso);

  // Gộp sâu bệnh từ dữ liệu cây (§6) và dữ liệu hub, khử trùng theo tên.
  const pestRows = [
    ...herb.pests.map((p) => ({ name: p.pestName, level: p.level, symptom: p.symptom, remedy: p.remedy })),
    ...hub.pests
      .filter((hp) => !herb.pests.some((p) => p.pestName === hp.pestName))
      .map((hp) => ({ name: hp.pestName, level: undefined as HerbPest["level"] | undefined, symptom: hp.symptoms, remedy: hp.remedy })),
  ];

  const allOpen = SECTION_IDS.every((id) => openSections.has(id));

  const toggle = (id: string) => {
    setActiveTocSection(id);
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Từ mục lục (hoặc điều hướng): luôn mở mục rồi cuộn tới đầu mục.
  const openAndScroll = (id: string) => {
    setActiveTocSection(id);
    setOpenSections((prev) => new Set(prev).add(id));
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const toggleAll = () => setOpenSections(allOpen ? new Set() : new Set(SECTION_IDS));

  return (
    // <article>: cẩm nang kỹ thuật của một cây là một tài liệu độc lập.
    <article className="space-y-8 animate-fade-in">
      <Seo {...hubSeo(hub, herb)} />
      <Breadcrumb items={[
        { label: "Trang chủ", href: paths.home() },
        { label: "Kiến thức", href: paths.knowledge() },
        { label: `Kỹ thuật trồng ${herb.name}` },
      ]} />

      {/* Hero — chữ + ảnh thật của cây, cân bằng cảm giác "toàn chữ".
          Ảnh giữ tỉ lệ cố định mọi kích thước (không dùng aspect-auto) để không phình
          theo chiều cao gốc ảnh dọc làm vỡ layout; grid canh trên để 2 cột cao độc lập. */}
      <header className="grid md:grid-cols-2 gap-5 md:gap-6 md:items-start">
        <div className="order-1 md:order-2 rounded-2xl overflow-hidden border border-line bg-sand aspect-[16/10]">
          <img
            src={asset(herb.image)}
            alt={`Cây ${herb.name} (${herb.scientificName}) — kỹ thuật trồng và chăm sóc`}
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>
        <div className="order-2 md:order-1 bg-gradient-to-br from-sand to-paper border border-line rounded-2xl p-6 md:p-8 space-y-3">
          <span className="text-terracotta font-mono text-xs font-bold uppercase tracking-[0.15em] block mb-1">// Học liệu tổng hợp nông học</span>
          <h1 className="font-serif text-2xl md:text-4xl font-extrabold text-ink-soft tracking-tight">{hub.title}</h1>
          {/* Ngày cập nhật hiển thị để khớp `dateModified` trong JSON-LD. */}
          {updated && (
            <p className="text-xs text-gray-500 font-sans">
              Cập nhật: <time dateTime={updatedIso}>{updated}</time>
            </p>
          )}
          {/* .seo-answer: đánh dấu đoạn trả lời trực tiếp câu hỏi chính của trang (dùng cho biên tập). */}
          <p className="seo-answer text-gray-700 text-base font-sans leading-relaxed">{hub.intro}</p>
        </div>
      </header>

      {/* Hành trình sinh trưởng — dòng thời gian bấm được từ giống đến thu hoạch,
          cho đọc lướt trực quan ngay trên đầu trang mà không cần bung mục nào. */}
      <section aria-labelledby="hanh-trinh-h" className="bg-white border border-line rounded-2xl p-5 md:p-6">
        <h2 id="hanh-trinh-h" className="font-serif text-lg font-bold text-ink-soft mb-4">
          Hành trình từ giống đến thu hoạch {herb.name}
        </h2>
        <GrowthTimeline technique={t} group={herb.group} onSeeProcess={() => openAndScroll("sec-cham-soc")} />
      </section>

      {/* Main Content with Sticky TOC */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="hidden lg:block lg:col-span-1">
          <StickyToc items={SECTIONS} activeId={activeTocSection} onSelect={openAndScroll} />
        </div>

        <div className="lg:col-span-3 space-y-3">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={toggleAll}
              className="text-xs font-sans font-semibold text-terracotta hover:text-terracotta-dark inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-line hover:border-terracotta bg-white transition-colors cursor-pointer"
            >
              <ChevronDown className={`w-4 h-4 transition-transform ${allOpen ? "rotate-180" : ""}`} />
              {allOpen ? "Thu gọn tất cả" : "Mở tất cả"}
            </button>
          </div>

          {/* 1. Giới thiệu */}
          <AccordionSection id="sec-gioi-thieu" icon={Leaf} title={`Giới thiệu tổng quan cây ${herb.name}`} open={openSections.has("sec-gioi-thieu")} onToggle={toggle}>
            <div className="text-ink text-base leading-relaxed space-y-4 font-sans">
              <p>{herb.bioCharacteristics}</p>
              <p>
                Thuộc {GROUP_LABEL[herb.group] ?? "nhóm dược liệu"}, {herb.name} ({herb.scientificName}
                {herb.otherNames.length > 0 ? `; còn gọi là ${herb.otherNames.join(", ")}` : ""}) có giá trị sử dụng
                đa dạng: {herb.usageValue}
              </p>
            </div>
          </AccordionSection>

          {/* 2. Điều kiện & kỹ thuật trồng */}
          <AccordionSection id="sec-dieu-kien" icon={Sprout} title={`Điều kiện sinh thái & kỹ thuật gieo trồng ${herb.name}`} open={openSections.has("sec-dieu-kien")} onToggle={toggle}>
            <p className="text-sm text-gray-600 font-sans">
              Các thông số canh tác cốt lõi để {herb.name} đạt năng suất và tích lũy hoạt chất tối ưu:
            </p>
            <TechConditionCards technique={t} />
          </AccordionSection>

          {/* 3. Chăm sóc đạt chuẩn (dữ liệu hub) */}
          <AccordionSection id="sec-cham-soc" icon={Droplets} title="Quy trình kiểm soát chất lượng & chăm sóc đạt chuẩn GACP-WHO" open={openSections.has("sec-cham-soc")} onToggle={toggle}>
            <p className="text-sm text-gray-600 font-sans">
              Đây là quy trình đầy đủ cho từng giai đoạn ở "Hành trình từ giống đến thu hoạch" phía trên — mỗi mốc có
              tiêu chí kỹ thuật cụ thể và cách xử lý theo hướng hữu cơ, không tồn dư hóa chất:
            </p>
            <ProcessSteps steps={hub.standards} />
          </AccordionSection>

          {/* 4. Sâu bệnh */}
          <AccordionSection id="sec-sau-benh" icon={Bug} title={`Sâu bệnh hại thường gặp trên ${herb.name} & giải pháp sinh học`} open={openSections.has("sec-sau-benh")} onToggle={toggle}>
            <p className="text-sm text-gray-600 font-sans">
              Ưu tiên biện pháp sinh học, hạn chế tối đa thuốc bảo vệ thực vật hóa học để giữ dược tính sạch:
            </p>
            <PestList pests={pestRows.map((p) => ({ pestName: p.name, level: p.level, symptom: p.symptom, remedy: p.remedy }))} />
            <div className="pt-2 space-y-2">
              <p className="text-sm font-sans font-semibold text-ink-soft">Tra cứu bệnh & sâu hại thường gặp:</p>
              <div className="flex flex-wrap gap-2">
                {DISEASE_ARTICLES.map((a) => (
                  <Link
                    key={a.id}
                    to={paths.article(a.id)}
                    className="px-3 py-1.5 rounded-full border border-line bg-white text-sm font-sans font-semibold text-ink-soft hover:border-terracotta hover:text-terracotta transition-colors"
                  >
                    {a.label}
                  </Link>
                ))}
              </div>
            </div>
          </AccordionSection>

          {/* 5. Thu hoạch & sơ chế */}
          <AccordionSection id="sec-thu-hoach" icon={Package} title={`Thu hoạch, sơ chế & bảo quản ${herb.name}`} open={openSections.has("sec-thu-hoach")} onToggle={toggle}>
            <div className="text-ink text-base leading-relaxed space-y-4 font-sans">
              <p>
                Cây {herb.name} cho thu hoạch sau <strong>{t.harvestTime}</strong>, năng suất tham khảo đạt{" "}
                <strong>{t.yield}</strong>. Thu đúng độ tuổi giúp hàm lượng hoạt chất đạt đỉnh và giữ giá bán tốt nhất.
              </p>
              <p>Để lô hàng đạt chuẩn nhập kho, bà con lưu ý các tiêu chí sau khi sơ chế và bảo quản:</p>
              <ul role="list" className="space-y-2.5 pl-1 list-none m-0">
                {herb.standards.map((std, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-ink text-base leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-1" aria-hidden="true">✓</span>
                    <span>{std}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AccordionSection>

          {/* 6. Thị trường thu mua — mention natural + landing (PRD Appendix C) */}
          <AccordionSection id="sec-thi-truong" icon={Coins} title={`Thị trường thu mua & bao tiêu ${herb.name} sau thu hoạch`} open={openSections.has("sec-thi-truong")} onToggle={toggle}>
            <div className="bg-paper-2 p-6 rounded-xl border border-line space-y-4">
              <p className="text-ink text-base leading-relaxed font-sans">
                Sau thu hoạch, {herb.name} cần được sơ chế và sấy đạt độ ẩm chuẩn trước khi giao cho đầu mối. Bà con có
                thể tham khảo bảng giá phân loại chi tiết ngay tại trang định giá của cây, hoặc xem các kênh tiêu thụ phù hợp
                với quy mô và chất lượng hàng của mình.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to={paths.herb(herb.slug)}
                  className="bg-terracotta hover:bg-terracotta-dark text-white font-sans font-bold text-sm px-5 py-3 rounded-lg shadow-2xs transition-all inline-flex items-center justify-center gap-1 cursor-pointer"
                >
                  Xem bảng giá thu mua {herb.name} →
                </Link>
                <LandingLink
                  cay={herb.slug}
                  pageType="hub_wiki"
                  ctaPosition="hub_mention"
                  className="bg-white border border-terracotta hover:bg-terracotta hover:text-white text-terracotta font-sans font-bold text-sm px-5 py-3 rounded-lg transition-all inline-flex items-center justify-center gap-1"
                />
              </div>
            </div>
          </AccordionSection>

          {/* 7. FAQ */}
          <AccordionSection id="sec-faq" icon={HelpCircle} title={`Câu hỏi thường gặp khi trồng ${herb.name}`} open={openSections.has("sec-faq")} onToggle={toggle}>
            <FaqAccordion items={hub.faq} />
          </AccordionSection>

          {/* Kiến thức nền tảng — link tới cụm "Kỹ thuật gieo trồng" theo cách nhân giống của cây */}
          <section aria-labelledby="nen-tang-h" className="space-y-4 pt-6">
            <h2 id="nen-tang-h" className="font-serif text-xl font-bold text-ink-soft">Kiến thức gieo trồng nền tảng nên đọc</h2>
            <p className="text-sm text-gray-600 font-sans">
              Các kỹ thuật cơ bản áp dụng khi trồng {herb.name} — nắm chắc trước khi bắt tay vào vườn:
            </p>
            <ul role="list" className="grid grid-cols-1 md:grid-cols-2 gap-3 list-none m-0 p-0">
              {foundationLinksFor(t.propagation).map((a) => (
                <li key={a.id} className="grid">
                  <Link
                    to={paths.article(a.id)}
                    className="border border-line hover:border-terracotta p-4 rounded-xl cursor-pointer bg-white hover:bg-paper-2 transition-all flex items-center gap-3 group"
                  >
                    <span className="w-8 h-8 rounded bg-sand flex items-center justify-center text-terracotta shrink-0" aria-hidden="true">
                      <Sprout className="w-4.5 h-4.5" />
                    </span>
                    <span className="font-sans font-semibold text-sm text-ink-soft group-hover:text-terracotta transition-colors">{a.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Link wheel — liên kết vòng tới các bài kỹ thuật trồng cây dược liệu khác */}
          <section aria-labelledby="lien-quan-h" className="space-y-4 pt-6">
            <h2 id="lien-quan-h" className="font-serif text-xl font-bold text-ink-soft">Kỹ thuật trồng các cây dược liệu liên quan</h2>
            <ul role="list" className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none m-0 p-0">
              {relatedHubs(herb.slug).map((rel) => (
                <li key={rel.id} className="grid">
                  <article className="relative border border-line hover:border-terracotta p-4 rounded-xl cursor-pointer bg-white hover:bg-paper-2 transition-all flex items-start gap-3 group">
                    <span className="w-8 h-8 rounded bg-sand flex items-center justify-center text-terracotta shrink-0 mt-0.5" aria-hidden="true">
                      <Sprout className="w-4.5 h-4.5" />
                    </span>
                    <div>
                      <h3 className="font-sans font-bold text-sm text-ink-soft group-hover:text-terracotta transition-colors line-clamp-2">
                        <Link to={paths.hubWiki(rel.herbSlug)} className="after:absolute after:inset-0 after:content-['']">
                          {rel.title}
                        </Link>
                      </h3>
                      <span className="text-xs text-gray-500 font-mono mt-1 block">Kỹ thuật trồng {rel.herbName}</span>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </section>

          {/* Nguồn tham khảo là siêu dữ liệu về bài → <footer> của article. */}
          <footer>
            <SourceList sources={hub.sources} />
          </footer>
        </div>
      </div>
    </article>
  );
};
