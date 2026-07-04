import React from "react";
import { ArrowRight } from "lucide-react";

/** Hai tông "lối vào" — xanh lá cho silo Kiến thức, terracotta cho silo Thu mua. */
type Tone = "green" | "terracotta";

const TONE: Record<Tone, { ring: string; iconBg: string; iconText: string; hoverBorder: string; cta: string; glow: string }> = {
  green: {
    ring: "border-[#DCE7D2]",
    iconBg: "bg-[#EAF1E2]",
    iconText: "text-[#4F7942]",
    hoverBorder: "hover:border-[#4F7942]",
    cta: "text-[#4F7942]",
    glow: "bg-[#4F7942]/5",
  },
  terracotta: {
    ring: "border-[#E6DDD0]",
    iconBg: "bg-[#F7E9E3]",
    iconText: "text-[#B85037]",
    hoverBorder: "hover:border-[#B85037]",
    cta: "text-[#B85037]",
    glow: "bg-[#B85037]/5",
  },
};

interface PillarDoorCardProps {
  icon: React.ElementType;
  eyebrow: string;
  title: string;
  desc: string;
  ctaLabel: string;
  tone: Tone;
  onClick: () => void;
}

/**
 * Thẻ "lối vào" một silo nội dung — thiết bị điều hướng riêng của trang chủ.
 * Cỡ lớn, bấm cả thẻ, có icon nhấn tông theo silo để phân biệt hai hướng đi.
 */
export const PillarDoorCard: React.FC<PillarDoorCardProps> = ({ icon: Icon, eyebrow, title, desc, ctaLabel, tone, onClick }) => {
  const t = TONE[tone];
  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden text-left bg-white border ${t.ring} ${t.hoverBorder} rounded-2xl p-7 md:p-8 shadow-2xs hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer flex flex-col gap-4`}
    >
      <div className={`absolute right-0 top-0 w-40 h-40 ${t.glow} rounded-full -mr-16 -mt-16 pointer-events-none`} />
      <div className={`w-14 h-14 shrink-0 rounded-xl ${t.iconBg} ${t.iconText} flex items-center justify-center`}>
        <Icon className="w-7 h-7" strokeWidth={2} />
      </div>
      <div className="space-y-1.5 relative z-10">
        <span className={`text-xs font-bold uppercase tracking-wider ${t.cta}`}>{eyebrow}</span>
        <h3 className="font-serif text-2xl font-bold text-[#4F433A] tracking-tight">{title}</h3>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">{desc}</p>
      </div>
      <span className={`mt-auto inline-flex items-center gap-1.5 font-sans font-bold text-sm ${t.cta}`}>
        {ctaLabel}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </span>
    </button>
  );
};
