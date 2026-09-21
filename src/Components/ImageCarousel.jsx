import styles from './ImageCarousel.module.css';
import React, { useState, useEffect, useRef, useCallback } from 'react';

const ImageCarousel = () => {
  const [items, setItems] = useState([
    { id: 1, img: 'https://i1.sndcdn.com/artworks-000165384395-rhrjdn-t500x500.jpg' },
    { id: 2, img: 'https://i1.sndcdn.com/artworks-000185743981-tuesoj-t500x500.jpg' },
    { id: 3, img: 'https://i1.sndcdn.com/artworks-000158708482-k160g1-t500x500.jpg' },
    { id: 4, img: 'https://i1.sndcdn.com/artworks-000062423439-lf7ll2-t500x500.jpg' },
    { id: 5, img: 'https://i1.sndcdn.com/artworks-000028787381-1vad7y-t500x500.jpg' },
    { id: 6, img: 'https://i1.sndcdn.com/artworks-000108468163-dp0b6y-t500x500.jpg' },
    { id: 7, img: 'https://i1.sndcdn.com/artworks-000064920701-xrez5z-t500x500.jpg' },
    { id: 8, img: 'https://lastfm.freetls.fastly.net/i/u/300x300/1f89759fa92b4c8f86cd7efac06f2d90.png' }
  ]);

  const [selectedIndex, setSelectedIndex] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef(null);
  const touchStartX = useRef(0);

  const getItemPosition = (index) => {
    const totalItems = items.length;
    let diff = index - selectedIndex;
    
    if (diff > totalItems / 2) diff -= totalItems;
    if (diff < -totalItems / 2) diff += totalItems;

    if (diff === 0) return 'selected';
    if (diff === -1) return 'prev';
    if (diff === 1) return 'next';
    if (diff === -2) return 'prevLeftSecond';
    if (diff === 2) return 'nextRightSecond';
    if (diff < 0) return 'hideLeft';
    if (diff > 0) return 'hideRight';
    return 'hideLeft';
  };

  const moveNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSelectedIndex((prev) => (prev + 1) % items.length);
    setTimeout(() => setIsTransitioning(false), 400);
  }, [items.length, isTransitioning]);

  const movePrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSelectedIndex((prev) => (prev - 1 + items.length) % items.length);
    setTimeout(() => setIsTransitioning(false), 400);
  }, [items.length, isTransitioning]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        moveNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        movePrev();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [moveNext, movePrev]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        moveNext();
      } else {
        movePrev();
      }
    }
  };

  const handleMouseDown = (e) => {
    touchStartX.current = e.clientX;
  };

  const handleMouseUp = (e) => {
    const diff = touchStartX.current - e.clientX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        moveNext();
      } else {
        movePrev();
      }
    }
  };

  const handleItemClick = (index) => {
    if (index === selectedIndex) return;
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setSelectedIndex(index);
    setTimeout(() => setIsTransitioning(false), 400);
  };

  return (
    <div className={styles.main}>
      <div 
        className={styles.carousel}
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {items.map((item, index) => {
          const position = getItemPosition(index);
          return (
            <div
              key={item.id}
              className={`${styles.item} ${styles[position]}`}
              onClick={() => handleItemClick(index)}
            >
              <img src={item.img} alt={`Slide ${item.id}`} />
            </div>
          );
        })}
      </div>

      <div className={styles.buttons}>
        <button className={styles.btn} onClick={movePrev}>Prev</button>
        <button className={styles.btn} onClick={moveNext}>Next</button>
      </div>

      <div className={styles.indicators}>
        {items.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${index === selectedIndex ? styles.active : ''}`}
            onClick={() => handleItemClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;