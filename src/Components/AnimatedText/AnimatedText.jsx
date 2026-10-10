// src/Components/AnimatedText/AnimatedText.jsx
import React from 'react';
import styles from './AnimatedText.module.css';

const AnimatedText = () => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.paragraph}>
        Spice up your type with CSS
        <span className={styles.span}>
          Animated text fill
        </span>
        &mdash; no JavaScript required &mdash;
      </p>
    </div>
  );
};

export default AnimatedText;