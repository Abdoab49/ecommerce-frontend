
import React, { useState, useEffect } from 'react';
import {
    motion,
    useMotionValue,
    useTransform,
    AnimatePresence
} from 'framer-motion';

import './InteractiveCardStack.css';

/* =========================================
   CARD ROTATE
========================================= */

function CardRotate({
    children,
    onSendToBack,
    sensitivity,
    disableDrag = false
}) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-100, 100], [30, -30]);
    const rotateY = useTransform(x, [-100, 100], [-30, 30]);

    function handleDragEnd(event, info) {
        if (
            Math.abs(info.offset.x) > sensitivity ||
            Math.abs(info.offset.y) > sensitivity
        ) {
            onSendToBack();
        } else {
            x.set(0);
            y.set(0);
        }
    }

    if (disableDrag) {
        return (
            <motion.div
                className="ics-card-position"
                style={{ x: 0, y: 0 }}
            >
                {children}
            </motion.div>
        );
    }

    return (
        <motion.div
            className="ics-card-position ics-draggable"
            style={{
                x,
                y,
                rotateX,
                rotateY
            }}
            drag
            dragConstraints={{
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }}
            dragElastic={0.6}
            onDragEnd={handleDragEnd}
        >
            {children}
        </motion.div>
    );
}

/* =========================================
   INTERACTIVE CARD STACK
========================================= */

function InteractiveCardStack({
    cards = [],
    randomRotation = false,
    sensitivity = 180,
    sendToBackOnClick = false,
    animationConfig = {
        stiffness: 260,
        damping: 20
    },
    autoplay = false,
    autoplayDelay = 3000,
    pauseOnHover = true,
    mobileClickOnly = false,
    mobileBreakpoint = 768,
    className = ''
}) {
    const [isMobile, setIsMobile] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [stack, setStack] = useState([]);

    /* MOBILE DETECTION */

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < mobileBreakpoint);
        };

        checkMobile();

        window.addEventListener('resize', checkMobile);

        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, [mobileBreakpoint]);

    /* INITIALIZE CARDS */

    useEffect(() => {
        if (cards.length > 0) {
            setStack(
                cards.map((content, index) => ({
                    id: `card-${index}-${Date.now()}-${Math.random()}`,
                    content,
                    randomRot: randomRotation
                        ? Math.random() * 10 - 5
                        : 0
                }))
            );
        } else {
            setStack([]);
        }
    }, [cards, randomRotation]);

    /* SEND CARD TO BACK */

    const sendToBack = (id) => {
        setStack((prev) => {
            const index = prev.findIndex(
                (card) => card.id === id
            );

            if (index === -1) return prev;

            const newStack = [...prev];

            const [card] = newStack.splice(index, 1);

            const updatedCard = {
                ...card,
                randomRot: randomRotation
                    ? Math.random() * 10 - 5
                    : 0
            };

            newStack.unshift(updatedCard);

            return newStack;
        });
    };

    /* AUTOPLAY */

    useEffect(() => {
        if (
            autoplay &&
            stack.length > 1 &&
            !isPaused
        ) {
            const interval = setInterval(() => {
                const topCardId = stack[stack.length - 1].id;

                sendToBack(topCardId);
            }, autoplayDelay);

            return () => clearInterval(interval);
        }
    }, [
        autoplay,
        autoplayDelay,
        stack,
        isPaused
    ]);

    const shouldDisableDrag =
        mobileClickOnly && isMobile;

    const shouldEnableClick =
        sendToBackOnClick || shouldDisableDrag;

    if (stack.length === 0) {
        return null;
    }

    return (
        <div
            className={`ics-stack-container ${className}`}
            style={{ perspective: 1000 }}
            onMouseEnter={() => {
                if (pauseOnHover) setIsPaused(true);
            }}
            onMouseLeave={() => {
                if (pauseOnHover) setIsPaused(false);
            }}
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
                            disableDrag={
                                !isTop || shouldDisableDrag
                            }
                        >
                            <motion.div
                                className="ics-card"
                                onClick={() => {
                                    if (isTop && shouldEnableClick) {
                                        sendToBack(card.id);
                                    }
                                }}
                                style={{
                                    zIndex: index
                                }}
                                animate={{
                                    rotateZ:
                                        depth * -2 + card.randomRot,

                                    scale:
                                        1 - depth * 0.04,

                                    y:
                                        depth * -8,

                                    opacity:
                                        1 - depth * 0.15,

                                    transformOrigin: 'center center'
                                }}
                                transition={{
                                    type: 'spring',
                                    stiffness: animationConfig.stiffness,
                                    damping: animationConfig.damping
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
