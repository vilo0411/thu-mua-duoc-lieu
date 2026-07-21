import React, { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { paths } from "./lib/paths";

// Nhóm trang SEO/money là điểm tiếp đất (landing) đã được pre-render: giữ import tĩnh
// để lúc hydrate KHÔNG nháy Suspense fallback đè lên HTML tĩnh (tránh hại LCP).
import { HomePage } from "./pages/HomePage";
import { PillarPage } from "./pages/PillarPage";
import { MoneyCayPage } from "./pages/MoneyCayPage";
import { MoneyVungPage } from "./pages/MoneyVungPage";
import { KnowledgePage } from "./pages/KnowledgePage";
import { KienThucSlugPage } from "./pages/KienThucSlugPage";
// NotFoundPage cũng được các trang nội dung import tĩnh (render khi slug sai) nên
// không tách chunk được — giữ import tĩnh để tránh Suspense thừa và warning build.
import { NotFoundPage } from "./pages/NotFoundPage";

// Nhóm trang đuôi dài, ít traffic: tách chunk riêng, chỉ tải khi user điều hướng tới.
// Đến qua client-nav nên fallback hiện lúc chuyển trang là bình thường (không phải hydrate).
const AboutPage = lazy(() => import("./pages/AboutPage").then((m) => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import("./pages/ContactPage").then((m) => ({ default: m.ContactPage })));
const SitemapPage = lazy(() => import("./pages/SitemapPage").then((m) => ({ default: m.SitemapPage })));
const PrivacyPage = lazy(() => import("./pages/LegalPages").then((m) => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import("./pages/LegalPages").then((m) => ({ default: m.TermsPage })));
const DisclaimerPage = lazy(() => import("./pages/LegalPages").then((m) => ({ default: m.DisclaimerPage })));
const EditorialPage = lazy(() => import("./pages/LegalPages").then((m) => ({ default: m.EditorialPage })));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/thu-mua-duoc-lieu" element={<PillarPage />} />
        <Route path="/thu-mua-duoc-lieu/:cay" element={<MoneyCayPage />} />
        <Route path="/thu-mua-duoc-lieu/:cay/:vung" element={<MoneyVungPage />} />
        {/* IA gộp về 2 silo (PRD §4.1): danh mục cây & vùng trồng đã nằm trong Pillar.
            Các URL cũ redirect về Pillar để tránh duplicate content. */}
        <Route path={paths.herbCatalog()} element={<Navigate to={paths.pillar()} replace />} />
        <Route path={paths.regions()} element={<Navigate to={paths.pillar()} replace />} />
        <Route path="/kien-thuc" element={<KnowledgePage />} />
        <Route path="/kien-thuc/:slug" element={<KienThucSlugPage />} />
        {/* Trang đuôi dài: bọc Suspense để lazy chunk có fallback khi chuyển trang. */}
        <Route
          path="/ve-toi"
          element={<Suspense fallback={null}><AboutPage /></Suspense>}
        />
        <Route
          path="/lien-he"
          element={<Suspense fallback={null}><ContactPage /></Suspense>}
        />
        <Route
          path="/chinh-sach-bao-mat"
          element={<Suspense fallback={null}><PrivacyPage /></Suspense>}
        />
        <Route
          path="/dieu-khoan-su-dung"
          element={<Suspense fallback={null}><TermsPage /></Suspense>}
        />
        <Route
          path="/mien-tru-trach-nhiem"
          element={<Suspense fallback={null}><DisclaimerPage /></Suspense>}
        />
        <Route
          path="/chinh-sach-noi-dung"
          element={<Suspense fallback={null}><EditorialPage /></Suspense>}
        />
        <Route
          path="/so-do-trang"
          element={<Suspense fallback={null}><SitemapPage /></Suspense>}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
