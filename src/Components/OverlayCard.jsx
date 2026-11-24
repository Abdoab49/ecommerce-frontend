import React from 'react';
import styles from './OverlayCard.module.css';

const OverlayCard = () => {
  return (
    <div className={`${styles.card} ${styles.bgDark} ${styles.textWhite}`}>
      <img 
        className={styles.cardImg} 
        src="/Assets/ShoeStore/background10.png" 
        alt="background" 
      />
      <div className={styles.cardImgOverlay}>
      </div>
    </div>
  );
};

export default OverlayCard;