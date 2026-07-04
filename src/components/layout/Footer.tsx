import React from "react";
import { ArrowRight, Globe, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { paths } from "../../lib/paths";
import {
  HERBS_DATA,
  OWNER_EMAIL,
  OWNER_URL,
  PARTNER_COMPANY,
  SITE_OWNER,
  WIKI_ARTICLES,
} from "../../lib/data";
import { AccessibilityBar } from "../ui";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-pine-900 text-white border-t-4 border-terracotta pt-12 pb-8 px-4 sm:px-6 mt-16">
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
            <h4 className="font-serif text-lg font-bold text-[#EFE6DA] uppercase tracking-wider border-b border-white/10 pb-2">
              Thu mua dược liệu
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to={paths.pillar()} className="hover:text-white transition-colors cursor-pointer text-left">
                  • Bảng giá dược liệu hôm nay
                </Link>
              </li>
              {HERBS_DATA.slice(0, 5).map((h) => (
                <li key={h.id}>
                  <Link
                    to={paths.herb(h.slug)}
                    className="hover:text-white transition-colors cursor-pointer text-left capitalize"
                  >
                    • Thu mua rễ củ {h.name}
                  </Link>
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
            Các kiến thức, báo cáo kiểm định và chỉ số dải giá giao dịch đăng tải trên trang điện tử cá nhân {OWNER_URL} đều do nhà sáng lập chuyên gia nông học {SITE_OWNER} trực tiếp khảo nghiệm thực tế, biên tập độc lập và chịu trách nhiệm khách quan. Việc gợi ý và hướng dẫn đấu nối tới bộ phận thu gom bao tiêu của tập đoàn dược liệu {PARTNER_COMPANY.name} (mã {PARTNER_COMPANY.stockCode}) dựa trên chất lượng nhà máy sấy đạt chuẩn GMP-WHO thực tế để bảo vệ lợi ích tối đa của nông hộ, hoàn toàn không mang tính quảng cáo thương mại ép buộc.
          </p>
        </div>

        {/* Copyright bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <span className="text-left">
            © 2026 Nguyễn Việt Lộc. Bảo lưu mọi quyền.
          </span>
          <div className="hidden md:block">
            <AccessibilityBar tone="dark" />
          </div>
          <div className="flex gap-4">
            <Link to={paths.about()} className="hover:text-white transition-colors cursor-pointer">Giới thiệu tác giả</Link>
            <span>•</span>
            <Link to={paths.contact()} className="hover:text-white transition-colors cursor-pointer">Báo cáo vi phạm giống cây giống giả</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
