// src/Components/BannerVideo/BannerVideo.jsx
import React, { useState, useEffect, useRef } from 'react';
import styles from './BannerVideo.module.css';

const BannerVideo = () => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ Touch/Swipe refs
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isPaused = useRef(false);

  // ✅ 3 vidéos — koul wa7da 1080×1350 (portrait 4:5)
  const videos = [
    { id: 1, src: '/Assets/Videos/banner1.mp4', alt: 'Banner 1' },
    { id: 2, src: '/Assets/Videos/banner2.mp4', alt: 'Banner 2' },
    { id: 3, src: '/Assets/Videos/banner3.mp4', alt: 'Banner 3' }
  ];

  // ✅ Autoplay + loop + muted (bla tawa9of)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const videoElements = container.querySelectorAll('video');
    videoElements.forEach((video) => {
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.autoplay = true;

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log('Autoplay blocked:', error);
        });
      }
    });
  }, [currentIndex]);

  // ✅ Carousel — kaytharek koul 4 seconds (kayw9ef melli tlams)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused.current) {
        setCurrentIndex((prev) => (prev + 1) % videos.length);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [videos.length]);

  // ✅ TOUCH START — melli tbda tlams
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
    isPaused.current = true;   // ✅ W9ef carousel melli tlams
  };

  // ✅ TOUCH MOVE — melli kaytharek l'id
  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  // ✅ TOUCH END — melli t7ayed l'id
  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipe = 50;   // ✅ Minimum 50px bach ykoun swipe

    if (swipeDistance > minSwipe) {
      // ✅ Swipe l'isar → vidéo jaya
      setCurrentIndex((prev) => (prev + 1) % videos.length);
    } else if (swipeDistance < -minSwipe) {
      // ✅ Swipe l'imin → vidéo qbel
      setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
    }

    // ✅ Rje3 carousel ba3d 500ms
    setTimeout(() => {
      isPaused.current = false;
    }, 500);
  };

  // ✅ MOUSE (l'desktop) — bach ykhdem hta b l'mouse
  const handleMouseDown = (e) => {
    touchStartX.current = e.clientX;
    touchEndX.current = e.clientX;
    isPaused.current = true;
  };

  const handleMouseMove = (e) => {
    if (isPaused.current) {
      touchEndX.current = e.clientX;
    }
  };

  const handleMouseUp = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipe = 50;

    if (swipeDistance > minSwipe) {
      setCurrentIndex((prev) => (prev + 1) % videos.length);
    } else if (swipeDistance < -minSwipe) {
      setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
    }

    setTimeout(() => {
      isPaused.current = false;
    }, 500);
  };

  const handleMouseLeave = () => {
    if (isPaused.current) {
      isPaused.current = false;
    }
  };

  return (
    <div className={styles.bannerContainer} ref={containerRef}>
      <div
        className={styles.bannerCarousel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {videos.map((video, index) => (
          <div
            key={video.id}
            className={`${styles.bannerItem} ${index === currentIndex ? styles.active : ''}`}
          >
            <video
              className={styles.bannerVideo}
              src={video.src}
              muted
              loop
              autoPlay
              playsInline
              preload="auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerVideo;