import styles from './MarqueeText.module.css';
import React from 'react';
import './MarqueeText.module.css';

const MarqueeText = () => {
  return (
    <div className={marquee}>
      <div className={track}>
        <div className={content}>
          &nbsp;"Today's offer: Sports jerseys on sale, limited quantity - hurry!"⚽
        </div>
      </div>
    </div>
  );
};

export default MarqueeText;