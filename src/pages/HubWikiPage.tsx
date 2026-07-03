import React, { useState } from "react";
import { FileText } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { HERBS_DATA, PARTNER_COMPANY, SITE_OWNER, WIKI_ARTICLES, WIKI_HUBS } from "../lib/data";
import { Breadcrumb, DataTable, StickyToc } from "../components/ui";
import { paths } from "../lib/paths";
import { Seo, hubSeo } from "../lib/seo";

export const HubWikiPage: React.FC = () => {
  const { cay = "" } = useParams();
  const navigate = useNavigate();
  const [activeTocSection, setActiveTocSection] = useState("sec-1");

  const herb = HERBS_DATA.find((h) => h.slug === cay) || HERBS_DATA[0];
  const hub = WIKI_HUBS.find((h) => h.herbSlug === cay) || WIKI_HUBS[0];

  const sections = [
    { id: "sec-1", label: "1. Giới thiệu tổng quan" },
    { id: "sec-2", label: "2. Quy trình gieo trồng đạt chuẩn GACP" },
    { id: "sec-3", label: "3. Các bệnh hại thường gặp & Giải pháp hữu cơ" },
    { id: "sec-4", label: "4. Thị trường đầu ra và bao tiêu từ nhà máy" },
  ];

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
          <StickyToc
            items={sections}
            activeId={activeTocSection}
            onSelect={(id) => {
              setActiveTocSection(id);
              const el = document.getElementById(id);
              if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
            }}
          />
        </div>

        <div className="lg:col-span-3 space-y-12">
          {/* Section 1 */}
          <section id="sec-1" className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#4F433A] border-b border-[#F0EAE1] pb-2">
              1. Giới thiệu tổng quan cây dược liệu {herb.name}
            </h2>
            <div className="text-[#2D2521] text-base leading-relaxed space-y-4 font-sans">
              <p>
                Canh tác cây {herb.name} theo quy chuẩn sạch đòi hỏi sự tỉ mỉ ngay từ khâu đầu tiên tuyển chọn giống cây mô để đảm bảo sức chống chịu bệnh xuất sắc và lượng hoạt chất tích tụ dồi dào.
              </p>
              <p>
                So với trồng hoa màu thông thường, cây dược sâm {herb.name} mang lại giá trị gia tăng kinh tế cao gấp 3 - 5 lần trên cùng một diện tích canh tác sào ruộng. Để đảm bảo không bị thương lái thu gom bùng hủy hợp đồng ép rẻ, tôi (<strong className="text-[#4F433A]">{SITE_OWNER}</strong>) luôn khuyên bà con bám sát quy trình tập huấn sau để đạt chuẩn định lượng hóa nghiệm của các công ty lớn.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section id="sec-2" className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#4F433A] border-b border-[#F0EAE1] pb-2">
              2. Quy trình kiểm soát chất lượng gieo trồng bón thúc đạt chuẩn GACP-WHO
            </h2>
            <p className="text-sm text-gray-600 font-sans">
              Quy trình được chuẩn hóa nghiêm ngặt bởi ban cố vấn kỹ thuật và kỹ sư đồng ruộng tại nhà máy chiết xuất {PARTNER_COMPANY.name}:
            </p>
            <DataTable
              headers={["Giai đoạn canh tác", "Yêu cầu tiêu chuẩn kỹ thuật", "Giải pháp phương pháp xử lý"]}
              rows={hub.standards.map((s) => [
                <strong className="text-[#4F433A] font-sans">{s.stage}</strong>,
                s.criteria,
                <span className="text-sm text-gray-600">{s.controlMethod}</span>,
              ])}
            />
          </section>

          {/* Section 3 */}
          <section id="sec-3" className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#4F433A] border-b border-[#F0EAE1] pb-2">
              3. Các bệnh hại sinh vật hại thường gặp &amp; Giải pháp xử lý vi sinh hữu cơ
            </h2>
            <p className="text-sm text-gray-600 font-sans">
              Tuyệt đối không phun thuốc bảo vệ thực vật hóa học lân hữu cơ gây ngộ độc dược tính thô, khuyến khích thay thế 100% bằng giải pháp sinh học thảo mộc:
            </p>
            <DataTable
              headers={["Tên sâu bệnh hại", "Triệu chứng đặc điểm nhận diện", "Phác đồ điều trị vi sinh hữu cơ lành tính"]}
              rows={hub.pests.map((p) => [
                <strong className="text-[#B85037] font-sans">{p.pestName}</strong>,
                p.symptoms,
                <span className="text-sm text-[#2D2521] font-sans">{p.remedy}</span>,
              ])}
            />
          </section>

          {/* Section 4 */}
          <section id="sec-4" className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#4F433A] border-b border-[#F0EAE1] pb-2">
              4. Thị trường thu mua bao tiêu dược liệu {herb.name} sau thu hoạch
            </h2>
            <div className="bg-[#FAF8F5] p-6 rounded-xl border border-[#E6DDD0] space-y-4">
              <p className="text-[#2D2521] text-base leading-relaxed font-sans">
                Sản phẩm {herb.name} sau thu hoạch bánh tẻ phải sấy sấy điện lò điện đạt dải độ ẩm chuẩn sừng dưới 11-12% trước khi chuyển tới xe container. Bà con nông hộ có thể xem hướng dẫn định giá chi tiết các phân loại rễ tươi sấy râm củ to nhỏ ngay tại trang định giá của cây.
              </p>
              <button
                onClick={() => navigate(paths.herb(herb.slug))}
                className="bg-[#B85037] hover:bg-[#9F3E28] text-white font-sans font-bold text-sm px-5 py-3 rounded-lg shadow-2xs transition-all inline-flex items-center gap-1 cursor-pointer"
              >
                Xem bảng giá thu mua &amp; Điểm thu gom {herb.name} →
              </button>
            </div>
          </section>

          {/* Related posts */}
          <section className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-[#4F433A]">Các tài liệu chế biến &amp; phân tích liên quan khác</h3>
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
