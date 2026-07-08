# Nguyễn Viết Lộc — Blog SEO thu mua dược liệu

Blog Programmatic SEO (pSEO) chia sẻ kiến thức trồng, sơ chế và thu mua dược liệu
Việt Nam. Xây dựng bằng **Vite + React 19 + React Router + Tailwind CSS 4**, deploy
tĩnh lên GitHub Pages.

> Cấu trúc dữ liệu và SEO được tổ chức theo PRD (xem phần Kiến trúc bên dưới).

## Chạy cục bộ

**Yêu cầu:** Node.js 20+

```bash
npm install
npm run dev          # http://localhost:3000
```

## Scripts

| Lệnh | Mô tả |
|---|---|
| `npm run dev` | Dev server (Vite) |
| `npm run validate:content` | Xác thực dữ liệu `content/` bằng Zod |
| `npm run build` | `prebuild` (validate) → build → `postbuild` (sinh sitemap) |
| `npm run preview` | Xem thử bản build |
| `npm run lint` | Kiểm tra kiểu TypeScript (`tsc --noEmit`) |

## Kiến trúc

### Dữ liệu (content model — PRD §6, §7.3)

Mỗi entity là một file JSON riêng dưới `content/`, không gộp chung:

```
content/
├── cay/            # 1 JSON / cây dược liệu
├── vung/           # 1 JSON / vùng miền
├── wiki/           # 1 JSON / bài wiki
├── wiki-hub/       # 1 JSON / hub kỹ thuật theo cây
├── partners.json   # đơn vị thu mua (đối tác)
└── site.json       # cấu hình site (owner, URL canonical, meta mặc định)
```

- **Xác thực:** Zod schema (`src/lib/data/schema.ts`) chạy ở bước `prebuild` qua
  `scripts/validate-content.ts` → CI fail sớm nếu dữ liệu sai hình dạng. Zod **không**
  bị đóng gói vào bundle client.
- **Truy cập dữ liệu:** UI chỉ import từ `src/lib/data` (glob-import JSON + ép kiểu
  theo `src/types.ts`). Không import trực tiếp file JSON trong trang.

### SEO (`src/lib/seo` — PRD §8)

- `<Seo>` bơm `<title>`, `meta description`, canonical, Open Graph, Twitter Card và
  JSON-LD, tận dụng cơ chế hoist document metadata của **React 19**.
- `jsonLd.ts` sinh schema.org: `Article`, `Product`, `FAQPage`, `HowTo`,
  `BreadcrumbList`, `Organization`, `WebSite`, `Person` theo ma trận PRD §8.2.
- `meta.ts` gom sẵn props theo từng loại trang → mỗi page chỉ cần một dòng `<Seo>`.
- **Sitemap:** `scripts/generate-sitemap.ts` (bước `postbuild`) sinh
  `sitemap-index.xml` + `sitemap-money.xml` + `sitemap-wiki.xml` +
  `sitemap-static.xml` vào `dist/`. Combo cây × vùng chỉ sinh cho tổ hợp CÓ THỰC.
- **robots.txt:** `public/robots.txt`.

Origin canonical lấy từ `content/site.json` → `siteUrl`, có thể ghi đè bằng biến môi
trường `SITE_URL` khi build cho từng môi trường deploy.

### Cấu trúc mã nguồn

```
src/
├── app/                       # (routing trong App.tsx)
├── components/
│   ├── layout/                # Header, Footer, Layout, nav...
│   └── ui/                    # DataTable, PartnerCard, FaqAccordion...
├── lib/
│   ├── data/                  # loaders + Zod schema (data layer)
│   ├── seo/                   # <Seo>, JSON-LD, meta builders
│   ├── paths.ts               # tập trung dựng URL
│   └── ShipmentModalContext.tsx
├── pages/                     # 1 component / loại trang
└── types.ts                   # kiểu dữ liệu dùng chung
```

## Triển khai

Push lên nhánh `main` sẽ kích hoạt workflow `.github/workflows/deploy.yml` build và
deploy lên GitHub Pages. `vite.config.ts` đặt `base` phù hợp cho GitHub Pages khi
build.
