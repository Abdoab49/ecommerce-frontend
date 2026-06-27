// src/pages/Cart.jsx
import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import styles from './Cart.module.css';

const Cart = () => {
  const navigate = useNavigate();
  const { clearCart } = useContext(ShopContext);
  
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [promoPrice, setPromoPrice] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [fullName, setFullName] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  
  const buttonRef = useRef(null);

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = () => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  };

  const saveCartItems = (items) => {
    localStorage.setItem('cart', JSON.stringify(items));
    setCartItems(items);
  };

  const extractPrice = (price) => {
    if (typeof price === 'number') return price;
    if (typeof price === 'string') {
      const num = parseFloat(price.replace(/[^0-9.]/g, ''));
      return isNaN(num) ? 0 : num;
    }
    return 0;
  };

  const getProductImage = (item) => {
    if (item.image) return item.image;
    if (item.img) return item.img;
    return '/Assets/ShoeStore/tshirt1.png';
  };

  const getTotal = () => {
    let total = 0;
    cartItems.forEach(item => {
      const price = extractPrice(item.price);
      const qty = item.quantity || 1;
      total += price * qty;
    });
    return total;
  };

  const subtotal = getTotal();
  const total = subtotal - (promoPrice > 0 && subtotal >= 10 ? promoPrice : 0);
  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedItems = [...cartItems];
    updatedItems[index].quantity = newQuantity;
    saveCartItems(updatedItems);
  };

  const removeItem = (index) => {
    const updatedItems = cartItems.filter((_, i) => i !== index);
    saveCartItems(updatedItems);
  };

  const applyPromoCode = () => {
    if (promoCode === '10off' || promoCode === '10OFF') {
      if (subtotal >= 10) {
        setPromoPrice(10);
      } else {
        alert('Order must be more than £10 for Promo code to apply.');
        setPromoPrice(0);
      }
    } else if (promoCode !== '') {
      alert('Invalid Promo Code');
      setPromoPrice(0);
    }
  };

  // ===== ✅ زر Add Manifest (معدل) =====
  const handleCheckout = async () => {
    console.log('🛒 Starting checkout...');
    
    if (isAnimating || loading) {
      console.log('⏳ Already processing...');
      return;
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    if (!fullName || !city || !phone || !address) {
      alert('Please fill in all shipping information!');
      return;
    }

    setLoading(true);
    console.log('📦 Cart Items:', cartItems);
    
    try {
      const totalAmount = cartItems.reduce((sum, item) => {
        const price = extractPrice(item.price);
        const qty = item.quantity || 1;
        return sum + (price * qty);
      }, 0);

      const finalAmount = promoPrice > 0 && totalAmount >= 10 
        ? totalAmount - promoPrice 
        : totalAmount;

      console.log('💰 Total Amount:', finalAmount);

      const orderItems = cartItems.map(item => ({
        productId: item.id || Date.now().toString(),
        name: item.name || item.title || 'Unknown Product',
        price: extractPrice(item.price),
        quantity: item.quantity || 1,
        size: item.size || 'M',
        image: getProductImage(item),
        category: item.category || 'T-Shirts',
        brand: item.brand || 'National Team'
      }));

      console.log('📦 Order Items:', orderItems);

      // ✅ ✅ ✅ إرسال الطلب بهذه الطريقة (مبسطة)
      const response = await fetch('https://backend-3lyx.onrender.com/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName: fullName,
          phone: phone,
          city: city,
          address: address,
          items: orderItems,
          totalAmount: finalAmount,
          promoPrice: promoPrice
        })
      });

      const result = await response.json();
      console.log('📡 Response:', response.status, result);

      if (response.ok) {
        alert(`✅ Order placed successfully! Total: ${finalAmount} DH`);
        
        localStorage.removeItem('cart');
        localStorage.removeItem('cartItems');
        setCartItems([]);
        clearCart();
        
        window.location.reload();
      } else {
        alert('❌ Failed to place order: ' + (result.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('❌ Error:', error);
      alert('❌ Error placing order: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (promoPrice > 0 && subtotal < 10) {
      setPromoPrice(0);
    }
  }, [subtotal, promoPrice]);

  if (cartItems.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <h2>🛒 Your cart is empty</h2>
        <p>Add some products to your cart to see them here.</p>
        <button 
          className={styles.shopBtn}
          onClick={() => navigate('/')}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className={styles.cartContainer}>
      <main className={styles.main}>
        <div className={styles.basket}>
          <div className={styles.basketModule}>
            <label htmlFor="promo-code">Enter a promotional code</label>
            <input
              id="promo-code"
              type="text"
              name="promo-code"
              maxLength="5"
              className={styles.promoCodeField}
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button className={styles.promoCodeCta} onClick={applyPromoCode}>Apply</button>
          </div>

          <div className={styles.basketLabels}>
            <ul>
              <li className={`${styles.item} ${styles.itemHeading}`}>Item</li>
              <li className={styles.price}>Price</li>
              <li className={styles.quantity}>Quantity</li>
              <li className={styles.subtotal}>Subtotal</li>
            </ul>
          </div>

          {cartItems.map((item, index) => {
            const productImage = getProductImage(item);
            const productPrice = extractPrice(item.price);
            const productQty = item.quantity || 1;
            
            return (
              <div key={index} className={styles.basketProduct}>
                <div className={styles.item}>
                  <div className={styles.productImage}>
                    <img 
                      src={productImage} 
                      alt={item.name} 
                      className={styles.productFrame}
                      onError={(e) => {
                        e.target.src = '/Assets/ShoeStore/tshirt1.png';
                      }}
                    />
                  </div>
                  <div className={styles.productDetails}>
                    <h1>
                      <strong>
                        <span className={styles.itemQuantity}>{productQty}</span> x {item.name}
                      </strong>
                    </h1>
                    <p><strong>Category: {item.category || 'T-Shirts'}</strong></p>
                    <p>Product Code - {item.id}</p>
                    {item.size && <p><strong>Size: {item.size}</strong></p>}
                    {item.brand && <p><strong>Brand: {item.brand}</strong></p>}
                  </div>
                </div>
                <div className={styles.price}>{productPrice} DH</div>
                <div className={styles.quantity}>
                  <input
                    type="number"
                    value={productQty}
                    min="1"
                    className={styles.quantityField}
                    onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                  />
                </div>
                <div className={styles.subtotal}>{productPrice * productQty} DH</div>
                <div className={styles.remove}>
                  <button onClick={() => removeItem(index)}>Remove</button>
                </div>
              </div>
            );
          })}
        </div>

        <aside className={styles.aside}>
          <div className={styles.summary}>
            
            <div className={styles.shippingForm}>
              <h4>📍 Shipping Information</h4>
              <div className={styles.formGroup}>
                <label>Full Name *</label>
                <input
                  type="text"
                  className={styles.formInput}
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>📱 Phone Number *</label>
                <input
                  type="text"
                  className={styles.formInput}
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>📍 City *</label>
                <input
                  type="text"
                  className={styles.formInput}
                  placeholder="Enter your city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>📍 Address *</label>
                <input
                  type="text"
                  className={styles.formInput}
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={styles.summaryTotalItems}>
              <span className={styles.totalItems}>{totalItems}</span> Items in your Bag
            </div>
            <div className={styles.summarySubtotal}>
              <div className={styles.subtotalTitle}>Subtotal</div>
              <div className={styles.subtotalValue}>{subtotal} DH</div>
              <div className={`${styles.summaryPromo} ${promoPrice === 0 ? styles.hide : ''}`}>
                <div className={styles.promoTitle}>Promotion</div>
                <div className={styles.promoValue}>-{promoPrice} DH</div>
              </div>
            </div>

            <div className={styles.summaryTotal}>
              <div className={styles.totalTitle}>Total</div>
              <div className={styles.totalValue}>{total} DH</div>
            </div>
            <div className={styles.summaryCheckout}>
              <button 
                ref={buttonRef}
                className={`${styles.orderBtn} ${isAnimating ? styles.animate : ''}`}
                onClick={handleCheckout}
                disabled={isAnimating || loading}
              >
                <span className={styles.defaultText}>{loading ? 'Processing...' : 'Add Manifest'}</span>
                <span className={styles.successText}>
                  Manifest Added!
                  <svg viewBox="0 0 12 10">
                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                  </svg>
                </span>
                <div className={styles.boxOrder}></div>
                <div className={styles.truckOrder}>
                  <div className={styles.backOrder}></div>
                  <div className={styles.frontsOrder}>
                    <div className={styles.windowOrder}></div>
                  </div>
                  <div className={`${styles.lightOrder} ${styles.topOrder}`}></div>
                  <div className={`${styles.lightOrder} ${styles.bottomOrder}`}></div>
                </div>
                <div className={styles.linesOrder}></div>
              </button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Cart;