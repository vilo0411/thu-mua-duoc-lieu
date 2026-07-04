import React from "react";
import { ArrowRight } from "lucide-react";
import { FEATURED_PARTNER, buildLandingUrl } from "../../lib/data";

/**
 * CTA outbound về landing đối tác thu mua (PRD §8.3 Rule 7 + §1.4 non-goal:
 * không xây form trên site — chuyển đổi diễn ra ở landing). Mọi thông tin đối tác
 * lấy từ content/partners.json (không hardcode tên trong template — PRD §15.4),
 * link luôn kèm UTM đúng chuẩn, rel="noopener".
 */
export type CtaPosition = "hero" | "partner_card" | "footer" | "mobile_sticky" | "hub_mention";

// Anchor text đa dạng theo vị trí để không lặp cùng một anchor cho cùng URL đích
// (PRD §8.3 Rule 6). Tên đối tác nội suy từ data.
const DEFAULT_LABELS: Record<CtaPosition, string> = {
  hero: "Gửi thông tin lô hàng",
  partner_card: "Gửi báo giá lô hàng ngay",
  footer: `Tham khảo đầu mối ${FEATURED_PARTNER.name}`,
  mobile_sticky: `Kết nối ${FEATURED_PARTNER.name}`,
  hub_mention: "Xem đơn vị thu mua bao tiêu",
};

interface LandingLinkProps {
  /** Slug cây cho UTM campaign (bỏ trống nếu trang tổng). */
  cay?: string;
  /** money_cay | money_vung | pillar | hub_wiki | home | knowledge (PRD §12.2). */
  pageType: string;
  ctaPosition: CtaPosition;
  /** Ghi đè anchor text mặc định. */
  label?: string;
  className?: string;
  showArrow?: boolean;
  /** Nếu truyền children thì render tùy biến thay cho label mặc định. */
  children?: React.ReactNode;
}

export const LandingLink: React.FC<LandingLinkProps> = ({
  cay,
  pageType,
  ctaPosition,
  label,
  className,
  showArrow = true,
  children,
}) => {
  const href = buildLandingUrl(FEATURED_PARTNER, { cay, pageType, ctaPosition });
  const text = label ?? DEFAULT_LABELS[ctaPosition];

  return (
    <a href={href} target="_blank" rel="noopener" className={className}>
      {children ?? (
        <>
          <span>{text}</span>
          {showArrow && <ArrowRight className="w-4 h-4" />}
        </>
      )}
    </a>
  );
};
