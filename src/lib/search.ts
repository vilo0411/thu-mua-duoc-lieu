/** Tiện ích tìm kiếm tiếng Việt dùng chung (danh mục cây, hub kỹ thuật…). */

/** Bỏ dấu tiếng Việt + hạ chữ thường để tìm kể cả khi gõ không dấu. */
export const norm = (s: string) =>
  s.toLowerCase().replace(/đ/g, "d").normalize("NFD").replace(/[̀-ͯ]/g, "").trim();

/** Tách chuỗi thành các "từ" đã bỏ dấu (ngăn bởi khoảng trắng hoặc gạch nối). */
export const words = (s: string) => norm(s).split(/[\s-]+/).filter(Boolean);

/**
 * Khớp từ khoá kiểu tiếng Việt trên một tập trường văn bản. 1 từ → so khớp theo
 * ĐẦU TỪ (để "hà" ra "hà thủ ô" chứ không lọt "chẩu"→"chau"); nhiều từ → so khớp
 * cả cụm. `nq` là từ khoá đã chuẩn hoá bằng `norm`.
 */
export const matchesFields = (fields: string[], nq: string): boolean => {
  if (!nq) return true;
  if (nq.includes(" ")) return fields.some((f) => norm(f).replace(/-/g, " ").includes(nq));
  return fields.some((f) => words(f).some((w) => w.startsWith(nq)));
};
