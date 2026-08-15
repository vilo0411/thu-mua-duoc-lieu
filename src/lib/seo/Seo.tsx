import React from "react";
import { SITE } from "../data";
import { asset } from "../paths";
import { canonical } from "./config";
import { graph as jsonLdGraph } from "./jsonLd";

export interface SeoProps {
  /** Tiêu đề <title> (nên 50–60 ký tự, chứa keyword chính — PRD §8.1). */
  title: string;
  /** Meta description (nên 150–160 ký tự). */
  description: string;
  /** Path logic của trang, ví dụ "/thu-mua-duoc-lieu/dinh-lang". */
  path: string;
  type?: "website" | "article";
  image?: string;
  /**
   * Các NODE JSON-LD của trang (không kèm `@context`). Chúng được gộp thành một
   * `@graph` duy nhất — xem quy ước ở đầu lib/seo/jsonLd.ts.
   */
  graph?: (Record<string, unknown> | undefined | null | false)[];
  /** Đặt true cho các trang không muốn index (ví dụ trang 404). */
  noindex?: boolean;
}

/**
 * Bơm metadata vào <head>. Tận dụng cơ chế hoist thẻ document metadata của
 * React 19 — <title>/<meta>/<link> render ở bất kỳ đâu sẽ tự lên <head>.
 * JSON-LD render inline (Google đọc được ở mọi vị trí trong document).
 */
export const Seo: React.FC<SeoProps> = ({
  title,
  description,
  path,
  type = "website",
  image,
  graph: nodes,
  noindex = false,
}) => {
  const url = canonical(path);
  // Ảnh nội bộ cần gắn base deploy (giống <img>); URL đầy đủ giữ nguyên.
  // Trang không tự set image sẽ dùng ảnh OG mặc định để link preview không trống.
  // OG/Twitter yêu cầu URL tuyệt đối → prefix origin cho ảnh nội bộ.
  const resolved = asset(image ?? SITE.defaultImage);
  const ogImage = /^https?:\/\//.test(resolved)
    ? resolved
    : `${SITE.siteUrl.replace(/\/$/, "")}${resolved.startsWith("/") ? "" : "/"}${resolved}`;
  // Cả trang chỉ phát MỘT khối ld+json chứa @graph, nên các node trỏ nhau qua @id.
  // Escape "<" để chuỗi nội dung chứa "</script>" không cắt đứt thẻ script.
  const ldJson = nodes?.some(Boolean)
    ? JSON.stringify(jsonLdGraph(nodes)).replace(/</g, "\\u003c")
    : undefined;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={SITE.siteName} />
      <meta property="og:locale" content={SITE.locale} />
      {ogImage && <meta property="og:image" content={ogImage} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content={ogImage ? "summary_large_image" : "summary"} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {ldJson && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: ldJson }}
        />
      )}
    </>
  );
};
