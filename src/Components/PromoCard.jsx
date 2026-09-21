import styles from './PromoCard.module.css';
import React from 'react';
import './PromoCard.module.css';

const PromoCard = () => {
  return (
    <div className={promoCard}>
      <img 
        className={cardImg} 
        src="/Assets/ShoeStore/background6.png" 
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

export default PromoCard;