import type { HerbalMedicine } from "../../types";

// Vite gom toàn bộ JSON cây dược liệu tại build time. Mỗi file = 1 cây (PRD §7.3).
const modules = import.meta.glob<{ default: HerbalMedicine }>(
  "../../../content/cay/*.json",
  { eager: true },
);

// Thứ tự hiển thị chủ đích (homepage grid, catalog). Cây ngoài danh sách xếp cuối.
const DISPLAY_ORDER = [
  "dinh-lang",
  "ba-kich",
  "ha-thu-o",
  "atiso",
  "nam-linh-chi",
  "bac-ha",
  "ca-gai-leo",
  "kim-ngan-hoa",
];

export const HERBS_DATA: HerbalMedicine[] = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => {
    const ia = DISPLAY_ORDER.indexOf(a.slug);
    const ib = DISPLAY_ORDER.indexOf(b.slug);
    return (ia === -1 ? Infinity : ia) - (ib === -1 ? Infinity : ib);
  });

export const getHerbBySlug = (slug: string): HerbalMedicine | undefined =>
  HERBS_DATA.find((h) => h.slug === slug);
