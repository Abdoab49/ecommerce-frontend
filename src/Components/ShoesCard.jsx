// src/Components/ShoeCard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ShoeStore.css';

const ShoeCard = () => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState({ show: false, message: '' });
  const [clickedButton, setClickedButton] = useState(null);

  const goToSizeSelection = (product) => {
    navigate('/size-selection', { state: { product: product } });
  };

  // ===== ✅ ADD TO CART =====
  const addToCart = (productName, price, productId, e) => {
    e.stopPropagation();
    
    setClickedButton(productId);
    setTimeout(() => setClickedButton(null), 300);
    
    const newItem = {
      id: productId,
      name: productName,
      price: parseFloat(price.replace(/[^0-9.]/g, '')) || 0,
      quantity: 1,
      size: 'M',
      image: `/Assets/ShoeCard/card${productId}.png`
    };
    
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    existingCart.push(newItem);
    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    setNotification({ show: true, message: `✅ ${productName} added to cart!` });
    setTimeout(() => setNotification({ show: false, message: '' }), 2000);
  };

  // ✅ ✅ ✅ 10 بطاقات مع 3 صور لكل بطاقة
  const products = [
    { 
      id: 1, 
      name: 'Mens Fleece Windrunner', 
      price: 100, 
      img: '/Assets/ShoeCard/card1.png', 
      sizes: 'S , M , L , XL', 
      company: 'NIKE TECH',
      images: ['/Assets/ShoeCard/card1.png', '/Assets/ShoeCard/card1_2.png', '/Assets/ShoeCard/card1_3.png']
    },
    { 
      id: 2, 
      name: 'T-shirt football', 
      price: 80, 
      img: '/Assets/ShoeCard/card2.png', 
      sizes: 'S , M , L , XL', 
      company: 'YEEZY',
      images: ['/Assets/ShoeCard/card2.png', '/Assets/ShoeCard/card2_2.png', '/Assets/ShoeCard/card2_3.png']
    },
    { 
      id: 3, 
      name: 'T-shirt basketball', 
      price: 200, 
      img: '/Assets/ShoeCard/card3.png', 
      sizes: 'S , M , L , XL', 
      company: 'YEEZY',
      images: ['/Assets/ShoeCard/card3.png', '/Assets/ShoeCard/card3_2.png', '/Assets/ShoeCard/card3_3.png']
    },
    { 
      id: 4, 
      name: 'T-shirt football pro', 
      price: 120, 
      img: '/Assets/ShoeCard/card4.png', 
      sizes: 'S , M , L , XL', 
      company: 'NIKE',
      images: ['/Assets/ShoeCard/card4.png', '/Assets/ShoeCard/card4_2.png', '/Assets/ShoeCard/card4_3.png']
    },
    { 
      id: 5, 
      name: 'T-shirt classic', 
      price: 90, 
      img: '/Assets/ShoeCard/card5.png', 
      sizes: 'S , M , L , XL', 
      company: 'ADIDAS',
      images: ['/Assets/ShoeCard/card5.png', '/Assets/ShoeCard/card5_2.png', '/Assets/ShoeCard/card5_3.png']
    },
    { 
      id: 6, 
      name: 'T-shirt sport', 
      price: 110, 
      img: '/Assets/ShoeCard/card6.png', 
      sizes: 'S , M , L , XL', 
      company: 'PUMA',
      images: ['/Assets/ShoeCard/card6.png', '/Assets/ShoeCard/card6_2.png', '/Assets/ShoeCard/card6_3.png']
    },
    { 
      id: 7, 
      name: 'T-shirt premium', 
      price: 150, 
      img: '/Assets/ShoeCard/card7.png', 
      sizes: 'S , M , L , XL', 
      company: 'NIKE',
      images: ['/Assets/ShoeCard/card7.png', '/Assets/ShoeCard/card7_2.png', '/Assets/ShoeCard/card7_3.png']
    },
    { 
      id: 8, 
      name: 'T-shirt elite', 
      price: 180, 
      img: '/Assets/ShoeCard/card8.png', 
      sizes: 'S , M , L , XL', 
      company: 'ADIDAS',
      images: ['/Assets/ShoeCard/card8.png', '/Assets/ShoeCard/card8_2.png', '/Assets/ShoeCard/card8_3.png']
    },
    { 
      id: 9, 
      name: 'T-shirt urban', 
      price: 95, 
      img: '/Assets/ShoeCard/card9.png', 
      sizes: 'S , M , L , XL', 
      company: 'PUMA',
      images: ['/Assets/ShoeCard/card9.png', '/Assets/ShoeCard/card9_2.png', '/Assets/ShoeCard/card9_3.png']
    },
    { 
      id: 10, 
      name: 'T-shirt limited', 
      price: 250, 
      img: '/Assets/ShoeCard/card10.png', 
      sizes: 'S , M , L , XL', 
      company: 'YEEZY',
      images: ['/Assets/ShoeCard/card10.png', '/Assets/ShoeCard/card10_2.png', '/Assets/ShoeCard/card10_3.png']
    }
  ];

  // تقسيم المنتجات إلى 3 صفوف (4, 4, 2)
  const rows = [];
  for (let i = 0; i < products.length; i += 4) {
    rows.push(products.slice(i, i + 4));
  }

  const ProductCard = ({ product }) => {
    const price = typeof product.price === 'number' ? product.price : 0;
    const mainImage = product.images?.[0] || product.img;

    return (
      <div className="page-wrapper">
        <div className="page-inner">
          <div className="row">
            <div 
              className="el-wrapper"
              onClick={() => goToSizeSelection({
                ...product,
                price: price,
                images: product.images
              })}
              style={{ cursor: 'pointer' }}
            >
              <div className="box-up">
                <img className="img" src={mainImage} alt={product.name} />
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
                  <span className="price">{price} DH</span>
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
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="products-wrapper">
          {row.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ))}

      {notification.show && (
        <div className="cart-notification">
          ✅ {notification.message}
        </div>
      )}
    </div>
  );
};

export default ShoeCard;