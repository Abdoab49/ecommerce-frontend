import React, { useState } from 'react';
import SimpleCard from '../Components/SimpleCard';
import './CSS/Casquette.css';

const Casquette = () => {
  const [sortOption, setSortOption] = useState('default');

  return (
    <div className="casquette-page">
      <div className="casquette-header">
        <div className="casquette-banner">
          <img
            src="/Assets/ShoeStore/background5.png"
            alt="Casquette Collection"
            className="banner-img"
          />
        </div>

        <div className="casquette-overlay">
          <h1>CASQUETTE</h1>
          <p>Premium Caps Collection</p>
        </div>
      </div>

      <div className="casquette-content">
        <div className="casquette-sort-bar">
          <p>Showing products</p>
          <div className="casquette-sort">
            <label htmlFor="casquette-sort-select">Sort by</label>
            <select
              id="casquette-sort-select"
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

        <SimpleCard sortOption={sortOption} />
      </div>
    </div>
  );
};

export default Casquette;