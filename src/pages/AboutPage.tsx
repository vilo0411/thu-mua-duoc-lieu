import React from "react";
import { Globe, Mail, MapPin, User } from "lucide-react";
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
      <section className="bg-white border border-line rounded-2xl p-6 md:p-10 space-y-6">
        <div className="flex flex-col md:flex-row items-center gap-6 pb-6 border-b border-sand">
          <div className="w-24 h-24 rounded-full bg-terracotta/10 flex items-center justify-center text-terracotta shrink-0">
            <User className="w-12 h-12" />
          </div>
          <div className="space-y-1 text-center md:text-left">
            <span className="text-terracotta font-mono text-xs font-bold uppercase tracking-[0.15em] block mb-1">// Kỹ sư nông học · Thực địa dược liệu</span>
            <h1 className="font-serif text-3xl font-bold text-ink-soft">{SITE_OWNER}</h1>
            <p className="text-sm text-gray-500 font-mono">lien-he@nguyenvietloc.com · nguyenvietloc.com</p>
          </div>
        </div>

        <div className="space-y-5 text-base text-ink leading-relaxed font-sans">
          <p>
            Tôi là <strong>Nguyễn Việt Lộc</strong>, kỹ sư nông học, hơn 12 năm đi thực địa tại các vùng trồng dược liệu miền núi phía Bắc và Tây Nguyên. Tôi đã khảo sát vùng nguyên liệu tại Sơn La, Hòa Bình, Lào Cai, Kon Tum — làm việc trực tiếp với hộ nông dân, tổ hợp tác và các cơ sở sấy chiết nhỏ.
          </p>

          <div className="bg-paper-2 border border-line rounded-xl p-5 space-y-2">
            <h3 className="font-serif font-bold text-lg text-ink-soft">Tại sao tôi làm trang này</h3>
            <p>
              Năm 2019, tôi chứng kiến bà con ở một bản tại Hòa Bình trồng đinh lăng theo phong trào, không có hợp đồng trước. Đến vụ thu hoạch, thương lái ép giá từ 120.000đ xuống còn 28.000đ/kg khô — hoặc bỏ đặt cọc luôn. Cả bản lỗ nặng.
            </p>
            <p>
              Chuyện đó xảy ra lặp đi lặp lại ở nhiều nơi vì hai nguyên nhân gốc: <strong>kỹ thuật canh tác chưa đạt</strong> khiến dược liệu bị từ chối, và <strong>thiếu thông tin giá cả</strong> khiến bà con không biết mình đang bị ép. Trang này là cách tôi góp phần giải hai bài toán đó — chia sẻ kỹ thuật thực địa và cập nhật giá thu mua theo mùa vụ.
            </p>
          </div>

          <p>
            Trang này <strong>độc lập</strong> — tôi không đại diện cho bất kỳ đơn vị thu mua nào. Thông tin giá và kênh tiêu thụ tôi chia sẻ là tổng hợp từ khảo sát thực tế, không thiên vị đầu mối nào. Khi tôi giới thiệu một đơn vị thu mua cụ thể, tôi nói rõ đó là một trong nhiều lựa chọn và bà con nên so sánh trước khi quyết định.
          </p>

          <p>
            Bà con, HTX hay cán bộ khuyến nông có câu hỏi về kỹ thuật, giá cả hoặc cách tìm đầu ra — cứ liên hệ thẳng với tôi qua email bên dưới.
          </p>
        </div>

        <div className="bg-paper-2 p-5 rounded-xl border border-line space-y-3">
          <h4 className="font-serif text-lg font-bold text-ink-soft">Liên hệ trực tiếp</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-terracotta shrink-0" />
              <span>Email: <strong>lien-he@nguyenvietloc.com</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-terracotta shrink-0" />
              <span>Website: <strong>nguyenvietloc.com</strong></span>
            </div>
            <div className="flex items-center gap-2 sm:col-span-2">
              <MapPin className="w-4 h-4 text-terracotta shrink-0" />
              <span>Vùng đã khảo sát: Tây Bắc, Đông Bắc, Bắc Trung Bộ, Tây Nguyên</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
