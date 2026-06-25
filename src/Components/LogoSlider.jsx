import React from 'react';
import styles from './LogoSlider.module.css';

const LogoSlider = () => {
  // مصفوفة الصور للشريط الأول (مسار مباشر)
  const images = [
    '/Assets/ShoeStore/logo1.png',
    '/Assets/ShoeStore/logo2.png',
    '/Assets/ShoeStore/logo3.png',
    '/Assets/ShoeStore/logo4.png',
    '/Assets/ShoeStore/logo5.png',
    '/Assets/ShoeStore/logo6.png',
    '/Assets/ShoeStore/logo7.png'
  ];
  
  // مصفوفة الصور للشريط الثاني
  const images2 = [
    '/Assets/ShoeStore/logo8.png',
    '/Assets/ShoeStore/logo9.png',
    '/Assets/ShoeStore/logo10.png',
    '/Assets/ShoeStore/logo11.png',
    '/Assets/ShoeStore/logo12.png'
  ];

  return (
    <>
      {/* الشريط الأول */}
      <div className={styles.slider} style={{ '--items': images.length }}>
        <div className={styles.sliderTrack}>
          {images.map((img, index) => (
            <div 
              key={index} 
              className={styles.sliderItem} 
              style={{ '--index': index + 1 }}
            >
              <img src={img} alt="" />
            </div>
          ))}
        </div>
      </div>

      {/* الشريط الثاني (عكسي) */}
      <div className={styles.slider} style={{ '--items': images2.length }} data-reverse>
        <div className={styles.sliderTrack}>
          {images2.map((img, index) => (
            <div 
              key={index} 
              className={styles.sliderItem} 
              style={{ '--index': index + 1 }}
            >
              <img src={img} alt="" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LogoSlider;