import React from "react";
import { Outlet, useMatch } from "react-router-dom";
import { HERBS_DATA } from "../../lib/data";
import { BottomMobileCtaBar, AccessibilityBar } from "../ui";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";

export const Layout: React.FC = () => {
  // Nếu đang ở trang chi tiết một cây thuốc thì hiển thị tên cây + gắn UTM campaign
  // trên thanh CTA đáy (mobile).
  const cayMatch = useMatch("/thu-mua-duoc-lieu/:cay");
  const currentHerb = cayMatch ? HERBS_DATA.find((h) => h.slug === cayMatch.params.cay) : undefined;

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D2521] flex flex-col font-sans selection:bg-[#B85037]/10 selection:text-[#B85037]">
      <ScrollToTop />
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 md:py-10">
        <div className="mb-4">
          <AccessibilityBar />
        </div>
        <Outlet />
      </main>

      <Footer />

      {/* Thanh CTA cố định dưới cùng (mobile) — link outbound về landing kèm UTM. */}
      <BottomMobileCtaBar
        herbName={currentHerb ? currentHerb.name : "thảo dược"}
        cay={currentHerb?.slug}
      />
    </div>
  );
};
