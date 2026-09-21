import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductDisplay.css';

const ProductDisplay = ({ product }) => {
  const navigate = useNavigate();
  
  const [state, setState] = useState({
    qty: 1,
    size: product?.sizes?.[0] || 'M',
    color: 'red',
    cart: JSON.parse(localStorage.getItem('cart') || '[]')
  });

  // ✅ تعيين الصورة الرئيسية من المنتج الحالي
  const [mainImg, setMainImg] = useState(product?.image || product?.images?.[0]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  
  const mainWrapperRef = useRef(null);
  const mainImgRef = useRef(null);

  // ✅ الصور المصغرة من المنتج الحالي
  const productImages = product?.images || [product?.image];
  const validImages = productImages.filter(img => img);

  // حفظ السلة في localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  // Format price
  const formatPrice = (n) => {
    if (!n) return '0 ₽';
    return n.toLocaleString('ru-RU') + ' ₽';
  };

  // Show toast notification
  const showToast = (msg) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 2500);
  };

  // ✅ دالة للذهاب إلى صفحة المقاسات
  const goToSizeSelection = () => {
    console.log("===== بدء عملية الانتقال =====");
    console.log("المنتج:", product);
    
    if (!product) {
      console.log("❌ لا يوجد منتج");
      return;
    }
    
    console.log("✅ التوجيه إلى /size-selection");
    navigate('/size-selection', { state: { product } });
  };

  // Add to cart
  const addToCart = () => {
    if (!product) return;
    
    const item = {
      id: product.id || Date.now(),
      title: product.name,
      price: product.new_price || product.price || 0,
      img: mainImg,
      size: state.size,
      color: state.color,
      qty: state.qty
    };
    setState(prev => ({
      ...prev,
      cart: [...prev.cart, item]
    }));
    showToast(`${product.name || 'Product'} (${state.size})`);
    setIsCartOpen(true);
  };

  // Remove from cart
  const removeFromCart = (idx) => {
    setState(prev => ({
      ...prev,
      cart: prev.cart.filter((_, i) => i !== idx)
    }));
  };

  // Update quantity
  const updateQty = (action) => {
    setState(prev => ({
      ...prev,
      qty: action === 'inc' ? Math.min(99, prev.qty + 1) : Math.max(1, prev.qty - 1)
    }));
  };

  // Update size
  const updateSize = (size) => {
    setState(prev => ({ ...prev, size }));
  };

  // Update color
  const updateColor = (color) => {
    setState(prev => ({ ...prev, color }));
  };

  // Change main image
  const changeMainImage = (imgSrc) => {
    setMainImg(imgSrc);
    if (mainImgRef.current) {
      mainImgRef.current.style.transform = 'none';
    }
  };

  // Zoom handlers
  const handleMouseEnter = () => {
    if (mainImgRef.current) {
      mainImgRef.current.style.transform = 'scale(1.5)';
    }
  };

  const handleMouseLeave = () => {
    if (mainImgRef.current) {
      mainImgRef.current.style.transform = 'none';
    }
  };

  const handleMouseMove = (e) => {
    if (mainWrapperRef.current && mainImgRef.current) {
      const rect = mainWrapperRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      mainImgRef.current.style.transformOrigin = `${x}% ${y}%`;
    }
  };

  const sizes = product?.sizes || ['S', 'M', 'L', 'XL', 'XXL'];
  
  const colors = [
    { name: 'red', value: '#ef4444', label: 'Красный' },
    { name: 'blue', value: '#3b82f6', label: 'Синий' },
    { name: 'black', value: '#111827', label: 'Чёрный' }
  ];

  const total = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const count = state.cart.reduce((sum, item) => sum + item.qty, 0);

  // إذا لم يوجد منتج
  if (!product) {
    return (
      <div className="product-page">
        <div className="product-container">
          <div className="loading">Загрузка товара...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <main className="product-page">
        <div className="product-container">
          {/* Gallery Section */}
          <section className="gallery" aria-label="Галерея товара">
            <div className="productdisplay-left">
              {/* الصورة الرئيسية */}
              <div className="productdisplay-img">
                <div 
                  className="image-frame-main"
                  ref={mainWrapperRef}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onMouseMove={handleMouseMove}
                >
                  <img
                    ref={mainImgRef}
                    className="productdisplay-main-img"
                    src={mainImg || 'https://via.placeholder.com/500?text=No+Image'}
                    alt={product.name || 'Product'}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Product Info Section */}
          <section className="product-info">
            <p className="category">{product.category || 'Men / Lifestyle'}</p>
            <h1>{product.name || 'Product Name'}</h1>
            
            <div className="price">
              <span className="price-new">
                ${product.new_price || product.price || '0'}
              </span>
              {product.old_price && (
                <span className="price-old">${product.old_price}</span>
              )}
            </div>
            
            <p className="desc">
              {product.description || 'Классическая модель с видимой амортизацией Air. Дышащий верх, усиленная пятка и цепкая подошва для города и лёгких пробежек.'}
            </p>

            {/* Options */}
            <div className="options">
              <fieldset className="opt-group">
                <legend>Размер</legend>
                <div className="size-selector" role="radiogroup">
                  {sizes.map(size => (
                    <button 
                      key={size}
                      className={`size-btn ${state.size === size ? 'active' : ''}`}
                      onClick={() => updateSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className="opt-group">
                <legend>Цвет</legend>
                <div className="color-selector" role="radiogroup">
                  {colors.map(color => (
                    <button 
                      key={color.name}
                      className={`color-btn ${state.color === color.name ? 'active' : ''}`}
                      style={{ '--c': color.value }}
                      aria-label={color.label}
                      onClick={() => updateColor(color.name)}
                    />
                  ))}
                </div>
              </fieldset>
            </div>

            {/* Actions */}
            <div className="actions">
              <div className="qty" aria-label="Количество">
                <button className="qty-btn" onClick={() => updateQty('dec')}>−</button>
                <span className="qty-val">{state.qty}</span>
                <button className="qty-btn" onClick={() => updateQty('inc')}>+</button>
              </div>
              
              {/* زر شراء الآن - يذهب لصفحة المقاسات */}
              <button className="btn-buy-now" onClick={goToSizeSelection}>
                شراء الآن
              </button>
              
              {/* زر إضافة إلى السلة */}
              <button className="btn-cart" onClick={addToCart}>
                Добавить в корзину
              </button>
            </div>

            {/* Trust badges */}
            <ul className="trust">
              <li>✓ В наличии на складе</li>
              <li>🚚 Бесплатная доставка от 5 000 ₽</li>
              <li>↩️ Возврат в течение 14 дней</li>
            </ul>
          </section>
        </div>
      </main>

      {/* Cart Sidebar */}
      <aside className={`cart-overlay ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-backdrop" onClick={() => setIsCartOpen(false)}></div>
        <div className="cart-panel">
          <div className="cart-header">
            <h2>Корзина ({count})</h2>
            <button className="close-cart" onClick={() => setIsCartOpen(false)}>×</button>
          </div>
          <div className="cart-items">
            {state.cart.length === 0 ? (
              <p className="empty-msg">Пока ничего не добавлено</p>
            ) : (
              state.cart.map((item, idx) => (
                <div className="cart-item" key={idx}>
                  <img src={item.img || 'https://via.placeholder.com/60?text=No+Image'} alt={item.title} />
                  <div>
                    <h4>{item.title}</h4>
                    <p>Размер: {item.size} · Кол-во: {item.qty}</p>
                    <p style={{ fontWeight: 600, marginTop: '4px' }}>{formatPrice(item.price * item.qty)}</p>
                    <button className="remove-btn" onClick={() => removeFromCart(idx)}>Удалить</button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="cart-footer">
            <div className="cart-total">
              <span>Итого:</span>
              <span>{formatPrice(total)}</span>
            </div>
            <button className="btn-checkout" onClick={() => alert('Демонстрация: переход к оплате.')}>
              Оформить заказ
            </button>
          </div>
        </div>
      </aside>

      {/* Toast Notifications */}
      <div className="toast-box">
        {toasts.map(toast => (
          <div key={toast.id} className="toast show">
            <strong>✓ Добавлено</strong>
            {toast.msg}
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductDisplay;