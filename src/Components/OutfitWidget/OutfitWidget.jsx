// src/Components/OutfitWidget/OutfitWidget.jsx
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import styles from './OutfitWidget.module.css';

const OutfitWidget = ({ currentProductId = null, maxItems = 3 }) => {
  const { all_product } = useContext(ShopContext);
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ Products dyalek — mn ShopContext
  // ✅ Khod 3 products mo3ayynin (mashi currentProduct)
  const recommendations = all_product
    .filter(p => p.id !== currentProductId)   // ✅ Ma kaynch product dyalek
    .slice(0, maxItems);                       // ✅ 3 products

  // ✅ Ila ma kaynch products → ma kaynch widget
  if (recommendations.length === 0) return null;

  const handleClick = (product) => {
    // ✅ Mchi l /size-selection b product
    navigate('/size-selection', {
      state: {
        product: {
          ...product,
          price: product.price,
          img: product.image,
          company: 'LANADA',
          sizes: ['S', 'M', 'L', 'XL'],
          images: [product.image]
        }
      }
    });
  };

  return (
    <div className={styles.outfitWidget}>
      <h2 className={styles.title}>Complete the Look</h2>
      <p className={styles.subtitle}>You might also like these</p>

      <div className={styles.productsGrid}>
        {recommendations.map((product) => (
          <div
            key={product.id}
            className={styles.productCard}
            onClick={() => handleClick(product)}
          >
            <div className={styles.imageWrapper}>
              <img
                src={product.image}
                alt={product.name}
                className={styles.productImage}
              />
            </div>
            <div className={styles.productInfo}>
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.productCategory}>{product.category}</p>
              <div className={styles.priceRow}>
                <span className={styles.price}>{product.price} DH</span>
                {product.old_price && (
                  <span className={styles.oldPrice}>{product.old_price} DH</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OutfitWidget;