import { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const prevPathname = useRef(pathname);

  useLayoutEffect(() => {
    // ============================================
    // ✅ إلا كان Shop (/) — رجع البلاصة المحفوظة
    // ============================================
    if (pathname === '/') {
      const savedScroll = sessionStorage.getItem('shopScrollPosition');
      if (savedScroll) {
        // ✅ رجع للبلاصة المحفوظة
        window.scrollTo({
          top: parseInt(savedScroll, 10),
          left: 0,
          behavior: 'instant'
        });
      }
      prevPathname.current = pathname;
      return;
    }

    // ============================================
    // ✅ إلا كان نفس pathname → ما كيديرش شي حاجة
    // ============================================
    if (prevPathname.current === pathname) return;

    // ============================================
    // ✅ إلا كان خروج من Shop → خزن البلاصة
    // ============================================
    if (prevPathname.current === '/') {
      sessionStorage.setItem('shopScrollPosition', window.scrollY.toString());
    }

    // ============================================
    // ✅ باقي الصفحات → رجع للفوق
    // ============================================
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });

    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    prevPathname.current = pathname;
  }, [pathname]);

  return null;
};

export default ScrollToTop;