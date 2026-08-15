/**
 * Nguồn duy nhất cho mọi `@id` trong JSON-LD.
 *
 * Cả site chỉ phát MỘT graph mỗi trang, các node trỏ nhau bằng `@id`. Vì vậy id
 * phải ổn định và suy ra được từ path — đừng tự ghép chuỗi ở nơi khác, luôn gọi
 * qua đây để hai trang nói về cùng một thực thể sinh ra đúng cùng một id.
 */
import { SITE } from "../data";
import { canonical } from "./config";

const ORIGIN = SITE.siteUrl.replace(/\/$/, "");

export const ID = {
  /** Node WebSite — dùng chung cho toàn site. */
  website: () => `${ORIGIN}/#website`,
  /** Node Organization (brand của site). */
  org: () => `${ORIGIN}/#organization`,
  /** Logo của Organization, tách thành ImageObject riêng để tham chiếu lại. */
  logo: () => `${ORIGIN}/#logo`,
  /** Tác giả — neo vào trang /ve-toi. */
  person: () => `${SITE.authorUrl.replace(/\/$/, "")}#person`,

  webpage: (path: string) => `${canonical(path)}#webpage`,
  article: (path: string) => `${canonical(path)}#article`,
  breadcrumb: (path: string) => `${canonical(path)}#breadcrumb`,
  faq: (path: string) => `${canonical(path)}#faq`,
  howTo: (path: string) => `${canonical(path)}#howto`,
  itemList: (path: string) => `${canonical(path)}#itemlist`,
  primaryImage: (path: string) => `${canonical(path)}#primaryimage`,
  /**
   * Thực thể cây. LUÔN truyền path của TRANG THU MUA (paths.herb(slug)) kể cả khi
   * gọi từ trang hub kỹ thuật — trang thu mua là trang gốc của thực thể, nên hai
   * silo cùng trỏ về một id duy nhất.
   */
  taxon: (herbPath: string) => `${canonical(herbPath)}#taxon`,
  video: (path: string, key: string) => `${canonical(path)}#video-${key}`,
};

/** Tham chiếu tới một node khác trong graph. */
export const ref = (id: string) => ({ "@id": id });
