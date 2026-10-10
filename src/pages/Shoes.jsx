// src/pages/Shoes.jsx
import React, { useState } from 'react';
import ShoeCard from '../Components/ShoeCard/ShoeCard';
import './CSS/Shoes.css';

const Shoes = () => {
  const [sortOption, setSortOption] = useState('default');

  return (
    <div className="shoes-page">
      <div className="shoes-header">
        <div className="shoes-banner">
          <img src="/Assets/ShoeStore/background8.png" alt="Shoes Collection" className="banner-img" />
        </div>
      </div>

      <div className="shoes-content">
        <div className="shoes-sort-bar">
          <p>Showing products</p>
          <div className="shoes-sort">
            <label htmlFor="shoes-sort-select">Sort by</label>
            <select
              id="shoes-sort-select"
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

        <ShoeCard sortOption={sortOption} />
      </div>
    </div>
  );
};

export default Shoes;