import React, { useState } from 'react';
import ShoeStore from '../Components/ShoeStore';
import ShoesCard from '../Components/ShoesCard';
import './CSS/Mens.css';

const Mens = () => {
  const [sortOption, setSortOption] = useState('default');

  return (
    <div className="mens-page">
      <div className="mens-header">
        <div className="mens-banner">
          <img
            src="/Assets/ShoeStore/background6.png"
            alt="Men Collection"
            className="banner-img"
          />
        </div>
      </div>

      <div className="mens-content">
        {/* ===== "Showing products" + Sort by — ghir wa7ed ===== */}
        <div className="mens-sort-bar">
          <p>Showing products</p>
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

        {/* ===== Bjoj kaykhdmo b nafs sortOption ===== */}
        <ShoeStore sortOption={sortOption} />
        <ShoesCard sortOption={sortOption} />
      </div>
    </div>
  );
};

export default Mens;