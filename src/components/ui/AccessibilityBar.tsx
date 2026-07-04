import React from "react";
import { Type } from "lucide-react";

/** Ba mức phóng chữ toàn site (scale gốc rem). Lưu lựa chọn vào localStorage. */
const LEVELS = [100, 112, 125] as const;
const STORAGE_KEY = "fontScale";

const applyScale = (pct: number) => {
  if (typeof document !== "undefined") {
    document.documentElement.style.fontSize = `${pct}%`;
  }
};

interface AccessibilityBarProps {
  /** "dark" khi đặt trên nền pine (header/mobile nav); "light" cho nền giấy. */
  tone?: "light" | "dark";
}

/**
 * Thanh chỉnh cỡ chữ toàn site (A− / A+) cho người lớn tuổi, mắt kém. Không cần
 * backend — chỉ đổi font-size gốc và ghi nhớ bằng localStorage.
 */
export const AccessibilityBar: React.FC<AccessibilityBarProps> = ({ tone = "light" }) => {
  const [idx, setIdx] = React.useState(0);
  const dark = tone === "dark";

  // Khôi phục lựa chọn đã lưu khi tải trang.
  React.useEffect(() => {
    const saved = Number(window.localStorage.getItem(STORAGE_KEY));
    const found = LEVELS.indexOf(saved as (typeof LEVELS)[number]);
    if (found > 0) {
      setIdx(found);
      applyScale(LEVELS[found]);
    }
  }, []);

  const setLevel = (next: number) => {
    const clamped = Math.max(0, Math.min(LEVELS.length - 1, next));
    setIdx(clamped);
    applyScale(LEVELS[clamped]);
    window.localStorage.setItem(STORAGE_KEY, String(LEVELS[clamped]));
  };

  return (
    <div className={`flex items-center justify-end gap-2 ${dark ? "text-white/70" : "text-[#7A6E62]"}`}>
      <span className="inline-flex items-center gap-1 text-sm font-sans font-semibold">
        <Type className="w-4 h-4" />
        Cỡ chữ
      </span>
      <div className={`inline-flex rounded-full border overflow-hidden ${dark ? "border-white/25 bg-white/10" : "border-[#E6DDD0] bg-white"}`}>
        <button
          type="button"
          onClick={() => setLevel(idx - 1)}
          disabled={idx === 0}
          aria-label="Giảm cỡ chữ"
          className={`px-3 py-1.5 text-sm font-bold disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer ${dark ? "text-white hover:bg-white/15" : "text-[#4F433A] hover:bg-[#F5ECE1]"}`}
        >
          A−
        </button>
        <button
          type="button"
          onClick={() => setLevel(idx + 1)}
          disabled={idx === LEVELS.length - 1}
          aria-label="Tăng cỡ chữ"
          className={`px-3 py-1.5 text-base font-bold disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer border-l ${dark ? "text-white hover:bg-white/15 border-white/25" : "text-[#4F433A] hover:bg-[#F5ECE1] border-[#E6DDD0]"}`}
        >
          A+
        </button>
      </div>
    </div>
  );
};
