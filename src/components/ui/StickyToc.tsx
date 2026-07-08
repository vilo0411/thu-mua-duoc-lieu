import React from "react";

interface TocItem {
  id: string;
  label: string;
}

export const StickyToc: React.FC<{ items: TocItem[]; activeId: string; onSelect: (id: string) => void }> = ({
  items,
  activeId,
  onSelect
}) => {
  return (
    <div className="bg-white border border-[#E6DDD0] rounded-xl p-5 sticky top-24 shadow-xs">
      <h4 className="font-sans font-bold text-sm text-[#4F433A] uppercase tracking-wider mb-4 pb-2 border-b border-[#F5EFE6]">
        Mục lục bài viết
      </h4>
      <nav className="space-y-3">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`block w-full text-left text-sm font-sans py-1.5 px-3 rounded-md transition-colors border-l-2 cursor-pointer ${
                isActive
                  ? "border-[#B85037] text-[#B85037] bg-[#FDF5F2] font-semibold"
                  : "border-transparent text-gray-600 hover:text-[#B85037] hover:bg-gray-50"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="mt-6 pt-5 border-t border-[#F5EFE6] text-xs text-gray-400">
        Tổng hợp bởi <strong className="text-gray-500">Nguyễn Viết Lộc</strong>.
      </div>
    </div>
  );
};
