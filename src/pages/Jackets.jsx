
import React, { useState } from 'react';

import NewShoeStore from '../Components/NewShoeStore';
import ProductSort from '../Components/ProductSort/ProductSort';

import './CSS/Jackets.css';

const Jackets = () => {
    const [sortOption, setSortOption] = useState('default');

    return (
        <div className="jackets-page">

            <div className="jackets-header">
                <div className="jackets-banner">
                    <img
                        src="/Assets/ShoeStore/background7.png"
                        alt="Jackets Collection"
                        className="banner-img"
                    />
                </div>
            </div>

            <div className="jackets-content">

                <ProductSort
                    value={sortOption}
                    onChange={setSortOption}
                    className="product-sort--jackets"
                />

                <NewShoeStore sortOption={sortOption} />

            </div>
        </div>
    );
};

export default Jackets;
