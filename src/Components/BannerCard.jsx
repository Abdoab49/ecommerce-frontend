import React from 'react';
import styles from './BannerCard.module.css';

const BannerCard = () => {
  return (
    <div className={styles.bannerCard}>
      <img 
        className={styles.cardImg} 
        src="/Assets/ShoeStore/background5.png" 
        alt="Collection banner"
      />
      <div className={styles.cardImgOverlay}>
        <h5 className={styles.cardTitle}>High quality caps</h5>
        <p className={styles.cardText}>
          CASQUETTE
        </p>
      </div>
    </div>
  );
};

export default BannerCard;