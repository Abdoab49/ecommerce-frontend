
import React from 'react';
import styles from './Sliders.module.css';

const slides = [
  {
    id: 0,
    src: '/Assets/ShoeStore/slider.png',
    alt: 'First slide'
  },
  {
    id: 1,
    src: '/Assets/ShoeStore/slider1.png',
    alt: 'Second slide'
  },
  {
    id: 2,
    src: '/Assets/ShoeStore/slider2.png',
    alt: 'Third slide'
  }
];

const Slider = () => {
  return (
    <section className={styles.slider}>
      <div className={styles.sliderInner}>
        <div className={styles.sliderTrack}>
          {slides.map((slide) => (
            <div className={styles.sliderItem} key={slide.id}>
              <img
                className={styles.sliderImage}
                src={slide.src}
                alt={slide.alt}
                draggable="false"
              />
            </div>
          ))}

          {slides.map((slide) => (
            <div
              className={styles.sliderItem}
              key={`duplicate-${slide.id}`}
              aria-hidden="true"
            >
              <img
                className={styles.sliderImage}
                src={slide.src}
                alt=""
                draggable="false"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Slider;
