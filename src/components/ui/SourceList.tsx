import React from "react";
import { ExternalLink } from "lucide-react";
import type { ContentSource } from "../../types";

/**
 * Mục "Nguồn tham khảo" cuối bài.
 *
 * Site định vị là người TỔNG HỢP chứ không phải chuyên gia, nên dẫn nguồn là lời hứa
 * cốt lõi — mục này hiện thực hoá lời hứa đó cho người đọc, còn JSON-LD phát cùng dữ
 * liệu qua `Article.citation` cho máy. Không có `sources` thì không render gì: thà
 * vắng còn hơn dựng một mục nguồn rỗng.
 */
export const SourceList: React.FC<{ sources?: ContentSource[] }> = ({ sources }) => {
  if (!sources?.length) return null;
  return (
    <section className="pt-4">
      <h2 className="font-serif text-lg font-bold text-ink-soft mb-3">Nguồn tham khảo</h2>
      <ol className="space-y-2 text-sm font-sans text-gray-600 pl-5">
        {sources.map((s) => (
          <li key={s.url}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener nofollow"
              className="text-[#B85037] hover:underline inline-flex items-start gap-1"
            >
              {s.title}
              <ExternalLink className="w-3.5 h-3.5 shrink-0 mt-0.5" aria-hidden="true" />
            </a>
            {s.publisher && <span className="text-gray-500"> — {s.publisher}</span>}
          </li>
        ))}
      </ol>
    </section>
  );
};
