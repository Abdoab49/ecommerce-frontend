
import React from 'react';
import './Carousel.css';

const textItems = [
    'The best Quality You Can Get ❤️‍🔥',
    'Good Prices ✌🏻',
    'Sale 💯',
    'Latest Models 🥶',
    'New Modul 😍'
];

const Carousel = () => {
    return (
        <div
            className="ticker-container"
            aria-label="LANADA store highlights"
        >
            <div className="ticker-track">

                {/* Original items */}
                {textItems.map((item, index) => (
                    <div
                        className="ticker-item"
                        key={`original-${index}`}
                    >
                        {item}
                    </div>
                ))}

                {/* Duplicate items for seamless animation */}
                {textItems.map((item, index) => (
                    <div
                        className="ticker-item"
                        key={`duplicate-${index}`}
                        aria-hidden="true"
                    >
                        {item}
                    </div>
                ))}

            </div>
        </div>
    );
};

export default Carousel;
