import React from "react";
import { NavLink } from "react-router-dom";
import { NAV_ITEMS } from "./navItems";
import { SearchBar } from "./SearchBar";

interface MobileNavProps {
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ onClose }) => {
  return (
    <div className="lg:hidden bg-[#FDFBF7] border-t border-[#E6DDD0] py-4 px-6 space-y-4 animate-fade-in shadow-md absolute left-0 right-0">
      {/* Mobile Search input */}
      <SearchBar variant="mobile" onNavigate={onClose} />

      <nav className="flex flex-col gap-4 text-base font-bold text-[#4F433A] text-left">
        {NAV_ITEMS.map((item, idx) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onClose}
            className={`py-2 hover:text-[#B85037] text-left cursor-pointer ${
              idx < NAV_ITEMS.length - 1 ? "border-b border-[#F5EFE6]" : ""
            }`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
