import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import styles from './Cart.module.css';

const Cart = () => {
  const navigate = useNavigate();
  const { clearCart } = useContext(ShopContext);
  
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [promoPercent, setPromoPercent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [fullName, setFullName] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  
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
  const shippingFee = subtotal > 0 ? 20 : 0;
  const promoAmount = (subtotal * promoPercent) / 100;
  const total = subtotal + shippingFee - promoAmount;
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
    const promoCodes = {
      '10OFF': 10,
      '20OFF': 20,
      'LANADA15': 15,
      'WELCOME5': 5,
      'LANADA20': 20,
      'SAVE20': 20,
    };

    const code = promoCode.toUpperCase();
    if (promoCodes[code]) {
      setPromoPercent(promoCodes[code]);
      alert(`✅ Promo code applied: -${promoCodes[code]}%`);
    } else {
      alert('❌ Invalid promo code');
      setPromoPercent(0);
    }
  };

  const handleCheckout = async () => {
    if (isAnimating || loading) return;

    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    if (!fullName || !city || !phone || !address) {
      alert('Please fill in all shipping information!');
      return;
    }

    setLoading(true);

    try {
      const orderItems = cartItems.map(item => ({
        name: item.name || item.title || 'Unknown Product',
        price: extractPrice(item.price),
        quantity: item.quantity || 1,
        size: item.size || 'M',
        image: getProductImage(item),
        category: item.category || 'T-Shirts',
      }));

      const response = await fetch('https://backend-3lyx.onrender.com/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: orderItems,
          subtotal: subtotal,
          shipping: shippingFee,
          discountPercent: promoPercent,
          discountAmount: promoAmount,
          totalAmount: total,
          paymentMethod: paymentMethod,
          shippingAddress: {
            fullName: fullName,
            phone: phone,
            city: city,
            street: address,
            country: 'Morocco'
          }
        })
      });

      const result = await response.json();

      if (response.ok) {
        alert(`✅ Order placed successfully!\nTotal: ${total} DH\nPayment: ${paymentMethod === 'cod' ? 'Cash on Delivery' : 'Bank Card'}`);
        
        localStorage.removeItem('cart');
        localStorage.removeItem('cartItems');
        setCartItems([]);
        clearCart();
        navigate('/');
      } else {
        alert('❌ Failed to place order: ' + (result.message || 'Unknown error'));
      }
    } catch (error) {
      alert('❌ Error placing order: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <h2>🛒 Your cart is empty</h2>
        <p>Add some products to your cart to see them here.</p>
        <button className={styles.shopBtn} onClick={() => navigate('/')}>
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
              className={styles.promoCodeField}
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="10OFF, LANADA20..."
            />
            <button className={styles.promoCodeCta} onClick={applyPromoCode}>Appl</button>
          </div>

          {cartItems.map((item, index) => {
            const productImage = getProductImage(item);
            const productPrice = extractPrice(item.price);
            const productQty = item.quantity || 1;
            
            return (
              <div key={index} className={styles.basketProduct}>
                <div className={styles.item}>
                  <div className={styles.productImage}>
                    <img src={productImage} alt={item.name} className={styles.productFrame} />
                  </div>
                  <div className={styles.productDetails}>
                    <h1><strong>{productQty} x {item.name}</strong></h1>
                    <p><strong>Category: {item.category || 'T-Shirts'}</strong></p>
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
              <input type="text" placeholder="Full Name *" value={fullName} onChange={(e) => setFullName(e.target.value)} className={styles.formInput} />
              <input type="text" placeholder="Phone *" value={phone} onChange={(e) => setPhone(e.target.value)} className={styles.formInput} />
              <input type="text" placeholder="City *" value={city} onChange={(e) => setCity(e.target.value)} className={styles.formInput} />
              <input type="text" placeholder="Address *" value={address} onChange={(e) => setAddress(e.target.value)} className={styles.formInput} />
            </div>

            <div className={styles.paymentMethods}>
              <h4>💳 Payment Method</h4>
              <label>
                <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={(e) => setPaymentMethod(e.target.value)} />
                Cash on Delivery (COD)
              </label>
              <label>
                <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={(e) => setPaymentMethod(e.target.value)} />
                Bank Card
              </label>
            </div>

            <div className={styles.summarySubtotal}>
              <div className={styles.subtotalTitle}>Subtotal</div>
              <div className={styles.subtotalValue}>{subtotal} DH</div>
              <div className={styles.subtotalTitle}>Shipping</div>
              <div className={styles.subtotalValue}>{shippingFee} DH</div>
              {promoPercent > 0 && (
                <>
                  <div className={styles.promoTitle}>Promotion ({promoPercent}%)</div>
                  <div className={styles.promoValue}>-{promoAmount.toFixed(2)} DH</div>
                </>
              )}
            </div>

            <div className={styles.summaryTotal}>
              <div className={styles.totalTitle}>Total</div>
              <div className={styles.totalValue}>{total.toFixed(2)} DH</div>
            </div>

            <div className={styles.summaryCheckout}>
              <button
                ref={buttonRef}
                className={`${styles.orderBtn} ${isAnimating ? styles.animate : ''}`}
                onClick={handleCheckout}
                disabled={isAnimating || loading}
              >
                <span className={styles.defaultText}>
                  {loading ? 'Processing...' : 'Place Order'}
                </span>
              </button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Cart;