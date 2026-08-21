import React, { useState } from "react";
import { ArrowDown } from "lucide-react";
import type { HerbGroup, HerbTechnique } from "../../types";

interface GrowthTimelineProps {
  technique: HerbTechnique;
  /** Nhóm dược liệu (củ-rễ, hoa-lá, nấm, vỏ, thân-cành) — quyết định cây minh họa lớn lên kiểu gì. */
  group: HerbGroup;
  /** Gọi khi bấm "Xem quy trình chi tiết" — dùng để mở & cuộn tới mục Quy trình chăm sóc. */
  onSeeProcess?: () => void;
}

const leafPair = (y: number, spread: number) => (
  <>
    <path d={`M32 ${y} Q${32 - spread} ${y - 2} ${32 - spread - 3} ${y - 7}`} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d={`M32 ${y} Q${32 + spread} ${y - 2} ${32 + spread + 3} ${y - 7}`} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
  </>
);

const seed = <ellipse cx="32" cy="50" rx="5" ry="3.5" fill="currentColor" />;

/** Sọt đan tròn (thay hình thang cũ) — dùng chung cho các mốc thu hoạch dạng "bó thành sọt". */
const basketRim = <ellipse cx="32" cy="42" rx="12" ry="3" fill="none" stroke="currentColor" strokeWidth="2" />;
const basketBowl = (
  <>
    <path d="M20 42 Q17 58 32 58 Q47 58 44 42" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M21 48 Q32 52 43 48" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.45" />
    <path d="M22 53 Q32 56 42 53" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.35" />
    {basketRim}
  </>
);

/** Bó cành/hoa-lá cắm trong sọt, thay cụm chấm rời rạc trước đây. */
const harvestSprigsLeafy = (
  <>
    {basketBowl}
    <path d="M26 42 Q21 30 23 21" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    <ellipse cx="23" cy="19" rx="3.2" ry="2" transform="rotate(-30 23 19)" fill="currentColor" />
    <path d="M32 42 Q32 26 32 15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    <circle cx="32" cy="12" r="4" fill="currentColor" />
    <path d="M38 42 Q43 30 41 21" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    <ellipse cx="41" cy="19" rx="3.2" ry="2" transform="rotate(30 41 19)" fill="currentColor" />
  </>
);

/** Nấm xếp trong sọt — mũ nấm hình vòm thay vì hoa/lá. */
const cap = (cx: number, cy: number, r: number) => (
  <>
    <path d={`M${cx - r} ${cy} Q${cx} ${cy - r * 1.4} ${cx + r} ${cy} Z`} fill="currentColor" />
    <line x1={cx} y1={cy} x2={cx} y2={cy + r * 0.9} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </>
);
const harvestBasketMushroom = (
  <>
    {basketBowl}
    {cap(24, 34, 5)}
    {cap(32, 28, 6.5)}
    {cap(40, 34, 5)}
  </>
);

/** Củ/rễ vừa đào lên — hình khối lồi lõm + rễ tơ, không còn nằm trong sọt. */
const harvestRoot = (
  <>
    <path
      d="M23 48 Q18 41 25 36 Q29 31 34 35 Q41 38 39 46 Q38 53 31 54 Q25 55 23 48 Z"
      fill="currentColor"
    />
    <path d="M27 54 Q25 59 22 62" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.6" />
    <path d="M32 55 Q32 60 32 63" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.6" />
    <path d="M37 54 Q39 59 42 61" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.6" />
    <path d="M30 35 Q29 27 31 20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    <ellipse cx="31" cy="18" rx="3" ry="2" transform="rotate(-10 31 18)" fill="currentColor" />
  </>
);

/** Vỏ cây cuộn (kiểu quế) dựa cạnh gốc cây vừa cắt. */
const harvestBark = (
  <>
    <path d="M28 56 L28 48 L36 48 L36 56" stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round" />
    <ellipse cx="32" cy="48" rx="4" ry="1.6" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.6" />
    {[[16, -12], [21, -4], [46, 8]].map(([x, rot], i) => (
      <g key={i} transform={`rotate(${rot} ${x + 3} 44)`}>
        <rect x={x} y="32" width="7" height="24" rx="3.5" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d={`M${x + 1.5} 36 Q${x + 5.5} 42 ${x + 1.5} 48`} stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
      </g>
    ))}
  </>
);

/** Bó cành khô buộc dây — thay cho gốc cây với nhóm thân-cành. */
const harvestBundle = (
  <>
    <path d="M24 56 L18 22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M29 56 L27 18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M35 56 L37 18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M40 56 L46 22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    <rect x="19" y="35" width="26" height="5" rx="1.5" fill="currentColor" transform="rotate(-3 32 37)" />
  </>
);

/** Thân theo nhóm dược liệu × giai đoạn (không kèm vạch đất riêng, dùng chung nền của khung chứa). */
const groupStage = (group: HerbGroup, stage: number): React.ReactNode => {
  switch (group) {
    case "cu-re": // Củ - rễ: củ phình dần dưới đất, thu hoạch = đào củ lên
      switch (stage) {
        case 0:
          return seed;
        case 1:
          return (
            <>
              <path d="M32 56 Q30 48 32 42" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              {leafPair(44, 4)}
              <path d="M32 56 Q31 60 32 63" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="2 2" opacity="0.4" />
            </>
          );
        case 2:
          return (
            <>
              <path d="M32 56 Q29 44 32 30" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              {leafPair(46, 6)}
              {leafPair(36, 5)}
              <ellipse cx="32" cy="59" rx="5" ry="6" fill="currentColor" opacity="0.5" />
            </>
          );
        case 3:
          return (
            <>
              <path d="M32 56 Q28 40 32 18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              {leafPair(48, 7)}
              {leafPair(38, 6)}
              {leafPair(28, 5)}
              <ellipse cx="32" cy="60" rx="7.5" ry="8.5" fill="currentColor" opacity="0.65" />
            </>
          );
        default:
          return harvestRoot;
      }
    case "nam": // Nấm: mọc trên giá thể/khúc gỗ, thu hoạch = sọt nấm
      switch (stage) {
        case 0:
          return <rect x="20" y="53" width="24" height="5" rx="2.5" fill="currentColor" opacity="0.6" />;
        case 1:
          return (
            <>
              <rect x="20" y="53" width="24" height="5" rx="2.5" fill="currentColor" opacity="0.6" />
              {cap(32, 48, 4)}
            </>
          );
        case 2:
          return (
            <>
              <rect x="18" y="54" width="28" height="5" rx="2.5" fill="currentColor" opacity="0.6" />
              {cap(26, 47, 4.5)}
              {cap(38, 49, 3.5)}
            </>
          );
        case 3:
          return (
            <>
              <rect x="16" y="55" width="32" height="6" rx="3" fill="currentColor" opacity="0.6" />
              {cap(23, 46, 5)}
              {cap(32, 40, 6.5)}
              {cap(41, 46, 5)}
            </>
          );
        default:
          return harvestBasketMushroom;
      }
    case "vo": // Vỏ: thân gỗ, thu hoạch = cuộn vỏ cạnh gốc
      switch (stage) {
        case 0:
          return seed;
        case 1:
          return (
            <>
              <path d="M32 56 L32 42" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
              {leafPair(44, 4)}
            </>
          );
        case 2:
          return (
            <>
              <path d="M32 56 L32 28" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" />
              <path d="M32 34 Q26 30 22 25" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              <path d="M32 34 Q38 30 42 25" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              <ellipse cx="21" cy="23" rx="3" ry="2" fill="currentColor" />
              <ellipse cx="43" cy="23" rx="3" ry="2" fill="currentColor" />
            </>
          );
        default:
          if (stage === 3) {
            return (
              <>
                <path d="M29 56 L29 20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M35 56 L35 20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M29 46 L35 46M29 38 L35 38M29 30 L35 30" stroke="currentColor" strokeWidth="1" opacity="0.4" />
                <path d="M32 22 Q23 16 17 18" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                <path d="M32 22 Q41 16 47 18" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                <path d="M32 22 L32 12" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                <ellipse cx="16" cy="16" rx="3.5" ry="2.3" fill="currentColor" />
                <ellipse cx="48" cy="16" rx="3.5" ry="2.3" fill="currentColor" />
                <ellipse cx="32" cy="10" rx="3.5" ry="2.3" fill="currentColor" />
              </>
            );
          }
          return harvestBark;
      }
    case "than": // Thân - cành: bụi nhiều thân, thu hoạch = bó cành buộc
      switch (stage) {
        case 0:
          return seed;
        case 1:
          return (
            <>
              <path d="M28 56 Q27 48 26 42" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M36 56 Q37 48 38 42" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
              {leafPair(44, 4)}
            </>
          );
        case 2:
          return (
            <>
              <path d="M26 56 Q24 44 22 34" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M32 56 Q32 42 32 30" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M38 56 Q40 44 42 34" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
              <ellipse cx="22" cy="32" rx="3" ry="2" fill="currentColor" />
              <ellipse cx="32" cy="28" rx="3" ry="2" fill="currentColor" />
              <ellipse cx="42" cy="32" rx="3" ry="2" fill="currentColor" />
            </>
          );
        case 3:
          return (
            <>
              <path d="M22 56 Q20 40 17 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M28 56 Q27 38 26 20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M36 56 Q37 38 38 20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M42 56 Q44 40 47 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
              {[[17, 22], [26, 18], [38, 18], [47, 22]].map(([x, y], i) => (
                <ellipse key={i} cx={x} cy={y} rx="3.2" ry="2.1" fill="currentColor" />
              ))}
            </>
          );
        default:
          return harvestBundle;
      }
    default: // hoa-la: Hoa - lá — mặc định
      switch (stage) {
        case 0:
          return seed;
        case 1:
          return (
            <>
              <path d="M32 56 Q29 47 32 40" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              {leafPair(42, 5)}
            </>
          );
        case 2:
          return (
            <>
              <path d="M32 56 Q28 42 32 26" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              {leafPair(46, 7)}
              {leafPair(34, 6)}
            </>
          );
        case 3:
          return (
            <>
              <path d="M32 56 Q27 38 32 14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              {leafPair(48, 8)}
              {leafPair(38, 7)}
              {leafPair(28, 6)}
              <circle cx="32" cy="12" r="4.5" fill="currentColor" />
            </>
          );
        default:
          return harvestSprigsLeafy;
      }
  }
};

/** Icon nhỏ cho nút chọn mốc — thân cây theo nhóm + vạch đất riêng. */
const PlantGlyph: React.FC<{ group: HerbGroup; stage: number }> = ({ group, stage }) => (
  <>
    <line x1="16" y1="56" x2="48" y2="56" stroke="currentColor" strokeWidth="2" opacity="0.3" strokeLinecap="round" />
    {groupStage(group, stage)}
  </>
);

// 7 khóm cây rải đều trên luống, lệch tâm/kích thước nhẹ cho tự nhiên.
const FIELD_X = [90, 195, 300, 405, 510, 615, 710];
const FIELD_DY = [0, -5, 3, -3, 5, -2, 4];
const FIELD_SCALE = [1.35, 1.55, 1.4, 1.6, 1.3, 1.5, 1.4];

/**
 * Cảnh vườn dược liệu minh họa cả luống cây theo giai đoạn — "graphic bên ngoài" thay
 * ảnh thật (bài không có ảnh riêng từng giai đoạn), và đổi hẳn kiểu cây theo nhóm dược
 * liệu (củ-rễ đào củ, nấm hái nấm, vỏ cuộn vỏ cây, thân-cành bó cành, hoa-lá cắm sọt)
 * để mỗi cây có minh họa đúng với cách thu hoạch thật, không dùng chung một kiểu.
 */
const FieldScene: React.FC<{ group: HerbGroup; stage: number }> = ({ group, stage }) => {
  const groundY = 205;
  return (
    <svg viewBox="0 0 800 260" className="w-full h-full block">
      <defs>
        <linearGradient id="gt-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F8F5EE" />
          <stop offset="1" stopColor="#F5ECE1" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="800" height="260" fill="url(#gt-sky)" />
      <circle cx="726" cy="46" r="30" fill="#B85037" opacity="0.1" />
      <circle cx="726" cy="46" r="18" fill="#B85037" opacity="0.55" />
      <path d="M0,168 Q160,140 340,162 T800,150 L800,168 Z" fill="#3E7256" opacity="0.14" />
      <path d="M0,178 Q220,155 460,175 T800,162 L800,178 Z" fill="#4F7942" opacity="0.16" />
      <rect x="0" y="176" width="800" height="84" fill="#EFE2D0" />
      <path d="M0,176 Q400,168 800,176" stroke="#DCC8A8" strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M0,200 Q400,192 800,200" stroke="#DCC8A8" strokeWidth="1.5" fill="none" opacity="0.4" />
      <path d="M0,226 Q400,219 800,226" stroke="#DCC8A8" strokeWidth="1.5" fill="none" opacity="0.4" />
      <g style={{ color: stage === 4 ? "#8A6A3E" : "#3D6130" }}>
        {FIELD_X.map((x, i) => {
          const y = groundY + FIELD_DY[i];
          const s = FIELD_SCALE[i];
          return (
            <g key={i} transform={`translate(${x - 32 * s} ${y - 56 * s}) scale(${s})`}>
              {groupStage(group, stage)}
            </g>
          );
        })}
      </g>
    </svg>
  );
};

const NODE_SIZES = ["w-[28px] h-[28px]", "w-[30px] h-[30px]", "w-8 h-8", "w-[34px] h-[34px]", "w-[34px] h-[34px]"];

export const GrowthTimeline: React.FC<GrowthTimelineProps> = ({ technique: t, group, onSeeProcess }) => {
  const stageLabels: [string, string][] =
    group === "cu-re"
      ? [
        ["Hạt/hom giống", `${t.propagation.join(", ")} · mật độ ${t.density}`],
        ["Xuống giống", t.season],
        ["Cây con bén rễ", `Đất ${t.soil}, pH ${t.ph}`],
        ["Củ phình to dưới đất", "Tưới, bón phân hữu cơ, vun gốc giữ ẩm cho củ"],
        ["Đào củ thu hoạch", `Sau ${t.harvestTime} · năng suất ${t.yield}`],
      ]
      : group === "nam"
        ? [
          ["Cấy giống/bào tử", `${t.propagation.join(", ")} · mật độ ${t.density}`],
          ["Ủ tơ trên giá thể", t.season],
          ["Nấm nhú thể quả", `Giá thể ${t.soil}, độ ẩm phù hợp`],
          ["Thể quả phát triển", "Giữ ẩm, thoáng khí, tránh ánh nắng trực tiếp"],
          ["Hái nấm thu hoạch", `Sau ${t.harvestTime} · năng suất ${t.yield}`],
        ]
        : group === "vo"
          ? [
            ["Giống & ươm cây", `${t.propagation.join(", ")} · mật độ ${t.density}`],
            ["Trồng cây con", t.season],
            ["Cây phát triển tán", `Đất ${t.soil}, pH ${t.ph}`],
            ["Thân đủ tuổi lấy vỏ", "Tưới, bón phân hữu cơ, tỉa cành tạo tán"],
            ["Bóc vỏ thu hoạch", `Sau ${t.harvestTime} · năng suất ${t.yield}`],
          ]
          : group === "than"
            ? [
              ["Hạt giống & nhân giống", `${t.propagation.join(", ")} · mật độ ${t.density}`],
              ["Xuống giống", t.season],
              ["Bụi cây bén rễ", `Đất ${t.soil}, pH ${t.ph}`],
              ["Thân, cành phát triển", "Tưới, bón phân hữu cơ, làm cỏ, phòng sâu bệnh"],
              ["Cắt cành thu hoạch", `Sau ${t.harvestTime} · năng suất ${t.yield}`],
            ]
            : [
              ["Hạt giống & nhân giống", `${t.propagation.join(", ")} · mật độ ${t.density}`],
              ["Xuống giống", t.season],
              ["Cây con bén rễ", `Đất ${t.soil}, pH ${t.ph}`],
              ["Sinh trưởng, tích dược tính", "Tưới, bón phân hữu cơ, làm cỏ, phòng sâu bệnh"],
              ["Thu hoạch", `Sau ${t.harvestTime} · năng suất ${t.yield}`],
            ];

  const stages = stageLabels.map(([label, caption]) => ({ label, caption }));
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-4">
      <div className="rounded-xl overflow-hidden border border-[#E6DDD0] aspect-[800/260] bg-sand">
        <FieldScene group={group} stage={active} />
      </div>
      <div className="flex items-baseline justify-between px-0.5">
        <span className="font-sans font-bold text-sm text-ink-soft">{stages[active].label}</span>
        <span className="text-xs text-gray-400 font-sans tabular-nums">
          Giai đoạn {active + 1}/{stages.length}
        </span>
      </div>

      <div className="relative flex items-start justify-between px-1 pt-1">
        <div className="absolute left-0 right-0 top-[18px] h-0.5 bg-[#E6DDD0]" />
        <div
          className="absolute left-0 top-[18px] h-0.5 bg-terracotta transition-all duration-300"
          style={{ width: `${(active / (stages.length - 1)) * 100}%` }}
        />
        {stages.map((s, i) => {
          const isActive = i === active;
          const isPast = i <= active;
          return (
            <button
              key={s.label}
              type="button"
              onClick={() => setActive(i)}
              aria-current={isActive}
              className="relative z-10 flex flex-col items-center gap-1.5 cursor-pointer group flex-1"
            >
              <span
                className={`${NODE_SIZES[i]} rounded-full flex items-center justify-center border-2 transition-all shrink-0 ${isPast ? "bg-terracotta border-terracotta text-white" : "bg-white border-[#E6DDD0] text-gray-400 group-hover:border-terracotta/50"
                  } ${isActive ? "ring-4 ring-terracotta/20" : ""}`}
              >
                <svg viewBox="0 0 64 64" className="w-2/3 h-2/3">
                  <PlantGlyph group={group} stage={i} />
                </svg>
              </span>
              <span
                className={`hidden sm:block text-[10.5px] font-sans font-semibold text-center leading-tight px-1 ${isActive ? "text-terracotta" : "text-gray-500"
                  }`}
              >
                {s.label}
              </span>
            </button>
          );
        })}
      </div>

      <p className="text-sm text-gray-600 leading-relaxed font-sans">{stages[active].caption}</p>

      {onSeeProcess && (
        <button
          type="button"
          onClick={onSeeProcess}
          className="flex items-center gap-1.5 text-xs font-sans font-semibold text-terracotta hover:text-terracotta-dark cursor-pointer"
        >
          Xem quy trình kiểm soát chất lượng chi tiết từng giai đoạn <ArrowDown className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
