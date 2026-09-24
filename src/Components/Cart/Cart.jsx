import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import styles from './Cart.module.css';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useContext(ShopContext);

  const [promoCode, setPromoCode] = useState('');
  const [promoPercent, setPromoPercent] = useState(0);
  const [usedPromoCodes, setUsedPromoCodes] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({});

  // ✅ تحميل الأكواد المستعملة من localStorage
  useEffect(() => {
    const saved = localStorage.getItem('usedPromoCodes');
    if (saved) {
      try {
        setUsedPromoCodes(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

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

  const subtotal = cartItems.reduce((total, item) => {
    return total + extractPrice(item.price) * (item.quantity || 1);
  }, 0);

  const shippingFee = subtotal > 0 ? 20 : 0;
  const promoAmount = (subtotal * promoPercent) / 100;
  const total = subtotal + shippingFee - promoAmount;

  const removeItem = (index) => {
    removeFromCart(index);
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

    if (!promoCodes[code]) {
      alert('❌ Invalid promo code');
      setPromoPercent(0);
      return;
    }

    // ✅ تحقق واش الكود مستعمل من قبل
    if (usedPromoCodes.includes(code)) {
      alert(`❌ You already used this code: ${code}`);
      setPromoPercent(0);
      return;
    }

    setPromoPercent(promoCodes[code]);
    alert(`✅ Promo code applied: -${promoCodes[code]}%`);
  };

  // ===== VALIDATION =====
  const validateField = (name, value) => {
    let error = '';

    if (name === 'fullName') {
      if (!value.trim()) {
        error = 'Full name is required';
      } else if (value.trim().length < 3) {
        error = 'Full name must be at least 3 characters';
      } else if (!/^[a-zA-Z\u0600-\u06FF\s'-]+$/.test(value.trim())) {
        error = 'Full name contains invalid characters';
      }
    }

    if (name === 'phone') {
      const cleaned = value.replace(/[\s-]/g, '');
      if (!cleaned) {
        error = 'Phone number is required';
      } else if (!/^(?:\+212|0)(?:[5-7]\d{8})$/.test(cleaned)) {
        error = 'Enter a valid Moroccan phone (e.g. 0612345678)';
      }
    }

    if (name === 'city') {
      if (!value.trim()) {
        error = 'City is required';
      } else if (value.trim().length < 2) {
        error = 'City must be at least 2 characters';
      }
    }

    if (name === 'address') {
      if (!value.trim()) {
        error = 'Address is required';
      } else if (value.trim().length < 5) {
        error = 'Address must be at least 5 characters';
      }
    }

    return error;
  };

  const validateAll = () => {
    const newErrors = {
      fullName: validateField('fullName', fullName),
      phone: validateField('phone', phone),
      city: validateField('city', city),
      address: validateField('address', address),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleFieldChange = (name, value, setter) => {
    setter(value);
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (name, value) => {
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleCheckout = async () => {
    if (isAnimating || loading) return;

    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    if (!validateAll()) {
      alert('Please fix the errors in the shipping form.');
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
          paymentMethod: 'cash_on_delivery',
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
        alert(`✅ Order placed successfully!\nTotal: ${total.toFixed(2)} DH`);

        // ✅ سجل الكود المستعمل
        if (promoPercent > 0 && promoCode) {
          const code = promoCode.toUpperCase();
          const updated = [...usedPromoCodes, code];
          setUsedPromoCodes(updated);
          localStorage.setItem('usedPromoCodes', JSON.stringify(updated));
        }

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
        <h2>Your cart is empty</h2>
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
            <button className={styles.promoCodeCta} onClick={applyPromoCode}>Apply</button>
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
                    {item.size && (
                      <p><strong>Size: {item.size}</strong></p>
                    )}
                  </div>
                </div>

                <div className={styles.price}>{productPrice} DH</div>

                <div className={styles.quantityBox}>
                  <button
                    type="button"
                    className={styles.qtyBtn}
                    onClick={() => updateQuantity(index, productQty - 1)}
                    disabled={productQty <= 1}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={productQty}
                    min="1"
                    className={styles.quantityField}
                    onChange={(e) => updateQuantity(index, parseInt(e.target.value) || 1)}
                  />
                  <button
                    type="button"
                    className={styles.qtyBtn}
                    onClick={() => updateQuantity(index, productQty + 1)}
                  >
                    +
                  </button>
                </div>

                <div className={styles.subtotal}>{productPrice * productQty} DH</div>

                <div className={styles.remove}>
                  <button
                    className={styles.removeBtn}
                    onClick={() => removeItem(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <aside className={styles.aside}>
          <div className={styles.summary}>
            <div className={styles.shippingForm}>
              <h4>📍 Shipping Information</h4>

              <input
                type="text"
                placeholder="Full Name *"
                value={fullName}
                onChange={(e) => handleFieldChange('fullName', e.target.value, setFullName)}
                onBlur={() => handleBlur('fullName', fullName)}
                className={`${styles.formInput} ${errors.fullName ? styles.inputError : ''}`}
              />
              {errors.fullName && <p className={styles.fieldError}>{errors.fullName}</p>}

              <input
                type="tel"
                placeholder="Phone *"
                value={phone}
                onChange={(e) => handleFieldChange('phone', e.target.value, setPhone)}
                onBlur={() => handleBlur('phone', phone)}
                className={`${styles.formInput} ${errors.phone ? styles.inputError : ''}`}
              />
              {errors.phone && <p className={styles.fieldError}>{errors.phone}</p>}

              <input
                type="text"
                placeholder="City *"
                value={city}
                onChange={(e) => handleFieldChange('city', e.target.value, setCity)}
                onBlur={() => handleBlur('city', city)}
                className={`${styles.formInput} ${errors.city ? styles.inputError : ''}`}
              />
              {errors.city && <p className={styles.fieldError}>{errors.city}</p>}

              <input
                type="text"
                placeholder="Address *"
                value={address}
                onChange={(e) => handleFieldChange('address', e.target.value, setAddress)}
                onBlur={() => handleBlur('address', address)}
                className={`${styles.formInput} ${errors.address ? styles.inputError : ''}`}
              />
              {errors.address && <p className={styles.fieldError}>{errors.address}</p>}
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