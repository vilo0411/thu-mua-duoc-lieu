import React from "react";
import { BookOpen, Home, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { paths } from "../lib/paths";
import { Seo } from "../lib/seo";

export const NotFoundPage: React.FC = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto text-center py-16 space-y-6">
      <Seo
        title="Không tìm thấy trang (404)"
        description="Đường dẫn không tồn tại hoặc đã thay đổi."
        path="/404"
        noindex
      />
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#F5ECE1] text-[#B85037]">
        <Leaf className="w-10 h-10" />
      </div>
      <div className="space-y-2">
        <h1 className="font-serif text-5xl font-extrabold text-[#B85037]">404</h1>
        <h2 className="font-serif text-2xl font-bold text-[#4F433A]">Không tìm thấy trang bà con cần</h2>
        <p className="text-gray-600 font-sans max-w-md mx-auto">
          Đường dẫn có thể đã thay đổi hoặc không tồn tại. Bà con thử quay về trang chủ hoặc xem danh mục dược liệu bên dưới.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
        <Link
          to={paths.home()}
          className="inline-flex items-center justify-center gap-2 bg-[#B85037] hover:bg-[#9F3E28] text-white font-sans font-bold px-6 py-3 rounded-lg shadow-md transition-colors"
        >
          <Home className="w-5 h-5" />
          Về trang chủ
        </Link>
        <Link
          to={paths.herbCatalog()}
          className="inline-flex items-center justify-center gap-2 bg-white border border-[#E6DDD0] hover:border-[#B85037] text-[#4F433A] hover:text-[#B85037] font-sans font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          <Leaf className="w-5 h-5" />
          Danh mục cây thuốc
        </Link>
        <Link
          to={paths.knowledge()}
          className="inline-flex items-center justify-center gap-2 bg-white border border-[#E6DDD0] hover:border-[#B85037] text-[#4F433A] hover:text-[#B85037] font-sans font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          <BookOpen className="w-5 h-5" />
          Kiến thức
        </Link>
      </div>
    </div>
  );
};
