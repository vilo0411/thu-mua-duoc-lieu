/**
 * Builder tạo sẵn props <Seo> cho từng loại trang, gom title/description/JSON-LD
 * theo ma trận schema ở PRD §8.2 để mỗi page chỉ cần một dòng <Seo>.
 */
import type { HerbalMedicine, WikiArticle, WikiHub } from "../../types";
import { paths } from "../paths";
import { SITE } from "../data";
import type { SeoProps } from "./Seo";
import * as ld from "./jsonLd";

const YEAR = new Date().getFullYear();

/**
 * Ngân sách ký tự cho <title>. Google tự gắn tên site vào title link trên SERP
 * (" - Thư Viện Dược Liệu" ≈ 21 ký tự), nên title gốc phải chừa chỗ: vượt quá
 * ngưỡng này thì Google cắt hoặc tự viết lại title bằng H1/anchor text.
 * 55 ký tự ≈ 512px — đủ để title + brand vẫn hiển thị trọn.
 */
export const TITLE_MAX = 55;

/**
 * Cắt title cho vừa ngân sách mà không đứt giữa chữ: ưu tiên bỏ nguyên mệnh đề
 * cuối (sau dấu , : —), nếu không được thì lùi về khoảng trắng gần nhất.
 * Thay cho .slice(60) vốn tạo ra những title cụt kiểu "…tối ưu năng ".
 */
export function fitTitle(text: string, max = TITLE_MAX): string {
  const t = text.trim();
  if (t.length <= max) return t;
  const head = t.slice(0, max + 1);
  const clause = Math.max(
    head.lastIndexOf(", "),
    head.lastIndexOf(" — "),
    head.lastIndexOf(": "),
    head.lastIndexOf("? "),
  );
  const cut = clause > max * 0.45 ? clause + (head[clause] === "?" ? 1 : 0) : head.lastIndexOf(" ");
  let out = t.slice(0, cut > 0 ? cut : max).replace(/[\s,;:—-]+$/, "");
  // Tiếng Việt đa âm tiết: khoảng trắng không phải ranh giới từ, nên cắt xong dễ
  // còn lại âm tiết mở đầu một từ ghép ("… phổ", "… và"). Bỏ nốt âm tiết treo đó.
  out = out.replace(new RegExp(`\\s+(?:${DANGLING.join("|")})$`, "i"), "");
  return out;
}

/** Âm tiết không bao giờ đứng cuối câu tiếng Việt — dấu hiệu title bị cắt giữa từ. */
const DANGLING = [
  "và", "cho", "từ", "các", "với", "của", "theo", "để", "trong", "khi", "hay", "hoặc",
  "ở", "tại", "như", "về", "đạt", "phổ", "chất", "năng", "kỹ", "sản", "thu", "bảo",
  "tối", "tiêu", "hướng", "cách", "một", "những", "là", "có", "được", "cùng", "trên",
];

/**
 * Từ khoá chính của trang cây — nguồn duy nhất cho <title>, <h1> và mô tả để cả ba
 * cùng nhắm một cụm. Mặc định "Thu mua {name}" (không kèm "dược liệu" để tránh
 * cạnh tranh head term với Pillar); cây khai báo focusKeyword
 * thì ưu tiên giá trị đó.
 */
export function herbFocusKeyword(herb: HerbalMedicine): string {
  return herb.focusKeyword?.trim() || `Thu mua ${herb.name}`;
}

export function homeSeo(): SeoProps {
  return {
    title: SITE.defaultTitle,
    description: SITE.defaultDescription,
    path: paths.home(),
    type: "website",
    jsonLd: [ld.organizationOfBlogger(), ld.website()],
  };
}

/** FAQ dùng chung cho Pillar: vừa render trong <FaqAccordion>, vừa đưa vào JSON-LD FAQPage. */
export const PILLAR_FAQ: { question: string; answer: string }[] = [
  {
    question: "Trồng nhỏ lẻ vài sào có bán được cho nhà máy không?",
    answer:
      "Nhà máy thường mua theo lô lớn (tối thiểu vài tấn/chuyến xe). Nông hộ canh tác dưới 1ha nên liên kết qua HTX hoặc tổ hợp tác địa phương để gom hàng chung. HTX đứng ra ký hợp đồng và phân chia lợi nhuận theo tỷ lệ đóng góp. Đây là con đường bền vững hơn bán lẻ cho thương lái.",
  },
  {
    question: "Làm thế nào biết giá mình đang bán có bị ép thấp không?",
    answer:
      "Bà con tham khảo bảng giá theo từng cây trên trang này (cập nhật theo vụ), sau đó so sánh với giá thương lái đang trả. Nếu chênh lệch lớn hơn 15–20%, đáng cân nhắc gom hàng theo HTX để bán thẳng nhà máy. Yếu tố khác cũng ảnh hưởng giá: độ ẩm, phân hạng chất lượng, thời điểm bán trong vụ.",
  },
  {
    question: "Đâu là đầu mối, công ty thu mua dược liệu uy tín?",
    answer:
      "Một đầu mối hoặc công ty thu mua đáng tin thường công bố tiêu chuẩn (độ ẩm, phân hạng, hoạt chất) rõ ràng trước khi cân, có pháp nhân và địa chỉ cụ thể, báo giá sát thị trường và cam kết bao tiêu bằng văn bản. Trong mục 'Đầu mối & công ty thu mua' phía trên, tôi có tổng hợp đơn vị bao tiêu đáp ứng các tiêu chí này để bà con tham khảo và so sánh.",
  },
  {
    question: "Muốn bán dược liệu thì bán ở đâu, địa chỉ nào?",
    answer:
      "Có bốn kênh chính: bán cho thương lái tại vườn, mang ra chợ đầu mối, tham gia hợp tác xã, hoặc ký bao tiêu trực tiếp với công ty chế biến. Với hàng số lượng và cần đầu ra ổn định, bán qua HTX hoặc công ty bao tiêu thường được giá và ít rủi ro hơn bán lẻ. Bà con có thể gửi thông tin lô hàng qua card đơn vị thu mua trên trang để được báo giá cụ thể.",
  },
  {
    question: "Thu mua dược liệu tại Hà Nội và miền Bắc ở đâu?",
    answer:
      "Tại Hà Nội, dược liệu chủ yếu tập kết về phố Lãn Ông và chợ Ninh Hiệp (Gia Lâm) — nơi các đại lý gom sỉ. Ở miền Bắc, vùng nguyên liệu lớn là Tây Bắc (Sơn La, Hòa Bình, Lào Cai) và Đông Bắc (Cao Bằng, Bắc Kạn, Lạng Sơn), hàng thường chạy về Hà Nội hoặc bán thẳng nhà máy tại địa phương. Muốn bán ổn định, nên kết nối HTX hoặc công ty bao tiêu thay vì bán lẻ ngoài chợ.",
  },
];

export function pillarSeo(): SeoProps {
  return {
    title: `Thu mua dược liệu ${YEAR}: giá & đầu mối uy tín`,
    description:
      "Bảng giá thu mua dược liệu mới nhất, đầu mối và công ty thu mua uy tín, nơi bán tại Hà Nội, miền Bắc và toàn quốc - giúp nông hộ, HTX bán đúng giá, tránh bị ép.",
    path: paths.pillar(),
    type: "website",
    jsonLd: [
      ld.breadcrumbList([
        { name: "Trang chủ", path: paths.home() },
        { name: "Thu mua dược liệu", path: paths.pillar() },
      ]),
      ld.faqPage(PILLAR_FAQ),
    ],
  };
}

export function herbSeo(herb: HerbalMedicine): SeoProps {
  const path = paths.herb(herb.slug);
  const focus = herbFocusKeyword(herb);
  return {
    title: fitTitle(`${focus} ${YEAR}: giá & nơi bán uy tín`),
    description: `${focus} ${YEAR}: bảng giá tham khảo theo phân hạng, tiêu chuẩn chất lượng và kênh thu mua uy tín. ${herb.shortDesc}`.slice(0, 158),
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
      ld.faqPage(herb.faq),
      ld.breadcrumbList([
        { name: "Trang chủ", path: paths.home() },
        { name: "Thu mua dược liệu", path: paths.pillar() },
        { name: herb.name, path },
      ]),
    ],
  };
}

export function hubSeo(hub: WikiHub, image?: string): SeoProps {
  const path = paths.hubWiki(hub.herbSlug);
  return {
    // Title biên tập (dùng làm H1) thường 60–70 ký tự nên bị cắt trên SERP; <title>
    // sinh theo khuôn ngắn bám đúng cụm "kỹ thuật trồng {cây}". Hub nào cần khác
    // khuôn thì khai báo seoTitle trong content.
    title: fitTitle(hub.seoTitle || `Kỹ thuật trồng ${hub.herbName}: cẩm nang từ A-Z`),
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
    title: fitTitle(a.seoTitle || a.title),
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

export function knowledgeSeo(listItems: { name: string; path: string }[] = []): SeoProps {
  return {
    title: "Kỹ thuật trồng cây dược liệu: cẩm nang canh tác",
    description:
      "Cẩm nang kỹ thuật trồng cây dược liệu: gieo trồng, nhân giống, làm đất, bón phân, phòng trừ sâu bệnh và sơ chế — do Nguyễn Viết Lộc tổng hợp từ nguồn uy tín.",
    path: paths.knowledge(),
    type: "website",
    jsonLd: [
      ld.breadcrumbList([
        { name: "Trang chủ", path: paths.home() },
        { name: "Kỹ thuật trồng cây dược liệu", path: paths.knowledge() },
      ]),
      ...(listItems.length ? [ld.itemList(listItems)] : []),
    ],
  };
}

export function sitemapSeo(): SeoProps {
  return {
    // Không tự gắn siteName: Google đã tự thêm tên site vào title link trên SERP.
    title: "Sơ đồ trang: toàn bộ nội dung dược liệu",
    description:
      "Sơ đồ toàn bộ trang trên website: bảng giá thu mua từng cây dược liệu, vùng trồng, kỹ thuật canh tác và các trang thông tin — giúp tra cứu và điều hướng nhanh.",
    path: paths.sitemap(),
    type: "website",
    jsonLd: [
      ld.breadcrumbList([
        { name: "Trang chủ", path: paths.home() },
        { name: "Sơ đồ trang", path: paths.sitemap() },
      ]),
    ],
  };
}

export function aboutSeo(): SeoProps {
  return {
    title: `Về ${SITE.owner} — người tổng hợp kiến thức dược liệu`,
    description: `Giới thiệu ${SITE.owner}, người tổng hợp kỹ thuật trồng và giá thu mua dược liệu Việt Nam từ các nguồn uy tín, có dẫn nguồn.`,
    path: paths.about(),
    type: "website",
    jsonLd: [ld.personProfile()],
  };
}

export function contactSeo(): SeoProps {
  return {
    title: `Liên hệ ${SITE.owner} về trồng & thu mua dược liệu`,
    description: `Thông tin liên hệ với ${SITE.owner} để trao đổi về kỹ thuật trồng và thu mua dược liệu.`,
    path: paths.contact(),
    type: "website",
  };
}

/** Props <Seo> dùng chung cho các trang chính sách/pháp lý. */
function legalSeo(title: string, description: string, path: string): SeoProps {
  return {
    title: fitTitle(title),
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
    "Chính sách bảo mật thông tin cá nhân",
    `Cách ${SITE.siteName} thu thập, sử dụng và bảo vệ thông tin cá nhân bà con gửi qua biểu mẫu liên hệ. Không mua bán, chia sẻ dữ liệu.`,
    paths.privacy(),
  );
}

export function termsSeo(): SeoProps {
  return legalSeo(
    "Điều khoản sử dụng nội dung trên website",
    `Điều khoản khi sử dụng nội dung tại ${SITE.displayUrl}: mục đích tham khảo, quyền sở hữu nội dung, giới hạn trách nhiệm và liên kết bên thứ ba.`,
    paths.terms(),
  );
}

export function disclaimerSeo(): SeoProps {
  return legalSeo(
    "Miễn trừ trách nhiệm về thông tin & giá dược liệu",
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
