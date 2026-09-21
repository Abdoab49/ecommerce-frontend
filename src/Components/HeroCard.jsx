import React from 'react';
import './OverlayCard.module.css'; // ✅ نفس ملف CSS

const HeroCard = () => {
  return (
    <div className={`${styles.card} ${styles.bgDark} ${styles.textWhite}`}>
      <img 
        className={styles.cardImg} 
        src="/Assets/ShoeStore/background10.png" 
        alt="background" 
      />
      <div className={styles.cardImgOverlay}>
        <h5 className={styles.cardTitle}></h5>
        <p className={styles.cardText}>
            Welcome to Lanada Shop, where you'll find all kinds of sportswear and trendy youth outfits.
        </p>
        <p className={styles.cardText}>2026</p>
      </div>
    </div>
  );
};

export default HeroCard;