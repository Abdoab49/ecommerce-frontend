
import React from 'react';
import { getProductPrice } from '../Data/prices';
import styles from './SimpleCard.module.css';

const SimpleCard = ({ sortOption = 'default' }) => {

    // Calculate automatic discount
    const getDiscountPercentage = (oldPrice, price) => {
        const oldValue = Number(oldPrice);
        const newValue = Number(price);

        if (
            !Number.isFinite(oldValue) ||
            !Number.isFinite(newValue) ||
            oldValue <= 0 ||
            newValue < 0 ||
            oldValue <= newValue
        ) {
            return 0;
        }

        return Math.round(
            ((oldValue - newValue) / oldValue) * 100
        );
    };

    // PRODUCTS
    let cardsData = [
        {
            id: 61,
            imageSrc: '/Assets/casquette/casquette1.png',
            title: 'Casquette structurée Futura',
            description: 'Nike Dri-FIT Pro'
        },
        {
            id: 62,
            imageSrc: '/Assets/casquette/casquette2.png',
            title: 'Casquette Classic 99',
            description: 'Adidas Originals'
        },
        {
            id: 63,
            imageSrc: '/Assets/casquette/casquette3.png',
            title: 'Casquette Urban Style',
            description: 'Puma Flat Brim'
        },
        {
            id: 64,
            imageSrc: '/Assets/casquette/casquette4.png',
            title: 'Casquette Retro Sport',
            description: 'New Era 59FIFTY'
        },
        {
            id: 65,
            imageSrc: '/Assets/casquette/casquette1.png',
            title: 'Casquette Sport Pro',
            description: 'Nike Aerobill'
        },
        {
            id: 66,
            imageSrc: '/Assets/casquette/casquette2.png',
            title: 'Casquette Vintage Wash',
            description: 'Adidas Originals'
        },
        {
            id: 67,
            imageSrc: '/Assets/casquette/casquette3.png',
            title: 'Casquette Streetwear',
            description: 'Puma Essential'
        },
        {
            id: 68,
            imageSrc: '/Assets/casquette/casquette4.png',
            title: 'Casquette Snapback',
            description: 'New Era 9FORTY'
        },
        {
            id: 69,
            imageSrc: '/Assets/casquette/casquette1.png',
            title: 'Casquette Trucker',
            description: 'Nike Sportswear'
        },
        {
            id: 70,
            imageSrc: '/Assets/casquette/casquette2.png',
            title: 'Casquette Luxe',
            description: 'Adidas Premium'
        }
    ];

    // ADD PRICES
    cardsData = cardsData.map(card => {
        const priceData = getProductPrice(card.title) || {};

        return {
            ...card,
            price: Number(priceData.new_price) || 0,
            old_price: Number(priceData.old_price) || 0
        };
    });

    // SORT PRODUCTS
    if (sortOption === 'price-asc') {
        cardsData = [...cardsData].sort(
            (a, b) => a.price - b.price
        );
    } else if (sortOption === 'price-desc') {
        cardsData = [...cardsData].sort(
            (a, b) => b.price - a.price
        );
    } else if (sortOption === 'name-asc') {
        cardsData = [...cardsData].sort(
            (a, b) => a.title.localeCompare(b.title)
        );
    } else if (sortOption === 'name-desc') {
        cardsData = [...cardsData].sort(
            (a, b) => b.title.localeCompare(a.title)
        );
    }

    return (
        <section className={styles.cardsWrapper}>
            <div className={styles.cardsContainer}>

                {cardsData.map(card => {
                    const discount = getDiscountPercentage(
                        card.old_price,
                        card.price
                    );

                    return (
                        <article
                            key={card.id}
                            className={styles.card}
                        >
                            {/* PRODUCT IMAGE */}
                            <div className={styles.imageWrapper}>

                                <img
                                    className={styles.cardImgTop}
                                    src={card.imageSrc}
                                    alt={card.title}
                                    loading="lazy"
                                />

                                {/* PROMO BADGE */}
                                {discount > 0 && (
                                    <div className={styles.promoBadge}>
                                        <span className={styles.promoLabel}>
                                            PROMO
                                        </span>

                                        <span className={styles.promoPercentage}>
                                            -{discount}%
                                        </span>
                                    </div>
                                )}

                                <span className={styles.productNumber}>
                                    LANADA / {card.id}
                                </span>

                            </div>

                            {/* PRODUCT INFORMATION */}
                            <div className={styles.cardBody}>

                                <div className={styles.productInfo}>
                                    <p className={styles.cardCategory}>
                                        HEADWEAR COLLECTION
                                    </p>

                                    <h2 className={styles.cardTitle}>
                                        {card.title}
                                    </h2>

                                    <p className={styles.cardText}>
                                        {card.description}
                                    </p>
                                </div>

                                {/* PRICES */}
                                <div className={styles.cardFooter}>

                                    <div className={styles.priceContainer}>
                                        {card.old_price > card.price && (
                                            <span className={styles.oldPrice}>
                                                {card.old_price} DH
                                            </span>
                                        )}

                                        <span className={styles.currentPrice}>
                                            {card.price} DH
                                        </span>
                                    </div>

                                    <span className={styles.productReference}>
                                        REF. {card.id}
                                    </span>

                                </div>

                            </div>
                        </article>
                    );
                })}

            </div>
        </section>
    );
};

export default SimpleCard;
