
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductPrice } from '../Data/prices';
import './ShoeStore.css';

const NewShoeStore = ({ sortOption = 'default' }) => {
    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState([]);
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

    // SIZE SELECTION
    const goToSizeSelection = (product) => {
        navigate('/size-selection', {
            state: { product }
        });
    };

    // ADD TO CART
    const addToCart = async (productName, price, productId, e) => {
        e.stopPropagation();

        setClickedButton(productId);
        setTimeout(() => setClickedButton(null), 300);

        const newItem = {
            id: productId,
            name: productName,
            title: productName,
            price: price,
            quantity: 1,
            size: 'M',
            category: 'newshoestore',
            image: `/Assets/NewCollection/product${productId}.png`,
            brand: 'NewCollection'
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
                item.category === 'newshoestore'
        );

        if (existingIndex > -1) {
            existingCart[existingIndex].quantity += 1;
        } else {
            existingCart.push(newItem);
        }

        localStorage.setItem(
            'cart',
            JSON.stringify(existingCart)
        );

        setCartItems(existingCart);

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
            name: 'NIKE',
            img: '/Assets/NewCollection/product1.png',
            sizes: 'S, M, L, XL',
            company: 'NIKE TECH',
            images: [
                '/Assets/NewCollection/product1.png',
                '/Assets/NewCollection/product1_2.png',
                '/Assets/NewCollection/product1_3.png'
            ]
        },
        {
            id: 2,
            name: 'ADIDAS',
            img: '/Assets/NewCollection/product2.png',
            sizes: 'S, M, L, XL',
            company: 'YEEZY',
            images: [
                '/Assets/NewCollection/product2.png',
                '/Assets/NewCollection/product2_2.png',
                '/Assets/NewCollection/product2_3.png'
            ]
        },
        {
            id: 3,
            name: 'PUMA',
            img: '/Assets/NewCollection/product3.png',
            sizes: 'S, M, L, XL',
            company: 'YEEZY',
            images: [
                '/Assets/NewCollection/product3.png',
                '/Assets/NewCollection/product3_2.png',
                '/Assets/NewCollection/product3_3.png'
            ]
        },
        {
            id: 4,
            name: 'NEW BALANCE',
            img: '/Assets/NewCollection/product4.png',
            sizes: 'S, M, L, XL',
            company: 'YEEZY',
            images: [
                '/Assets/NewCollection/product4.png',
                '/Assets/NewCollection/product4_2.png',
                '/Assets/NewCollection/product4_3.png'
            ]
        },
        {
            id: 5,
            name: 'REEBOK',
            img: '/Assets/NewCollection/product5.png',
            sizes: 'S, M, L, XL',
            company: 'YEEZY',
            images: [
                '/Assets/NewCollection/product5.png',
                '/Assets/NewCollection/product5_2.png',
                '/Assets/NewCollection/product5_3.png'
            ]
        },
        {
            id: 6,
            name: 'VANS',
            img: '/Assets/NewCollection/product6.png',
            sizes: 'S, M, L, XL',
            company: 'YEEZY',
            images: [
                '/Assets/NewCollection/product6.png',
                '/Assets/NewCollection/product6_2.png',
                '/Assets/NewCollection/product6_3.png'
            ]
        },
        {
            id: 7,
            name: 'CONVERSE',
            img: '/Assets/NewCollection/product7.png',
            sizes: 'S, M, L, XL',
            company: 'YEEZY',
            images: [
                '/Assets/NewCollection/product7.png',
                '/Assets/NewCollection/product7_2.png',
                '/Assets/NewCollection/product7_3.png'
            ]
        },
        {
            id: 8,
            name: 'ASICS',
            img: '/Assets/NewCollection/product8.png',
            sizes: 'S, M, L, XL',
            company: 'YEEZY',
            images: [
                '/Assets/NewCollection/product8.png',
                '/Assets/NewCollection/product8_2.png',
                '/Assets/NewCollection/product8_3.png'
            ]
        },
        {
            id: 9,
            name: 'UNDER ARMOUR',
            img: '/Assets/NewCollection/product9.png',
            sizes: 'S, M, L, XL',
            company: 'YEEZY',
            images: [
                '/Assets/NewCollection/product9.png',
                '/Assets/NewCollection/product9_2.png',
                '/Assets/NewCollection/product9_3.png'
            ]
        },
        {
            id: 10,
            name: 'LACOSTE',
            img: '/Assets/NewCollection/product10.png',
            sizes: 'S, M, L, XL',
            company: 'YEEZY',
            images: [
                '/Assets/NewCollection/product10.png',
                '/Assets/NewCollection/product10_2.png',
                '/Assets/NewCollection/product10_3.png'
            ]
        },
        {
            id: 11,
            name: 'LE COQ SPORTIF',
            img: '/Assets/NewCollection/product11.png',
            sizes: 'S, M, L, XL',
            company: 'YEEZY',
            images: [
                '/Assets/NewCollection/product11.png',
                '/Assets/NewCollection/product11_2.png',
                '/Assets/NewCollection/product11_3.png'
            ]
        },
        {
            id: 12,
            name: 'KAPPA',
            img: '/Assets/NewCollection/product12.png',
            sizes: 'S, M, L, XL',
            company: 'YEEZY',
            images: [
                '/Assets/NewCollection/product12.png',
                '/Assets/NewCollection/product12_2.png',
                '/Assets/NewCollection/product12_3.png'
            ]
        },
        {
            id: 13,
            name: 'MIZUNO',
            img: '/Assets/NewCollection/product13.png',
            sizes: 'S, M, L, XL',
            company: 'YEEZY',
            images: [
                '/Assets/NewCollection/product13.png',
                '/Assets/NewCollection/product13_2.png',
                '/Assets/NewCollection/product13_3.png'
            ]
        },
        {
            id: 14,
            name: 'DIADORA',
            img: '/Assets/NewCollection/product14.png',
            sizes: 'S, M, L, XL',
            company: 'YEEZY',
            images: [
                '/Assets/NewCollection/product14.png',
                '/Assets/NewCollection/product14_2.png',
                '/Assets/NewCollection/product14_3.png'
            ]
        },
        {
            id: 15,
            name: 'HUMAN MADE',
            img: '/Assets/NewCollection/product15.png',
            sizes: 'S, M, L, XL',
            company: 'YEEZY',
            images: [
                '/Assets/NewCollection/product15.png',
                '/Assets/NewCollection/product15_2.png',
                '/Assets/NewCollection/product15_3.png'
            ]
        },
        {
            id: 16,
            name: 'KITH',
            img: '/Assets/NewCollection/product16.png',
            sizes: 'S, M, L, XL',
            company: 'YEEZY',
            images: [
                '/Assets/NewCollection/product16.png',
                '/Assets/NewCollection/product16_2.png',
                '/Assets/NewCollection/product16_3.png'
            ]
        },
        {
            id: 17,
            name: 'FENDI',
            img: '/Assets/NewCollection/product17.png',
            sizes: 'S, M, L, XL',
            company: 'YEEZY',
            images: [
                '/Assets/NewCollection/product17.png',
                '/Assets/NewCollection/product17_2.png',
                '/Assets/NewCollection/product17_3.png'
            ]
        },
        {
            id: 18,
            name: 'GUCCI',
            img: '/Assets/NewCollection/product18.png',
            sizes: 'S, M, L, XL',
            company: 'YEEZY',
            images: [
                '/Assets/NewCollection/product18.png',
                '/Assets/NewCollection/product18_2.png',
                '/Assets/NewCollection/product18_3.png'
            ]
        },
        {
            id: 19,
            name: 'VERSACE',
            img: '/Assets/NewCollection/product19.png',
            sizes: 'S, M, L, XL',
            company: 'YEEZY',
            images: [
                '/Assets/NewCollection/product19.png',
                '/Assets/NewCollection/product19_2.png',
                '/Assets/NewCollection/product19_3.png'
            ]
        },
        {
            id: 20,
            name: 'BURBERRY',
            img: '/Assets/NewCollection/product20.png',
            sizes: 'S, M, L, XL',
            company: 'YEEZY',
            images: [
                '/Assets/NewCollection/product20.png',
                '/Assets/NewCollection/product20_2.png',
                '/Assets/NewCollection/product20_3.png'
            ]
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

    // PRODUCTS ROWS
    const rows = [];

    for (let i = 0; i < products.length; i += 4) {
        rows.push(products.slice(i, i + 4));
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

                            {/* IMAGE */}
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

            {rows.map((row, rowIndex) => (
                <div
                    key={rowIndex}
                    className="products-wrapper"
                >
                    {row.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            ))}

            {notification.show && (
                <div className="cart-notification">
                    {notification.message}
                </div>
            )}

        </div>
    );
};

export default NewShoeStore;
