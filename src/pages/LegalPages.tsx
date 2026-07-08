import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumb } from "../components/ui";
import { paths } from "../lib/paths";
import { OWNER_EMAIL, SITE_OWNER, SITE } from "../lib/data";
import {
  Seo,
  privacySeo,
  termsSeo,
  disclaimerSeo,
  editorialSeo,
  type SeoProps,
} from "../lib/seo";

/**
 * Các trang chính sách/pháp lý (E-E-A-T — tăng độ uy tín, PRD §8, §15).
 * Dùng chung khung LegalShell; nội dung prose hardcode như About/Contact.
 */

/** Ngày cập nhật hiển thị trên mọi trang chính sách. */
const LAST_UPDATED = "07/07/2026";

interface LegalSection {
  heading: string;
  body: React.ReactNode;
}

const LegalShell: React.FC<{
  seo: SeoProps;
  kicker: string;
  title: string;
  intro: React.ReactNode;
  sections: LegalSection[];
}> = ({ seo, kicker, title, intro, sections }) => {
  const navigate = useNavigate();
  return (
    <div className="space-y-8 animate-fade-in max-w-3xl mx-auto">
      <Seo {...seo} />
      <Breadcrumb
        items={[
          { label: "Trang chủ", onClick: () => navigate(paths.home()) },
          { label: title },
        ]}
      />
      <article className="bg-white border border-line rounded-2xl p-6 md:p-10 space-y-6">
        <header className="space-y-2 pb-5 border-b border-sand">
          <span className="text-terracotta font-mono text-xs font-bold uppercase tracking-[0.15em] block">
            // {kicker}
          </span>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-ink-soft tracking-tight">
            {title}
          </h1>
          <p className="text-xs text-gray-500 font-mono">Cập nhật lần cuối: {LAST_UPDATED}</p>
        </header>

        <div className="text-base text-ink leading-relaxed font-sans">{intro}</div>

        <div className="space-y-6">
          {sections.map((s) => (
            <section key={s.heading} className="space-y-2">
              <h2 className="font-serif text-lg font-bold text-ink-soft">{s.heading}</h2>
              <div className="text-[15px] text-ink leading-relaxed font-sans space-y-2">
                {s.body}
              </div>
            </section>
          ))}
        </div>

        <footer className="border-t border-sand pt-5 text-sm text-gray-600 space-y-1">
          <p>
            Thắc mắc về nội dung trang này, bà con gửi email đến{" "}
            <a href={`mailto:${OWNER_EMAIL}`} className="text-terracotta underline font-semibold">
              {OWNER_EMAIL}
            </a>
            .
          </p>
          <p className="text-xs text-gray-500">
            Xem thêm:{" "}
            <Link to={paths.privacy()} className="text-terracotta hover:underline">Chính sách bảo mật</Link>{" · "}
            <Link to={paths.terms()} className="text-terracotta hover:underline">Điều khoản sử dụng</Link>{" · "}
            <Link to={paths.disclaimer()} className="text-terracotta hover:underline">Miễn trừ trách nhiệm</Link>{" · "}
            <Link to={paths.editorial()} className="text-terracotta hover:underline">Chính sách nội dung</Link>
          </p>
        </footer>
      </article>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* 1. Chính sách bảo mật                                               */
/* ------------------------------------------------------------------ */
export const PrivacyPage: React.FC = () => (
  <LegalShell
    seo={privacySeo()}
    kicker="Bảo vệ thông tin bà con"
    title="Chính sách bảo mật"
    intro={
      <p>
        {SITE.siteName} ({SITE.displayUrl}) tôn trọng và bảo vệ thông tin cá nhân của bà con.
        Trang này giải thích chúng tôi thu thập thông tin gì, dùng vào việc gì và bà con có
        những quyền nào đối với dữ liệu của mình.
      </p>
    }
    sections={[
      {
        heading: "1. Thông tin chúng tôi thu thập",
        body: (
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Thông tin bà con chủ động gửi:</strong> họ tên, số điện thoại, email và nội
              dung câu hỏi khi bà con điền vào biểu mẫu ở trang Liên hệ.
            </li>
            <li>
              <strong>Dữ liệu kỹ thuật ẩn danh:</strong> trang có thể dùng công cụ thống kê lượt
              truy cập (ví dụ Google Analytics) để biết trang nào được xem nhiều — dữ liệu này ẩn
              danh, không định danh cá nhân.
            </li>
          </ul>
        ),
      },
      {
        heading: "2. Mục đích sử dụng",
        body: (
          <p>
            Thông tin bà con gửi chỉ được dùng để <strong>trả lời câu hỏi và tư vấn trực tiếp</strong>{" "}
            cho bà con. Chúng tôi không dùng cho mục đích quảng cáo tự động hay gửi thư rác.
          </p>
        ),
      },
      {
        heading: "3. Chúng tôi KHÔNG mua bán, chia sẻ dữ liệu",
        body: (
          <p>
            {SITE_OWNER} vận hành trang này độc lập. Chúng tôi <strong>không bán, không cho thuê,
            không chia sẻ</strong> thông tin cá nhân của bà con cho bất kỳ đơn vị thu mua hay bên
            thứ ba nào, trừ khi bắt buộc theo yêu cầu hợp pháp của cơ quan nhà nước.
          </p>
        ),
      },
      {
        heading: "4. Lưu trữ & bảo mật",
        body: (
          <p>
            Thông tin liên hệ chỉ được giữ trong thời gian cần thiết để hỗ trợ bà con, sau đó được
            xoá. Chúng tôi áp dụng biện pháp hợp lý để tránh mất mát hoặc truy cập trái phép.
          </p>
        ),
      },
      {
        heading: "5. Quyền của bà con",
        body: (
          <p>
            Bà con có quyền yêu cầu xem, chỉnh sửa hoặc xoá thông tin cá nhân đã gửi. Chỉ cần email
            đến <strong>{OWNER_EMAIL}</strong>, chúng tôi sẽ xử lý trong thời gian sớm nhất.
          </p>
        ),
      },
      {
        heading: "6. Cookie",
        body: (
          <p>
            Trang có thể dùng cookie của công cụ thống kê để ghi nhớ phiên truy cập. Bà con có thể
            tắt cookie trong cài đặt trình duyệt mà không ảnh hưởng đến việc đọc nội dung.
          </p>
        ),
      },
    ]}
  />
);

/* ------------------------------------------------------------------ */
/* 2. Điều khoản sử dụng                                               */
/* ------------------------------------------------------------------ */
export const TermsPage: React.FC = () => (
  <LegalShell
    seo={termsSeo()}
    kicker="Quy định sử dụng"
    title="Điều khoản sử dụng"
    intro={
      <p>
        Khi truy cập và sử dụng nội dung tại {SITE.displayUrl}, bà con đồng ý với các điều khoản
        dưới đây. Nếu không đồng ý, vui lòng ngừng sử dụng trang.
      </p>
    }
    sections={[
      {
        heading: "1. Mục đích của website",
        body: (
          <p>
            Trang được lập ra để <strong>tổng hợp và chia sẻ thông tin tham khảo</strong> về kỹ
            thuật trồng, sơ chế và giá thu mua dược liệu. Nội dung mang tính giáo dục, hỗ trợ tra
            cứu — không phải lời khuyên y tế, pháp lý hay đầu tư.
          </p>
        ),
      },
      {
        heading: "2. Quyền sở hữu nội dung",
        body: (
          <p>
            Bài viết, hình ảnh biên tập và cách trình bày trên trang thuộc quyền của {SITE_OWNER},
            trừ các nguồn được trích dẫn. Bà con được phép đọc, chia sẻ đường dẫn và trích dẫn ngắn
            có ghi nguồn. Vui lòng không sao chép toàn bộ nội dung để đăng lại mà không xin phép.
          </p>
        ),
      },
      {
        heading: "3. Giới hạn trách nhiệm",
        body: (
          <p>
            Chúng tôi cố gắng cập nhật thông tin chính xác nhưng <strong>không bảo đảm tuyệt đối</strong>{" "}
            về tính đầy đủ hay kịp thời — đặc biệt là giá cả biến động theo mùa vụ và thị trường. Mọi
            quyết định canh tác hay giao dịch dựa trên thông tin của trang là do bà con tự cân nhắc.
            Chi tiết xem trang{" "}
            <Link to={paths.disclaimer()} className="text-terracotta underline">Miễn trừ trách nhiệm</Link>.
          </p>
        ),
      },
      {
        heading: "4. Liên kết & đơn vị bên thứ ba",
        body: (
          <p>
            Trang có thể dẫn tới website của đơn vị thu mua hoặc nguồn tham khảo bên ngoài. Chúng tôi
            không kiểm soát và không chịu trách nhiệm về nội dung, chính sách hay giao dịch với các
            bên đó. Bà con nên tự xác minh trước khi liên hệ hoặc ký kết.
          </p>
        ),
      },
      {
        heading: "5. Thay đổi điều khoản",
        body: (
          <p>
            Điều khoản có thể được cập nhật để phù hợp thực tế. Phiên bản mới nhất luôn hiển thị trên
            trang này kèm ngày cập nhật. Việc bà con tiếp tục sử dụng trang được xem là đồng ý với
            các thay đổi.
          </p>
        ),
      },
    ]}
  />
);

/* ------------------------------------------------------------------ */
/* 3. Miễn trừ trách nhiệm                                             */
/* ------------------------------------------------------------------ */
export const DisclaimerPage: React.FC = () => (
  <LegalShell
    seo={disclaimerSeo()}
    kicker="Tuyên bố quan trọng"
    title="Tuyên bố miễn trừ trách nhiệm"
    intro={
      <p>
        Vui lòng đọc kỹ tuyên bố này trước khi áp dụng bất kỳ thông tin nào trên {SITE.displayUrl}
        vào việc canh tác, sơ chế hay mua bán dược liệu.
      </p>
    }
    sections={[
      {
        heading: "1. Thông tin mang tính tham khảo",
        body: (
          <p>
            Toàn bộ nội dung kỹ thuật trồng trọt, sơ chế và bảo quản là <strong>tổng hợp từ nhiều
            nguồn tham khảo</strong> (tài liệu khuyến nông, viện dược liệu, kinh nghiệm bà con vùng
            trồng). Do điều kiện thổ nhưỡng, khí hậu và giống cây mỗi nơi mỗi khác, kết quả thực tế
            có thể khác nhau. Đây không phải quy trình chuẩn bắt buộc.
          </p>
        ),
      },
      {
        heading: "2. Không phải tư vấn y tế",
        body: (
          <p>
            Thông tin về công dụng dược liệu chỉ nhằm mục đích tra cứu, <strong>không thay thế chẩn
            đoán, tư vấn hay điều trị của bác sĩ, dược sĩ</strong>. Không tự ý dùng dược liệu để chữa
            bệnh khi chưa có ý kiến của người có chuyên môn y tế.
          </p>
        ),
      },
      {
        heading: "3. Giá cả chỉ để tham khảo",
        body: (
          <p>
            Bảng giá thu mua thay đổi liên tục theo mùa vụ, chất lượng và cung cầu thị trường. Các
            con số trên trang là <strong>mức tham khảo tại thời điểm tổng hợp</strong>, không phải
            cam kết giá mua. Bà con cần hỏi giá trực tiếp đơn vị thu mua trước khi thu hoạch, vận
            chuyển hay chốt bán.
          </p>
        ),
      },
      {
        heading: "4. Độc lập với đơn vị thu mua",
        body: (
          <p>
            {SITE_OWNER} vận hành trang <strong>độc lập</strong> và không đại diện cho bất kỳ doanh
            nghiệp thu mua nào. Khi giới thiệu một đơn vị cụ thể, chúng tôi nêu rõ đó chỉ là một
            trong nhiều lựa chọn để bà con tham khảo và so sánh.
          </p>
        ),
      },
      {
        heading: "5. Bà con tự chịu trách nhiệm quyết định",
        body: (
          <p>
            Chúng tôi không chịu trách nhiệm cho bất kỳ thiệt hại nào phát sinh từ việc áp dụng thông
            tin trên trang. Trước khi đầu tư vốn, xuống giống hay giao dịch, bà con hãy tự xác minh
            với cơ quan khuyến nông địa phương và đơn vị mua bán trực tiếp.
          </p>
        ),
      },
    ]}
  />
);

/* ------------------------------------------------------------------ */
/* 4. Chính sách nội dung & nguồn tham khảo (editorial)                */
/* ------------------------------------------------------------------ */
export const EditorialPage: React.FC = () => (
  <LegalShell
    seo={editorialSeo()}
    kicker="Cách chúng tôi làm nội dung"
    title="Chính sách nội dung & nguồn tham khảo"
    intro={
      <p>
        Trang này công khai cách {SITE_OWNER} biên tập, kiểm chứng và cập nhật nội dung, để bà con
        hiểu rõ độ tin cậy và giới hạn của thông tin mình đang đọc.
      </p>
    }
    sections={[
      {
        heading: "1. Chúng tôi là người tổng hợp, không phải chuyên gia",
        body: (
          <p>
            {SITE_OWNER} không tự nhận là chuyên gia dược liệu. Vai trò của chúng tôi là{" "}
            <strong>đọc, đối chiếu và sắp xếp lại</strong> thông tin từ nhiều nguồn thành dạng dễ tra
            cứu cho nông dân, HTX và cán bộ khuyến nông. Chúng tôi trình bày trung thực điều này thay
            vì tạo dựng hình ảnh chuyên gia.
          </p>
        ),
      },
      {
        heading: "2. Nguồn tham khảo",
        body: (
          <>
            <p>Nội dung được tổng hợp và đối chiếu từ các nhóm nguồn:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Tài liệu, hướng dẫn kỹ thuật của cơ quan khuyến nông và viện dược liệu.</li>
              <li>Tiêu chuẩn canh tác được công bố (ví dụ định hướng GACP-WHO).</li>
              <li>Kinh nghiệm thực tế của bà con và HTX tại các vùng trồng.</li>
              <li>Thông tin giá và kênh tiêu thụ đối chiếu từ nhiều đầu mối, không thiên vị.</li>
            </ul>
          </>
        ),
      },
      {
        heading: "3. Cam kết cập nhật & sửa sai",
        body: (
          <p>
            Vì là thông tin tổng hợp nên có thể còn thiếu sót. Khi phát hiện sai hoặc nhận được phản
            hồi xác đáng từ bà con, chúng tôi <strong>chỉnh sửa và ghi chú thời điểm cập nhật</strong>.
            Chúng tôi ưu tiên tính chính xác hơn tốc độ đăng bài.
          </p>
        ),
      },
      {
        heading: "4. Tính độc lập & minh bạch",
        body: (
          <p>
            Trang không nhận tài trợ đổi lấy nội dung sai lệch. Nếu một liên kết là hợp tác giới
            thiệu, chúng tôi nêu rõ để bà con tự cân nhắc. Quyền lợi của người trồng luôn được đặt
            lên trước.
          </p>
        ),
      },
      {
        heading: "5. Báo lỗi nội dung",
        body: (
          <p>
            Thấy chỗ nào chưa đúng, bà con hãy gửi email đến <strong>{OWNER_EMAIL}</strong> hoặc dùng{" "}
            <Link to={paths.contact()} className="text-terracotta underline">trang Liên hệ</Link>. Mỗi
            góp ý đều giúp trang chính xác hơn cho những người đọc sau.
          </p>
        ),
      },
    ]}
  />
);
