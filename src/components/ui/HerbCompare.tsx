import React from "react";
import { GitCompare, X, Plus, Search } from "lucide-react";
import type { HerbalMedicine, HerbGroup } from "../../types";

const GROUP_LABEL: Record<HerbGroup, string> = {
  "cu-re": "Củ, rễ",
  "hoa-la": "Hoa, lá",
  nam: "Nấm",
  vo: "Vỏ",
  than: "Thân, cành",
};

const MAX = 3;

interface Row {
  label: string;
  get: (h: HerbalMedicine) => React.ReactNode;
}

const ROWS: Row[] = [
  { label: "Dải giá cao nhất", get: (h) => <span className="font-mono font-bold text-[#1F7A46]">{h.prices[0]?.priceRange} đ/{h.prices[0]?.unit}</span> },
  { label: "Nhóm dược liệu", get: (h) => GROUP_LABEL[h.group] },
  { label: "Bộ phận thu hoạch", get: (h) => h.stats.find((s) => s.label.toLowerCase().includes("bộ phận"))?.value ?? "—" },
  { label: "Thời gian tới thu hoạch", get: (h) => h.technique.harvestTime },
  { label: "Đất phù hợp", get: (h) => h.technique.soil },
  { label: "Năng suất", get: (h) => h.technique.yield },
  { label: "Số vùng trồng chính", get: (h) => `${h.regions.length} vùng` },
];

interface HerbComboboxProps {
  herbs: HerbalMedicine[];
  selected: string[];
  onAdd: (slug: string) => void;
}

/** Ô tìm kiếm + chọn 1 cây để thêm vào bảng so sánh. Thay cho dãy chip để scale khi có nhiều cây. */
const HerbCombobox: React.FC<HerbComboboxProps> = ({ herbs, selected, onAdd }) => {
  const [open, setOpen] = React.useState(false);
  const [q, setQ] = React.useState("");
  const boxRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const term = q.trim().toLowerCase();
  const options = herbs.filter(
    (h) => !selected.includes(h.slug) && (!term || h.name.toLowerCase().includes(term)),
  );

  const pick = (slug: string) => {
    onAdd(slug);
    setQ("");
    setOpen(false);
  };

  return (
    <div ref={boxRef} className="relative w-full max-w-xs">
      <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-full border border-[#E6DDD0] bg-white focus-within:border-[#B85037] transition-colors">
        <Search className="w-4 h-4 text-[#B0A695] shrink-0" />
        <input
          type="text"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={`Tìm & thêm cây (còn ${MAX - selected.length})`}
          className="w-full bg-transparent text-sm font-sans text-[#4F433A] placeholder:text-[#B0A695] focus:outline-none"
        />
      </div>
      {open && (
        <ul className="absolute z-20 mt-1.5 w-full max-h-64 overflow-y-auto rounded-2xl border border-[#E6DDD0] bg-white shadow-lg py-1.5 animate-fade-in">
          {options.length === 0 ? (
            <li className="px-4 py-2.5 text-sm text-gray-400 italic font-sans">Không tìm thấy cây phù hợp</li>
          ) : (
            options.map((h) => (
              <li key={h.slug}>
                <button
                  type="button"
                  onClick={() => pick(h.slug)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-2.5 text-left text-sm font-sans text-[#4F433A] hover:bg-[#FAF6F0] cursor-pointer"
                >
                  <span className="font-semibold">{h.name}</span>
                  <span className="text-xs text-[#B0A695]">{GROUP_LABEL[h.group]}</span>
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

interface HerbCompareProps {
  herbs: HerbalMedicine[];
  onPickHerb?: (slug: string) => void;
}

/** Chọn 2–3 cây để so sánh nhanh giá, nhóm, thời gian thu hoạch, năng suất… */
export const HerbCompare: React.FC<HerbCompareProps> = ({ herbs, onPickHerb }) => {
  const [selected, setSelected] = React.useState<string[]>([herbs[0]?.slug, herbs[1]?.slug].filter(Boolean));

  const add = (slug: string) => {
    setSelected((prev) => (prev.includes(slug) || prev.length >= MAX ? prev : [...prev, slug]));
  };
  const remove = (slug: string) => setSelected((prev) => prev.filter((s) => s !== slug));

  const chosen = selected.map((s) => herbs.find((h) => h.slug === s)).filter(Boolean) as HerbalMedicine[];

  return (
    <div className="space-y-4">
      {/* Cây đã chọn + ô thêm */}
      <div className="flex flex-wrap items-center gap-2">
        {chosen.map((h) => (
          <span
            key={h.slug}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#B85037] bg-[#B85037] text-white text-sm font-sans font-semibold"
          >
            {h.name}
            <button
              type="button"
              onClick={() => remove(h.slug)}
              aria-label={`Bỏ ${h.name}`}
              className="cursor-pointer hover:opacity-80"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </span>
        ))}
        {selected.length < MAX && <HerbCombobox herbs={herbs} selected={selected} onAdd={add} />}
      </div>

      {chosen.length < 2 ? (
        <p className="text-sm text-gray-500 italic font-sans flex items-center gap-2">
          <GitCompare className="w-4 h-4" /> Chọn ít nhất 2 cây (tối đa {MAX}) để xem bảng so sánh.
        </p>
      ) : (
        <div className="w-full overflow-x-auto rounded-2xl border border-[#E6DDD0] shadow-xs">
          <table className="w-full border-collapse" style={{ minWidth: `${140 + chosen.length * 150}px` }}>
            <thead>
              <tr className="bg-[#F5EDE0]">
                <th className="text-left px-4 py-3 font-sans font-bold text-sm text-[#4F433A] w-[140px]">Tiêu chí</th>
                {chosen.map((h) => (
                  <th key={h.slug} className="px-4 py-3 text-left border-l border-[#E6DDD0]">
                    <button
                      type="button"
                      onClick={() => onPickHerb?.(h.slug)}
                      className="font-sans font-bold text-[15px] text-[#B85037] hover:underline cursor-pointer"
                    >
                      {h.name}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, ri) => (
                <tr key={row.label} className={`border-t border-[#E6DDD0] ${ri % 2 ? "bg-[#FBF9F5]" : "bg-white"}`}>
                  <td className="px-4 py-3 font-sans font-semibold text-sm text-[#7A6E62] align-top">{row.label}</td>
                  {chosen.map((h) => (
                    <td key={h.slug} className="px-4 py-3 border-l border-[#F0EAE1] text-[15px] text-[#2D2521] font-sans align-top">
                      {row.get(h)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
