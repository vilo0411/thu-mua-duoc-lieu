/**
 * Tải ảnh minh hoạ cho bài trong content/wiki từ Wikimedia Commons, chuyển WebP và
 * ghi lại thông tin bản quyền vào src/data/wiki-image-credits.json (để trong src vì code
 * import trực tiếp — Vite không cho import asset nằm trong public/).
 *
 * - Chỉ xử lý bài có `image` trỏ tới /images/kien-thuc/*.webp nhưng file chưa tồn tại.
 * - Từ khoá tìm ảnh lấy từ QUERIES bên dưới (tiếng Anh — Commons index chủ yếu tiếng Anh);
 *   thử lần lượt cho tới khi có ảnh giấy phép tự do (CC0/PD/CC BY/CC BY-SA).
 * - Ảnh tải về dạng thumb 1400px rồi nén WebP q78, cùng thông số với optimize-images.ts.
 *
 * Chạy: npx tsx scripts/fetch-wiki-images.ts [--force] [slug ...]
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const WIKI_DIR = path.join(ROOT, 'content', 'wiki');
const OUT_DIR = path.join(ROOT, 'public', 'images', 'kien-thuc');
const CREDITS = path.join(ROOT, 'src', 'data', 'wiki-image-credits.json');
const MAX_WIDTH = 1400;
const WEBP_QUALITY = 78;
const UA = 'duoclieu.nguyenvietloc.com image fetcher (contact: nvloc0411@gmail.com)';

/** Giấy phép chấp nhận được (khớp theo tiền tố, chữ thường). */
const OK_LICENSE = ['cc0', 'public domain', 'pd', 'cc by', 'cc-by', 'attribution'];

/**
 * Loại tranh vẽ, bản khắc, scan sách cổ… — Commons xếp chung với ảnh chụp nhưng dùng làm
 * ảnh minh hoạ kỹ thuật thì sai ngữ cảnh (bà con cần thấy hiện trạng thật).
 */
const REJECT_TITLE =
  /illustration|painting|drawing|engraving|lithograph|woodcut|wellcome|manuscript|book|plate |page |herbarium|logo|map|diagram|chart|poster|stamp|coin|panorama|1[5-9]\d\d/i;

/** Từ khoá tìm ảnh theo slug bài — xếp theo độ ưu tiên, thử lần lượt. */
const QUERIES: Record<string, string[]> = {
  'cay-duoc-lieu-la-gi': ['medicinal plants garden', 'medicinal herbs collection'],
  'phan-loai-giong-cay-duoc-lieu': ['medicinal roots herbs market', 'dried medicinal roots'],
  'ky-thuat-trong-cay-duoc-lieu': ['herb farm field rows', 'lavender farm field', 'medicinal plant plantation'],
  'dat-trong-cay-duoc-lieu': ['hand holding garden soil', 'loam soil texture close up', 'tilled field soil'],
  'phan-bon-cho-cay-duoc-lieu': ['organic fertilizer compost manure', 'fertilizer granules field'],
  'nuoi-cay-mo-te-bao': ['plant tissue culture laboratory', 'in vitro plantlets flask'],
  'sau-benh-hai-cay-duoc-lieu': ['crop pest damage leaf', 'insect pest on plant leaf'],
  'benh-heo-xanh-heo-vang': ['bacterial wilt plant', 'fusarium wilt plant'],
  'benh-kham-la': ['mosaic virus leaf', 'plant virus mosaic symptom'],
  'benh-moc-xam-muoi-den': ['Botrytis cinerea infected fruit', 'grey mould strawberry rot', 'sooty mould citrus leaf'],
  'tuyen-trung-re': ['root knot nematode galls', 'nematode damaged roots'],
  'ky-thuat-so-che-duoc-lieu': ['sliced dried herbs', 'drying herbs rack sun', 'washing vegetables water'],
  'sao-vang-ha-tho': ['roasting seeds in pan', 'wok stove cooking', 'roasted dried ginger slices'],
  'ngam-so-che-duoc-lieu': ['macerated herbs jar', 'herbal liqueur bottles', 'herbal infusion glass jar'],
  'ky-thuat-u-len-men': ['fermented tea leaves', 'fermenting vegetables jar'],
  'bao-quan-duoc-lieu': ['dried herbs hanging bunches', 'herbal pharmacy drawers', 'dried herbs sacks market'],
  'tieu-chuan-vietgap': ['farmer inspecting vegetable field', 'greenhouse vegetable farming'],
  'tieu-chuan-huu-co-quoc-te': ['organic certification farm', 'organic farming field'],
  'cac-loai-dat-trong-cay': ['topsoil close up ploughed field', 'farmer hands soil clod field', 'loam soil texture farmland'],
  'dat-cat-trong-cay-gi': ['sandy soil field agriculture', 'sandy loam soil close up', 'sand dune farming'],
  'dat-man-trong-cay-gi': ['salt crust soil surface', 'salinized farmland white salt', 'salt tolerant crop coastal field'],
  'dat-phen-trong-cay-gi': ['acid sulfate soil', 'acid sulphate soil field', 'iron oxide acidic soil water'],
  'dat-phu-sa-trong-cay-gi': ['riverbank vegetable field silt', 'floodplain farmland crops river', 'rice paddy Mekong delta'],
};

/**
 * Ảnh đã chọn tay (tên file trên Commons) cho những bài mà kết quả tìm tự động lệch ngữ cảnh.
 * Ưu tiên hơn QUERIES; chạy với `--candidates <slug>` để xem danh sách ứng viên rồi điền vào đây.
 */
const PICKS: Record<string, string> = {
  'cay-duoc-lieu-la-gi':
    'File:Ecological Trail Garden of Medicinal and Aromatic Plants and South China Medicinal Plants Garden 18-02-2024(57).jpg',
  'benh-moc-xam-muoi-den': 'File:Aardbei Lambada vruchtrot Botrytis cinerea.jpg',
  'dat-trong-cay-duoc-lieu': 'File:Child hand are holding black garden soil in closeup.jpg',
  'sao-vang-ha-tho': 'File:2010-365-328 Roasting Seeds (5206140472).jpg',
  'ngam-so-che-duoc-lieu': 'File:Українські наливки та настоянки.jpg',
  'bao-quan-duoc-lieu': 'File:Gyogynovenyek1.jpg',
  'tieu-chuan-vietgap': 'File:En terreno.jpg',
  'tieu-chuan-huu-co-quoc-te': 'File:Alamar Organic Farm crops.jpg',
  'cac-loai-dat-trong-cay': 'File:Soil material containing Sand, silt, clay.jpg',
  'dat-cat-trong-cay-gi': 'File:Sandy soil on track and field - geograph.org.uk - 4440394.jpg',
  'dat-man-trong-cay-gi': 'File:Saline soil area.jpg',
  'dat-phen-trong-cay-gi':
    'File:CSIRO ScienceImage 4631 Sulfuric Extratidal Hydrosol soil profile at East Trinity near Cairns north Queensland.jpg',
  'dat-phu-sa-trong-cay-gi': 'File:Alluvium @Mekong-VNM.jpg',
};

type Credit = {
  file: string;
  source: string;
  artist: string;
  license: string;
  licenseUrl: string;
  query: string;
  matchedTitle?: string;
};

type CommonsPage = {
  title: string;
  imageinfo?: {
    thumburl?: string;
    url: string;
    descriptionurl: string;
    extmetadata?: Record<string, { value: string }>;
  }[];
};

const stripHtml = (s: string) => s.replace(/<[^>]*>/g, '').trim();

async function searchCommons(query: string): Promise<CommonsPage[]> {
  const url =
    'https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search' +
    `&gsrnamespace=6&gsrsearch=${encodeURIComponent(query)}&gsrlimit=12` +
    `&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=${MAX_WIDTH}`;
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`Commons search ${res.status} cho "${query}"`);
  const data = (await res.json()) as { query?: { pages?: Record<string, CommonsPage> } };
  return Object.values(data.query?.pages ?? {});
}

type Candidate = { page: CommonsPage; license: string; licenseUrl: string; artist: string };

/** Ảnh dùng được: định dạng bitmap, giấy phép tự do, có thumb, không phải tranh vẽ/scan sách. */
function usable(pages: CommonsPage[]): Candidate[] {
  const out: Candidate[] = [];
  for (const page of pages) {
    if (!/\.(jpe?g|png)$/i.test(page.title)) continue;
    if (REJECT_TITLE.test(page.title)) continue;
    const info = page.imageinfo?.[0];
    if (!info?.thumburl) continue;
    const meta = info.extmetadata ?? {};
    const license = stripHtml(meta.LicenseShortName?.value ?? meta.License?.value ?? '');
    if (!license) continue;
    const low = license.toLowerCase();
    if (low.includes('nc') || low.includes('nd') || low.includes('fair use')) continue;
    if (!OK_LICENSE.some((ok) => low.startsWith(ok))) continue;
    out.push({
      page,
      license,
      licenseUrl: stripHtml(meta.LicenseUrl?.value ?? ''),
      artist: stripHtml(meta.Artist?.value ?? 'Wikimedia Commons'),
    });
  }
  return out;
}

const pick = (pages: CommonsPage[]): Candidate | null => usable(pages)[0] ?? null;

/** Tải ảnh về, nén WebP theo cùng thông số với optimize-images.ts. */
async function toWebp(url: string): Promise<Buffer> {
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`tải ảnh ${res.status}`);
  const raw = Buffer.from(await res.arrayBuffer());
  const meta = await sharp(raw).metadata();
  const resize = meta.width && meta.width > MAX_WIDTH ? { width: MAX_WIDTH } : undefined;
  return sharp(raw).resize(resize).webp({ quality: WEBP_QUALITY }).toBuffer();
}

/**
 * Chế độ soi ứng viên: tải các ảnh khả dụng của một slug ra thư mục tạm để xem bằng mắt,
 * rồi chốt lựa chọn bằng cách điền tên file Commons vào PICKS.
 */
async function listCandidates(slugs: string[], dir: string) {
  fs.mkdirSync(dir, { recursive: true });
  for (const slug of slugs) {
    const seen = new Set<string>();
    let n = 0;
    for (const query of QUERIES[slug] ?? []) {
      for (const cand of usable(await searchCommons(query))) {
        if (seen.has(cand.page.title) || n >= 8) continue;
        seen.add(cand.page.title);
        const out = path.join(dir, `${slug}__${++n}.webp`);
        fs.writeFileSync(out, await toWebp(cand.page.imageinfo![0].thumburl!));
        console.log(`${slug} #${n} [${cand.license}] ${cand.page.title}`);
      }
    }
  }
}

async function main() {
  const args = process.argv.slice(2);
  const force = args.includes('--force');
  const candidatesDir = args.find((a) => a.startsWith('--candidates='))?.split('=')[1];
  const only = new Set(args.filter((a) => !a.startsWith('--')));

  if (candidatesDir) {
    await listCandidates([...only], candidatesDir);
    return;
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const credits: Record<string, Credit> = fs.existsSync(CREDITS)
    ? JSON.parse(fs.readFileSync(CREDITS, 'utf8'))
    : {};

  const targets: { slug: string; dest: string }[] = [];
  for (const file of fs.readdirSync(WIKI_DIR).filter((f) => f.endsWith('.json'))) {
    const article = JSON.parse(fs.readFileSync(path.join(WIKI_DIR, file), 'utf8')) as { id: string; image?: string };
    const img = article.image ?? '';
    if (!img.startsWith('/images/kien-thuc/')) continue; // ảnh ngoài (unsplash) không đụng tới
    if (only.size && !only.has(article.id)) continue;
    const dest = path.join(ROOT, 'public', img.replace(/^\//, ''));
    if (fs.existsSync(dest) && !force) continue;
    targets.push({ slug: article.id, dest });
  }

  if (targets.length === 0) {
    console.log('Không có bài nào thiếu ảnh.');
    return;
  }

  let ok = 0;
  const failed: string[] = [];

  for (const { slug, dest } of targets) {
    // Ảnh chốt tay tìm bằng chính tên file trên Commons; còn lại dò theo từ khoá.
    const queries = PICKS[slug] ? [PICKS[slug]] : QUERIES[slug];
    if (!queries) {
      failed.push(`${slug}: chưa khai báo từ khoá trong QUERIES`);
      continue;
    }

    let done = false;
    for (const query of queries) {
      try {
        const pages = await searchCommons(query);
        const chosen = PICKS[slug]
          ? (usable(pages).find((c) => c.page.title === PICKS[slug]) ?? null)
          : pick(pages);
        if (!chosen) continue;

        const info = chosen.page.imageinfo![0];
        const buf = await toWebp(info.thumburl!);
        fs.writeFileSync(dest, buf);

        credits[slug] = {
          file: '/images/kien-thuc/' + path.basename(dest),
          source: info.descriptionurl,
          artist: chosen.artist,
          license: chosen.license,
          licenseUrl: chosen.licenseUrl,
          query,
          matchedTitle: chosen.page.title,
        };
        console.log(`  ✓ ${slug} ← ${chosen.page.title} [${chosen.license}] ${(buf.length / 1024).toFixed(0)}KB`);
        ok++;
        done = true;
        break;
      } catch (e) {
        console.warn(`  ! ${slug} (${query}): ${(e as Error).message}`);
      }
    }
    if (!done) failed.push(`${slug}: không tìm được ảnh giấy phép tự do`);
  }

  fs.writeFileSync(CREDITS, JSON.stringify(credits, null, 2) + '\n');
  console.log(`\n✓ Tải ${ok}/${targets.length} ảnh → public/images/kien-thuc/`);
  if (failed.length) {
    console.log('Chưa xử lý được:');
    for (const f of failed) console.log('  - ' + f);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
