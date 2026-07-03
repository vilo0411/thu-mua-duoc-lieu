import React from "react";
import { Globe, Mail, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SITE_OWNER } from "../lib/data";
import { Breadcrumb } from "../components/ui";
import { paths } from "../lib/paths";
import { Seo, aboutSeo } from "../lib/seo";

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      <Seo {...aboutSeo()} />
      <Breadcrumb items={[{ label: "Trang chủ", onClick: () => navigate(paths.home()) }, { label: "Về tôi" }]} />
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
