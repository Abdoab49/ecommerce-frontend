import React from 'react';
import styles from './ScrollingText.module.css';

const ScrollingText = () => {
  return (
    <div className={styles.scrollContainer}>
      <span className={styles.scrollingText}>
        Enjoy free delivery on all orders over 500 DH No minimum items required
      </span>
    </div>
  );
};

export default ScrollingText;