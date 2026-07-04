import React from "react";
import { NavLink } from "react-router-dom";
import { NAV_ITEMS } from "./navItems";
import { SearchBar } from "./SearchBar";
import { AccessibilityBar } from "../ui";

interface MobileNavProps {
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ onClose }) => {
  return (
    <div className="lg:hidden bg-pine-900 border-t border-white/10 py-4 px-6 space-y-4 animate-fade-in shadow-md absolute left-0 right-0">
      {/* Mobile Search input */}
      <SearchBar variant="mobile" onNavigate={onClose} />

      <nav className="flex flex-col gap-4 text-base font-bold text-white/80 text-left">
        {NAV_ITEMS.map((item, idx) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onClose}
            className={({ isActive }) =>
              `py-2 text-left cursor-pointer hover:text-white ${isActive ? "text-earth" : ""} ${
                idx < NAV_ITEMS.length - 1 ? "border-b border-white/10" : ""
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="pt-2 border-t border-white/10">
        <AccessibilityBar tone="dark" />
      </div>
    </div>
  );
};
