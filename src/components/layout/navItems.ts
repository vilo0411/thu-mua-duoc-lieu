import { paths } from "../../lib/paths";

// Danh sách liên kết điều hướng chính, dùng chung cho Header desktop & MobileNav.
// `end: true` để NavLink chỉ active khi khớp chính xác (vd trang chủ "/").
export interface NavItem {
  to: string;
  label: string;
  end?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { to: paths.home(), label: "Trang chủ", end: true },
  { to: paths.pillar(), label: "Thu mua dược liệu" },
  { to: paths.knowledge(), label: "Kiến thức" },
  { to: paths.about(), label: "Về tôi" },
  { to: paths.contact(), label: "Liên hệ" },
];
