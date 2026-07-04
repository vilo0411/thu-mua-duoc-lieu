import React, { useState } from "react";
import { FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { HERBS_DATA, PARTNER_COMPANY, WIKI_ARTICLES, WIKI_HUBS } from "../lib/data";
import { Breadcrumb, DataTable, FaqAccordion, LandingLink, StickyToc } from "../components/ui";
import { paths } from "../lib/paths";
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

export const HubWikiPage: React.FC<{ herbSlug: string }> = ({ herbSlug }) => {
  const navigate = useNavigate();
  const [activeTocSection, setActiveTocSection] = useState("sec-gioi-thieu");

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

  const sections = [
    { id: "sec-gioi-thieu", label: "1. Giới thiệu tổng quan" },
    { id: "sec-dieu-kien", label: "2. Điều kiện & kỹ thuật trồng" },
    { id: "sec-cham-soc", label: "3. Quy trình chăm sóc đạt chuẩn" },
    { id: "sec-sau-benh", label: "4. Sâu bệnh & giải pháp" },
    { id: "sec-thu-hoach", label: "5. Thu hoạch & sơ chế" },
    { id: "sec-thi-truong", label: "6. Thị trường thu mua" },
    { id: "sec-faq", label: "7. Câu hỏi thường gặp" },
  ];

  const scrollTo = (id: string) => {
    setActiveTocSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="space-y-10 animate-fade-in">
      <Seo {...hubSeo(hub, herb.image)} />
      <Breadcrumb items={[
        { label: "Trang chủ", onClick: () => navigate(paths.home()) },
        { label: "Kiến thức", onClick: () => navigate(paths.knowledge()) },
        { label: `Kỹ thuật trồng ${herb.name}` },
      ]} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#F5ECE1] to-[#FDFBF9] border border-[#E6DDD0] rounded-2xl p-6 md:p-10 space-y-3">
        <span className="text-[#B85037] text-xs font-bold uppercase tracking-wider block">Học liệu thực địa nông học</span>
        <h1 className="font-serif text-2xl md:text-4xl font-extrabold text-[#4F433A] tracking-tight">{hub.title}</h1>
        <p className="text-gray-700 text-base font-sans leading-relaxed">{hub.intro}</p>
      </section>

      {/* Main Content with Sticky TOC */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="hidden lg:block lg:col-span-1">
          <StickyToc items={sections} activeId={activeTocSection} onSelect={scrollTo} />
        </div>

        <div className="lg:col-span-3 space-y-12">
          {/* 1. Giới thiệu */}
          <section id="sec-gioi-thieu" className="space-y-4 scroll-mt-24">
            <h2 className="font-serif text-2xl font-bold text-[#4F433A] border-b border-[#F0EAE1] pb-2">
              1. Giới thiệu tổng quan cây {herb.name}
            </h2>
            <div className="text-[#2D2521] text-base leading-relaxed space-y-4 font-sans">
              <p>{herb.bioCharacteristics}</p>
              <p>
                Thuộc {GROUP_LABEL[herb.group] ?? "nhóm dược liệu"}, {herb.name} ({herb.scientificName}
                {herb.otherNames.length > 0 ? `; còn gọi là ${herb.otherNames.join(", ")}` : ""}) có giá trị sử dụng
                đa dạng: {herb.usageValue}
              </p>
            </div>
          </section>

          {/* 2. Điều kiện & kỹ thuật trồng */}
          <section id="sec-dieu-kien" className="space-y-4 scroll-mt-24">
            <h2 className="font-serif text-2xl font-bold text-[#4F433A] border-b border-[#F0EAE1] pb-2">
              2. Điều kiện sinh thái & kỹ thuật gieo trồng {herb.name}
            </h2>
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
                <strong className="text-[#4F433A] font-sans">{k}</strong>,
                <span className="text-[#2D2521]">{v}</span>,
              ])}
            />
          </section>

          {/* 3. Chăm sóc đạt chuẩn (dữ liệu hub) */}
          <section id="sec-cham-soc" className="space-y-4 scroll-mt-24">
            <h2 className="font-serif text-2xl font-bold text-[#4F433A] border-b border-[#F0EAE1] pb-2">
              3. Quy trình kiểm soát chất lượng &amp; chăm sóc đạt chuẩn GACP-WHO
            </h2>
            <p className="text-sm text-gray-600 font-sans">
              Các mốc kiểm soát trong canh tác {herb.name} theo hướng hữu cơ, không tồn dư hóa chất:
            </p>
            <DataTable
              headers={["Giai đoạn canh tác", "Yêu cầu tiêu chuẩn kỹ thuật", "Phương pháp xử lý"]}
              rows={hub.standards.map((s) => [
                <strong className="text-[#4F433A] font-sans">{s.stage}</strong>,
                s.criteria,
                <span className="text-sm text-gray-600">{s.controlMethod}</span>,
              ])}
            />
          </section>

          {/* 4. Sâu bệnh */}
          <section id="sec-sau-benh" className="space-y-4 scroll-mt-24">
            <h2 className="font-serif text-2xl font-bold text-[#4F433A] border-b border-[#F0EAE1] pb-2">
              4. Sâu bệnh hại thường gặp trên {herb.name} &amp; giải pháp sinh học
            </h2>
            <p className="text-sm text-gray-600 font-sans">
              Ưu tiên biện pháp sinh học, hạn chế tối đa thuốc bảo vệ thực vật hóa học để giữ dược tính sạch:
            </p>
            <DataTable
              headers={["Tên sâu bệnh", "Mức độ", "Triệu chứng nhận diện", "Phác đồ xử lý hữu cơ"]}
              rows={pestRows.map((p) => [
                <strong className="text-[#B85037] font-sans">{p.name}</strong>,
                <span className="text-xs font-semibold text-[#4F433A] bg-[#F5ECE1] px-2 py-0.5 rounded whitespace-nowrap">
                  {p.level ? PEST_LEVEL_LABEL[p.level] ?? p.level : "—"}
                </span>,
                <span className="text-sm text-gray-600">{p.symptom}</span>,
                <span className="text-sm text-[#2D2521]">{p.remedy}</span>,
              ])}
            />
          </section>

          {/* 5. Thu hoạch & sơ chế */}
          <section id="sec-thu-hoach" className="space-y-4 scroll-mt-24">
            <h2 className="font-serif text-2xl font-bold text-[#4F433A] border-b border-[#F0EAE1] pb-2">
              5. Thu hoạch, sơ chế &amp; bảo quản {herb.name}
            </h2>
            <div className="text-[#2D2521] text-base leading-relaxed space-y-4 font-sans">
              <p>
                Cây {herb.name} cho thu hoạch sau <strong>{t.harvestTime}</strong>, năng suất tham khảo đạt{" "}
                <strong>{t.yield}</strong>. Thu đúng độ tuổi giúp hàm lượng hoạt chất đạt đỉnh và giữ giá bán tốt nhất.
              </p>
              <p>Để lô hàng đạt chuẩn nhập kho, bà con lưu ý các tiêu chí sau khi sơ chế và bảo quản:</p>
              <ul className="space-y-2.5 pl-1">
                {herb.standards.map((std, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[#2D2521] text-base leading-relaxed">
                    <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-1">✓</div>
                    <span>{std}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 6. Thị trường thu mua — mention natural + landing (PRD Appendix C) */}
          <section id="sec-thi-truong" className="space-y-4 scroll-mt-24">
            <h2 className="font-serif text-2xl font-bold text-[#4F433A] border-b border-[#F0EAE1] pb-2">
              6. Thị trường thu mua &amp; bao tiêu {herb.name} sau thu hoạch
            </h2>
            <div className="bg-[#FAF8F5] p-6 rounded-xl border border-[#E6DDD0] space-y-4">
              <p className="text-[#2D2521] text-base leading-relaxed font-sans">
                Sau thu hoạch, {herb.name} cần được sơ chế và sấy đạt độ ẩm chuẩn trước khi giao cho đầu mối. Bà con có
                thể tham khảo bảng giá phân loại chi tiết ngay tại trang định giá của cây. Với các đơn vị bao tiêu quy mô
                như {PARTNER_COMPANY.name}, hàng đạt chuẩn GACP-WHO thường được thu mua theo hợp đồng dài hạn với giá ổn định.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate(paths.herb(herb.slug))}
                  className="bg-[#B85037] hover:bg-[#9F3E28] text-white font-sans font-bold text-sm px-5 py-3 rounded-lg shadow-2xs transition-all inline-flex items-center justify-center gap-1 cursor-pointer"
                >
                  Xem bảng giá thu mua {herb.name} →
                </button>
                <LandingLink
                  cay={herb.slug}
                  pageType="hub_wiki"
                  ctaPosition="hub_mention"
                  className="bg-white border border-[#B85037] hover:bg-[#B85037] hover:text-white text-[#B85037] font-sans font-bold text-sm px-5 py-3 rounded-lg transition-all inline-flex items-center justify-center gap-1"
                />
              </div>
            </div>
          </section>

          {/* 7. FAQ */}
          <section id="sec-faq" className="space-y-4 scroll-mt-24">
            <h2 className="font-serif text-2xl font-bold text-[#4F433A] border-b border-[#F0EAE1] pb-2">
              7. Câu hỏi thường gặp khi trồng {herb.name}
            </h2>
            <FaqAccordion items={hub.faq} />
          </section>

          {/* Related posts */}
          <section className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#4F433A]">Tài liệu chế biến &amp; phân tích liên quan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {WIKI_ARTICLES.filter((a) => a.id !== "ky-thuat-say-duoc-lieu").map((art) => (
                <div
                  key={art.id}
                  onClick={() => navigate(paths.article(art.id))}
                  className="border border-[#E6DDD0] hover:border-[#B85037] p-4 rounded-xl cursor-pointer bg-white hover:bg-[#FAF8F4] transition-all flex items-start gap-3 group"
                >
                  <div className="w-8 h-8 rounded bg-[#F5ECE1] flex items-center justify-center text-[#B85037] shrink-0 mt-0.5">
                    <FileText className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h5 className="font-sans font-bold text-sm text-[#4F433A] group-hover:text-[#B85037] transition-colors line-clamp-2">{art.title}</h5>
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
