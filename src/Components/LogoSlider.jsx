
import React from 'react';
import styles from './LogoSlider.module.css';

const firstRowImages = [
    '/Assets/ShoeStore/logo1.png',
    '/Assets/ShoeStore/logo2.png',
    '/Assets/ShoeStore/logo3.png',
    '/Assets/ShoeStore/logo4.png',
    '/Assets/ShoeStore/logo5.png',
    '/Assets/ShoeStore/logo6.png',
    '/Assets/ShoeStore/logo7.png',
];

const secondRowImages = [
    '/Assets/ShoeStore/logo8.png',
    '/Assets/ShoeStore/logo9.png',
    '/Assets/ShoeStore/logo10.png',
    '/Assets/ShoeStore/logo11.png',
    '/Assets/ShoeStore/logo12.png',
];

/**
 * Renders one continuous, responsive logo marquee.
 */
const LogoRow = ({ images, reverse = false, rowLabel }) => {
    return (
        <div
            className={styles.slider}
            role="group"
            aria-label={rowLabel}
        >
            <div
                className={`${styles.sliderTrack} ${
                    reverse ? styles.reverse : ''
                }`}
            >
                {/* Original logos */}
                <div className={styles.sliderGroup}>
                    {images.map((image, index) => (
                        <div
                            className={styles.sliderItem}
                            key={`${image}-${index}`}
                        >
                            <img
                                src={image}
                                alt={`Brand logo ${index + 1}`}
                                loading="lazy"
                                decoding="async"
                                draggable="false"
                            />
                        </div>
                    ))}
                </div>

                {/* Duplicate logos for seamless animation */}
                <div
                    className={styles.sliderGroup}
                    aria-hidden="true"
                >
                    {images.map((image, index) => (
                        <div
                            className={styles.sliderItem}
                            key={`duplicate-${image}-${index}`}
                        >
                            <img
                                src={image}
                                alt=""
                                loading="lazy"
                                decoding="async"
                                draggable="false"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const LogoSlider = () => {
    return (
        <section
            className={styles.logoSliderSection}
            aria-label="Our brands"
        >
            <div className={styles.sliderHeading}>
                <span className={styles.headingLine} />

                <span className={styles.headingText}>
                    DISCOVER OUR BRANDS
                </span>

                <span className={styles.headingLine} />
            </div>

            <div className={styles.sliderRows}>
                <LogoRow
                    images={firstRowImages}
                    rowLabel="Brand logos row one"
                />

                <LogoRow
                    images={secondRowImages}
                    reverse
                    rowLabel="Brand logos row two"
                />
            </div>
        </section>
    );
};

export default LogoSlider;
