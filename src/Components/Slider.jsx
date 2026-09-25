import React, { useState, useEffect, useRef } from 'react';
import styles from './Slider.module.css';

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const slides = [
    { id: 0, src: "/Assets/ShoeStore/background2.png", alt: "First slide" },
    { id: 1, src: "/Assets/ShoeStore/background3.png", alt: "Second slide" },
    { id: 2, src: "/Assets/ShoeStore/background4.png", alt: "Third slide" }
  ];

  // ✅ 1. Auto-play — كيتبدل كل 4 ثواني
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  // ✅ 2. Swipe باللمس
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const distance = touchStartX.current - touchEndX.current;
    const minSwipe = 50; // ✅ الحد الأدنى للـ swipe

    if (distance > minSwipe) {
      // ✅ Swipe يسار → الصورة الجاية
      setActiveIndex((prev) => (prev + 1) % slides.length);
    } else if (distance < -minSwipe) {
      // ✅ Swipe يمين → الصورة السابقة
      setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  return (
    <div className={styles.slider}>
      {/* Indicators */}
      <div className={styles.sliderIndicators}>
        {slides.map((slide) => (
          <button
            key={slide.id}
            className={`${styles.indicator} ${activeIndex === slide.id ? styles.active : ''}`}
            onClick={() => goToSlide(slide.id)}
          />
        ))}
      </div>

      {/* Slider Inner */}
      <div
        className={styles.sliderInner}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`${styles.sliderItem} ${activeIndex === slide.id ? styles.active : ''}`}
          >
            <img className={styles.sliderImage} src={slide.src} alt={slide.alt} />
          </div>
        ))}
      </div>

      {/* ❌ حيدنا الأزرار (‹ ›) */}
    </div>
  );
};

export default Slider;