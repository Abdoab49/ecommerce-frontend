import React from 'react';
import styles from './ScrollingText.module.css';

const ScrollingText = () => {
  return (
    <div className={styles.scrollContainer}>
      <span className={styles.scrollingText}>
        Free delivery across all Moroccan cities for purchases over 500 MAD.
      </span>
    </div>
  );
};

export default ScrollingText;