import React, {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState
} from "react";

import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import "./Night26.css";

/* =========================================
   CONFIGURATION
========================================= */

const CDN =
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/";

const H = (file) =>
    `https://images.higgs.ai/?default=1&output=webp&url=${encodeURIComponent(
        CDN + file
    )}&w=900&q=85`;

const USD_TO_MAD = 9.96;
const mad = (usd) => Math.round(usd * USD_TO_MAD);

const SIZE_OPTIONS = ["M", "L", "XL", "XXL"];

/* =========================================
   NIGHT 26 COLLECTION
========================================= */

const raw = [
    [
        "Cobalt Shell",
        "/Assets/Night26/1.png",
        "rgba(40,80,255,.30)",
        [
            ["Cobalt Rain Shell", 425, [300, 1080], [.60, .30]],
            ["Wide Cargo Pant", 165, [1020, 2010], [.38, .70]]
        ]
    ],
    [
        "Silver Signal",
        "hf_20261113_092602_489603db-d621-4dac-8dad-0aaf42f0d15c.png",
        "rgba(200,210,230,.24)",
        [
            ["Mirror Down Parka", 650, [230, 1100], [.62, .30]],
            ["Straight Tech Trouser", 180, [1040, 2010], [.38, .72]]
        ]
    ],
    [
        "Night Run",
        "hf_20261113_092516_b5bd2ecc-b375-46e1-bb83-eca3e17f818b.png",
        "rgba(70,78,96,.32)",
        [
            ["Storm Hooded Shell", 390, [230, 1040], [.62, .30]],
            ["Wide Cargo Pant", 165, [1000, 2010], [.38, .70]]
        ]
    ],
    [
        "Long Hour",
        "hf_20261113_092601_1b201cc2-e88d-4501-80a3-6907b149777a.png",
        "rgba(80,86,100,.30)",
        [
            ["Hooded Long Parka", 720, [260, 1440], [.62, .36]],
            ["Straight Tech Trouser", 180, [1360, 2010], [.40, .82]]
        ]
    ],
    [
        "Gallery Opening",
        "hf_20261113_092603_fceeb6f1-9ee2-4883-8e0f-3327ae0bab7a.png",
        "rgba(90,96,110,.30)",
        [
            ["Quilted Down Vest", 310, [240, 1110], [.58, .30]],
            ["Graphite Cargo Pant", 175, [1060, 2010], [.38, .70]]
        ]
    ],
    [
        "Soft Static",
        "hf_20261113_092602_91acecdf-be55-4f27-b413-012a4615763a.png",
        "rgba(110,112,120,.26)",
        [
            ["Graphite Fleece Half-Zip", 210, [320, 1000], [.60, .28]],
            ["Pleated Wide Trouser", 195, [940, 2010], [.40, .70]]
        ]
    ]
];

const LOOKS = raw.map(([name, file, tone, items], index) => {
    const image = file.startsWith("/") ? file : H(file);

    return {
        name,
        image,
        tone,
        pieces: items.map(([title, usd, crop, pin], itemIndex) => ({
            id: `night26-${index}-${itemIndex}`,
            name: title,
            usd,
            price: mad(usd),
            crop,
            pin,
            image
        }))
    };
});

/* =========================================
   MODEL DEPTH
========================================= */

const depth = [
    [0, 0, 1, 0, 0, 1, 1],
    [1, 160, .94, 12, 1.2, .90, 1],
    [2, 284, .85, 59, 4, .72, 1],
    [3, 362, .78, 95, 8, .55, .55],
    [3.6, 392, .74, 110, 11, .48, 0]
];

const wrap = (n) => ((n + 3) % 6 + 6) % 6 - 3;

function values(a) {
    for (let k = 1; k < depth.length; k++) {
        if (a <= depth[k][0]) {
            const previous = depth[k - 1];
            const next = depth[k];
            const t = (a - previous[0]) / (next[0] - previous[0]);

            return previous.slice(1).map((value, index) =>
                value + (next[index + 1] - value) * t
            );
        }
    }

    return depth[4].slice(1);
}

/* =========================================
   ICONS
========================================= */

function I({ type }) {
    const paths = {
        menu: <path d="M4 7h16M4 17h16" />,
        search: (
            <>
                <circle cx="10.8" cy="10.8" r="6.3" />
                <path d="m16 16 4 4" />
            </>
        ),
        user: (
            <>
                <circle cx="12" cy="8" r="3.5" />
                <path d="M4.5 20c.8-3.5 3.2-5.2 7.5-5.2s6.7 1.7 7.5 5.2" />
            </>
        ),
        bag: (
            <>
                <path d="M5 8h14l-1 13H6L5 8Z" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </>
        ),
        left: <path d="M19 12H5m7-7-7 7 7 7" />,
        right: <path d="M5 12h14m-7-7 7 7-7 7" />,
        pause: <path d="M8 6v12M16 6v12" />,
        play: <path d="m9 6 10 6-10 6V6Z" fill="currentColor" />
    };

    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {paths[type]}
        </svg>
    );
}

/* =========================================
   PRODUCT THUMBNAIL
========================================= */

function Thumbnail({ piece }) {
    const scale = 96 / (piece.crop[1] - piece.crop[0]);

    return (
        <div
            className="n26-thumb"
            style={{
                backgroundImage: `url("${piece.image}")`,
                backgroundSize: `auto ${2048 * scale}px`,
                backgroundPosition: `center -${piece.crop[0] * scale}px`
            }}
        />
    );
}

/* =========================================
   MAIN COMPONENT
========================================= */

export default function Night26() {
    const ctx = useContext(ShopContext) || {};

    const {
        addToCart,
        cartItems = [],
        removeFromCart
    } = ctx;

    const runway = useRef(null);
    const models = useRef([]);
    const bag = useRef(null);

    const pos = useRef(2);
    const raf = useRef(0);
    const timer = useRef(0);
    const drag = useRef(null);

    const activeRef = useRef(2);
    const goRef = useRef(() => {});

    const [active, setActive] = useState(2);
    const [geom, setGeom] = useState({});
    const [playing, setPlaying] = useState(true);
    const [progress, setProgress] = useState(0);
    const [busy, setBusy] = useState(false);
    const [pins, setPins] = useState(true);
    const [hover, setHover] = useState(-1);
    const [pinOpen, setPinOpen] = useState(-1);
    const [toast, setToast] = useState("");

    const [pointer, setPointer] = useState({
        x: -100,
        y: -100,
        visible: false
    });

    const [flyers, setFlyers] = useState([]);
    const [sweep, setSweep] = useState(false);

    const [selectedSizes, setSelectedSizes] = useState({});

    /* =====================================
       SEARCH STATE
    ===================================== */

    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const look = LOOKS[active];
    const pieces = look.pieces;

    /* =====================================
       SEARCH LOGIC
    ===================================== */

    const searchResults = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        if (!query) return [];

        return LOOKS.flatMap((item, lookIndex) =>
            item.pieces
                .filter((piece) =>
                    piece.name.toLowerCase().includes(query) ||
                    item.name.toLowerCase().includes(query)
                )
                .map((piece) => ({
                    ...piece,
                    lookName: item.name,
                    lookIndex
                }))
        );
    }, [searchQuery]);

    const openSearchResult = (result) => {
        if (result.lookIndex !== activeRef.current) {
            goRef.current(
                result.lookIndex,
                wrap(result.lookIndex - activeRef.current)
            );
        }

        setSearchOpen(false);
        setSearchQuery("");
    };

    /* =====================================
       SIZE HELPERS
    ===================================== */

    const getSize = (piece) => selectedSizes[piece.id] || "M";

    const changeSize = (piece, size) => {
        setSelectedSizes((previous) => ({
            ...previous,
            [piece.id]: size
        }));
    };

    /* =====================================
       CART HELPERS
    ===================================== */

    const findCartItem = useCallback((piece, size) => {
        return cartItems
            .map((item, index) => ({ item, index }))
            .find(({ item }) =>
                String(item.id) === String(piece.id) &&
                String(item.size || "") === String(size)
            );
    }, [cartItems]);

    const isPieceInBag = useCallback((piece, size = getSize(piece)) => {
        return Boolean(findCartItem(piece, size));
    }, [findCartItem, selectedSizes]);

    const count = cartItems.reduce((total, item) => {
        if (String(item.id || "").startsWith("night26-")) {
            return total + Number(item.quantity || 1);
        }

        return total;
    }, 0);

    const sum = pieces.reduce(
        (total, piece) => total + piece.price,
        0
    );

    const bundle = Math.round(sum * .9);

    const full = pieces.every((piece) =>
        isPieceInBag(piece, getSize(piece))
    );

    /* =====================================
       INITIALIZATION
    ===================================== */

    useEffect(() => {
        document.body.classList.add("night26-active");

        LOOKS.forEach((item) => {
            const image = new Image();
            image.src = item.image;
            image.decode?.().catch(() => {});
        });

        return () => {
            document.body.classList.remove("night26-active");
        };
    }, []);

    /* =====================================
       RESPONSIVE MEASUREMENTS
    ===================================== */

    const measure = useCallback(() => {
        const element = runway.current;
        if (!element) return;

        const width = element.clientWidth;
        const height = element.clientHeight;
        const mobile = window.innerWidth <= 820;

        const modelHeight = Math.min(
            height * (mobile ? .66 : .705),
            width * (mobile ? 1.05 : .92)
        );

        setGeom({
            w: width,
            h: height,
            n: mobile,
            mh: modelHeight,
            mw: modelHeight * 421 / 634,
            u: modelHeight / 634,
            cx: width * (mobile ? .5 : .523),
            feet: height * (mobile ? .86 : .85)
        });
    }, []);

    useEffect(() => {
        measure();

        const resizeObserver =
            runway.current && window.ResizeObserver
                ? new ResizeObserver(measure)
                : null;

        if (resizeObserver && runway.current) {
            resizeObserver.observe(runway.current);
        }

        window.addEventListener("resize", measure);

        return () => {
            resizeObserver?.disconnect();
            window.removeEventListener("resize", measure);
        };
    }, [measure]);

    /* =====================================
       MODEL POSITIONING
    ===================================== */

    const paint = useCallback((value) => {
        pos.current = value;

        const { u, cx, feet, mh } = geom;
        if (!mh) return;

        LOOKS.forEach((_, index) => {
            const element = models.current[index];
            if (!element) return;

            const distance = wrap(index - value);
            const absoluteDistance = Math.abs(distance);

            const [
                x,
                scale,
                lift,
                blur,
                brightness,
                opacity
            ] = values(absoluteDistance);

            element.style.transform =
                `translate3d(${cx + Math.sign(distance) * x * u}px, ${feet - lift * u - mh}px, 0) scale(${scale})`;

            element.style.filter =
                `blur(${blur * Math.max(.6, u)}px) brightness(${brightness})`;

            element.style.opacity = opacity;
            element.style.zIndex = 100 - Math.round(absoluteDistance * 10);

            element.classList.toggle(
                "is-centre",
                absoluteDistance < .5
            );
        });
    }, [geom]);

    useEffect(() => {
        paint(pos.current);
    }, [paint]);

    /* =====================================
       TOAST
    ===================================== */

    const say = (message) => {
        setToast(message);
        clearTimeout(say.t);

        say.t = setTimeout(() => {
            setToast("");
        }, 1700);
    };

    /* =====================================
       AUTOPLAY
    ===================================== */

    const startTimer = useCallback(() => {
        clearInterval(timer.current);

        const start = performance.now();
        if (!playing) return;

        timer.current = setInterval(() => {
            if (drag.current) return;

            const elapsed = performance.now() - start;
            setProgress(Math.min(1, elapsed / 5200));

            if (elapsed >= 5200) {
                goRef.current((activeRef.current + 1) % 6, 1);
            }
        }, 40);
    }, [playing]);

    /* =====================================
       NAVIGATION
    ===================================== */

    const go = useCallback((index, direction) => {
        const target = (index + 6) % 6;

        let distance = wrap(target - pos.current);

        if (Math.abs(distance) === 3 && direction) {
            distance = 3 * Math.sign(direction);
        }

        if (Math.abs(distance) < .001) return;

        clearInterval(timer.current);

        setActive(target);
        activeRef.current = target;

        setBusy(true);
        setPins(false);
        setPinOpen(-1);
        setHover(-1);

        setPointer((previous) => ({
            ...previous,
            visible: false
        }));

        const from = pos.current;
        const to = from + distance;
        const start = performance.now();

        const duration = 760 + (Math.abs(distance) - 1) * 140;

        const tick = (now) => {
            const t = Math.min(1, (now - start) / duration);
            const ease = 1 - Math.pow(1 - t, 4.2);

            paint(from + (to - from) * ease);

            if (t < 1) {
                raf.current = requestAnimationFrame(tick);
            } else {
                pos.current = target;
                paint(target);
                setPins(true);

                setTimeout(() => setBusy(false), 420);
                startTimer();
            }
        };

        cancelAnimationFrame(raf.current);
        raf.current = requestAnimationFrame(tick);
    }, [paint, startTimer]);

    useEffect(() => {
        goRef.current = go;
    }, [go]);

    useEffect(() => {
        activeRef.current = active;
    }, [active]);

    useEffect(() => {
        startTimer();

        return () => clearInterval(timer.current);
    }, [startTimer, active]);

    /* =====================================
       CUSTOM VIEW CURSOR
    ===================================== */

    useEffect(() => {
        let animationFrame;

        const tick = () => {
            if (!geom.n && !drag.current) {
                const element = document.elementFromPoint(
                    pointer.x,
                    pointer.y
                );

                const hit = element?.closest?.(".n26-hit");
                const index = hit ? Number(hit.dataset.index) : -1;

                setPointer((previous) => ({
                    ...previous,
                    visible:
                        index >= 0 &&
                        Math.abs(wrap(index - pos.current)) >= .5
                }));
            } else {
                setPointer((previous) =>
                    previous.visible
                        ? { ...previous, visible: false }
                        : previous
                );
            }

            animationFrame = requestAnimationFrame(tick);
        };

        animationFrame = requestAnimationFrame(tick);

        return () => cancelAnimationFrame(animationFrame);
    }, [geom.n, pointer.x, pointer.y]);

    /* =====================================
       KEYBOARD CONTROLS
    ===================================== */

    useEffect(() => {
        const key = (event) => {
            if (event.key === "ArrowLeft") {
                go((activeRef.current + 5) % 6, -1);
            }

            if (event.key === "ArrowRight") {
                go((activeRef.current + 1) % 6, 1);
            }

            if (
                event.code === "Space" &&
                !["INPUT", "TEXTAREA", "BUTTON"].includes(
                    document.activeElement?.tagName
                )
            ) {
                event.preventDefault();
                setPlaying((value) => !value);
            }
        };

        window.addEventListener("keydown", key);

        return () => window.removeEventListener("keydown", key);
    }, [go]);

    /* =====================================
       DRAG AND SWIPE — TOUCH + MOUSE
    ===================================== */

    const pointerDown = (event) => {
        if (event.pointerType === "mouse" && event.button !== 0) {
            return;
        }

        if (event.target.closest("button, a, input")) return;

        drag.current = {
            x: event.clientX,
            start: pos.current,
            moved: false,
            pointerId: event.pointerId
        };

        clearInterval(timer.current);

        event.currentTarget.setPointerCapture?.(event.pointerId);
    };

    const pointerMove = (event) => {
        setPointer({
            x: event.clientX,
            y: event.clientY,
            visible: false
        });

        if (!drag.current) return;

        const dx = event.clientX - drag.current.x;

        if (Math.abs(dx) > 6) {
            drag.current.moved = true;
        }

        if (drag.current.moved && geom.u) {
            paint(drag.current.start - dx / (170 * geom.u));
        }
    };

    const pointerUp = (event) => {
        if (!drag.current) return;

        const moved = drag.current.moved;

        drag.current = null;

        if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }

        if (moved) {
            const target = Math.round(pos.current);

            go(target, target < activeRef.current ? -1 : 1);
        } else {
            startTimer();
        }
    };

    /* =====================================
       FLY TO BAG ANIMATION
    ===================================== */

    const fly = (piece) => {
        const source = document
            .querySelector(`[data-piece="${piece.id}"] .n26-thumb`)
            ?.getBoundingClientRect();

        const destination = bag.current?.getBoundingClientRect();

        if (!source || !destination) return;

        const id = `${Date.now()}-${piece.id}`;

        setFlyers((previous) => [
            ...previous,
            {
                id,
                image: piece.image,
                x: source.left,
                y: source.top,
                tx: destination.left + destination.width / 2,
                ty: destination.top + destination.height / 2
            }
        ]);

        setTimeout(() => {
            setFlyers((previous) =>
                previous.filter((item) => item.id !== id)
            );
        }, 800);
    };

    /* =====================================
       PRODUCT DATA
    ===================================== */

    const makeProductData = (piece, size) => ({
        id: piece.id,
        name: piece.name,
        price: piece.price,
        new_price: piece.price,
        old_price: piece.price,
        image: piece.image,
        img: piece.image,
        images: [piece.image],
        size,
        category: "Night ’26 Shell",
        brand: "LANADA"
    });

    /* =====================================
       ADD OR REMOVE PRODUCT
    ===================================== */

    const add = (piece) => {
        const size = getSize(piece);
        const existing = findCartItem(piece, size);

        if (existing) {
            removeFromCart?.(existing.index);
            say(`${piece.name} (${size}) removed`);
            return;
        }

        if (!addToCart) {
            say("Cart is not available");
            return;
        }

        fly(piece);
        addToCart(piece.id, size, makeProductData(piece, size));
        say(`${piece.name} · Size ${size} added`);
    };

    /* =====================================
       ADD COMPLETE LOOK
    ===================================== */

    const addAll = () => {
        const missing = pieces.filter(
            (piece) => !isPieceInBag(piece, getSize(piece))
        );

        if (!missing.length) {
            say("Full look already in your bag");
            return;
        }

        if (!addToCart) {
            say("Cart is not available");
            return;
        }

        missing.forEach((piece, index) => {
            const size = getSize(piece);

            setTimeout(() => {
                fly(piece);
                addToCart(
                    piece.id,
                    size,
                    makeProductData(piece, size)
                );
            }, index * 120);
        });

        setSweep(true);

        setTimeout(() => setSweep(false), 720);

        say(`${look.name} — full look added · saved 10%`);
    };

    /* =====================================
       RENDER
    ===================================== */

    return (
        <main className="night26-page">
            <div className="n26-stage">

                <section
                    className="n26-runway"
                    ref={runway}
                    onPointerDown={pointerDown}
                    onPointerMove={pointerMove}
                    onPointerUp={pointerUp}
                    onPointerCancel={pointerUp}
                >
                    <div
                        className="n26-floor-glow"
                        style={{
                            background: `radial-gradient(closest-side, ${look.tone}, transparent)`
                        }}
                    />

                    <header className="n26-title">
                        <h1>Lanada Shell</h1>
                    </header>

                    <div
                        className="n26-models"
                        style={{
                            "--mh": `${geom.mh || 0}px`,
                            "--mw": `${geom.mw || 0}px`
                        }}
                    >
                        {LOOKS.map((item, index) => (
                            <div
                                className="n26-model"
                                key={item.name}
                                ref={(element) => {
                                    models.current[index] = element;
                                }}
                            >
                                <div
                                    className="n26-figure"
                                    style={{
                                        backgroundImage: `url("${item.image}")`
                                    }}
                                />

                                <button
                                    className="n26-hit"
                                    data-index={index}
                                    aria-label={`View ${item.name}`}
                                    onClick={() => {
                                        if (index !== activeRef.current) {
                                            go(
                                                index,
                                                wrap(index - activeRef.current)
                                            );
                                        }
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    {pins && !geom.n && pieces.map((piece, index) => (
                        <button
                            key={piece.id}
                            className={`n26-pin ${
                                hover === index || pinOpen === index
                                    ? "is-open"
                                    : ""
                            }`}
                            style={{
                                left: `${
                                    geom.cx -
                                    geom.mw / 2 +
                                    piece.pin[0] * geom.mw
                                }px`,
                                top: `${
                                    geom.feet -
                                    geom.mh +
                                    piece.pin[1] * geom.mh
                                }px`,
                                animationDelay: `${120 + index * 120}ms`
                            }}
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(-1)}
                            onClick={() => {
                                setPinOpen((value) =>
                                    value === index ? -1 : index
                                );
                            }}
                        >
                            <span className="n26-pin-dot"><i /></span>
                            <span className="n26-pin-tip">
                                <b>{piece.name}</b>
                                <small>
                                    {piece.price.toLocaleString("en-US")} DH
                                </small>
                            </span>
                        </button>
                    ))}

                    <nav className="n26-pill">
                        <button className="n26-nav-icon">
                            <I type="menu" />
                        </button>

                        <i className="n26-separator" />

                        <Link to="/" className="n26-wing" aria-label="Home">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <path d="M3 10.8L12 3L21 10.8" />
                                <path d="M5.5 9.5V20H18.5V9.5" />
                                <path d="M9.5 20V14H14.5V20" />
                            </svg>
                        </Link>

                        <i className="n26-separator" />

                        {/* SEARCH BUTTON */}
                        <button
                            type="button"
                            className={`n26-nav-icon ${
                                searchOpen ? "search-active" : ""
                            }`}
                            aria-label="Search Night 26 products"
                            aria-expanded={searchOpen}
                            onClick={() => {
                                setSearchOpen((value) => !value);
                                setSearchQuery("");
                            }}
                        >
                            <I type="search" />
                        </button>

                        <Link to="/login" className="n26-nav-icon">
                            <I type="user" />
                        </Link>

                        <Link to="/cart" className="n26-nav-icon n26-bag" ref={bag}>
                            <I type="bag" />
                            <span className={count ? "n26-badge has-items" : "n26-badge"}>
                                {count}
                            </span>
                        </Link>
                    </nav>

                    {/* SEARCH PANEL */}
                    {searchOpen && (
                        <div className="n26-search-panel">
                            <div className="n26-search-input-wrap">
                                <I type="search" />

                                <input
                                    type="search"
                                    autoFocus
                                    value={searchQuery}
                                    placeholder="Search Night ’26 pieces..."
                                    aria-label="Search Night 26 products"
                                    onChange={(event) =>
                                        setSearchQuery(event.target.value)
                                    }
                                    onKeyDown={(event) => {
                                        if (event.key === "Escape") {
                                            setSearchOpen(false);
                                            setSearchQuery("");
                                        }
                                    }}
                                />

                                <button
                                    type="button"
                                    className="n26-search-close"
                                    aria-label="Close search"
                                    onClick={() => {
                                        setSearchOpen(false);
                                        setSearchQuery("");
                                    }}
                                >
                                    ×
                                </button>
                            </div>

                            {searchQuery.trim() ? (
                                <div className="n26-search-results">
                                    {searchResults.length > 0 ? (
                                        searchResults.map((result) => (
                                            <button
                                                type="button"
                                                key={result.id}
                                                className="n26-search-result"
                                                onClick={() =>
                                                    openSearchResult(result)
                                                }
                                            >
                                                <Thumbnail piece={result} />

                                                <span className="n26-search-result-info">
                                                    <strong>{result.name}</strong>
                                                    <small>{result.lookName}</small>
                                                </span>

                                                <span className="n26-search-result-price">
                                                    {result.price.toLocaleString("en-US")} DH
                                                </span>
                                            </button>
                                        ))
                                    ) : (
                                        <p className="n26-search-empty">
                                            No products found in Night ’26.
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <p className="n26-search-hint">
                                    Search by product name or look
                                </p>
                            )}
                        </div>
                    )}

                    {toast && <div className="n26-toast">{toast}</div>}

                    <div className="n26-controls">
                        <button
                            className="n26-round"
                            onClick={() => go((active + 5) % 6, -1)}
                        >
                            <I type="left" />
                        </button>

                        <div className="n26-timeline">
                            {LOOKS.map((item, index) => (
                                <button
                                    key={item.name}
                                    className={`n26-seg ${
                                        active === index ? "active" : ""
                                    }`}
                                    onClick={() => go(index, wrap(index - active))}
                                >
                                    <span className="n26-track">
                                        <i
                                            style={{
                                                width:
                                                    index < active
                                                        ? "100%"
                                                        : index === active
                                                            ? `${progress * 100}%`
                                                            : "0%"
                                            }}
                                        />
                                    </span>

                                    <span className="n26-seg-label">
                                        <b>{String(index + 1).padStart(2, "0")}</b>
                                        <em>{item.name}</em>
                                    </span>
                                </button>
                            ))}
                        </div>

                        <button
                            className="n26-play"
                            onClick={() => setPlaying((value) => !value)}
                        >
                            <I type={playing ? "pause" : "play"} />
                        </button>

                        <button
                            className="n26-round"
                            onClick={() => go((active + 1) % 6, 1)}
                        >
                            <I type="right" />
                        </button>
                    </div>

                    <div
                        className={`n26-view-cursor ${
                            pointer.visible && !geom.n ? "visible" : ""
                        }`}
                        style={{
                            left: pointer.x,
                            top: pointer.y
                        }}
                    >
                        VIEW
                    </div>
                </section>

                {/* PRODUCT SIDEBAR */}

                <aside className="n26-side">
                    <div className="n26-side-head">
                        <h2>In this <span>look</span></h2>
                        <small>2 PIECES</small>
                    </div>

                    <div className="n26-cards">
                        {pieces.map((piece, index) => {
                            const size = getSize(piece);
                            const added = isPieceInBag(piece, size);

                            return (
                                <article
                                    key={piece.id}
                                    data-piece={piece.id}
                                    className={`n26-card ${
                                        busy ? "is-busy" : ""
                                    } ${
                                        hover === index ? "pin-highlight" : ""
                                    }`}
                                    onMouseEnter={() => setHover(index)}
                                    onMouseLeave={() => setHover(-1)}
                                >
                                    <Thumbnail piece={piece} />

                                    <span className="n26-card-index">
                                        {index + 1}
                                    </span>

                                    <div className="n26-card-info">
                                        <strong>{piece.name}</strong>
                                        <span>
                                            {piece.price.toLocaleString("en-US")} DH
                                        </span>
                                    </div>

                                    {/* SIZE SELECTOR */}

                                    <div
                                        className="n26-size-selector"
                                        aria-label={`Choose size for ${piece.name}`}
                                    >
                                        {SIZE_OPTIONS.map((option) => (
                                            <button
                                                key={option}
                                                type="button"
                                                className={
                                                    size === option ? "selected" : ""
                                                }
                                                aria-pressed={size === option}
                                                onClick={() =>
                                                    changeSize(piece, option)
                                                }
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        type="button"
                                        className={`n26-add ${added ? "added" : ""}`}
                                        aria-label={
                                            added
                                                ? `Remove ${piece.name} size ${size}`
                                                : `Add ${piece.name} size ${size}`
                                        }
                                        onClick={() => add(piece)}
                                    >
                                        {added ? "×" : "+"}
                                    </button>

                                    <div className="n26-skeleton">
                                        <i />
                                        <i />
                                    </div>
                                </article>
                            );
                        })}
                    </div>

                    <div className="n26-bundle">
                        <div>
                            <strong>Complete the look</strong>
                            <p>Bundle all 2 and save 10%</p>
                        </div>

                        <div className="n26-bundle-price">
                            <del>{sum.toLocaleString("en-US")} DH</del>
                            <b>
                                {bundle.toLocaleString("en-US")}
                                {" "}
                                <small>DH</small>
                            </b>
                        </div>
                    </div>

                    <button
                        className={`n26-cta ${
                            full ? "in-bag" : ""
                        } ${
                            sweep ? "sweeping" : ""
                        }`}
                        onClick={addAll}
                    >
                        <span>
                            {full
                                ? "FULL LOOK IN BAG"
                                : "ADD FULL LOOK TO BAG"}
                        </span>
                        <I type="right" />
                        <i />
                    </button>
                </aside>
            </div>

            {/* FLYING PRODUCT ANIMATIONS */}

            {flyers.map((flyer) => (
                <div
                    key={flyer.id}
                    className="n26-flyer"
                    style={{
                        "--x": `${flyer.x}px`,
                        "--y": `${flyer.y}px`,
                        "--tx": `${flyer.tx}px`,
                        "--ty": `${flyer.ty}px`,
                        backgroundImage: `url("${flyer.image}")`
                    }}
                />
            ))}
        </main>
    );
}