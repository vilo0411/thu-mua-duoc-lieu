/**
 * Lớp truy cập dữ liệu (data layer) cho toàn site.
 *
 * Mỗi entity được nạp từ các file JSON riêng dưới content/ (PRD §6, §7.3) và ép
 * kiểu theo src/types.ts. Việc xác thực hình dạng dữ liệu được thực hiện tại
 * build time bằng Zod qua `npm run validate:content` (scripts/validate-content.ts),
 * nên bundle phía client không phải gánh thêm zod.
 *
 * UI chỉ nên import từ đây, không import trực tiếp file JSON.
 */
export { HERBS_DATA, getHerbBySlug } from "./herbs";
export { REGIONS_DATA, getRegionBySlug } from "./regions";
export { WIKI_ARTICLES, getArticleById } from "./wiki";
export { WIKI_HUBS, getHubByHerbSlug, getHubById } from "./hubs";
export {
  PARTNERS,
  FEATURED_PARTNER,
  PARTNER_COMPANY,
  buildLandingUrl,
} from "./partners";
export { SITE, SITE_OWNER, OWNER_EMAIL, OWNER_URL } from "./site";
