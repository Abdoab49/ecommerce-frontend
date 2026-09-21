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
        <h5 className={styles.cardTitle}>Collection Printemps/Été 2026</h5>
        <p className={styles.cardText}>
          Découvrez notre nouvelle collection de casquettes tendance. 
          Styles modernes et confortables pour tous les goûts.
        </p>
        <p className={styles.cardTextSmall}>Mis à jour aujourd'hui</p>
      </div>
    </div>
  );
};

export default BannerCard;