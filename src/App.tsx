import React, { useState, useEffect } from "react";
import { 
  Search, 
  Menu, 
  X, 
  Leaf, 
  ArrowRight, 
  TrendingUp, 
  BookOpen, 
  Award, 
  MapPin, 
  Info, 
  User, 
  Phone, 
  Mail,
  ShieldCheck,
  Zap,
  Globe,
  Share2,
  Bookmark,
  ExternalLink,
  ChevronRight,
  FileText,
  AlertTriangle
} from "lucide-react";

import { ActivePage, HerbalMedicine, RegionData, WikiArticle, WikiHub } from "./types";
import { 
  SITE_OWNER, 
  OWNER_EMAIL, 
  OWNER_URL, 
  PARTNER_COMPANY, 
  HERBS_DATA, 
  REGIONS_DATA, 
  WIKI_ARTICLES, 
  WIKI_HUBS 
} from "./data/mockData";

import {
  DataTable,
  InfoBox,
  CtaBanner,
  FeaturedPartnerCard,
  NeutralPartnerCard,
  HerbCard,
  ArticleCard,
  Breadcrumb,
  FaqAccordion,
  StickyToc,
  RegionLinkCard,
  BottomMobileCtaBar,
  ShipmentModal
} from "./components/KeyComponents";

export default function App() {
  // Navigation State
  const [activePage, setActivePage] = useState<ActivePage>({ type: "home" });
  
  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [searchResults, setSearchResults] = useState<HerbalMedicine[]>([]);

  // UI States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDemoDock, setShowDemoDock] = useState(true);
  const [isShipmentModalOpen, setIsShipmentModalOpen] = useState(false);
  const [selectedHerbForModal, setSelectedHerbForModal] = useState("Đinh lăng");
  const [activeTocSection, setActiveTocSection] = useState("sec-1");

  // Scroll to top on page change
  const navigateTo = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileMenuOpen(false);
    setShowSearchDropdown(false);
    setSearchQuery("");
  };

  // Handle Search input
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const filtered = HERBS_DATA.filter(h => 
        h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.shortDesc.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Open general lead shipment modal
  const triggerShipmentModal = (herbName: string = "Đinh lăng") => {
    setSelectedHerbForModal(herbName);
    setIsShipmentModalOpen(true);
  };

  // Render Functions for distinct pages
  
  // ──── 1. HOMEPAGE ────
  const renderHomePage = () => {
    return (
      <div className="space-y-12 animate-fade-in">
        {/* Hero Section */}
        <section id="homepage-hero" className="relative bg-gradient-to-br from-[#FDFBF9] via-[#FBF7F0] to-[#F5ECE1] border-b border-[#E6DDD0] py-16 md:py-24 overflow-hidden rounded-2xl p-6 md:p-12 my-4">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#B85037]/5 rounded-full -mr-32 -mt-32 pointer-events-none" />
          <div className="absolute left-0 bottom-0 w-80 h-80 bg-[#D08620]/5 rounded-full -ml-32 -mb-32 pointer-events-none" />
          
          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5ECE1] border border-[#E6DDD0] text-[#B85037]">
              <Leaf className="w-4 h-4 shrink-0 animate-pulse" />
              <span className="font-sans font-semibold text-xs tracking-wider uppercase">Kiến thức nông nghiệp độc lập & Kết nối bao tiêu</span>
            </div>
            
            <h1 className="font-serif text-3xl md:text-5xl font-extrabold text-[#4F433A] leading-tight tracking-tight">
              Bảo Tồn Dược Liệu Việt,<br />
              <span className="text-[#B85037]">Đảm Bảo Đầu Ra</span> Bền Vững Cho Bà Con
            </h1>
            
            <p className="text-[#2D2521] text-lg md:text-xl font-sans leading-relaxed max-w-2xl">
              Cổng thông tin chuyên biệt chia sẻ kỹ thuật trồng dược liệu đạt chuẩn GACP-WHO và cập nhật bảng giá thu mua minh bạch từ các nhà máy sấy lớn của tập đoàn dược liệu Việt Nam <strong className="text-[#B85037]">{PARTNER_COMPANY.name}</strong>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                id="hero-primary-cta"
                onClick={() => navigateTo({ type: "pillar" })}
                className="bg-[#B85037] hover:bg-[#9F3E28] text-white font-sans font-bold text-base px-8 py-4 rounded-lg shadow-md transition-all transform hover:scale-[1.02] cursor-pointer text-center inline-flex items-center justify-center gap-2"
              >
                <span>Xem giá thu mua hôm nay</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                id="hero-secondary-cta"
                onClick={() => navigateTo({ type: "wiki-article", topic: "ky-thuat-say-duoc-lieu-chuan-gacp" })}
                className="bg-white border border-[#E6DDD0] hover:border-[#B85037] text-[#4F433A] hover:text-[#B85037] font-sans font-semibold text-base px-8 py-4 rounded-lg shadow-2xs transition-all text-center cursor-pointer"
              >
                Tìm hiểu kỹ thuật sấy chuẩn
              </button>
            </div>
          </div>
        </section>

        {/* 3-Column Value Props with Icons */}
        <section id="homepage-value-props" className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-[#E6DDD0] rounded-xl p-6 space-y-3 shadow-2xs">
            <div className="w-12 h-12 rounded-lg bg-[#FAF6F0] flex items-center justify-center text-[#B85037]">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#4F433A]">Giá thu mua cập nhật</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Theo dõi biến động thị trường dược liệu thực tế tại các vùng trồng, giá phân loại rõ ràng theo chất lượng củ rễ, thân cành hay lá khô khô ráo.
            </p>
          </div>
          
          <div className="bg-white border border-[#E6DDD0] rounded-xl p-6 space-y-3 shadow-2xs">
            <div className="w-12 h-12 rounded-lg bg-[#FAF6F0] flex items-center justify-center text-[#D08620]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#4F433A]">Kết nối đầu mối uy tín</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Hỗ trợ kết nối trực tiếp với phòng thu mua của <strong className="text-[#B85037]">{PARTNER_COMPANY.name}</strong> - đơn vị bao tiêu xuất khẩu chính ngạch uy tín lâu đời tại Việt Nam.
            </p>
          </div>

          <div className="bg-white border border-[#E6DDD0] rounded-xl p-6 space-y-3 shadow-2xs">
            <div className="w-12 h-12 rounded-lg bg-[#FAF6F0] flex items-center justify-center text-[#B85037]">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#4F433A]">Kỹ thuật thực địa chuyên sâu</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Cẩm nang canh tác nông sản sạch đạt GACP-WHO, từ tuyển chọn giống cấy mô, xử lý mốc rễ hữu cơ đến công nghệ chưng cất sấy điện chất lượng cao.
            </p>
          </div>
        </section>

        {/* Featured Herbs Grid (6-8 cards) */}
        <section id="homepage-featured-herbs" className="space-y-6">
          <div className="flex flex-col sm:flex-row items-baseline justify-between gap-2 border-b border-[#F0EAE1] pb-4">
            <div>
              <span className="text-[#B85037] text-xs font-bold uppercase tracking-wider block mb-1">Cây thuốc thế mạnh</span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#4F433A] tracking-tight">
                Danh mục thảo dược thu mua chính
              </h2>
            </div>
            <button 
              onClick={() => navigateTo({ type: "pillar" })}
              className="text-[#B85037] hover:text-[#9F3E28] text-sm font-bold inline-flex items-center gap-1 hover:underline cursor-pointer"
            >
              Xem toàn bộ bảng giá cây thuốc <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HERBS_DATA.slice(0, 8).map((herb) => (
              <HerbCard
                key={herb.id}
                name={herb.name}
                scientificName={herb.scientificName}
                priceRange={herb.priceRange}
                shortDesc={herb.shortDesc}
                image={herb.image}
                onClick={() => navigateTo({ type: "money-cay", cay: herb.slug })}
              />
            ))}
          </div>
        </section>

        {/* Trust Section: 4-5 criteria with icons */}
        <section id="homepage-trust" className="bg-[#FAF8F5] border border-[#E6DDD0] rounded-2xl p-8 md:p-10 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[#B85037] text-xs font-bold uppercase tracking-wider block">Kinh nghiệm thực tế</span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#4F433A]">
              Tiêu chí chọn nơi thu mua dược liệu uy tín
            </h2>
            <p className="text-gray-600 text-sm md:text-base font-sans">
              Tôi (<strong className="text-[#4F433A]">{SITE_OWNER}</strong>) đúc kết các bài học xương máu giúp bà con nông dân nhận diện đối tác tin cậy, tránh bẫy của thương lái ép giá.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="flex gap-4">
              <div className="w-10 h-10 shrink-0 rounded-full bg-[#B85037]/10 text-[#B85037] flex items-center justify-center font-bold">
                1
              </div>
              <div className="space-y-1">
                <h4 className="font-sans font-bold text-base text-[#4F433A]">Cam kết bao tiêu bằng văn bản pháp lý</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Tránh xa các lời hứa hẹn truyền miệng. Một đơn vị thu mua chuẩn phải có hợp đồng mua bán rõ ràng, cam kết mức giá bảo hiểm sàn từ đầu vụ gieo giống.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 shrink-0 rounded-full bg-[#B85037]/10 text-[#B85037] flex items-center justify-center font-bold">
                2
              </div>
              <div className="space-y-1">
                <h4 className="font-sans font-bold text-base text-[#4F433A]">Sở hữu nhà máy chiết xuất công nghiệp</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Các doanh nghiệp lớn như <strong className="text-[#B85037]">{PARTNER_COMPANY.name}</strong> sở hữu nhà máy GMP-WHO khổng lồ, luôn cần nguồn cung nguyên liệu cực lớn và liên tục để vận hành máy móc sấy chiết, đảm bảo sức mua bền vững.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 shrink-0 rounded-full bg-[#B85037]/10 text-[#B85037] flex items-center justify-center font-bold">
                3
              </div>
              <div className="space-y-1">
                <h4 className="font-sans font-bold text-base text-[#4F433A]">Phân loại chất lượng và bảng giá cụ thể</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Bảng giá phải phân chia rõ ràng theo kích thước củ, bộ phận già trẻ và độ ẩm sấy khô. Mọi quy chuẩn kiểm định hóa nghiệm dược tính phải minh bạch và thống nhất tại phòng lab.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 shrink-0 rounded-full bg-[#B85037]/10 text-[#B85037] flex items-center justify-center font-bold">
                4
              </div>
              <div className="space-y-1">
                <h4 className="font-sans font-bold text-base text-[#4F433A]">Đồng hành chuyển giao kỹ thuật trồng</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Họ sẵn sàng cử kỹ sư nông nghiệp giàu kinh nghiệm về tận vườn, hỗ trợ hướng dẫn bà con phòng trừ sâu bệnh bằng vi sinh hữu cơ để sản phẩm đầu ra đạt yêu cầu kiểm tra dư lượng.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Knowledge Posts (4 large cards) */}
        <section id="homepage-articles" className="space-y-6">
          <div className="flex flex-col sm:flex-row items-baseline justify-between gap-2 border-b border-[#F0EAE1] pb-4">
            <div>
              <span className="text-[#B85037] text-xs font-bold uppercase tracking-wider block mb-1">Kiến thức quý báu</span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#4F433A] tracking-tight">
                Kiến thức canh tác nổi bật từ Nguyễn Việt Lộc
              </h2>
            </div>
            <button 
              onClick={() => navigateTo({ type: "wiki-article", topic: "ky-thuat-say-duoc-lieu-chuan-gacp" })}
              className="text-[#B85037] hover:text-[#9F3E28] text-sm font-bold inline-flex items-center gap-1 hover:underline cursor-pointer"
            >
              Đọc toàn bộ cẩm nang nông nghiệp <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {WIKI_ARTICLES.slice(0, 2).map((art) => (
              <ArticleCard
                key={art.id}
                title={art.title}
                category={art.category}
                excerpt={art.excerpt}
                image={art.image}
                readTime={art.readTime}
                author={art.author}
                date={art.date}
                onClick={() => navigateTo({ type: "wiki-article", topic: art.id })}
              />
            ))}
          </div>
        </section>

        {/* Full-width CTA Banner */}
        <CtaBanner
          title="Có thảo dược chín muồi cần đầu ra bao tiêu?"
          description={`Liên hệ ngay phòng thu mua nguyên liệu của tập đoàn ${PARTNER_COMPANY.name} để gửi đăng ký thông số lô hàng nông sản và nhận báo giá sàn bảo lãnh tốt nhất khu vực.`}
          buttonText="Gửi thông tin lô hàng ngay"
          onClick={() => triggerShipmentModal()}
        />

        {/* Latest posts feed */}
        <section id="latest-posts" className="space-y-4">
          <h3 className="font-serif text-xl font-bold text-[#4F433A] border-b border-[#F0EAE1] pb-2">Báo cáo thực địa & Tin tức mới</h3>
          <div className="divide-y divide-gray-150 bg-white border border-[#E6DDD0] rounded-xl p-5 shadow-2xs">
            <div className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
              <div>
                <span className="text-xs text-[#B85037] font-semibold uppercase tracking-wider">Cập nhật 02/07/2026</span>
                <h5 className="font-sans font-bold text-base text-[#4F433A] hover:text-[#B85037] transition-colors cursor-pointer mt-1" onClick={() => navigateTo({ type: "money-cay", cay: "ba-kich" })}>
                  Khảo sát vùng trồng Ba kích tím tại huyện Ba Chẽ, Quảng Ninh: Hàm lượng hoạt chất anthraglycosid tăng mạnh nhờ mùa mưa sớm.
                </h5>
              </div>
              <span className="text-xs text-gray-400 font-mono shrink-0">Nguyễn Việt Lộc</span>
            </div>
            <div className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
              <div>
                <span className="text-xs text-[#D08620] font-semibold uppercase tracking-wider">Thị trường</span>
                <h5 className="font-sans font-bold text-base text-[#4F433A] hover:text-[#B85037] transition-colors cursor-pointer mt-1" onClick={() => navigateTo({ type: "money-cay", cay: "dinh-lang" })}>
                  Nhà máy trung tâm {PARTNER_COMPANY.name} nâng 10% công suất thu mua rễ củ Đinh lăng sấy đạt ẩm &lt;11% phục vụ đơn hàng dược phẩm xuất khẩu.
                </h5>
              </div>
              <span className="text-xs text-gray-400 font-mono shrink-0">Phòng phân tích thị trường</span>
            </div>
            <div className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
              <div>
                <span className="text-xs text-green-600 font-semibold uppercase tracking-wider">Cảnh báo</span>
                <h5 className="font-sans font-bold text-base text-[#4F433A] hover:text-[#B85037] transition-colors cursor-pointer mt-1" onClick={() => navigateTo({ type: "wiki-article", topic: "phan-biet-cay-duoc-lieu-gia" })}>
                  Phát hiện nhiều lô giống Cà gai leo dại giả mạo đạt nồng độ hoạt chất gần bằng không bán trôi nổi trên mạng xã hội tại Nghệ An.
                </h5>
              </div>
              <span className="text-xs text-gray-400 font-mono shrink-0">Ban nông nghiệp HTX</span>
            </div>
          </div>
        </section>
      </div>
    );
  };

  // ──── 2. PILLAR MONEY PAGE ────
  const renderPillarPage = () => {
    return (
      <div className="space-y-10 animate-fade-in">
        <Breadcrumb items={[{ label: "Trang chủ", onClick: () => navigateTo({ type: "home" }) }, { label: "Thu mua dược liệu" }]} />
        
        {/* Compact Hero */}
        <section className="bg-[#F5ECE1] border border-[#E6DDD0] rounded-2xl p-6 md:p-10 space-y-3">
          <h1 className="font-serif text-2xl md:text-4xl font-extrabold text-[#4F433A] tracking-tight">
            Cổng Thông Tin & Bảng Giá Thu Mua Dược Liệu Toàn Quốc
          </h1>
          <p className="text-gray-700 text-base md:text-lg max-w-3xl font-sans leading-relaxed">
            Nơi tổng hợp giá cả giao dịch nông sản, tiêu chuẩn hóa nghiệm dược phẩm tại các nhà máy trung tâm của <strong className="text-[#B85037]">{PARTNER_COMPANY.name}</strong> giúp bà con nông hộ, hợp tác xã bán nông sản đúng giá trị thực tế.
          </p>
        </section>

        {/* Market Overview Section */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-[#4F433A]">Tổng quan tình hình thị trường dược liệu Quý II/2026</h2>
          <div className="bg-white border border-[#E6DDD0] rounded-xl p-5 text-gray-700 leading-relaxed space-y-3">
            <p>
              Hiện nay, nhu cầu thu mua nguyên liệu thô đầu vào đạt tiêu chuẩn GACP-WHO tại các nhà máy sản xuất đông dược trong nước và xuất khẩu đang tăng mạnh, đạt mức tăng trưởng 18% so với cùng kỳ năm ngoái. Tuy nhiên, nguồn cung sạch, canh tác hữu cơ rõ ràng xuất xứ nguồn gốc vẫn đang rơi vào tình trạng khan hiếm nghiêm trọng.
            </p>
            <p>
              Chính vì thế, các tập đoàn lớn như <strong className="text-[#B85037]">{PARTNER_COMPANY.name}</strong> sẵn sàng đẩy cao giá thu mua đối với các lô hàng rễ củ (Đinh lăng, Ba kích, Hà thủ ô) đạt tuổi khai thác chín muồi và được phơi sấy khô sạch tạp chất bằng công nghệ cao lò sấy điện khép kín.
            </p>
          </div>
        </section>

        {/* Full pricing table (interactive, clicking a row goes to that herb's page) */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row items-baseline justify-between gap-2">
            <h3 className="font-serif text-xl font-bold text-[#4F433A]">
              Bảng giá thu mua chi tiết dược liệu hôm nay (Tham khảo tại ruộng)
            </h3>
            <span className="text-xs text-gray-500 italic">Cập nhật liên tục theo ngày bởi chuyên viên thu mua</span>
          </div>

          <DataTable
            headers={["Tên dược liệu", "Bộ phận dùng chính", "Quy cách kỹ thuật chuẩn", "Dải giá hôm nay (VNĐ/kg)", "Xu hướng"]}
            rows={HERBS_DATA.map(herb => {
              const bestPrice = herb.prices[0];
              return [
                <button 
                  onClick={() => navigateTo({ type: "money-cay", cay: herb.slug })}
                  className="font-sans font-bold text-[#B85037] hover:underline hover:text-[#9F3E28] block text-left text-base"
                >
                  {herb.name} (Xem chi tiết →)
                </button>,
                herb.stats.find(s => s.label === "Bộ phận thu hoạch")?.value || "Rễ, củ",
                <span className="text-sm line-clamp-1 text-gray-600">{bestPrice ? bestPrice.specification : "Độ ẩm <12%"}</span>,
                <span className="font-semibold text-[#4F433A]">{bestPrice ? `${bestPrice.priceRange} VNĐ` : herb.priceRange}</span>,
                <span className="inline-flex items-center gap-1 text-green-700 font-bold bg-green-50 px-2 py-1 rounded text-xs uppercase">
                  Tăng ổn định
                </span>
              ];
            })}
          />
        </section>

        {/* Highlighted VIETMEC Partner Card & Neutral Card */}
        <section className="space-y-6">
          <h3 className="font-serif text-xl font-bold text-[#4F433A] border-b border-[#F0EAE1] pb-2">
            Xác minh & Đề xuất đơn vị thu mua uy tín hàng đầu
          </h3>
          <p className="text-sm text-gray-600 font-sans">
            Tôi thường xuyên tổ chức các chuyến đi khảo sát thực địa nhà máy sấy chiết, vùng quy hoạch giống. Dưới đây là đối tác đề xuất tin cậy nhất được bảo lãnh hợp đồng bao tiêu:
          </p>
          <FeaturedPartnerCard herbName="Dược liệu hỗn hợp" />
          <NeutralPartnerCard />
        </section>

        {/* Vùng trồng chính table with links */}
        <section className="space-y-4">
          <h3 className="font-serif text-xl font-bold text-[#4F433A]">Danh sách vùng trồng chính và chỉ số thu hoạch</h3>
          <p className="text-sm text-gray-600">
            Mỗi loại cây thuốc phát triển tốt nhất trên các dải khí hậu thổ nhưỡng chuyên biệt. Nhấp vào tên vùng để xem đặc điểm và danh sách Hợp tác xã liên kết.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {REGIONS_DATA.map((region) => (
              <div 
                key={region.slug}
                onClick={() => navigateTo({ type: "money-vung", cay: "dinh-lang", vung: region.slug })}
                className="bg-white border border-[#E6DDD0] hover:border-[#B85037] p-5 rounded-xl cursor-pointer transition-all shadow-2xs hover:shadow-xs flex justify-between items-center group"
              >
                <div className="space-y-1">
                  <h4 className="font-sans font-bold text-lg text-[#4F433A] group-hover:text-[#B85037] transition-colors flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#B85037]" />
                    Vùng {region.name}
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-1 max-w-sm">Cây thuốc chính: {region.commonHerbs.join(", ")}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-[#B85037] group-hover:translate-x-1 transition-transform" />
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="space-y-4">
          <h3 className="font-serif text-xl font-bold text-[#4F433A] border-b border-[#F0EAE1] pb-2">Bà con hỏi - Nguyễn Việt Lộc giải đáp về thu mua</h3>
          <FaqAccordion
            items={[
              { question: "Quy chuẩn kiểm nghiệm chất lượng rễ củ tại nhà máy VIETMEC thế nào?", answer: "Sản phẩm khi chở về nhà máy sẽ được bốc dỡ mẫu ngẫu nhiên tại 5 điểm của xe container. Mẫu sẽ được đưa ngay vào phòng Lab kiểm nghiệm bằng phương pháp sắc ký lớp mỏng để xác định lượng saponin/hoạt chất sinh học. Song song đó là sấy sừng khô đo độ ẩm <11% và hóa nghiệm xác định dư lượng chì, thạch tín hay chất hóa học bảo vệ thực vật. Nếu đạt toàn bộ mới ký nhận phiếu xuất kho giải ngân thanh toán." },
              { question: "Nông hộ nhỏ lẻ diện tích vài sào thì làm thế nào tham gia chuỗi bao tiêu?", answer: "Đối với nông hộ canh tác nhỏ lẻ quy mô dưới 1 héc-ta, bà con nên chủ động đề xuất ban lãnh đạo nông nghiệp thôn bản kết hợp thành lập một Tổ hợp tác hoặc Hợp tác xã nông nghiệp kiểu mới. Hợp tác xã sẽ là pháp nhân đại diện chung đứng ra ký kết hợp đồng bao tiêu lớn với tập đoàn sấy VIETMEC, đồng hành gom nông sản chuyên nghiệp tiện chuyến container." }
            ]}
          />
        </section>

        <CtaBanner
          title="Đồng hành làm giàu từ đồi núi dốc dược liệu"
          description={`Tham gia ngay chuỗi liên kết bền vững GACP cùng VIETMEC để thoát cảnh 'được mùa mất giá' bấp bênh thương lái ép rẻ.`}
          buttonText="Gửi đăng ký kết nối thu mua"
          onClick={() => triggerShipmentModal("Dược liệu thô")}
        />
      </div>
    );
  };

  // ──── 3. MONEY CÂY PAGE ────
  const renderMoneyCayPage = (slug: string) => {
    const herb = HERBS_DATA.find(h => h.slug === slug);
    if (!herb) return <div className="p-8 text-center text-red-500">Không tìm thấy dữ liệu cây thuốc này.</div>;

    return (
      <div className="space-y-10 animate-fade-in">
        <Breadcrumb items={[
          { label: "Trang chủ", onClick: () => navigateTo({ type: "home" }) },
          { label: "Thu mua dược liệu", onClick: () => navigateTo({ type: "pillar" }) },
          { label: herb.name }
        ]} />

        {/* Hero */}
        <section className="relative bg-gradient-to-r from-[#FDFBF9] to-[#F5ECE1] border border-[#E6DDD0] rounded-2xl p-6 md:p-10 flex flex-col md:flex-row gap-6 items-center">
          <div className="md:w-1/3 aspect-4/3 w-full bg-gray-100 rounded-xl overflow-hidden shadow-xs shrink-0">
            <img 
              src={herb.image} 
              alt={herb.name} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="md:w-2/3 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#FAF6F0] border border-[#E6DDD0] text-xs font-semibold text-[#B85037] font-sans">
              <Leaf className="w-3.5 h-3.5" />
              <span>Cây thuốc trọng điểm quốc gia</span>
            </div>
            <h1 className="font-serif text-2xl md:text-4xl font-extrabold text-[#4F433A] tracking-tight">
              Thị Trường Thu Mua & Bảng Giá Dược Liệu {herb.name}
            </h1>
            <p className="text-gray-600 text-sm italic font-mono">Tên khoa học: {herb.scientificName}</p>
            <p className="text-gray-700 text-base leading-relaxed font-sans">
              {herb.description}
            </p>
          </div>
        </section>

        {/* Quick Info Box */}
        <section className="space-y-4">
          <h3 className="font-serif text-xl font-bold text-[#4F433A]">Thông số đặc điểm thương mại</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {herb.stats.map((stat, idx) => (
              <div key={idx} className="bg-[#FAF8F4] border border-[#E6DDD0] rounded-xl p-4 flex items-center justify-between gap-4">
                <span className="font-sans font-semibold text-[#4F433A] text-sm">{stat.label}</span>
                <span className="font-sans text-[#B85037] font-bold text-base text-right">{stat.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing table color coded by product type */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row items-baseline justify-between gap-2">
            <h3 className="font-serif text-xl font-bold text-[#4F433A]">
              Bảng giá phân hạng thu mua rễ tươi/sấy khô ({herb.name}) hôm nay
            </h3>
            <span className="text-xs text-green-700 font-semibold italic">Đầy đủ các bộ phận giao dịch</span>
          </div>
          
          <DataTable
            headers={["Hạng sản phẩm", "Quy cách mô tả kỹ thuật", "Khoảng giá mua (VNĐ/kg)", "Đơn vị tính"]}
            rows={herb.prices.map(p => [
              <strong className="text-[#4F433A] font-sans">{p.grade}</strong>,
              <span className="text-sm text-gray-600">{p.specification}</span>,
              <span className="font-mono font-bold text-[#B85037] text-base">{p.priceRange}</span>,
              <span className="text-sm text-gray-500 font-sans uppercase">/{p.unit}</span>
            ])}
          />
        </section>

        {/* Featured VIETMEC partner card & neutral card */}
        <section className="space-y-4">
          <h3 className="font-serif text-xl font-bold text-[#4F433A] border-b border-[#F0EAE1] pb-2">Đề xuất kênh bán hàng {herb.name} minh bạch</h3>
          <FeaturedPartnerCard herbName={herb.name} />
          <NeutralPartnerCard />
        </section>

        {/* Standards criteria bullet list */}
        <section className="bg-white border border-[#E6DDD0] rounded-xl p-6 space-y-4">
          <h3 className="font-serif text-xl font-bold text-[#4F433A] flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-green-600" />
            Yêu cầu tiêu chuẩn kiểm định dược phẩm của nhà máy sấy
          </h3>
          <p className="text-sm text-gray-600 font-sans">
            Mọi lô hàng {herb.name} trước khi đưa vào kho lò chưng cất sấy điện của doanh nghiệp bao tiêu đều phải đạt tối thiểu 4 tiêu chí khắt khe sau:
          </p>
          <ul className="space-y-3.5 pl-1">
            {herb.standards.map((std, idx) => (
              <li key={idx} className="flex items-start gap-3 text-[#2D2521] text-base leading-relaxed">
                <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-1">
                  ✓
                </div>
                <span>{std}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Region cards row */}
        <section className="space-y-4">
          <h3 className="font-serif text-xl font-bold text-[#4F433A]">Các vùng canh tác chính và sản lượng bao tiêu</h3>
          <p className="text-sm text-gray-600 font-sans">Nhấp vào vùng trồng để kết nối hợp tác xã kiểu mới tại vùng để gom hàng chung chuyến xe thu mua:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {herb.regions.map((reg, idx) => (
              <div 
                key={idx}
                onClick={() => navigateTo({ type: "money-vung", cay: herb.slug, vung: reg.regionSlug })}
                className="bg-[#FDFBF9] hover:bg-[#F5ECE1] border border-[#E6DDD0] hover:border-[#B85037] p-4 rounded-xl cursor-pointer transition-all flex justify-between items-center group"
              >
                <div>
                  <h5 className="font-sans font-bold text-[#4F433A] group-hover:text-[#B85037] transition-colors">{reg.regionName}</h5>
                  <p className="text-xs text-gray-500 font-sans mt-0.5">Sản lượng dự kiến: {reg.outputEstimate}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-[#B85037] group-hover:translate-x-1 transition-transform" />
              </div>
            ))}
          </div>
        </section>

        {/* Kỹ thuật trồng summary block */}
        <section className="bg-gradient-to-br from-[#FDFBF9] to-[#FAF6F0] border border-[#E6DDD0] rounded-xl p-6 flex flex-col sm:flex-row gap-6 items-center justify-between">
          <div className="space-y-2">
            <span className="text-[#B85037] text-xs font-bold uppercase tracking-wider block">Tài liệu hướng dẫn</span>
            <h4 className="font-serif text-xl font-bold text-[#4F433A]">Kỹ thuật gieo trồng chăm sóc {herb.name} đúng quy chuẩn nông nghiệp sạch</h4>
            <p className="text-sm text-gray-600 max-w-xl">Cung cấp bởi chuyên gia Nguyễn Việt Lộc, đồng biên soạn từ giáo trình tập huấn GACP của đối tác thu mua.</p>
          </div>
          <button
            onClick={() => navigateTo({ type: "hub-wiki", cay: herb.slug })}
            className="shrink-0 bg-white border border-[#B85037] hover:bg-[#B85037] hover:text-white text-[#B85037] font-sans font-bold text-sm px-5 py-3 rounded-lg shadow-2xs transition-all cursor-pointer"
          >
            Xem cẩm nang kỹ thuật trồng {herb.name} →
          </button>
        </section>

        {/* FAQ Accordion */}
        <section className="space-y-4">
          <h3 className="font-serif text-xl font-bold text-[#4F433A] border-b border-[#F0EAE1] pb-2">Câu hỏi thường gặp nhất về thu mua {herb.name}</h3>
          <FaqAccordion items={herb.faq} />
        </section>

        <CtaBanner
          title={`Gửi lô hàng ${herb.name} để đấu nối bao tiêu`}
          description={`Nhận ngay phản hồi của Trưởng ban mua hàng khu vực của tập đoàn sấy sạch dược phẩm ${PARTNER_COMPANY.name} để thương thảo giá thu mua sàn của bà con.`}
          buttonText="Bắt đầu gửi thông số lô hàng"
          onClick={() => triggerShipmentModal(herb.name)}
        />
      </div>
    );
  };

  // ──── 4. MONEY VÙNG PAGE ────
  const renderMoneyVungPage = (caySlug: string, vungSlug: string) => {
    const herb = HERBS_DATA.find(h => h.slug === caySlug) || HERBS_DATA[0];
    const region = REGIONS_DATA.find(r => r.slug === vungSlug) || REGIONS_DATA[0];

    return (
      <div className="space-y-10 animate-fade-in">
        <Breadcrumb items={[
          { label: "Trang chủ", onClick: () => navigateTo({ type: "home" }) },
          { label: "Thu mua dược liệu", onClick: () => navigateTo({ type: "pillar" }) },
          { label: herb.name, onClick: () => navigateTo({ type: "money-cay", cay: herb.slug }) },
          { label: `Vùng ${region.name}` }
        ]} />

        {/* Hero */}
        <section className="bg-[#FAF8F5] border border-[#E6DDD0] rounded-2xl p-6 md:p-10 space-y-3">
          <div className="inline-flex items-center gap-1 bg-[#F5ECE1] text-[#B85037] text-xs font-bold px-2.5 py-1 rounded font-sans uppercase">
            Vùng trọng điểm liên kết
          </div>
          <h1 className="font-serif text-2xl md:text-4xl font-extrabold text-[#4F433A] tracking-tight">
            Vùng Trồng Dược Liệu {herb.name} Tại {region.name}
          </h1>
          <p className="text-gray-700 text-base md:text-lg max-w-3xl font-sans leading-relaxed">
            Phân tích các đặc trưng điều kiện tự nhiên thổ nhưỡng, độ ẩm đất cát pha sỏi và danh mục hợp tác xã đang tham gia mô hình bao tiêu GACP bền vững cùng tôi (<strong className="text-[#4F433A]">{SITE_OWNER}</strong>) và nhà máy trung tâm.
          </p>
        </section>

        {/* Info box with vùng data table */}
        <InfoBox title={`Chỉ số sản xuất và Hợp tác xã liên kết tại ${region.name}`} icon={<MapPin className="w-5 h-5" />}>
          <p className="text-sm text-gray-600 mb-4">Dưới đây là các đơn vị đại diện kiểu mới đứng ra gom hàng nông sản trực tiếp cho xe tải của nhà máy của chúng tôi:</p>
          <DataTable
            headers={["Tỉnh thành trọng điểm", "Diện tích quy hoạch (ha)", "Mùa vụ thu hoạch chính", "Trạng thái liên kết bao tiêu"]}
            rows={region.provinces.map(p => [
              <strong className="text-[#4F433A] font-sans">{p.name}</strong>,
              p.area,
              p.harvestPeriod,
              <span className="text-green-700 font-bold bg-green-50 px-2 py-0.5 rounded text-xs">{p.activeCooperatives}</span>
            ])}
          />
        </InfoBox>

        {/* Vùng characteristics section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-[#E6DDD0] rounded-xl p-6 space-y-3 shadow-2xs">
            <h3 className="font-serif text-xl font-bold text-[#4F433A] flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#B85037]" />
              Đặc điểm tự nhiên & Thổ nhưỡng vùng
            </h3>
            <p className="text-[#2D2521] text-base leading-relaxed font-sans">
              {region.characteristics}
            </p>
          </div>

          <div className="bg-white border border-[#E6DDD0] rounded-xl p-6 space-y-3 shadow-2xs">
            <h3 className="font-serif text-xl font-bold text-[#4F433A] flex items-center gap-2">
              <Award className="w-5 h-5 text-[#D08620]" />
              Ưu thế dược tính của thảo mộc bản địa
            </h3>
            <p className="text-[#2D2521] text-base leading-relaxed font-sans">
              {region.advantages}
            </p>
          </div>
        </section>

        {/* Compact VIETMEC partner card */}
        <section className="space-y-4">
          <h3 className="font-serif text-xl font-bold text-[#4F433A]">Đấu nối gom hàng trực tiếp theo khu vực</h3>
          <p className="text-sm text-gray-600 font-sans">Trưởng khu vực thu mua trung tâm của tập đoàn bao tiêu sấy sẽ điều xe bốc dỡ trực tiếp tại các xã điểm thu gom của HTX đối tác:</p>
          <FeaturedPartnerCard herbName={`${herb.name} tại vùng ${region.name}`} />
        </section>

        {/* Navigation back and to kỹ thuật trồng */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div 
            onClick={() => navigateTo({ type: "money-cay", cay: herb.slug })}
            className="bg-[#FAF8F4] hover:bg-white border border-[#E6DDD0] hover:border-[#B85037] p-5 rounded-xl cursor-pointer transition-all flex items-center justify-between group"
          >
            <div>
              <span className="text-xs text-[#B85037] font-semibold">Quay lại mục trước</span>
              <h4 className="font-serif text-lg font-bold text-[#4F433A] group-hover:text-[#B85037] transition-colors mt-0.5">Giá tổng quan &amp; Phân loại cây {herb.name}</h4>
            </div>
            <ArrowRight className="w-5 h-5 text-[#B85037] group-hover:translate-x-1 transition-transform" />
          </div>

          <div 
            onClick={() => navigateTo({ type: "hub-wiki", cay: herb.slug })}
            className="bg-[#FAF8F4] hover:bg-white border border-[#E6DDD0] hover:border-[#B85037] p-5 rounded-xl cursor-pointer transition-all flex items-center justify-between group"
          >
            <div>
              <span className="text-xs text-[#D08620] font-semibold">Tài liệu kỹ thuật</span>
              <h4 className="font-serif text-lg font-bold text-[#4F433A] group-hover:text-[#B85037] transition-colors mt-0.5">Cẩm nang gieo trồng giống {herb.name}</h4>
            </div>
            <ArrowRight className="w-5 h-5 text-[#B85037] group-hover:translate-x-1 transition-transform" />
          </div>
        </section>
      </div>
    );
  };

  // ──── 5. HUB WIKI PAGE ────
  const renderHubWikiPage = (caySlug: string) => {
    const herb = HERBS_DATA.find(h => h.slug === caySlug) || HERBS_DATA[0];
    const hub = WIKI_HUBS.find(h => h.herbSlug === caySlug) || WIKI_HUBS[0];

    const sections = [
      { id: "sec-1", label: "1. Giới thiệu tổng quan" },
      { id: "sec-2", label: "2. Quy trình gieo trồng đạt chuẩn GACP" },
      { id: "sec-3", label: "3. Các bệnh hại thường gặp & Giải pháp hữu cơ" },
      { id: "sec-4", label: "4. Thị trường đầu ra và bao tiêu từ nhà máy" }
    ];

    return (
      <div className="space-y-10 animate-fade-in">
        <Breadcrumb items={[
          { label: "Trang chủ", onClick: () => navigateTo({ type: "home" }) },
          { label: "Kiến thức", onClick: () => navigateTo({ type: "wiki-article", topic: "ky-thuat-say-duoc-lieu" }) },
          { label: `Kỹ thuật trồng ${herb.name}` }
        ]} />

        {/* Hero */}
        <section className="bg-gradient-to-br from-[#F5ECE1] to-[#FDFBF9] border border-[#E6DDD0] rounded-2xl p-6 md:p-10 space-y-3">
          <span className="text-[#B85037] text-xs font-bold uppercase tracking-wider block">Học liệu thực địa nông học</span>
          <h1 className="font-serif text-2xl md:text-4xl font-extrabold text-[#4F433A] tracking-tight">
            {hub.title}
          </h1>
          <p className="text-gray-700 text-base font-sans leading-relaxed">
            {hub.intro}
          </p>
        </section>

        {/* Main Content split with Sticky TOC */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sticky TOC column */}
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

          {/* Core Wiki sections column */}
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
                rows={hub.standards.map(s => [
                  <strong className="text-[#4F433A] font-sans">{s.stage}</strong>,
                  s.criteria,
                  <span className="text-sm text-gray-600">{s.controlMethod}</span>
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
                rows={hub.pests.map(p => [
                  <strong className="text-[#B85037] font-sans">{p.pestName}</strong>,
                  p.symptoms,
                  <span className="text-sm text-[#2D2521] font-sans">{p.remedy}</span>
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
                  onClick={() => navigateTo({ type: "money-cay", cay: herb.slug })}
                  className="bg-[#B85037] hover:bg-[#9F3E28] text-white font-sans font-bold text-sm px-5 py-3 rounded-lg shadow-2xs transition-all inline-flex items-center gap-1 cursor-pointer"
                >
                  Xem bảng giá thu mua &amp; Điểm thu gom {herb.name} →
                </button>
              </div>
            </section>

            {/* Related posts row */}
            <section className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#4F433A]">Các tài liệu chế biến &amp; phân tích liên quan khác</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {WIKI_ARTICLES.filter(a => a.id !== "ky-thuat-say-duoc-lieu").map((art) => (
                  <div 
                    key={art.id}
                    onClick={() => navigateTo({ type: "wiki-article", topic: art.id })}
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

  // ──── 6. WIKI ARTICLE PAGE ────
  const renderWikiArticlePage = (topicSlug: string) => {
    const article = WIKI_ARTICLES.find(a => a.id === topicSlug) || WIKI_ARTICLES[0];

    const sections = article.contentSections.map((sec, idx) => ({
      id: `art-sec-${idx}`,
      label: sec.heading.substring(0, 35) + "..."
    }));

    return (
      <div className="space-y-10 animate-fade-in">
        <Breadcrumb items={[
          { label: "Trang chủ", onClick: () => navigateTo({ type: "home" }) },
          { label: "Kiến thức" },
          { label: article.title }
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

        {/* Article Body with layout columns */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Sticky TOC */}
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

          {/* Content Column */}
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

            {/* If has standard stable specs table */}
            {article.standardsTable && (
              <div className="space-y-4 pt-4">
                <h4 className="font-serif text-lg font-bold text-[#4F433A]">Quy chuẩn phân tích sấy ráo mẫu tiêu biểu</h4>
                <DataTable
                  headers={["Nhóm dược thảo tuyển mẫu", "Quy cách độ ẩm chuẩn hóa lý", "Gợi ý khuyên dùng bảo quản"]}
                  rows={article.standardsTable.map(s => [
                    <strong className="text-[#4F433A] font-sans">{s.factor}</strong>,
                    s.standard,
                    <span className="text-sm text-gray-600">{s.notes}</span>
                  ])}
                />
              </div>
            )}

            {/* Common Mistakes callout box */}
            <div className="bg-[#FDF4F2] border border-[#B85037]/30 rounded-xl p-5 my-6 space-y-2">
              <h5 className="font-sans font-bold text-base text-[#B85037] flex items-center gap-1.5">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                Sai lầm phổ biến bà con nông dân cần tuyệt đối tránh:
              </h5>
              <p className="text-sm text-gray-700">
                Ủ bạt sấy kín khí! Khi thu hái xong chưa có xe tải bốc đi, bà con dồn đống phủ bạt kín để ráo nắng. Chỉ sau 4h, lượng nhiệt ủ nội sinh sẽ làm thâm đen ruột củ sâm Đinh lăng, thối hỏng Ba kích, biến toàn bộ thành hàng phế phẩm bị nhà máy từ chối nhận mua ngay tại cổng.
              </p>
            </div>

            {/* Related articles card row */}
            <section className="space-y-4 pt-8 border-t border-[#F0EAE1]">
              <h4 className="font-serif text-xl font-bold text-[#4F433A]">Các chuyên mục tin cậy độc giả nông học đón đọc nhiều nhất</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {WIKI_ARTICLES.filter(a => a.id !== article.id).slice(0, 2).map((art) => (
                  <div 
                    key={art.id}
                    onClick={() => navigateTo({ type: "wiki-article", topic: art.id })}
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

  // ──── About page ────
  const renderAboutPage = () => {
    return (
      <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
        <Breadcrumb items={[{ label: "Trang chủ", onClick: () => navigateTo({ type: "home" }) }, { label: "Về tôi" }]} />
        <section className="bg-white border border-[#E6DDD0] rounded-2xl p-6 md:p-10 space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-6 pb-6 border-b border-[#F5EFE6]">
            <div className="w-24 h-24 rounded-full bg-[#B85037]/10 flex items-center justify-center text-[#B85037] shrink-0">
              <User className="w-12 h-12" />
            </div>
            <div className="space-y-1 text-center md:text-left">
              <span className="text-xs text-[#B85037] uppercase font-bold tracking-wider">Nhà sáng lập &amp; Chuyên gia Nông học</span>
              <h1 className="font-serif text-3xl font-bold text-[#4F433A]">{SITE_OWNER}</h1>
              <p className="text-sm text-gray-500 font-mono">lien-he@nguyenvietloc.com • nguyenvietloc.com</p>
            </div>
          </div>

          <div className="space-y-4 text-base text-[#2D2521] leading-relaxed font-sans">
            <p>
              Chào bà con nông dân, các đồng chí đại diện Hợp tác xã và quý anh chị thương lái thu mua trên khắp mọi miền tổ quốc. Tôi là <strong>Nguyễn Việt Lộc</strong>, một cựu kỹ sư nông học độc lập có hơn 12 năm đi thực tế, kiểm tra vùng quy hoạch hạt giống và cố vấn cho các chuỗi lò sấy dược thô tại Việt Nam.
            </p>
            <p>
              Dự án trang điện tử cá nhân <strong>nguyenvietloc.com</strong> được tôi thành lập với sứ mệnh giải quyết 2 bài toán lớn lớn nhất của ngành thảo dược nước nhà: 
              <strong className="text-[#B85037]"> Kỹ thuật canh tác yếu kém </strong> dính tàn dư hóa chất bảo vệ thực vật bị từ chối mua, và <strong className="text-[#B85037]"> Sự bấp bênh rủi ro của thương lái trôi nổi </strong> dẫn tới thảm cảnh nông sản thối rữa đầy đồng.
            </p>
            <p>
              Mọi kiến thức tôi chia sẻ tại trang điện tử này đều độc lập, khách quan, dựa trên giáo án tập huấn thực tế GACP-WHO của Tổ chức Y tế Thế giới. Đồng thời, tôi kết nối cho bà con nông hộ, HTX đấu đầu mối trực tiếp với các cán bộ thu mua của đối tác chiến lược uy tín là <strong>Tập đoàn Dược liệu Việt Nam (VIETMEC)</strong> nhằm mục đích đảm bảo dòng bao tiêu sạch, pháp lý cam kết vững bền cho gia đình bà con làm giàu.
            </p>
          </div>

          <div className="bg-[#FAF8F5] p-5 rounded-xl border border-[#E6DDD0] space-y-3">
            <h4 className="font-serif text-lg font-bold text-[#4F433A]">Thông tin liên hệ tư vấn kỹ thuật trực tiếp:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4.5 h-4.5 text-[#B85037]" />
                <span>Hộp thư cá nhân: <strong>lien-he@nguyenvietloc.com</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4.5 h-4.5 text-[#B85037]" />
                <span>Trang chủ chính thức: <strong>nguyenvietloc.com</strong></span>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  };

  // ──── Contact page ────
  const renderContactPage = () => {
    return (
      <div className="space-y-8 animate-fade-in max-w-2xl mx-auto">
        <Breadcrumb items={[{ label: "Trang chủ", onClick: () => navigateTo({ type: "home" }) }, { label: "Liên hệ" }]} />
        <section className="bg-white border border-[#E6DDD0] rounded-2xl p-6 md:p-8 space-y-6">
          <div className="space-y-2">
            <span className="text-xs text-[#B85037] font-bold uppercase tracking-wider block">Gửi phản hồi</span>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#4F433A] tracking-tight">Hộp Thư Tư Vấn Nguyễn Việt Lộc</h1>
            <p className="text-sm text-gray-600">
              Bà con có thắc mắc về sâu hại dính mốc rễ củ, cần tôi thẩm định vườn ươm giống, hoặc muốn ký kết bao tiêu sấy thô với doanh nghiệp? Gửi thư ngay để nhận phản hồi.
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); alert("Cảm ơn ý kiến của bà con, tôi sẽ trực tiếp hồi đáp qua thư điện tử sớm nhất!"); }} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#4F433A] mb-1">Họ và tên bà con</label>
                <input required type="text" placeholder="Nguyễn Văn A" className="w-full px-4 py-2 border border-[#E6DDD0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B85037]" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#4F433A] mb-1">Số điện thoại liên lạc</label>
                <input required type="tel" placeholder="0912345678" className="w-full px-4 py-2 border border-[#E6DDD0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B85037]" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#4F433A] mb-1">Địa chỉ Email (Nếu có)</label>
              <input type="email" placeholder="lien-he@nguyenvietloc.com" className="w-full px-4 py-2 border border-[#E6DDD0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B85037]" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#4F433A] mb-1">Nội dung thắc mắc / Đề xuất vùng trồng</label>
              <textarea required rows={4} placeholder="Mô tả chi tiết diện tích đất đồi sỏi, loại cây định gieo trồng hoặc tình trạng sâu bệnh..." className="w-full px-4 py-2 border border-[#E6DDD0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B85037]"></textarea>
            </div>

            <button type="submit" className="w-full bg-[#B85037] hover:bg-[#9F3E28] text-white font-bold py-3 rounded-lg shadow-md transition-colors cursor-pointer text-center">
              Gửi tin nhắn tư vấn
            </button>
          </form>

          <div className="border-t border-[#F5EFE6] pt-5 text-xs text-gray-500 italic space-y-1">
            <p>Hộp thư cá nhân chính thức: <strong>lien-he@nguyenvietloc.com</strong></p>
            <p>Liên hệ phòng thu mua trung tâm đối tác VIETMEC: <strong>thu-mua@vietmec.com</strong></p>
          </div>
        </section>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D2521] flex flex-col font-sans selection:bg-[#B85037]/10 selection:text-[#B85037]">
      
      {/* 🛠️ DEMO CONTROL PANEL / SCREEN NAVIGATOR (COLLAPSIBLE) */}
      <div className={`bg-[#2D2521] text-white py-3 px-4 border-b border-white/10 z-50 sticky top-0 transition-all ${showDemoDock ? 'block' : 'hidden'}`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="bg-[#B85037] text-white px-2 py-0.5 rounded-sm font-bold uppercase tracking-widest text-[9px]">Demo Quick Navigator</span>
            <span className="text-gray-300 font-medium">Nhấp nhanh để duyệt qua 6 giao diện trang được yêu cầu:</span>
          </div>
          
          <div className="flex flex-wrap gap-1.5 justify-center">
            <button 
              onClick={() => navigateTo({ type: "home" })}
              className={`px-3 py-1.5 rounded-sm font-semibold transition-colors cursor-pointer ${activePage.type === "home" ? "bg-[#B85037] text-white" : "bg-white/15 hover:bg-white/25 text-gray-200"}`}
            >
              1. Trang Chủ (/)
            </button>
            <button 
              onClick={() => navigateTo({ type: "pillar" })}
              className={`px-3 py-1.5 rounded-sm font-semibold transition-colors cursor-pointer ${activePage.type === "pillar" ? "bg-[#B85037] text-white" : "bg-white/15 hover:bg-white/25 text-gray-200"}`}
            >
              2. Pillar Money (/thu-mua/)
            </button>
            <button 
              onClick={() => navigateTo({ type: "money-cay", cay: "dinh-lang" })}
              className={`px-3 py-1.5 rounded-sm font-semibold transition-colors cursor-pointer ${activePage.type === "money-cay" && (activePage as any).cay === "dinh-lang" ? "bg-[#B85037] text-white" : "bg-white/15 hover:bg-white/25 text-gray-200"}`}
            >
              3. Money Cây (/cay/đinh-lăng)
            </button>
            <button 
              onClick={() => navigateTo({ type: "money-vung", cay: "dinh-lang", vung: "tay-bac" })}
              className={`px-3 py-1.5 rounded-sm font-semibold transition-colors cursor-pointer ${activePage.type === "money-vung" ? "bg-[#B85037] text-white" : "bg-white/15 hover:bg-white/25 text-gray-200"}`}
            >
              4. Money Vùng (/vùng/tây-bắc)
            </button>
            <button 
              onClick={() => navigateTo({ type: "hub-wiki", cay: "dinh-lang" })}
              className={`px-3 py-1.5 rounded-sm font-semibold transition-colors cursor-pointer ${activePage.type === "hub-wiki" ? "bg-[#B85037] text-white" : "bg-white/15 hover:bg-white/25 text-gray-200"}`}
            >
              5. Hub Wiki (/kiến-thức/trồng-đinh-lăng)
            </button>
            <button 
              onClick={() => navigateTo({ type: "wiki-article", topic: "ky-thuat-say-duoc-lieu" })}
              className={`px-3 py-1.5 rounded-sm font-semibold transition-colors cursor-pointer ${activePage.type === "wiki-article" ? "bg-[#B85037] text-white" : "bg-white/15 hover:bg-white/25 text-gray-200"}`}
            >
              6. Wiki Article (/kiến-thức/topic)
            </button>
            
            <button 
              onClick={() => setShowDemoDock(false)} 
              className="p-1 hover:bg-white/10 rounded ml-1"
              title="Ẩn thanh Demo"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Button to bring back Demo Dock if hidden */}
      {!showDemoDock && (
        <button 
          onClick={() => setShowDemoDock(true)}
          className="fixed right-4 top-20 bg-[#2D2521] text-white text-xs px-3 py-1.5 rounded-md shadow-lg z-50 hover:bg-[#B85037] transition-all cursor-pointer inline-flex items-center gap-1.5"
        >
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Mở thanh Demo nhanh</span>
        </button>
      )}

      {/* ────────────────── BRAND HEADER ────────────────── */}
      <header className="sticky top-0 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#E6DDD0] z-30 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          
          {/* Top-Left BRAND wordmark */}
          <div 
            onClick={() => navigateTo({ type: "home" })}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-lg bg-[#B85037] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <Leaf className="w-5 h-5 fill-white" />
            </div>
            <span className="font-serif text-xl sm:text-2xl font-black text-[#B85037] tracking-tight group-hover:opacity-90 transition-opacity">
              Nguyễn Việt Lộc
            </span>
          </div>

          {/* Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 text-[#4F433A] font-sans font-bold text-base">
            <button 
              onClick={() => navigateTo({ type: "home" })}
              className={`hover:text-[#B85037] transition-colors cursor-pointer py-1 border-b-2 ${activePage.type === "home" ? "border-[#B85037] text-[#B85037]" : "border-transparent"}`}
            >
              Trang chủ
            </button>
            <button 
              onClick={() => navigateTo({ type: "pillar" })}
              className={`hover:text-[#B85037] transition-colors cursor-pointer py-1 border-b-2 ${activePage.type === "pillar" || activePage.type === "money-cay" || activePage.type === "money-vung" ? "border-[#B85037] text-[#B85037]" : "border-transparent"}`}
            >
              Thu mua dược liệu
            </button>
            <button 
              onClick={() => navigateTo({ type: "wiki-article", topic: "ky-thuat-say-duoc-lieu" })}
              className={`hover:text-[#B85037] transition-colors cursor-pointer py-1 border-b-2 ${activePage.type === "wiki-article" || activePage.type === "hub-wiki" ? "border-[#B85037] text-[#B85037]" : "border-transparent"}`}
            >
              Kiến thức
            </button>
            <button 
              onClick={() => navigateTo({ type: "about" })}
              className={`hover:text-[#B85037] transition-colors cursor-pointer py-1 border-b-2 ${activePage.type === "about" ? "border-[#B85037] text-[#B85037]" : "border-transparent"}`}
            >
              Về tôi
            </button>
            <button 
              onClick={() => navigateTo({ type: "contact" })}
              className={`hover:text-[#B85037] transition-colors cursor-pointer py-1 border-b-2 ${activePage.type === "contact" ? "border-[#B85037] text-[#B85037]" : "border-transparent"}`}
            >
              Liên hệ
            </button>
          </nav>

          {/* Interactive Search Bar & Mobile Menu toggle */}
          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block w-64">
              <input
                type="text"
                placeholder="Tìm giá cây thuốc..."
                value={searchQuery}
                onFocus={() => setShowSearchDropdown(true)}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FAF6F0] border border-[#E6DDD0] text-[#2D2521] placeholder-gray-400 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#B85037] transition-all"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              
              {/* Dropdown search results */}
              {showSearchDropdown && searchQuery.trim().length > 0 && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-[#E6DDD0] rounded-xl shadow-xl z-50 overflow-hidden">
                  <div className="bg-[#FAF8F5] px-3 py-2 text-xs font-bold text-[#4F433A] border-b border-[#F0EAE1] flex justify-between items-center">
                    <span>Kết quả tìm kiếm ({searchResults.length})</span>
                    <button onClick={() => setShowSearchDropdown(false)} className="text-gray-400 hover:text-gray-600">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="max-h-60 overflow-y-auto divide-y divide-[#F5EFE6]">
                    {searchResults.length > 0 ? (
                      searchResults.map((herb) => (
                        <div 
                          key={herb.id}
                          onClick={() => {
                            navigateTo({ type: "money-cay", cay: herb.slug });
                            setShowSearchDropdown(false);
                          }}
                          className="p-3 hover:bg-[#FAF6F0] cursor-pointer transition-colors text-left"
                        >
                          <div className="font-sans font-bold text-sm text-[#4F433A]">{herb.name}</div>
                          <div className="text-xs text-[#B85037] font-mono mt-0.5">{herb.priceRange}</div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-xs text-gray-400 italic">Không tìm thấy dược liệu cần tìm.</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Hamburguer Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#4F433A] hover:text-[#B85037]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#FDFBF7] border-t border-[#E6DDD0] py-4 px-6 space-y-4 animate-fade-in shadow-md absolute left-0 right-0">
            {/* Mobile Search input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm giá cây thuốc..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#FAF6F0] border border-[#E6DDD0] text-[#2D2521] placeholder-gray-400 rounded-lg pl-9 pr-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-[#B85037]"
              />
              <Search className="absolute left-3 top-3.5 w-4.5 h-4.5 text-gray-400" />
              {searchQuery.trim().length > 0 && (
                <div className="bg-white border border-[#E6DDD0] rounded-lg mt-2 p-2 shadow-lg max-h-40 overflow-y-auto text-left">
                  {searchResults.map(h => (
                    <div 
                      key={h.id} 
                      onClick={() => navigateTo({ type: "money-cay", cay: h.slug })}
                      className="p-2 hover:bg-gray-100 cursor-pointer text-sm font-bold text-[#4F433A]"
                    >
                      {h.name} ({h.priceRange})
                    </div>
                  ))}
                </div>
              )}
            </div>

            <nav className="flex flex-col gap-4 text-base font-bold text-[#4F433A] text-left">
              <button 
                onClick={() => navigateTo({ type: "home" })}
                className="py-2 hover:text-[#B85037] border-b border-[#F5EFE6] text-left cursor-pointer"
              >
                Trang chủ
              </button>
              <button 
                onClick={() => navigateTo({ type: "pillar" })}
                className="py-2 hover:text-[#B85037] border-b border-[#F5EFE6] text-left cursor-pointer"
              >
                Thu mua dược liệu
              </button>
              <button 
                onClick={() => navigateTo({ type: "wiki-article", topic: "ky-thuat-say-duoc-lieu" })}
                className="py-2 hover:text-[#B85037] border-b border-[#F5EFE6] text-left cursor-pointer"
              >
                Kiến thức
              </button>
              <button 
                onClick={() => navigateTo({ type: "about" })}
                className="py-2 hover:text-[#B85037] border-b border-[#F5EFE6] text-left cursor-pointer"
              >
                Về Nguyễn Việt Lộc
              </button>
              <button 
                onClick={() => navigateTo({ type: "contact" })}
                className="py-2 hover:text-[#B85037] text-left cursor-pointer"
              >
                Liên hệ tư vấn
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* ────────────────── MAIN SCREEN CONTAINER ────────────────── */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 md:py-10">
        {activePage.type === "home" && renderHomePage()}
        {activePage.type === "pillar" && renderPillarPage()}
        {activePage.type === "money-cay" && renderMoneyCayPage(activePage.cay)}
        {activePage.type === "money-vung" && renderMoneyVungPage(activePage.cay, activePage.vung)}
        {activePage.type === "hub-wiki" && renderHubWikiPage(activePage.cay)}
        {activePage.type === "wiki-article" && renderWikiArticlePage(activePage.topic)}
        {activePage.type === "about" && renderAboutPage()}
        {activePage.type === "contact" && renderContactPage()}
      </main>

      {/* ────────────────── BRAND FOOTER (IDENTICAL) ────────────────── */}
      <footer className="bg-[#2D2521] text-white border-t-4 border-[#B85037] pt-12 pb-8 px-4 sm:px-6 mt-16">
        <div className="max-w-7xl mx-auto space-y-10">
          
          {/* 4 columns section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Column 1: Về Nguyễn Việt Lộc */}
            <div className="space-y-4 text-left">
              <h4 className="font-serif text-lg font-bold text-[#EFE6DA] uppercase tracking-wider border-b border-white/10 pb-2">
                Về Nguyễn Việt Lộc
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed font-sans">
                Nguyễn Việt Lộc chia sẻ kinh nghiệm thực tế về canh tác, định giá cây thảo mộc và liên kết sấy khô đạt chuẩn đông y GACP-WHO, định hướng làm giàu bền vững cùng doanh nghiệp uy tín.
              </p>
              <button
                onClick={() => navigateTo({ type: "about" })}
                className="text-[#D08620] hover:text-[#E19224] text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1 hover:underline cursor-pointer"
              >
                <span>Tìm hiểu về tôi</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Column 2: Thu mua dược liệu */}
            <div className="space-y-4 text-left">
              <h4 className="font-serif text-lg font-bold text-[#EFE6DA] uppercase tracking-wider border-b border-white/10 pb-2">
                Thu mua dược liệu
              </h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <button onClick={() => navigateTo({ type: "pillar" })} className="hover:text-white transition-colors cursor-pointer text-left">
                    • Bảng giá dược liệu hôm nay
                  </button>
                </li>
                {HERBS_DATA.slice(0, 5).map(h => (
                  <li key={h.id}>
                    <button 
                      onClick={() => navigateTo({ type: "money-cay", cay: h.slug })} 
                      className="hover:text-white transition-colors cursor-pointer text-left capitalize"
                    >
                      • Thu mua rễ củ {h.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Kiến thức */}
            <div className="space-y-4 text-left">
              <h4 className="font-serif text-lg font-bold text-[#EFE6DA] uppercase tracking-wider border-b border-white/10 pb-2">
                Kiến thức canh tác
              </h4>
              <ul className="space-y-2 text-sm text-gray-300">
                {WIKI_ARTICLES.map(art => (
                  <li key={art.id}>
                    <button 
                      onClick={() => navigateTo({ type: "wiki-article", topic: art.id })} 
                      className="hover:text-white transition-colors cursor-pointer text-left line-clamp-1"
                    >
                      • {art.title}
                    </button>
                  </li>
                ))}
                <li>
                  <button onClick={() => navigateTo({ type: "hub-wiki", cay: "dinh-lang" })} className="hover:text-white transition-colors cursor-pointer text-left">
                    • Kỹ thuật phòng sâu bệnh mọc rễ
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Liên hệ */}
            <div className="space-y-4 text-left">
              <h4 className="font-serif text-lg font-bold text-[#EFE6DA] uppercase tracking-wider border-b border-white/10 pb-2">
                Liên hệ trực tiếp
              </h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#D08620] shrink-0" />
                  <span>Email: <strong className="text-white">{OWNER_EMAIL}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#D08620] shrink-0" />
                  <span>Website: <strong className="text-white">{OWNER_URL}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#D08620] shrink-0" />
                  <span className="text-xs">Trạm kiểm định vùng trung tâm, Phú Thọ</span>
                </div>
              </div>
              <div className="pt-1">
                <button
                  onClick={() => navigateTo({ type: "contact" })}
                  className="bg-[#D08620] hover:bg-[#E19224] text-white font-sans font-bold text-xs px-4 py-2 rounded-md shadow-sm transition-colors cursor-pointer block text-center"
                >
                  Gửi yêu cầu tư vấn
                </button>
              </div>
            </div>
          </div>

          {/* Disclaimer paragraph below columns */}
          <div className="border-t border-white/10 pt-6 text-xs text-gray-400 font-sans leading-relaxed text-left space-y-2">
            <p className="font-bold text-[#EFE6DA]">Tuyên bố trách nhiệm độc lập:</p>
            <p>
              Các kiến thức, báo cáo kiểm định và chỉ số dải giá giao dịch đăng tải trên trang điện tử cá nhân {OWNER_URL} đều do nhà sáng lập chuyên gia nông học {SITE_OWNER} trực tiếp khảo nghiệm thực tế, biên tập độc lập và chịu trách nhiệm khách quan. Việc gợi ý và hướng dẫn đấu nối tới bộ phận thu gom bao tiêu của tập đoàn dược liệu {PARTNER_COMPANY.name} (mã {PARTNER_COMPANY.stockCode}) dựa trên chất lượng nhà máy sấy đạt chuẩn GMP-WHO thực tế để bảo vệ lợi ích tối đa của nông hộ, hoàn toàn không mang tính quảng cáo thương mại ép buộc.
            </p>
          </div>

          {/* Copyright bar */}
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
            <span className="text-left">
              © 2026 Nguyễn Việt Lộc. Bảo lưu mọi quyền.
            </span>
            <div className="flex gap-4">
              <span className="hover:text-white transition-colors cursor-pointer" onClick={() => navigateTo({ type: "about" })}>Giới thiệu tác giả</span>
              <span>•</span>
              <span className="hover:text-white transition-colors cursor-pointer" onClick={() => navigateTo({ type: "contact" })}>Báo cáo vi phạm giống cây giống giả</span>
            </div>
          </div>

        </div>
      </footer>

      {/* ────────────────── MOBILE GLOBAL BOTTOM CTA BAR ────────────────── */}
      {/* Dynamic bottom CTA bar when browsing cay or home pages, linking to the VIETMEC modal */}
      <BottomMobileCtaBar 
        herbName={
          activePage.type === "money-cay" 
            ? HERBS_DATA.find(h => h.slug === (activePage as any).cay)?.name || "dược liệu"
            : "thảo dược"
        }
        onCtaClick={() => triggerShipmentModal(
          activePage.type === "money-cay" 
            ? HERBS_DATA.find(h => h.slug === (activePage as any).cay)?.name || "Dược liệu"
            : "Dược liệu nông sản"
        )}
      />

      {/* shipment modal rendered conditionally at the very top of body */}
      <ShipmentModal 
        isOpen={isShipmentModalOpen} 
        onClose={() => setIsShipmentModalOpen(false)} 
        herbName={selectedHerbForModal} 
      />

    </div>
  );
}
