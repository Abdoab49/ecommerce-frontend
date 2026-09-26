import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BannerCard.module.css';

const BannerCard = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/kids');   // ← CASQUETTE
  };

  return (
    <div 
      className={styles.bannerCard}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
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