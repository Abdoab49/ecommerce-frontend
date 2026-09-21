import React from 'react';
import styles from './BookCard.module.css';

const BookCard = () => {
  return (
    <>
      <a href="https://www.mythrillfiction.com/the-dark-rider" alt="Mythrill" target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
        <div className={styles.card}>
          <div className={styles.wrapper}>
            <img src="https://ggayane.github.io/css-experiments/cards/dark_rider-cover.jpg" className={styles.coverImage} alt="Dark Rider Cover" />
          </div>
          <img src="/Assets/ShoeStore/tshirt-brazil1.png" className={styles.title} alt="Dark Rider Title" />
          <img src="https://ggayane.github.io/css-experiments/cards/dark_rider-character.webp" className={styles.character} alt="Dark Rider Character" />
        </div>
      </a>

      <a href="https://www.mythrillfiction.com/force-mage" alt="Mythrill" target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
        <div className={styles.card}>
          <div className={styles.wrapper}>
            <img src="https://ggayane.github.io/css-experiments/cards/force_mage-cover.jpg" className={styles.coverImage} alt="Force Mage Cover" />
          </div>
          <img src="https://ggayane.github.io/css-experiments/cards/force_mage-title.png" className={styles.title} alt="Force Mage Title" />
          <img src="https://ggayane.github.io/css-experiments/cards/force_mage-character.webp" className={styles.character} alt="Force Mage Character" />
        </div>
      </a>
    </>
  );
};

export default BookCard;