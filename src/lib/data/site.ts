import type { SiteConfig } from "../../types";
import siteJson from "../../../content/site.json";

export const SITE: SiteConfig = siteJson as SiteConfig;

// Back-compat với các hằng số cũ trong mockData.ts.
export const SITE_OWNER = SITE.owner;
export const OWNER_EMAIL = SITE.email;
export const OWNER_URL = SITE.displayUrl;
