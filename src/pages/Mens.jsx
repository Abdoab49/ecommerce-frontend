import React from 'react';
import ShoeStore from '../Components/ShoeStore';
import ShoesCard from '../Components/ShoesCard';   // ✅ المسار الصحيح
import './CSS/Mens.css';

const Mens = () => {
  return (
    <div className="mens-page">
      <div className="mens-header">
        <div className="mens-banner">
          <img 
            src="/Assets/ShoeStore/background2.png" 
            alt="Men Collection"
            className="banner-img"
          />
        </div>

        <div className="mens-overlay">
          <h1>MEN</h1>
          <p>Premium Men's Collection</p>
        </div>
      </div>

      <div className="mens-content">
        <h2>Nos T-Shirts</h2>
        <ShoeStore />
      </div>

      {/* ✅ ShoesCard — تحت الكروت */}
      <div className="mens-shoescard">
        <ShoesCard />
      </div>
    </div>
  );
};

export default Mens;