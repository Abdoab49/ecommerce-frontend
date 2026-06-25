import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ShoeStore.css';

const ShoeStore = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [notification, setNotification] = useState({ show: false, message: '' });
  const [clickedButton, setClickedButton] = useState(null);

  // ===== GO TO SIZE SELECTION =====
  const goToSizeSelection = (product) => {
    navigate('/size-selection', { state: { product: product } });
  };

  // ===== ADD TO CART + ربط مع API =====
  const addToCart = async (productName, price, productId, e) => {
    e.stopPropagation();
    
    setClickedButton(productId);
    setTimeout(() => setClickedButton(null), 300);
    
    // ✅ 1. إضافة للسلة (localStorage)
    const newItem = {
      id: productId,
      name: productName,
      price: price.replace(/[^0-9.]/g, ''),
      quantity: 1,
      size: 'M'
    };
    
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    existingCart.push(newItem);
    localStorage.setItem('cart', JSON.stringify(existingCart));
    setCartItems(existingCart);
    
    // ✅ 2. إنشاء الطلب في API Orders (تلقائياً)
    try {
      // جلب المنتجات من Backend
      const productsRes = await fetch('http://localhost:5000/api/products');
      const productsData = await productsRes.json();

      // تجهيز العناصر
      const items = existingCart.map(item => {
        const product = productsData.find(p => p.name === item.name || p._id === item.id);
        return {
          productId: product?._id || item.id,
          quantity: item.quantity || 1,
          size: item.size || 'M'
        };
      });

      // إنشاء الطلب
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items,
          shippingAddress: {
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'USA'
          },
          paymentMethod: 'cash_on_delivery'
        })
      });

      const result = await response.json();

      if (response.ok) {
        console.log('✅ Order created:', result._id);
        console.log('💰 Total:', result.totalAmount);
      } else {
        console.log('❌ Order failed:', result.message);
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
    
    // ✅ إشعار
    setNotification({ show: true, message: `${productName} added to cart & order!` });
    setTimeout(() => {
      setNotification({ show: false, message: '' });
    }, 2000);
  };

  // ===== PRODUCTS =====
  const products = [
    { id: 1, name: 'NIKE', price: '120dh', img: '/Assets/ShoeStore/tshirt1.png', sizes: 'S , M , L , XL', company: 'YEEZY' },
    { id: 2, name: 'T-shirt football', price: '150dh', img: '/Assets/ShoeStore/tshirt2.png', sizes: 'S , M , L , XL', company: 'YEEZY' },
    { id: 3, name: 'T-shirt basketball', price: '120dh', img: '/Assets/ShoeStore/tshirt3.png', sizes: 'S , M , L , XL', company: 'YEEZY' },
    { id: 4, name: 'T-shirt football', price: '120dh', img: '/Assets/ShoeStore/tshirt4.png', sizes: 'S , M , L , XL', company: 'YEEZY' },
    { id: 5, name: 'T-shirt football', price: '120dh', img: '/Assets/ShoeStore/tshirt5.png', sizes: 'S , M , L , XL', company: 'YEEZY' },
    { id: 6, name: 'T-shirt football', price: '120dh', img: '/Assets/ShoeStore/tshirt6.png', sizes: 'S , M , L , XL', company: 'YEEZY' },
    { id: 7, name: 'T-shirt basketball', price: '120dh', img: '/Assets/ShoeStore/tshirt7.png', sizes: 'S , M , L , XL', company: 'YEEZY' },
    { id: 8, name: 'T-shirt football', price: '120dh', img: '/Assets/ShoeStore/tshirt8.png', sizes: 'S , M , L , XL', company: 'YEEZY' }
  ];

  const firstRow = products.slice(0, 4);
  const secondRow = products.slice(4, 8);

  const ProductCard = ({ product }) => (
    <div className="page-wrapper">
      <div className="page-inner">
        <div className="row">
          <div 
            className="el-wrapper"
            onClick={() => goToSizeSelection(product)}
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
                <span className="price">{product.price}</span>
                <div 
                  className={`add-to-cart ${clickedButton === product.id ? 'clicked' : ''}`}
                  onClick={(e) => addToCart(product.name, product.price, product.id, e)}
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
          ✓ {notification.message}
        </div>
      )}
    </div>
  );
};

export default ShoeStore;