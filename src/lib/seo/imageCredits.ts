/**
 * Tra thông tin bản quyền ảnh mượn từ Wikimedia Commons (do
 * scripts/fetch-wiki-images.ts ghi ra) để đưa vào `ImageObject`.
 *
 * Hai mục đích: thực hiện đúng nghĩa vụ ghi công của giấy phép CC, và đủ điều kiện
 * huy hiệu "Licensable" trên Google Images.
 */
import creditsJson from "../../../public/images/kien-thuc/credits.json";

interface RawCredit {
  file: string;
  source?: string;
  artist?: string;
  license?: string;
  licenseUrl?: string;
}

/**
 * Bỏ đuôi file khi lập chỉ mục: credits.json ghi ảnh gốc `.jpg` còn content trỏ bản
 * `.webp` đã tối ưu — cùng một tấm ảnh, cùng một giấy phép.
 */
const stripExt = (p: string) => p.replace(/\.[a-z0-9]+$/i, "");

const BY_FILE = new Map<string, RawCredit>(
  Object.values(creditsJson as Record<string, RawCredit>).map((c) => [stripExt(c.file), c]),
);

export interface ImageCredit {
  creditText?: string;
  license?: string;
  acquireLicensePage?: string;
}

/** Trả undefined cho ảnh tự chụp/không có credit — khi đó ImageObject bỏ hẳn các key này. */
export function imageCredit(src?: string): ImageCredit | undefined {
  if (!src) return undefined;
  const c = BY_FILE.get(stripExt(src));
  if (!c) return undefined;
  const creditText = c.artist ? `${c.artist} (${c.license ?? "Wikimedia Commons"})` : undefined;
  if (!creditText && !c.licenseUrl && !c.source) return undefined;
  return { creditText, license: c.licenseUrl, acquireLicensePage: c.source };
}
