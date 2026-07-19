import React, { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { HERBS_DATA } from "../../lib/data";
import { HerbalMedicine } from "../../types";
import { paths } from "../../lib/paths";

interface SearchBarProps {
  variant?: "desktop" | "mobile";
  // Gọi sau khi điều hướng để đóng menu mobile chẳng hạn.
  onNavigate?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ variant = "desktop", onNavigate }) => {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [results, setResults] = useState<HerbalMedicine[]>([]);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (q.length > 0) {
      setResults(
        HERBS_DATA.filter(
          (h) =>
            h.name.toLowerCase().includes(q) ||
            h.scientificName.toLowerCase().includes(q) ||
            h.shortDesc.toLowerCase().includes(q)
        )
      );
    } else {
      setResults([]);
    }
  }, [query]);

  // Reset ô tìm + đóng dropdown sau khi bấm một kết quả (điều hướng do <Link> lo).
  const onPick = () => {
    setQuery("");
    setShowDropdown(false);
    onNavigate?.();
  };

  if (variant === "mobile") {
    return (
      <div className="relative">
        <input
          type="text"
          placeholder="Tìm giá cây thuốc..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-[#FAF6F0] border border-[#E6DDD0] text-[#2D2521] placeholder-gray-400 rounded-lg pl-9 pr-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-[#B85037]"
        />
        <Search className="absolute left-3 top-3.5 w-4.5 h-4.5 text-gray-400" />
        {query.trim().length > 0 && (
          <div className="bg-white border border-[#E6DDD0] rounded-lg mt-2 p-2 shadow-lg max-h-40 overflow-y-auto text-left">
            {results.map((h) => (
              <Link
                key={h.id}
                to={paths.herb(h.slug)}
                onClick={onPick}
                className="block p-2 hover:bg-gray-100 cursor-pointer text-sm font-bold text-[#4F433A]"
              >
                {h.name} ({h.priceRange})
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative hidden sm:block w-56">
      <input
        type="text"
        placeholder="Tìm giá cây thuốc..."
        value={query}
        onFocus={() => setShowDropdown(true)}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-white/10 border border-white/25 text-white placeholder-white/50 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-earth focus:bg-white/15 transition-all"
      />
      <Search className="absolute left-3 top-2.5 w-4 h-4 text-white/50" />

      {showDropdown && query.trim().length > 0 && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-[#E6DDD0] rounded-xl shadow-xl z-50 overflow-hidden">
          <div className="bg-[#FAF8F5] px-3 py-2 text-xs font-bold text-[#4F433A] border-b border-[#F0EAE1] flex justify-between items-center">
            <span>Kết quả tìm kiếm ({results.length})</span>
            <button onClick={() => setShowDropdown(false)} className="text-gray-400 hover:text-gray-600">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="max-h-60 overflow-y-auto divide-y divide-[#F5EFE6]">
            {results.length > 0 ? (
              results.map((herb) => (
                <Link
                  key={herb.id}
                  to={paths.herb(herb.slug)}
                  onClick={onPick}
                  className="block p-3 hover:bg-[#FAF6F0] cursor-pointer transition-colors text-left"
                >
                  <div className="font-sans font-bold text-sm text-[#4F433A]">{herb.name}</div>
                  <div className="text-xs text-[#B85037] font-mono mt-0.5">{herb.priceRange}</div>
                </Link>
              ))
            ) : (
              <div className="p-4 text-center text-xs text-gray-400 italic">Không tìm thấy dược liệu cần tìm.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
