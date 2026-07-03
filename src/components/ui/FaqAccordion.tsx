import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

export const FaqAccordion: React.FC<{ items: FaqItem[] }> = ({ items }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="space-y-3.5 my-6">
      {items.map((item, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div
            key={idx}
            className="border border-[#E6DDD0] bg-[#FAF8F4] rounded-lg overflow-hidden transition-all"
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 bg-white hover:bg-[#FAF8F4] transition-colors focus:outline-none"
            >
              <span className="font-sans font-bold text-base md:text-lg text-[#4F433A]">
                {item.question}
              </span>
              <div className="shrink-0 text-[#B85037]">
                {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </button>
            <div
              className={`transition-all duration-300 overflow-hidden ${
                isOpen ? "max-h-[500px] border-t border-[#E6DDD0]" : "max-h-0"
              }`}
            >
              <div className="p-5 text-[#2D2521] text-base leading-relaxed font-sans bg-[#FAF8F4]">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
