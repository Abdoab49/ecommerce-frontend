import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Cart.module.css';

const Cart = () => {
  const navigate = useNavigate();
  
  const [cartItems, setCartItems] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [promoPrice, setPromoPrice] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const buttonRef = useRef(null);

  // ===== تحميل المنتجات من localStorage =====
  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = () => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  };

  // ===== حفظ المنتجات في localStorage =====
  const saveCartItems = (items) => {
    localStorage.setItem('cart', JSON.stringify(items));
    setCartItems(items);
  };

  // ===== دالة لاستخراج السعر كرقم =====
  const extractPrice = (price) => {
    if (typeof price === 'number') return price;
    if (typeof price === 'string') {
      const num = parseFloat(price.replace(/[^0-9.]/g, ''));
      return isNaN(num) ? 0 : num;
    }
    return 0;
  };

  // ===== الحصول على الصورة =====
  const getProductImage = (item) => {
    if (item.image) return item.image;
    if (item.img) return item.img;
    return '/Assets/ShoeStore/tshirt1.png';
  };

  // ===== حساب المجموع الكلي =====
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

  // ===== تحديث الكمية =====
  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedItems = [...cartItems];
    updatedItems[index].quantity = newQuantity;
    saveCartItems(updatedItems);
  };

  // ===== حذف منتج =====
  const removeItem = (index) => {
    const updatedItems = cartItems.filter((_, i) => i !== index);
    saveCartItems(updatedItems);
  };

  // ===== تطبيق رمز الخصم =====
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

  // ===== زر Add Manifest =====
  const handleCheckout = () => {
    if (isAnimating) return;
    
    const button = buttonRef.current;
    if (!button) return;
    
    setIsAnimating(true);
    button.classList.add('animate');
    
    setTimeout(() => {
      button.classList.remove('animate');
      setIsAnimating(false);
      
      alert('✅ Order placed successfully!');
      localStorage.removeItem('cart');
      setCartItems([]);
    }, 10000);
  };

  useEffect(() => {
    if (promoPrice > 0 && subtotal < 10) {
      setPromoPrice(0);
    }
  }, [subtotal, promoPrice]);

  // ===== إذا كانت السلة فارغة =====
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
                <div className={styles.price}>${productPrice.toFixed(2)}</div>
                <div className={styles.quantity}>
                  <input
                    type="number"
                    value={productQty}
                    min="1"
                    className={styles.quantityField}
                    onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                  />
                </div>
                <div className={styles.subtotal}>${(productPrice * productQty).toFixed(2)}</div>
                <div className={styles.remove}>
                  <button onClick={() => removeItem(index)}>Remove</button>
                </div>
              </div>
            );
          })}
        </div>

        <aside className={styles.aside}>
          <div className={styles.summary}>
            <div className={styles.summaryTotalItems}>
              <span className={styles.totalItems}>{totalItems}</span> Items in your Bag
            </div>
            <div className={styles.summarySubtotal}>
              <div className={styles.subtotalTitle}>Subtotal</div>
              <div className={styles.subtotalValue}>${subtotal.toFixed(2)}</div>
              <div className={`${styles.summaryPromo} ${promoPrice === 0 ? styles.hide : ''}`}>
                <div className={styles.promoTitle}>Promotion</div>
                <div className={styles.promoValue}>${promoPrice.toFixed(2)}</div>
              </div>
            </div>
            <div className={styles.summaryDelivery}>
              <select name="delivery-collection" className={styles.summaryDeliverySelection}>
                <option value="0">Select Collection or Delivery</option>
                <option value="collection">Collection</option>
                <option value="first-class">Royal Mail 1st Class</option>
                <option value="second-class">Royal Mail 2nd Class</option>
                <option value="signed-for">Royal Mail Special Delivery</option>
              </select>
            </div>
            <div className={styles.summaryTotal}>
              <div className={styles.totalTitle}>Total</div>
              <div className={styles.totalValue}>${total.toFixed(2)}</div>
            </div>
            <div className={styles.summaryCheckout}>
              {/* ===== زر Add Manifest ===== */}
              <button 
                ref={buttonRef}
                className={`${styles.orderBtn} ${isAnimating ? styles.animate : ''}`}
                onClick={handleCheckout}
                disabled={isAnimating}
              >
                <span className={styles.defaultText}>Add Manifest</span>
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