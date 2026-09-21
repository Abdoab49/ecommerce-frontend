// src/Components/NewShoeStore/NewShoeStore.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductPrice } from '../Data/prices';
import './ShoeStore.module.css';

const NewShoeStore = () => {
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
      category: 'newshoestore',
      image: `/Assets/NewCollection/product${productId}.png`,
      brand: 'NewCollection'
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
      img: '/Assets/NewCollection/product1.png', 
      sizes: 'S , M , L , XL', 
      company: 'NIKE TECH',
      images: ['/Assets/NewCollection/product1.png', '/Assets/NewCollection/product1_2.png', '/Assets/NewCollection/product1_3.png']
    },
    { 
      id: 2, 
      name: 'ADIDAS', 
      img: '/Assets/NewCollection/product2.png', 
      sizes: 'S , M , L , XL', 
      company: 'YEEZY',
      images: ['/Assets/NewCollection/product2.png', '/Assets/NewCollection/product2_2.png', '/Assets/NewCollection/product2_3.png']
    },
    { 
      id: 3, 
      name: 'PUMA', 
      img: '/Assets/NewCollection/product3.png', 
      sizes: 'S , M , L , XL', 
      company: 'YEEZY',
      images: ['/Assets/NewCollection/product3.png', '/Assets/NewCollection/product3_2.png', '/Assets/NewCollection/product3_3.png']
    },
    { 
      id: 4, 
      name: 'NEW BALANCE', 
      img: '/Assets/NewCollection/product4.png', 
      sizes: 'S , M , L , XL', 
      company: 'YEEZY',
      images: ['/Assets/NewCollection/product4.png', '/Assets/NewCollection/product4_2.png', '/Assets/NewCollection/product4_3.png']
    },

    // ===== الصف الثاني (5-8) =====
    { 
      id: 5, 
      name: 'REEBOK', 
      img: '/Assets/NewCollection/product5.png', 
      sizes: 'S , M , L , XL', 
      company: 'YEEZY',
      images: ['/Assets/NewCollection/product5.png', '/Assets/NewCollection/product5_2.png', '/Assets/NewCollection/product5_3.png']
    },
    { 
      id: 6, 
      name: 'VANS', 
      img: '/Assets/NewCollection/product6.png', 
      sizes: 'S , M , L , XL', 
      company: 'YEEZY',
      images: ['/Assets/NewCollection/product6.png', '/Assets/NewCollection/product6_2.png', '/Assets/NewCollection/product6_3.png']
    },
    { 
      id: 7, 
      name: 'CONVERSE', 
      img: '/Assets/NewCollection/product7.png', 
      sizes: 'S , M , L , XL', 
      company: 'YEEZY',
      images: ['/Assets/NewCollection/product7.png', '/Assets/NewCollection/product7_2.png', '/Assets/NewCollection/product7_3.png']
    },
    { 
      id: 8, 
      name: 'ASICS', 
      img: '/Assets/NewCollection/product8.png', 
      sizes: 'S , M , L , XL', 
      company: 'YEEZY',
      images: ['/Assets/NewCollection/product8.png', '/Assets/NewCollection/product8_2.png', '/Assets/NewCollection/product8_3.png']
    },

    // ===== الصف الثالث (9-12) =====
    { 
      id: 9, 
      name: 'UNDER ARMOUR', 
      img: '/Assets/NewCollection/product9.png', 
      sizes: 'S , M , L , XL', 
      company: 'YEEZY',
      images: ['/Assets/NewCollection/product9.png', '/Assets/NewCollection/product9_2.png', '/Assets/NewCollection/product9_3.png']
    },
    { 
      id: 10, 
      name: 'LACOSTE', 
      img: '/Assets/NewCollection/product10.png', 
      sizes: 'S , M , L , XL', 
      company: 'YEEZY',
      images: ['/Assets/NewCollection/product10.png', '/Assets/NewCollection/product10_2.png', '/Assets/NewCollection/product10_3.png']
    },
    { 
      id: 11, 
      name: 'LE COQ SPORTIF', 
      img: '/Assets/NewCollection/product11.png', 
      sizes: 'S , M , L , XL', 
      company: 'YEEZY',
      images: ['/Assets/NewCollection/product11.png', '/Assets/NewCollection/product11_2.png', '/Assets/NewCollection/product11_3.png']
    },
    { 
      id: 12, 
      name: 'KAPPA', 
      img: '/Assets/NewCollection/product12.png', 
      sizes: 'S , M , L , XL', 
      company: 'YEEZY',
      images: ['/Assets/NewCollection/product12.png', '/Assets/NewCollection/product12_2.png', '/Assets/NewCollection/product12_3.png']
    },

    // ===== الصف الرابع (13-16) =====
    { 
      id: 13, 
      name: 'MIZUNO', 
      img: '/Assets/NewCollection/product13.png', 
      sizes: 'S , M , L , XL', 
      company: 'YEEZY',
      images: ['/Assets/NewCollection/product13.png', '/Assets/NewCollection/product13_2.png', '/Assets/NewCollection/product13_3.png']
    },
    { 
      id: 14, 
      name: 'DIADORA', 
      img: '/Assets/NewCollection/product14.png', 
      sizes: 'S , M , L , XL', 
      company: 'YEEZY',
      images: ['/Assets/NewCollection/product14.png', '/Assets/NewCollection/product14_2.png', '/Assets/NewCollection/product14_3.png']
    },
    { 
      id: 15, 
      name: 'HUMAN MADE', 
      img: '/Assets/NewCollection/product15.png', 
      sizes: 'S , M , L , XL', 
      company: 'YEEZY',
      images: ['/Assets/NewCollection/product15.png', '/Assets/NewCollection/product15_2.png', '/Assets/NewCollection/product15_3.png']
    },
    { 
      id: 16, 
      name: 'KITH', 
      img: '/Assets/NewCollection/product16.png', 
      sizes: 'S , M , L , XL', 
      company: 'YEEZY',
      images: ['/Assets/NewCollection/product16.png', '/Assets/NewCollection/product16_2.png', '/Assets/NewCollection/product16_3.png']
    },

    // ===== الصف الخامس (17-20) =====
    { 
      id: 17, 
      name: 'FENDI', 
      img: '/Assets/NewCollection/product17.png', 
      sizes: 'S , M , L , XL', 
      company: 'YEEZY',
      images: ['/Assets/NewCollection/product17.png', '/Assets/NewCollection/product17_2.png', '/Assets/NewCollection/product17_3.png']
    },
    { 
      id: 18, 
      name: 'GUCCI', 
      img: '/Assets/NewCollection/product18.png', 
      sizes: 'S , M , L , XL', 
      company: 'YEEZY',
      images: ['/Assets/NewCollection/product18.png', '/Assets/NewCollection/product18_2.png', '/Assets/NewCollection/product18_3.png']
    },
    { 
      id: 19, 
      name: 'VERSACE', 
      img: '/Assets/NewCollection/product19.png', 
      sizes: 'S , M , L , XL', 
      company: 'YEEZY',
      images: ['/Assets/NewCollection/product19.png', '/Assets/NewCollection/product19_2.png', '/Assets/NewCollection/product19_3.png']
    },
    { 
      id: 20, 
      name: 'BURBERRY', 
      img: '/Assets/NewCollection/product20.png', 
      sizes: 'S , M , L , XL', 
      company: 'YEEZY',
      images: ['/Assets/NewCollection/product20.png', '/Assets/NewCollection/product20_2.png', '/Assets/NewCollection/product20_3.png']
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

export default NewShoeStore;