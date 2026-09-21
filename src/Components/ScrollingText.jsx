import styles from './ScrollingText.module.css';
import React from 'react';
import './ScrollingText.module.css';

const ScrollingText = () => {
  return (
    <div className={scrollContainer}>
      <span className={scrollingText}>
        Free delivery across all Moroccan cities for purchases over 500 MAD.
      </span>
    </div>
  );
};

export default ScrollingText;