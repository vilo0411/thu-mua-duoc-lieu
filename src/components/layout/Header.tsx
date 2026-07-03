import React, { useState } from "react";
import { Leaf, Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { paths } from "../../lib/paths";
import { NAV_ITEMS } from "./navItems";
import { SearchBar } from "./SearchBar";
import { MobileNav } from "./MobileNav";

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#E6DDD0] z-30 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">

        {/* Top-Left BRAND wordmark */}
        <Link to={paths.home()} className="flex items-center gap-2 cursor-pointer group">
          <div className="w-9 h-9 rounded-lg bg-[#B85037] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <Leaf className="w-5 h-5 fill-white" />
          </div>
          <span className="font-serif text-xl sm:text-2xl font-black text-[#B85037] tracking-tight group-hover:opacity-90 transition-opacity">
            Nguyễn Việt Lộc
          </span>
        </Link>

        {/* Nav Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-5 text-[#4F433A] font-sans font-bold text-sm">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `hover:text-[#B85037] transition-colors cursor-pointer py-1 border-b-2 ${
                  isActive ? "border-[#B85037] text-[#B85037]" : "border-transparent"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Interactive Search Bar & Mobile Menu toggle */}
        <div className="flex items-center gap-3">
          <SearchBar variant="desktop" />

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#4F433A] hover:text-[#B85037]"
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
