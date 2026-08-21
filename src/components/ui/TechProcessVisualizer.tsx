import React, { useState } from "react";
import { ChevronDown, ChevronUp, ListChecks } from "lucide-react";
import type { WikiArticle } from "../../types";

export const TechProcessVisualizer: React.FC<{ article: WikiArticle }> = ({ article }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [doneSet, setDoneSet] = useState<Set<number>>(new Set());
  const steps = article.contentSections;

  const toggleDone = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    setDoneSet((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  };

  if (steps.length === 0) return null;

  const doneCount = doneSet.size;
  const pct = Math.round((doneCount / steps.length) * 100);

  return (
    <div className="rounded-2xl border border-line overflow-hidden bg-white shadow-sm">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 space-y-3">
        <div className="flex items-center gap-2">
          <ListChecks className="w-5 h-5 text-terracotta" />
          <h3 className="font-serif font-bold text-base text-ink-soft">
            Quy trình từng bước
          </h3>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-terracotta transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-xs font-sans text-gray-500 tabular-nums flex-shrink-0">
            {doneCount}/{steps.length} bước
          </span>
        </div>
      </div>

      {/* Steps */}
      <div className="px-5 pb-5 space-y-2.5">
        {steps.map((sec, idx) => {
          const isOpen = openIdx === idx;
          const isDone = doneSet.has(idx);
          return (
            <div
              key={idx}
              className="border rounded-xl overflow-hidden transition-shadow"
              style={isDone
                ? { borderColor: "#BBF7D0", backgroundColor: "#F0FDF4" }
                : { borderColor: "#E5E7EB" }}
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full flex items-center gap-3 px-4 py-3.5 text-left cursor-pointer"
              >
                {/* Step number circle */}
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-sans font-bold flex-shrink-0 transition-colors"
                  style={isDone
                    ? { backgroundColor: "#16A34A", color: "white" }
                    : isOpen
                      ? { backgroundColor: "#B85037", color: "white" }
                      : { backgroundColor: "#F3F4F6", color: "#6B7280" }}
                >
                  {isDone ? "✓" : idx + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-sm font-sans font-semibold text-ink-soft line-clamp-1">{sec.heading}</span>
                  {!isOpen && sec.paragraphs[0] && (
                    <p className="text-xs text-gray-500 font-sans mt-0.5 line-clamp-1">{sec.paragraphs[0]}</p>
                  )}
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {isOpen
                    ? <ChevronUp className="w-4 h-4 text-gray-400" />
                    : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 border-t border-gray-100 space-y-3">
                  {sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-sm text-gray-700 font-sans leading-relaxed">{p}</p>
                  ))}
                  {sec.highlight && (
                    <div className="bg-paper-2 border-l-4 border-l-terracotta px-3 py-2.5 rounded-r-lg text-sm font-sans text-ink-soft italic">
                      {sec.highlight}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={(e) => toggleDone(e, idx)}
                    className="mt-1 text-xs font-sans font-semibold px-3.5 py-1.5 rounded-full cursor-pointer transition-colors border"
                    style={isDone
                      ? { color: "#16A34A", borderColor: "#BBF7D0", backgroundColor: "#F0FDF4" }
                      : { color: "#B85037", borderColor: "#FECACA", backgroundColor: "#FFF5F5" }}
                  >
                    {isDone ? "✓ Đã hoàn thành bước này" : "Đánh dấu đã làm xong"}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
