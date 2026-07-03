import React from "react";
import { AlertTriangle } from "lucide-react";

export const NeutralPartnerCard: React.FC = () => {
  return (
    <div className="border border-gray-200 bg-gray-50 rounded-xl p-5 md:p-6 my-6 text-gray-600">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-gray-400 mt-1 shrink-0" />
        <div className="space-y-2">
          <h4 className="font-sans font-bold text-lg text-gray-700">
            Các điểm thu gom tư nhân tự phát (Thương lái nhỏ lẻ)
          </h4>
          <p className="text-sm leading-relaxed">
            Ưu điểm: Giao dịch nhanh bằng tiền mặt trực tiếp tại bờ ruộng, không yêu cầu phân loại chặt chẽ hay giấy tờ xuất xứ nguồn gốc.
          </p>
          <p className="text-sm leading-relaxed text-red-600 font-medium">
            Rủi ro lớn: Giá bấp bênh biến động theo ngày, thường xuyên xảy ra tình trạng bùng hợp đồng, ép giá cực đoan khi thị trường thừa cung, hoặc kén chọn thắt chặt thu mua không có lý do thỏa đáng.
          </p>
          <div className="text-xs text-gray-400 italic pt-1">
            Khuyên dùng: Bà con chỉ nên giao dịch lượng nhỏ dư thừa ngắn ngày. Tránh dồn toàn bộ nguồn lực gia đình đầu tư vùng lớn dựa hoàn toàn vào cam kết miệng của thương lái tự phát.
          </div>
        </div>
      </div>
    </div>
  );
};
