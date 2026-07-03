import type { RegionData } from "../../types";

const modules = import.meta.glob<{ default: RegionData }>(
  "../../../content/vung/*.json",
  { eager: true },
);

const DISPLAY_ORDER = ["tay-bac", "dong-bac", "tay-nguyen", "bac-trung-bo"];

export const REGIONS_DATA: RegionData[] = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => {
    const ia = DISPLAY_ORDER.indexOf(a.slug);
    const ib = DISPLAY_ORDER.indexOf(b.slug);
    return (ia === -1 ? Infinity : ia) - (ib === -1 ? Infinity : ib);
  });

export const getRegionBySlug = (slug: string): RegionData | undefined =>
  REGIONS_DATA.find((r) => r.slug === slug);
