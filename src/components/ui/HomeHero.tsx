import React from "react";
import { ArrowRight, Sprout } from "lucide-react";

interface HomeHeroProps {
  ownerName: string;
  /** Ảnh nền vùng trồng (dùng biến thể phân giải cao của herb.image). */
  imageUrl: string;
  stats: { value: string; label: string }[];
  onSeePrices: () => void;
  onLearn: () => void;
}

/** Nhãn phân loại chạy dưới hero — mã hoá 3 trục nội dung thật của site. */
const RAILS = ["Kỹ thuật trồng", "Giá thu mua", "Vùng trồng"];

/**
 * Hero full-bleed giàu hình ảnh, mở đầu bằng luận điểm thương hiệu.
 * Ảnh vùng trồng phủ overlay pine để chữ luôn đọc rõ; typography khổ lớn.
 * "Phá khung" max-w-7xl của Layout bằng w-screen + margin âm (Layout đã overflow-x-clip).
 */
export const HomeHero: React.FC<HomeHeroProps> = ({ ownerName, imageUrl, stats, onSeePrices, onLearn }) => {
  return (
    <section
      id="homepage-hero"
      className="relative full-bleed -mt-6 md:-mt-10 overflow-hidden bg-pine-900 text-white animate-fade-in"
    >
      {/* Ảnh nền + overlay để bảo đảm tương phản chữ */}
      <img
        src={imageUrl}
        alt=""
        aria-hidden="true"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-45"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-pine-900 via-pine-900/85 to-pine-900/50 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-pine-900/80 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-10 md:pt-24 md:pb-16">
        {/* Eyebrow editorial */}
        <div className="flex items-center gap-2 text-earth font-mono text-xs sm:text-sm uppercase tracking-[0.2em]">
          <Sprout className="w-4 h-4 shrink-0" />
          <span>// Blog thực địa độc lập của {ownerName}</span>
        </div>

        <h1 className="mt-5 font-serif font-extrabold leading-[1.02] tracking-tight text-[2.6rem] sm:text-6xl lg:text-7xl max-w-4xl">
          Trồng dược liệu đúng kỹ thuật,
          <br />
          <span className="text-earth">bán được giá</span> xứng đáng.
        </h1>

        <p className="mt-6 max-w-xl text-base md:text-lg text-white/80 leading-relaxed">
          Nơi tôi chia sẻ kinh nghiệm canh tác chuẩn GACP-WHO và theo sát giá thu mua thực tế —
          để bà con không còn cảnh “được mùa mất giá”.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            onClick={onSeePrices}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-terracotta hover:bg-terracotta-dark px-7 py-3.5 font-sans font-bold text-white transition-colors cursor-pointer"
          >
            Xem bảng giá thu mua
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onLearn}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 hover:border-white hover:bg-white/10 px-7 py-3.5 font-sans font-bold text-white transition-colors cursor-pointer"
          >
            Học kỹ thuật trồng
          </button>
        </div>

        {/* Dải số liệu tin cậy — suy từ dữ liệu thật */}
        <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-5 border-t border-white/15 pt-7">
          {stats.map((s) => (
            <div key={s.label} className="flex items-baseline gap-2.5">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-serif font-extrabold text-3xl md:text-4xl text-earth tracking-tight">{s.value}</dd>
              <span className="text-sm text-white/70 max-w-28 leading-tight">{s.label}</span>
            </div>
          ))}
        </dl>
      </div>

      {/* Hàng nhãn phân loại — nhịp editorial mượn từ mẫu tham khảo */}
      <div className="relative z-10 border-t border-white/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-white/60 font-mono uppercase tracking-wider">
          {RAILS.map((r, i) => (
            <React.Fragment key={r}>
              {i > 0 && <span className="text-white/25" aria-hidden="true">·</span>}
              <span>{r}</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
