import React from "react";
import { useParams } from "react-router-dom";
import { getHubByHerbSlug, getHerbBySlug, getArticleById } from "../lib/data";
import { HUB_SLUG_PREFIX } from "../lib/paths";
import { HubWikiPage } from "./HubWikiPage";
import { WikiArticlePage } from "./WikiArticlePage";
import { NotFoundPage } from "./NotFoundPage";

/**
 * Điều phối một segment duy nhất trong silo Kiến thức (PRD §4.1):
 *  - khớp id bài wiki → trang bài wiki
 *  - `ky-thuat-trong-{cay}` → trang Hub kỹ thuật của cây
 *  - không khớp → 404 (không fallback về bài mặc định để tránh soft-404/duplicate).
 *
 * Thứ tự quan trọng: id bài phải được xét TRƯỚC tiền tố hub. Có bài wiki mang id
 * bắt đầu bằng đúng tiền tố đó (`ky-thuat-trong-cay-duoc-lieu`); xét tiền tố trước
 * thì nó bị hiểu thành hub của cây "cay-duoc-lieu" — cây không tồn tại — và cả bài
 * rơi vào 404 dù sitemap vẫn liệt kê. Khớp chính xác luôn thắng suy đoán theo tiền tố.
 */
export const KienThucSlugPage: React.FC = () => {
  const { slug = "" } = useParams();

  if (getArticleById(slug)) {
    return <WikiArticlePage articleId={slug} />;
  }

  if (slug.startsWith(HUB_SLUG_PREFIX)) {
    const herbSlug = slug.slice(HUB_SLUG_PREFIX.length);
    if (getHerbBySlug(herbSlug) && getHubByHerbSlug(herbSlug)) {
      return <HubWikiPage herbSlug={herbSlug} />;
    }
  }

  return <NotFoundPage />;
};
