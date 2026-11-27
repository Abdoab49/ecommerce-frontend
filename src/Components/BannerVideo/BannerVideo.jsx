
import React, { useState, useEffect, useRef } from 'react';
import styles from './BannerVideo.module.css';

const VIDEOS = [
  { id: 1, src: '/Assets/Videos/banner1.mp4', alt: 'Banner 1' },
  { id: 2, src: '/Assets/Videos/banner2.mp4', alt: 'Banner 2' },
  { id: 3, src: '/Assets/Videos/banner3.mp4', alt: 'Banner 3' },
];

const AUTO_SLIDE_DELAY = 5000;
const SWIPE_THRESHOLD = 50;

const BannerVideo = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef([]);
  const startX = useRef(null);
  const endX = useRef(null);
  const paused = useRef(false);
  const resumeTimer = useRef(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % VIDEOS.length);
  };

  const previousSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + VIDEOS.length) % VIDEOS.length);
  };

  const pauseAutoplay = () => {
    paused.current = true;
    clearTimeout(resumeTimer.current);
  };

  const resumeAutoplay = () => {
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      paused.current = false;
    }, 700);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused.current) nextSlide();
    }, AUTO_SLIDE_DELAY);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      video.muted = true;
      video.playsInline = true;
      video.loop = true;

      if (index === currentIndex) {
        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [currentIndex]);

  useEffect(() => {
    return () => {
      clearTimeout(resumeTimer.current);
      videoRefs.current.forEach((video) => video?.pause());
    };
  }, []);

  const handlePointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;

    startX.current = e.clientX;
    endX.current = e.clientX;
    pauseAutoplay();

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e) => {
    if (startX.current !== null) {
      endX.current = e.clientX;
    }
  };

  const handlePointerUp = () => {
    if (startX.current !== null && endX.current !== null) {
      const distance = startX.current - endX.current;

      if (distance > SWIPE_THRESHOLD) nextSlide();
      if (distance < -SWIPE_THRESHOLD) previousSlide();
    }

    startX.current = null;
    endX.current = null;
    resumeAutoplay();
  };

  const handlePointerCancel = () => {
    startX.current = null;
    endX.current = null;
    resumeAutoplay();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      previousSlide();
    } else if (e.key === 'ArrowLeft') {
      nextSlide();
    }
  };

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

        <div className={styles.indicators}>
          {VIDEOS.map((video, index) => (
            <button
              key={video.id}
              type="button"
              className={`${styles.indicator} ${
                index === currentIndex ? styles.indicatorActive : ''
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to video ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BannerVideo;
