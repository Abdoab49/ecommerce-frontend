import React, { useState, useEffect, useRef, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import gsap from 'gsap';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import styles from './SizeSelection.module.css';
import ProductGrid from './ProductGrid';

// ✅ تسجيل GSAP Plugins
gsap.registerPlugin(MorphSVGPlugin);

const SizeSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product || null;
  
  const { addToCart } = useContext(ShopContext);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [isSizeRequired, setIsSizeRequired] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const buttonRef = useRef(null);
  const morphRef = useRef(null);
  const shirtRef = useRef(null);

  // ===== ✅ صور المنتج من ShoeStore =====
  const productImages = {
    1: [
      '/Assets/ShoeStore/tshirt1.png',
      '/Assets/ShoeStore/tshirt2.png',
      '/Assets/ShoeStore/tshirt3.png'
    ],
    2: [
      '/Assets/ShoeStore/tshirt2.png',
      '/Assets/ShoeStore/tshirt3.png',
      '/Assets/ShoeStore/tshirt4.png'
    ],
    3: [
      '/Assets/ShoeStore/tshirt3.png',
      '/Assets/ShoeStore/tshirt4.png',
      '/Assets/ShoeStore/tshirt5.png'
    ],
    4: [
      '/Assets/ShoeStore/tshirt4.png',
      '/Assets/ShoeStore/tshirt5.png',
      '/Assets/ShoeStore/tshirt6.png'
    ],
    5: [
      '/Assets/ShoeStore/tshirt5.png',
      '/Assets/ShoeStore/tshirt6.png',
      '/Assets/ShoeStore/tshirt7.png'
    ],
    6: [
      '/Assets/ShoeStore/tshirt6.png',
      '/Assets/ShoeStore/tshirt7.png',
      '/Assets/ShoeStore/tshirt8.png'
    ],
    7: [
      '/Assets/ShoeStore/tshirt7.png',
      '/Assets/ShoeStore/tshirt1.png',
      '/Assets/ShoeStore/tshirt2.png'
    ],
    8: [
      '/Assets/ShoeStore/tshirt8.png',
      '/Assets/ShoeStore/tshirt1.png',
      '/Assets/ShoeStore/tshirt2.png'
    ],
    // ✅ إضافة صور للمنتجات الجديدة (45-52)
    45: [
      '/Assets/tshirt/tshirt1.png',
      '/Assets/tshirt/tshirt1_2.png',
      '/Assets/tshirt/tshirt1_3.png'
    ],
    46: [
      '/Assets/tshirt/tshirt2.png',
      '/Assets/tshirt/tshirt2_2.png',
      '/Assets/tshirt/tshirt2_3.png'
    ],
    47: [
      '/Assets/tshirt/tshirt3.png',
      '/Assets/tshirt/tshirt3_2.png',
      '/Assets/tshirt/tshirt3_3.png'
    ],
    48: [
      '/Assets/tshirt/tshirt4.png',
      '/Assets/tshirt/tshirt4_2.png',
      '/Assets/tshirt/tshirt4_3.png'
    ],
    49: [
      '/Assets/tshirt/tshirt5.png',
      '/Assets/tshirt/tshirt5_2.png',
      '/Assets/tshirt/tshirt5_3.png'
    ],
    50: [
      '/Assets/tshirt/tshirt6.png',
      '/Assets/tshirt/tshirt6_2.png',
      '/Assets/tshirt/tshirt6_3.png'
    ],
    51: [
      '/Assets/tshirt/tshirt7.png',
      '/Assets/tshirt/tshirt7_2.png',
      '/Assets/tshirt/tshirt7_3.png'
    ],
    52: [
      '/Assets/tshirt/tshirt8.png',
      '/Assets/tshirt/tshirt8_2.png',
      '/Assets/tshirt/tshirt8_3.png'
    ],
  };

  // ===== PRODUCT DATA from ShoeStore =====
  const productData = {
    id: product?.id || 1,
    name: product?.name || 'NIKE',
    brand: product?.company || 'YEEZY',
    price: product?.price || '$120',
    originalPrice: '$180.00',
    discount: 33,
    description: product?.description || 'Premium quality t-shirt with modern fit. Designed for comfort and style, perfect for everyday wear.',
    maxQuantity: Infinity,
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'T-Shirts',
    new_price: typeof product?.price === 'string' 
      ? parseFloat(product.price.replace(/[^0-9.]/g, '')) 
      : (typeof product?.price === 'number' ? product.price : 120),
    image: product?.img || '/Assets/ShoeStore/tshirt1.png',
    // ✅ صور متعددة للمنتج
    images: product?.images || productImages[product?.id] || productImages[1]
  };

  // ===== RELATED PRODUCTS =====
  const relatedProducts = [
    { id: 2, name: 'T-shirt football', price: '150dh', img: '/Assets/ShoeStore/tshirt2.png', company: 'YEEZY' },
    { id: 3, name: 'T-shirt basketball', price: '$120', img: '/Assets/ShoeStore/tshirt3.png', company: 'YEEZY' },
    { id: 4, name: 'T-shirt football', price: '$120', img: '/Assets/ShoeStore/tshirt4.png', company: 'YEEZY' },
    { id: 5, name: 'T-shirt football', price: '$120', img: '/Assets/ShoeStore/tshirt5.png', company: 'YEEZY' },
  ];

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setIsSizeRequired(false);
  };

  // ===== ADD TO CART WITH ANIMATION =====
  const handleAddToCart = () => {
    if (!selectedSize) {
      setIsSizeRequired(true);
      return;
    }

    if (isAnimating) return;
    
    setIsAnimating(true);
    setIsAdded(true);
    
    const button = buttonRef.current;
    if (!button) return;

    button.classList.add('active');

    addToCart(productData.id);
    
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingIndex = existingCart.findIndex(item => item.id === productData.id && item.size === selectedSize);
    
    const cartItem = {
      id: productData.id,
      name: productData.name,
      price: productData.price,
      new_price: productData.new_price,
      size: selectedSize,
      quantity: quantity,
      image: productData.image,
      category: productData.category,
      brand: productData.brand
    };
    
    if (existingIndex > -1) {
      existingCart[existingIndex].quantity += quantity;
    } else {
      existingCart.push(cartItem);
    }
    localStorage.setItem('cart', JSON.stringify(existingCart));

    const morph = button.querySelector(`.${styles.morph} path`);
    const shirt = button.querySelectorAll(`.${styles.shirt} svg > path`);
    
    if (morph && shirt.length > 0) {
      try {
        gsap.to(button, {
          keyframes: [{
            '--background-scale': .97,
            duration: .15
          }, {
            '--background-scale': 1,
            delay: .125,
            duration: 1.2,
            ease: 'elastic.out(1, .6)'
          }]
        });

        gsap.to(button, {
          keyframes: [{
            '--shirt-scale': 1,
            '--shirt-y': '-42px',
            '--cart-x': '0px',
            '--cart-scale': 1,
            duration: .4,
            ease: 'power1.in'
          }, {
            '--shirt-y': '-40px',
            duration: .3
          }, {
            '--shirt-y': '16px',
            '--shirt-scale': .9,
            duration: .25,
            ease: 'none'
          }, {
            '--shirt-scale': 0,
            duration: .3,
            ease: 'none'
          }]
        });

        gsap.to(button, {
          '--shirt-second-y': '0px',
          delay: .835,
          duration: .12
        });

        gsap.to(button, {
          keyframes: [{
            '--cart-clip': '12px',
            '--cart-clip-x': '3px',
            delay: .9,
            duration: .06
          }, {
            '--cart-y': '2px',
            duration: .1
          }, {
            '--cart-tick-offset': '0px',
            '--cart-y': '0px',
            duration: .2
          }, {
            '--cart-x': '52px',
            '--cart-rotate': '-15deg',
            duration: .2
          }, {
            '--cart-x': '104px',
            '--cart-rotate': '0deg',
            duration: .2,
            onComplete: () => {
              button.style.overflow = 'hidden';
              button.style.setProperty('--text-o', 0);
              button.style.setProperty('--text-x', '0px');
              button.style.setProperty('--cart-x', '-104px');
            }
          }, {
            '--text-o': 1,
            '--text-x': '12px',
            '--cart-x': '-48px',
            '--cart-scale': .75,
            duration: .25,
            onComplete: () => {
              button.classList.remove('active');
              setIsAnimating(false);
              setIsAdded(false);
              navigate('/cart');
            }
          }]
        });

        gsap.to(button, {
          keyframes: [{
            '--text-o': 0,
            duration: .3
          }]
        });

        gsap.to(morph, {
          keyframes: [{
            morphSVG: 'M0 12C6 12 20 10 32 0C43.9024 9.99999 58 12 64 12V13H0V12Z',
            duration: .25,
            ease: 'power1.out'
          }, {
            morphSVG: 'M0 12C6 12 17 12 32 12C47.9024 12 58 12 64 12V13H0V12Z',
            duration: .15,
            ease: 'none'
          }]
        });

        gsap.to(shirt, {
          keyframes: [{
            morphSVG: 'M4.99997 3L8.99997 1.5C8.99997 1.5 10.6901 3 12 3C13.3098 3 15 1.5 15 1.5L19 3L23.5 8L20.5 11L19 9.5L18 22.5C18 22.5 14 21.5 12 21.5C10 21.5 5.99997 22.5 5.99997 22.5L4.99997 9.5L3.5 11L0.5 8L4.99997 3Z',
            duration: .25,
            delay: .25
          }, {
            morphSVG: 'M4.99997 3L8.99997 1.5C8.99997 1.5 10.6901 3 12 3C13.3098 3 15 1.5 15 1.5L19 3L23.5 8L20.5 11L19 9.5L18.5 22.5C18.5 22.5 13.5 22.5 12 22.5C10.5 22.5 5.5 22.5 5.5 22.5L4.99997 9.5L3.5 11L0.5 8L4.99997 3Z',
            duration: .85,
            ease: 'elastic.out(1, .5)'
          }, {
            morphSVG: 'M4.99997 3L8.99997 1.5C8.99997 1.5 10.6901 3 12 3C13.3098 3 15 1.5 15 1.5L19 3L22.5 8L19.5 10.5L19 9.5L17.1781 18.6093C17.062 19.1901 16.778 19.7249 16.3351 20.1181C15.4265 20.925 13.7133 22.3147 12 23C10.2868 22.3147 8.57355 20.925 7.66487 20.1181C7.22198 19.7249 6.93798 19.1901 6.82183 18.6093L4.99997 9.5L4.5 10.5L1.5 8L4.99997 3Z',
            duration: 0,
            delay: 1.25
          }]
        });
      } catch (error) {
        console.log('GSAP Animation error:', error);
        setTimeout(() => {
          button.classList.remove('active');
          setIsAnimating(false);
          setIsAdded(false);
          navigate('/cart');
        }, 1500);
      }
    } else {
      setTimeout(() => {
        button.classList.remove('active');
        setIsAnimating(false);
        setIsAdded(false);
        navigate('/cart');
      }, 1500);
    }
  };

  // ===== التنقل بين الصور =====
  const goToImage = (index) => {
    setCurrentImage(index);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % productData.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + productData.images.length) % productData.images.length);
  };

  const goToProduct = (p) => {
    navigate('/size-selection', { state: { product: p } });
  };

  return (
    <div className={styles.container}>
      <div className={styles.productWrapper}>
        
        {/* ===== PRODUCT IMAGE ===== */}
        <div className={styles.imageSection}>
          <div className={styles.imageFrame}>
            <img 
              src={productData.images[currentImage]} 
              alt={productData.name}
              className={styles.productImage}
            />
            
            {/* ✅ أزرار التنقل بين الصور */}
            {productData.images.length > 1 && (
              <>
                <button className={styles.prevBtn} onClick={prevImage}>‹</button>
                <button className={styles.nextBtn} onClick={nextImage}>›</button>
                <div className={styles.imageCounter}>
                  {currentImage + 1} / {productData.images.length}
                </div>
              </>
            )}
          </div>
          
          {/* ===== THUMBNAILS ===== */}
          <div className={styles.thumbnails}>
            {productData.images.slice(0, 6).map((img, index) => (
              <div 
                key={index}
                className={`${styles.thumbnail} ${currentImage === index ? styles.active : ''}`}
                onClick={() => goToImage(index)}
              >
                <img src={img} alt={`thumb ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* ===== PRODUCT INFO ===== */}
        <div className={styles.infoSection}>
          <p className={styles.brand}>{productData.brand}</p>
          <h1 className={styles.title}>{productData.name}</h1>
          <p className={styles.subtitle}>{productData.name} T-Shirt</p>
          
          <div className={styles.priceRow}>
            <span className={styles.currentPrice}>{productData.price}</span>
            <span className={styles.originalPrice}>{productData.originalPrice}</span>
            <span className={styles.discount}>{productData.discount}%</span>
          </div>
          <p className={styles.taxInfo}>incl. of taxes</p>
          <p className={styles.dutyInfo}>(Also includes all applicable duties)</p>

          <div className={styles.sizeSection}>
            <p className={styles.sizeLabel}>Size Select</p>
            <div className={styles.sizeOptions}>
              {productData.sizes.map((size) => (
                <button
                  key={size}
                  className={`${styles.sizeBtn} ${selectedSize === size ? styles.active : ''}`}
                  onClick={() => handleSizeSelect(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            {isSizeRequired && (
              <p className={styles.errorMsg}>Size selection is required</p>
            )}
          </div>

          {/* ===== ADD TO CART BUTTON ===== */}
          <div className={styles.cartRow}>
            <button 
              ref={buttonRef}
              className={`${styles.addToCart} ${isAnimating ? styles.active : ''}`}
              onClick={handleAddToCart}
              disabled={isAnimating}
            >
              <span>Add to cart</span>
              <svg className={styles.morph} viewBox="0 0 64 13">
                <path ref={morphRef} d="M0 12C6 12 17 12 32 12C47.9024 12 58 12 64 12V13H0V12Z" />
              </svg>
              <div className={styles.shirt}>
                <svg className={styles.first} viewBox="0 0 24 24">
                  <path ref={shirtRef} d="M4.99997 3L8.99997 1.5C8.99997 1.5 10.6901 3 12 3C13.3098 3 15 1.5 15 1.5L19 3L22.5 8L19.5 10.5L19 9.5L17.1781 18.6093C17.062 19.1901 16.778 19.7249 16.3351 20.1181C15.4265 20.925 13.7133 22.3147 12 23C10.2868 22.3147 8.57355 20.925 7.66487 20.1181C7.22198 19.7249 6.93798 19.1901 6.82183 18.6093L4.99997 9.5L4.5 10.5L1.5 8L4.99997 3Z" />
                  <g>
                    <path d="M16.3516 9.65383H14.3484V7.83652H14.1742V9.8269H16.5258V7.83652H16.3516V9.65383Z" />
                    <path d="M14.5225 6.01934V7.66357H14.6967V7.4905H14.8186V7.66357H14.9928V6.01934H14.8186V7.31742H14.6967V6.01934H14.5225Z" />
                    <path d="M14.1742 5.67319V7.66357H14.3484V5.84627H16.3516V7.66357H16.5258V5.67319H14.1742Z" />
                    <path d="M15.707 9.48071H15.8812V9.28084L16.0032 9.4807V9.48071H16.1774V7.83648H16.0032V9.14683L15.8812 8.94697V7.83648H15.707V9.48071Z" />
                    <path d="M15.5852 6.01931H15.1149V6.19238H15.5852V6.01931Z" />
                    <path d="M15.707 6.01934V7.66357H15.8812V7.46371L16.0032 7.66357H16.1774V6.01934H16.0032V7.32969L15.8812 7.12984V6.01934H15.707Z" />
                    <path d="M15.411 7.31742H15.2891V6.53857H15.411V7.31742ZM15.1149 7.66357H15.2891V7.4905H15.411V7.66357H15.5852V6.3655H15.1149V7.66357Z" />
                    <path d="M14.5225 8.69756L14.8186 9.18291V9.30763H14.6967V9.13455H14.5225V9.48071H14.9928V9.13456V9.13455L14.6967 8.64917V8.00956H14.8186V8.6586H14.9928V7.83648H14.5225V8.69756Z" />
                    <path d="M15.411 9.30763H15.2891V8.00956H15.411V9.30763ZM15.1149 9.48071H15.5852V7.83648H15.1149V9.48071Z" />
                  </g>
                </svg>
                <svg className={styles.second} viewBox="0 0 24 24">
                  <path d="M4.99997 3L8.99997 1.5C8.99997 1.5 10.6901 3 12 3C13.3098 3 15 1.5 15 1.5L19 3L22.5 8L19.5 10.5L19 9.5L17.1781 18.6093C17.062 19.1901 16.778 19.7249 16.3351 20.1181C15.4265 20.925 13.7133 22.3147 12 23C10.2868 22.3147 8.57355 20.925 7.66487 20.1181C7.22198 19.7249 6.93798 19.1901 6.82183 18.6093L4.99997 9.5L4.5 10.5L1.5 8L4.99997 3Z" />
                  <g>
                    <path d="M16.3516 9.65383H14.3484V7.83652H14.1742V9.8269H16.5258V7.83652H16.3516V9.65383Z" />
                    <path d="M14.5225 6.01934V7.66357H14.6967V7.4905H14.8186V7.66357H14.9928V6.01934H14.8186V7.31742H14.6967V6.01934H14.5225Z" />
                    <path d="M14.1742 5.67319V7.66357H14.3484V5.84627H16.3516V7.66357H16.5258V5.67319H14.1742Z" />
                    <path d="M15.707 9.48071H15.8812V9.28084L16.0032 9.4807V9.48071H16.1774V7.83648H16.0032V9.14683L15.8812 8.94697V7.83648H15.707V9.48071Z" />
                    <path d="M15.5852 6.01931H15.1149V6.19238H15.5852V6.01931Z" />
                    <path d="M15.707 6.01934V7.66357H15.8812V7.46371L16.0032 7.66357H16.1774V6.01934H16.0032V7.32969L15.8812 7.12984V6.01934H15.707Z" />
                    <path d="M15.411 7.31742H15.2891V6.53857H15.411V7.31742ZM15.1149 7.66357H15.2891V7.4905H15.411V7.66357H15.5852V6.3655H15.1149V7.66357Z" />
                    <path d="M14.5225 8.69756L14.8186 9.18291V9.30763H14.6967V9.13455H14.5225V9.48071H14.9928V9.13456V9.13455L14.6967 8.64917V8.00956H14.8186V8.6586H14.9928V7.83648H14.5225V8.69756Z" />
                    <path d="M15.411 9.30763H15.2891V8.00956H15.411V9.30763ZM15.1149 9.48071H15.5852V7.83648H15.1149V9.48071Z" />
                  </g>
                </svg>
              </div>
              <div className={styles.cart}>
                <svg viewBox="0 0 36 26">
                  <path d="M1 2.5H6L10 18.5H25.5L28.5 7.5L7.5 7.5" className={styles.shape} />
                  <path d="M11.5 25C12.6046 25 13.5 24.1046 13.5 23C13.5 21.8954 12.6046 21 11.5 21C10.3954 21 9.5 21.8954 9.5 23C9.5 24.1046 10.3954 25 11.5 25Z" className={styles.wheel} />
                  <path d="M24 25C25.1046 25 26 24.1046 26 23C26 21.8954 25.1046 21 24 21C22.8954 21 22 21.8954 22 23C22 24.1046 22.8954 25 24 25Z" className={styles.wheel} />
                  <path d="M14.5 13.5L16.5 15.5L21.5 10.5" className={styles.tick} />
                </svg>
              </div>
            </button>
          </div>
        </div>

      </div>

      {/* ===== RELATED PRODUCTS ===== */}
      <div className={styles.relatedSection}>
        <h2 className={styles.relatedTitle}>You Might Also Like</h2>
        <div className={styles.relatedGrid}>
          {relatedProducts.map((p) => (
            <div 
              key={p.id} 
              className={styles.relatedCard}
              onClick={() => goToProduct(p)}
            >
              <div className={styles.relatedImage}>
                <img src={p.img} alt={p.name} />
              </div>
              <div className={styles.relatedInfo}>
                <h3 className={styles.relatedName}>{p.name}</h3>
                <p className={styles.relatedBrand}>{p.company}</p>
                <span className={styles.relatedPrice}>{p.price}</span>
                <button className={styles.relatedBtn}>View Product</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== ✅ إضافة ProductGrid هنا ===== */}
      <div className={styles.productGridSection}>
        <ProductGrid />
      </div>

    </div>
  );
};

export default SizeSelection;