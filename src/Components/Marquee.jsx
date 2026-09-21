import styles from './Marquee.module.css';
import React from 'react';
import './Marquee.module.css';

const Marquee = () => {
  return (
    <div className={container}>
      <div className={header}>
        <p className={eyebrow}>pure css · no javascript</p>
        <h1 className={h1}>INFINITE MARQUEE</h1>
      </div>

      <div className={marqueeSection}>
        <div className={`${marqueeRow} ${row1}`}>
          <div className={track}>
            <span className={item}>DESIGN</span><span className={sep}></span>
            <span className={`${item} ${filled}`}>CREATE</span><span className={sep}></span>
            <span className={item}>BUILD</span><span className={sep}></span>
            <span className={`${item} ${filled}`}>SHIP</span><span className={sep}></span>
            <span className={item}>ITERATE</span><span className={sep}></span>
            <span className={`${item} ${filled}`}>REPEAT</span><span className={sep}></span>
            <span className={item}>DESIGN</span><span className={sep}></span>
            <span className={`${item} ${filled}`}>CREATE</span><span className={sep}></span>
            <span className={item}>BUILD</span><span className={sep}></span>
            <span className={`${item} ${filled}`}>SHIP</span><span className={sep}></span>
            <span className={item}>ITERATE</span><span className={sep}></span>
            <span className={`${item} ${filled}`}>REPEAT</span><span className={sep}></span>
          </div>
        </div>

        <div className={`${marqueeRow} ${row2}`}>
          <div className={track}>
            <span className={item}>HTML <span className={badge}>markup</span></span><span className={sep}></span>
            <span className={item}>CSS <span className={badge}>style</span></span><span className={sep}></span>
            <span className={item}>JAVASCRIPT <span className={badge}>logic</span></span><span className={sep}></span>
            <span className={item}>ANIMATION <span className={badge}>motion</span></span><span className={sep}></span>
            <span className={item}>LAYOUT <span className={badge}>grid</span></span><span className={sep}></span>
            <span className={item}>TYPOGRAPHY <span className={badge}>type</span></span><span className={sep}></span>
            <span className={item}>HTML <span className={badge}>markup</span></span><span className={sep}></span>
            <span className={item}>CSS <span className={badge}>style</span></span><span className={sep}></span>
            <span className={item}>JAVASCRIPT <span className={badge}>logic</span></span><span className={sep}></span>
            <span className={item}>ANIMATION <span className={badge}>motion</span></span><span className={sep}></span>
            <span className={item}>LAYOUT <span className={badge}>grid</span></span><span className={sep}></span>
            <span className={item}>TYPOGRAPHY <span className={badge}>type</span></span><span className={sep}></span>
          </div>
        </div>

        <div className={`${marqueeRow} ${row3}`}>
          <div className={track}>
            <span className={item}>Frontend Development</span><span className={sep}></span>
            <span className={item}>CSS Animation</span><span className={sep}></span>
            <span className={item}>Creative Coding</span><span className={sep}></span>
            <span className={item}>Web Design</span><span className={sep}></span>
            <span className={item}>UI Components</span><span className={sep}></span>
            <span className={item}>No Libraries</span><span className={sep}></span>
            <span className={item}>Frontend Development</span><span className={sep}></span>
            <span className={item}>CSS Animation</span><span className={sep}></span>
            <span className={item}>Creative Coding</span><span className={sep}></span>
            <span className={item}>Web Design</span><span className={sep}></span>
            <span className={item}>UI Components</span><span className={sep}></span>
            <span className={item}>No Libraries</span><span className={sep}></span>
          </div>
        </div>
      </div>

      <p className={footer}>hover to pause · css only · no javascript</p>
    </div>
  );
};

export default Marquee;