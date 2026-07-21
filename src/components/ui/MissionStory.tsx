import React from "react";
import { ArrowRight, Quote } from "lucide-react";
import { Link } from "react-router-dom";

interface MissionStoryProps {
  imageUrl: string;
  readStoryTo: string;
}

/**
 * Band "câu chuyện / sứ mệnh" — điểm nhớ chính (signature) của trang chủ.
 * Full-bleed nền pine, ảnh vùng trồng một bên, kể lý do trang ra đời:
 * nạn "được mùa mất giá", thương lái ép giá, và vai trò kết nối đối tác bao tiêu.
 * Copy tái sử dụng từ AboutPage + bài wiki liên kết ba bên.
 */
export const MissionStory: React.FC<MissionStoryProps> = ({ imageUrl, readStoryTo }) => {
  return (
    <section
      id="homepage-mission"
      aria-labelledby="mission-heading"
      className="relative mt-16 rounded-3xl bg-pine-800 text-white overflow-hidden"
    >
      <div className="px-6 sm:px-10 lg:px-14 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Cột nội dung */}
        <div className="order-2 lg:order-1">
          <span className="text-earth font-mono text-xs sm:text-sm uppercase tracking-[0.2em]">
            // Vì sao có trang này
          </span>

          <h2
            id="mission-heading"
            className="mt-4 font-serif font-bold leading-tight tracking-tight text-3xl md:text-4xl lg:text-[2.75rem]"
          >
            Từ <span className="text-earth">150.000đ</span> rớt còn{" "}
            <span className="text-earth">20.000đ/kg</span> — tôi lập trang này để chuyện đó
            đừng lặp lại.
          </h2>

          <div className="mt-6 space-y-4 text-white/80 leading-relaxed max-w-xl">
            <p>
              Đọc và nghe quá nhiều câu chuyện bà con Tây Bắc, Đông Bắc rủ nhau trồng ồ ạt theo
              phong trào mà không có hợp đồng bao tiêu. Đến vụ, thương lái ép giá từ 150.000đ xuống
              còn 20.000đ/kg, thậm chí bỏ mặc nông sản thối rữa tại ruộng.
            </p>
            <p>
              Nguyên nhân tình trạng này là do{" "}
              <strong className="text-white font-semibold">kỹ thuật canh tác còn yếu</strong> khiến
              dược liệu dính dư lượng, bị từ chối mua; {" "}
              <strong className="text-white font-semibold">đầu ra bấp bênh</strong> vì phụ thuộc
              thương lái trôi nổi. Tôi xây dựng trang này để tổng hợp kỹ thuật từ nguồn uy tín và thông tin các kênh tiêu
              thụ để bà con tự quyết định kênh bán phù hợp với quy mô của mình.
            </p>
          </div>

          {/* Pull-quote sứ mệnh */}
          <blockquote className="mt-7 flex gap-3 border-l-2 border-earth pl-4 text-white/90 italic">
            <Quote className="w-5 h-5 shrink-0 text-earth/80 -scale-x-100" aria-hidden="true" />
            <p className="font-serif text-lg leading-snug">
              Chuyển từ trồng tự phát sang liên kết ký hợp đồng bao tiêu là con đường bền vững để bà
              con làm giàu — tôi muốn góp phần bằng cách cung cấp thông tin hữu ích, dẫn nguồn rõ ràng.
            </p>
          </blockquote>

          <Link
            to={readStoryTo}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white text-pine-900 hover:bg-earth hover:text-pine-900 px-6 py-3 font-sans font-bold transition-colors cursor-pointer"
          >
            Đọc câu chuyện đầy đủ
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Cột ảnh */}
        <div className="order-1 lg:order-2">
          <div className="relative aspect-4/3 lg:aspect-square rounded-2xl overflow-hidden ring-1 ring-white/15">
            <img
              src={imageUrl}
              alt="Vùng trồng dược liệu thực địa"
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pine-900/40 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 font-mono text-xs uppercase tracking-wider text-white/85 bg-pine-900/50 backdrop-blur-xs rounded-full px-3 py-1">
              Vùng trồng · Tây Bắc
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
