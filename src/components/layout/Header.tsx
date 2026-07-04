import React, { useState } from "react";
import { Leaf, Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { paths } from "../../lib/paths";
import { NAV_ITEMS } from "./navItems";
import { SearchBar } from "./SearchBar";
import { MobileNav } from "./MobileNav";
import { AccessibilityBar } from "../ui";

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-pine-900/95 backdrop-blur-md border-b border-white/10 z-30 transition-all">
      {/* Thanh tiện ích trên cùng — tiện ích cỡ chữ (quy ước site thông tin VN). Ẩn trên điện thoại (đã có trong menu). */}
      <div className="hidden sm:block border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1.5 flex items-center justify-end">
          <AccessibilityBar tone="dark" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">

        {/* BRAND wordmark (trái) */}
        <Link to={paths.home()} className="flex items-center gap-2 cursor-pointer group shrink-0">
          <div className="w-9 h-9 rounded-lg bg-terracotta flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <Leaf className="w-5 h-5 fill-white" />
          </div>
          <span className="font-serif text-xl sm:text-2xl font-black text-white tracking-tight group-hover:opacity-90 transition-opacity">
            Nguyễn Việt Lộc
          </span>
        </Link>

        {/* Pill nav ở giữa (mượn từ mẫu) — item active là viên trắng nổi trên nền pine */}
        <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `rounded-full px-4 py-1.5 text-sm font-bold transition-colors cursor-pointer ${
                  isActive ? "bg-white text-pine-900" : "text-white/70 hover:text-white hover:bg-white/10"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Cụm phải: tìm kiếm (xl) + hamburger (mobile) */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden xl:block">
            <SearchBar variant="desktop" />
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white/90 hover:text-white"
            aria-label="Mở menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {mobileMenuOpen && <MobileNav onClose={() => setMobileMenuOpen(false)} />}
    </header>
  );
};
