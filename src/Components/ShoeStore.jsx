// src/Components/ShoeStore/ShoeStore.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductPrice } from '../Data/prices';
import './ShoeStore.module.css';

const ShoeStore = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [notification, setNotification] = useState({ show: false, message: '' });
  const [clickedButton, setClickedButton] = useState(null);

  const goToSizeSelection = (product) => {
    navigate('/size-selection', { state: { product: product } });
  };

  // ✅ إضافة إلى السلة
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

  // ✅ ✅ ✅ 20 منتج مع 3 صور لكل منتج
  const products = [
    // ===== الصف الأول (1-4) =====
    { 
      id: 1, 
      name: 'NIKE', 
      img: '/Assets/ShoeStore/tshirt1.png', 
      sizes: 'S , M , L , XL', 
      company: 'NIKE TECH',
      images: ['/Assets/ShoeStore/tshirt1.png', '/Assets/ShoeStore/tshirt11.png', '/Assets/ShoeStore/tshirt12.png']
    },
    { 
      id: 2, 
      name: 'ADIDAS', 
      img: '/Assets/ShoeStore/tshirt2.png', 
      sizes: 'S , M , L , XL', 
      company: 'YEEZY',
      images: ['/Assets/ShoeStore/tshirt2.png', '/Assets/ShoeStore/tshirt21.png', '/Assets/ShoeStore/tshirt22.png']
    },
    { 
      id: 3, 
      name: 'PUMA', 
      img: '/Assets/ShoeStore/tshirt3.png', 
      sizes: 'S , M , L , XL', 
      company: 'YEEZY',
      images: ['/Assets/ShoeStore/tshirt3.png', '/Assets/ShoeStore/tshirt31.png', '/Assets/ShoeStore/tshirt32.png']
    },
    { 
      id: 4, 
      name: 'NEW BALANCE', 
      img: '/Assets/ShoeStore/tshirt4.png', 
      sizes: 'S , M , L , XL', 
      company: 'YEEZY',
      images: ['/Assets/ShoeStore/tshirt4.png', '/Assets/ShoeStore/tshirt41.png', '/Assets/ShoeStore/tshirt42.png']
    },

    // ===== الصف الثاني (5-8) =====
    { 
      id: 5, 
      name: 'REEBOK', 
      img: '/Assets/ShoeStore/tshirt5.png', 
      sizes: 'S , M , L , XL', 
      company: 'YEEZY',
      images: ['/Assets/ShoeStore/tshirt5.png', '/Assets/ShoeStore/tshirt51.png', '/Assets/ShoeStore/tshirt52.png']
    },
    { 
      id: 6, 
      name: 'VANS', 
      img: '/Assets/ShoeStore/tshirt6.png', 
      sizes: 'S , M , L , XL', 
      company: 'YEEZY',
      images: ['/Assets/ShoeStore/tshirt6.png', '/Assets/ShoeStore/tshirt61.png', '/Assets/ShoeStore/tshirt62.png']
    },
    { 
      id: 7, 
      name: 'CONVERSE', 
      img: '/Assets/ShoeStore/tshirt7.png', 
      sizes: 'S , M , L , XL', 
      company: 'YEEZY',
      images: ['/Assets/ShoeStore/tshirt7.png', '/Assets/ShoeStore/tshirt71.png', '/Assets/ShoeStore/tshirt72.png']
    },
    { 
      id: 8, 
      name: 'ASICS', 
      img: '/Assets/ShoeStore/tshirt8.png', 
      sizes: 'S , M , L , XL', 
      company: 'YEEZY',
      images: ['/Assets/ShoeStore/tshirt8.png', '/Assets/ShoeStore/tshirt81.png', '/Assets/ShoeStore/tshirt82.png']
    },

    // ===== الصف الثالث (9-12) =====
    { 
      id: 9, 
      name: 'UNDER ARMOUR', 
      img: '/Assets/ShoeStore/tshirt9.png', 
      sizes: 'S , M , L , XL', 
      company: 'YEEZY',
      images: ['/Assets/ShoeStore/tshirt9.png', '/Assets/ShoeStore/tshirt91.png', '/Assets/ShoeStore/tshirt92.png']
    },
    { 
      id: 10, 
      name: 'LACOSTE', 
      img: '/Assets/ShoeStore/tshirt10.png', 
      sizes: 'S , M , L , XL', 
      company: 'YEEZY',
      images: ['/Assets/ShoeStore/tshirt10.png', '/Assets/ShoeStore/tshirt101.png', '/Assets/ShoeStore/tshirt102.png']
    },
    { 
      id: 11, 
      name: 'LE COQ SPORTIF', 
      img: '/Assets/ShoeStore/tshirt11.png', 
      sizes: 'S , M , L , XL', 
      company: 'YEEZY',
      images: ['/Assets/ShoeStore/tshirt11.png', '/Assets/ShoeStore/tshirt111.png', '/Assets/ShoeStore/tshirt112.png']
    },
    { 
      id: 12, 
      name: 'KAPPA', 
      img: '/Assets/ShoeStore/tshirt12.png', 
      sizes: 'S , M , L , XL', 
      company: 'YEEZY',
      images: ['/Assets/ShoeStore/tshirt12.png', '/Assets/ShoeStore/tshirt121.png', '/Assets/ShoeStore/tshirt122.png']
    },

    // ===== الصف الرابع (13-16) =====
    { 
      id: 13, 
      name: 'MIZUNO', 
      img: '/Assets/ShoeStore/tshirt13.png', 
      sizes: 'S , M , L , XL', 
      company: 'YEEZY',
      images: ['/Assets/ShoeStore/tshirt13.png', '/Assets/ShoeStore/tshirt131.png', '/Assets/ShoeStore/tshirt132.png']
    },
    { 
      id: 14, 
      name: 'DIADORA', 
      img: '/Assets/ShoeStore/tshirt14.png', 
      sizes: 'S , M , L , XL', 
      company: 'YEEZY',
      images: ['/Assets/ShoeStore/tshirt14.png', '/Assets/ShoeStore/tshirt141.png', '/Assets/ShoeStore/tshirt142.png']
    },
    { 
      id: 15, 
      name: 'HUMAN MADE', 
      img: '/Assets/ShoeStore/tshirt15.png', 
      sizes: 'S , M , L , XL', 
      company: 'YEEZY',
      images: ['/Assets/ShoeStore/tshirt15.png', '/Assets/ShoeStore/tshirt151.png', '/Assets/ShoeStore/tshirt152.png']
    },
    { 
      id: 16, 
      name: 'KITH', 
      img: '/Assets/ShoeStore/tshirt16.png', 
      sizes: 'S , M , L , XL', 
      company: 'YEEZY',
      images: ['/Assets/ShoeStore/tshirt16.png', '/Assets/ShoeStore/tshirt161.png', '/Assets/ShoeStore/tshirt162.png']
    },

    // ===== الصف الخامس (17-20) =====
    { 
      id: 17, 
      name: 'FENDI', 
      img: '/Assets/ShoeStore/tshirt17.png', 
      sizes: 'S , M , L , XL', 
      company: 'YEEZY',
      images: ['/Assets/ShoeStore/tshirt17.png', '/Assets/ShoeStore/tshirt171.png', '/Assets/ShoeStore/tshirt172.png']
    },
    { 
      id: 18, 
      name: 'GUCCI', 
      img: '/Assets/ShoeStore/tshirt18.png', 
      sizes: 'S , M , L , XL', 
      company: 'YEEZY',
      images: ['/Assets/ShoeStore/tshirt18.png', '/Assets/ShoeStore/tshirt181.png', '/Assets/ShoeStore/tshirt182.png']
    },
    { 
      id: 19, 
      name: 'VERSACE', 
      img: '/Assets/ShoeStore/tshirt19.png', 
      sizes: 'S , M , L , XL', 
      company: 'YEEZY',
      images: ['/Assets/ShoeStore/tshirt19.png', '/Assets/ShoeStore/tshirt191.png', '/Assets/ShoeStore/tshirt192.png']
    },
    { 
      id: 20, 
      name: 'BURBERRY', 
      img: '/Assets/ShoeStore/tshirt20.png', 
      sizes: 'S , M , L , XL', 
      company: 'YEEZY',
      images: ['/Assets/ShoeStore/tshirt20.png', '/Assets/ShoeStore/tshirt201.png', '/Assets/ShoeStore/tshirt202.png']
    },
  ];

  // تقسيم المنتجات إلى 5 صفوف (كل صف 4 منتجات)
  const rows = [];
  for (let i = 0; i < products.length; i += 4) {
    rows.push(products.slice(i, i + 4));
  }

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
                old_price: oldPrice,
                images: product.images
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
                      <span className="old-price">
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

export default ShoeStore;