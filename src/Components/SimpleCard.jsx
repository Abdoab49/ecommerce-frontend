import React from 'react';
import styles from './SimpleCard.module.css';

// مكون البطاقة الواحدة
const Card = ({ imageSrc, title, description, price }) => {
  return (
    <div className={styles.card}>
      <img 
        className={styles.cardImgTop} 
        src={imageSrc} 
        alt={title}
      />
      <div className={styles.cardBody}>
        <h5 className={styles.cardTitle}>{title}</h5>
        <p className={styles.cardText}>{description}</p>
        <p className={styles.cardPrice}>{price}</p>
        <button 
          className={styles.btn}
          onClick={() => console.log(`Added ${title} to cart`)}
          type="button"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  );
};

// المكون الرئيسي - 4 بطاقات في صف واحد
const SimpleCard = () => {
  const cardsData = [
    {
      id: 1,
      imageSrc: "/Assets/casquette/casquette1.png",
      title: "Casquette structurée Futura",
      description: "Nike Dri-FIT Pro",
      price: "300DH"
    },
    {
      id: 2,
      imageSrc: "/Assets/casquette/casquette2.png",
      title: "Casquette Classic 99",
      description: "Adidas Originals",
      price: "150DH"
    },
    {
      id: 3,
      imageSrc: "/Assets/casquette/casquette3.png",
      title: "Casquette Urban Style",
      description: "Puma Flat Brim",
      price: "200DH"
    },
    {
      id: 4,
      imageSrc: "/Assets/casquette/casquette4.png",
      title: "Casquette Retro Sport",
      description: "New Era 59FIFTY",
      price: "150DH"
    }
  ];

  return (
    <div className={styles.cardsWrapper}>
      <div className={styles.cardsContainer}>
        {cardsData.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
};

export default SimpleCard;