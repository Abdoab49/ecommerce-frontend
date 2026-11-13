
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProductGrid.module.css';

const ProductGrid = () => {
    const navigate = useNavigate();

    // Calculate automatic discount
    const getDiscountPercentage = (oldPrice, price) => {
        const oldValue = Number(oldPrice);
        const newValue = Number(price);

        if (
            !Number.isFinite(oldValue) ||
            !Number.isFinite(newValue) ||
            oldValue <= 0 ||
            oldValue <= newValue
        ) {
            return 0;
        }

        return Math.round(
            ((oldValue - newValue) / oldValue) * 100
        );
    };

    // WORLD CUP PRODUCTS
    const products = [
        {
            id: 45,
            src: "/Assets/tshirt/tshirt1.png",
            title: "MOROCCO",
            description: "National Team Jersey",
            price: 45,
            oldPrice: 70,
            images: [
                "/Assets/tshirt/tshirt1.png",
                "/Assets/tshirt/tshirt1_2.png",
                "/Assets/tshirt/tshirt1_3.png",
                "/Assets/tshirt/tshirt1_4.png"
            ]
        },
        {
            id: 46,
            src: "/Assets/tshirt/tshirt2.png",
            title: "ARGENTINA",
            description: "National Team Jersey",
            price: 45,
            oldPrice: 70,
            images: [
                "/Assets/tshirt/tshirt2.png",
                "/Assets/tshirt/tshirt2_2.png",
                "/Assets/tshirt/tshirt2_3.png",
                "/Assets/tshirt/tshirt2_4.png"
            ]
        },
        {
            id: 47,
            src: "/Assets/tshirt/tshirt3.png",
            title: "BRAZIL",
            description: "National Team Jersey",
            price: 45,
            oldPrice: 70,
            images: [
                "/Assets/tshirt/tshirt3.png",
                "/Assets/tshirt/tshirt3_2.png",
                "/Assets/tshirt/tshirt3_3.png",
                "/Assets/tshirt/tshirt3_4.png"
            ]
        },
        {
            id: 48,
            src: "/Assets/tshirt/tshirt4.png",
            title: "SPAIN",
            description: "National Team Jersey",
            price: 45,
            oldPrice: 70,
            images: [
                "/Assets/tshirt/tshirt4.png",
                "/Assets/tshirt/tshirt4_2.png",
                "/Assets/tshirt/tshirt4_3.png",
                "/Assets/tshirt/tshirt4_4.png"
            ]
        },
        {
            id: 49,
            src: "/Assets/tshirt/tshirt5.png",
            title: "FRANCE",
            description: "National Team Jersey",
            price: 45,
            oldPrice: 70,
            images: [
                "/Assets/tshirt/tshirt5.png",
                "/Assets/tshirt/tshirt5_2.png",
                "/Assets/tshirt/tshirt5_3.png",
                "/Assets/tshirt/tshirt5_4.png"
            ]
        },
        {
            id: 50,
            src: "/Assets/tshirt/tshirt6.png",
            title: "GERMANY",
            description: "National Team Jersey",
            price: 45,
            oldPrice: 70,
            images: [
                "/Assets/tshirt/tshirt6.png",
                "/Assets/tshirt/tshirt6_2.png",
                "/Assets/tshirt/tshirt6_3.png",
                "/Assets/tshirt/tshirt6_4.png"
            ]
        },
        {
            id: 51,
            src: "/Assets/tshirt/tshirt7.png",
            title: "ENGLAND",
            description: "National Team Jersey",
            price: 45,
            oldPrice: 70,
            images: [
                "/Assets/tshirt/tshirt7.png",
                "/Assets/tshirt/tshirt7_2.png",
                "/Assets/tshirt/tshirt7_3.png",
                "/Assets/tshirt/tshirt7_4.png"
            ]
        },
        {
            id: 52,
            src: "/Assets/tshirt/tshirt8.png",
            title: "ITALY",
            description: "National Team Jersey",
            price: 45,
            oldPrice: 70,
            images: [
                "/Assets/tshirt/tshirt8.png",
                "/Assets/tshirt/tshirt8_2.png",
                "/Assets/tshirt/tshirt8_3.png",
                "/Assets/tshirt/tshirt8_4.png"
            ]
        }
    ];

    // PRODUCT DATA FOR SIZE SELECTION
    const handleProductClick = (product) => {
        const productData = {
            id: product.id,
            name: product.title,
            company: 'National Team',
            price: product.price,
            old_price: product.oldPrice,
            img: product.src,
            description: product.description,
            category: 'men',
            images: product.images || [product.src]
        };

        navigate('/size-selection', {
            state: { product: productData }
        });
    };

    // ADD TO CART / SIZE SELECTION
    const handleAddToCart = (product, event) => {
        event.stopPropagation();
        handleProductClick(product);
    };

    return (
        <div className={styles.productGridWrapper}>

            <div className={styles.wrapper}>
                {products.map((product) => {
                    const discount = getDiscountPercentage(
                        product.oldPrice,
                        product.price
                    );

                    return (
                        <div
                            key={product.id}
                            className={styles.card}
                            onClick={() => handleProductClick(product)}
                            style={{ cursor: 'pointer' }}
                        >

                            {/* PRODUCT IMAGE + PROMO */}
                            <div className={styles.card__imageWrapper}>

                                {discount > 0 && (
                                    <div className={styles.card__promoBadge}>
                                        <span className={styles.card__promoLabel}>
                                            PROMO
                                        </span>

                                        <span className={styles.card__promoPercentage}>
                                            -{discount}%
                                        </span>
                                    </div>
                                )}

                                <img
                                    src={product.src}
                                    className={styles.card__img}
                                    alt={product.title}
                                    loading="lazy"
                                />

                            </div>

                            {/* PRODUCT DETAILS */}
                            <div className={styles.card__body}>

                                <h2 className={styles.card__title}>
                                    {product.title}
                                </h2>

                                <p className={styles.card__description}>
                                    {product.description}
                                </p>

                                <div className={styles.priceContainer}>

                                    {product.oldPrice > product.price && (
                                        <span className={styles.oldPrice}>
                                            {product.oldPrice} DH
                                        </span>
                                    )}

                                    <span className={styles.currentPrice}>
                                        {product.price} DH
                                    </span>

                                </div>

                                <button
                                    type="button"
                                    className={styles.card__btn}
                                    onClick={(event) =>
                                        handleAddToCart(product, event)
                                    }
                                >
                                    Add to Cart
                                </button>

                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
    );
};

export default ProductGrid;
