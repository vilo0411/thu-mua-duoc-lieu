import React from "react";
import { Factory, Users, ShoppingBag, AlertTriangle, CheckCircle2 } from "lucide-react";
import { FEATURED_PARTNER, buildLandingUrl } from "../../lib/data";

interface SaleChannelsCardProps {
  herbName?: string;
  cay?: string;
  pageType?: string;
}

const channels = [
  {
    icon: Factory,
    label: "Nhà máy chế biến",
    tag: "Giá tốt nhất",
    tagColor: "bg-green-100 text-green-700",
    pros: [
      "Giá thu mua cao hơn thương lái (do mua số lượng lớn, dài hạn).",
      "Có hợp đồng văn bản, thanh toán chuyển khoản minh bạch.",
      "Hỗ trợ tiêu chuẩn chất lượng và kỹ thuật sơ chế.",
    ],
    caveats: "Yêu cầu: sản lượng ổn định (thường từ vài tấn/vụ), dược liệu đạt tiêu chuẩn khô, có thể cần HTX đứng ra ký hợp đồng nếu nông hộ nhỏ lẻ.",
    showVietmec: true,
  },
  {
    icon: Users,
    label: "HTX / Tổ hợp tác địa phương",
    tag: "Phù hợp nông hộ nhỏ",
    tagColor: "bg-blue-100 text-blue-700",
    pros: [
      "Gom hàng nhiều hộ thành lô lớn, dễ bán cho nhà máy hơn.",
      "HTX đứng ra đàm phán giá và ký hợp đồng, nông hộ không cần tự xử lý giấy tờ.",
      "Thường hỗ trợ vận chuyển chung, tiết kiệm chi phí.",
    ],
    caveats: "Giá thường thấp hơn bán trực tiếp một chút (HTX hưởng phí dịch vụ), nhưng phù hợp với hộ canh tác dưới 1ha.",
    showVietmec: false,
  },
  {
    icon: ShoppingBag,
    label: "Thương lái / Điểm thu gom",
    tag: "Nhanh nhất",
    tagColor: "bg-amber-100 text-amber-700",
    pros: [
      "Thanh toán tiền mặt tại bờ ruộng, không cần phân loại phức tạp.",
      "Linh hoạt về số lượng, phù hợp khi cần bán nhanh.",
    ],
    caveats: "Giá biến động theo ngày, có thể ép giá khi thị trường thừa cung. Nên chỉ dùng kênh này cho lượng nhỏ hoặc hàng không đủ tiêu chuẩn nhà máy.",
    showVietmec: false,
  },
];

export const SaleChannelsCard: React.FC<SaleChannelsCardProps> = ({
  herbName,
  cay,
  pageType = "money_cay",
}) => {
  const partner = FEATURED_PARTNER;
  const partnerLink = buildLandingUrl(partner, { cay, pageType, ctaPosition: "channels_card" });

  return (
    <div className="space-y-4">
      {channels.map((ch) => {
        const Icon = ch.icon;
        return (
          <div
            key={ch.label}
            className={`bg-white rounded-xl p-5 md:p-6 space-y-3 ${
              ch.showVietmec
                ? "border-2 border-terracotta ring-1 ring-terracotta/20 shadow-md shadow-terracotta/10"
                : "border border-line"
            }`}
          >
            <div className="flex flex-wrap items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sand flex items-center justify-center shrink-0">
                <Icon className="w-4.5 h-4.5 text-terracotta" />
              </div>
              <h4 className="font-sans font-bold text-base text-ink-soft">{ch.label}</h4>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${ch.tagColor}`}>{ch.tag}</span>
            </div>

            <ul className="space-y-1.5">
              {ch.pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-ink">
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span>{pro}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-start gap-2 text-xs text-gray-500 italic bg-paper-2 rounded-lg px-3 py-2">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-500" />
              <span>{ch.caveats}</span>
            </div>

            {ch.showVietmec && (
              <div className="border-t border-line pt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <p className="text-sm text-gray-600">
                  Đơn vị tham khảo:{" "}
                  <strong className="text-ink-soft">{partner.fullName}</strong>
                  {" "}— Thu mua dược liệu toàn quốc, có hợp đồng văn bản.
                </p>
                <a
                  href={partnerLink}
                  target="_blank"
                  rel="noopener"
                  className="shrink-0 border border-terracotta text-terracotta hover:bg-terracotta hover:text-white font-sans font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
                >
                  Xem thông tin {partner.name} →
                </a>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
