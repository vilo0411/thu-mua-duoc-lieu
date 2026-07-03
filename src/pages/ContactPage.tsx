import React from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrumb } from "../components/ui";
import { paths } from "../lib/paths";

export const ContactPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-fade-in max-w-2xl mx-auto">
      <Breadcrumb items={[{ label: "Trang chủ", onClick: () => navigate(paths.home()) }, { label: "Liên hệ" }]} />
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
