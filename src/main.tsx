import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App.tsx';
import './index.css';

// basename khớp với Vite `base` (dev: "/", build GitHub Pages: "/thu-mua-duoc-lieu/").
const basename = import.meta.env.BASE_URL;

/**
 * Gỡ các thẻ SEO do prerender bake sẵn (đánh dấu `data-ssg` trong scripts/prerender.ts)
 * TRƯỚC khi React mount. React 19 chỉ dedupe thẻ metadata do chính nó render — thẻ tĩnh
 * có sẵn trong HTML thì nó bơm chồng lên, sinh 2 <title>/canonical/description/OG trong
 * DOM (lỗi "defined multiple times" mà công cụ SEO chạy JS bắt được). Bot không chạy JS
 * vẫn đọc được bản tĩnh; bot có chạy JS thì thấy đúng một bộ do <Seo> render lại ngay sau.
 */
document.head.querySelectorAll('[data-ssg]').forEach((el) => el.remove());

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
