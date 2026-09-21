// src/Components/ProductGrid/ProductGrid.jsx
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import './ProductGrid.module.css';

const ProductGrid = () => {
    const navigate = useNavigate();
    const { addToCart } = useContext(ShopContext);
    const [notification, setNotification] = useState({ show: false, message: '' });

    // ✅ ✅ ✅ 20 منتج مع 3 صور لكل منتج
    const products = [
        // ===== الصف الأول (1-4) =====
        { id: 45, src: "/Assets/tshirt/tshirt1.png", title: "MOROCCO", description: "National Team Jersey", price: 45, oldPrice: 70 },
        { id: 46, src: "/Assets/tshirt/tshirt2.png", title: "ARGENTINA", description: "National Team Jersey", price: 45, oldPrice: 70 },
        { id: 47, src: "/Assets/tshirt/tshirt3.png", title: "BRAZIL", description: "National Team Jersey", price: 45, oldPrice: 70 },
        { id: 48, src: "/Assets/tshirt/tshirt4.png", title: "SPAIN", description: "National Team Jersey", price: 45, oldPrice: 70 },
        { id: 49, src: "/Assets/tshirt/tshirt5.png", title: "FRANCE", description: "National Team Jersey", price: 45, oldPrice: 70 },
        { id: 50, src: "/Assets/tshirt/tshirt6.png", title: "GERMANY", description: "National Team Jersey", price: 45, oldPrice: 70 },
        { id: 51, src: "/Assets/tshirt/tshirt7.png", title: "ENGLAND", description: "National Team Jersey", price: 45, oldPrice: 70 },
        { id: 52, src: "/Assets/tshirt/tshirt8.png", title: "ITALY", description: "National Team Jersey", price: 45, oldPrice: 70 },

        // ===== الصف الثاني (9-12) =====
        { id: 53, src: "/Assets/tshirt/tshirt9.png", title: "PORTUGAL", description: "National Team Jersey", price: 45, oldPrice: 70 },
        { id: 54, src: "/Assets/tshirt/tshirt10.png", title: "NETHERLANDS", description: "National Team Jersey", price: 45, oldPrice: 70 },
        { id: 55, src: "/Assets/tshirt/tshirt11.png", title: "BELGIUM", description: "National Team Jersey", price: 45, oldPrice: 70 },
        { id: 56, src: "/Assets/tshirt/tshirt12.png", title: "CROATIA", description: "National Team Jersey", price: 45, oldPrice: 70 },

        // ===== الصف الثالث (13-16) =====
        { id: 57, src: "/Assets/tshirt/tshirt13.png", title: "URUGUAY", description: "National Team Jersey", price: 45, oldPrice: 70 },
        { id: 58, src: "/Assets/tshirt/tshirt14.png", title: "MEXICO", description: "National Team Jersey", price: 45, oldPrice: 70 },
        { id: 59, src: "/Assets/tshirt/tshirt15.png", title: "USA", description: "National Team Jersey", price: 45, oldPrice: 70 },
        { id: 60, src: "/Assets/tshirt/tshirt16.png", title: "CANADA", description: "National Team Jersey", price: 45, oldPrice: 70 },

        // ===== الصف الرابع (17-20) =====
        { id: 61, src: "/Assets/tshirt/tshirt17.png", title: "AUSTRALIA", description: "National Team Jersey", price: 45, oldPrice: 70 },
        { id: 62, src: "/Assets/tshirt/tshirt18.png", title: "JAPAN", description: "National Team Jersey", price: 45, oldPrice: 70 },
        { id: 63, src: "/Assets/tshirt/tshirt19.png", title: "SOUTH KOREA", description: "National Team Jersey", price: 45, oldPrice: 70 },
        { id: 64, src: "/Assets/tshirt/tshirt20.png", title: "COLUMBIA", description: "National Team Jersey", price: 250, oldPrice: 350 },
    ];

    // ✅ ✅ ✅ 3 صور لكل منتج
    const productImages = {
        // ===== الصف الأول =====
        45: ['/Assets/tshirt/tshirt1.png', '/Assets/tshirt/tshirt1_2.png', '/Assets/tshirt/tshirt1_3.png', '/Assets/tshirt/tshirt1_4.png', '/Assets/tshirt/tshirt1_5.png'],
        46: ['/Assets/tshirt/tshirt2.png', '/Assets/tshirt/tshirt2_2.png', '/Assets/tshirt/tshirt2_3.png', '/Assets/tshirt/tshirt2_4.png', '/Assets/tshirt/tshirt2_5.png', '/Assets/tshirt/tshirt2_6.png'],
        47: ['/Assets/tshirt/tshirt3.png', '/Assets/tshirt/tshirt3_2.png', '/Assets/tshirt/tshirt3_3.png'],
        48: ['/Assets/tshirt/tshirt4.png', '/Assets/tshirt/tshirt4_2.png', '/Assets/tshirt/tshirt4_3.png', '/Assets/tshirt/tshirt4_4.png'],
        49: ['/Assets/tshirt/tshirt5.png', '/Assets/tshirt/tshirt5_2.png', '/Assets/tshirt/tshirt5_3.png'],
        50: ['/Assets/tshirt/tshirt6.png', '/Assets/tshirt/tshirt6_2.png', '/Assets/tshirt/tshirt6_3.png'],
        51: ['/Assets/tshirt/tshirt7.png', '/Assets/tshirt/tshirt7_2.png', '/Assets/tshirt/tshirt7_3.png'],
        52: ['/Assets/tshirt/tshirt8.png', '/Assets/tshirt/tshirt8_2.png', '/Assets/tshirt/tshirt8_3.png'],

        // ===== الصف الثاني =====
        53: ['/Assets/tshirt/tshirt9.png', '/Assets/tshirt/tshirt9_2.png', '/Assets/tshirt/tshirt9_3.png'],
        54: ['/Assets/tshirt/tshirt10.png', '/Assets/tshirt/tshirt10_2.png', '/Assets/tshirt/tshirt10_3.png'],
        55: ['/Assets/tshirt/tshirt11.png', '/Assets/tshirt/tshirt11_2.png', '/Assets/tshirt/tshirt11_3.png'],
        56: ['/Assets/tshirt/tshirt12.png', '/Assets/tshirt/tshirt12_2.png', '/Assets/tshirt/tshirt12_3.png'],

        // ===== الصف الثالث =====
        57: ['/Assets/tshirt/tshirt13.png', '/Assets/tshirt/tshirt13_2.png', '/Assets/tshirt/tshirt13_3.png'],
        58: ['/Assets/tshirt/tshirt14.png', '/Assets/tshirt/tshirt14_2.png', '/Assets/tshirt/tshirt14_3.png'],
        59: ['/Assets/tshirt/tshirt15.png', '/Assets/tshirt/tshirt15_2.png', '/Assets/tshirt/tshirt15_3.png'],
        60: ['/Assets/tshirt/tshirt16.png', '/Assets/tshirt/tshirt16_2.png', '/Assets/tshirt/tshirt16_3.png'],

        // ===== الصف الرابع =====
        61: ['/Assets/tshirt/tshirt17.png', '/Assets/tshirt/tshirt17_2.png', '/Assets/tshirt/tshirt17_3.png'],
        62: ['/Assets/tshirt/tshirt18.png', '/Assets/tshirt/tshirt18_2.png', '/Assets/tshirt/tshirt18_3.png', '/Assets/tshirt/tshirt18_4.png'],
        63: ['/Assets/tshirt/tshirt19.png', '/Assets/tshirt/tshirt19_2.png', '/Assets/tshirt/tshirt19_3.png'],
        64: ['/Assets/tshirt/tshirt20.png', '/Assets/tshirt/tshirt20_2.png', '/Assets/tshirt/tshirt20_3.png', '/Assets/tshirt/tshirt20_4.png', '/Assets/tshirt/tshirt20_5.png'],
    };

    const handleProductClick = (product) => {
        const productData = {
            id: product.id,
            name: product.title,
            company: 'National Team',
            price: product.price,
            img: product.src,
            description: product.description,
            category: 'men',
            images: productImages[product.id] || [product.src]
        };
        navigate('/size-selection', { state: { product: productData } });
    };

    const handleAddToCart = (product, event) => {
        event.stopPropagation();
        
        addToCart(product.id);
        
        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingIndex = existingCart.findIndex(item => item.id === product.id);
        
        const cartItem = {
            id: product.id,
            name: product.title,
            title: product.title,
            price: product.price,
            quantity: 1,
            size: 'M',
            category: 'men',
            image: product.src,
            brand: 'National Team'
        };
        
        if (existingIndex > -1) {
            existingCart[existingIndex].quantity += 1;
        } else {
            existingCart.push(cartItem);
        }
        
        localStorage.setItem('cart', JSON.stringify(existingCart));
        
        setNotification({ show: true, message: `✅ ${product.title} added to cart!` });
        setTimeout(() => setNotification({ show: false, message: '' }), 2000);
    };

    // تقسيم المنتجات إلى 5 صفوف (كل صف 4 منتجات)
    const rows = [];
    for (let i = 0; i < products.length; i += 4) {
        rows.push(products.slice(i, i + 4));
    }

    return (
        <div className={styles.productGridWrapper}>
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} className={styles.wrapper}>
                    {row.map((product) => (
                        <div 
                            key={product.id} 
                            className={styles.card}
                            onClick={() => handleProductClick(product)}
                            style={{ cursor: 'pointer' }}
                        >
                            <img src={product.src} className={styles.card__img} alt={product.title} />
                            <div className={styles.card__body}>
                                <h2 className={styles.card__title}>{product.title}</h2>
                                <p className={styles.card__description}>{product.description}</p>
                                <div className={styles.priceContainer}>
                                    <span className={styles.oldPrice}>{product.oldPrice} DH</span>
                                    <span className={styles.currentPrice}>{product.price} DH</span>
                                </div>
                                <button 
                                    className={styles.card__btn}
                                    onClick={(e) => handleAddToCart(product, e)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ))}

            {notification.show && (
                <div className={styles.notification}>
                    {notification.message}
                </div>
            )}
        </div>
    );
};

export default ProductGrid;