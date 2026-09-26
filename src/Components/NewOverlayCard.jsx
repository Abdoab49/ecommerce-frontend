import styles from './NewOverlayCard.module.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NewOverlayCard = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/womens');
  };

  return (
    <div 
      className={`${styles.card} ${styles.bgDark} ${styles.textWhite}`}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <img 
        className={styles.cardImg} 
        src="/Assets/ShoeStore/background7.png" 
        alt="background" 
      />
      <div className={styles.cardImgOverlay}>
        <p className={styles.cardText}>
          All jackets available right here
        </p>
        <p className={styles.cardText}>JACKETS</p>
      </div>
    </div>
  );
};

export default NewOverlayCard;