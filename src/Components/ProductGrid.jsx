// src/Components/ProductGrid/ProductGrid.jsx
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import styles from './ProductGrid.module.css';

const ProductGrid = () => {
    const navigate = useNavigate();
    const { addToCart } = useContext(ShopContext);
    const [notification, setNotification] = useState({ show: false, message: '' });

    // ✅ منتجات كأس العالم
    const products = [
        { id: 45, src: "/Assets/tshirt/tshirt1.png", title: "MOROCCO", description: "National Team Jersey", price: 45, oldPrice: 70 },
        { id: 46, src: "/Assets/tshirt/tshirt2.png", title: "ARGENTINA", description: "National Team Jersey", price: 45, oldPrice: 70 },
        { id: 47, src: "/Assets/tshirt/tshirt3.png", title: "BRAZIL", description: "National Team Jersey", price: 45, oldPrice: 70 },
        { id: 48, src: "/Assets/tshirt/tshirt4.png", title: "SPAIN", description: "National Team Jersey", price: 45, oldPrice: 70 },
        { id: 49, src: "/Assets/tshirt/tshirt5.png", title: "FRANCE", description: "National Team Jersey", price: 45, oldPrice: 70 },
        { id: 50, src: "/Assets/tshirt/tshirt6.png", title: "GERMANY", description: "National Team Jersey", price: 45, oldPrice: 70 },
        { id: 51, src: "/Assets/tshirt/tshirt7.png", title: "ENGLAND", description: "National Team Jersey", price: 45, oldPrice: 70 },
        { id: 52, src: "/Assets/tshirt/tshirt8.png", title: "ITALY", description: "National Team Jersey", price: 45, oldPrice: 70 }
    ];

    const handleProductClick = (product) => {
        const productData = {
            id: product.id,
            name: product.title,
            company: 'National Team',
            price: product.price,
            img: product.src,
            description: product.description,
            category: 'men',
            images: [product.src]
        };
        navigate('/size-selection', { state: { product: productData } });
    };

    // ✅ ✅ ✅ إضافة إلى السلة مع اسم صحيح
    const handleAddToCart = (product, event) => {
        event.stopPropagation();
        
        addToCart(product.id);
        
        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingIndex = existingCart.findIndex(item => item.id === product.id);
        
        const cartItem = {
            id: product.id,
            name: product.title,        // ✅ MOROCCO, ARGENTINA, ...
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

    const firstRow = products.slice(0, 4);
    const secondRow = products.slice(4, 8);

    return (
        <div className={styles.productGridWrapper}>
            <div className={styles.wrapper}>
                {firstRow.map((product) => (
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

            <div className={styles.wrapper}>
                {secondRow.map((product) => (
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

            {notification.show && (
                <div className={styles.notification}>
                    {notification.message}
                </div>
            )}
        </div>
    );
};

export default ProductGrid;