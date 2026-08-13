import React from "react";
import { CheckCircle2 } from "lucide-react";

interface ProcessStep {
  stage: string;
  criteria: string;
  controlMethod: string;
}

interface ProcessStepsProps {
  steps: ProcessStep[];
}

/**
 * Dòng thời gian các bước quy trình (số thứ tự nối dọc) — thay cho bảng 3 cột,
 * giúp người đọc thấy rõ trình tự canh tác thay vì phải đối chiếu hàng/cột.
 */
export const ProcessSteps: React.FC<ProcessStepsProps> = ({ steps }) => {
  return (
    <div className="space-y-0">
      {steps.map((s, idx) => (
        <div key={idx} className="flex gap-4">
          <div className="flex flex-col items-center shrink-0">
            <div className="w-9 h-9 rounded-full bg-terracotta text-white font-sans font-bold text-sm flex items-center justify-center">
              {idx + 1}
            </div>
            {idx < steps.length - 1 && <div className="w-0.5 flex-1 bg-[#E6DDD0] my-1" />}
          </div>
          <div className={`flex-1 ${idx < steps.length - 1 ? "pb-6" : ""}`}>
            <h3 className="font-sans font-bold text-base text-ink-soft mb-1.5">{s.stage}</h3>
            <p className="text-[15px] text-gray-600 leading-relaxed font-sans mb-3">{s.criteria}</p>
            <div className="flex items-start gap-2.5 bg-[#F3F7F0] border border-[#CFE0C4] rounded-lg p-3.5">
              <CheckCircle2 className="w-4.5 h-4.5 text-[#3D6130] shrink-0 mt-0.5" />
              <p className="text-sm text-[#3D6130] leading-relaxed font-sans">
                <span className="font-semibold">Cách làm: </span>
                {s.controlMethod}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
