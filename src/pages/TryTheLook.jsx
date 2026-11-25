
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./TryTheLook.css";

const ASSET = "https://reel-ref-try-the-look.vercel.app/assets";
const SHOP = "https://nike-makknzjs.myshopify.com";
const BAG_KEY = "runway-styling-bag-v3";
const AUTOPLAY_MS = 5000;

const PRODUCTS = {
  "tatum-5-orbit-copy": {
    id: "tatum-5-orbit-copy",
    name: "Air Jordan 12 Retro",
    vendor: "Nikey | Password: 1",
    price: 149,
    image: "source-tatum-5-orbit-copy.webp",
    imageHeight: 400,
    optionName: "Shoe size",
    sizes: ["40", "41", "42", "43", "44", "45", "46"],
    variants: [
      57015167025457, 57015167058225, 57015167090993,
      57015167123761, 57015167156529, 57015167189297,
      57015167222065,
    ],
    url: `${SHOP}/products/tatum-5-orbit-copy`,
  },
  tshirt: {
    id: "tshirt",
    name: "Tshirt",
    vendor: "Nike",
    price: 199,
    image: "source-tshirt.webp",
    imageHeight: 563,
    optionName: "Size",
    sizes: ["S", "L", "M", "XL"],
    variants: [
      56835911582001, 56835911614769, 56835911647537, 56835911680305,
    ],
    url: `${SHOP}/products/tshirt`,
  },
  sweatshirt: {
    id: "sweatshirt",
    name: "Sweatshirt",
    vendor: "Nike",
    price: 199,
    image: "source-sweatshirt.webp",
    imageHeight: 581,
    optionName: "Size",
    sizes: ["S", "L", "M", "XL"],
    variants: [
      56835806396721, 56835806429489, 56835806462257, 56835806495025,
    ],
    url: `${SHOP}/products/sweatshirt`,
  },
  "tatum-5-orbit": {
    id: "tatum-5-orbit",
    name: "Tatum 5 Orbit",
    vendor: "Nikey | Password: 1",
    price: 149,
    image: "source-tatum-5-orbit.webp",
    imageHeight: 400,
    optionName: "Shoe size",
    sizes: ["40", "41", "42", "43", "44", "45", "46"],
    variants: [
      57015166730545, 57015166763313, 57015166796081,
      57015166828849, 57015166861617, 57015166894385,
      57015166927153,
    ],
    url: `${SHOP}/products/tatum-5-orbit`,
  },
  "hoodie-black": {
    id: "hoodie-black",
    name: "Hoodie Black",
    vendor: "Nike",
    price: 199,
    image: "source-hoodie-black.webp",
    imageHeight: 536,
    optionName: "Size",
    sizes: ["S", "L", "M", "XL"],
    variants: [
      56836251681073, 56836251713841, 56836251746609, 56836251779377,
    ],
    url: `${SHOP}/products/hoodie-black`,
  },
  "sweatshirt-plus": {
    id: "sweatshirt-plus",
    name: "Sweatshirt Plus",
    vendor: "Nike",
    price: 199,
    image: "source-sweatshirt-plus.webp",
    imageHeight: 610,
    optionName: "Size",
    sizes: ["S", "L", "M", "XL"],
    variants: [
      56836143743281, 56836143776049, 56836143808817, 56836143841585,
    ],
    url: `${SHOP}/products/sweatshirt-plus`,
  },
  hoodie: {
    id: "hoodie",
    name: "Hoodie",
    vendor: "Nike",
    price: 199,
    image: "source-hoodie.webp",
    imageHeight: 555,
    optionName: "Size",
    sizes: ["S", "L", "M", "XL"],
    variants: [
      56836002185521, 56836002218289, 56836002251057, 56836002283825,
    ],
    url: `${SHOP}/products/hoodie`,
  },
  "air-jordan-12-retro-copy": {
    id: "air-jordan-12-retro-copy",
    name: "Luka 5",
    vendor: "Nikey | Password: 1",
    price: 149,
    image: "source-air-jordan-12-retro-copy.webp",
    imageHeight: 400,
    optionName: "Shoe size",
    sizes: ["40", "41", "42", "43", "44", "45", "46"],
    variants: [
      57015176364337, 57015176397105, 57015176429873,
      57015176462641, 57015176495409, 57015176528177,
      57015176560945,
    ],
    url: `${SHOP}/products/air-jordan-12-retro-copy`,
  },
};

const LOOKS = [
  {
    key: "bndthK",
    name: "The City Edit",
    description: "A charcoal knit and easy denim.",
    model: "model-1-640.webp",
    original: "original-look-1.webp",
    products: ["tatum-5-orbit-copy", "tshirt", "sweatshirt"],
    pins: [
      ["Air Jordan 12 Retro", 47, 27],
      ["Tshirt", 48, 58],
      ["Sweatshirt", 45, 96],
    ],
  },
  {
    key: "XckgG6",
    name: "Gallery Opening",
    description: "A clean white tee and relaxed denim.",
    model: "model-5-640.webp",
    original: "original-look-5.webp",
    products: ["tatum-5-orbit", "hoodie-black", "tshirt"],
    newProduct: "hoodie-black",
    pins: [
      ["Tatum 5 Orbit", 50, 28],
      ["Hoodie Black", 48, 58],
      ["Tshirt", 45, 88],
    ],
  },
  {
    key: "rLfAhC",
    name: "Gallery Opening",
    description: "Olive knitwear. A grounded palette.",
    model: "model-4-640.webp",
    original: "original-look-4.webp",
    products: ["sweatshirt-plus", "tatum-5-orbit", "tshirt"],
    newProduct: "tatum-5-orbit",
    pins: [
      ["Sweatshirt Plus", 50, 28],
      ["Tatum 5 Orbit", 48, 58],
      ["Tshirt", 45, 88],
    ],
  },
  {
    key: "FKg67q",
    name: "Studio Day",
    description: "Black, white and laid-back denim.",
    model: "model-6-640.webp",
    original: "original-look-6.webp",
    products: ["hoodie-black", "tatum-5-orbit-copy", "tshirt"],
    pins: [
      ["Hoodie Black", 50, 28],
      ["Air Jordan 12 Retro", 48, 58],
      ["Tshirt", 45, 88],
    ],
  },
  {
    key: "8KREEE",
    name: "Studio Day",
    description: "Burgundy layers. A tailored perspective.",
    model: "model-3-640.webp",
    original: "original-look-3.webp",
    products: ["sweatshirt", "tatum-5-orbit", "tshirt"],
    pins: [
      ["Sweatshirt", 50, 28],
      ["Tatum 5 Orbit", 48, 58],
      ["Tshirt", 45, 88],
    ],
  },
  {
    key: "N3bfm9",
    name: "Studio Day",
    description: "A grey crew and your favourite denim.",
    model: "model-2-640.webp",
    original: "original-look-2.webp",
    products: ["hoodie", "air-jordan-12-retro-copy", "tshirt"],
    pins: [
      ["Hoodie", 50, 28],
      ["Luka 5", 48, 58],
      ["Tshirt", 45, 88],
    ],
  },
];

const money = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

function readBag() {
  try {
    const parsed = JSON.parse(localStorage.getItem(BAG_KEY) || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (item) =>
          Number.isSafeInteger(Number(item.id)) &&
          Number.isInteger(item.quantity) &&
          item.quantity >= 1 &&
          item.quantity <= 20
      )
      .slice(0, 50);
  } catch {
    return [];
  }
}

function getVariant(product, size) {
  const index = product.sizes.indexOf(size);
  if (index < 0) return null;
  return product.variants[index];
}

function Icon({ name, size = 20 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  if (name === "plus")
    return <svg {...common}><path d="M12 4v16M4 12h16" /></svg>;
  if (name === "close")
    return <svg {...common}><path d="M5 5l14 14M19 5L5 19" /></svg>;
  if (name === "left")
    return <svg {...common}><path d="m15 18-6-6 6-6" /></svg>;
  if (name === "right")
    return <svg {...common}><path d="m9 18 6-6-6-6" /></svg>;
  if (name === "pause")
    return <svg {...common}><path d="M9 5v14M15 5v14" /></svg>;
  if (name === "play")
    return <svg {...common}><path d="m8 5 11 7-11 7z" /></svg>;
  if (name === "bag")
    return (
      <svg {...common} viewBox="0 0 24 26">
        <path d="M4 8h16l1 16H3L4 8zM8 8V6a4 4 0 0 1 8 0v2" />
      </svg>
    );
  if (name === "check")
    return <svg {...common}><path d="m4.5 12.5 5 5L19.5 7" /></svg>;
  return null;
}

export default function TryTheLook() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [engaged, setEngaged] = useState(false);
  const [bag, setBag] = useState(readBag);
  const [toast, setToast] = useState("");
  const [bagOpen, setBagOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [picker, setPicker] = useState(null);
  const [sizes, setSizes] = useState({});
  const [added, setAdded] = useState({});
  const [hotPin, setHotPin] = useState(null);
  const [message, setMessage] = useState("");
  const [dragging, setDragging] = useState(false);

  const stageRef = useRef(null);
  const dragRef = useRef(null);
  const timerRef = useRef(null);
  const toastRef = useRef(null);
  const touchStartRef = useRef(0);

  const look = LOOKS[index];
  const count = bag.reduce((sum, item) => sum + item.quantity, 0);
  const currentProducts = useMemo(
    () => look.products.map((id) => PRODUCTS[id]),
    [look]
  );

  const stopTimer = useCallback(() => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = null;
  }, []);

  const showToast = useCallback((text) => {
    setToast(text);
    window.clearTimeout(toastRef.current);
    toastRef.current = window.setTimeout(() => setToast(""), 2500);
  }, []);

  const saveBag = useCallback((next) => {
    setBag(next);
    try {
      localStorage.setItem(BAG_KEY, JSON.stringify(next));
    } catch {
      // Storage may be unavailable; the current session still works.
    }
  }, []);

  const addItems = useCallback(
    (items) => {
      const next = [...bag];

      for (const item of items) {
        const variant = Number(item.id);
        const product = Object.values(PRODUCTS).find((p) =>
          p.variants.includes(variant)
        );
        if (!product) throw new Error("Please choose an available size.");

        const existing = next.find((entry) => Number(entry.id) === variant);
        if (existing) {
          existing.quantity = Math.min(20, existing.quantity + 1);
        } else {
          next.push({ id: variant, quantity: 1 });
        }
      }

      saveBag(next);
      showToast(
        items.length > 1
          ? "Look saved to your styling bag"
          : "Piece saved to your styling bag"
      );
    },
    [bag, saveBag, showToast]
  );

  const moveTo = useCallback(
    (next) => {
      const normalized = ((next % LOOKS.length) + LOOKS.length) % LOOKS.length;
      setIndex(normalized);
      setPopupOpen(false);
      setPicker(null);
      setHotPin(null);
      setMessage("");
      setEngaged(false);
      setPlaying(true);
    },
    []
  );

  const next = useCallback(() => moveTo(index + 1), [index, moveTo]);
  const prev = useCallback(() => moveTo(index - 1), [index, moveTo]);

  const go = useCallback(
    (target) => {
      let distance = (target - index + LOOKS.length) % LOOKS.length;
      if (distance > 3) distance -= LOOKS.length;
      moveTo(index + distance);
    },
    [index, moveTo]
  );

  useEffect(() => {
    stopTimer();
    if (
      !playing ||
      engaged ||
      popupOpen ||
      picker !== null ||
      typeof document === "undefined"
    ) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    timerRef.current = window.setTimeout(() => {
      if (!document.hidden) next();
      else setPlaying(false);
    }, AUTOPLAY_MS);

    return stopTimer;
  }, [index, playing, engaged, popupOpen, picker, next, stopTimer]);

  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) stopTimer();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      stopTimer();
      window.clearTimeout(toastRef.current);
    };
  }, [stopTimer]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") {
        if (bagOpen) setBagOpen(false);
        else if (picker !== null) setPicker(null);
        else if (popupOpen) setPopupOpen(false);
      }
      if (popupOpen || bagOpen) return;
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, popupOpen, bagOpen, picker]);

  const engage = () => {
    setEngaged(true);
    setPlaying(false);
  };

  const selectLook = (newIndex) => {
    engage();
    go(newIndex);
  };

  const handlePointerDown = (event) => {
    if (event.button !== undefined && event.button !== 0) return;
    dragRef.current = {
      x: event.clientX,
      y: event.clientY,
      startIndex: index,
      moved: false,
    };
  };

  const handlePointerMove = (event) => {
    if (!dragRef.current) return;
    const dx = event.clientX - dragRef.current.x;
    const dy = event.clientY - dragRef.current.y;
    if (!dragRef.current.moved && Math.abs(dx) > 8 && Math.abs(dx) > 1.2 * Math.abs(dy)) {
      dragRef.current.moved = true;
      setDragging(true);
      engage();
      stageRef.current?.setPointerCapture?.(event.pointerId);
    } else if (!dragRef.current.moved && Math.abs(dy) > 10) {
      dragRef.current = null;
      return;
    }
  };

  const handlePointerUp = (event) => {
    if (!dragRef.current) return;
    const dx = event.clientX - dragRef.current.x;
    const didMove = dragRef.current.moved;
    const start = dragRef.current.startIndex;
    dragRef.current = null;
    setDragging(false);
    if (didMove && Math.abs(dx) > 30) {
      moveTo(start + (dx > 0 ? -1 : 1));
    }
  };

  const openPicker = (productId) => {
    engage();
    const product = PRODUCTS[productId];
    setSizes((old) => ({
      ...old,
      [productId]: old[productId] || product.sizes[0],
    }));
    setPicker(productId);
  };

  const confirmPiece = (productId) => {
    const product = PRODUCTS[productId];
    const size = sizes[productId] || product.sizes[0];
    const variant = getVariant(product, size);
    if (!variant) {
      setMessage("Please choose an available size.");
      return;
    }

    try {
      addItems([{ id: variant, quantity: 1 }]);
      setAdded((old) => ({ ...old, [productId]: true }));
      setPicker(null);
      setMessage("");
    } catch {
      setMessage("Couldn’t add to bag. Please try again.");
    }
  };

  const addFullLook = () => {
    if (currentProducts.every((product) => added[product.id])) return;
    engage();
    setMessage("");

    const pending = currentProducts.filter((product) => !added[product.id]);
    const ready = pending.filter((product) => {
      const selected = sizes[product.id];
      return Boolean(selected && selected !== product.sizes[0]);
    });
    const missing = pending.filter((product) => !ready.includes(product));

    if (missing.length) {
      setPicker(missing[0].id);
      setMessage(`Pick a size for: ${missing.map((p) => p.name).join(", ")}`);
      return;
    }

    try {
      const items = ready.map((product) => ({
        id: getVariant(product, sizes[product.id]),
        quantity: 1,
      }));
      addItems(items);
      setAdded((old) => ({
        ...old,
        ...Object.fromEntries(ready.map((product) => [product.id, true])),
      }));
    } catch {
      setMessage("Couldn’t add to bag. Please try again.");
    }
  };

  const removeBagItem = (variantId) => {
    saveBag(bag.filter((item) => Number(item.id) !== Number(variantId)));
  };

  const bagDetails = bag.map((entry) => {
    const product = Object.values(PRODUCTS).find((p) =>
      p.variants.includes(Number(entry.id))
    );
    if (!product) return null;
    const sizeIndex = product.variants.indexOf(Number(entry.id));
    return {
      ...entry,
      product,
      size: product.sizes[sizeIndex],
      lineTotal: product.price * entry.quantity,
    };
  }).filter(Boolean);

  const bagTotal = bagDetails.reduce((sum, item) => sum + item.lineTotal, 0);

  const exportBag = () => {
    const content = [
      "RUNWAY — STYLING SHORTLIST",
      "Reference prices; no order or payment has been placed.",
      "",
      ...bagDetails.flatMap((item) => [
        `${item.product.name} · Size ${item.size} · Quantity ${item.quantity}`,
        item.product.url,
      ]),
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "runway-outfit-shortlist.txt";
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <main className="rw-page">
      <header className="rw-header">
        <a className="rw-brand" href="/" aria-label="Runway home">
          <img src={`${ASSET}/nike-logo.svg`} alt="Nike" />
        </a>

        <nav className="rw-nav" aria-label="Main navigation">
          <a href="/">Home</a>
          <a href={`${SHOP}/pages/nike-orbit`} target="_blank" rel="noreferrer">Nike Orbit</a>
          <a href={`${SHOP}/pages/scene-rail`} target="_blank" rel="noreferrer">Hand Rail Pro</a>
          <a href="/try-the-look" aria-current="page">Runway</a>
        </nav>

        <button
          className="rw-header-bag"
          type="button"
          onClick={() => setBagOpen(true)}
          aria-label="Open styling bag"
        >
          <Icon name="bag" size={24} />
          <span>{count}</span>
        </button>
      </header>

      <section className="rw" id="Runway-template--28035983671601__the_runway_wdM8BG">
        <div className="rw-grid">
          <div className="rw-left">
            <div className="rw-head">
              <div className="rw-intro">
                <h1>Try the Look.</h1>
                <p>Six looks, styled head to toe. Tap a pin to see the piece.</p>
              </div>
            </div>

            <div
              ref={stageRef}
              className={`rw-stage ${dragging ? "is-dragging" : ""}`}
              role="region"
              aria-roledescription="carousel"
              aria-label="Try the Look. Use arrow keys or swipe to change look"
              tabIndex={0}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onMouseEnter={() => {
                if (!engaged) stopTimer();
              }}
              onMouseLeave={() => {
                if (!engaged && playing) {
                  stopTimer();
                  timerRef.current = window.setTimeout(next, AUTOPLAY_MS);
                }
              }}
            >
              <div className="rw-ring" aria-hidden="true">
                {LOOKS.map((item, i) => {
                  const delta = ((i - index + 6) % 6);
                  const signed = delta > 3 ? delta - 6 : delta;
                  const angle = signed * 30 * Math.PI / 180;
                  const scale = 1 / (1 + Math.abs(signed) * 0.12);
                  const x = 50 + Math.sin(angle) * 42;
                  const y = 3 + (1 - Math.cos(angle)) * 22;
                  return (
                    <div
                      className={`rw-ring-model ${i === index ? "is-active" : ""}`}
                      key={item.key}
                      style={{
                        "--x": `${x}%`,
                        "--y": `${y}%`,
                        "--scale": scale,
                        "--blur": `${Math.min(Math.abs(signed) * 1.4, 6)}px`,
                        zIndex: 20 - Math.abs(signed),
                      }}
                    >
                      <img src={`${ASSET}/${item.model}`} alt="" />
                    </div>
                  );
                })}
              </div>

              <div className="rw-active-model">
                <img
                  src={`${ASSET}/${look.model}`}
                  srcSet={`${ASSET}/${look.model} 640w, ${ASSET}/${look.original} 1080w`}
                  sizes="(min-width: 1800px) 540px, (min-width: 750px) 420px, 320px"
                  alt={look.name}
                  draggable="false"
                />
                {look.pins.map(([name, left, top], i) => (
                  <button
                    type="button"
                    key={`${look.key}-${name}`}
                    className={`rw-pin ${hotPin === i ? "is-hot" : ""}`}
                    style={{ left: `${left}%`, top: `${top}%` }}
                    data-tip={name}
                    aria-label={`${i + 1}: ${name}`}
                    onClick={() => {
                      engage();
                      setHotPin(i);
                      setPopupOpen(true);
                    }}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className="rw-model-view"
                  type="button"
                  aria-label={`View look ${index + 1}: ${look.name}`}
                  onClick={() => {
                    engage();
                    setPopupOpen(true);
                  }}
                />
              </div>

              <div className="rw-walk" aria-hidden="true">
                <span style={{ width: `${((index + 1) / 6) * 100}%` }} />
              </div>
            </div>

            <div className="rw-controls">
              <button type="button" onClick={prev} aria-label="Previous look">
                <Icon name="left" />
              </button>
              <div className="rw-ticks" aria-label="Choose a look">
                {LOOKS.map((item, i) => (
                  <button
                    type="button"
                    key={item.key}
                    className={i === index ? "is-current" : i < index ? "is-past" : ""}
                    aria-current={i === index ? "true" : undefined}
                    aria-label={`Look ${i + 1}: ${item.name}`}
                    onClick={() => selectLook(i)}
                  >
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <i />
                  </button>
                ))}
              </div>
              <button type="button" onClick={next} aria-label="Next look">
                <Icon name="right" />
              </button>
              <button
                type="button"
                className="rw-play"
                onClick={() => {
                  if (!playing) setEngaged(false);
                  setPlaying((value) => !value);
                }}
                aria-label={playing ? "Pause autoplay" : "Play autoplay"}
                aria-pressed={playing}
              >
                <Icon name={playing ? "pause" : "play"} />
              </button>
            </div>
          </div>

          <aside className="rw-panel">
            <div className="rw-panel-inner">
              <div className="rw-panel-head">
                <span>Look {String(index + 1).padStart(2, "0")} / 06</span>
                <h2>{look.name}</h2>
                <p>In this look</p>
              </div>

              <div className="rw-mobile-head">
                <h2>{look.name}</h2>
                <span>3 pieces</span>
              </div>

              <div className="rw-items">
                {currentProducts.map((product, i) => {
                  const isAdded = Boolean(added[product.id]);
                  const selectedSize = sizes[product.id] || product.sizes[0];

                  return (
                    <article
                      className={`rw-item ${picker === product.id ? "is-picking" : ""} ${isAdded ? "is-added" : ""} ${hotPin === i ? "is-hot" : ""}`}
                      key={`${look.key}-${product.id}`}
                      onMouseEnter={() => setHotPin(i)}
                      onMouseLeave={() => setHotPin(null)}
                    >
                      <a
                        className="rw-media"
                        href={product.url}
                        target="_blank"
                        rel="noreferrer"
                        tabIndex={-1}
                        aria-hidden="true"
                      >
                        <img
                          src={`${ASSET}/${product.image}`}
                          alt=""
                          loading="lazy"
                          width="400"
                          height={product.imageHeight}
                        />
                        <span className="rw-number">{i + 1}</span>
                        {look.newProduct === product.id && <span className="rw-tag">New</span>}
                      </a>

                      <div className="rw-info">
                        <span className="rw-vendor">{product.vendor}</span>
                        <a className="rw-product-name" href={product.url} target="_blank" rel="noreferrer">
                          {product.name}
                        </a>
                        <span className="rw-price">{money(product.price)}</span>
                      </div>

                      <button
                        type="button"
                        className="rw-add"
                        aria-label={isAdded ? `Added to bag: ${product.name}` : `Add to bag: ${product.name}`}
                        aria-expanded={picker === product.id}
                        aria-controls={`rw-picker-${product.id}`}
                        disabled={isAdded}
                        onClick={() => {
                          if (picker === product.id) setPicker(null);
                          else openPicker(product.id);
                        }}
                      >
                        {isAdded ? <Icon name="check" /> : <Icon name="plus" />}
                      </button>

                      {picker === product.id && (
                        <div className="rw-picker" id={`rw-picker-${product.id}`}>
                          <div className="rw-picker-head">
                            <img src={`${ASSET}/${product.image}`} alt="" />
                            <div>
                              <strong>{product.name}</strong>
                              <span>{money(product.price)}</span>
                            </div>
                            <button type="button" onClick={() => setPicker(null)} aria-label="Close size picker">
                              <Icon name="close" />
                            </button>
                          </div>
                          <fieldset>
                            <legend>{product.optionName}</legend>
                            <div className="rw-sizes">
                              {product.sizes.map((size) => (
                                <label className="rw-size" key={size}>
                                  <input
                                    type="radio"
                                    name={`size-${product.id}`}
                                    value={size}
                                    checked={selectedSize === size}
                                    onChange={() => {
                                      engage();
                                      setSizes((old) => ({ ...old, [product.id]: size }));
                                    }}
                                  />
                                  <span>{size}</span>
                                </label>
                              ))}
                            </div>
                          </fieldset>
                          <button
                            type="button"
                            className="rw-confirm"
                            onClick={() => confirmPiece(product.id)}
                          >
                            Add to bag
                          </button>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>

              <div className="rw-bundle">
                <p className="rw-message" role="status" aria-live="polite">{message}</p>
                <div className="rw-bundle-row">
                  <div>
                    <strong>Complete the look</strong>
                    <span>Bundle all 3 and save 10%</span>
                  </div>
                  <div className="rw-bundle-price">
                    <s>$547.00</s>
                    <strong>$492.30</strong>
                  </div>
                </div>
                <button type="button" className="rw-cta" onClick={addFullLook}>
                  <span className="rw-cta-desktop">Add full look to bag</span>
                  <span className="rw-cta-mobile">Add full look — $492.30</span>
                  <span className="rw-cta-arrow">→</span>
                </button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {popupOpen && (
        <div
          className="rw-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="View look"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setPopupOpen(false);
          }}
        >
          <div className="rw-lightbox-top">
            <div>
              <span>LOOK {String(index + 1).padStart(2, "0")}</span>
              <strong>{look.name}</strong>
            </div>
            <button type="button" onClick={() => setPopupOpen(false)} aria-label="Close">
              <Icon name="close" />
            </button>
          </div>
          <div className="rw-lightbox-model">
            <img src={`${ASSET}/${look.original}`} alt={look.name} />
            {look.pins.map(([name, left, top], i) => (
              <button
                type="button"
                key={`${name}-${i}`}
                className={`rw-pin ${hotPin === i ? "is-hot" : ""}`}
                style={{ left: `${left}%`, top: `${top}%` }}
                data-tip={name}
                onClick={() => {
                  setHotPin(i);
                  setMessage(`Selected: ${name}`);
                }}
                aria-label={`${i + 1}: ${name}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <p className="rw-lightbox-hint">Tap a dot to shop the piece</p>
        </div>
      )}

      {bagOpen && (
        <div
          className="rw-bag-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setBagOpen(false);
          }}
        >
          <section className="rw-bag-dialog" role="dialog" aria-modal="true" aria-labelledby="rw-bag-title">
            <div className="rw-bag-heading">
              <h2 id="rw-bag-title">Your styling bag</h2>
              <button type="button" onClick={() => setBagOpen(false)} aria-label="Close styling bag">×</button>
            </div>
            <p className="rw-bag-note">
              A local outfit shortlist. No payment or order is collected here. Open a piece on the original demo to continue.
            </p>

            {bagDetails.length === 0 ? (
              <p className="rw-bag-note">Your styling bag is empty. Choose a size beside a piece to save it.</p>
            ) : (
              <div className="rw-bag-items">
                {bagDetails.map((item) => (
                  <article className="rw-bag-row" key={item.id}>
                    <img src={`${ASSET}/${item.product.image}`} alt={item.product.name} />
                    <div>
                      <h3>{item.product.name}</h3>
                      <p>Size {item.size} · Quantity {item.quantity} · {money(item.product.price)}</p>
                      <a href={item.product.url} target="_blank" rel="noreferrer">View original piece ↗</a>
                    </div>
                    <button
                      type="button"
                      aria-label={`Remove ${item.product.name}`}
                      onClick={() => removeBagItem(item.id)}
                    >
                      ×
                    </button>
                  </article>
                ))}
              </div>
            )}

            <p className="rw-bag-total">
              {bagDetails.length ? `Reference subtotal ${money(bagTotal)}` : ""}
            </p>
            <button
              type="button"
              className="rw-export"
              disabled={!bagDetails.length}
              onClick={exportBag}
            >
              Download outfit shortlist
            </button>
          </section>
        </div>
      )}

      {toast && <div className="rw-toast" role="status" aria-live="polite">{toast}</div>}
    </main>
  );
}
