import React from 'react';
import styles from './PromoCard.module.css';

const PromoCard = () => {
  return (
    <div className={styles.promoCard}>
      <img 
        className={styles.cardImg} 
        src="/Assets/ShoeStore/background6.png" 
        alt="Collection banner"
      />
      <div className={styles.cardImgOverlay}>
        <h5 className={styles.cardTitle}>LANADA SHOP</h5>
        <p className={styles.cardText}>
          High Quality
        </p>
      </div>
    </div>
  );
};

export default PromoCard;