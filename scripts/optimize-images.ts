/**
 * Nén & chuyển ảnh nguồn trong public/images sang WebP, rồi cập nhật MỌI tham chiếu
 * (content/*.json, src/**) theo mapping đường dẫn thực tế.
 *
 * - Ảnh on-site (<img>) → WebP (resize maxWidth, quality) — mọi trình duyệt hiện đại đều hỗ trợ.
 * - og-default.jpg → GIỮ .jpg (ảnh OG mạng xã hội: Zalo/Facebook render WebP không ổn định),
 *   chỉ resize + nén lại.
 * - URL ngoài (http/unsplash) không đụng tới vì chỉ thay các path "/images/..." cục bộ.
 *
 * Chạy: npx tsx scripts/optimize-images.ts   (an toàn khi chạy lại: bỏ qua .webp đã có)
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const PUBLIC_IMAGES = path.join(ROOT, 'public', 'images');
const MAX_WIDTH = 1400; // đủ cho hero/card trên mọi màn hình; ảnh nhỏ hơn giữ nguyên khổ
const WEBP_QUALITY = 78;
const JPEG_QUALITY = 80;

/** Ảnh giữ nguyên định dạng JPG (OG social). Đường dẫn tương đối tính từ PUBLIC_IMAGES. */
const KEEP_JPEG = new Set(['og-default.jpg']);

type Mapping = { oldRel: string; newRel: string };

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

async function main() {
  const files = walk(PUBLIC_IMAGES);
  const mappings: Mapping[] = [];
  let beforeBytes = 0;
  let afterBytes = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

    const relFromImages = path.relative(PUBLIC_IMAGES, file); // vd cay/son-tra.jpg
    const before = fs.statSync(file).size;
    beforeBytes += before;

    const meta = await sharp(file).metadata();
    const resize = meta.width && meta.width > MAX_WIDTH ? { width: MAX_WIDTH } : undefined;

    if (KEEP_JPEG.has(relFromImages)) {
      // Nén lại tại chỗ dưới dạng JPEG.
      const buf = await sharp(file).resize(resize).jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer();
      fs.writeFileSync(file, buf);
      afterBytes += buf.length;
      console.log(`  jpeg  ${relFromImages}: ${(before / 1024).toFixed(0)}KB → ${(buf.length / 1024).toFixed(0)}KB`);
      continue;
    }

    // Convert sang WebP, xoá bản gốc.
    const webpAbs = file.replace(/\.(jpe?g|png)$/i, '.webp');
    const buf = await sharp(file).resize(resize).webp({ quality: WEBP_QUALITY }).toBuffer();
    fs.writeFileSync(webpAbs, buf);
    if (webpAbs !== file) fs.unlinkSync(file);
    afterBytes += buf.length;

    const oldRel = '/images/' + relFromImages.split(path.sep).join('/');
    const newRel = oldRel.replace(/\.(jpe?g|png)$/i, '.webp');
    mappings.push({ oldRel, newRel });
    console.log(`  webp  ${relFromImages} → .webp: ${(before / 1024).toFixed(0)}KB → ${(buf.length / 1024).toFixed(0)}KB`);
  }

  // Cập nhật tham chiếu trong content/ và src/.
  const refDirs = [path.join(ROOT, 'content'), path.join(ROOT, 'src')];
  const refFiles = refDirs.flatMap((d) => (fs.existsSync(d) ? walk(d) : []))
    .filter((f) => /\.(json|tsx?|css|md)$/i.test(f));

  let changedFiles = 0;
  for (const f of refFiles) {
    let text = fs.readFileSync(f, 'utf8');
    let changed = false;
    for (const { oldRel, newRel } of mappings) {
      if (text.includes(oldRel)) {
        text = text.split(oldRel).join(newRel);
        changed = true;
      }
    }
    if (changed) {
      fs.writeFileSync(f, text);
      changedFiles++;
    }
  }

  console.log('\n─── Tổng kết ───');
  console.log(`Ảnh xử lý: ${mappings.length} → WebP, ${KEEP_JPEG.size} giữ JPEG`);
  console.log(`Dung lượng: ${(beforeBytes / 1024 / 1024).toFixed(1)}MB → ${(afterBytes / 1024 / 1024).toFixed(1)}MB`);
  console.log(`Tham chiếu cập nhật trong ${changedFiles} file.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
