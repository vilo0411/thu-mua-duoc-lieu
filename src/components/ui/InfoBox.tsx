import React from "react";
import { Info } from "lucide-react";

interface InfoBoxProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const InfoBox: React.FC<InfoBoxProps> = ({ title, children, icon }) => {
  return (
    <div className="rounded-xl bg-[#F5ECE1] border-l-4 border-[#B85037] p-5 my-6 shadow-xs">
      <div className="flex items-start gap-3">
        <div className="text-[#B85037] mt-1 shrink-0">
          {icon || <Info className="w-5 h-5" />}
        </div>
        <div className="flex-1">
          <h4 className="text-[#4F433A] font-sans font-bold text-lg mb-2 tracking-tight">
            {title}
          </h4>
          <div className="text-[#2D2521] text-base leading-relaxed font-sans">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
