import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D2521] flex flex-col font-sans selection:bg-[#B85037]/10 selection:text-[#B85037] overflow-x-clip">
      <ScrollToTop />
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 md:py-10">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
