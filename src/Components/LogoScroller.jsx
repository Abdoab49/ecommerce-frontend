import React, { useEffect, useRef } from 'react';
import styles from './LogoScroller.module.css';

const LogoScroller = () => {
  const scrollerRef = useRef(null);

  // قائمة الشعارات من مجلد Assets/Logo/
  const logos = [
    '/Assets/Logo/logo1.png',
    '/Assets/Logo/logo2.png',
    '/Assets/Logo/logo3.png',
    '/Assets/Logo/logo4.png',
    '/Assets/Logo/logo5.png',
    '/Assets/Logo/logo6.png',
    '/Assets/Logo/logo7.png',
    '/Assets/Logo/logo8.png',
    '/Assets/Logo/logo9.png',
  ];

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    // مسح المحتوى الحالي
    scroller.innerHTML = '';

    // إنشاء نسخ مكررة من الشعارات
    const totalLogos = logos.length;
    const doubledLogos = [...logos, ...logos];

    doubledLogos.forEach((logoUrl, index) => {
      const logoDiv = document.createElement('div');
      logoDiv.className = styles.logo;
      logoDiv.innerHTML = `<img src="${logoUrl}" alt="Logo ${index + 1}" loading="lazy" />`;
      scroller.appendChild(logoDiv);
    });

    // حساب العرض الكلي
    const logoWidth = 100;
    const logoMargin = 10;
    const logosWidth = totalLogos * (logoWidth + logoMargin);
    scroller.style.width = `${logosWidth * 2}px`;

    // تنظيف عند إزالة المكون
    return () => {
      scroller.innerHTML = '';
    };
  }, [logos]);

  return (
    <div className={styles.scrollerContainer}>
      <div className={styles.scroller} ref={scrollerRef}></div>
    </div>
  );
};

export default LogoScroller;