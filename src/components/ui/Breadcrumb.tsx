import React from "react";
import { Link } from "react-router-dom";

interface BreadcrumbProps {
  // href: đường dẫn nội bộ → render <Link> (thẻ <a> thật, crawl được). Mục cuối bỏ href = nhãn tĩnh.
  items: { label: string; href?: string }[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500 font-sans mb-4 mt-2">
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          {idx > 0 && <span className="text-gray-300">/</span>}
          {item.href ? (
            <Link
              to={item.href}
              className="hover:text-[#B85037] transition-colors font-medium cursor-pointer"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-[#4F433A] font-semibold">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
