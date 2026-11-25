
import React, { useEffect, useMemo, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from 'framer-motion';

import './InteractiveCardStack.css';

/* =========================================
   LANADA DEMO CARDS
   Replace these images with your own assets
========================================= */

const DEFAULT_CARDS = [
  {
    id: '01',
    category: 'NEW COLLECTION',
    title: 'Everyday Essentials',
    subtitle: 'Discover the collection',
    image: '/Assets/ShoeStore/background10.png',
  },
  {
    id: '02',
    category: 'LANADA STYLE',
    title: 'Modern Streetwear',
    subtitle: 'Find your own style',
    image:
      'https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=1000&auto=format&fit=crop',
  },
  {
    id: '03',
    category: 'THE NEW EDIT',
    title: 'Made to Move',
    subtitle: 'Explore more styles',
    image:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&auto=format&fit=crop',
  },
  {
    id: '04',
    category: 'SELECTED FOR YOU',
    title: 'The Next Chapter',
    subtitle: 'Shop the latest pieces',
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000&auto=format&fit=crop',
  },
];

/* =========================================
   INDIVIDUAL DRAGGABLE CARD
========================================= */

function DraggableCard({
  card,
  index,
  depth,
  isTop,
  onSendToBack,
  sensitivity,
  randomRotation,
  sendToBackOnClick,
  disableDrag,
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-120, 120], [12, -12]);
  const rotateY = useTransform(x, [-120, 120], [-12, 12]);

  const handleDragEnd = (_, info) => {
    const distance = Math.max(
      Math.abs(info.offset.x),
      Math.abs(info.offset.y)
    );

    if (distance > sensitivity) {
      onSendToBack(card.id);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  return (
    <motion.div
      className={`ics-card-position ${isTop ? 'ics-card-top' : ''}`}
      style={{
        zIndex: index,
        x: isTop ? x : 0,
        y: isTop ? y : depth * -10,
        rotateX: isTop ? rotateX : 0,
        rotateY: isTop ? rotateY : 0,
        cursor: isTop && !disableDrag ? 'grab' : 'default',
        touchAction: isTop && !disableDrag ? 'none' : 'pan-y',
      }}
      drag={isTop && !disableDrag}
      dragConstraints={{
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      }}
      dragElastic={0.75}
      onDragEnd={handleDragEnd}
      whileDrag={{
        cursor: 'grabbing',
        scale: 1.035,
      }}
      initial={{
        opacity: 0,
        scale: 0.9,
        y: 35,
      }}
      animate={{
        opacity: 1 - depth * 0.13,
        scale: 1 - depth * 0.045,
        rotateZ: depth * -3 + (randomRotation ? card.rotation : 0),
        y: depth * -10,
      }}
      exit={{
        opacity: 0,
        scale: 0.88,
        y: 35,
        rotateZ: 8,
      }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 24,
      }}
      onClick={() => {
        if (isTop && sendToBackOnClick) {
          onSendToBack(card.id);
        }
      }}
    >
      <div className="ics-card">
        <img
          className="ics-card-image"
          src={card.image}
          alt={card.title}
          draggable="false"
        />

        <div className="ics-card-shade" />

        <div className="ics-card-content">
          <span className="ics-card-category">
            {card.category}
          </span>

          <div className="ics-card-information">
            <h3>{card.title}</h3>
            <p>{card.subtitle}</p>
          </div>

          <span className="ics-card-number">
            {card.id}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================
   MAIN INTERACTIVE CARD STACK
========================================= */

export default function InteractiveCardStack({
  cards = DEFAULT_CARDS,
  randomRotation = true,
  sensitivity = 120,
  sendToBackOnClick = true,
  autoplay = false,
  autoplayDelay = 3500,
  pauseOnHover = true,
  mobileClickOnly = false,
  className = '',
}) {
  const initialCards = useMemo(() => {
    return cards.map((card, index) => ({
      ...card,
      id: card.id || String(index + 1).padStart(2, '0'),
      rotation: randomRotation
        ? Math.random() * 6 - 3
        : 0,
    }));
  }, [cards, randomRotation]);

  const [stack, setStack] = useState(initialCards);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  /* =========================================
     RESET WHEN CARDS CHANGE
  ========================================= */

  useEffect(() => {
    setStack(initialCards);
  }, [initialCards]);

  /* =========================================
     MOBILE DETECTION
  ========================================= */

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();

    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  /* =========================================
     SEND CARD TO BACK
  ========================================= */

  const sendToBack = (id) => {
    setStack((current) => {
      const index = current.findIndex(
        (card) => card.id === id
      );

      if (index === -1) return current;

      const next = [...current];
      const [selected] = next.splice(index, 1);

      selected.rotation = randomRotation
        ? Math.random() * 6 - 3
        : 0;

      next.unshift(selected);

      return next;
    });
  };

  /* =========================================
     RESET STACK
  ========================================= */

  const resetStack = () => {
    setStack(
      initialCards.map((card) => ({
        ...card,
        rotation: randomRotation
          ? Math.random() * 6 - 3
          : 0,
      }))
    );
  };

  /* =========================================
     AUTOPLAY
  ========================================= */

  useEffect(() => {
    if (
      !autoplay ||
      isPaused ||
      stack.length < 2
    ) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setStack((current) => {
        if (current.length < 2) return current;

        const next = [...current];
        next.unshift(next.pop());

        return next;
      });
    }, autoplayDelay);

    return () => {
      window.clearInterval(timer);
    };
  }, [
    autoplay,
    autoplayDelay,
    isPaused,
    stack.length,
  ]);

  if (!stack.length) return null;

  const disableDrag = mobileClickOnly && isMobile;

  /* =========================================
     RENDER
  ========================================= */

  return (
    <section className={`ics-section ${className}`}>
      <div className="ics-heading">
        <span className="ics-eyebrow">
          LANADA / THE EDIT
        </span>

        <h2>
          Discover your next look<span>.</span>
        </h2>

        <p>
          A curated selection of styles made for every day.
        </p>
      </div>

      <div
        className="ics-stage"
        onMouseEnter={() => {
          if (pauseOnHover) setIsPaused(true);
        }}
        onMouseLeave={() => {
          if (pauseOnHover) setIsPaused(false);
        }}
      >
        <div className="ics-stack">
          <AnimatePresence initial={false}>
            {stack.map((card, index) => {
              const depth = stack.length - 1 - index;
              const isTop = index === stack.length - 1;

              return (
                <DraggableCard
                  key={card.id}
                  card={card}
                  index={index}
                  depth={depth}
                  isTop={isTop}
                  onSendToBack={sendToBack}
                  sensitivity={sensitivity}
                  randomRotation={randomRotation}
                  sendToBackOnClick={
                    sendToBackOnClick || disableDrag
                  }
                  disableDrag={disableDrag}
                />
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      <div className="ics-controls">
        <span className="ics-hint">
          <span className="ics-hint-dot" />
          Drag the card or tap to explore
        </span>

        <button
          type="button"
          className="ics-reset"
          onClick={resetStack}
          aria-label="Reset card stack"
        >
          <span aria-hidden="true">↻</span>
          Reset
        </button>
      </div>
    </section>
  );
}
