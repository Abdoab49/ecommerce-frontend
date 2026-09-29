import React, { useState } from 'react';
import NewShoeStore from '../Components/NewShoeStore';
import './CSS/Jackets.css';

const Jackets = () => {
  const [sortOption, setSortOption] = useState('default');

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
        <div className="jackets-sort-bar">
          <p>Showing products</p>
          <div className="jackets-sort">
            <label htmlFor="jackets-sort-select">Sort by</label>
            <select
              id="jackets-sort-select"
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

        <NewShoeStore sortOption={sortOption} />
      </div>
    </div>
  );
};

export default Jackets;