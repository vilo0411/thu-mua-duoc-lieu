import React from "react";
import { Calendar, Clock, User } from "lucide-react";
import { Link } from "react-router-dom";
import { asset } from "../../lib/paths";
import { toIsoDate } from "../../lib/seo";

interface ArticleCardProps {
  title: string;
  category: string;
  excerpt: string;
  image: string;
  readTime: string;
  author: string;
  date: string;
  to: string;
  /** Dạng dọc gọn cho lưới 3 cột (thư viện bài viết); mặc định là dạng ngang ảnh trái. */
  compact?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  category,
  excerpt,
  image,
  readTime,
  author,
  date,
  to,
  compact = false
}) => {
  // Ngày trong content là dd/mm/yyyy; <time dateTime> cần ISO để máy đọc được.
  // Không parse được thì BỎ HẲN thẻ <time> — dateTime sai định dạng là lỗi W3C thật.
  const iso = toIsoDate(date);
  return (
    // <article> + link ở tiêu đề + overlay ::after — xem chú thích ở HerbCard.
    <article
      className={`relative bg-white rounded-xl overflow-hidden border border-[#E6DDD0] hover:border-[#B85037] shadow-xs hover:shadow-md transition-all group cursor-pointer flex h-full ${
        compact ? "flex-col" : "flex-col md:flex-row md:max-h-64"
      }`}
    >
      <div className={`bg-gray-100 overflow-hidden relative ${compact ? "aspect-video" : "md:w-1/3 aspect-video md:aspect-auto"}`}>
        <img
          src={asset(image)}
          alt={title}
          referrerPolicy="no-referrer"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 bg-[#D08620] text-white text-xs font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
          {category}
        </div>
      </div>
      <div className={`flex flex-col justify-between flex-1 ${compact ? "p-4 gap-2" : "p-5 md:w-2/3 space-y-3"}`}>
        <div className="space-y-2">
          <h3
            className={`font-serif font-bold text-[#4F433A] group-hover:text-[#B85037] transition-colors leading-snug ${
              compact ? "text-base line-clamp-2" : "text-lg md:text-xl"
            }`}
          >
            <Link to={to} className="after:absolute after:inset-0 after:content-['']">
              {title}
            </Link>
          </h3>
          <p className={`text-gray-600 text-sm leading-relaxed ${compact ? "line-clamp-2" : "line-clamp-2 md:line-clamp-3"}`}>
            {excerpt}
          </p>
        </div>

        {/* Dạng gọn chỉ giữ thời gian đọc — tên tác giả & ngày lặp lại trên mọi thẻ, gây nhiễu khi xếp 3 cột. */}
        {compact ? (
          <div className="flex items-center gap-1 text-xs text-gray-500 pt-2 border-t border-[#F5EFE6]">
            <Clock className="w-3.5 h-3.5" />
            {readTime}
            {/* Ngày bị ẩn khỏi dạng gọn cho đỡ nhiễu, nhưng vẫn phát ra cho máy đọc. */}
            {iso && <time dateTime={iso} className="sr-only">{date}</time>}
          </div>
        ) : (
          <div className="flex items-center justify-between text-xs text-gray-500 pt-1 border-t border-[#F5EFE6]">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#B85037]" />
              <span>Tác giả: {author}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {iso ? <time dateTime={iso}>{date}</time> : date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {readTime}
              </span>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
