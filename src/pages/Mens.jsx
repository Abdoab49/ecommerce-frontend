import React, { useState } from 'react';
import ShoeStore from '../Components/ShoeStore';
import './CSS/Mens.css';

const Mens = () => {
  const [sortOption, setSortOption] = useState('default');

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
        <div className="mens-sort-bar">
          <p>
            Showing <span>{/* عدد */}</span> products
          </p>
          <div className="mens-sort">
            <label htmlFor="mens-sort-select">Sort by</label>
            <select
              id="mens-sort-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A → Z</option>
              <option value="name-desc">Name: Z → A</option>
            </select>
          </div>
        </div>

        <ShoeStore sortOption={sortOption} />
      </div>
    </div>
  );
};

export default Mens;