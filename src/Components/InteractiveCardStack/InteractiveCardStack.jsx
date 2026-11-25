
import React, { useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";

import "./InteractiveCardStack.css";

function CardRotate({
  children,
  onSendToBack,
  sensitivity,
  disableDrag = false,
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  function handleDragEnd(_event, info) {
    if (
      Math.abs(info.offset.x) > sensitivity ||
      Math.abs(info.offset.y) > sensitivity
    ) {
      onSendToBack();
      x.set(0);
      y.set(0);
    } else {
      x.set(0);
      y.set(0);
    }
  }

  if (disableDrag) {
    return (
      <motion.div className="ics-card-rotate">
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="ics-card-rotate ics-card-draggable"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

export function InteractiveCardStack({
  cards = [],
  randomRotation = false,
  sensitivity = 180,
  sendToBackOnClick = false,
  animationConfig = { stiffness: 260, damping: 20 },
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = true,
  mobileClickOnly = false,
  mobileBreakpoint = 768,
  className = "",
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [stack, setStack] = useState([]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, [mobileBreakpoint]);

  useEffect(() => {
    setStack(
      cards.map((content, index) => ({
        id: `card-${index}-${Date.now()}`,
        content,
        randomRot: randomRotation
          ? Math.random() * 10 - 5
          : 0,
      }))
    );
  }, [cards, randomRotation]);

  const sendToBack = (id) => {
    setStack((prev) => {
      const index = prev.findIndex((card) => card.id === id);

      if (index === -1) return prev;

      const newStack = [...prev];
      const [card] = newStack.splice(index, 1);

      const updatedCard = {
        ...card,
        randomRot: randomRotation
          ? Math.random() * 10 - 5
          : 0,
      };

      newStack.unshift(updatedCard);

      return newStack;
    });
  };

  useEffect(() => {
    if (!autoplay || stack.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setStack((prev) => {
        if (prev.length <= 1) return prev;

        const newStack = [...prev];
        const topCard = newStack.pop();

        newStack.unshift(topCard);

        return newStack;
      });
    }, autoplayDelay);

    return () => clearInterval(interval);
  }, [autoplay, autoplayDelay, stack.length, isPaused]);

  const shouldDisableDrag = mobileClickOnly && isMobile;
  const shouldEnableClick = sendToBackOnClick || shouldDisableDrag;

  if (stack.length === 0) return null;

  return (
    <div
      className={`ics-container ${className}`}
      style={{ perspective: 1000 }}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <AnimatePresence>
        {stack.map((card, index) => {
          const isTop = index === stack.length - 1;
          const depth = stack.length - 1 - index;

          return (
            <CardRotate
              key={card.id}
              onSendToBack={() => sendToBack(card.id)}
              sensitivity={sensitivity}
              disableDrag={!isTop || shouldDisableDrag}
            >
              <motion.div
                className="ics-card"
                onClick={() =>
                  isTop &&
                  shouldEnableClick &&
                  sendToBack(card.id)
                }
                style={{ zIndex: index }}
                animate={{
                  rotateZ: depth * -2 + card.randomRot,
                  scale: 1 - depth * 0.04,
                  y: depth * -8,
                  opacity: 1 - depth * 0.15,
                  transformOrigin: "center center",
                }}
                transition={{
                  type: "spring",
                  stiffness: animationConfig.stiffness,
                  damping: animationConfig.damping,
                }}
              >
                {card.content}
              </motion.div>
            </CardRotate>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export default InteractiveCardStack;
