import styles from './Cart.module.css';
// src/pages/Cart.jsx
import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import './Cart.module.css';

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
        name: item.name || item.title || 'Unknown Product',
        price: extractPrice(item.price),
        quantity: item.quantity || 1,
        size: item.size || 'M',
        image: getProductImage(item),
        category: item.category || 'T-Shirts',
        brand: item.brand || 'National Team'
      }));

      console.log('📦 Order Items:', orderItems);

      const response = await fetch('https://backend-3lyx.onrender.com/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          items: orderItems,
          totalAmount: finalAmount,
          subtotal: totalAmount,
          discount: promoPrice,
          shippingAddress: {
            fullName: fullName,
            phone: phone,
            city: city,
            street: address,
            state: 'Casablanca-Settat',
            zipCode: '20000',
            country: 'Morocco'
          },
          paymentMethod: 'cash_on_delivery'
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
      <div className={emptyCart}>
        <h2>🛒 Your cart is empty</h2>
        <p>Add some products to your cart to see them here.</p>
        <button 
          className={shopBtn}
          onClick={() => navigate('/')}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className={cartContainer}>
      <main className={main}>
        <div className={basket}>
          <div className={basketModule}>
            <label htmlFor="promo-code">Enter a promotional code</label>
            <input
              id="promo-code"
              type="text"
              name="promo-code"
              maxLength="5"
              className={promoCodeField}
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button className={promoCodeCta} onClick={applyPromoCode}>Apply</button>
          </div>

          <div className={basketLabels}>
            <ul>
              <li className={`${item} ${itemHeading}`}>Item</li>
              <li className={price}>Price</li>
              <li className={quantity}>Quantity</li>
              <li className={subtotal}>Subtotal</li>
            </ul>
          </div>

          {cartItems.map((item, index) => {
            const productImage = getProductImage(item);
            const productPrice = extractPrice(item.price);
            const productQty = item.quantity || 1;
            
            return (
              <div key={index} className={basketProduct}>
                <div className={item}>
                  <div className={productImage}>
                    <img 
                      src={productImage} 
                      alt={item.name} 
                      className={productFrame}
                      onError={(e) => {
                        e.target.src = '/Assets/ShoeStore/tshirt1.png';
                      }}
                    />
                  </div>
                  <div className={productDetails}>
                    <h1>
                      <strong>
                        <span className={itemQuantity}>{productQty}</span> x {item.name}
                      </strong>
                    </h1>
                    <p><strong>Category: {item.category || 'T-Shirts'}</strong></p>
                    <p>Product Code - {item.id}</p>
                    {item.size && <p><strong>Size: {item.size}</strong></p>}
                    {item.brand && <p><strong>Brand: {item.brand}</strong></p>}
                  </div>
                </div>
                <div className={price}>{productPrice} DH</div>
                <div className={quantity}>
                  <div className={quantityWrapper}>
                    <button 
                      className={qtyBtn}
                      onClick={() => updateQuantity(index, productQty - 1)}
                      disabled={productQty <= 1}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={productQty}
                      min="1"
                      className={quantityField}
                      onChange={(e) => updateQuantity(index, parseInt(e.target.value) || 1)}
                    />
                    <button 
                      className={qtyBtn}
                      onClick={() => updateQuantity(index, productQty + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className={subtotal}>{productPrice * productQty} DH</div>
                <div className={remove}>
                  <button onClick={() => removeItem(index)}>Remove</button>
                </div>
              </div>
            );
          })}
        </div>

        <aside className={aside}>
          <div className={summary}>
            
            <div className={shippingForm}>
              <h4>📍 Shipping Information</h4>
              <div className={formGroup}>
                <label>Full Name *</label>
                <input
                  type="text"
                  className={formInput}
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className={formGroup}>
                <label>📱 Phone Number *</label>
                <input
                  type="text"
                  className={formInput}
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className={formGroup}>
                <label>📍 City *</label>
                <input
                  type="text"
                  className={formInput}
                  placeholder="Enter your city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
              <div className={formGroup}>
                <label>📍 Address *</label>
                <input
                  type="text"
                  className={formInput}
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className={summaryTotalItems}>
              <span className={totalItems}>{totalItems}</span> Items in your Bag
            </div>
            <div className={summarySubtotal}>
              <div className={subtotalTitle}>Subtotal</div>
              <div className={subtotalValue}>{subtotal} DH</div>
              <div className={`${summaryPromo} ${promoPrice === 0 ? hide : ''}`}>
                <div className={promoTitle}>Promotion</div>
                <div className={promoValue}>-{promoPrice} DH</div>
              </div>
            </div>

            <div className={summaryTotal}>
              <div className={totalTitle}>Total</div>
              <div className={totalValue}>{total} DH</div>
            </div>
            <div className={summaryCheckout}>
              <button 
                ref={buttonRef}
                className={`${orderBtn} ${isAnimating ? animate : ''}`}
                onClick={handleCheckout}
                disabled={isAnimating || loading}
              >
                <span className={defaultText}>{loading ? 'Processing...' : 'Add Manifest'}</span>
                <span className={successText}>
                  Manifest Added!
                  <svg viewBox="0 0 12 10">
                    <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                  </svg>
                </span>
                <div className={boxOrder}></div>
                <div className={truckOrder}>
                  <div className={backOrder}></div>
                  <div className={frontsOrder}>
                    <div className={windowOrder}></div>
                  </div>
                  <div className={`${lightOrder} ${topOrder}`}></div>
                  <div className={`${lightOrder} ${bottomOrder}`}></div>
                </div>
                <div className={linesOrder}></div>
              </button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Cart;