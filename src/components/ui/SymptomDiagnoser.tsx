import React, { useState } from "react";
import { ChevronDown, ChevronUp, AlertCircle, Eye, Search, Stethoscope } from "lucide-react";
import type { WikiArticle } from "../../types";

// Detect which part of the plant is mentioned in symptom text.
function detectPartIcon(text: string): string {
  const t = text.toLowerCase();
  if (t.includes("lá") || t.includes("phiến") || t.includes("đốm lá")) return "🍃";
  if (t.includes("rễ") || t.includes("củ") || t.includes("thối rễ")) return "🌱";
  if (t.includes("thân") || t.includes("cổ thân") || t.includes("cành")) return "🌿";
  if (t.includes("hoa") || t.includes("quả") || t.includes("hạt")) return "🌸";
  return "🌾";
}

function severityLabel(text: string): { label: string; color: string } {
  const t = text.toLowerCase();
  if (t.includes("phổ biến") || t.includes("thường gặp") || t.includes("nặng")) {
    return { label: "Phổ biến", color: "#DC2626" };
  }
  if (t.includes("nghiêm trọng") || t.includes("nguy hiểm")) {
    return { label: "Nghiêm trọng", color: "#9333EA" };
  }
  return { label: "Có thể gặp", color: "#D97706" };
}

const STEPS = [
  { icon: Eye, label: "Quan sát", desc: "Kiểm tra lá, thân, rễ hàng tuần" },
  { icon: Search, label: "Xác định", desc: "Đối chiếu triệu chứng bên dưới" },
  { icon: Stethoscope, label: "Xử lý", desc: "Áp dụng biện pháp phòng trị phù hợp" },
];

export const SymptomDiagnoser: React.FC<{ article: WikiArticle }> = ({ article }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [filter, setFilter] = useState("");
  const rows = article.standardsTable ?? [];

  const filtered = filter
    ? rows.filter(
        (r) =>
          r.factor.toLowerCase().includes(filter.toLowerCase()) ||
          r.standard.toLowerCase().includes(filter.toLowerCase()),
      )
    : rows;

  return (
    <div className="rounded-2xl border border-line overflow-hidden bg-white shadow-sm">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 space-y-3">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-terracotta" />
          <h3 className="font-serif font-bold text-base text-ink-soft">
            Nhận diện và xử lý bệnh theo từng cây
          </h3>
        </div>

        {/* 3-step flow */}
        <div className="flex items-stretch gap-0 rounded-xl overflow-hidden border border-line">
          {STEPS.map((s, i) => (
            <React.Fragment key={s.label}>
              <div className="flex-1 flex flex-col items-center justify-center gap-1 py-3 px-2 bg-paper-2">
                <div className="w-8 h-8 rounded-full bg-terracotta/10 flex items-center justify-center">
                  <s.icon className="w-4 h-4 text-terracotta" />
                </div>
                <span className="text-[11px] font-sans font-bold text-ink-soft">{s.label}</span>
                <span className="text-[10px] text-gray-400 font-sans text-center leading-tight hidden sm:block">{s.desc}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="w-px bg-line self-stretch" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Filter */}
      {rows.length > 3 && (
        <div className="px-5 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm theo tên cây hoặc triệu chứng..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-line text-sm font-sans bg-paper-2 focus:outline-none focus:border-terracotta/50 transition-colors"
            />
          </div>
        </div>
      )}

      {/* Cards */}
      <div className="px-5 pb-5 space-y-3">
        {filtered.length === 0 && (
          <p className="text-sm text-gray-400 font-sans text-center py-6">Không tìm thấy cây phù hợp</p>
        )}
        {filtered.map((row, idx) => {
          const isOpen = openIdx === idx;
          const part = detectPartIcon(row.standard);
          const sev = severityLabel(row.notes);
          return (
            <div
              key={idx}
              className="border border-line rounded-xl overflow-hidden transition-shadow hover:shadow-sm"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full flex items-center gap-3 px-4 py-3.5 text-left cursor-pointer hover:bg-paper-2 transition-colors"
              >
                <span className="text-2xl leading-none flex-shrink-0">{part}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-sans font-bold text-sm text-ink-soft">{row.factor}</span>
                    <span
                      className="text-[10px] font-sans font-bold px-2 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: sev.color }}
                    >
                      {sev.label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 font-sans mt-0.5 line-clamp-1">{row.standard}</p>
                </div>
                {isOpen
                  ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />}
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 space-y-3 border-t border-line">
                  <div className="space-y-1">
                    <span className="text-[11px] font-sans font-bold text-gray-500 uppercase tracking-wide">Triệu chứng</span>
                    <p className="text-sm text-gray-700 font-sans leading-relaxed">{row.standard}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] font-sans font-bold text-terracotta uppercase tracking-wide">Biện pháp xử lý</span>
                    <p className="text-sm text-gray-700 font-sans leading-relaxed">{row.notes}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
