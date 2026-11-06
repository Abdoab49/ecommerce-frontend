
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import TruckButton from '../TruckButton/TruckButton';
import { cities, getRegionsByCity } from '../../Data/moroccoCities';
import Notification from '../Notification/Notification';
import styles from './Cart.module.css';

const API = 'https://backend-3lyx.onrender.com/api';

const Cart = () => {
  const navigate = useNavigate();

  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart
  } = useContext(ShopContext);

  const [notification, setNotification] = useState(null);

  // Read Giveaway promo code automatically
  const [promoCode, setPromoCode] = useState(() => {
    return localStorage.getItem('lanada_pending_promo') || '';
  });

  const [promoPercent, setPromoPercent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // SHIPPING INFORMATION
  const [fullName, setFullName] = useState('');
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const [errors, setErrors] = useState({});

  // =========================================
  // USER ID
  // =========================================

  const getUserId = () => {
    return localStorage.getItem('lanada_user_id');
  };

  // =========================================
  // PRICE
  // =========================================

  const extractPrice = (price) => {
    if (typeof price === 'number') return price;

    if (typeof price === 'string') {
      const value = parseFloat(price.replace(/[^0-9.]/g, ''));

      return Number.isNaN(value) ? 0 : value;
    }

    return 0;
  };

  // =========================================
  // PRODUCT IMAGE
  // =========================================

  const getProductImage = (item) => {
    return (
      item.image ||
      item.img ||
      '/Assets/ShoeStore/tshirt1.png'
    );
  };

  // =========================================
  // CART CALCULATIONS
  // =========================================

  const subtotal = cartItems.reduce((sum, item) => {
    return sum + extractPrice(item.price) * (item.quantity || 1);
  }, 0);

  const shippingFee =
    subtotal > 500 ? 0 : subtotal > 0 ? 20 : 0;

  const promoAmount = (subtotal * promoPercent) / 100;

  const total = Math.max(
    0,
    subtotal + shippingFee - promoAmount
  );

  const totalItems = cartItems.reduce((sum, item) => {
    return sum + (item.quantity || 1);
  }, 0);

  // =========================================
  // NOTIFICATION
  // =========================================

  const showNotice = (type, title, message) => {
    setNotification({
      type,
      title,
      message
    });
  };

  // =========================================
  // PROMO CODE VALIDATION
  // =========================================

  const applyPromoCode = async () => {
    if (!promoCode.trim()) {
      showNotice(
        'error',
        'Error',
        'Please enter a promo code.'
      );

      return;
    }

    const userId = getUserId();

    if (!userId) {
      showNotice(
        'error',
        'Login required',
        'Please log in to apply a promo code.'
      );

      navigate('/login');
      return;
    }

    try {
      const response = await fetch(
        `${API}/promo/check-code`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            code: promoCode.trim().toUpperCase(),
            userId
          })
        }
      );

      const result = await response.json();

      if (result.valid) {
        const discount = Number(result.discountPercent) || 0;

        setPromoPercent(discount);
        setPromoCode('');

        // Remove pending Giveaway code after successful validation
        localStorage.removeItem('lanada_pending_promo');

        showNotice(
          'success',
          'Success',
          `Promo code applied: -${discount}%`
        );

      } else {
        setPromoPercent(0);

        showNotice(
          'error',
          'Invalid code',
          result.message || 'Invalid or used code.'
        );
      }

    } catch (error) {
      console.error('Promo error:', error);

      showNotice(
        'error',
        'Connection error',
        'Please try again.'
      );
    }
  };

  // =========================================
  // FIELD VALIDATION
  // =========================================

  const validateField = (name, value) => {
    let error = '';

    if (name === 'fullName') {
      if (!value.trim()) {
        error = 'Full name is required';
      } else if (value.trim().length < 3) {
        error = 'At least 3 characters are required';
      } else if (
        !/^[a-zA-Z\u0600-\u06FF\s'-]+$/.test(value.trim())
      ) {
        error = 'Please enter a valid name';
      }
    }

    if (name === 'phone') {
      const cleaned = value.replace(/[\s-]/g, '');

      if (!cleaned) {
        error = 'Phone number is required';
      } else if (
        !/^(?:\+212|0)(?:[5-7]\d{8})$/.test(cleaned)
      ) {
        error = 'Enter a valid Moroccan phone number';
      }
    }

    if (name === 'city' && !value.trim()) {
      error = 'City is required';
    }

    if (name === 'region' && !value.trim()) {
      error = 'Region is required';
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

  // =========================================
  // VALIDATE ALL FIELDS
  // =========================================

  const validateAll = () => {
    const next = {
      fullName: validateField('fullName', fullName),
      phone: validateField('phone', phone),
      city: validateField('city', city),
      region: validateField('region', region),
      address: validateField('address', address)
    };

    setErrors(next);

    return !Object.values(next).some(Boolean);
  };

  // =========================================
  // HANDLE FIELD CHANGE
  // =========================================

  const changeField = (name, value, setter) => {
    setter(value);

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value)
      }));
    }
  };

  // =========================================
  // CHECKOUT
  // =========================================

  const handleCheckout = async () => {
    if (loading) return;

    const userId = getUserId();

    if (!userId) {
      showNotice(
        'error',
        'Login required',
        'Please log in before placing an order.'
      );

      navigate('/login');
      return;
    }

    if (!cartItems.length) {
      showNotice(
        'error',
        'Empty cart',
        'Your cart is empty.'
      );

      return;
    }

    if (!validateAll()) {
      showNotice(
        'error',
        'Missing information',
        'Please complete the shipping information.'
      );

      return;
    }

    setLoading(true);

    try {
      const orderItems = cartItems.map((item) => ({
        name: item.name || item.title || 'Unknown Product',

        price: extractPrice(item.price),

        quantity: item.quantity || 1,

        size: item.size || 'M',

        image: getProductImage(item),

        category: item.category || 'T-Shirts'
      }));

      const response = await fetch(`${API}/orders`, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          userId,

          items: orderItems,

          subtotal,

          shipping: shippingFee,

          discountPercent: promoPercent,

          discountAmount: promoAmount,

          totalAmount: total,

          paymentMethod: 'cash_on_delivery',

          shippingAddress: {
            fullName,
            phone,
            city,
            region,
            street: address,
            country: 'Morocco'
          }
        })
      });

      const result = await response.json();

      if (response.ok) {
        setOrderSuccess(true);

      } else {
        showNotice(
          'error',
          'Order failed',
          result.message || 'Unable to place your order.'
        );
      }

    } catch (error) {
      console.error('Checkout error:', error);

      showNotice(
        'error',
        'Connection error',
        error.message || 'Please try again.'
      );

    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // ORDER ANIMATION COMPLETE
  // =========================================

  const handleAnimationComplete = () => {
    clearCart();
    setShowSuccessMessage(true);
  };

  // =========================================
  // SUCCESS PAGE
  // =========================================

  if (showSuccessMessage) {
    return (
      <div className={styles.successPage}>
        <div className={styles.successCard}>

          <span className={styles.successMark}>
            ✓
          </span>

          <p className={styles.overline}>
            LANADA ORDER
          </p>

          <h1>Order placed.</h1>

          <p>
            Thank you for your order.
            We will contact you shortly.
          </p>

          <button onClick={() => navigate('/shop')}>
            Continue shopping
          </button>

        </div>
      </div>
    );
  }

  // =========================================
  // EMPTY CART
  // =========================================

  if (!cartItems.length) {
    return (
      <div className={styles.emptyPage}>

        <p className={styles.overline}>
          LANADA / CART
        </p>

        <h1>Your cart is empty.</h1>

        <p>
          Looks like you haven’t added anything
          to your bag yet.
        </p>

        <button onClick={() => navigate('/')}>
          Continue shopping <span>→</span>
        </button>

      </div>
    );
  }

  // =========================================
  // MAIN CART
  // =========================================

  return (
    <div className={styles.cartPage}>

      {/* NOTIFICATION */}
      {notification && (
        <Notification
          type={notification.type}
          title={notification.title}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      {/* TOP BAR */}
      <div className={styles.promoStrip}>
        COMPLIMENTARY SHIPPING ON ORDERS OVER 500 DH
      </div>

      {/* HEADER */}
      <header className={styles.cartHeader}>

        <button
          className={styles.backButton}
          onClick={() => navigate('/')}
        >
          ← <span>CONTINUE SHOPPING</span>
        </button>

        <div className={styles.wordmark}>
          LANADA<span>.</span>
        </div>

        <div className={styles.headerBag}>
          BAG <b>{String(totalItems).padStart(2, '0')}</b>
        </div>

      </header>

      {/* BREADCRUMB */}
      <div className={styles.breadcrumb}>
        HOME <span>/</span> CART
      </div>

      <main className={styles.layout}>

        {/* =================================
            LEFT: PRODUCTS
        ================================= */}

        <section className={styles.productsSection}>

          <div className={styles.sectionHeading}>

            <div>
              <p className={styles.overline}>
                YOUR SELECTION
              </p>

              <h1>
                Shopping bag
                <sup>
                  {String(totalItems).padStart(2, '0')}
                </sup>
              </h1>
            </div>

            <button
              className={styles.clearButton}
              onClick={() => {
                if (
                  window.confirm(
                    'Remove all items from your cart?'
                  )
                ) {
                  clearCart();
                }
              }}
            >
              ⌫ <span>DELETE ALL</span>
            </button>

          </div>

          {/* PRODUCT LIST */}
          <div className={styles.productList}>

            {cartItems.map((item, index) => {
              const quantity = item.quantity || 1;
              const price = extractPrice(item.price);

              return (
                <article
                  className={styles.productRow}
                  key={
                    item.id ||
                    item._id ||
                    `${item.name}-${index}`
                  }
                >

                  {/* IMAGE */}
                  <div className={styles.productPhoto}>
                    <img
                      src={getProductImage(item)}
                      alt={item.name || item.title || 'Product'}
                    />
                  </div>

                  {/* DETAILS */}
                  <div className={styles.productInfo}>

                    <span className={styles.categoryTag}>
                      {(item.category || 'ESSENTIAL').toUpperCase()}
                    </span>

                    <h2>
                      {item.name || item.title || 'Product'}
                    </h2>

                    <div className={styles.productMeta}>

                      {item.color && (
                        <span>
                          Color: <b>{item.color}</b>
                        </span>
                      )}

                      {item.size && (
                        <span>
                          Size: <b>{item.size}</b>
                        </span>
                      )}

                      {!item.color && !item.size && (
                        <span>LANADA COLLECTION</span>
                      )}

                    </div>

                    <div className={styles.mobilePrice}>
                      {price.toFixed(2)} DH
                    </div>

                  </div>

                  {/* PRICE */}
                  <div className={styles.productPrice}>
                    {price.toFixed(2)}
                    <small> DH</small>
                  </div>

                  {/* QUANTITY */}
                  <div className={styles.quantityControl}>

                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      disabled={quantity <= 1}
                      onClick={() =>
                        updateQuantity(index, quantity - 1)
                      }
                    >
                      −
                    </button>

                    <span>
                      {String(quantity).padStart(2, '0')}
                    </span>

                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() =>
                        updateQuantity(index, quantity + 1)
                      }
                    >
                      +
                    </button>

                  </div>

                  {/* REMOVE */}
                  <button
                    type="button"
                    className={styles.removeButton}
                    aria-label="Remove product"
                    onClick={() => removeFromCart(index)}
                  >
                    ×
                  </button>

                </article>
              );
            })}

          </div>

          {/* SUPPORT NOTE */}
          <div className={styles.shippingNote}>

            <span>↗</span>

            <div>
              <b>Need help with your order?</b>

              <p>
                Our team is here to help you with
                sizing, delivery and returns.
              </p>
            </div>

          </div>

        </section>

        {/* =================================
            RIGHT: ORDER SUMMARY
        ================================= */}

        <aside className={styles.summaryColumn}>

          <div className={styles.summaryCard}>

            <p className={styles.overline}>
              THE DETAILS
            </p>

            <h2>Summary</h2>

            {/* TOTALS */}
            <div className={styles.summaryLines}>

              <div>
                <span>Total items</span>

                <b>
                  {String(totalItems).padStart(2, '0')} items
                </b>
              </div>

              <div>
                <span>Subtotal</span>

                <b>
                  {subtotal.toFixed(2)} DH
                </b>
              </div>

              <div>
                <span>Est. delivery</span>

                <b>
                  {shippingFee === 0
                    ? 'FREE'
                    : `${shippingFee.toFixed(2)} DH`}
                </b>
              </div>

              {promoPercent > 0 && (
                <div className={styles.discountLine}>

                  <span>
                    Discount ({promoPercent}%)
                  </span>

                  <b>
                    -{promoAmount.toFixed(2)} DH
                  </b>

                </div>
              )}

            </div>

            {/* FINAL TOTAL */}
            <div className={styles.totalLine}>

              <span>Final payment</span>

              <strong>
                {total.toFixed(2)}
                <small> DH</small>
              </strong>

            </div>

            {/* =================================
                GIVEAWAY / PROMO CODE
            ================================= */}

            <div className={styles.promoBox}>

              <input
                type="text"
                value={promoCode}
                onChange={(e) => {
                  setPromoCode(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    applyPromoCode();
                  }
                }}
                placeholder="Enter promo code"
                aria-label="Promo code"
                autoComplete="off"
              />

              <button
                type="button"
                onClick={applyPromoCode}
              >
                APPLY
              </button>

            </div>

            {shippingFee === 0 && (
              <p className={styles.freeShipping}>
                ✓ You qualify for complimentary shipping.
              </p>
            )}

            {/* =================================
                SHIPPING INFORMATION
            ================================= */}

            <div className={styles.shippingForm}>

              <div className={styles.shippingFormHeading}>

                <span className={styles.overline}>
                  DELIVERY DETAILS
                </span>

                <h3>Where should we send it?</h3>

              </div>

              {/* FULL NAME */}
              <input
                type="text"
                value={fullName}
                onChange={(e) =>
                  changeField(
                    'fullName',
                    e.target.value,
                    setFullName
                  )
                }
                onBlur={() =>
                  setErrors((p) => ({
                    ...p,
                    fullName: validateField(
                      'fullName',
                      fullName
                    )
                  }))
                }
                placeholder="Full name *"
                className={
                  errors.fullName ? styles.invalid : ''
                }
              />

              {errors.fullName && (
                <small>{errors.fullName}</small>
              )}

              {/* PHONE */}
              <input
                type="tel"
                value={phone}
                onChange={(e) =>
                  changeField(
                    'phone',
                    e.target.value,
                    setPhone
                  )
                }
                onBlur={() =>
                  setErrors((p) => ({
                    ...p,
                    phone: validateField('phone', phone)
                  }))
                }
                placeholder="Phone number *"
                className={
                  errors.phone ? styles.invalid : ''
                }
              />

              {errors.phone && (
                <small>{errors.phone}</small>
              )}

              {/* CITY */}
              <select
                value={city}
                onChange={(e) => {
                  changeField('city', e.target.value, setCity);
                  setRegion('');

                  setErrors((prev) => ({
                    ...prev,
                    region: ''
                  }));
                }}
                onBlur={() =>
                  setErrors((p) => ({
                    ...p,
                    city: validateField('city', city)
                  }))
                }
                className={
                  errors.city ? styles.invalid : ''
                }
              >

                <option value="">
                  Select city *
                </option>

                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}

              </select>

              {errors.city && (
                <small>{errors.city}</small>
              )}

              {/* REGION */}
              {city && (
                <>

                  <select
                    value={region}
                    onChange={(e) =>
                      changeField(
                        'region',
                        e.target.value,
                        setRegion
                      )
                    }
                    onBlur={() =>
                      setErrors((p) => ({
                        ...p,
                        region: validateField(
                          'region',
                          region
                        )
                      }))
                    }
                    className={
                      errors.region ? styles.invalid : ''
                    }
                  >

                    <option value="">
                      Select region *
                    </option>

                    {getRegionsByCity(city).map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}

                  </select>

                  {errors.region && (
                    <small>{errors.region}</small>
                  )}

                </>
              )}

              {/* ADDRESS */}
              <textarea
                value={address}
                onChange={(e) =>
                  changeField(
                    'address',
                    e.target.value,
                    setAddress
                  )
                }
                onBlur={() =>
                  setErrors((p) => ({
                    ...p,
                    address: validateField(
                      'address',
                      address
                    )
                  }))
                }
                placeholder="Full delivery address *"
                rows="2"
                className={
                  errors.address ? styles.invalid : ''
                }
              />

              {errors.address && (
                <small>{errors.address}</small>
              )}

            </div>

            {/* =================================
                CHECKOUT
            ================================= */}

            <div className={styles.checkoutArea}>

              <TruckButton
                defaultText={
                  loading
                    ? 'Processing...'
                    : 'CHECKOUT  →'
                }
                successText="ORDER PLACED"
                onClick={handleCheckout}
                trigger={orderSuccess}
                onComplete={handleAnimationComplete}
                disabled={loading}
              />

              <p>
                Secure checkout · Cash on delivery
              </p>

            </div>

          </div>

          {/* TRUST INFORMATION */}
          <div className={styles.trustNotes}>

            <div>
              <span>◇</span>

              <p>
                <b>SECURE PAYMENT</b>

                <small>
                  Your details are protected
                </small>
              </p>
            </div>

            <div>
              <span>↗</span>

              <p>
                <b>DELIVERY ACROSS MOROCCO</b>

                <small>
                  Carefully packed, always
                </small>
              </p>
            </div>

          </div>

        </aside>

      </main>

      {/* FOOTER */}
      <footer className={styles.cartFooter}>
        LANADA<span>.</span>

        <small>
          MADE FOR EVERYDAY MOVEMENT.
        </small>
      </footer>

    </div>
  );
};

export default Cart;
