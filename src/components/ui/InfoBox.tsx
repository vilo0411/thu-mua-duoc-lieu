import React from "react";
import { Info } from "lucide-react";

interface InfoBoxProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  /**
   * Cấp heading của tiêu đề hộp. Phải khớp ngữ cảnh đặt hộp: nằm trong một mục đã có
   * <h2> thì truyền 3, nếu không dàn heading của trang bị nhảy cấp. Mặc định 2 để giữ
   * nguyên hành vi các chỗ gọi cũ.
   */
  headingLevel?: 2 | 3 | 4;
}

/**
 * Hộp thông tin nhấn mạnh bên lề mạch đọc chính → <aside>, không phải <div> vô nghĩa.
 */
export const InfoBox: React.FC<InfoBoxProps> = ({ title, children, icon, headingLevel = 2 }) => {
  const Heading = `h${headingLevel}` as "h2" | "h3" | "h4";
  return (
    <aside className="rounded-xl bg-[#F5ECE1] border-l-4 border-[#B85037] p-5 my-6 shadow-xs">
      <div className="flex items-start gap-3">
        <div className="text-[#B85037] mt-1 shrink-0" aria-hidden="true">
          {icon || <Info className="w-5 h-5" />}
        </div>
        <div className="flex-1">
          <Heading className="text-[#4F433A] font-sans font-bold text-lg mb-2 tracking-tight">
            {title}
          </Heading>
          <div className="text-[#2D2521] text-base leading-relaxed font-sans">
            {children}
          </div>
        </div>
      </div>
    </aside>
  );
};
