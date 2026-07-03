import { SITE } from "../data";

/** Dựng URL canonical tuyệt đối từ path logic (không kèm basename router). */
export function canonical(path: string): string {
  const base = SITE.siteUrl.replace(/\/$/, "");
  if (!path || path === "/") return `${base}/`;
  return `${base}/${path.replace(/^\//, "").replace(/\/$/, "")}`;
}

export { SITE };
