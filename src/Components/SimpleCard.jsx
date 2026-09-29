import React, { useContext, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import styles from './SimpleCard.module.css';

const Card = ({ imageSrc, title, description, price, productId, onAddToCart, isClicked }) => {
  return (
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
};

const SimpleCard = () => {
  const { addToCart } = useContext(ShopContext);
  const [clickedButton, setClickedButton] = useState(null);

  const cardsData = [
    // ===== الأصليين (4) =====
    { id: 61, imageSrc: "/Assets/casquette/casquette1.png", title: "Casquette structurée Futura", description: "Nike Dri-FIT Pro", price: "300 DH" },
    { id: 62, imageSrc: "/Assets/casquette/casquette2.png", title: "Casquette Classic 99", description: "Adidas Originals", price: "150 DH" },
    { id: 63, imageSrc: "/Assets/casquette/casquette3.png", title: "Casquette Urban Style", description: "Puma Flat Brim", price: "200 DH" },
    { id: 64, imageSrc: "/Assets/casquette/casquette4.png", title: "Casquette Retro Sport", description: "New Era 59FIFTY", price: "150 DH" },

    // ===== الجدد (6) — نفس الصور =====
    { id: 65, imageSrc: "/Assets/casquette/casquette1.png", title: "Casquette Sport Pro", description: "Nike Aerobill", price: "250 DH" },
    { id: 66, imageSrc: "/Assets/casquette/casquette2.png", title: "Casquette Vintage Wash", description: "Adidas Originals", price: "180 DH" },
    { id: 67, imageSrc: "/Assets/casquette/casquette3.png", title: "Casquette Streetwear", description: "Puma Essential", price: "220 DH" },
    { id: 68, imageSrc: "/Assets/casquette/casquette4.png", title: "Casquette Snapback", description: "New Era 9FORTY", price: "160 DH" },
    { id: 69, imageSrc: "/Assets/casquette/casquette1.png", title: "Casquette Trucker", description: "Nike Sportswear", price: "140 DH" },
    { id: 70, imageSrc: "/Assets/casquette/casquette2.png", title: "Casquette Luxe", description: "Adidas Premium", price: "280 DH" }
  ];

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