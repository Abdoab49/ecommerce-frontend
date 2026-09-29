import React from 'react';
import SimpleCard from '../Components/SimpleCard';   // ✅ المسار الصحيح
import './CSS/Casquette.css';

const Casquette = () => {
  return (
    <div className="casquette-page">
      <div className="casquette-header">
        {/* ✅ الصورة بوحدها */}
        <div className="casquette-banner">
          <img 
            src="/Assets/ShoeStore/background5.png" 
            alt="Casquette Collection"
            className="banner-img"
          />
        </div>

        {/* ✅ الكتابة فالفراغ الأسود */}
        <div className="casquette-overlay">
          <h1>CASQUETTE</h1>
          <p>Premium Caps Collection</p>
        </div>
      </div>

      <div className="casquette-content">
        <h2>Nos Casquettes</h2>
        <SimpleCard />
      </div>
    </div>
  );
};

export default Casquette;