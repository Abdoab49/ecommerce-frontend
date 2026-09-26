import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // ✅ كيرجع للفوق غير فـ الصفحات (ماشي Shop)
    if (pathname === '/') return;

    // ✅ بلا animation، فوري
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;