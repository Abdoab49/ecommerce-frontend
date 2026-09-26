import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    // ✅ ما كيديرش شي حاجة فـ Shop
    if (pathname === '/') return;

    // ✅ ما كيديرش شي حاجة إلا كان نفس pathname
    if (prevPathname.current === pathname) return;

    // ✅ استعمل requestAnimationFrame — أسرع من setTimeout
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });

    prevPathname.current = pathname;
  }, [pathname]);

  return null;
};

export default ScrollToTop;