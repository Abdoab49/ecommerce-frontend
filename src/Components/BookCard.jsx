import styles from './BookCard.module.css';
import React from 'react';
import './BookCard.module.css';

const BookCard = () => {
  return (
    <>
      <a href="https://www.mythrillfiction.com/the-dark-rider" alt="Mythrill" target="_blank" rel="noopener noreferrer" className={cardLink}>
        <div className={card}>
          <div className={wrapper}>
            <img src="https://ggayane.github.io/css-experiments/cards/dark_rider-cover.jpg" className={coverImage} alt="Dark Rider Cover" />
          </div>
          <img src="/Assets/ShoeStore/tshirt-brazil1.png" className={title} alt="Dark Rider Title" />
          <img src="https://ggayane.github.io/css-experiments/cards/dark_rider-character.webp" className={character} alt="Dark Rider Character" />
        </div>
      </a>

      <a href="https://www.mythrillfiction.com/force-mage" alt="Mythrill" target="_blank" rel="noopener noreferrer" className={cardLink}>
        <div className={card}>
          <div className={wrapper}>
            <img src="https://ggayane.github.io/css-experiments/cards/force_mage-cover.jpg" className={coverImage} alt="Force Mage Cover" />
          </div>
          <img src="https://ggayane.github.io/css-experiments/cards/force_mage-title.png" className={title} alt="Force Mage Title" />
          <img src="https://ggayane.github.io/css-experiments/cards/force_mage-character.webp" className={character} alt="Force Mage Character" />
        </div>
      </a>
    </>
  );
};

export default BookCard;