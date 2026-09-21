import React from 'react';
import styles from './OverlayCard.module.css';

const OverlayCard = () => {
  return (
    <div className={`${styles.card} ${styles.bgDark} ${styles.textWhite}`}>
      <img 
        className={styles.cardImg} 
        src="/Assets/ShoeStore/background1.png" 
        alt="background" 
      />
      <div className={styles.cardImgOverlay}>
        <h5 className={styles.cardTitle}>JERSEYS</h5>
        <p className={styles.cardText}>
            Welcome to our store, where you can find all the national team jerseys for the 2026 World Cup.
        </p>
        <p className={styles.cardText}>2026</p>
      </div>
    </div>
  );
};

export default OverlayCard;