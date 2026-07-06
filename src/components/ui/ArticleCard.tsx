import React from "react";
import { Calendar, Clock, User } from "lucide-react";
import { asset } from "../../lib/paths";

interface ArticleCardProps {
  title: string;
  category: string;
  excerpt: string;
  image: string;
  readTime: string;
  author: string;
  date: string;
  onClick: () => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  category,
  excerpt,
  image,
  readTime,
  author,
  date,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl overflow-hidden border border-[#E6DDD0] hover:border-[#B85037] shadow-xs hover:shadow-md transition-all group cursor-pointer flex flex-col md:flex-row h-full md:max-h-64"
    >
      <div className="md:w-1/3 aspect-video md:aspect-auto bg-gray-100 overflow-hidden relative">
        <img
          src={asset(image)}
          alt={title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 bg-[#D08620] text-white text-xs font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
          {category}
        </div>
      </div>
      <div className="p-5 md:w-2/3 flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          <h4 className="font-serif text-lg md:text-xl font-bold text-[#4F433A] group-hover:text-[#B85037] transition-colors leading-snug">
            {title}
          </h4>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 md:line-clamp-3">
            {excerpt}
          </p>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 pt-1 border-t border-[#F5EFE6]">
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#B85037]" />
            <span>Tác giả: {author}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {readTime}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
