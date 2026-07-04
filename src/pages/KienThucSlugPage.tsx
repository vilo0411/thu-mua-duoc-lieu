import React from "react";
import { useParams } from "react-router-dom";
import { getHubByHerbSlug, getHerbBySlug, getArticleById } from "../lib/data";
import { HUB_SLUG_PREFIX } from "../lib/paths";
import { HubWikiPage } from "./HubWikiPage";
import { WikiArticlePage } from "./WikiArticlePage";
import { NotFoundPage } from "./NotFoundPage";

/**
 * Điều phối một segment duy nhất trong silo Kiến thức (PRD §4.1):
 *  - `ky-thuat-trong-{cay}` → trang Hub kỹ thuật của cây
 *  - còn lại khớp id bài wiki → trang bài wiki
 *  - không khớp → 404 (không fallback về bài mặc định để tránh soft-404/duplicate).
 */
export const KienThucSlugPage: React.FC = () => {
  const { slug = "" } = useParams();

  if (slug.startsWith(HUB_SLUG_PREFIX)) {
    const herbSlug = slug.slice(HUB_SLUG_PREFIX.length);
    if (getHerbBySlug(herbSlug) && getHubByHerbSlug(herbSlug)) {
      return <HubWikiPage herbSlug={herbSlug} />;
    }
    return <NotFoundPage />;
  }

  if (getArticleById(slug)) {
    return <WikiArticlePage articleId={slug} />;
  }

  return <NotFoundPage />;
};
