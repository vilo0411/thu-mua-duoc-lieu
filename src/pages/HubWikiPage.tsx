import React, { useEffect, useState } from "react";
import { Bug, ChevronDown, Coins, Droplets, FileText, HelpCircle, Leaf, Package, Sprout } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { HERBS_DATA, PARTNER_COMPANY, WIKI_ARTICLES, WIKI_HUBS } from "../lib/data";
import { Breadcrumb, DataTable, FaqAccordion, LandingLink, StickyToc } from "../components/ui";
import { paths, asset } from "../lib/paths";
import { Seo, hubSeo } from "../lib/seo";
import { NotFoundPage } from "./NotFoundPage";

const PEST_LEVEL_LABEL: Record<string, string> = {
  "rat-pho-bien": "Rất phổ biến",
  "co-gap": "Có gặp",
  hiem: "Hiếm",
};

const GROUP_LABEL: Record<string, string> = {
  "cu-re": "nhóm củ – rễ",
  "hoa-la": "nhóm hoa – lá",
  nam: "nhóm nấm dược liệu",
  vo: "nhóm vỏ",
  than: "nhóm thân – cành",
};

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
  <section id={id} className="scroll-mt-24 border border-line rounded-xl bg-white overflow-hidden">
    <h2 className="m-0">
      <button
        type="button"
        onClick={() => onToggle(id)}
        aria-expanded={open}
        className="w-full flex items-center gap-3 text-left px-4 md:px-6 py-4 hover:bg-paper-2 transition-colors cursor-pointer"
      >
        <span className="shrink-0 w-8 h-8 rounded-full bg-sand text-terracotta flex items-center justify-center">
          <Icon className="w-4 h-4" />
        </span>
        <span className="flex-1 font-serif text-base md:text-xl font-bold text-ink-soft">{title}</span>
        <ChevronDown className={`w-5 h-5 text-terracotta shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
    </h2>
    <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
      <div className="overflow-hidden">
        <div className="px-4 md:px-6 pb-6 pt-1 space-y-4 border-t border-line">{children}</div>
      </div>
    </div>
  </section>
);

export const HubWikiPage: React.FC<{ herbSlug: string }> = ({ herbSlug }) => {
  const navigate = useNavigate();
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

  // Gộp sâu bệnh từ dữ liệu cây (§6) và dữ liệu hub, khử trùng theo tên.
  const pestRows = [
    ...herb.pests.map((p) => ({ name: p.pestName, level: p.level, symptom: p.symptom, remedy: p.remedy })),
    ...hub.pests
      .filter((hp) => !herb.pests.some((p) => p.pestName === hp.pestName))
      .map((hp) => ({ name: hp.pestName, level: undefined as string | undefined, symptom: hp.symptoms, remedy: hp.remedy })),
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
    <div className="space-y-8 animate-fade-in">
      <Seo {...hubSeo(hub, herb.image)} />
      <Breadcrumb items={[
        { label: "Trang chủ", onClick: () => navigate(paths.home()) },
        { label: "Kiến thức", onClick: () => navigate(paths.knowledge()) },
        { label: `Kỹ thuật trồng ${herb.name}` },
      ]} />

      {/* Hero — chữ + ảnh thật của cây, cân bằng cảm giác "toàn chữ".
          Ảnh giữ tỉ lệ cố định mọi kích thước (không dùng aspect-auto) để không phình
          theo chiều cao gốc ảnh dọc làm vỡ layout; grid canh trên để 2 cột cao độc lập. */}
      <section className="grid md:grid-cols-2 gap-5 md:gap-6 md:items-start">
        <div className="order-1 md:order-2 rounded-2xl overflow-hidden border border-line bg-sand aspect-[16/10]">
          <img
            src={asset(herb.image)}
            alt={`Cây ${herb.name} (${herb.scientificName}) — kỹ thuật trồng và chăm sóc`}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
        <div className="order-2 md:order-1 bg-gradient-to-br from-sand to-paper border border-line rounded-2xl p-6 md:p-8 space-y-3">
          <span className="text-terracotta font-mono text-xs font-bold uppercase tracking-[0.15em] block mb-1">// Học liệu thực địa nông học</span>
          <h1 className="font-serif text-2xl md:text-4xl font-extrabold text-ink-soft tracking-tight">{hub.title}</h1>
          <p className="text-gray-700 text-base font-sans leading-relaxed">{hub.intro}</p>
        </div>
      </section>

      {/* Thông số nhanh — cho đọc lướt trên mobile mà không cần bung mục */}
      <section aria-label="Thông số kỹ thuật nhanh" className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { k: "Thời vụ trồng", v: t.season },
          { k: "Đất phù hợp", v: t.soil },
          { k: "Độ pH đất", v: t.ph },
          { k: "Mật độ trồng", v: t.density },
          { k: "Thời gian thu hoạch", v: t.harvestTime },
          { k: "Năng suất tham khảo", v: t.yield },
          { k: "Nhân giống", v: t.propagation.join(", ") },
          { k: "Nhóm dược liệu", v: GROUP_LABEL[herb.group] ?? "dược liệu" },
        ].map((it) => (
          <div key={it.k} className="bg-white border border-line rounded-xl p-3.5">
            <div className="text-[11px] font-sans font-semibold uppercase tracking-wide text-gray-500 mb-1">{it.k}</div>
            <div className="text-sm font-sans font-medium text-ink-soft leading-snug">{it.v}</div>
          </div>
        ))}
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
            <DataTable
              headers={["Yếu tố canh tác", "Yêu cầu kỹ thuật"]}
              rows={[
                ["Thời vụ trồng", t.season],
                ["Đất phù hợp", t.soil],
                ["Độ pH đất", t.ph],
                ["Mật độ trồng", t.density],
                ["Cách nhân giống", t.propagation.join(", ")],
                ["Thời gian thu hoạch", t.harvestTime],
                ["Năng suất tham khảo", t.yield],
              ].map(([k, v]) => [
                <strong className="text-ink-soft font-sans">{k}</strong>,
                <span className="text-ink">{v}</span>,
              ])}
            />
          </AccordionSection>

          {/* 3. Chăm sóc đạt chuẩn (dữ liệu hub) */}
          <AccordionSection id="sec-cham-soc" icon={Droplets} title="Quy trình kiểm soát chất lượng & chăm sóc đạt chuẩn GACP-WHO" open={openSections.has("sec-cham-soc")} onToggle={toggle}>
            <p className="text-sm text-gray-600 font-sans">
              Các mốc kiểm soát trong canh tác {herb.name} theo hướng hữu cơ, không tồn dư hóa chất:
            </p>
            <DataTable
              headers={["Giai đoạn canh tác", "Yêu cầu tiêu chuẩn kỹ thuật", "Phương pháp xử lý"]}
              rows={hub.standards.map((s) => [
                <strong className="text-ink-soft font-sans">{s.stage}</strong>,
                s.criteria,
                <span className="text-sm text-gray-600">{s.controlMethod}</span>,
              ])}
            />
          </AccordionSection>

          {/* 4. Sâu bệnh */}
          <AccordionSection id="sec-sau-benh" icon={Bug} title={`Sâu bệnh hại thường gặp trên ${herb.name} & giải pháp sinh học`} open={openSections.has("sec-sau-benh")} onToggle={toggle}>
            <p className="text-sm text-gray-600 font-sans">
              Ưu tiên biện pháp sinh học, hạn chế tối đa thuốc bảo vệ thực vật hóa học để giữ dược tính sạch:
            </p>
            <DataTable
              headers={["Tên sâu bệnh", "Mức độ", "Triệu chứng nhận diện", "Phác đồ xử lý hữu cơ"]}
              rows={pestRows.map((p) => [
                <strong className="text-terracotta font-sans">{p.name}</strong>,
                <span className="text-xs font-semibold text-ink-soft bg-sand px-2 py-0.5 rounded whitespace-nowrap">
                  {p.level ? PEST_LEVEL_LABEL[p.level] ?? p.level : "—"}
                </span>,
                <span className="text-sm text-gray-600">{p.symptom}</span>,
                <span className="text-sm text-ink">{p.remedy}</span>,
              ])}
            />
          </AccordionSection>

          {/* 5. Thu hoạch & sơ chế */}
          <AccordionSection id="sec-thu-hoach" icon={Package} title={`Thu hoạch, sơ chế & bảo quản ${herb.name}`} open={openSections.has("sec-thu-hoach")} onToggle={toggle}>
            <div className="text-ink text-base leading-relaxed space-y-4 font-sans">
              <p>
                Cây {herb.name} cho thu hoạch sau <strong>{t.harvestTime}</strong>, năng suất tham khảo đạt{" "}
                <strong>{t.yield}</strong>. Thu đúng độ tuổi giúp hàm lượng hoạt chất đạt đỉnh và giữ giá bán tốt nhất.
              </p>
              <p>Để lô hàng đạt chuẩn nhập kho, bà con lưu ý các tiêu chí sau khi sơ chế và bảo quản:</p>
              <ul className="space-y-2.5 pl-1">
                {herb.standards.map((std, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-ink text-base leading-relaxed">
                    <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-1">✓</div>
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
                thể tham khảo bảng giá phân loại chi tiết ngay tại trang định giá của cây. Với các đơn vị bao tiêu quy mô
                như {PARTNER_COMPANY.name}, hàng đạt chuẩn GACP-WHO thường được thu mua theo hợp đồng dài hạn với giá ổn định.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate(paths.herb(herb.slug))}
                  className="bg-terracotta hover:bg-terracotta-dark text-white font-sans font-bold text-sm px-5 py-3 rounded-lg shadow-2xs transition-all inline-flex items-center justify-center gap-1 cursor-pointer"
                >
                  Xem bảng giá thu mua {herb.name} →
                </button>
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

          {/* Related posts */}
          <section className="space-y-4 pt-6">
            <h3 className="font-serif text-xl font-bold text-ink-soft">Tài liệu chế biến &amp; phân tích liên quan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {WIKI_ARTICLES.filter((a) => a.id !== "ky-thuat-say-duoc-lieu").map((art) => (
                <div
                  key={art.id}
                  onClick={() => navigate(paths.article(art.id))}
                  className="border border-line hover:border-terracotta p-4 rounded-xl cursor-pointer bg-white hover:bg-paper-2 transition-all flex items-start gap-3 group"
                >
                  <div className="w-8 h-8 rounded bg-sand flex items-center justify-center text-terracotta shrink-0 mt-0.5">
                    <FileText className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h5 className="font-sans font-bold text-sm text-ink-soft group-hover:text-terracotta transition-colors line-clamp-2">{art.title}</h5>
                    <span className="text-xs text-gray-500 font-mono mt-1 block">{art.readTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
