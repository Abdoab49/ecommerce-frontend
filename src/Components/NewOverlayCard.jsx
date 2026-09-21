import styles from './NewOverlayCard.module.css';
import React from 'react';

const NewOverlayCard = () => {
  return (
    <div className={`${styles.card} ${styles.bgDark} ${styles.textWhite}`}>
      <img 
        className={styles.cardImg} 
        src="/Assets/ShoeStore/background7.png" 
        alt="background" 
      />
      <div className={styles.cardImgOverlay}>
        <p className={styles.cardText}>
          All shorts available right here
        </p>
        <p className={styles.cardText}>SHORT</p>
      </div>
    </div>
  );
};

export default NewOverlayCard;