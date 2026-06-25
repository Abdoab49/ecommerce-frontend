import React, { useEffect, useRef } from 'react';
import styles from './ImageScroller.module.css';

const ImageScroller = () => {
  const scrollerRef = useRef(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    // If user hasn't opted for reduced motion, add animation
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Add data-animated="true"
      scroller.setAttribute("data-animated", "true");

      // Get the inner element
      const scrollerInner = scroller.querySelector(`.${styles.scrollerInner}`);
      if (!scrollerInner) return;

      // Get all children
      const scrollerContent = Array.from(scrollerInner.children);

      // Duplicate each item for infinite scroll
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute("aria-hidden", "true");
        scrollerInner.appendChild(duplicatedItem);
      });
    }
  }, []);

  return (
    <div 
      ref={scrollerRef}
      className={styles.scroller} 
      data-direction="right" 
      data-speed="slow"
    >
      <div className={styles.scrollerInner}>
        <img 
          src="https://assets2.razerzone.com/images/pnx.assets/92f9fc3a855858e3e98a86f92cac7207/esports-endorsements-1200x675-larssen-v2.webp" 
          alt="esports endorsement 1" 
        />
        <img 
          src="https://assets2.razerzone.com/images/pnx.assets/92f9fc3a855858e3e98a86f92cac7207/esports-endorsements-1200x675-dropped-v2.webp" 
          alt="esports endorsement 2" 
        />
        <img 
          src="https://assets2.razerzone.com/images/pnx.assets/92f9fc3a855858e3e98a86f92cac7207/esports-endorsements-1200x675-buzz-v3.webp" 
          alt="esports endorsement 3" 
        />
        <img 
          src="https://assets2.razerzone.com/images/pnx.assets/92f9fc3a855858e3e98a86f92cac7207/esports-endorsements-1200x675-ale-v2.webp" 
          alt="esports endorsement 4" 
        />
      </div>
    </div>
  );
};

export default ImageScroller;