import styles from './ImageScroller.module.css';
import React, { useEffect, useRef } from 'react';
import './ImageScroller.module.css';

const ImageScroller = () => {
  const scrollerRef = useRef(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      scroller.setAttribute("data-animated", "true");

      const scrollerInner = scroller.querySelector(`.${scrollerInner}`);
      if (!scrollerInner) return;

      const scrollerContent = Array.from(scrollerInner.children);

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
      className={scroller} 
      data-direction="right" 
      data-speed="slow"
    >
      <div className={scrollerInner}>
        <img 
          src="/Assets/ShoeStore/image.scroller1.png" 
          alt="Product 1" 
        />
        <img 
          src="/Assets/ShoeStore/image.scroller2.png" 
          alt="Product 2" 
        />
        <img 
          src="/Assets/ShoeStore/image.scroller3.png" 
          alt="Product 3" 
        />
        <img 
          src="/Assets/ShoeStore/tshirt4.png" 
          alt="Product 4" 
        />
        <img 
          src="/Assets/ShoeStore/tshirt5.png" 
          alt="Product 5" 
        />
        <img 
          src="/Assets/ShoeStore/tshirt6.png" 
          alt="Product 6" 
        />
        <img 
          src="/Assets/ShoeStore/tshirt7.png" 
          alt="Product 7" 
        />
        <img 
          src="/Assets/ShoeStore/tshirt8.png" 
          alt="Product 8" 
        />
      </div>
    </div>
  );
};

export default ImageScroller;