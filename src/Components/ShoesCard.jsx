
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductPrice } from '../Data/prices';
import './ShoeStore.css';

const ShoesCard = ({ sortOption = 'default' }) => {
    const navigate = useNavigate();

    const [notification, setNotification] = useState({
        show: false,
        message: ''
    });

    const [clickedButton, setClickedButton] = useState(null);

    // Calculate automatic discount
    const getDiscountPercentage = (oldPrice, newPrice) => {
        if (
            !Number.isFinite(oldPrice) ||
            !Number.isFinite(newPrice) ||
            oldPrice <= 0 ||
            oldPrice <= newPrice
        ) {
            return 0;
        }

        return Math.round(
            ((oldPrice - newPrice) / oldPrice) * 100
        );
    };

    // Go to size selection
    const goToSizeSelection = (product) => {
        navigate('/size-selection', {
            state: { product }
        });
    };

    // ADD TO CART
    const addToCart = (productName, price, productId, e) => {
        e.stopPropagation();

        setClickedButton(productId);
        setTimeout(() => setClickedButton(null), 300);

        const numericPrice =
            typeof price === 'number'
                ? price
                : parseFloat(String(price).replace(/[^0-9.]/g, '')) || 0;

        const newItem = {
            id: productId,
            name: productName,
            title: productName,
            price: numericPrice,
            quantity: 1,
            size: 'M',
            category: 'shoescard',
            image: `/Assets/ShoeStore/tshirt${productId}.png`,
            brand: 'YEEZY'
        };

        let existingCart = [];

        try {
            existingCart = JSON.parse(
                localStorage.getItem('cart') || '[]'
            );

            if (!Array.isArray(existingCart)) {
                existingCart = [];
            }
        } catch {
            existingCart = [];
        }

        const existingIndex = existingCart.findIndex(
            item =>
                item.id === productId &&
                item.category === 'shoescard'
        );

        if (existingIndex > -1) {
            existingCart[existingIndex].quantity += 1;
        } else {
            existingCart.push(newItem);
        }

        localStorage.setItem('cart', JSON.stringify(existingCart));

        setNotification({
            show: true,
            message: `${productName} added to cart!`
        });

        setTimeout(() => {
            setNotification({
                show: false,
                message: ''
            });
        }, 2000);
    };

    // PRODUCTS
    let products = [
        {
            id: 1,
            name: 'T-Shirt Urban White',
            img: '/Assets/ShoeStore/tshirt1.png',
            sizes: 'S, M, L, XL',
            company: 'YEEZY'
        },
        {
            id: 2,
            name: 'T-Shirt Football Home',
            img: '/Assets/ShoeStore/tshirt2.png',
            sizes: 'S, M, L, XL',
            company: 'YEEZY'
        },
        {
            id: 3,
            name: 'T-Shirt Basketball Court',
            img: '/Assets/ShoeStore/tshirt3.png',
            sizes: 'S, M, L, XL',
            company: 'YEEZY'
        },
        {
            id: 4,
            name: 'T-Shirt Football Away',
            img: '/Assets/ShoeStore/tshirt4.png',
            sizes: 'S, M, L, XL',
            company: 'YEEZY'
        },
        {
            id: 5,
            name: 'T-Shirt Football Third',
            img: '/Assets/ShoeStore/tshirt5.png',
            sizes: 'S, M, L, XL',
            company: 'YEEZY'
        },
        {
            id: 6,
            name: 'T-Shirt Football Retro',
            img: '/Assets/ShoeStore/tshirt6.png',
            sizes: 'S, M, L, XL',
            company: 'YEEZY'
        },
        {
            id: 7,
            name: 'T-Shirt Basketball Street',
            img: '/Assets/ShoeStore/tshirt7.png',
            sizes: 'S, M, L, XL',
            company: 'YEEZY'
        },
        {
            id: 8,
            name: 'T-Shirt Football Gold',
            img: '/Assets/ShoeStore/tshirt8.png',
            sizes: 'S, M, L, XL',
            company: 'YEEZY'
        }
    ];

    // ADD PRICES
    products = products.map(product => {
        const priceData = getProductPrice(product.name) || {};

        return {
            ...product,
            price: Number(priceData.new_price) || 0,
            old_price: Number(priceData.old_price) || 0
        };
    });

    // SORT PRODUCTS
    if (sortOption === 'price-asc') {
        products = [...products].sort(
            (a, b) => a.price - b.price
        );
    } else if (sortOption === 'price-desc') {
        products = [...products].sort(
            (a, b) => b.price - a.price
        );
    } else if (sortOption === 'name-asc') {
        products = [...products].sort(
            (a, b) => a.name.localeCompare(b.name)
        );
    } else if (sortOption === 'name-desc') {
        products = [...products].sort(
            (a, b) => b.name.localeCompare(a.name)
        );
    }

    // PRODUCT CARD
    const ProductCard = ({ product }) => {
        const price = product.price;
        const oldPrice = product.old_price;

        const discountPercentage = getDiscountPercentage(
            oldPrice,
            price
        );

        return (
            <div className="page-wrapper">
                <div className="page-inner">
                    <div className="row">

                        <div
                            className="el-wrapper"
                            onClick={() =>
                                goToSizeSelection({
                                    ...product,
                                    price,
                                    old_price: oldPrice
                                })
                            }
                            style={{ cursor: 'pointer' }}
                        >

                            {/* PRODUCT IMAGE */}
                            <div className="box-up">

                                {/* AUTOMATIC PROMO BADGE */}
                                {discountPercentage > 0 && (
                                    <div className="product-promo-badge">
                                        <span className="promo-label">
                                            PROMO
                                        </span>

                                        <span className="promo-percentage">
                                            -{discountPercentage}%
                                        </span>
                                    </div>
                                )}

                                <img
                                    className="img"
                                    src={product.img}
                                    alt={product.name}
                                    loading="lazy"
                                />

                                <div className="img-info">
                                    <div className="info-inner">
                                        <span className="p-name">
                                            {product.name}
                                        </span>

                                        <span className="p-company">
                                            {product.company}
                                        </span>
                                    </div>

                                    {product.sizes && (
                                        <div className="a-size">
                                            Available sizes:
                                            {' '}
                                            <span className="size">
                                                {product.sizes}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* PRICE AND CART */}
                            <div className="box-down">

                                <div className="h-bg">
                                    <div className="h-bg-inner"></div>
                                </div>

                                <div className="cart">

                                    <span className="price">
                                        {price} DH

                                        {oldPrice > price && (
                                            <span className="old-price">
                                                {oldPrice} DH
                                            </span>
                                        )}
                                    </span>

                                    <div
                                        className={`add-to-cart ${
                                            clickedButton === product.id
                                                ? 'clicked'
                                                : ''
                                        }`}
                                        onClick={(e) =>
                                            addToCart(
                                                product.name,
                                                price,
                                                product.id,
                                                e
                                            )
                                        }
                                    >
                                        <span className="txt">
                                            Add in cart
                                        </span>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="products-container">

            {/* ALL PRODUCTS - TWO CARDS PER ROW */}
            <div className="products-wrapper">
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>

            {/* CART NOTIFICATION */}
            {notification.show && (
                <div className="cart-notification">
                    {notification.message}
                </div>
            )}

        </div>
    );
};

export default ShoesCard;
