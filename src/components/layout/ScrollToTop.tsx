import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Cuộn lên đầu trang mỗi khi đổi route (thay cho window.scrollTo trong navigateTo cũ).
export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};
