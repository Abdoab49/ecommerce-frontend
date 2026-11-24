
import React, { useEffect, useRef } from 'react';
import styles from './OverlayCard.module.css';

const IMAGE_SRC = '/Assets/ShoeStore/background10.png';

const CONFIG = {
  renderMode: 'dither',
  bgMode: 'original',
  bgBlur: 12,
  bgOpacity: 91,
  cellSize: 3,
  coverage: 81,
  invert: false,
  brightness: 0,
  contrast: 115,
  edgeEmphasis: 40,
  density: 0,
  tint: '#00ff66',
  tintOpacity: 45,
  saturation: 100,
  grayscale: 0,
  animated: true,
  animStyle: 'flicker',
  animSpeed: 100,
  animIntensity: 60,
  pfx: {
    vignette: { enabled: true, intensity: 38 },
    scanLines: { enabled: true, intensity: 28 },
    chromatic: { enabled: true, intensity: 40 },
    bloom: { enabled: true, intensity: 60 },
    filmGrain: { enabled: true, intensity: 40 },
    glitch: { enabled: true, intensity: 20 },
  },
};

const clamp = (value, min, max) =>
  Math.max(min, Math.min(max, value));

const hexToRgb = (hex) => {
  const value = hex.replace('#', '');
  return {
    r: parseInt(value.substring(0, 2), 16),
    g: parseInt(value.substring(2, 4), 16),
    b: parseInt(value.substring(4, 6), 16),
  };
};

const OverlayCard = () => {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', {
      alpha: true,
      willReadFrequently: true,
    });

    if (!ctx) return;

    const image = new Image();
    image.src = IMAGE_SRC;
    imageRef.current = image;

    let animationFrame;
    let startTime = 0;
    let disposed = false;

    const rgb = hexToRgb(CONFIG.tint);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));

      draw();
    };

    const drawImageCover = (target, source, width, height) => {
      const scale = Math.max(
        width / source.width,
        height / source.height
      );

      const sw = width / scale;
      const sh = height / scale;
      const sx = (source.width - sw) / 2;
      const sy = (source.height - sh) / 2;

      target.drawImage(
        source,
        sx,
        sy,
        sw,
        sh,
        0,
        0,
        width,
        height
      );
    };

    const draw = (timestamp = 0) => {
      if (disposed || !image.complete || !image.naturalWidth) return;

      const width = canvas.width;
      const height = canvas.height;

      if (!width || !height) return;

      const time = timestamp / 1000;
      const speed = CONFIG.animSpeed / 100;
      const intensity = CONFIG.animIntensity / 100;

      const motion = CONFIG.animated
        ? Math.sin(time * 5 * speed) * intensity
        : 0;

      ctx.clearRect(0, 0, width, height);

      // Source photo layer
      ctx.save();
      ctx.globalAlpha = CONFIG.bgOpacity / 100;

      if (CONFIG.bgMode === 'solid') {
        ctx.fillStyle = '#111111';
        ctx.fillRect(0, 0, width, height);
      } else {
        ctx.filter =
          CONFIG.bgMode === 'blur'
            ? `blur(${CONFIG.bgBlur}px)`
            : 'none';

        drawImageCover(ctx, image, width, height);
      }

      ctx.restore();

      // Render source into a sampling canvas
      const sampleCanvas = document.createElement('canvas');
      const sampleCtx = sampleCanvas.getContext('2d', {
        willReadFrequently: true,
      });

      if (!sampleCtx) return;

      sampleCanvas.width = width;
      sampleCanvas.height = height;

      drawImageCover(sampleCtx, image, width, height);

      const source = sampleCtx.getImageData(
        0,
        0,
        width,
        height
      );

      const data = source.data;
      const cell = Math.max(2, CONFIG.cellSize * 2);
      const contrast = CONFIG.contrast / 100;
      const tintAmount = CONFIG.tintOpacity / 100;

      // Dither effect
      for (let y = 0; y < height; y += cell) {
        for (let x = 0; x < width; x += cell) {
          const index = (y * width + x) * 4;

          const r = data[index];
          const g = data[index + 1];
          const b = data[index + 2];

          let luminance =
            (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

          luminance = clamp(
            (luminance - 0.5) * contrast + 0.5,
            0,
            1
          );

          if (CONFIG.invert) luminance = 1 - luminance;

          const threshold =
            (Math.sin(x * 0.13 + y * 0.09 + time * speed) *
              0.08 *
              intensity) +
            0.5;

          const drawCell = luminance > threshold;

          if (!drawCell) continue;

          if (Math.random() * 100 > CONFIG.coverage) continue;

          const mix = luminance * (1 - tintAmount);

          const finalR = Math.round(
            r * mix + rgb.r * tintAmount
          );

          const finalG = Math.round(
            g * mix + rgb.g * tintAmount
          );

          const finalB = Math.round(
            b * mix + rgb.b * tintAmount
          );

          const flicker = 1 + motion * 0.08;

          ctx.fillStyle = `rgba(
            ${finalR},
            ${finalG},
            ${finalB},
            ${clamp(flicker, 0.5, 1.5)}
          )`;

          const size = cell * (0.35 + luminance * 0.65);

          ctx.fillRect(
            x,
            y,
            size,
            size
          );
        }
      }

      // Bloom
      if (CONFIG.pfx.bloom.enabled) {
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.globalAlpha =
          CONFIG.pfx.bloom.intensity / 300;

        ctx.filter = 'blur(18px)';
        ctx.drawImage(canvas, 0, 0);
        ctx.restore();
      }

      // Scanlines
      if (CONFIG.pfx.scanLines.enabled) {
        ctx.save();
        ctx.fillStyle = '#000000';
        ctx.globalAlpha =
          CONFIG.pfx.scanLines.intensity / 1000;

        for (let y = 0; y < height; y += 4) {
          ctx.fillRect(0, y, width, 1);
        }

        ctx.restore();
      }

      // Vignette
      if (CONFIG.pfx.vignette.enabled) {
        const gradient = ctx.createRadialGradient(
          width / 2,
          height / 2,
          height * 0.1,
          width / 2,
          height / 2,
          width * 0.75
        );

        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(1, '#000000');

        ctx.save();
        ctx.globalAlpha =
          CONFIG.pfx.vignette.intensity / 100;
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
      }

      // Film grain
      if (CONFIG.pfx.filmGrain.enabled) {
        ctx.save();
        ctx.globalAlpha =
          CONFIG.pfx.filmGrain.intensity / 1000;

        for (let i = 0; i < 900; i++) {
          const x = Math.random() * width;
          const y = Math.random() * height;

          ctx.fillStyle =
            Math.random() > 0.5 ? '#ffffff' : '#000000';

          ctx.fillRect(x, y, 1.5, 1.5);
        }

        ctx.restore();
      }

      // Chromatic glitch
      if (
        CONFIG.pfx.chromatic.enabled &&
        CONFIG.animated
      ) {
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.globalAlpha =
          CONFIG.pfx.chromatic.intensity / 500;

        const shift = Math.sin(time * 2) * 3;

        ctx.drawImage(canvas, shift, 0);
        ctx.restore();
      }
    };

    const animate = (timestamp) => {
      if (disposed) return;

      if (!startTime) startTime = timestamp;

      draw(timestamp);
      animationFrame = requestAnimationFrame(animate);
    };

    image.onload = () => {
      resize();

      if (CONFIG.animated) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        draw();
      }
    };

    image.onerror = () => {
      console.error('Could not load OverlayCard background image:', IMAGE_SRC);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    if (image.complete && image.naturalWidth) {
      resize();

      if (CONFIG.animated) {
        animationFrame = requestAnimationFrame(animate);
      }
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
    };
  }, []);

  return (
    <div className={styles.card}>
      <img
        className={styles.cardImg}
        src={IMAGE_SRC}
        alt="LANADA shoe collection background"
      />

      <canvas
        ref={canvasRef}
        className={styles.asciiCanvas}
        aria-hidden="true"
      />

      <div className={styles.cardImgOverlay} />
    </div>
  );
};

export default OverlayCard;
