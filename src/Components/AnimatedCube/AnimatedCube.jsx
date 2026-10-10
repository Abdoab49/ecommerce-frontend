import React from 'react';
import styles from './AnimatedCube.module.css';

const AnimatedCube = () => {
  const poem = (
    <p>
      If you can <span>keep</span> your head when all about you
      Are <span>losing</span> theirs and <span>blaming</span> it on you;
      If you can <span>trust</span> yourself when all men <span>doubt</span> you,
      But make <span>allowance</span> for their doubting too;
      If you can <span>wait</span> and not be tired by waiting,
      Or, being <span>lied</span> about, don't deal in <span>lies</span>,
      Or, being <span>hated</span>, don't give way to <span>hating</span>,
      And yet don't look too good, nor talk too wise;
    </p>
  );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.containerFull}>
          <div className={`${styles.hue} ${styles.animated}`}></div>
          <img className={styles.backgroundImage} src="https://drive.google.com/thumbnail?id=1_ZMV_LcmUXLsRokuz6WXGyN9zVCGfAHp&sz=w1920" alt="" />
          <img className={styles.boyImage} src="https://drive.google.com/thumbnail?id=1eGqJskQQgBJ67myGekmo4YfIVI3lfDTm&sz=w1920" alt="" />
          <div className={styles.cube}>
            <div className={`${styles.face} ${styles.top}`}></div>
            <div className={`${styles.face} ${styles.bottom}`}></div>
            <div className={`${styles.face} ${styles.left} ${styles.text}`}>{poem}</div>
            <div className={`${styles.face} ${styles.right} ${styles.text}`}>{poem}</div>
            <div className={`${styles.face} ${styles.front}`}></div>
            <div className={`${styles.face} ${styles.back} ${styles.text}`}>{poem}</div>
          </div>
          <div className={styles.containerReflect}>
            <div className={styles.cube}>
              <div className={`${styles.face} ${styles.top}`}></div>
              <div className={`${styles.face} ${styles.bottom}`}></div>
              <div className={`${styles.face} ${styles.left} ${styles.text}`}>{poem}</div>
              <div className={`${styles.face} ${styles.right} ${styles.text}`}>{poem}</div>
              <div className={`${styles.face} ${styles.front}`}></div>
              <div className={`${styles.face} ${styles.back} ${styles.text}`}>{poem}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedCube;