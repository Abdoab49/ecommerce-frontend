// src/Components/TruckButton/TruckButton.jsx
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import styles from './TruckButton.module.css';

const TruckButton = ({
  defaultText = 'Place Order',
  successText = 'Order Placed',
  onClick = null,
  onComplete = null,
  trigger = false,
  disabled = false
}) => {
  const buttonRef = useRef(null);
  const boxRef = useRef(null);
  const truckRef = useRef(null);
  const hasAnimated = useRef(false);

  const handleClick = (e) => {
    e.preventDefault();
    if (disabled) return;
    if (onClick) onClick();
  };

  useEffect(() => {
    if (trigger && !hasAnimated.current) {
      hasAnimated.current = true;

      const button = buttonRef.current;
      const box = boxRef.current;
      const truck = truckRef.current;

      if (!button || !box || !truck) {
        console.log('❌ Button/Box/Truck ma kaynch');
        return;
      }

      if (button.classList.contains(styles.animation)) return;

      button.classList.add(styles.animation);

      gsap.to(box, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        delay: 0.5
      });

      gsap.to(box, {
        x: 0,
        duration: 0.4,
        delay: 0.7
      });

      gsap.to(button, {
        '--hx': -5,
        '--bx': 50,
        duration: 0.18,
        delay: 0.92
      });

      gsap.to(box, {
        y: -6,
        duration: 0.1,
        delay: 1.15
      });

      gsap.set(button, {
        '--truck-y': 0,
        '--truck-y-n': -26
      });

      gsap.to(button, {
        '--truck-y': 1,
        '--truck-y-n': -25,
        duration: 0.2,
        delay: 1.25,
        onComplete() {
          gsap.timeline({
            onComplete() {
              button.classList.add(styles.done);
              // ✅ Animation kammlet → onComplete()
              if (onComplete) onComplete();
            }
          })
            .to(truck, { x: 0, duration: 0.4 })
            .to(truck, { x: 40, duration: 1 })
            .to(truck, { x: 20, duration: 0.6 })
            .to(truck, { x: 96, duration: 0.4 });

          gsap.to(button, {
            '--progress': 1,
            duration: 2.4,
            ease: 'power2.in'
          });
        }
      });
    }
  }, [trigger]);

  return (
    <button
      ref={buttonRef}
      className={styles.truckButton}
      onClick={handleClick}
      disabled={disabled}
      type="button"
    >
      <span className={styles.default}>{defaultText}</span>
      <span className={styles.success}>
        {successText}
        <svg viewBox="0 0 12 10">
          <polyline points="1.5 6 4.5 9 10.5 1" />
        </svg>
      </span>
      <div className={styles.truck} ref={truckRef}>
        <div className={styles.wheel}></div>
        <div className={styles.back}></div>
        <div className={styles.front}></div>
        <div className={styles.box} ref={boxRef}></div>
      </div>
    </button>
  );
};

export default TruckButton;