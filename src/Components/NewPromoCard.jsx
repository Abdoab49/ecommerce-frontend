import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PromoCard.module.css';

const NewPromoCard = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/shoes');
  };

  return (
    <div 
      className={styles.promoCard}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <img 
        className={styles.cardImg} 
        src="/Assets/ShoeStore/background8.png" 
        alt="Shoes Collection"
      />
      <div className={styles.cardImgOverlay}>
        <h5 className={styles.cardTitle}>SHOES</h5>
        <p className={styles.cardText}>
          High Quality
        </p>
      </div>
    </div>
  );
};

export default NewPromoCard;