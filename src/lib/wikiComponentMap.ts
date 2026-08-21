import type { ComponentType } from "react";
import type { WikiArticle } from "../types";
import { SoilTypeExplorer } from "../components/ui/SoilTypeExplorer";
import { SymptomDiagnoser } from "../components/ui/SymptomDiagnoser";
import { StandardsChecklist } from "../components/ui/StandardsChecklist";
import { TechProcessVisualizer } from "../components/ui/TechProcessVisualizer";
import { NutrientMixer } from "../components/ui/NutrientMixer";

// Articles that belong to "Kỹ thuật gieo trồng" but need the soil explorer.
const SOIL_IDS = new Set([
  "cac-loai-dat-trong-cay",
  "dat-trong-cay-duoc-lieu",
  "cach-tron-dat-trong-cay",
  "gia-the-la-gi",
]);

// Articles that belong to "Kỹ thuật gieo trồng" but need the nutrient mixer.
const FERTILIZER_IDS = new Set([
  "phan-bon-cho-cay-duoc-lieu",
  "cach-bon-lot-bon-thuc",
]);

export function getWikiInteractiveComponent(
  article: WikiArticle,
): ComponentType<{ article: WikiArticle }> | null {
  const { id, category } = article;

  if (category === "Phòng trừ sâu bệnh") return SymptomDiagnoser;
  if (category === "Tiêu chuẩn & kiểm định") return StandardsChecklist;

  if (category === "Kỹ thuật gieo trồng") {
    if (SOIL_IDS.has(id)) return SoilTypeExplorer;
    if (FERTILIZER_IDS.has(id)) return NutrientMixer;
    return TechProcessVisualizer;
  }

  return null;
}
