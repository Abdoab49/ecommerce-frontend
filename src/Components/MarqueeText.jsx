import React from 'react';
import styles from './MarqueeText.module.css';

const MarqueeText = () => {
  return (
    <div className={styles.marquee}>
      <div className={styles.track}>
        <div className={styles.content}>
          &nbsp;"Today's offer: Sports jerseys on sale, limited quantity - hurry!"⚽
        </div>
      </div>
    </div>
  );
};

export default MarqueeText;