import styles from './OverlayCard.module.css';
import React from 'react';
import './OverlayCard.module.css';

const OverlayCard = () => {
  return (
    <div className={`${card} ${bgDark} ${textWhite}`}>
      <img 
        className={cardImg} 
        src="/Assets/ShoeStore/background1.png" 
        alt="background" 
      />
      <div className={cardImgOverlay}>
        <h5 className={cardTitle}>JERSEYS</h5>
        <p className={cardText}>
            Welcome to our store, where you can find all the national team jerseys for the 2026 World Cup.
        </p>
        <p className={cardText}>2026</p>
      </div>
    </div>
  );
};

export default OverlayCard;