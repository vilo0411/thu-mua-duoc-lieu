/**
 * Builder tạo sẵn props <Seo> cho từng loại trang, gom title/description/JSON-LD
 * theo ma trận schema ở PRD §8.2 để mỗi page chỉ cần một dòng <Seo>.
 */
import type { HerbalMedicine, RegionData, WikiArticle, WikiHub } from "../../types";
import { paths } from "../paths";
import { SITE } from "../data";
import type { SeoProps } from "./Seo";
import * as ld from "./jsonLd";

const YEAR = new Date().getFullYear();

export function homeSeo(): SeoProps {
  return {
    title: SITE.defaultTitle,
    description: SITE.defaultDescription,
    path: paths.home(),
    type: "website",
    jsonLd: [ld.organizationOfBlogger(), ld.website()],
  };
}

export function pillarSeo(): SeoProps {
  return {
    title: `Thu mua dược liệu ${YEAR}: Bảng giá, tiêu chí & vùng trồng`,
    description:
      "Tổng hợp thị trường thu mua dược liệu Việt Nam: danh mục cây, bảng giá tham khảo, tiêu chí chọn đầu mối uy tín và các vùng trồng trọng điểm.",
    path: paths.pillar(),
    type: "website",
    jsonLd: [
      ld.breadcrumbList([
        { name: "Trang chủ", path: paths.home() },
        { name: "Thu mua dược liệu", path: paths.pillar() },
      ]),
    ],
  };
}

export function herbSeo(herb: HerbalMedicine): SeoProps {
  const path = paths.herb(herb.slug);
  return {
    title: `Thu mua dược liệu ${herb.name} ${YEAR}: Giá & nơi bán uy tín`,
    description: herb.shortDesc.slice(0, 158),
    path,
    type: "article",
    image: herb.image,
    jsonLd: [
      ld.article({
        headline: `Thị trường thu mua ${herb.name}`,
        description: herb.shortDesc,
        path,
        image: herb.image,
      }),
      ld.product({ name: herb.name, description: herb.shortDesc, image: herb.image }),
      ld.faqPage(herb.faq),
      ld.breadcrumbList([
        { name: "Trang chủ", path: paths.home() },
        { name: "Thu mua dược liệu", path: paths.pillar() },
        { name: herb.name, path },
      ]),
    ],
  };
}

export function herbRegionSeo(herb: HerbalMedicine, region: RegionData): SeoProps {
  const path = paths.herbRegion(herb.slug, region.slug);
  return {
    title: `Thu mua dược liệu ${herb.name} tại ${region.name} ${YEAR}`,
    description: `Thông tin thu mua ${herb.name} khu vực ${region.name}: đặc điểm vùng trồng, các tỉnh trọng điểm và quy trình gửi hàng.`,
    path,
    type: "article",
    image: herb.image,
    jsonLd: [
      ld.article({
        headline: `Thu mua dược liệu ${herb.name} tại vùng ${region.name}`,
        description: `Giá và vùng trồng ${herb.name} khu vực ${region.name}.`,
        path,
        image: herb.image,
      }),
      ld.product({ name: `${herb.name} (${region.name})`, description: herb.shortDesc, image: herb.image }),
      ld.breadcrumbList([
        { name: "Trang chủ", path: paths.home() },
        { name: "Thu mua dược liệu", path: paths.pillar() },
        { name: herb.name, path: paths.herb(herb.slug) },
        { name: region.name, path },
      ]),
    ],
  };
}

export function hubSeo(hub: WikiHub, image?: string): SeoProps {
  const path = paths.hubWiki(hub.herbSlug);
  return {
    title: hub.title.slice(0, 60),
    description: hub.intro.slice(0, 158),
    path,
    type: "article",
    image,
    jsonLd: [
      ld.article({ headline: hub.title, description: hub.intro, path, image }),
      ld.howTo({
        name: hub.title,
        description: hub.intro,
        steps: hub.standards.map((s) => ({ name: s.stage, text: s.criteria })),
      }),
      ld.faqPage(hub.faq),
      ld.breadcrumbList([
        { name: "Trang chủ", path: paths.home() },
        { name: "Kiến thức", path: paths.knowledge() },
        { name: hub.herbName, path },
      ]),
    ],
  };
}

export function articleSeo(a: WikiArticle): SeoProps {
  const path = paths.article(a.id);
  const isHowTo = a.category.toLowerCase().includes("chế biến") || a.slug.startsWith("cach-") || a.slug.startsWith("quy-trinh-");
  return {
    title: a.title.slice(0, 60),
    description: a.excerpt.slice(0, 158),
    path,
    type: "article",
    image: a.image,
    jsonLd: [
      ld.article({ headline: a.title, description: a.excerpt, path, image: a.image, datePublished: a.date }),
      ...(isHowTo
        ? [
            ld.howTo({
              name: a.title,
              description: a.excerpt,
              steps: a.contentSections.map((s) => ({ name: s.heading, text: s.paragraphs[0] ?? "" })),
            }),
          ]
        : []),
      ld.faqPage(a.faq),
      ld.breadcrumbList([
        { name: "Trang chủ", path: paths.home() },
        { name: "Kiến thức", path: paths.knowledge() },
        { name: a.title, path },
      ]),
    ],
  };
}

export function knowledgeSeo(): SeoProps {
  return {
    title: "Kiến thức trồng & sơ chế dược liệu Việt Nam",
    description:
      "Thư viện kỹ thuật canh tác, phòng trừ sâu bệnh và sơ chế dược liệu đạt chuẩn GACP-WHO do Nguyễn Viết Lộc tổng hợp từ nguồn uy tín.",
    path: paths.knowledge(),
    type: "website",
    jsonLd: [
      ld.breadcrumbList([
        { name: "Trang chủ", path: paths.home() },
        { name: "Kiến thức", path: paths.knowledge() },
      ]),
    ],
  };
}

export function aboutSeo(): SeoProps {
  return {
    title: `Về ${SITE.owner} — Người tổng hợp kiến thức & giá dược liệu`,
    description: `Giới thiệu ${SITE.owner}, người tổng hợp kỹ thuật trồng và giá thu mua dược liệu Việt Nam từ các nguồn uy tín, có dẫn nguồn.`,
    path: paths.about(),
    type: "website",
    jsonLd: [ld.personProfile()],
  };
}

export function contactSeo(): SeoProps {
  return {
    title: `Liên hệ — ${SITE.siteName}`,
    description: `Thông tin liên hệ với ${SITE.owner} để trao đổi về kỹ thuật trồng và thu mua dược liệu.`,
    path: paths.contact(),
    type: "website",
  };
}

/** Props <Seo> dùng chung cho các trang chính sách/pháp lý. */
function legalSeo(title: string, description: string, path: string): SeoProps {
  return {
    title: title.slice(0, 60),
    description: description.slice(0, 158),
    path,
    type: "website",
    jsonLd: [
      ld.breadcrumbList([
        { name: "Trang chủ", path: paths.home() },
        { name: title, path },
      ]),
    ],
  };
}

export function privacySeo(): SeoProps {
  return legalSeo(
    `Chính sách bảo mật — ${SITE.siteName}`,
    `Cách ${SITE.siteName} thu thập, sử dụng và bảo vệ thông tin cá nhân bà con gửi qua biểu mẫu liên hệ. Không mua bán, chia sẻ dữ liệu.`,
    paths.privacy(),
  );
}

export function termsSeo(): SeoProps {
  return legalSeo(
    `Điều khoản sử dụng — ${SITE.siteName}`,
    `Điều khoản khi sử dụng nội dung tại ${SITE.displayUrl}: mục đích tham khảo, quyền sở hữu nội dung, giới hạn trách nhiệm và liên kết bên thứ ba.`,
    paths.terms(),
  );
}

export function disclaimerSeo(): SeoProps {
  return legalSeo(
    `Miễn trừ trách nhiệm — ${SITE.siteName}`,
    `Thông tin kỹ thuật, giá thu mua và kênh tiêu thụ trên trang mang tính tham khảo, không phải tư vấn y tế hay đầu tư. Bà con nên tự xác minh trước khi giao dịch.`,
    paths.disclaimer(),
  );
}

export function editorialSeo(): SeoProps {
  return legalSeo(
    `Chính sách nội dung & nguồn tham khảo`,
    `${SITE.owner} tổng hợp nội dung từ tài liệu khuyến nông, viện dược liệu và kinh nghiệm vùng trồng — cam kết dẫn nguồn, cập nhật và sửa sai kịp thời.`,
    paths.editorial(),
  );
}
