
import React, { useContext, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { getProductPrice } from '../Data/prices';
import styles from './SimpleCard.module.css';

const SIZE_OPTIONS = [
  { value: '6⅝', available: true },
  { value: '6¾', available: true },
  { value: '6⅞', available: false },
  { value: '7', available: false },
  { value: '7⅛', available: true },
  { value: '7¼', available: false },
  { value: '7⅜', available: true },
  { value: '7½', available: true },
];

const Card = ({
  imageSrc,
  title,
  description,
  price,
  productId,
  onAddToCart,
  isClicked,
  selectedSize,
  onSelectSize,
  showSizeError,
}) => (
  <div className={styles.card}>
    <div className={styles.imageWrapper}>
      <img
        className={styles.cardImgTop}
        src={imageSrc}
        alt={title}
        loading="lazy"
      />
      <span className={styles.productBadge}>NEW</span>
    </div>

    <div className={styles.cardBody}>
      <p className={styles.cardText}>{description}</p>

      <h5 className={styles.cardTitle}>{title}</h5>

      <p className={styles.cardPrice}>{price}</p>

      <div className={styles.sizeSection}>
        <div className={styles.sizeHeader}>
          <span className={styles.sizeLabel}>Choisir la taille</span>

          <span className={styles.selectedSize}>
            {selectedSize ? `Taille : ${selectedSize}` : 'Sélectionnez'}
          </span>
        </div>

        <div className={styles.sizeOptions}>
          {SIZE_OPTIONS.map((size) => (
            <button
              key={size.value}
              type="button"
              disabled={!size.available}
              onClick={() => onSelectSize(productId, size.value)}
              className={`
                ${styles.sizeButton}
                ${selectedSize === size.value ? styles.sizeSelected : ''}
                ${!size.available ? styles.sizeUnavailable : ''}
              `}
              aria-pressed={selectedSize === size.value}
              aria-label={`Taille ${size.value}${!size.available ? ', indisponible' : ''}`}
            >
              {size.value}
            </button>
          ))}
        </div>

        {showSizeError && !selectedSize && (
          <p className={styles.sizeError}>
            Veuillez choisir une taille.
          </p>
        )}
      </div>

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
  const [selectedSizes, setSelectedSizes] = useState({});
  const [sizeErrors, setSizeErrors] = useState({});

  let cardsData = [
    {
      id: 61,
      imageSrc: '/Assets/casquette/casquette1.png',
      title: 'Casquette structurée Futura',
      description: 'Nike Dri-FIT Pro',
    },
    {
      id: 62,
      imageSrc: '/Assets/casquette/casquette2.png',
      title: 'Casquette Classic 99',
      description: 'Adidas Originals',
    },
    {
      id: 63,
      imageSrc: '/Assets/casquette/casquette3.png',
      title: 'Casquette Urban Style',
      description: 'Puma Flat Brim',
    },
    {
      id: 64,
      imageSrc: '/Assets/casquette/casquette4.png',
      title: 'Casquette Retro Sport',
      description: 'New Era 59FIFTY',
    },
    {
      id: 65,
      imageSrc: '/Assets/casquette/casquette1.png',
      title: 'Casquette Sport Pro',
      description: 'Nike Aerobill',
    },
    {
      id: 66,
      imageSrc: '/Assets/casquette/casquette2.png',
      title: 'Casquette Vintage Wash',
      description: 'Adidas Originals',
    },
    {
      id: 67,
      imageSrc: '/Assets/casquette/casquette3.png',
      title: 'Casquette Streetwear',
      description: 'Puma Essential',
    },
    {
      id: 68,
      imageSrc: '/Assets/casquette/casquette4.png',
      title: 'Casquette Snapback',
      description: 'New Era 9FORTY',
    },
    {
      id: 69,
      imageSrc: '/Assets/casquette/casquette1.png',
      title: 'Casquette Trucker',
      description: 'Nike Sportswear',
    },
    {
      id: 70,
      imageSrc: '/Assets/casquette/casquette2.png',
      title: 'Casquette Luxe',
      description: 'Adidas Premium',
    },
  ];

  cardsData = cardsData.map((card) => {
    const priceData = getProductPrice(card.title);

    return {
      ...card,
      price: priceData?.new_price ?? 0,
      old_price: priceData?.old_price ?? null,
    };
  });

  if (sortOption === 'price-asc') {
    cardsData = [...cardsData].sort((a, b) => a.price - b.price);
  } else if (sortOption === 'price-desc') {
    cardsData = [...cardsData].sort((a, b) => b.price - a.price);
  } else if (sortOption === 'name-asc') {
    cardsData = [...cardsData].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  } else if (sortOption === 'name-desc') {
    cardsData = [...cardsData].sort((a, b) =>
      b.title.localeCompare(a.title)
    );
  }

  const handleSelectSize = (productId, size) => {
    setSelectedSizes((previous) => ({
      ...previous,
      [productId]: size,
    }));

    setSizeErrors((previous) => ({
      ...previous,
      [productId]: false,
    }));
  };

  const handleAddToCart = (productId) => {
    const selectedSize = selectedSizes[productId];

    if (!selectedSize) {
      setSizeErrors((previous) => ({
        ...previous,
        [productId]: true,
      }));
      return;
    }

    addToCart(productId, selectedSize);

    setClickedButton(productId);

    setTimeout(() => {
      setClickedButton((current) =>
        current === productId ? null : current
      );
    }, 1500);
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
            selectedSize={selectedSizes[card.id] || ''}
            onSelectSize={handleSelectSize}
            showSizeError={sizeErrors[card.id]}
          />
        ))}
      </div>
    </div>
  );
};

export default SimpleCard;
