import styles from './NewOverlayCard.module.css';
import React from 'react';
import './NewOverlayCard.module.css';

const NewOverlayCard = () => {
  return (
    <div className={`${card} ${bgDark} ${textWhite}`}>
      <img 
        className={cardImg} 
        src="/Assets/ShoeStore/background7.png" 
        alt="background" 
      />
      <div className={cardImgOverlay}>
        <p className={cardText}>
            All shorts available right here
        </p>
        <p className={cardText}>SHORT</p>
      </div>
    </div>
  );
};

export default NewOverlayCard;