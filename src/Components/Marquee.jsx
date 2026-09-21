import React from 'react';
import styles from './Marquee.module.css';

const Marquee = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>pure css · no javascript</p>
        <h1 className={styles.h1}>INFINITE MARQUEE</h1>
      </div>

      <div className={styles.marqueeSection}>
        <div className={`${styles.marqueeRow} ${styles.row1}`}>
          <div className={styles.track}>
            <span className={styles.item}>DESIGN</span><span className={styles.sep}></span>
            <span className={`${styles.item} ${styles.filled}`}>CREATE</span><span className={styles.sep}></span>
            <span className={styles.item}>BUILD</span><span className={styles.sep}></span>
            <span className={`${styles.item} ${styles.filled}`}>SHIP</span><span className={styles.sep}></span>
            <span className={styles.item}>ITERATE</span><span className={styles.sep}></span>
            <span className={`${styles.item} ${styles.filled}`}>REPEAT</span><span className={styles.sep}></span>
            <span className={styles.item}>DESIGN</span><span className={styles.sep}></span>
            <span className={`${styles.item} ${styles.filled}`}>CREATE</span><span className={styles.sep}></span>
            <span className={styles.item}>BUILD</span><span className={styles.sep}></span>
            <span className={`${styles.item} ${styles.filled}`}>SHIP</span><span className={styles.sep}></span>
            <span className={styles.item}>ITERATE</span><span className={styles.sep}></span>
            <span className={`${styles.item} ${styles.filled}`}>REPEAT</span><span className={styles.sep}></span>
          </div>
        </div>

        <div className={`${styles.marqueeRow} ${styles.row2}`}>
          <div className={styles.track}>
            <span className={styles.item}>HTML <span className={styles.badge}>markup</span></span><span className={styles.sep}></span>
            <span className={styles.item}>CSS <span className={styles.badge}>style</span></span><span className={styles.sep}></span>
            <span className={styles.item}>JAVASCRIPT <span className={styles.badge}>logic</span></span><span className={styles.sep}></span>
            <span className={styles.item}>ANIMATION <span className={styles.badge}>motion</span></span><span className={styles.sep}></span>
            <span className={styles.item}>LAYOUT <span className={styles.badge}>grid</span></span><span className={styles.sep}></span>
            <span className={styles.item}>TYPOGRAPHY <span className={styles.badge}>type</span></span><span className={styles.sep}></span>
            <span className={styles.item}>HTML <span className={styles.badge}>markup</span></span><span className={styles.sep}></span>
            <span className={styles.item}>CSS <span className={styles.badge}>style</span></span><span className={styles.sep}></span>
            <span className={styles.item}>JAVASCRIPT <span className={styles.badge}>logic</span></span><span className={styles.sep}></span>
            <span className={styles.item}>ANIMATION <span className={styles.badge}>motion</span></span><span className={styles.sep}></span>
            <span className={styles.item}>LAYOUT <span className={styles.badge}>grid</span></span><span className={styles.sep}></span>
            <span className={styles.item}>TYPOGRAPHY <span className={styles.badge}>type</span></span><span className={styles.sep}></span>
          </div>
        </div>

        <div className={`${styles.marqueeRow} ${styles.row3}`}>
          <div className={styles.track}>
            <span className={styles.item}>Frontend Development</span><span className={styles.sep}></span>
            <span className={styles.item}>CSS Animation</span><span className={styles.sep}></span>
            <span className={styles.item}>Creative Coding</span><span className={styles.sep}></span>
            <span className={styles.item}>Web Design</span><span className={styles.sep}></span>
            <span className={styles.item}>UI Components</span><span className={styles.sep}></span>
            <span className={styles.item}>No Libraries</span><span className={styles.sep}></span>
            <span className={styles.item}>Frontend Development</span><span className={styles.sep}></span>
            <span className={styles.item}>CSS Animation</span><span className={styles.sep}></span>
            <span className={styles.item}>Creative Coding</span><span className={styles.sep}></span>
            <span className={styles.item}>Web Design</span><span className={styles.sep}></span>
            <span className={styles.item}>UI Components</span><span className={styles.sep}></span>
            <span className={styles.item}>No Libraries</span><span className={styles.sep}></span>
          </div>
        </div>
      </div>

      <p className={styles.footer}>hover to pause · css only · no javascript</p>
    </div>
  );
};

export default Marquee;