import React from 'react';
import NewShoeStore from '../Components/NewShoeStore';   // ⚠️ تأكد من المسار
import './CSS/Jackets.css';

const Jackets = () => {
  return (
    <div className="jackets-page">
      <div className="jackets-header">
        <div className="jackets-banner">
          <img 
            src="/Assets/ShoeStore/background3.png" 
            alt="Jackets Collection"
            className="banner-img"
          />
        </div>

        <div className="jackets-overlay">
          <h1>JACKETS</h1>
          <p>Premium Jackets Collection</p>
        </div>
      </div>

      <div className="jackets-content">
        <h2>Nos Jackets</h2>
        <NewShoeStore />
      </div>
    </div>
  );
};

export default Jackets;