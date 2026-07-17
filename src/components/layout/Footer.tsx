import React from "react";
import { ArrowRight, Globe, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { paths } from "../../lib/paths";
import {
  HERBS_DATA,
  OWNER_EMAIL,
  OWNER_URL,
  SITE_OWNER,
  WIKI_ARTICLES,
} from "../../lib/data";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-pine-900 text-white border-t-4 border-terracotta pt-12 pb-8 px-4 sm:px-6 mt-16">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* 4 columns section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Về Tác giả */}
          <div className="space-y-4 text-left">
            <h2 className="font-serif text-lg font-bold text-[#EFE6DA] uppercase tracking-wider border-b border-white/10 pb-2">
              Về Tác giả
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed font-sans">
              Nguyễn Viết Lộc tổng hợp các kỹ thuật canh tác dược liệu, giá thu mua và cách tìm kênh tiêu thụ phù hợp từ các nguồn uy tín — dành cho nông dân, HTX và cán bộ khuyến nông.
            </p>
            <Link
              to={paths.about()}
              className="text-[#D08620] hover:text-[#E19224] text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>Tìm hiểu về tôi</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Column 2: Thu mua dược liệu */}
          <div className="space-y-4 text-left">
            <h2 className="font-serif text-lg font-bold text-[#EFE6DA] uppercase tracking-wider border-b border-white/10 pb-2">
              Thu mua dược liệu
            </h2>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to={paths.pillar()} className="hover:text-white transition-colors cursor-pointer text-left">
                  • Bảng giá thua mua dược liệu cập nhật
                </Link>
              </li>
              {HERBS_DATA.slice(0, 5).map((h) => (
                <li key={h.id}>
                  <Link
                    to={paths.herb(h.slug)}
                    className="hover:text-white transition-colors cursor-pointer text-left capitalize"
                  >
                    • Thu mua dược liệu {h.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Kiến thức */}
          <div className="space-y-4 text-left">
            <h2 className="font-serif text-lg font-bold text-[#EFE6DA] uppercase tracking-wider border-b border-white/10 pb-2">
              Kiến thức canh tác
            </h2>
            <ul className="space-y-2 text-sm text-gray-300">
              {WIKI_ARTICLES.map((art) => (
                <li key={art.id}>
                  <Link
                    to={paths.article(art.id)}
                    className="hover:text-white transition-colors cursor-pointer text-left line-clamp-1"
                  >
                    • {art.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link to={paths.hubWiki("dinh-lang")} className="hover:text-white transition-colors cursor-pointer text-left">
                  • Kỹ thuật phòng sâu bệnh mọc rễ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Liên hệ */}
          <div className="space-y-4 text-left">
            <h2 className="font-serif text-lg font-bold text-[#EFE6DA] uppercase tracking-wider border-b border-white/10 pb-2">
              Liên hệ trực tiếp
            </h2>
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
                <span className="text-xs">Liên hệ trực tuyến — phản hồi qua email</span>
              </div>
            </div>
            <div className="pt-1">
              <Link
                to={paths.contact()}
                className="bg-[#D08620] hover:bg-[#E19224] text-white font-sans font-bold text-xs px-4 py-2 rounded-md shadow-sm transition-colors cursor-pointer inline-block text-center"
              >
                Gửi yêu cầu tư vấn
              </Link>
            </div>
          </div>
        </div>

        {/* Disclaimer paragraph below columns */}
        <div className="border-t border-white/10 pt-6 text-xs text-gray-400 font-sans leading-relaxed text-left space-y-2">
          <p className="font-bold text-[#EFE6DA]">Tuyên bố trách nhiệm độc lập:</p>
          <p>
            Nội dung trên {OWNER_URL} do {SITE_OWNER} tổng hợp độc lập từ các nguồn tham khảo (tài liệu khuyến nông, viện dược liệu, kinh nghiệm bà con vùng trồng). Thông tin giá thu mua và kênh tiêu thụ mang tính tham khảo — bà con nên xác minh lại với đơn vị mua trực tiếp trước khi giao dịch. Trang không đại diện cho bất kỳ doanh nghiệp thu mua nào.
          </p>
        </div>

        {/* Legal / policy links */}
        <nav
          aria-label="Chính sách & pháp lý"
          className="border-t border-white/10 pt-6 flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-400"
        >
          <Link to={paths.editorial()} className="hover:text-white transition-colors cursor-pointer">Chính sách nội dung</Link>
          <span aria-hidden>•</span>
          <Link to={paths.privacy()} className="hover:text-white transition-colors cursor-pointer">Chính sách bảo mật</Link>
          <span aria-hidden>•</span>
          <Link to={paths.terms()} className="hover:text-white transition-colors cursor-pointer">Điều khoản sử dụng</Link>
          <span aria-hidden>•</span>
          <Link to={paths.disclaimer()} className="hover:text-white transition-colors cursor-pointer">Miễn trừ trách nhiệm</Link>
          <span aria-hidden>•</span>
          <Link to={paths.about()} className="hover:text-white transition-colors cursor-pointer">Giới thiệu tác giả</Link>
          <span aria-hidden>•</span>
          <Link to={paths.sitemap()} className="hover:text-white transition-colors cursor-pointer">Sơ đồ trang</Link>
        </nav>

        {/* Copyright bar */}
        <div className="border-t border-white/10 pt-6 text-xs text-gray-400">
          <span>© 2026 Nguyễn Viết Lộc. Bảo lưu mọi quyền.</span>
        </div>

      </div>
    </footer>
  );
};
