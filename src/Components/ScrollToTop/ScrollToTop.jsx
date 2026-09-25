import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    // ✅ إلا كان نفس pathname → ما كيديرش شي حاجة
    if (prevPathname.current === pathname) return;

    // ✅ إلا كان Shop → ما كيديرش شي حاجة
    if (pathname === '/') {
      prevPathname.current = pathname;
      return;
    }

    // ✅ غير فـ الصفحات الأخرى → كيرجع للفوق
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });

    prevPathname.current = pathname;
  }, [pathname]);

  return null;
};

export default ScrollToTop;