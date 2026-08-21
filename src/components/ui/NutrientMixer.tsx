import React, { useState } from "react";
import { FlaskConical, Calculator } from "lucide-react";
import type { WikiArticle } from "../../types";

// Approximate NPK ratios and base rates (kg/1000m²/vụ) for common organic fertilizers.
const FERTILIZER_META: Record<string, { n: number; p: number; k: number; rateKg: number; color: string }> = {
  default: { n: 2, p: 1, k: 1, rateKg: 200, color: "#8B5E3C" },
  "phân trùn quế": { n: 3, p: 1, k: 1, rateKg: 150, color: "#6B8E4E" },
  "phân chuồng": { n: 1, p: 1, k: 2, rateKg: 300, color: "#A0522D" },
  "phân xanh": { n: 2, p: 0.5, k: 1, rateKg: 200, color: "#4A7C59" },
  "phân hữu cơ": { n: 2, p: 1, k: 1.5, rateKg: 200, color: "#7D9B5E" },
  npk: { n: 5, p: 3, k: 3, rateKg: 30, color: "#B85037" },
  "phân lân": { n: 0, p: 5, k: 0, rateKg: 40, color: "#8B7355" },
  "phân đạm": { n: 5, p: 0, k: 0, rateKg: 25, color: "#6B8CAE" },
};

function getMeta(name: string) {
  const lower = name.toLowerCase();
  for (const [key, val] of Object.entries(FERTILIZER_META)) {
    if (key !== "default" && lower.includes(key)) return val;
  }
  return FERTILIZER_META.default;
}

const NpkBar: React.FC<{ n: number; p: number; k: number; color: string }> = ({ n, p, k, color }) => {
  const total = n + p + k || 1;
  return (
    <div className="space-y-1.5">
      <div className="flex h-5 rounded-full overflow-hidden gap-px text-[10px] font-bold">
        {n > 0 && (
          <div
            className="flex items-center justify-center text-white"
            style={{ width: `${(n / total) * 100}%`, backgroundColor: color }}
          >
            N
          </div>
        )}
        {p > 0 && (
          <div
            className="flex items-center justify-center text-white"
            style={{ width: `${(p / total) * 100}%`, backgroundColor: color, filter: "brightness(0.8)" }}
          >
            P
          </div>
        )}
        {k > 0 && (
          <div
            className="flex items-center justify-center text-white"
            style={{ width: `${(k / total) * 100}%`, backgroundColor: color, filter: "brightness(0.65)" }}
          >
            K
          </div>
        )}
      </div>
      <div className="flex gap-3 text-[10px] font-sans text-gray-500">
        {n > 0 && <span>N: {n}</span>}
        {p > 0 && <span>P: {p}</span>}
        {k > 0 && <span>K: {k}</span>}
      </div>
    </div>
  );
};

export const NutrientMixer: React.FC<{ article: WikiArticle }> = ({ article }) => {
  const [area, setArea] = useState<string>("1000");
  const rows = article.standardsTable ?? [];
  const areaNum = Math.max(1, parseFloat(area) || 1000);

  if (rows.length === 0) return null;

  return (
    <div className="rounded-2xl border border-line overflow-hidden bg-white shadow-sm">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 space-y-1.5">
        <div className="flex items-center gap-2">
          <FlaskConical className="w-5 h-5 text-terracotta" />
          <h3 className="font-serif font-bold text-base text-ink-soft">
            Phân tích và tính lượng phân bón
          </h3>
        </div>
        <p className="text-xs text-gray-500 font-sans">
          So sánh thành phần dinh dưỡng N-P-K và ước tính lượng phân cần dùng theo diện tích vườn
        </p>
      </div>

      {/* Fertilizer Cards */}
      <div className="px-5 pb-4 space-y-3">
        {rows.map((row, idx) => {
          const meta = getMeta(row.factor);
          const amountKg = Math.round((areaNum / 1000) * meta.rateKg);
          return (
            <div
              key={idx}
              className="border border-line rounded-xl p-4 space-y-3 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-0.5">
                  <span className="font-sans font-bold text-sm text-ink-soft">{row.factor}</span>
                  <p className="text-xs text-gray-500 font-sans leading-relaxed">{row.standard}</p>
                </div>
                <div
                  className="flex-shrink-0 text-xs font-sans font-bold px-2.5 py-1 rounded-full text-white"
                  style={{ backgroundColor: meta.color }}
                >
                  ~{amountKg} kg
                </div>
              </div>

              <NpkBar n={meta.n} p={meta.p} k={meta.k} color={meta.color} />

              {row.notes && (
                <p className="text-[11px] text-gray-400 font-sans italic border-t border-line pt-2">{row.notes}</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Calculator */}
      <div className="mx-5 mb-5 p-4 bg-paper-2 rounded-xl border border-line space-y-3">
        <div className="flex items-center gap-2">
          <Calculator className="w-4 h-4 text-terracotta" />
          <span className="text-sm font-sans font-semibold text-ink-soft">Tính lượng phân theo diện tích</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="text-xs text-gray-500 font-sans block mb-1">Diện tích vườn (m²)</label>
            <input
              type="number"
              min={1}
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-line text-sm font-sans bg-white focus:outline-none focus:border-terracotta/50 transition-colors"
            />
          </div>
          <div className="text-xs text-gray-400 font-sans text-center pt-4">
            Số lượng<br />hiển thị trên<br />từng loại phân ↑
          </div>
        </div>
        <p className="text-[11px] text-gray-400 font-sans">
          * Lượng phân tham khảo cho 1 vụ trồng; điều chỉnh theo kết quả phân tích đất thực tế.
        </p>
      </div>
    </div>
  );
};
