import React from 'react';

import './Carousel.css';

const textItems = [
    "🔥 NEW COLLECTIONS",
    "✨ LATEST ARRIVALS",
    "🚀 LIMITED OFFER",
    "🌟 FREE SHIPPING",
    "🎉 SALE 50%"
];

const Carousel = () => {

    const repeatedItems = [...textItems, ...textItems, ...textItems, ...textItems];

    return (

        <div className="ticker-container">

            <div className="ticker-track">

                {repeatedItems.map((item, index) => (
                    <div className="ticker-item" key={index}>
                        {item}
                    </div>
                ))}

            </div>

        </div>
    );
};

export default Carousel;