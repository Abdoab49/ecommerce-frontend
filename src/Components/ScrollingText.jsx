import React from 'react';
import styles from './ScrollingText.module.css';

const ScrollingText = () => {
  return (
    <div className={styles.scrollContainer}>
      <span className={styles.scrollingText}>
        This is the scrolling text that loops infinitely across the screen.
      </span>
    </div>
  );
};

export default ScrollingText;