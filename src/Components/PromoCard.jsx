import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PromoCard.module.css';

const PromoCard = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/mens');   // ✅ melli tkliki, tmchi l /mens
  };

  return (
    <div 
      className={styles.promoCard}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <img 
        className={styles.cardImg} 
        src="/Assets/ShoeStore/background6.png" 
        alt="Collection banner"
      />
      <div className={styles.cardImgOverlay}>
        <h5 className={styles.cardTitle}>LANADA SHOP</h5>
        <p className={styles.cardText}>High Quality</p>
      </div>
    </div>
  );
};

export default PromoCard;