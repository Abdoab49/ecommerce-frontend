
import React, { useState, useEffect, useRef } from 'react';
import styles from './BannerVideo.module.css';

const VIDEOS = [
  {
    id: 1,
    src: '/Assets/Videos/banner1.mp4',
    alt: 'Banner 1',
  },
  {
    id: 2,
    src: '/Assets/Videos/banner2.mp4',
    alt: 'Banner 2',
  },
  {
    id: 3,
    src: '/Assets/Videos/banner3.mp4',
    alt: 'Banner 3',
  },
];

const AUTO_SLIDE_DELAY = 4000;
const SWIPE_THRESHOLD = 50;

const BannerVideo = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const videoRefs = useRef([]);
  const pointerStartX = useRef(null);
  const pointerEndX = useRef(null);
  const isDragging = useRef(false);
  const isPaused = useRef(false);
  const resumeTimer = useRef(null);

  // =========================================
  // PAUSE / RESUME AUTOPLAY
  // =========================================

  const pauseAutoplay = () => {
    isPaused.current = true;

    if (resumeTimer.current) {
      clearTimeout(resumeTimer.current);
      resumeTimer.current = null;
    }
  };

  const resumeAutoplay = () => {
    if (resumeTimer.current) {
      clearTimeout(resumeTimer.current);
    }

    resumeTimer.current = setTimeout(() => {
      isPaused.current = false;
      resumeTimer.current = null;
    }, 700);
  };

  // =========================================
  // NEXT / PREVIOUS SLIDE
  // =========================================

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % VIDEOS.length);
  };

  const previousSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + VIDEOS.length) % VIDEOS.length
    );
  };

  // =========================================
  // AUTOPLAY CAROUSEL
  // =========================================

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused.current) {
        nextSlide();
      }
    }, AUTO_SLIDE_DELAY);

    return () => clearInterval(interval);
  }, []);

  // =========================================
  // VIDEO PERFORMANCE
  // Play active video only
  // =========================================

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      video.muted = true;
      video.playsInline = true;
      video.loop = true;

      if (index === currentIndex) {
        const playPromise = video.play();

        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Browser may block autoplay.
            // The video can retry when allowed.
          });
        }
      } else {
        video.pause();
      }
    });
  }, [currentIndex]);

  // =========================================
  // CLEANUP TIMERS
  // =========================================

  useEffect(() => {
    return () => {
      if (resumeTimer.current) {
        clearTimeout(resumeTimer.current);
      }

      videoRefs.current.forEach((video) => {
        if (video) video.pause();
      });
    };
  }, []);

  // =========================================
  // POINTER DOWN
  // Touch + Mouse + Stylus
  // =========================================

  const handlePointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) {
      return;
    }

    pointerStartX.current = e.clientX;
    pointerEndX.current = e.clientX;

    isDragging.current = true;

    pauseAutoplay();

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (error) {
      // Pointer capture may not be available.
    }
  };

  // =========================================
  // POINTER MOVE
  // =========================================

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;

    pointerEndX.current = e.clientX;
  };

  // =========================================
  // POINTER UP
  // =========================================

  const handlePointerUp = () => {
    if (!isDragging.current) return;

    const startX = pointerStartX.current;
    const endX = pointerEndX.current;

    if (startX !== null && endX !== null) {
      const distance = startX - endX;

      if (distance > SWIPE_THRESHOLD) {
        nextSlide();
      } else if (distance < -SWIPE_THRESHOLD) {
        previousSlide();
      }
    }

    isDragging.current = false;
    pointerStartX.current = null;
    pointerEndX.current = null;

    resumeAutoplay();
  };

  // =========================================
  // POINTER CANCEL
  // =========================================

  const handlePointerCancel = () => {
    isDragging.current = false;

    pointerStartX.current = null;
    pointerEndX.current = null;

    resumeAutoplay();
  };

  // =========================================
  // KEYBOARD SUPPORT
  // =========================================

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      pauseAutoplay();
      previousSlide();
      resumeAutoplay();
    }

    if (e.key === 'ArrowLeft') {
      pauseAutoplay();
      nextSlide();
      resumeAutoplay();
    }
  };

  // =========================================
  // RENDER
  // =========================================

  return (
    <section
      className={styles.bannerContainer}
      aria-label="Promotional video carousel"
    >
      <div
        className={styles.bannerCarousel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onKeyDown={handleKeyDown}
        onMouseEnter={pauseAutoplay}
        onMouseLeave={resumeAutoplay}
        onFocus={pauseAutoplay}
        onBlur={resumeAutoplay}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Promotional banners"
      >
        {VIDEOS.map((video, index) => (
          <div
            key={video.id}
            className={`${styles.bannerItem} ${
              index === currentIndex ? styles.active : ''
            }`}
            aria-hidden={index !== currentIndex}
          >
            <video
              ref={(element) => {
                videoRefs.current[index] = element;
              }}
              className={styles.bannerVideo}
              src={video.src}
              muted
              loop
              playsInline
              autoPlay={index === currentIndex}
              preload={index === currentIndex ? 'auto' : 'none'}
              disablePictureInPicture
              aria-label={video.alt}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default BannerVideo;
