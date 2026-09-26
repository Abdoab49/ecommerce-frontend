import { useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation();
  const prevLocation = useRef('');

  useLayoutEffect(() => {
    // ✅ مفتاح فريد لكل navigation
    const currentKey = location.pathname + (location.state?.product?.id || '');

    // ✅ Shop (/) — ما كيديرش شي حاجة
    if (location.pathname === '/') {
      prevLocation.current = currentKey;
      return;
    }

    // ✅ إلا كان نفس location → ما كيديرش شي حاجة
    if (prevLocation.current === currentKey) return;

    // ✅ scroll فوري بلا animation
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });

    // ✅ احتياط للمتصفحات
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    prevLocation.current = currentKey;
  }, [location]);

  return null;
};

export default ScrollToTop;