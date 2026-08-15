import React from "react";
import { Globe, Mail, MapPin } from "lucide-react";
import { SITE_OWNER } from "../lib/data";
import { Breadcrumb } from "../components/ui";
import { paths, asset } from "../lib/paths";
import { Seo, aboutSeo } from "../lib/seo";

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      <Seo {...aboutSeo()} />
      <Breadcrumb items={[{ label: "Trang chủ", href: paths.home() }, { label: "Về tôi" }]} />
      {/* <article>: trang giới thiệu là một tài liệu độc lập về tác giả. */}
      <article className="bg-white border border-line rounded-2xl p-6 md:p-10 space-y-6">
        <header className="flex flex-col md:flex-row items-center gap-6 pb-6 border-b border-sand">
          <img
            src={asset("/images/nguyen-viet-loc-avatar.webp")}
            alt={`Ảnh đại diện ${SITE_OWNER}`}
            width={96}
            height={96}
            loading="lazy"
            decoding="async"
            className="w-24 h-24 rounded-full object-cover ring-2 ring-terracotta/20 shrink-0"
          />
          <div className="space-y-1 text-center md:text-left">
            <span className="text-terracotta font-mono text-xs font-bold uppercase tracking-[0.15em] block mb-1">// Người tổng hợp · Dược liệu &amp; thu mua</span>
            <h1 className="font-serif text-3xl font-bold text-ink-soft">{SITE_OWNER}</h1>
            <address className="not-italic text-sm text-gray-500 font-mono">
              <a href="mailto:lien-he@nguyenvietloc.com" className="hover:text-terracotta hover:underline">lien-he@nguyenvietloc.com</a> · nguyenvietloc.com
            </address>
          </div>
        </header>

        <div className="space-y-5 text-base text-ink leading-relaxed font-sans">
          <p>
            Tôi tên là <strong>Nguyễn Viết Lộc</strong>. Tôi xây dựng trang web này với mục tiêu <strong>tổng hợp và đối chiếu</strong> kỹ thuật trồng, sơ chế cùng thông tin giá thu mua từ nhiều nguồn, giúp bà con dễ tra cứu và bán với mức giá tốt.
          </p>

          <aside aria-labelledby="ve-toi-vi-sao" className="bg-paper-2 border border-line rounded-xl p-5 space-y-2">
            <h2 id="ve-toi-vi-sao" className="font-serif font-bold text-lg text-ink-soft">Tại sao tôi làm trang này</h2>
            <p>
              Đọc và nghe nhiều câu chuyện bà con trồng dược liệu theo phong trào, không có hợp đồng trước, đến vụ bị thương lái ép giá xuống còn một phần nhỏ — hoặc bỏ đặt cọc luôn. Chuyện đó lặp đi lặp lại vì hai nguyên nhân gốc: <strong>kỹ thuật canh tác chưa đạt</strong> khiến dược liệu bị từ chối, và <strong>thiếu thông tin giá cả</strong> khiến bà con không biết mình đang bị ép.
            </p>
          </aside>

          <p>
            Website được xây dựng <strong>độc lập</strong> — tôi không đại diện cho bất kỳ đơn vị thu mua nào. Thông tin giá và kênh tiêu thụ là tổng hợp từ nhiều nguồn tham khảo, không thiên vị đầu mối nào. Khi tôi giới thiệu một đơn vị thu mua cụ thể, tôi nói rõ đó là một trong nhiều lựa chọn và bà con nên so sánh, xác minh trước khi quyết định.
          </p>

          <p>
            Vì là thông tin tổng hợp nên có thể còn thiếu sót — bà con, HTX hay cán bộ khuyến nông thấy chỗ nào chưa đúng, hoặc có câu hỏi về kỹ thuật, giá cả, cách tìm đầu ra, cứ liên hệ với tôi qua email bên dưới để tôi bổ sung, chỉnh sửa kịp thời.
          </p>
        </div>

        <section aria-labelledby="ve-toi-lien-he" className="bg-paper-2 p-5 rounded-xl border border-line space-y-3">
          <h2 id="ve-toi-lien-he" className="font-serif text-lg font-bold text-ink-soft">Liên hệ trực tiếp</h2>
          <address className="not-italic grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <span className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-terracotta shrink-0" aria-hidden="true" />
              <span>Email: <a href="mailto:lien-he@nguyenvietloc.com" className="font-bold text-terracotta hover:underline">lien-he@nguyenvietloc.com</a></span>
            </span>
            <span className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-terracotta shrink-0" aria-hidden="true" />
              <span>Website: <strong>duoclieu.nguyenvietloc.com</strong></span>
            </span>
            <span className="flex items-center gap-2 sm:col-span-2">
              <MapPin className="w-4 h-4 text-terracotta shrink-0" aria-hidden="true" />
              <span>Yên Hoà, Hà Nội</span>
            </span>
          </address>
        </section>
      </article>
    </div>
  );
};
