import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  /** Nhãn cho screen reader, ví dụ "bài viết kỹ thuật". */
  label?: string;
}

/**
 * Dải số trang rút gọn: luôn có trang đầu/cuối, trang hiện tại và 1 trang kề mỗi bên;
 * phần bị cắt hiện dấu "…" (giá trị null) để không tràn hàng trên màn hình nhỏ.
 */
const pageRange = (page: number, total: number): (number | null)[] => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const keep = new Set([1, total, page, page - 1, page + 1]);
  const out: (number | null)[] = [];
  for (let p = 1; p <= total; p++) {
    if (keep.has(p)) out.push(p);
    else if (out[out.length - 1] !== null) out.push(null);
  }
  return out;
};

export const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onChange, label = "trang" }) => {
  if (totalPages <= 1) return null;

  const btn =
    "min-w-9 h-9 px-2 inline-flex items-center justify-center rounded-lg border text-sm font-sans font-semibold transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed";

  return (
    <nav aria-label={`Phân trang ${label}`} className="pt-2">
      <ul role="list" className="flex items-center justify-center gap-1.5 list-none m-0 p-0">
      <li>
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Trang trước"
        className={`${btn} border-line bg-white text-ink-soft hover:border-terracotta hover:text-terracotta`}
      >
        <ChevronLeft className="w-4 h-4" aria-hidden="true" />
      </button>
      </li>

      {pageRange(page, totalPages).map((p, i) =>
        p === null ? (
          <li key={`gap-${i}`} className="px-1 text-gray-400 select-none" aria-hidden="true">
            …
          </li>
        ) : (
          <li key={p}>
          <button
            type="button"
            onClick={() => onChange(p)}
            aria-current={p === page ? "page" : undefined}
            className={`${btn} ${
              p === page
                ? "bg-terracotta border-terracotta text-white"
                : "border-line bg-white text-ink-soft hover:border-terracotta hover:text-terracotta"
            }`}
          >
            {p}
          </button>
          </li>
        ),
      )}

      <li>
      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Trang sau"
        className={`${btn} border-line bg-white text-ink-soft hover:border-terracotta hover:text-terracotta`}
      >
        <ChevronRight className="w-4 h-4" aria-hidden="true" />
      </button>
      </li>
      </ul>
    </nav>
  );
};
