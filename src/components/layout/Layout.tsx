import React from "react";
import { Outlet, useMatch } from "react-router-dom";
import { ShipmentModalProvider, useShipmentModal } from "../../lib/ShipmentModalContext";
import { HERBS_DATA } from "../../lib/data";
import { BottomMobileCtaBar, ShipmentModal } from "../ui";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";

// Phần thân dùng context modal (phải nằm trong Provider).
const LayoutInner: React.FC = () => {
  const { isOpen, herbName, open, close } = useShipmentModal();

  // Nếu đang ở trang chi tiết một cây thuốc thì hiển thị tên cây trên thanh CTA đáy.
  const cayMatch = useMatch("/thu-mua-duoc-lieu/:cay");
  const currentHerb = cayMatch ? HERBS_DATA.find((h) => h.slug === cayMatch.params.cay) : undefined;

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D2521] flex flex-col font-sans selection:bg-[#B85037]/10 selection:text-[#B85037]">
      <ScrollToTop />
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 md:py-10">
        <Outlet />
      </main>

      <Footer />

      {/* Thanh CTA cố định dưới cùng (mobile) */}
      <BottomMobileCtaBar
        herbName={currentHerb ? currentHerb.name : "thảo dược"}
        onCtaClick={() => open(currentHerb ? currentHerb.name : "Dược liệu nông sản")}
      />

      {/* Modal thu mua toàn cục dùng chung cho mọi trang & CTA */}
      <ShipmentModal isOpen={isOpen} onClose={close} herbName={herbName} />
    </div>
  );
};

export const Layout: React.FC = () => {
  return (
    <ShipmentModalProvider>
      <LayoutInner />
    </ShipmentModalProvider>
  );
};
