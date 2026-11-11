
import React, { useState } from 'react';

import SimpleCard from '../Components/SimpleCard';
import ProductSort from '../Components/ProductSort/ProductSort';

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
            </div>

            <div className="casquette-content">

                <ProductSort
                    value={sortOption}
                    onChange={setSortOption}
                    className="product-sort--casquette"
                />

                <SimpleCard sortOption={sortOption} />

            </div>
        </div>
    );
};

export default Casquette;
