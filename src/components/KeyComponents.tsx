import React, { useState } from "react";
import { 
  CheckCircle2, 
  ChevronRight, 
  Info, 
  TrendingUp, 
  Leaf, 
  Clock, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  X, 
  ExternalLink,
  MapPin,
  Building2,
  FileText,
  User,
  Calendar,
  AlertTriangle
} from "lucide-react";

// 1. DATA TABLE
interface DataTableProps {
  headers: string[];
  rows: (string | React.ReactNode)[][];
}

export const DataTable: React.FC<DataTableProps> = ({ headers, rows }) => {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-[#E6DDD0] shadow-xs my-4">
      <table className="w-full text-left border-collapse min-w-[600px]">
        <thead>
          <tr className="bg-[#F5EDE0] border-b border-[#E6DDD0]">
            {headers.map((header, idx) => (
              <th key={idx} className="px-5 py-4 font-sans font-semibold text-sm text-[#4F433A] tracking-wide">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E6DDD0]">
          {rows.map((row, rIdx) => (
            <tr 
              key={rIdx} 
              className={`hover:bg-[#FAF6F0] transition-colors ${
                rIdx % 2 === 0 ? "bg-[#FDFBF9]" : "bg-[#FBF9F5]"
              }`}
            >
              {row.map((cell, cIdx) => (
                <td key={cIdx} className="px-5 py-4 text-[#2D2521] text-base leading-relaxed font-sans">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// 2. INFO BOX
interface InfoBoxProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const InfoBox: React.FC<InfoBoxProps> = ({ title, children, icon }) => {
  return (
    <div className="rounded-xl bg-[#F5ECE1] border-l-4 border-[#B85037] p-5 my-6 shadow-xs">
      <div className="flex items-start gap-3">
        <div className="text-[#B85037] mt-1 shrink-0">
          {icon || <Info className="w-5 h-5" />}
        </div>
        <div className="flex-1">
          <h4 className="text-[#4F433A] font-sans font-bold text-lg mb-2 tracking-tight">
            {title}
          </h4>
          <div className="text-[#2D2521] text-base leading-relaxed font-sans">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. CTA BANNER
interface CtaBannerProps {
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ title, description, buttonText, onClick }) => {
  return (
    <div className="w-full bg-[#D08620] hover:bg-[#C07B1D] transition-colors rounded-2xl p-8 md:p-10 my-8 shadow-sm text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
      {/* Background graphic */}
      <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 pointer-events-none" />
      <div className="absolute left-1/4 bottom-0 w-32 h-32 bg-white/5 rounded-full -ml-8 -mb-8 pointer-events-none" />
      
      <div className="space-y-2 max-w-2xl text-center md:text-left z-10">
        <h3 className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
          {title}
        </h3>
        <p className="text-amber-50 text-base md:text-lg max-w-xl font-sans leading-relaxed">
          {description}
        </p>
      </div>
      <button 
        id="cta-banner-btn"
        onClick={onClick}
        className="shrink-0 bg-white hover:bg-amber-50 text-[#9F5E08] font-sans font-bold text-base px-6 py-3.5 rounded-lg shadow-md transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer inline-flex items-center gap-2"
      >
        <span>{buttonText}</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

// PROCUREMENT LEAD FORM MODAL (used by FeaturedPartnerCard)
interface ShipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  herbName?: string;
}

export const ShipmentModal: React.FC<ShipmentModalProps> = ({ isOpen, onClose, herbName = "Đinh lăng" }) => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-[#FDFBF9] rounded-2xl border border-[#E6DDD0] shadow-2xl w-full max-w-lg p-6 md:p-8 relative max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 p-1"
        >
          <X className="w-6 h-6" />
        </button>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center gap-2 text-[#B85037]">
              <Leaf className="w-6 h-6" />
              <span className="font-sans font-bold text-xs tracking-wider uppercase">Đối tác VIETMEC</span>
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#4F433A] tracking-tight">
                Gửi thông tin lô hàng thu mua
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                Kết nối trực tiếp đến phòng thu mua của <strong className="text-[#B85037]">VIETMEC</strong>. Chuyên viên sẽ gọi lại định giá và khảo sát trong 24h.
              </p>
            </div>

            <div className="bg-[#F5ECE1] p-3 rounded-lg border border-[#E6DDD0] text-sm text-[#4F433A] font-sans">
              Dược liệu cần bán: <strong className="text-[#B85037]">{herbName}</strong>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#4F433A] mb-1">
                  Họ và tên người liên hệ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#E6DDD0] bg-white focus:outline-none focus:ring-2 focus:ring-[#B85037] text-base"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#4F433A] mb-1">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Ví dụ: 0912345678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E6DDD0] bg-white focus:outline-none focus:ring-2 focus:ring-[#B85037] text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#4F433A] mb-1">
                    Sản lượng dự kiến
                  </label>
                  <input
                    type="text"
                    placeholder="Ví dụ: 500kg, 2 tấn"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E6DDD0] bg-white focus:outline-none focus:ring-2 focus:ring-[#B85037] text-base"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#4F433A] mb-1">
                  Vùng trồng / Địa chỉ ruộng vườn <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Huyện Hải Hậu, Nam Định"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#E6DDD0] bg-white focus:outline-none focus:ring-2 focus:ring-[#B85037] text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#4F433A] mb-1">
                  Mô tả tình trạng (Độ tuổi củ, độ ẩm, cách sấy...)
                </label>
                <textarea
                  rows={3}
                  placeholder="Ví dụ: Đinh lăng nếp 4 năm tuổi, đã băm nhỏ phơi ráo ẩm khoảng 13%, hàng có sẵn tại kho..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-[#E6DDD0] bg-white focus:outline-none focus:ring-2 focus:ring-[#B85037] text-base"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-1/3 py-3 border border-[#E6DDD0] rounded-lg text-[#4F433A] hover:bg-gray-100 transition-colors font-semibold"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="w-2/3 py-3 bg-[#B85037] hover:bg-[#9F3E28] text-white rounded-lg transition-colors font-bold shadow-md"
              >
                Gửi thông tin ngay
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-2">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#4F433A]">
              Gửi thông tin thành công!
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Cảm ơn bà con <strong className="text-[#4F433A]">{fullName}</strong> ({phone}). Thông tin lô hàng <strong className="text-[#B85037]">{herbName}</strong> đã được gửi thẳng tới bộ phận thu mua của <strong className="text-[#B85037]">VIETMEC</strong>.
            </p>
            <p className="text-sm text-gray-500 italic">
              Chuyên viên kỹ thuật khu vực sẽ chủ động liên hệ hỗ trợ báo giá chính xác nhất trong vài giờ tới.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                onClose();
              }}
              className="mt-6 px-6 py-2.5 bg-[#B85037] hover:bg-[#9F3E28] text-white rounded-lg transition-colors font-semibold shadow-xs"
            >
              Đóng cửa sổ
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// 4. FEATURED PARTNER CARD (VIETMEC)
interface FeaturedPartnerCardProps {
  herbName?: string;
}

export const FeaturedPartnerCard: React.FC<FeaturedPartnerCardProps> = ({ herbName = "Đinh lăng" }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="border-2 border-[#B85037] bg-white rounded-2xl p-6 md:p-8 my-6 relative shadow-md transition-all hover:shadow-lg">
      <div className="absolute top-0 right-0 transform translate-x-0 -translate-y-1/2 bg-[#B85037] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xs">
        Đề xuất ưu tiên
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h4 className="font-serif text-2xl font-bold text-[#B85037]">
            CTCP Dược liệu Việt Nam (VIETMEC)
          </h4>
          <span className="bg-[#F5ECE1] text-[#B85037] text-xs font-semibold px-2 py-1 rounded border border-[#E6DDD0]">
            Mã HNX: DVM
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-600 border-b border-[#F0EAE1] pb-4">
          <div className="flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-[#B85037]" />
            <span>Nhà máy GMP-WHO Phú Ninh, Phú Thọ</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#B85037]" />
            <span>15+ năm hoạt động toàn quốc</span>
          </div>
        </div>

        <p className="text-base text-[#2D2521] leading-relaxed font-sans">
          VIETMEC là đối tác chiến lược hàng đầu được thẩm định kỹ lưỡng bởi tôi (<strong className="text-[#4F433A]">Nguyễn Việt Lộc</strong>). Doanh nghiệp sở hữu vùng dược liệu đạt chuẩn GACP-WHO rộng lớn tại Việt Nam và cam kết hợp đồng thu mua minh bạch lâu dài.
        </p>

        <div className="space-y-2.5 my-4 bg-[#FAF7F2] p-4 rounded-xl border border-[#F0EAE1]">
          <h5 className="font-sans font-bold text-sm text-[#4F433A] uppercase tracking-wider mb-2">Quyền lợi liên kết bao tiêu cùng VIETMEC:</h5>
          {[
            "Ký hợp đồng bao tiêu sản phẩm bằng văn bản pháp lý với giá sàn cam kết ổn định.",
            "Cung cấp cây giống sạch bệnh, kiểm dịch chuẩn GACP-WHO, hỗ trợ thanh toán trả chậm.",
            "Đội ngũ kỹ sư nông nghiệp theo sát thực địa tư vấn kỹ thuật canh tác định kỳ miễn phí.",
            "Xử lý sau thu hoạch bằng công nghệ sấy lạnh khép kín hiện đại tại nhà máy trung tâm."
          ].map((bullet, idx) => (
            <div key={idx} className="flex items-start gap-2 text-sm text-[#2D2521]">
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <span>{bullet}</span>
            </div>
          ))}
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="text-xs text-gray-500 italic max-w-sm text-center sm:text-left">
            * Nhấp vào nút để gửi thông số lô hàng của bà con. Thông tin sẽ được tự động chuyển đến Trưởng phòng Thu mua khu vực của VIETMEC.
          </div>
          <button
            id="featured-partner-cta"
            onClick={() => setModalOpen(true)}
            className="w-full sm:w-auto bg-[#B85037] hover:bg-[#9F3E28] text-white font-sans font-bold text-base px-6 py-3.5 rounded-lg shadow-md transition-all transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer text-center"
          >
            Gửi thông tin lô hàng {herbName}
          </button>
        </div>
      </div>

      <ShipmentModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        herbName={herbName} 
      />
    </div>
  );
};

// 5. NEUTRAL PARTNER CARD
export const NeutralPartnerCard: React.FC = () => {
  return (
    <div className="border border-gray-200 bg-gray-50 rounded-xl p-5 md:p-6 my-6 text-gray-600">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-gray-400 mt-1 shrink-0" />
        <div className="space-y-2">
          <h4 className="font-sans font-bold text-lg text-gray-700">
            Các điểm thu gom tư nhân tự phát (Thương lái nhỏ lẻ)
          </h4>
          <p className="text-sm leading-relaxed">
            Ưu điểm: Giao dịch nhanh bằng tiền mặt trực tiếp tại bờ ruộng, không yêu cầu phân loại chặt chẽ hay giấy tờ xuất xứ nguồn gốc.
          </p>
          <p className="text-sm leading-relaxed text-red-600 font-medium">
            Rủi ro lớn: Giá bấp bênh biến động theo ngày, thường xuyên xảy ra tình trạng bùng hợp đồng, ép giá cực đoan khi thị trường thừa cung, hoặc kén chọn thắt chặt thu mua không có lý do thỏa đáng.
          </p>
          <div className="text-xs text-gray-400 italic pt-1">
            Khuyên dùng: Bà con chỉ nên giao dịch lượng nhỏ dư thừa ngắn ngày. Tránh dồn toàn bộ nguồn lực gia đình đầu tư vùng lớn dựa hoàn toàn vào cam kết miệng của thương lái tự phát.
          </div>
        </div>
      </div>
    </div>
  );
};

// 6. CÂY DƯỢC LIỆU CARD
interface HerbCardProps {
  name: string;
  scientificName: string;
  priceRange: string;
  shortDesc: string;
  image: string;
  onClick: () => void;
}

export const HerbCard: React.FC<HerbCardProps> = ({ name, scientificName, priceRange, shortDesc, image, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl overflow-hidden border border-[#E6DDD0] hover:border-[#B85037] shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col h-full"
    >
      <div className="relative aspect-4/3 overflow-hidden bg-gray-100">
        <img 
          src={image} 
          alt={name} 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute top-3 right-3 bg-[#B85037]/90 text-white text-xs font-semibold px-2.5 py-1 rounded-md backdrop-blur-xs font-sans">
          {priceRange}
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h4 className="font-serif text-xl font-bold text-[#4F433A] group-hover:text-[#B85037] transition-colors tracking-tight">
              {name}
            </h4>
            <span className="text-xs text-gray-400 italic font-mono">{scientificName}</span>
          </div>
          <p className="text-[#2D2521] text-sm leading-relaxed line-clamp-3">
            {shortDesc}
          </p>
        </div>
        <div className="pt-2 text-sm font-semibold text-[#B85037] group-hover:text-[#9F3E28] inline-flex items-center gap-1">
          <span>Xem chi tiết giá & thu mua</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};

// 7. ARTICLE CARD
interface ArticleCardProps {
  title: string;
  category: string;
  excerpt: string;
  image: string;
  readTime: string;
  author: string;
  date: string;
  onClick: () => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ 
  title, 
  category, 
  excerpt, 
  image, 
  readTime, 
  author, 
  date, 
  onClick 
}) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl overflow-hidden border border-[#E6DDD0] hover:border-[#B85037] shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col md:flex-row h-full md:max-h-64"
    >
      <div className="md:w-1/3 aspect-video md:aspect-auto bg-gray-100 overflow-hidden relative">
        <img 
          src={image} 
          alt={title} 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" 
        />
        <div className="absolute top-3 left-3 bg-[#D08620] text-white text-xs font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
          {category}
        </div>
      </div>
      <div className="p-5 md:w-2/3 flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          <h4 className="font-serif text-lg md:text-xl font-bold text-[#4F433A] group-hover:text-[#B85037] transition-colors leading-snug">
            {title}
          </h4>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 md:line-clamp-3">
            {excerpt}
          </p>
        </div>
        
        <div className="flex items-center justify-between text-xs text-gray-500 pt-1 border-t border-[#F5EFE6]">
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#B85037]" />
            <span>Tác giả: {author}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {readTime}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// 8. BREADCRUMB
interface BreadcrumbProps {
  items: { label: string; onClick?: () => void }[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500 font-sans mb-4 mt-2">
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          {idx > 0 && <span className="text-gray-300">/</span>}
          {item.onClick ? (
            <button 
              onClick={item.onClick}
              className="hover:text-[#B85037] transition-colors font-medium cursor-pointer"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-[#4F433A] font-semibold">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

// 9. FAQ ACCORDION
interface FaqItem {
  question: string;
  answer: string;
}

export const FaqAccordion: React.FC<{ items: FaqItem[] }> = ({ items }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="space-y-3.5 my-6">
      {items.map((item, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div 
            key={idx} 
            className="border border-[#E6DDD0] bg-[#FAF8F4] rounded-lg overflow-hidden transition-all"
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 bg-white hover:bg-[#FAF8F4] transition-colors focus:outline-none"
            >
              <span className="font-sans font-bold text-base md:text-lg text-[#4F433A]">
                {item.question}
              </span>
              <div className="shrink-0 text-[#B85037]">
                {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </button>
            <div 
              className={`transition-all duration-300 overflow-hidden ${
                isOpen ? "max-h-[500px] border-t border-[#E6DDD0]" : "max-h-0"
              }`}
            >
              <div className="p-5 text-[#2D2521] text-base leading-relaxed font-sans bg-[#FAF8F4]">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// 10. STICKY TABLE OF CONTENTS (TOC)
interface TocItem {
  id: string;
  label: string;
}

export const StickyToc: React.FC<{ items: TocItem[]; activeId: string; onSelect: (id: string) => void }> = ({ 
  items, 
  activeId, 
  onSelect 
}) => {
  return (
    <div className="bg-white border border-[#E6DDD0] rounded-xl p-5 sticky top-24 shadow-xs">
      <h4 className="font-sans font-bold text-sm text-[#4F433A] uppercase tracking-wider mb-4 pb-2 border-b border-[#F5EFE6]">
        Mục lục bài viết
      </h4>
      <nav className="space-y-3">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`block w-full text-left text-sm font-sans py-1.5 px-3 rounded-md transition-colors border-l-2 cursor-pointer ${
                isActive 
                  ? "border-[#B85037] text-[#B85037] bg-[#FDF5F2] font-semibold" 
                  : "border-transparent text-gray-600 hover:text-[#B85037] hover:bg-gray-50"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="mt-6 pt-5 border-t border-[#F5EFE6] text-xs text-gray-400">
        Cung cấp bởi chuyên gia <strong className="text-gray-500">Nguyễn Việt Lộc</strong>.
      </div>
    </div>
  );
};

// 11. REGION LINK CARD
interface RegionLinkCardProps {
  name: string;
  icon?: React.ReactNode;
  provincesCount: number;
  onClick: () => void;
}

export const RegionLinkCard: React.FC<RegionLinkCardProps> = ({ name, provincesCount, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-[#FDFBF9] hover:bg-[#F5ECE1] border border-[#E6DDD0] hover:border-[#B85037] p-4 rounded-xl flex items-center justify-between gap-4 cursor-pointer transition-all shadow-2xs hover:shadow-xs group"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-[#F5ECE1] group-hover:bg-[#B85037]/10 flex items-center justify-center text-[#B85037]">
          <MapPin className="w-5 h-5" />
        </div>
        <div>
          <h5 className="font-sans font-bold text-base text-[#4F433A] group-hover:text-[#B85037] transition-colors">
            {name}
          </h5>
          <span className="text-xs text-gray-500 font-sans">
            {provincesCount} tỉnh thành trồng trọng điểm
          </span>
        </div>
      </div>
      <div className="text-[#B85037] transform group-hover:translate-x-1 transition-transform">
        <ChevronRight className="w-5 h-5" />
      </div>
    </div>
  );
};

// 12. BOTTOM MOBILE CTA BAR
export const BottomMobileCtaBar: React.FC<{ herbName?: string; onCtaClick: () => void }> = ({ 
  herbName = "dược liệu", 
  onCtaClick 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#D08620] border-t border-amber-500 p-4 shadow-xl z-40 animate-slide-up flex items-center justify-between md:max-w-2xl md:mx-auto md:rounded-t-xl">
      <div className="flex-1 pr-3 flex items-center gap-2 text-white">
        <Leaf className="w-5 h-5 shrink-0 text-amber-100 hidden sm:block" />
        <div className="text-xs sm:text-sm font-sans leading-tight">
          Cần bán <strong className="text-white">{herbName}</strong> được giá, cam kết bao tiêu?
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onCtaClick}
          className="bg-white hover:bg-amber-50 text-[#9F5E08] font-sans font-bold text-xs sm:text-sm px-4 py-2 rounded-md shadow-sm transition-transform active:scale-95 whitespace-nowrap cursor-pointer"
        >
          Liên hệ VIETMEC
        </button>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-amber-100 hover:text-white p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
