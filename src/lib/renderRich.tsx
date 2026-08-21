import React from "react";
import { Link } from "react-router-dom";

// Nội dung JSON được phép nhúng link bằng cú pháp markdown [nhãn](đường-dẫn).
// Mọi nơi hiển thị text lấy từ content/wiki/*.json đều phải đi qua renderRich,
// nếu không người đọc sẽ thấy nguyên chuỗi "[Cà gai leo](/kien-thuc/...)".
// Link nội bộ ("/...") render bằng <Link> của react-router → là thẻ <a href> thật, crawl được
// và tự gắn basename khi deploy GitHub Pages; link ngoài (http) mở tab mới an toàn.
const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;

const linkClass =
  "text-terracotta font-semibold underline decoration-terracotta/40 underline-offset-2 hover:decoration-terracotta";

export function renderRich(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  LINK_RE.lastIndex = 0;
  while ((m = LINK_RE.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const [, label, href] = m;
    parts.push(
      href.startsWith("/") ? (
        <Link key={m.index} to={href} className={linkClass}>
          {label}
        </Link>
      ) : (
        <a key={m.index} href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {label}
        </a>
      ),
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length ? parts : text;
}

// Bản text thuần: dùng cho lọc/tìm kiếm, suy luận icon, hoặc chỗ chỉ nhận string
// (placeholder, aria-label) — nơi thẻ <a> không có ý nghĩa.
export function stripRich(text: string): string {
  return text.replace(LINK_RE, "$1");
}
