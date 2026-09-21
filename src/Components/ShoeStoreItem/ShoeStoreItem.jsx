// src/Components/ShoeStoreItem/ShoeStoreItem.jsx
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import { getProductPrice } from '../../Data/prices';  // ✅ استيراد
import './ShoeStoreItem.css';

const ShoeStoreItem = (props) => {
    const navigate = useNavigate();
    const { addToCart } = useContext(ShopContext);
    const { id, name, image, sizes } = props;

    // ✅ ✅ ✅ الحصول على السعر من ملف واحد
    const price = getProductPrice(name);
    const safeNewPrice = price.new_price;
    const safeOldPrice = price.old_price;

    const displaySizes = sizes || 'S , M , L , XL';
    const [clicked, setClicked] = useState(false);

    const handleProductClick = () => {
        const productData = {
            id: id,
            name: name,
            company: 'FASHION',
            price: safeNewPrice,
            img: image,
            description: `${name} - Premium quality product`,
            category: 'T-Shirts',
            sizes: ['S', 'M', 'L', 'XL'],
            images: [image]
        };
        navigate('/size-selection', { state: { product: productData } });
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
        setClicked(true);
        
        const cartItem = {
            id: id,
            name: name,
            price: safeNewPrice,
            quantity: 1,
            size: 'M',
            image: image,
            category: 'T-Shirts',
            brand: 'FASHION'
        };

        const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingIndex = existingCart.findIndex(item => item.id === id);
        if (existingIndex > -1) {
            existingCart[existingIndex].quantity += 1;
        } else {
            existingCart.push(cartItem);
        }
        localStorage.setItem('cart', JSON.stringify(existingCart));

        addToCart(id);
        setTimeout(() => setClicked(false), 300);
    };

    return (
        <div className="page-wrapper">
            <div className="page-inner">
                <div className="row">
                    <div 
                        className="el-wrapper" 
                        onClick={handleProductClick}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="box-up">
                            <img className="img" src={image} alt={name} />
                            <div className="img-info">
                                <div className="info-inner">
                                    <span className="p-name">{name}</span>
                                    <span className="p-company">FASHION</span>
                                </div>
                                <div className="a-size">
                                    Available sizes : <span className="size">{displaySizes}</span>
                                </div>
                            </div>
                        </div>
                        <div className="box-down">
                            <div className="h-bg">
                                <div className="h-bg-inner"></div>
                            </div>
                            <div className="cart">
                                <span className="price">
                                    ${safeNewPrice.toFixed(2)}
                                    {safeOldPrice && safeOldPrice > safeNewPrice && (
                                        <span style={{
                                            fontSize: '12px',
                                            color: '#8c8c8c',
                                            textDecoration: 'line-through',
                                            marginLeft: '8px'
                                        }}>
                                            ${safeOldPrice.toFixed(2)}
                                        </span>
                                    )}
                                </span>
                                <div 
                                    className={`add-to-cart ${clicked ? 'clicked' : ''}`}
                                    onClick={handleAddToCart}
                                >
                                    <span className="txt">Add in cart</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoeStoreItem;