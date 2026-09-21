// src/Components/ShoeStore/ShoeStore.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductPrice } from '../Data/prices';
import './ShoeStore.css';

const ShoeStore = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [notification, setNotification] = useState({ show: false, message: '' });
  const [clickedButton, setClickedButton] = useState(null);

  const goToSizeSelection = (product) => {
    navigate('/size-selection', { state: { product: product } });
  };

  // ✅ ✅ ✅ إضافة إلى السلة مع اسم صحيح
  const addToCart = async (productName, price, productId, e) => {
    e.stopPropagation();
    
    setClickedButton(productId);
    setTimeout(() => setClickedButton(null), 300);
    
    const newItem = {
      id: productId,
      name: productName,        // ✅ NIKE, Supreme, ...
      title: productName,
      price: price,
      quantity: 1,
      size: 'M',
      category: 'shoestore',
      image: `/Assets/ShoeStore/tshirt${productId}.png`,
      brand: 'ShoeStore'
    };
    
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingIndex = existingCart.findIndex(item => item.id === productId);
    if (existingIndex > -1) {
      existingCart[existingIndex].quantity += 1;
    } else {
      existingCart.push(newItem);
    }
    localStorage.setItem('cart', JSON.stringify(existingCart));
    setCartItems(existingCart);
    
    setNotification({ show: true, message: `✅ ${productName} added to cart!` });
    setTimeout(() => {
      setNotification({ show: false, message: '' });
    }, 2000);
  };

  const products = [
    { id: 1, name: 'NIKE', img: '/Assets/ShoeStore/tshirt1.png', sizes: 'S , M , L , XL', company: 'YEEZY' },
    { id: 2, name: 'T-shirt football', img: '/Assets/ShoeStore/tshirt2.png', sizes: 'S , M , L , XL', company: 'YEEZY' },
    { id: 3, name: 'T-shirt basketball', img: '/Assets/ShoeStore/tshirt3.png', sizes: 'S , M , L , XL', company: 'YEEZY' },
    { id: 4, name: 'T-shirt football', img: '/Assets/ShoeStore/tshirt4.png', sizes: 'S , M , L , XL', company: 'YEEZY' },
    { id: 5, name: 'T-shirt football', img: '/Assets/ShoeStore/tshirt5.png', sizes: 'S , M , L , XL', company: 'YEEZY' },
    { id: 6, name: 'T-shirt football', img: '/Assets/ShoeStore/tshirt6.png', sizes: 'S , M , L , XL', company: 'YEEZY' },
    { id: 7, name: 'T-shirt basketball', img: '/Assets/ShoeStore/tshirt7.png', sizes: 'S , M , L , XL', company: 'YEEZY' },
    { id: 8, name: 'T-shirt football', img: '/Assets/ShoeStore/tshirt8.png', sizes: 'S , M , L , XL', company: 'YEEZY' }
  ];

  const firstRow = products.slice(0, 4);
  const secondRow = products.slice(4, 8);

  const ProductCard = ({ product }) => {
    const priceData = getProductPrice(product.name);
    const price = priceData.new_price;
    const oldPrice = priceData.old_price;

    return (
      <div className="page-wrapper">
        <div className="page-inner">
          <div className="row">
            <div 
              className="el-wrapper"
              onClick={() => goToSizeSelection({
                ...product,
                price: price,
                old_price: oldPrice
              })}
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
                      <span style={{
                        fontSize: '12px',
                        color: '#8c8c8c',
                        textDecoration: 'line-through',
                        marginLeft: '8px'
                      }}>
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

export default ShoeStore;