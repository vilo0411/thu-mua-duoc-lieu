import React from "react";
import { ChevronLeft, ChevronRight, Play, PlayCircle, ExternalLink } from "lucide-react";
import type { HerbMedia } from "../../types";

interface MediaCarouselProps {
  items: HerbMedia[];
  heading?: string;
  subheading?: string;
}

/** URL nhúng cho từng nền tảng. Đều là URL tuyệt đối nên KHÔNG bọc asset(). */
const embedSrc = (m: HerbMedia): string =>
  m.type === "youtube"
    ? `https://www.youtube-nocookie.com/embed/${m.id}?rel=0`
    : `https://www.tiktok.com/player/v1/${m.id}`;

/** Ảnh thu nhỏ (chỉ YouTube có sẵn); TikTok trả null để rơi về ô play mặc định. */
const thumbUrl = (m: HerbMedia): string | null =>
  m.type === "youtube" ? `https://img.youtube.com/vi/${m.id}/hqdefault.jpg` : null;

const watchUrl = (m: HerbMedia): string =>
  m.type === "youtube"
    ? `https://www.youtube.com/watch?v=${m.id}`
    : `https://www.tiktok.com/@/video/${m.id}`;

/**
 * Carousel video thực địa với playlist thumbnail (giống trình phát có danh sách).
 * Chỉ mount iframe của slide đang xem (lazy) — các slide khác chỉ là ảnh thu nhỏ, không tải iframe.
 * Fade chuyển slide dùng animate-fade-in (index.css đã reset khi prefers-reduced-motion).
 */
export const MediaCarousel: React.FC<MediaCarouselProps> = ({
  items,
  heading = "Video vùng trồng",
  subheading = "Thu hoạch, sơ chế & thị trường thực tế",
}) => {
  const [active, setActive] = React.useState(0);
  if (items.length === 0) return null;

  const total = items.length;
  const current = items[active];
  const go = (dir: number) => setActive((i) => (i + dir + total) % total);
  const isPortrait = current.type === "tiktok";
  const multi = total > 1;

  return (
    <section className="space-y-4">
      {/* Tiêu đề mục — đồng bộ pattern header các section khác */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-sand flex items-center justify-center shrink-0">
          <PlayCircle className="w-5 h-5 text-terracotta" />
        </div>
        <div className="min-w-0">
          <h3 className="font-serif text-xl font-bold text-ink-soft leading-tight">{heading}</h3>
          <p className="text-xs text-gray-500 font-sans">{subheading}</p>
        </div>
        {multi && (
          <span className="ml-auto shrink-0 text-xs font-semibold text-terracotta bg-paper-2 border border-line rounded-full px-2.5 py-1 tabular-nums">
            {active + 1}/{total}
          </span>
        )}
      </div>

      {/* Thẻ chứa: player bên trái, playlist bên phải (desktop) / xếp dọc (mobile) */}
      <div className="rounded-2xl border border-line bg-white overflow-hidden flex flex-col lg:flex-row">
        {/* Sân khấu video */}
        <div className="lg:flex-1 p-3 md:p-4">
          <div className="relative rounded-xl overflow-hidden bg-pine-900 flex items-center justify-center min-h-[200px] lg:h-[400px]">
            <div
              key={active}
              className={`animate-fade-in ${
                isPortrait
                  ? "mx-auto aspect-9/16 max-w-[320px] lg:max-w-none lg:h-full lg:w-auto"
                  : "w-full aspect-video lg:w-auto lg:h-full"
              }`}
            >
              <iframe
                src={embedSrc(current)}
                title={current.title ?? "Video vùng trồng"}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {multi && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Video trước"
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 hover:bg-white text-ink flex items-center justify-center shadow-md transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Video kế tiếp"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 hover:bg-white text-ink flex items-center justify-center shadow-md transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Chú thích + link mở gốc */}
          <div className="mt-3 flex items-start justify-between gap-3">
            {current.title && (
              <p className="text-sm font-semibold text-ink-soft font-sans leading-snug">{current.title}</p>
            )}
            <a
              href={watchUrl(current)}
              target="_blank"
              rel="noopener"
              className="shrink-0 inline-flex items-center gap-1 text-xs font-semibold text-terracotta hover:text-terracotta-dark transition-colors"
            >
              Xem gốc <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Playlist thumbnail */}
        {multi && (
          <div className="border-t lg:border-t-0 lg:border-l border-line bg-paper-2 lg:w-72 shrink-0 flex flex-col">
            <div className="px-4 pt-3 pb-2 text-xs font-semibold text-ink-soft uppercase tracking-wide font-sans">
              Danh sách · {total} video
            </div>
            <ul className="flex flex-col gap-1 px-2 pb-2 max-h-[240px] overflow-y-auto lg:max-h-none lg:flex-1 lg:overflow-visible">
              {items.map((m, i) => {
                const t = thumbUrl(m);
                const on = i === active;
                return (
                  <li key={`${m.id}-${i}`} className="lg:flex-1">
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-current={on}
                      className={`group w-full h-full flex items-start lg:items-center gap-3 p-2 rounded-lg text-left transition-colors cursor-pointer ${
                        on ? "bg-sand" : "hover:bg-white"
                      }`}
                    >
                      <div className="relative w-28 lg:w-32 shrink-0 aspect-video rounded-md overflow-hidden bg-pine-900">
                        {t ? (
                          <img
                            src={t}
                            alt=""
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/70">
                            <Play className="w-5 h-5" />
                          </div>
                        )}
                        <div
                          className={`absolute inset-0 flex items-center justify-center transition-colors ${
                            on ? "bg-terracotta/25" : "bg-black/10 group-hover:bg-black/0"
                          }`}
                        >
                          <Play
                            className={`w-5 h-5 drop-shadow ${on ? "text-white" : "text-white/90"}`}
                            fill="currentColor"
                          />
                        </div>
                        {on && <span className="absolute inset-0 ring-2 ring-terracotta rounded-md" />}
                      </div>
                      <div className="min-w-0 flex-1 py-0.5">
                        <span
                          className={`block text-sm font-sans leading-snug line-clamp-2 ${
                            on ? "text-terracotta font-semibold" : "text-ink-soft"
                          }`}
                        >
                          {m.title ?? `Video ${i + 1}`}
                        </span>
                        <span className="block mt-0.5 text-[11px] text-gray-400 uppercase tracking-wide">
                          {m.type === "youtube" ? "YouTube" : "TikTok"}
                        </span>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};
