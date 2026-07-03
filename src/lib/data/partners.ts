import type { Partner } from "../../types";
import partnersJson from "../../../content/partners.json";

export const PARTNERS: Partner[] = partnersJson as Partner[];

/** Đối tác được đề xuất (featured). Ban đầu chỉ có VIETMEC (PRD §6.4). */
export const FEATURED_PARTNER: Partner =
  PARTNERS.find((p) => p.isFeatured) ?? PARTNERS[0];

/**
 * Back-compat: các trang cũ tham chiếu PARTNER_COMPANY.name / .stockCode ...
 * Trỏ về đối tác featured để không phải sửa toàn bộ JSX hiện có.
 */
export const PARTNER_COMPANY = FEATURED_PARTNER;

/**
 * Dựng link outbound về landing kèm UTM đúng chuẩn PRD §8.3 Rule 7.
 * @example buildLandingUrl(partner, { cay: "dinh-lang", pageType: "money_cay", ctaPosition: "partner_card" })
 */
export function buildLandingUrl(
  partner: Partner,
  opts: { cay?: string; pageType?: string; ctaPosition?: string } = {},
): string {
  const query = partner.utmTemplate
    .replace("{cay}", opts.cay ?? "general")
    .replace("{page_type}", opts.pageType ?? "general")
    .replace("{cta_position}", opts.ctaPosition ?? "body");
  return `${partner.landingUrl}${query}`;
}
