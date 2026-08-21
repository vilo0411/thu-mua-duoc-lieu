import React, { useState, useEffect } from "react";
import { CheckCircle2, Circle, ClipboardList, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { WikiArticle } from "../../types";

function storageKey(articleId: string) {
  return `checklist-${articleId}`;
}

export const StandardsChecklist: React.FC<{ article: WikiArticle }> = ({ article }) => {
  const rows = article.standardsTable ?? [];
  const [checked, setChecked] = useState<boolean[]>([]);

  // Restore from localStorage.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey(article.id));
      if (saved) {
        const parsed: boolean[] = JSON.parse(saved);
        setChecked(parsed.length === rows.length ? parsed : Array(rows.length).fill(false));
      } else {
        setChecked(Array(rows.length).fill(false));
      }
    } catch {
      setChecked(Array(rows.length).fill(false));
    }
  }, [article.id, rows.length]);

  const toggle = (idx: number) => {
    const next = checked.map((v, i) => (i === idx ? !v : v));
    setChecked(next);
    try {
      localStorage.setItem(storageKey(article.id), JSON.stringify(next));
    } catch {
      // ignore storage errors
    }
  };

  const doneCount = checked.filter(Boolean).length;
  const total = rows.length;
  const pct = total > 0 ? Math.round((doneCount / total) * 100) : 0;

  if (rows.length === 0) return null;

  return (
    <div className="rounded-2xl border border-line overflow-hidden bg-white shadow-sm">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 space-y-3">
        <div className="flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-terracotta" />
          <h3 className="font-serif font-bold text-base text-ink-soft">
            Tự kiểm tra mức độ tuân thủ tiêu chuẩn
          </h3>
        </div>
        <p className="text-xs text-gray-500 font-sans">
          Đánh dấu các tiêu chí cơ sở của bạn đã đáp ứng — tiến độ được lưu tự động
        </p>

        {/* Progress bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-sans">
            <span className="text-gray-500">Tiến độ đáp ứng</span>
            <span className="font-bold" style={{ color: pct === 100 ? "#16A34A" : "#B85037" }}>
              {doneCount}/{total} tiêu chí ({pct}%)
            </span>
          </div>
          <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${pct}%`,
                backgroundColor: pct === 100 ? "#16A34A" : "#B85037",
              }}
            />
          </div>
        </div>

        {pct === 100 && (
          <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
            <span className="text-sm font-sans font-semibold text-green-700">
              Xuất sắc! Cơ sở bạn đã đáp ứng đủ các tiêu chí cơ bản.
            </span>
          </div>
        )}
      </div>

      {/* Checklist */}
      <div className="px-5 pb-5 space-y-2">
        {rows.map((row, idx) => {
          const done = checked[idx] ?? false;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => toggle(idx)}
              className="w-full flex items-start gap-3 px-4 py-3.5 rounded-xl text-left cursor-pointer transition-colors border border-line hover:border-terracotta/40"
              style={done ? { backgroundColor: "#F0FDF4", borderColor: "#BBF7D0" } : {}}
            >
              {done
                ? <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                : <Circle className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />}
              <div className="space-y-0.5 flex-1 min-w-0">
                <div className="text-sm font-sans font-semibold text-ink-soft line-clamp-1">{row.factor}</div>
                <div className="text-xs text-gray-500 font-sans leading-relaxed">{row.standard}</div>
                {row.notes && (
                  <div className="text-xs text-gray-400 font-sans italic">{row.notes}</div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* CTA */}
      <div className="px-5 pb-5">
        <Link
          to="/lien-he"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-terracotta text-white text-sm font-sans font-semibold hover:bg-terracotta/90 transition-colors"
        >
          Đăng ký tư vấn chứng nhận <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
