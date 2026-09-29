import React, { useContext, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { getProductPrice } from './Data/prices';
import styles from './SimpleCard.module.css';

const Card = ({ imageSrc, title, description, price, productId, onAddToCart, isClicked }) => (
  <div className={styles.card}>
    <img className={styles.cardImgTop} src={imageSrc} alt={title} />
    <div className={styles.cardBody}>
      <h5 className={styles.cardTitle}>{title}</h5>
      <p className={styles.cardText}>{description}</p>
      <p className={styles.cardPrice}>{price}</p>
      <button
        className={`${styles.btn} ${isClicked ? styles.clicked : ''}`}
        onClick={() => onAddToCart(productId)}
        type="button"
      >
        {isClicked ? '✓ Ajouté !' : 'Ajouter au panier'}
      </button>
    </div>
  </div>
);

const SimpleCard = ({ sortOption = 'default' }) => {
  const { addToCart } = useContext(ShopContext);
  const [clickedButton, setClickedButton] = useState(null);

  // ✅ الأسماء فقط — بلا أسعار
  let cardsData = [
    { id: 61, imageSrc: '/Assets/casquette/casquette1.png', title: 'Casquette structurée Futura', description: 'Nike Dri-FIT Pro' },
    { id: 62, imageSrc: '/Assets/casquette/casquette2.png', title: 'Casquette Classic 99', description: 'Adidas Originals' },
    { id: 63, imageSrc: '/Assets/casquette/casquette3.png', title: 'Casquette Urban Style', description: 'Puma Flat Brim' },
    { id: 64, imageSrc: '/Assets/casquette/casquette4.png', title: 'Casquette Retro Sport', description: 'New Era 59FIFTY' },
    { id: 65, imageSrc: '/Assets/casquette/casquette1.png', title: 'Casquette Sport Pro', description: 'Nike Aerobill' },
    { id: 66, imageSrc: '/Assets/casquette/casquette2.png', title: 'Casquette Vintage Wash', description: 'Adidas Originals' },
    { id: 67, imageSrc: '/Assets/casquette/casquette3.png', title: 'Casquette Streetwear', description: 'Puma Essential' },
    { id: 68, imageSrc: '/Assets/casquette/casquette4.png', title: 'Casquette Snapback', description: 'New Era 9FORTY' },
    { id: 69, imageSrc: '/Assets/casquette/casquette1.png', title: 'Casquette Trucker', description: 'Nike Sportswear' },
    { id: 70, imageSrc: '/Assets/casquette/casquette2.png', title: 'Casquette Luxe', description: 'Adidas Premium' }
  ];

  // ✅ زيد الأسعار
  cardsData = cardsData.map(c => {
    const priceData = getProductPrice(c.title);
    return { ...c, price: priceData.new_price, old_price: priceData.old_price };
  });

  // ✅ ترتيب
  if (sortOption === 'price-asc') {
    cardsData = [...cardsData].sort((a, b) => a.price - b.price);
  } else if (sortOption === 'price-desc') {
    cardsData = [...cardsData].sort((a, b) => b.price - a.price);
  } else if (sortOption === 'name-asc') {
    cardsData = [...cardsData].sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === 'name-desc') {
    cardsData = [...cardsData].sort((a, b) => b.title.localeCompare(a.title));
  }

  const handleAddToCart = (productId) => {
    addToCart(productId, 'ONE SIZE');
    setClickedButton(productId);
    setTimeout(() => setClickedButton(null), 1500);
  };

  return (
    <div className={styles.cardsWrapper}>
      <div className={styles.cardsContainer}>
        {cardsData.map((card) => (
          <Card
            key={card.id}
            {...card}
            price={`${card.price} DH`}
            productId={card.id}
            onAddToCart={handleAddToCart}
            isClicked={clickedButton === card.id}
          />
        ))}
      </div>
    </div>
  );
};

export default SimpleCard;