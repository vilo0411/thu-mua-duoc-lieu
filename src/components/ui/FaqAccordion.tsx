import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { faqAnchorIds } from "../../lib/slug";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  /** Cho phép trang gọi tự dựng nội dung câu trả lời (ví dụ để render link markdown trong đáp án). */
  renderAnswer?: (answer: string) => React.ReactNode;
}

/**
 * Accordion FAQ.
 *
 * Câu hỏi là <h3> chứ không phải <span>: đây là bề mặt được máy trích dẫn nhiều
 * nhất trên site, nên phải nằm trong dàn heading và có id neo riêng. Id sinh bằng
 * `faqAnchorIds` — cùng hàm mà JSON-LD dùng cho `Question.url`, hai bên không được
 * lệch nhau. Đáp án luôn ở trong DOM (thu gọn bằng chiều cao, không phải display:none)
 * nên crawler đọc được kể cả khi đang đóng.
 */
export const FaqAccordion: React.FC<FaqAccordionProps> = ({ items, renderAnswer }) => {
  const ids = faqAnchorIds(items);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  // Mở sẵn mục được deep-link tới (#faq-…), ví dụ khi tới từ kết quả tìm kiếm.
  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.replace(/^#/, ""));
    if (!hash) return;
    const idx = ids.indexOf(hash);
    if (idx >= 0) {
      setOpenIdx(idx);
      document.getElementById(hash)?.scrollIntoView({ block: "start" });
    }
    // Chỉ chạy khi danh sách câu hỏi đổi (đổi trang), không theo dõi từng lần mở/đóng.
  }, [ids.join("|")]);

  const toggle = (idx: number) => setOpenIdx(openIdx === idx ? null : idx);

  return (
    // <ul>: đây là một danh sách các câu hỏi, không phải một chồng div.
    <ul role="list" className="space-y-3.5 my-6 list-none m-0 p-0">
      {items.map((item, idx) => {
        const isOpen = openIdx === idx;
        const id = ids[idx];
        const panelId = `${id}-answer`;
        return (
          // id GIỮ NGUYÊN trên phần tử ngoài cùng: `faqAnchorIds` dùng chung với
          // `Question.url` trong JSON-LD, lệch một chỗ là gãy deep-link.
          <li
            key={id}
            id={id}
            className="border border-[#E6DDD0] bg-[#FAF8F4] rounded-lg overflow-hidden transition-all scroll-mt-24"
          >
            <h3 className="m-0">
              <button
                type="button"
                id={`${id}-q`}
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 bg-white hover:bg-[#FAF8F4] transition-colors focus:outline-none font-sans font-bold text-base md:text-lg text-[#4F433A]"
              >
                <span>{item.question}</span>
                <span className="shrink-0 text-[#B85037]">
                  {isOpen ? <ChevronUp className="w-5 h-5" aria-hidden="true" /> : <ChevronDown className="w-5 h-5" aria-hidden="true" />}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={`${id}-q`}
              className={`transition-all duration-300 overflow-hidden ${
                isOpen ? "max-h-[1500px] border-t border-[#E6DDD0]" : "max-h-0"
              }`}
            >
              <div className="p-5 text-[#2D2521] text-base leading-relaxed font-sans bg-[#FAF8F4]">
                {renderAnswer ? renderAnswer(item.answer) : item.answer}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
