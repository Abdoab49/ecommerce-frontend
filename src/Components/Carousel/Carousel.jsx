import React from 'react';

import './Carousel.css';

const textItems = [
    "The best Quality You Can Get❤️‍🔥",
    "Good Prices✌🏻",
    "Sale💯",
    "Latest Models🥶",
    "dima raja😍"
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