import React from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { HomePage } from "./pages/HomePage";
import { PillarPage } from "./pages/PillarPage";
import { HerbCatalogPage } from "./pages/HerbCatalogPage";
import { MoneyCayPage } from "./pages/MoneyCayPage";
import { MoneyVungPage } from "./pages/MoneyVungPage";
import { RegionsPage } from "./pages/RegionsPage";
import { HubWikiPage } from "./pages/HubWikiPage";
import { KnowledgePage } from "./pages/KnowledgePage";
import { WikiArticlePage } from "./pages/WikiArticlePage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/thu-mua-duoc-lieu" element={<PillarPage />} />
        <Route path="/duoc-lieu" element={<HerbCatalogPage />} />
        <Route path="/thu-mua-duoc-lieu/:cay" element={<MoneyCayPage />} />
        <Route path="/thu-mua-duoc-lieu/:cay/:vung" element={<MoneyVungPage />} />
        <Route path="/vung-trong" element={<RegionsPage />} />
        <Route path="/ky-thuat-trong/:cay" element={<HubWikiPage />} />
        <Route path="/kien-thuc" element={<KnowledgePage />} />
        <Route path="/kien-thuc/:topic" element={<WikiArticlePage />} />
        <Route path="/ve-toi" element={<AboutPage />} />
        <Route path="/lien-he" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
