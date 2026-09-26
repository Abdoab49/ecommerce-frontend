import { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const prevPathname = useRef(pathname);

  useLayoutEffect(() => {
    // ✅ Shop (/) — ما كيديرش شي حاجة
    if (pathname === '/') return;

    // ✅ إلا كان نفس pathname → ما كيديرش شي حاجة
    if (prevPathname.current === pathname) return;

    // ✅ scroll فوري بلا animation
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });

    // ✅ احتياط للمتصفحات
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    prevPathname.current = pathname;
  }, [pathname]);

  return null;
};

export default ScrollToTop;