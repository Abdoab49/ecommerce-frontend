// src/Components/ShoesCard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductPrice } from '../Data/prices';
import './ShoeStore.css';

const ShoesCard = () => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState({ show: false, message: '' });
  const [clickedButton, setClickedButton] = useState(null);

  const goToSizeSelection = (product) => {
    navigate('/size-selection', { state: { product: product } });
  };

  // ===== ✅ ADD TO CART (بدون Backend) =====
  const addToCart = (productName, price, productId, e) => {
    e.stopPropagation();
    
    setClickedButton(productId);
    setTimeout(() => setClickedButton(null), 300);
    
    const newItem = {
      id: productId,
      name: productName,
      price: typeof price === 'number' ? price : parseFloat(String(price).replace(/[^0-9.]/g, '')) || 0,
      quantity: 1,
      size: 'M',
      image: `/Assets/ShoeStore/tshirt${productId}.png`
    };
    
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    existingCart.push(newItem);
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    setNotification({ show: true, message: `✅ ${productName} added to cart!` });
    setTimeout(() => setNotification({ show: false, message: '' }), 2000);
  };

  // ✅ المنتجات — أسماء جديدة
  let products = [
    { id: 1, name: 'T-Shirt Urban White', img: '/Assets/ShoeStore/tshirt1.png', sizes: 'S , M , L , XL', company: 'YEEZY' },
    { id: 2, name: 'T-Shirt Football Home', img: '/Assets/ShoeStore/tshirt2.png', sizes: 'S , M , L , XL', company: 'YEEZY' },
    { id: 3, name: 'T-Shirt Basketball Court', img: '/Assets/ShoeStore/tshirt3.png', sizes: 'S , M , L , XL', company: 'YEEZY' },
    { id: 4, name: 'T-Shirt Football Away', img: '/Assets/ShoeStore/tshirt4.png', sizes: 'S , M , L , XL', company: 'YEEZY' },
    { id: 5, name: 'T-Shirt Football Third', img: '/Assets/ShoeStore/tshirt5.png', sizes: 'S , M , L , XL', company: 'YEEZY' },
    { id: 6, name: 'T-Shirt Football Retro', img: '/Assets/ShoeStore/tshirt6.png', sizes: 'S , M , L , XL', company: 'YEEZY' },
    { id: 7, name: 'T-Shirt Basketball Street', img: '/Assets/ShoeStore/tshirt7.png', sizes: 'S , M , L , XL', company: 'YEEZY' },
    { id: 8, name: 'T-Shirt Football Gold', img: '/Assets/ShoeStore/tshirt8.png', sizes: 'S , M , L , XL', company: 'YEEZY' }
  ];

  // ✅ زيد الأسعار من prices.js
  products = products.map(p => {
    const priceData = getProductPrice(p.name);
    return { ...p, price: priceData.new_price, old_price: priceData.old_price };
  });

  const firstRow = products.slice(0, 4);
  const secondRow = products.slice(4, 8);

  const ProductCard = ({ product }) => {
    const price = product.price;
    const oldPrice = product.old_price;
    
    return (
      <div className="page-wrapper">
        <div className="page-inner">
          <div className="row">
            <div 
              className="el-wrapper"
              onClick={() => goToSizeSelection({ ...product, price, old_price: oldPrice })}
              style={{ cursor: 'pointer' }}
            >
              <div className="box-up">
                <img className="img" src={product.img} alt={product.name} />
                <div className="img-info">
                  <div className="info-inner">
                    <span className="p-name">{product.name}</span>
                    <span className="p-company">{product.company}</span>
                  </div>
                  {product.sizes && (
                    <div className="a-size">
                      Available sizes : <span className="size">{product.sizes}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="box-down">
                <div className="h-bg">
                  <div className="h-bg-inner"></div>
                </div>
                <div className="cart">
                  <span className="price">
                    {price} DH
                    {oldPrice && oldPrice > price && (
                      <span style={{ fontSize: '12px', color: '#8c8c8c', textDecoration: 'line-through', marginLeft: '8px' }}>
                        {oldPrice} DH
                      </span>
                    )}
                  </span>
                  <div 
                    className={`add-to-cart ${clickedButton === product.id ? 'clicked' : ''}`}
                    onClick={(e) => addToCart(product.name, price, product.id, e)}
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

  return (
    <div className="products-container">
      <div className="products-wrapper">
        {firstRow.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="products-wrapper second-row">
        {secondRow.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {notification.show && (
        <div className="cart-notification">
          ✅ {notification.message}
        </div>
      )}
    </div>
  );
};

export default ShoesCard;