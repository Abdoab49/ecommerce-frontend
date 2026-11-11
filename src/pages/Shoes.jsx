
import React, { useState } from 'react';

import ShoeCard from '../Components/ShoeCard/ShoeCard';
import ProductSort from '../Components/ProductSort/ProductSort';

import './CSS/Shoes.css';

const Shoes = () => {
    const [sortOption, setSortOption] = useState('default');

    return (
        <div className="shoes-page">

            <div className="shoes-header">
                <div className="shoes-banner">
                    <img
                        src="/Assets/ShoeStore/background8.png"
                        alt="Shoes Collection"
                        className="banner-img"
                    />
                </div>
            </div>

            <div className="shoes-content">

                <ProductSort
                    value={sortOption}
                    onChange={setSortOption}
                    className="product-sort--shoes"
                />

                <ShoeCard sortOption={sortOption} />

            </div>
        </div>
    );
};

export default Shoes;
