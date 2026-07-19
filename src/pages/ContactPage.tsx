import React from "react";
import { Breadcrumb } from "../components/ui";

import { paths } from "../lib/paths";
import { Seo, contactSeo } from "../lib/seo";

export const ContactPage: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in max-w-2xl mx-auto">
      <Seo {...contactSeo()} />
      <Breadcrumb items={[{ label: "Trang chủ", href: paths.home() }, { label: "Liên hệ" }]} />
      <section className="bg-white border border-line rounded-2xl p-6 md:p-8 space-y-6">
        <div className="space-y-2">
          <span className="text-terracotta font-mono text-xs font-bold uppercase tracking-[0.15em] block mb-1">// Gửi phản hồi</span>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-ink-soft tracking-tight">Hộp Thư Tư Vấn Nguyễn Viết Lộc</h1>
          <p className="text-sm text-gray-600">
            Bà con có câu hỏi về kỹ thuật trồng, sâu bệnh, giá thu mua hay kênh tiêu thụ? Cứ gửi thẳng — tôi đọc và trả lời trực tiếp.
          </p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); alert("Cảm ơn ý kiến của bà con, tôi sẽ trực tiếp hồi đáp qua thư điện tử sớm nhất!"); }} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-ink-soft mb-1">Họ và tên bà con</label>
              <input required type="text" placeholder="Nguyễn Văn A" className="w-full px-4 py-2 border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink-soft mb-1">Số điện thoại liên lạc</label>
              <input required type="tel" placeholder="0912345678" className="w-full px-4 py-2 border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink-soft mb-1">Địa chỉ Email (Nếu có)</label>
            <input type="email" placeholder="lien-he@nguyenvietloc.com" className="w-full px-4 py-2 border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink-soft mb-1">Nội dung thắc mắc / Đề xuất vùng trồng</label>
            <textarea required rows={4} placeholder="Mô tả chi tiết diện tích đất đồi sỏi, loại cây định gieo trồng hoặc tình trạng sâu bệnh..." className="w-full px-4 py-2 border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta"></textarea>
          </div>

          <button type="submit" className="w-full bg-terracotta hover:bg-terracotta-dark text-white font-bold py-3 rounded-lg shadow-md transition-colors cursor-pointer text-center">
            Gửi tin nhắn tư vấn
          </button>
        </form>

        <div className="border-t border-sand pt-5 text-xs text-gray-500 italic space-y-1">
          <p>Hộp thư cá nhân chính thức: <strong>lien-he@nguyenvietloc.com</strong></p>
          <p>Bà con cũng có thể tham khảo thông tin các kênh tiêu thụ tại <a href="/thu-mua-duoc-lieu" className="text-terracotta underline">trang thu mua dược liệu</a>.</p>
        </div>
      </section>
    </div>
  );
};
