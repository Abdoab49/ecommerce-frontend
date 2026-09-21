import React, { useState } from 'react';
import styles from './Slider.module.css';

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    { id: 0, src: "Assets/ShoeStore/background2.png", alt: "First slide" },
    { id: 1, src: "Assets/ShoeStore/background3.png", alt: "Second slide" },
    { id: 2, src: "Assets/ShoeStore/background4.png", alt: "Third slide" }
  ];

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
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
      <div className={styles.sliderInner}>
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`${styles.sliderItem} ${activeIndex === slide.id ? styles.active : ''}`}
          >
            <img className={styles.sliderImage} src={slide.src} alt={slide.alt} />
          </div>
        ))}
      </div>

      {/* Controls */}
      <button className={`${styles.sliderControl} ${styles.prev}`} onClick={prevSlide}>
        ‹
      </button>
      <button className={`${styles.sliderControl} ${styles.next}`} onClick={nextSlide}>
        ›
      </button>
    </div>
  );
};

export default Slider;