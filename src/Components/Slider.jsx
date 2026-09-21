import styles from './Slider.module.css';
import React, { useState } from 'react';
import './Slider.module.css';

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
    <div className={slider}>
      {/* Indicators */}
      <div className={sliderIndicators}>
        {slides.map((slide) => (
          <button
            key={slide.id}
            className={`${indicator} ${activeIndex === slide.id ? active : ''}`}
            onClick={() => goToSlide(slide.id)}
          />
        ))}
      </div>

      {/* Slider Inner */}
      <div className={sliderInner}>
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`${sliderItem} ${activeIndex === slide.id ? active : ''}`}
          >
            <img className={sliderImage} src={slide.src} alt={slide.alt} />
          </div>
        ))}
      </div>

      {/* Controls */}
      <button className={`${sliderControl} ${prev}`} onClick={prevSlide}>
        ‹
      </button>
      <button className={`${sliderControl} ${next}`} onClick={nextSlide}>
        ›
      </button>
    </div>
  );
};

export default Slider;