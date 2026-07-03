import type { WikiArticle } from "../../types";

const modules = import.meta.glob<{ default: WikiArticle }>(
  "../../../content/wiki/*.json",
  { eager: true },
);

const DISPLAY_ORDER = [
  "ky-thuat-say-duoc-lieu",
  "lien-ket-ba-ben-vietmec",
  "phan-biet-cay-duoc-lieu-gia",
];

export const WIKI_ARTICLES: WikiArticle[] = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => {
    const ia = DISPLAY_ORDER.indexOf(a.id);
    const ib = DISPLAY_ORDER.indexOf(b.id);
    return (ia === -1 ? Infinity : ia) - (ib === -1 ? Infinity : ib);
  });

export const getArticleById = (id: string): WikiArticle | undefined =>
  WIKI_ARTICLES.find((a) => a.id === id);
