// src/Components/ShoeStoreItem/ShoeStoreItem.jsx
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import { getProductPrice } from '../../Data/prices';
import './ShoeStoreItem.css';

// ===== ✅ نفس صور SizeSelection =====
const productImages = {
  // MEN
  1: ['/Assets/ShoeStore/tshirt1.png', '/Assets/ShoeStore/tshirt2.png', '/Assets/ShoeStore/tshirt3.png'],
  2: ['/Assets/ShoeStore/tshirt2.png', '/Assets/ShoeStore/tshirt3.png', '/Assets/ShoeStore/tshirt4.png'],
  3: ['/Assets/ShoeStore/tshirt3.png', '/Assets/ShoeStore/tshirt4.png', '/Assets/ShoeStore/tshirt5.png'],
  4: ['/Assets/ShoeStore/tshirt4.png', '/Assets/ShoeStore/tshirt5.png', '/Assets/ShoeStore/tshirt6.png'],
  5: ['/Assets/ShoeStore/tshirt5.png', '/Assets/ShoeStore/tshirt6.png', '/Assets/ShoeStore/tshirt7.png'],
  6: ['/Assets/ShoeStore/tshirt6.png', '/Assets/ShoeStore/tshirt7.png', '/Assets/ShoeStore/tshirt8.png'],
  7: ['/Assets/ShoeStore/tshirt7.png', '/Assets/ShoeStore/tshirt1.png', '/Assets/ShoeStore/tshirt2.png'],
  8: ['/Assets/ShoeStore/tshirt8.png', '/Assets/ShoeStore/tshirt1.png', '/Assets/ShoeStore/tshirt2.png'],

  // WOMEN
  9: ['/Assets/tshirt/tshirt8.png', '/Assets/tshirt/tshirt1.png', '/Assets/tshirt/tshirt2.png'],
  10: ['/Assets/tshirt/tshirt8.png', '/Assets/tshirt/tshirt2.png', '/Assets/tshirt/tshirt3.png'],
  13: ['/Assets/tshirt/tshirt1.png', '/Assets/tshirt/tshirt2.png', '/Assets/tshirt/tshirt3.png'],
  14: ['/Assets/tshirt/tshirt2.png', '/Assets/tshirt/tshirt1.png', '/Assets/tshirt/tshirt3.png'],
  15: ['/Assets/tshirt/tshirt3.png', '/Assets/tshirt/tshirt1.png', '/Assets/tshirt/tshirt2.png'],
  16: ['/Assets/tshirt/tshirt4.png', '/Assets/tshirt/tshirt1.png', '/Assets/tshirt/tshirt2.png'],
  17: ['/Assets/tshirt/tshirt5.png', '/Assets/tshirt/tshirt1.png', '/Assets/tshirt/tshirt2.png'],
  18: ['/Assets/tshirt/tshirt6.png', '/Assets/tshirt/tshirt1.png', '/Assets/tshirt/tshirt2.png'],
  19: ['/Assets/tshirt/tshirt7.png', '/Assets/tshirt/tshirt1.png', '/Assets/tshirt/tshirt2.png'],
  20: ['/Assets/tshirt/tshirt1.png', '/Assets/tshirt/tshirt2.png', '/Assets/tshirt/tshirt3.png'],

  // KIDS
  11: ['/Assets/tshirt/tshirt8.png', '/Assets/tshirt/tshirt1.png', '/Assets/tshirt/tshirt2.png'],
  12: ['/Assets/tshirt/tshirt8.png', '/Assets/tshirt/tshirt2.png', '/Assets/tshirt/tshirt3.png'],
  21: ['/Assets/tshirt/tshirt5.png', '/Assets/tshirt/tshirt1.png', '/Assets/tshirt/tshirt2.png'],
  22: ['/Assets/tshirt/tshirt6.png', '/Assets/tshirt/tshirt1.png', '/Assets/tshirt/tshirt2.png'],
  23: ['/Assets/tshirt/tshirt7.png', '/Assets/tshirt/tshirt1.png', '/Assets/tshirt/tshirt2.png'],
  24: ['/Assets/tshirt/tshirt1.png', '/Assets/tshirt/tshirt2.png', '/Assets/tshirt/tshirt3.png'],
  25: ['/Assets/tshirt/tshirt2.png', '/Assets/tshirt/tshirt1.png', '/Assets/tshirt/tshirt3.png'],
  26: ['/Assets/tshirt/tshirt3.png', '/Assets/tshirt/tshirt1.png', '/Assets/tshirt/tshirt2.png'],
  27: ['/Assets/tshirt/tshirt4.png', '/Assets/tshirt/tshirt1.png', '/Assets/tshirt/tshirt2.png'],
  28: ['/Assets/tshirt/tshirt5.png', '/Assets/tshirt/tshirt1.png', '/Assets/tshirt/tshirt2.png'],

  // NEW
  45: ['/Assets/tshirt/tshirt1.png', '/Assets/tshirt/tshirt1_2.png', '/Assets/tshirt/tshirt1_3.png'],
  46: ['/Assets/tshirt/tshirt2.png', '/Assets/tshirt/tshirt2_2.png', '/Assets/tshirt/tshirt2_3.png'],
  47: ['/Assets/tshirt/tshirt3.png', '/Assets/tshirt/tshirt3_2.png', '/Assets/tshirt/tshirt3_3.png'],
  48: ['/Assets/tshirt/tshirt4.png', '/Assets/tshirt/tshirt4_2.png', '/Assets/tshirt/tshirt4_3.png'],
  49: ['/Assets/tshirt/tshirt5.png', '/Assets/tshirt/tshirt5_2.png', '/Assets/tshirt/tshirt5_3.png'],
  50: ['/Assets/tshirt/tshirt6.png', '/Assets/tshirt/tshirt6_2.png', '/Assets/tshirt/tshirt6_3.png'],
  51: ['/Assets/tshirt/tshirt7.png', '/Assets/tshirt/tshirt7_2.png', '/Assets/tshirt/tshirt7_3.png'],
  52: ['/Assets/tshirt/tshirt8.png', '/Assets/tshirt/tshirt8_2.png', '/Assets/tshirt/tshirt8_3.png'],
};

const ShoeStoreItem = (props) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(ShopContext);
  const { id, name, image, sizes } = props;

  const price = getProductPrice(name);
  const safeNewPrice = price.new_price;
  const safeOldPrice = price.old_price;

  const displaySizes = sizes || 'S , M , L , XL';
  const [clicked, setClicked] = useState(false);

  // ✅ 3 صور للمنتج (من القائمة ولا الصورة الوحيدة)
  const productImagesList = productImages[id] || [image, image, image];

  const handleProductClick = () => {
    const productData = {
      id: id,
      name: name,
      company: 'FASHION',
      price: safeNewPrice,
      old_price: safeOldPrice,        // ✅ زدنا old_price
      img: image,
      description: `${name} - Premium quality product`,
      category: 'T-Shirts',
      sizes: ['S', 'M', 'L', 'XL'],
      images: productImagesList,   // ✅ 3 صور
    };
    navigate('/size-selection', { state: { product: productData } });
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setClicked(true);

    // ✅ نادي addToCart مع size
    addToCart(id, 'M');

    setTimeout(() => setClicked(false), 300);
  };

  return (
    <div className="page-wrapper">
      <div className="page-inner">
        <div className="row">
          <div
            className="el-wrapper"
            onClick={handleProductClick}
            style={{ cursor: 'pointer' }}
          >
            <div className="box-up">
              <img className="img" src={image} alt={name} />
              <div className="img-info">
                <div className="info-inner">
                  <span className="p-name">{name}</span>
                  <span className="p-company">FASHION</span>
                </div>
                <div className="a-size">
                  Available sizes : <span className="size">{displaySizes}</span>
                </div>
              </div>
            </div>
            <div className="box-down">
              <div className="h-bg">
                <div className="h-bg-inner"></div>
              </div>
              <div className="cart">
                <span className="price">
                  ${safeNewPrice.toFixed(2)}
                  {safeOldPrice && safeOldPrice > safeNewPrice && (
                    <span style={{
                      fontSize: '12px',
                      color: '#8c8c8c',
                      textDecoration: 'line-through',
                      marginLeft: '8px'
                    }}>
                      ${safeOldPrice.toFixed(2)}
                    </span>
                  )}
                </span>
                <div
                  className={`add-to-cart ${clicked ? 'clicked' : ''}`}
                  onClick={handleAddToCart}
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
};

export default ShoeStoreItem;