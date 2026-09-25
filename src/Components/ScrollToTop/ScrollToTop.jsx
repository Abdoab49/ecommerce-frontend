import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    // ✅ غير ملي كيتبدل pathname فعلاً
    if (prevPathname.current === pathname) return;

    // ✅ Shop (/) ما كيرجعش للفوق
    if (pathname === '/') {
      prevPathname.current = pathname;
      return;
    }

    // ✅ scrollTo بلا animation (instant)
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