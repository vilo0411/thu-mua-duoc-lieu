import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { HomePage } from "./pages/HomePage";
import { PillarPage } from "./pages/PillarPage";
import { MoneyCayPage } from "./pages/MoneyCayPage";
import { MoneyVungPage } from "./pages/MoneyVungPage";
import { KnowledgePage } from "./pages/KnowledgePage";
import { KienThucSlugPage } from "./pages/KienThucSlugPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { paths } from "./lib/paths";

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
        <Route path="/ve-toi" element={<AboutPage />} />
        <Route path="/lien-he" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
