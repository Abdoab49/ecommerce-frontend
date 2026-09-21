import styles from './BannerCard.module.css';
import React from 'react';
import './BannerCard.module.css';

const BannerCard = () => {
  return (
    <div className={bannerCard}>
      <img 
        className={cardImg} 
        src="/Assets/ShoeStore/background5.png" 
        alt="Collection banner"
      />
      <div className={cardImgOverlay}>
        <h5 className={cardTitle}>Collection Printemps/Été 2026</h5>
        <p className={cardText}>
          Découvrez notre nouvelle collection de casquettes tendance. 
          Styles modernes et confortables pour tous les goûts.
        </p>
        <p className={cardTextSmall}>Mis à jour aujourd'hui</p>
      </div>
    </div>
  );
};

export default BannerCard;