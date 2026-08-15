import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D2521] flex flex-col font-sans selection:bg-[#B85037]/10 selection:text-[#B85037] overflow-x-clip">
      <ScrollToTop />

      {/* Bỏ qua điều hướng: người dùng bàn phím / trình đọc màn hình không phải nghe lại
          toàn bộ menu ở mỗi trang. Ẩn cho tới khi được focus. */}
      <a
        href="#noi-dung"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-terracotta focus:shadow-lg focus:outline-2 focus:outline-terracotta"
      >
        Bỏ qua, tới nội dung chính
      </a>

      <Header />

      {/* tabIndex={-1} để skip-link ở trên thật sự chuyển được focus vào đây. */}
      <main id="noi-dung" tabIndex={-1} className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 md:py-10 focus:outline-none">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
