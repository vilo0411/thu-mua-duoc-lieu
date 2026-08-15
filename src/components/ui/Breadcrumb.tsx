import React from "react";
import { Link } from "react-router-dom";

interface BreadcrumbProps {
  // href: đường dẫn nội bộ → render <Link> (thẻ <a> thật, crawl được). Mục cuối bỏ href = nhãn tĩnh.
  items: { label: string; href?: string }[];
}

/**
 * Đường dẫn phân cấp. Dùng <ol> vì thứ tự là ý nghĩa, và khớp với `BreadcrumbList`
 * phát trong JSON-LD — hai cách biểu đạt phải nói cùng một chuyện.
 */
export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="Đường dẫn" className="mb-4 mt-2">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500 font-sans list-none p-0 m-0">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-1.5">
            {idx > 0 && (
              <span aria-hidden="true" className="text-gray-300">
                /
              </span>
            )}
            {item.href ? (
              <Link
                to={item.href}
                className="hover:text-[#B85037] transition-colors font-medium cursor-pointer"
              >
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-[#4F433A] font-semibold">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
