import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import TruckButton from '../TruckButton/TruckButton';
import { cities, getRegionsByCity } from '../../Data/moroccoCities';
import styles from './Cart.module.css';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useContext(ShopContext);

  const [promoCode, setPromoCode] = useState('');
  const [promoPercent, setPromoPercent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [fullName, setFullName] = useState('');
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({});

  const getUserId = () => {
    return localStorage.getItem('lanada_user_id');
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

  const subtotal = cartItems.reduce((total, item) => {
    return total + extractPrice(item.price) * (item.quantity || 1);
  }, 0);

  const shippingFee = subtotal > 500 ? 0 : (subtotal > 0 ? 20 : 0);
  const promoAmount = (subtotal * promoPercent) / 100;
  const total = subtotal + shippingFee - promoAmount;

  const removeItem = (index) => {
    removeFromCart(index);
  };

  const applyPromoCode = async () => {
    const promoCodes = {
      '4F334412': 10,
      '20OFF': 20,
      'LANADA15': 15,
      'WELCOME5': 5,
      'LANADA20': 20,
      'SAVE20': 20,
    };

    const code = promoCode.toUpperCase();

    if (!promoCodes[code]) {
      alert('❌ Code promo ghalat');
      setPromoPercent(0);
      return;
    }

    const userId = getUserId();
    if (!userId) {
      alert('⚠️ Khass tdkhol l compte dyalek qbel');
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('https://backend-3lyx.onrender.com/api/promo/check-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, userId })
      });

      const result = await response.json();

      if (result.valid) {
        setPromoPercent(promoCodes[code]);
        alert(`✅ Code promo tsayeb: -${promoCodes[code]}%`);
      } else {
        alert(`❌ ${result.message || 'Code msta3mel'}`);
        setPromoPercent(0);
      }
    } catch (error) {
      console.error('Promo error:', error);
      alert('❌ Mochkil f connection');
    }
  };

  const validateField = (name, value) => {
    let error = '';

    if (name === 'fullName') {
      if (!value.trim()) error = 'Full name is required';
      else if (value.trim().length < 3) error = 'Full name must be at least 3 characters';
      else if (!/^[a-zA-Z\u0600-\u06FF\s'-]+$/.test(value.trim())) error = 'Full name contains invalid characters';
    }

    if (name === 'phone') {
      const cleaned = value.replace(/[\s-]/g, '');
      if (!cleaned) error = 'Phone number is required';
      else if (!/^(?:\+212|0)(?:[5-7]\d{8})$/.test(cleaned)) error = 'Enter a valid Moroccan phone (e.g. 0612345678)';
    }

    if (name === 'city' && !value.trim()) error = 'City is required';
    if (name === 'region' && !value.trim()) error = 'Region is required';

    if (name === 'address') {
      if (!value.trim()) error = 'Address is required';
      else if (value.trim().length < 5) error = 'Address must be at least 5 characters';
    }

    return error;
  };

  const validateAll = () => {
    const newErrors = {
      fullName: validateField('fullName', fullName),
      phone: validateField('phone', phone),
      city: validateField('city', city),
      region: validateField('region', region),
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
    if (loading) return;

    // ✅ Check wach mconnecté
    const userId = getUserId();
    if (!userId) {
      alert('⚠️ Khass tdkhol l compte dyalek qbel ma t3ammer order');
      navigate('/login');
      return;
    }

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
          userId: userId,
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
            region: region,
            street: address,
            country: 'Morocco'
          }
        })
      });

      const result = await response.json();

      if (response.ok) {
        setOrderSuccess(true);
      } else {
        alert('❌ Failed to place order: ' + (result.message || 'Unknown error'));
      }
    } catch (error) {
      alert('❌ Error placing order: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAnimationComplete = () => {
    clearCart();
    setShowSuccessMessage(true);
  };

  if (showSuccessMessage) {
    return (
      <div className={styles.successContainer}>
        <div className={styles.successCard}>
          <h2 className={styles.successTitle}>Commande passée!</h2>
          <p className={styles.successText}>
            Merci pour votre commande. Nous vous contacterons bientôt.
          </p>
          <button
            className={styles.continueShoppingBtn}
            onClick={() => navigate('/shop')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

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
                    <p className={styles.priceInline}>
                      <strong>Price: {productPrice} DH</strong>
                    </p>
                  </div>
                </div>

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

              <select
                value={city}
                onChange={(e) => {
                  handleFieldChange('city', e.target.value, setCity);
                  setRegion('');
                }}
                onBlur={() => handleBlur('city', city)}
                className={`${styles.formInput} ${errors.city ? styles.inputError : ''}`}
              >
                <option value="">-- Select City * --</option>
                {cities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {errors.city && <p className={styles.fieldError}>{errors.city}</p>}

              {city && (
                <>
                  <select
                    value={region}
                    onChange={(e) => handleFieldChange('region', e.target.value, setRegion)}
                    onBlur={() => handleBlur('region', region)}
                    className={`${styles.formInput} ${errors.region ? styles.inputError : ''}`}
                  >
                    <option value="">-- Select Region * --</option>
                    {getRegionsByCity(city).map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                  {errors.region && <p className={styles.fieldError}>{errors.region}</p>}
                </>
              )}

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
              <TruckButton
                defaultText="Place Order"
                successText="Order Placed"
                onClick={handleCheckout}
                trigger={orderSuccess}
                onComplete={handleAnimationComplete}
                disabled={loading}
              />
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Cart;