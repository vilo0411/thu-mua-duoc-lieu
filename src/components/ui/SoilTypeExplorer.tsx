import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Leaf, Droplets, Star, ChevronDown, ChevronUp, FlaskConical } from "lucide-react";
import type { WikiArticle } from "../../types";

interface SoilType {
  id: string;
  name: string;
  tabColor: string;
  headerBg: string;
  phMin: number;
  phMax: number;
  drainage: number;   // 1 (rất chậm) → 5 (rất nhanh)
  retention: number;  // 1 (rất kém) → 5 (rất tốt)
  fertility: number;  // 1 (rất nghèo) → 5 (rất giàu)
  texture: string;
  herbs: { name: string; slug: string }[];
  amendment: string;
}

const SOIL_TYPES: SoilType[] = [
  {
    id: "dat-thit",
    name: "Đất thịt",
    tabColor: "#8B5E3C",
    headerBg: "#F5EDE3",
    phMin: 6.0,
    phMax: 7.0,
    drainage: 3,
    retention: 3,
    fertility: 5,
    texture: "Tơi xốp, cân bằng cát–sét–limon",
    herbs: [
      { name: "Đinh lăng", slug: "dinh-lang" },
      { name: "Cà gai leo", slug: "ca-gai-leo" },
      { name: "Gừng", slug: "gung" },
      { name: "Nghệ", slug: "nghe" },
    ],
    amendment: "Bổ sung phân hữu cơ hoai mục mỗi vụ để duy trì kết cấu tơi xốp và hàm lượng mùn.",
  },
  {
    id: "dat-phu-sa",
    name: "Đất phù sa",
    tabColor: "#C08D3A",
    headerBg: "#FDF6E3",
    phMin: 6.5,
    phMax: 7.5,
    drainage: 2,
    retention: 4,
    fertility: 5,
    texture: "Hạt mịn, giàu mùn hữu cơ tự nhiên",
    herbs: [
      { name: "Bạc hà", slug: "bac-ha" },
      { name: "Ích mẫu", slug: "ich-mau" },
      { name: "Kinh giới", slug: "kinh-gioi" },
    ],
    amendment: "Xới xáo sau mưa lớn; trộn thêm trấu hun hoặc mùn cưa để tăng độ tơi, tránh nén dẽ.",
  },
  {
    id: "dat-do-bazan",
    name: "Đất đỏ bazan",
    tabColor: "#B03A2E",
    headerBg: "#FDF0EE",
    phMin: 5.5,
    phMax: 6.5,
    drainage: 5,
    retention: 2,
    fertility: 4,
    texture: "Tầng đất sâu dày, kết cấu tơi, thoát nước tốt",
    herbs: [
      { name: "Hà thủ ô", slug: "ha-thu-o" },
      { name: "Ba kích", slug: "ba-kich" },
      { name: "Sâm Ngọc Linh", slug: "sam-ngoc-linh" },
    ],
    amendment: "Bón vôi bột nếu pH dưới 5.5; tăng cường phân hữu cơ để bù lại nghèo mùn.",
  },
  {
    id: "dat-cat",
    name: "Đất cát",
    tabColor: "#D4A05A",
    headerBg: "#FDF8F0",
    phMin: 5.0,
    phMax: 7.0,
    drainage: 5,
    retention: 1,
    fertility: 1,
    texture: "Hạt thô rời rạc, thoát nước và phân bón rất nhanh",
    herbs: [
      { name: "Sa nhân", slug: "sa-nhan" },
      { name: "Dừa cạn", slug: "dua-can" },
      { name: "Diệp hạ châu", slug: "diep-ha-chau" },
    ],
    amendment: "Bón nhiều phân trùn quế và mùn hữu cơ; dùng rơm rạ tủ gốc dày để giữ ẩm hiệu quả.",
  },
  {
    id: "dat-set",
    name: "Đất sét",
    tabColor: "#6B7280",
    headerBg: "#F3F4F6",
    phMin: 5.0,
    phMax: 6.0,
    drainage: 1,
    retention: 5,
    fertility: 3,
    texture: "Hạt mịn kết chặt, giữ nước và phân bón cực tốt",
    herbs: [
      { name: "Sen", slug: "sen" },
      { name: "Rau má", slug: "rau-ma" },
    ],
    amendment: "Trộn cát vàng và vỏ trấu để tăng thoáng khí; đào mương thoát nước nếu trồng cây không ưa úng.",
  },
];

const PH_MIN = 3.5;
const PH_MAX = 8.5;
const PH_RANGE = PH_MAX - PH_MIN;

const PhBar: React.FC<{ min: number; max: number }> = ({ min, max }) => {
  const leftPct = ((min - PH_MIN) / PH_RANGE) * 100;
  const widthPct = ((max - min) / PH_RANGE) * 100;
  return (
    <div className="space-y-2">
      <div className="relative h-6 rounded-full overflow-hidden"
        style={{ background: "linear-gradient(to right, #dc2626 0%, #f97316 18%, #facc15 36%, #4ade80 50%, #4ade80 58%, #60a5fa 76%, #a78bfa 100%)" }}>
        {[4, 5, 6, 7, 8].map((v) => (
          <div
            key={v}
            className="absolute top-0 h-full w-px bg-white/50"
            style={{ left: `${((v - PH_MIN) / PH_RANGE) * 100}%` }}
          />
        ))}
        <div
          className="absolute top-1 bottom-1 rounded-full border-2 border-white bg-white/30"
          style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
        />
      </div>
      <div className="flex justify-between text-[11px] font-sans">
        <span className="text-gray-400">pH 3.5 (rất chua)</span>
        <span className="font-bold text-green-700">Lý tưởng: {min}–{max}</span>
        <span className="text-gray-400">pH 8.5 (kiềm)</span>
      </div>
    </div>
  );
};

const Dots: React.FC<{ value: number; color: string; label: string }> = ({ value, color, label }) => (
  <div className="space-y-1.5">
    <span className="text-xs font-sans text-gray-500">{label}</span>
    <div className="flex gap-1.5">
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          className="w-5 h-5 rounded-full border-2 flex-shrink-0"
          style={i < value ? { backgroundColor: color, borderColor: color } : { backgroundColor: "white", borderColor: "#E5E7EB" }}
        />
      ))}
    </div>
  </div>
);

const Stars: React.FC<{ value: number }> = ({ value }) => (
  <div className="space-y-1.5">
    <span className="text-xs font-sans text-gray-500">Độ phì nhiêu</span>
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className="w-5 h-5"
          fill={i < value ? "#F59E0B" : "none"}
          stroke={i < value ? "#F59E0B" : "#D1D5DB"}
        />
      ))}
    </div>
  </div>
);

export const SoilTypeExplorer: React.FC<{ article: WikiArticle }> = ({ article: _article }) => {
  const [active, setActive] = useState(0);
  const [amendOpen, setAmendOpen] = useState(false);
  const soil = SOIL_TYPES[active];

  return (
    <div className="rounded-2xl border border-line overflow-hidden bg-white shadow-sm">
      {/* Header */}
      <div className="px-5 pt-5 pb-0 space-y-1">
        <div className="flex items-center gap-2">
          <FlaskConical className="w-5 h-5 text-terracotta" />
          <h3 className="font-serif font-bold text-base text-ink-soft">
            Khám phá đặc tính từng loại đất
          </h3>
        </div>
        <p className="text-xs text-gray-500 font-sans">Chọn loại đất để xem pH, độ thoát nước và cây dược liệu phù hợp</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 px-5 pt-4 pb-0 overflow-x-auto scrollbar-none">
        {SOIL_TYPES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => { setActive(i); setAmendOpen(false); }}
            className="flex-shrink-0 px-3.5 py-2 rounded-full text-xs font-sans font-semibold transition-all cursor-pointer border-2"
            style={
              i === active
                ? { backgroundColor: s.tabColor, borderColor: s.tabColor, color: "white" }
                : { backgroundColor: "white", borderColor: "#E5E7EB", color: "#6B7280" }
            }
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* Detail Panel */}
      <div className="p-5 space-y-5">
        {/* Header row */}
        <div
          className="rounded-xl p-4 space-y-0.5"
          style={{ backgroundColor: soil.headerBg }}
        >
          <div className="font-serif font-bold text-lg text-ink-soft">{soil.name}</div>
          <div className="text-sm text-gray-600 font-sans">{soil.texture}</div>
        </div>

        {/* pH Range Bar */}
        <div className="space-y-1.5">
          <span className="text-xs font-sans font-semibold text-gray-600 flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-full bg-green-400" />
            Độ pH phù hợp
          </span>
          <PhBar min={soil.phMin} max={soil.phMax} />
        </div>

        {/* Drainage + Retention + Fertility */}
        <div className="grid grid-cols-3 gap-3 p-4 bg-paper-2 rounded-xl">
          <Dots value={soil.drainage} color={soil.tabColor} label="Thoát nước" />
          <Dots value={soil.retention} color="#60A5FA" label="Giữ ẩm" />
          <Stars value={soil.fertility} />
        </div>

        {/* Suitable Herbs */}
        <div className="space-y-2">
          <span className="text-xs font-sans font-semibold text-gray-600 flex items-center gap-1.5">
            <Leaf className="w-3.5 h-3.5 text-green-600" />
            Cây dược liệu phù hợp
          </span>
          <div className="flex flex-wrap gap-2">
            {soil.herbs.map((h) => (
              <Link
                key={h.slug}
                to={`/kien-thuc/ky-thuat-trong-${h.slug}`}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-sand border border-earth/30 text-xs font-sans font-semibold text-earth hover:bg-earth hover:text-white transition-colors"
              >
                {h.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Amendment tip */}
        <div className="border border-line rounded-xl overflow-hidden">
          <button
            type="button"
            className="w-full flex items-center justify-between px-4 py-3 text-left cursor-pointer hover:bg-paper-2 transition-colors"
            onClick={() => setAmendOpen(!amendOpen)}
          >
            <span className="text-xs font-sans font-semibold text-ink-soft flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-terracotta" />
              Cách cải tạo đất này
            </span>
            {amendOpen
              ? <ChevronUp className="w-4 h-4 text-gray-400" />
              : <ChevronDown className="w-4 h-4 text-gray-400" />}
          </button>
          {amendOpen && (
            <div className="px-4 pb-4 pt-1 text-sm text-gray-700 font-sans leading-relaxed border-t border-line">
              {soil.amendment}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
