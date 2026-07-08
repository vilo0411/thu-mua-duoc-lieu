# PRD: Nguyễn Viết Lộc — SEO Blog thu mua dược liệu

**Version:** 1.0
**Owner:** Nguyễn Viết Lộc
**Type:** Programmatic SEO (pSEO) blog, PBN-style
**Purpose handoff:** Coding agent (Claude Code) implement từ đầu

---

## 1. Overview

### 1.1. Product summary
Website blog SEO đặt trên subdomain của `nguyenvietloc.com`, chuyên chia sẻ kiến thức về trồng, thu mua, sơ chế dược liệu Việt Nam. Angle: **blogger cá nhân độc lập** (không phải trang thương mại của công ty).

### 1.2. Business goal
- **Primary:** Kéo organic traffic từ Google → chuyển sang landing page thu mua của VIETMEC (link outbound external)
- **Secondary:** Xây topical authority về ngành dược liệu để duy trì traffic dài hạn

### 1.3. Success metrics (3 tháng đầu)
- **Index rate:** ≥ 80% số page được Google index
- **Organic traffic:** 1,000–5,000 sessions/tháng (tháng 3)
- **CTR về landing VIETMEC:** ≥ 5% (từ page money)
- **Total pages:** ~500 page (Money + Wiki)

### 1.4. Non-goals (KHÔNG làm)
- Không xây thương mại điện tử / giỏ hàng
- Không xây form thu mua trực tiếp trên site (form ở landing VIETMEC)
- Không xây user login / community
- Không xây payment
- Không đi vào chủ đề y tế/chữa bệnh (thoát YMYL)

---

## 2. Context & Constraints

### 2.1. Nguồn lực
| Item | Chi tiết |
|---|---|
| Timeline | 3 tháng đầu để MVP + đo lường |
| Content team | 15–30 bài/tháng |
| Budget backlink/tool | 0 (chỉ content) |
| Content approach | AI-assisted + human review, không AI-only |

### 2.2. Ràng buộc kỹ thuật
- **Subdomain mới** (chưa có authority) → cần technical SEO chuẩn để tối đa cơ hội rank
- **PBN persona** → không được lộ danh tính VIETMEC trong content, không dùng "chúng tôi" ám chỉ VIETMEC
- **pSEO** → data-driven generation, mỗi page phải có data unique tránh duplicate

### 2.3. Rủi ro đã xác định
1. **Subdomain mới + no backlink**: khó rank keyword cạnh tranh → tập trung long-tail
2. **AI generation**: rủi ro Helpful Content Update → bắt buộc human review money page
3. **Cây × Vùng combinations**: rủi ro thin content → chỉ tạo combo có thực tế

---

## 3. Target Audience

### 3.1. Personas

**Persona 1: Hộ trồng dược liệu nhỏ lẻ**
- 40–60 tuổi, mobile-first (chủ yếu dùng điện thoại)
- Ít tech-savvy, đọc chậm, cần layout đơn giản
- Search intent: "kỹ thuật trồng X", "bán X ở đâu", "giá X"
- Pain: không biết bán ở đâu được giá tốt, kỹ thuật lệ thuộc kinh nghiệm

**Persona 2: HTX / vùng trồng chuyên nghiệp**
- Cán bộ HTX, chủ vùng trồng
- Cần data cụ thể (giá, tiêu chuẩn, quy trình)
- Search intent: "tiêu chuẩn GACP", "chuẩn hóa dược liệu", "thu mua số lượng lớn"

**Persona 3: Đầu mối thu gom trung gian**
- Deal-focused, thực dụng
- Search intent: "công ty thu mua", "giá thị trường", so sánh đầu mối

### 3.2. Design implication
- Font size lớn (16–18px body), line-height 1.7
- Hỗ trợ full dấu tiếng Việt
- Mobile-first responsive
- CTA rõ ràng, không popup xâm lấn

---

## 4. Information Architecture

### 4.1. Sitemap 2 silo

```
├── / (homepage)
│
├── /thu-mua-duoc-lieu/                      ← Silo 1: MONEY (pillar)
│   ├── /thu-mua-duoc-lieu/{cay}             ← Money theo cây
│   └── /thu-mua-duoc-lieu/{cay}/{vung}      ← Money theo cây × vùng
│
├── /kien-thuc/                              ← Silo 2: WIKI (blog index)
│   ├── /kien-thuc/ky-thuat-trong-{cay}      ← Hub theo cây
│   ├── /kien-thuc/benh-{ten-benh}           ← Wiki sâu bệnh
│   ├── /kien-thuc/cach-{topic}              ← Wiki kỹ thuật
│   ├── /kien-thuc/{topic}-la-gi             ← Wiki concept
│   ├── /kien-thuc/quy-trinh-{topic}         ← Wiki sơ chế
│   └── /kien-thuc/tieu-chuan-{name}         ← Wiki tiêu chuẩn
│
├── /ve-toi                                  ← About page (Nguyễn Viết Lộc)
└── /lien-he                                 ← Contact
```

### 4.2. Số lượng page dự kiến

| Loại page | Số lượng | Priority |
|---|---|---|
| Homepage | 1 | P0 |
| Pillar `/thu-mua-duoc-lieu/` | 1 | P0 |
| Money cây `/thu-mua-duoc-lieu/{cay}` | 50–100 | P0 |
| Money vùng `/thu-mua-duoc-lieu/{cay}/{vung}` | 100–300 | P1 |
| Hub wiki `/kien-thuc/ky-thuat-trong-{cay}` | 30–50 | P0 |
| Wiki chung | 50–100 | P1 |
| About + Contact | 2 | P0 |

### 4.3. URL rules
- Slug tiếng Việt không dấu, dùng `-` phân cách
- Chữ thường 100%
- Không có trailing slash (trừ pillar tổng)
- Không có `.html`
- Canonical URL luôn được set
- 301 redirect nếu URL thay đổi

---

## 5. Page Types & Templates

### 5.1. Homepage `/`

**Purpose:** Cửa ngõ site, giới thiệu chuyên môn, dẫn traffic vào 2 silo.

**Blocks (thứ tự trên xuống):**
1. **Hero:** headline + subhead + primary CTA + hình ảnh nông trại
2. **Value props 3 columns:** icons + text ("Giá cập nhật" / "Đầu mối uy tín" / "Kỹ thuật chuyên sâu")
3. **Featured cây dược liệu grid** (6–8 cards): image + name + price range + short desc + link đến money page
4. **Featured knowledge posts** (4 large cards): thumbnail + category tag + title + excerpt
5. **Trust section:** "5 tiêu chí chọn nơi thu mua uy tín" (icons + text)
6. **Full-width CTA banner:** "Có dược liệu cần bán?" → link landing VIETMEC
7. **Latest posts** (list 8–10 bài mới nhất)

### 5.2. Pillar Money `/thu-mua-duoc-lieu/`

**Purpose:** Pillar tổng, nhận link từ tất cả money con, target keyword tổng.

**Word count:** 1,500–2,500 từ.

**Blocks:**
1. Hero + breadcrumb
2. Tổng quan thị trường dược liệu VN
3. Danh mục cây thu mua (bảng lớn nhóm theo Củ/rễ, Hoa/lá, Nấm, Vỏ — link ra tất cả money con)
4. Bảng giá tham khảo tổng
5. 5 tiêu chí chọn đầu mối uy tín
6. Đơn vị thu mua đáng tham khảo (VIETMEC card + neutral card)
7. Vùng trồng dược liệu chính (bảng 8 vùng + link)
8. Xu hướng thị trường
9. FAQ accordion
10. CTA banner footer

### 5.3. Money cây `/thu-mua-duoc-lieu/{cay}`

**Purpose:** Chuyển đổi người bán → CTA về landing.

**Word count:** 800–1,200 từ.

**Blocks:**
1. Hero (H1 + sub + CTA anchor jump)
2. Bảng thông tin nhanh (data)
3. Bảng giá thu mua (data — ăn keyword "giá X")
4. Card đơn vị thu mua uy tín (VIETMEC highlight + card neutral)
5. Tiêu chí đạt chuẩn thu mua (bullet)
6. Bảng vùng trồng + link ra page vùng (internal link)
7. Kỹ thuật trồng cốt lõi (bullet + link hub wiki)
8. FAQ compact
9. CTA footer

### 5.4. Money vùng `/thu-mua-duoc-lieu/{cay}/{vung}`

**Purpose:** Ăn keyword tỉnh/vùng, mở rộng scale.

**Word count:** 600–900 từ.

**Ràng buộc:** Chỉ tạo cho combo cây × vùng CÓ THỰC TẾ (đinh lăng không trồng Tây Nguyên → không tạo).

**Blocks:**
1. Hero + breadcrumb đầy đủ
2. Bảng thông tin vùng
3. Các tỉnh trong vùng (H3 mỗi tỉnh, 80–120 từ/tỉnh — ăn keyword tỉnh)
4. Đặc điểm cây trồng ở vùng
5. Quy trình gửi hàng từ vùng
6. Card VIETMEC compact
7. Link về money cây tổng + hub wiki
8. FAQ ngắn + CTA

### 5.5. Hub Wiki `/kien-thuc/ky-thuat-trong-{cay}`

**Purpose:** Pillar Silo 2, nhận link từ wiki chung, đẩy traffic sang money.

**Word count:** 2,500–3,500 từ.

**Blocks:**
1. Hero + breadcrumb
2. Sticky TOC (desktop)
3. Giới thiệu cây (300–400 từ)
4. Bảng thông tin nhanh (data)
5. Điều kiện trồng
6. Chọn giống & nhân giống + link wiki
7. Kỹ thuật trồng
8. Chăm sóc (bón phân, tưới, làm cỏ) + link wiki
9. Sâu bệnh (bảng bệnh + link wiki bệnh)
10. Thu hoạch
11. Sơ chế & bảo quản + link wiki
12. Thị trường thu mua + link money + mention VIETMEC
13. FAQ
14. Related content

### 5.6. Wiki chung `/kien-thuc/{topic}`

**Purpose:** Traffic magnet, hút keyword high-volume.

**Word count:** 1,200–2,000 từ.

**5 sub-templates** (chung khung 7 block, khác Block 3):

| Loại | URL pattern | Block 3 structure |
|---|---|---|
| Bệnh | `/kien-thuc/benh-{ten}` | Nguyên nhân → Dấu hiệu → Cách phòng → Cách trị |
| Cách làm | `/kien-thuc/cach-{topic}` | Chuẩn bị → Các bước → Lưu ý |
| Concept | `/kien-thuc/{topic}-la-gi` | Phân loại → Đặc điểm → Cách chọn |
| Quy trình | `/kien-thuc/quy-trinh-{topic}` | Nguyên lý → Chi tiết → So sánh |
| Tiêu chuẩn | `/kien-thuc/tieu-chuan-{name}` | Yêu cầu → Quy trình đạt → Lợi ích |

**Blocks chung:**
1. Hero + breadcrumb + category tag
2. Định nghĩa/tổng quan (ăn keyword)
3. Chi tiết (khác theo loại)
4. Áp dụng vào cây dược liệu (bảng cây + link hub) ⭐
5. Lưu ý & sai lầm
6. FAQ
7. Kết + related articles

**Đặc biệt:** Wiki tiêu chuẩn được mention VIETMEC natural ở Block 4 (case study).

---

## 6. Content Model (Data Schema)

Đây là phần trung tâm cho pSEO — mọi page render từ data + template.

### 6.1. Entity: Cây dược liệu

```typescript
type CayDuocLieu = {
  slug: string;              // "dinh-lang"
  ten: string;               // "Đinh lăng"
  ten_khoa_hoc: string;      // "Polyscias fruticosa"
  ten_khac: string[];        // ["Cây gỏi cá", "Nam dương sâm"]
  nhom: "cu-re" | "hoa-la" | "nam" | "vo" | "than";
  mo_ta_ngan: string;        // 100-150 từ
  dac_diem_sinh_hoc: string; // 200-300 từ
  gia_tri_su_dung: string;   // 150-200 từ (không đi sâu chữa bệnh)
  
  // Dạng thu mua
  cac_dang: {
    ten: string;             // "Củ tươi 1 năm"
    gia_min: number;         // VNĐ/kg
    gia_max: number;
    yeu_cau: string;         // "Độ ẩm >70%"
  }[];
  
  // Vùng trồng
  vung_trong: {
    vung_slug: string;       // "mien-bac"
    ty_le_pho_bien: "chinh" | "phu" | "it";
    tinh_chinh: string[];    // ["Nam Định", "Thái Bình"]
  }[];
  
  // Kỹ thuật trồng
  ky_thuat: {
    thoi_vu: string;
    dat_phu_hop: string;
    ph_dat: string;
    mat_do_trong: string;    // "10,000 cây/ha"
    thoi_gian_thu_hoach: string;  // "3-5 năm"
    nang_suat: string;
    cach_nhan_giong: ("giam-canh" | "uom-hat" | "chiet")[];
  };
  
  // Sâu bệnh
  sau_benh_thuong_gap: {
    benh_slug: string;
    muc_do: "rat-pho-bien" | "co-gap" | "hiem";
    dau_hieu: string;
  }[];
  
  // SEO
  hinh_anh: {
    hero: string;            // URL
    alt: string;
    gallery: string[];
  };
  keywords_target: string[];
  updated_at: Date;
};
```

### 6.2. Entity: Vùng miền

```typescript
type Vung = {
  slug: string;              // "mien-bac"
  ten: string;               // "Miền Bắc"
  mo_ta: string;
  dac_diem_khi_hau: string;
  dac_diem_tho_nhuong: string;
  tinh: {
    ten: string;             // "Nam Định"
    slug: string;
    mo_ta_ngan: string;
  }[];
  cay_dac_trung: string[];   // slug các cây trồng chính
};
```

**8 vùng miền cố định:**
`dong-bac`, `tay-bac`, `dong-bang-song-hong`, `bac-trung-bo`, `duyen-hai-nam-trung-bo`, `tay-nguyen`, `dong-nam-bo`, `dong-bang-song-cuu-long`.

### 6.3. Entity: Wiki article

```typescript
type WikiArticle = {
  slug: string;
  loai: "benh" | "cach" | "concept" | "quy-trinh" | "tieu-chuan";
  tieu_de: string;
  meta_description: string;
  keyword_chinh: string;
  search_volume?: number;    // để prioritize
  
  content: {
    intro: string;
    dinh_nghia: string;
    chi_tiet: string;        // markdown, khác theo loại
    ap_dung_cay: {           // Block 4 quan trọng
      cay_slug: string;
      muc_do: "rat-pho-bien" | "co-gap" | "hiem";
      ghi_chu: string;
    }[];
    luu_y: string;
    faq: { q: string; a: string; }[];
  };
  
  related_articles: string[]; // slug
  updated_at: Date;
};
```

### 6.4. Entity: Partner (đơn vị thu mua)

```typescript
type Partner = {
  slug: string;              // "vietmec"
  ten: string;               // "VIETMEC — CTCP Dược liệu Việt Nam"
  is_featured: boolean;      // true cho VIETMEC
  trust_signals: string[];   // ["Mã DVM (HNX)", "Nhà máy GMP-WHO", ...]
  landing_url: string;       // external link
  utm_template: string;      // "?utm_source=nguyenvietloc&utm_medium=blog&utm_campaign={cay}"
};
```

**Ban đầu chỉ 1 partner (VIETMEC).** Design cho phép mở rộng partner khác sau này.

---

## 7. Technical Requirements

### 7.1. Recommended stack

**Option A — Static site (recommended):**
- **Framework:** Next.js 15 (App Router) hoặc Astro
- **Content:** Markdown files trong repo + JSON data cho pSEO
- **Deployment:** Vercel / Netlify / Cloudflare Pages
- **CMS (optional):** Sanity / Contentlayer / Keystatic

**Lý do chọn static:**
- Fast loading (quan trọng cho SEO)
- pSEO generation tại build time → tất cả page pre-rendered
- Chi phí gần như 0
- Không cần server backend

**Option B — WordPress:**
- Nếu team quen WordPress → dùng, có nhiều plugin SEO sẵn
- Nhược điểm: chậm, cần host, dễ bị hack

**Coding agent chọn Option A trừ khi user chỉ định khác.**

### 7.2. Build pipeline

```
Content sources (markdown + JSON data)
        ↓
Build-time: generate all pages from templates + data
        ↓
Static HTML/CSS/JS
        ↓
CDN deployment
```

### 7.3. Directory structure (Next.js example)

```
/
├── src/
│   ├── app/
│   │   ├── page.tsx                              # Homepage
│   │   ├── thu-mua-duoc-lieu/
│   │   │   ├── page.tsx                          # Pillar
│   │   │   └── [cay]/
│   │   │       ├── page.tsx                      # Money cây
│   │   │       └── [vung]/
│   │   │           └── page.tsx                  # Money vùng
│   │   ├── kien-thuc/
│   │   │   ├── page.tsx                          # Wiki index
│   │   │   └── [slug]/
│   │   │       └── page.tsx                      # Wiki article
│   │   ├── ve-toi/page.tsx
│   │   └── lien-he/page.tsx
│   │
│   ├── components/                               # Shared UI
│   ├── lib/
│   │   ├── data/                                 # Data loaders
│   │   ├── seo/                                  # SEO utilities
│   │   └── templates/                            # Content templates
│   │
│   └── styles/
│
├── content/
│   ├── cay/                                      # 1 JSON/cây
│   │   ├── dinh-lang.json
│   │   ├── ba-kich.json
│   │   └── ...
│   ├── vung/                                     # 1 JSON/vùng
│   ├── wiki/                                     # 1 MD/article
│   └── partners.json
│
├── public/
│   ├── images/
│   ├── sitemap.xml                               # Auto-generated
│   └── robots.txt
│
└── ...config files
```

### 7.4. Performance targets
- Lighthouse Performance ≥ 90 (mobile)
- LCP < 2.5s
- CLS < 0.1
- Image lazy load, WebP format
- No render-blocking JS

---

## 8. SEO Requirements

### 8.1. Metadata pattern

Mỗi page phải có:
- `<title>`: 50–60 ký tự, chứa keyword chính
- `<meta name="description">`: 150–160 ký tự
- `<link rel="canonical">`: URL chính thức
- Open Graph tags
- Twitter Card tags

**Ví dụ money cây:**
```html
<title>Thu mua đinh lăng 2026: Giá cả, tiêu chí & nơi bán uy tín</title>
<meta name="description" content="Tổng hợp giá thu mua đinh lăng, tiêu chí chọn đầu mối uy tín và kinh nghiệm bán được giá tốt cho hộ trồng, HTX.">
```

### 8.2. Schema markup (JSON-LD)

Bắt buộc trên các loại page:

| Page | Schema |
|---|---|
| Money cây/vùng | `Article` + `Product` + `FAQPage` + `BreadcrumbList` |
| Hub wiki | `Article` + `HowTo` + `FAQPage` + `BreadcrumbList` |
| Wiki chung | `Article` + `FAQPage` (thêm `HowTo` cho loại "cách") + `BreadcrumbList` |
| Pillar | `Article` + `FAQPage` + `BreadcrumbList` |
| Homepage | `Organization` (of blogger) + `WebSite` + `Person` (author) |
| About | `Person` (Nguyễn Viết Lộc) |

Author Schema (mọi article):
```json
{
  "@type": "Person",
  "name": "Nguyễn Viết Lộc",
  "url": "https://duoclieu.nguyenvietloc.com/ve-toi",
  "sameAs": ["..."]
}
```

### 8.3. Internal linking rules

**Rule 1 — Silo cohesion:**
Wiki chung → Hub theo cây (không link trực tiếp đến money từ wiki, trừ wiki tiêu chuẩn)

**Rule 2 — Wiki → Hub:**
Mọi wiki phải có Block 4 "Áp dụng cho cây nào" — link đến ít nhất 3 hub theo cây

**Rule 3 — Hub → Money:**
Hub theo cây phải link đến money page tương ứng ở section "Thị trường thu mua"

**Rule 4 — Money cây → Money vùng:**
Money cây phải link đến các money vùng liên quan (block "Vùng trồng")

**Rule 5 — Money vùng → Money cây:**
Money vùng phải link back đến money cây tổng

**Rule 6 — Anchor text đa dạng:**
Không dùng cùng 1 anchor text cho cùng 1 URL đích. Vary tự nhiên: "kỹ thuật trồng đinh lăng", "hướng dẫn trồng đinh lăng", "trồng đinh lăng A-Z".

**Rule 7 — External link về landing:**
- Chỉ money page + wiki tiêu chuẩn được link landing
- Anchor text vary: "Gửi thông tin lô hàng", "Tham khảo VIETMEC", "Form đăng ký"
- Kèm UTM: `?utm_source=nguyenvietloc&utm_medium=blog&utm_campaign={cay}&utm_content={page_type}`
- `rel="noopener"` (không nofollow — link tự nhiên)

### 8.4. Sitemap.xml

Auto-generate tại build time. Chia thành:
- `sitemap-index.xml`
- `sitemap-money.xml` (money pages)
- `sitemap-wiki.xml` (wiki + hub)
- `sitemap-static.xml` (homepage, about, contact)

### 8.5. Robots.txt
```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/

Sitemap: https://[subdomain].nguyenvietloc.com/sitemap-index.xml
```

### 8.6. hreflang
Chỉ tiếng Việt, không cần hreflang.

---

## 9. Design System

Design đã có từ Google Stitch. Coding agent implement theo design đó, với các tokens sau:

### 9.1. Color palette (earth-tone)

```css
--color-primary: [terracotta hoặc olive brown — theo Stitch output]
--color-secondary: [cream / beige]
--color-accent: [mustard / amber, dùng cho CTA]
--color-text: [charcoal dark, không phải #000]
--color-background: [cream light]
--color-border: [beige nhạt]

/* Trạng thái */
--color-success: [olive xanh nhạt]
--color-info: [amber]
```

**Không dùng xanh lá tươi** (tránh trùng với brand VIETMEC).

### 9.2. Typography

```css
--font-heading: 'Be Vietnam Pro' hoặc 'Manrope' (bold sans-serif)
--font-body: 'Inter' hoặc 'Be Vietnam Pro' (regular)

--fs-h1: 32-40px
--fs-h2: 24-28px
--fs-h3: 20-22px
--fs-body: 16-18px
--fs-small: 14px

--lh-body: 1.7
--lh-heading: 1.3
```

**Bắt buộc:** Support đầy đủ dấu tiếng Việt.

### 9.3. Spacing

```css
--space-xs: 4px
--space-sm: 8px
--space-md: 16px
--space-lg: 24px
--space-xl: 40px
--space-2xl: 64px
```

### 9.4. Border radius & shadow

```css
--radius-sm: 6px
--radius-md: 8-12px
--radius-lg: 16px

--shadow-sm: subtle (0 1px 2px rgba(0,0,0,0.05))
--shadow-md: (0 4px 12px rgba(0,0,0,0.08))
```

### 9.5. Breakpoints

```css
--bp-mobile: 640px
--bp-tablet: 768px
--bp-desktop: 1024px
--bp-wide: 1280px
```

**Mobile-first:** Design & code cho 375px trước, scale lên.

---

## 10. Key Components

### 10.1. Global components

| Component | Location | Notes |
|---|---|---|
| `<Header>` | Mọi page | Sticky, wordmark "Nguyễn Viết Lộc" bên trái, nav ngang |
| `<Footer>` | Mọi page | 4 cột, disclaimer, copyright |
| `<Breadcrumb>` | Mọi inner page | JSON-LD schema kèm |
| `<MobileStickyCta>` | Mọi money page | Fixed bottom, dismissible |
| `<StickyToc>` | Bài dài (Hub Wiki, Wiki dài) | Right column desktop, auto-highlight |
| `<AuthorBox>` | Cuối article | Ngắn, ảnh + bio + link về-tôi |

### 10.2. Content blocks

| Component | Dùng ở đâu |
|---|---|
| `<DataTable>` | Bảng giá, bảng info nhanh — cream header, striped rows |
| `<InfoBox>` | Callout box với icon, background beige |
| `<CtaBanner>` | Full-width, mustard, single strong button |
| `<PartnerCard variant="featured">` | Card VIETMEC — elevated, badge "Đề xuất", 4 bullet checkmark, primary CTA |
| `<PartnerCard variant="neutral">` | Card đối thủ generic — lower emphasis |
| `<CayCard>` | Homepage grid — 4:3 image, name, price badge overlay |
| `<ArticleCard>` | Wiki grid — image top, category tag, title, excerpt |
| `<RegionLinkCard>` | Money cây — horizontal row, region icon, name, arrow |
| `<FaqAccordion>` | Cuối mọi page có FAQ |
| `<SaubenhTable>` | Hub wiki — bảng bệnh + link ra wiki bệnh |
| `<RelatedArticles>` | Cuối wiki — 3-4 cards horizontal |

### 10.3. Component props example

```typescript
<PartnerCard
  variant="featured"
  name="VIETMEC — CTCP Dược liệu Việt Nam"
  badge="Đề xuất"
  trustSignals={[
    "Mã DVM (HNX)",
    "Nhà máy GMP-WHO Phú Ninh, Phú Thọ",
    "15+ năm hoạt động",
    "Thanh toán qua chuyển khoản, có hợp đồng"
  ]}
  ctaLabel="Gửi thông tin lô hàng"
  ctaUrl="https://vietmec.vn/thu-mua-duoc-lieu?utm_..."
  ctaLabelOptions={[
    "Gửi thông tin lô hàng",
    "Tham khảo VIETMEC",
    "Form đăng ký"
  ]}  // pick random hoặc theo prop
/>
```

---

## 11. pSEO Generation Workflow

### 11.1. Data → Page pipeline

```
JSON data (cây, vùng, wiki)
        ↓
Build-time getStaticPaths() sinh tất cả URL combinations
        ↓
Template render với data injection
        ↓
AI-enrichment cho các slot cần prose dài (nếu chưa có content)
        ↓
Human review (money page bắt buộc)
        ↓
Publish
```

### 11.2. Rules cho combo cây × vùng

**Chỉ tạo page combo nếu:**
```
cay.vung_trong.filter(v => v.vung_slug === currentVung).length > 0
```

**Ví dụ:**
- Đinh lăng có `vung_trong: ["mien-bac", "dong-nam-bo"]` → chỉ tạo 2 page combo (không tạo cho Tây Nguyên)

### 11.3. AI-enrichment strategy

**Có thể AI generate:**
- Intro paragraphs
- Section chuyển tiếp
- FAQ answers (dựa trên data)
- Meta description

**KHÔNG được AI generate (bắt buộc data thật):**
- Bảng giá
- Vùng trồng
- Tiêu chí kỹ thuật cụ thể
- Số liệu năng suất

**Workflow:**
1. Data JSON + template → skeleton HTML với slots
2. AI fill slots còn trống (prose sections)
3. Human review money page (100%), spot-check wiki (20%)
4. Publish

### 11.4. Content update mechanism

Data có `updated_at`. Khi update JSON:
- Rebuild site (CI/CD auto)
- Ping Google Search Console API để re-crawl

---

## 12. Analytics & Tracking

### 12.1. Bắt buộc setup

| Tool | Purpose |
|---|---|
| Google Analytics 4 | Traffic, behavior |
| Google Search Console | Index status, keyword rankings |
| Google Tag Manager (optional) | Manage tags |

### 12.2. Custom events cần track

```typescript
// Click CTA về landing
event('cta_click_landing', {
  page_type: 'money_cay' | 'money_vung' | 'pillar' | 'hub_wiki',
  cay_slug?: string,
  vung_slug?: string,
  cta_position: 'hero' | 'partner_card' | 'footer' | 'mobile_sticky',
  cta_label: string
});

// Click internal link giữa silo
event('internal_link_click', {
  from_page_type: string,
  to_page_type: string,
  link_context: string
});

// Scroll depth
event('scroll_depth', { depth: 25 | 50 | 75 | 100 });

// FAQ interaction
event('faq_expand', { question: string, page_url: string });
```

### 12.3. Attribution về landing

Tất cả outbound link về VIETMEC landing phải có UTM:
```
?utm_source=nguyenvietloc
&utm_medium=blog
&utm_campaign={cay_slug or 'general'}
&utm_content={page_type}_{cta_position}
&utm_term={vung_slug or ''}
```

---

## 13. Legal & Compliance

### 13.1. Footer disclaimer bắt buộc
```
Nguyễn Viết Lộc là blog cá nhân chia sẻ kinh nghiệm về ngành dược liệu 
Việt Nam. Nội dung mang tính tham khảo, không thay thế tư vấn chuyên môn. 
Một số bài viết có giới thiệu đơn vị đối tác thu mua. Người đọc tự cân 
nhắc và chịu trách nhiệm khi giao dịch.
```

### 13.2. Privacy Policy & Terms
- `/chinh-sach-bao-mat` — Privacy Policy (bắt buộc do có GA)
- `/dieu-khoan-su-dung` — Terms of Use

### 13.3. Cookie consent
Banner cookie consent (nếu targeted EU traffic, else optional).

---

## 14. Milestones

### 14.1. Phase 1 — Foundation (tháng 1)
**Coding agent scope:**
- Setup Next.js project với directory structure
- Implement Design System (tokens, base components)
- Implement 6 loại page template
- Implement data schema + loaders
- Setup sitemap.xml, robots.txt, canonical, schema markup
- Deploy MVP với 5–10 page mẫu (1 hub, 3 money cây, 2 wiki)
- Setup GA4, Search Console

**Content team scope (song song):**
- Chuẩn bị data 20–30 cây ưu tiên
- Data 8 vùng + tỉnh chính
- Baseline giá thị trường
- Viết 5 hub wiki chất lượng cao

**Output milestone 1:** ~150 page live, index lần đầu.

### 14.2. Phase 2 — Scale (tháng 2)
- Mở rộng data lên 50 cây
- Sinh thêm 300–500 money page
- Launch wiki bệnh + kỹ thuật (traffic magnet)
- Optimize based on Search Console feedback

### 14.3. Phase 3 — Optimize (tháng 3)
- Đo lường: page nào index tốt, page nào bị drop
- Ưu tiên viết depth cho hub có traffic
- Internal linking tuning
- Refresh giá + updated_at
- Review CTA CTR về landing → optimize

---

## 15. Handoff notes for Coding Agent

### 15.1. Đầu vào cần chuẩn bị trước khi code
- [ ] Domain subdomain đã trỏ về hosting
- [ ] Landing page URL VIETMEC (cho outbound link)
- [ ] Design tokens final từ Stitch (color hex, font names)
- [ ] Logo/wordmark "Nguyễn Viết Lộc" nếu có
- [ ] Bio Nguyễn Viết Lộc (cho page About)
- [ ] Ảnh nông trại, hình ảnh cây (nếu có sẵn)

### 15.2. Question để agent hỏi user nếu chưa rõ
- Static site (Next.js) hay WordPress?
- CMS đi kèm hay chỉ JSON files?
- Có multi-author trong tương lai không?
- Có cần dark mode không?
- Priority page nào build trước?

### 15.3. Nguyên tắc code
1. **Type-safe:** TypeScript + Zod validate data JSON
2. **Component-driven:** Storybook cho major components (optional)
3. **Accessible:** WCAG AA, keyboard nav, aria labels
4. **Performance:** Image optimization, code splitting, prefetch
5. **SEO-first:** Semantic HTML, JSON-LD, meta tags per page
6. **Không hardcode:** Text content luôn qua data hoặc constant file
7. **PBN safety:** Không expose file structure or metadata that ties to VIETMEC

### 15.4. Anti-patterns cần tránh
- ❌ Client-side rendering cho content chính (SEO hại)
- ❌ Hardcode "VIETMEC" trong template (dùng partner data)
- ❌ Cùng anchor text cho cùng URL đích
- ❌ Duplicate content giữa money cây và money vùng (cần content unique)
- ❌ Popup xâm lấn (affect SEO + UX)
- ❌ Font size < 14px trên body

---

## 16. Definition of Done

Một page được coi là "done" khi:
- [ ] Render đúng template design
- [ ] Metadata + Schema JSON-LD đầy đủ, validate qua Google Rich Results Test
- [ ] Mobile responsive, không horizontal scroll
- [ ] Lighthouse Performance ≥ 85 (mobile)
- [ ] Internal link đúng rule (min số link ra + link về)
- [ ] CTA về landing có UTM đúng format
- [ ] Content trải qua human review (money page)
- [ ] Không lỗi console
- [ ] Accessible: alt text ảnh, aria label CTA
- [ ] Đã submit sitemap sau khi publish batch

---

## Appendix A: Data seed cho cây ưu tiên (tham khảo)

Cây priority theo topical map user cung cấp:
- đinh lăng, ba kích, hà thủ ô, atiso, nấm linh chi
- bạc hà, cà gai leo, kim ngân hoa, đương quy, xạ đen

## Appendix B: Wiki article priority (theo search volume)

Top 15 wiki nên viết trước:
1. Tiêu chuẩn GMP-WHO (1,900)
2. Giá thể là gì (1,300)
3. Bệnh thán thư (880)
4. Bệnh phấn trắng (590)
5. Cách giâm cành (390)
6. Bệnh đốm lá (260)
7. Bệnh rỉ sắt (260)
8. Cách ủ hạt giống (210)
9. Cách trị rệp sáp (210)
10. Cách ươm hạt (210)
11. Bệnh lở cổ rễ (110)
12. Bệnh thối rễ (90)
13. Bệnh mốc sương (90)
14. Nứt thân xì mủ (90)
15. Quy trình sấy thăng hoa (70)

## Appendix C: Links out to landing

Only these pages should link to VIETMEC landing:
- Homepage (1 CTA banner)
- Pillar money (1 partner card + 1 footer CTA)
- Money cây (Partner card + Footer CTA + Mobile sticky)
- Money vùng (Partner card + Footer CTA)
- Hub wiki (1 mention natural + Footer)
- Wiki tiêu chuẩn (1 mention as case study)

Wiki khác (bệnh, kỹ thuật, concept, quy trình): KHÔNG link về landing trực tiếp — chỉ link về hub theo cây, để hub push sang money.

---

**End of PRD.**
