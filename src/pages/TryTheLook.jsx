
import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./TryTheLook.css";

const ASSETS = "https://reel-ref-try-the-look.vercel.app/assets/";
const SHOP = "https://nike-makknzjs.myshopify.com";
const STORAGE_KEY = "runway-styling-bag-v3";

const products = {
  "air-jordan": {
    id: "tatum-5-orbit-copy",
    name: "Air Jordan 12 Retro",
    vendor: "Nikey | Password: 1",
    price: 149,
    image: "source-tatum-5-orbit-copy.webp",
    url: `${SHOP}/products/tatum-5-orbit-copy`,
    sizes: ["40", "41", "42", "43", "44", "45", "46"],
    variants: [57015167025457, 57015167058225, 57015167090993, 57015167123761, 57015167156529, 57015167189297, 57015167222065],
  },
  tshirt: {
    id: "tshirt",
    name: "Tshirt",
    vendor: "Nike",
    price: 199,
    image: "source-tshirt.webp",
    url: `${SHOP}/products/tshirt`,
    sizes: ["S", "L", "M", "XL"],
    variants: [56835911582001, 56835911614769, 56835911647537, 56835911680305],
  },
  sweatshirt: {
    id: "sweatshirt",
    name: "Sweatshirt",
    vendor: "Nike",
    price: 199,
    image: "source-sweatshirt.webp",
    url: `${SHOP}/products/sweatshirt`,
    sizes: ["S", "L", "M", "XL"],
    variants: [56835806396721, 56835806429489, 56835806462257, 56835806495025],
  },
  "tatum-orbit": {
    id: "tatum-5-orbit",
    name: "Tatum 5 Orbit",
    vendor: "Nikey | Password: 1",
    price: 149,
    image: "source-tatum-5-orbit.webp",
    url: `${SHOP}/products/tatum-5-orbit`,
    sizes: ["40", "41", "42", "43", "44", "45", "46"],
    variants: [57015166730545, 57015166763313, 57015166796081, 57015166828849, 57015166861617, 57015166894385, 57015166927153],
  },
  "hoodie-black": {
    id: "hoodie-black",
    name: "Hoodie Black",
    vendor: "Nike",
    price: 199,
    image: "source-hoodie-black.webp",
    url: `${SHOP}/products/hoodie-black`,
    sizes: ["S", "L", "M", "XL"],
    variants: [56836251681073, 56836251713841, 56836251746609, 56836251779377],
  },
  "sweatshirt-plus": {
    id: "sweatshirt-plus",
    name: "Sweatshirt Plus",
    vendor: "Nike",
    price: 199,
    image: "source-sweatshirt-plus.webp",
    url: `${SHOP}/products/sweatshirt-plus`,
    sizes: ["S", "L", "M", "XL"],
    variants: [56836143743281, 56836143776049, 56836143808817, 56836143841585],
  },
  hoodie: {
    id: "hoodie",
    name: "Hoodie",
    vendor: "Nike",
    price: 199,
    image: "source-hoodie.webp",
    url: `${SHOP}/products/hoodie`,
    sizes: ["S", "L", "M", "XL"],
    variants: [56836002185521, 56836002218289, 56836002251057, 56836002283825],
  },
  luka: {
    id: "air-jordan-12-retro-copy",
    name: "Luka 5",
    vendor: "Nikey | Password: 1",
    price: 149,
    image: "source-air-jordan-12-retro-copy.webp",
    url: `${SHOP}/products/air-jordan-12-retro-copy`,
    sizes: ["40", "41", "42", "43", "44", "45", "46"],
    variants: [57015176364337, 57015176397105, 57015176429873, 57015176462641, 57015176495409, 57015176528177, 57015176560945],
  },
};

const looks = [
  {
    name: "The City Edit",
    model: "model-1-640.webp",
    original: "original-look-1.webp",
    description: "A charcoal knit and easy denim.",
    items: ["air-jordan", "tshirt", "sweatshirt"],
  },
  {
    name: "Gallery Opening",
    model: "model-5-640.webp",
    original: "original-look-5.webp",
    description: "A clean white tee and relaxed denim.",
    items: ["tatum-orbit", "hoodie-black", "tshirt"],
    newItem: "hoodie-black",
  },
  {
    name: "Gallery Opening",
    model: "model-4-640.webp",
    original: "original-look-4.webp",
    description: "Olive knitwear. A grounded palette.",
    items: ["sweatshirt-plus", "tatum-orbit", "tshirt"],
    newItem: "tatum-orbit",
  },
  {
    name: "Studio Day",
    model: "model-6-640.webp",
    original: "original-look-6.webp",
    description: "Black, white and laid-back denim.",
    items: ["hoodie-black", "air-jordan", "tshirt"],
  },
  {
    name: "Studio Day",
    model: "model-3-640.webp",
    original: "original-look-3.webp",
    description: "Burgundy layers. A tailored perspective.",
    items: ["sweatshirt", "tatum-orbit", "tshirt"],
  },
  {
    name: "Studio Day",
    model: "model-2-640.webp",
    original: "original-look-2.webp",
    description: "A grey crew and your favourite denim.",
    items: ["hoodie", "luka", "tshirt"],
  },
];

const money = (amount) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

function getSavedBag() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function getVariant(product, size) {
  const index = product.sizes.indexOf(size);
  return index >= 0 ? product.variants[index] : null;
}

export default function TryTheLook() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [openPicker, setOpenPicker] = useState(null);
  const [bag, setBag] = useState(getSavedBag);
  const [bagOpen, setBagOpen] = useState(false);
  const [popup, setPopup] = useState(false);
  const [hotProduct, setHotProduct] = useState(null);
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState("");

  const look = looks[active];

  const totalItems = bag.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = bag.reduce((sum, item) => {
    const product = Object.values(products).find((p) => p.id === item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  const saveBag = useCallback((nextBag) => {
    setBag(nextBag);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextBag));
    } catch {
      // Storage may be unavailable in private browsing.
    }
  }, []);

  const showToast = useCallback((text) => {
    setToast(text);
    window.setTimeout(() => setToast(""), 2500);
  }, []);

  const goTo = useCallback((index) => {
    setActive((index + looks.length) % looks.length);
    setOpenPicker(null);
    setPopup(false);
    setHotProduct(null);
    setMessage("");
  }, []);

  const addProduct = useCallback((productKey, size) => {
    const product = products[productKey];
    const variantId = getVariant(product, size);

    if (!variantId) {
      setMessage(`Please choose a size for ${product.name}.`);
      return false;
    }

    const next = [...bag];
    const existing = next.find((item) => item.id === product.id && item.variantId === variantId);

    if (existing) {
      existing.quantity = Math.min(20, existing.quantity + 1);
    } else {
      next.push({
        id: product.id,
        variantId,
        size,
        quantity: 1,
      });
    }

    saveBag(next);
    showToast("Piece saved to your styling bag");
    setOpenPicker(null);
    setMessage("");
    return true;
  }, [bag, saveBag, showToast]);

  const addFullLook = () => {
    const missing = look.items.filter((key) => !selectedSizes[`${active}-${key}`]);

    if (missing.length) {
      setMessage(`Pick a size for: ${missing.map((key) => products[key].name).join(", ")}`);
      setOpenPicker(missing[0]);
      return;
    }

    const next = [...bag];

    look.items.forEach((key) => {
      const product = products[key];
      const size = selectedSizes[`${active}-${key}`];
      const variantId = getVariant(product, size);
      const existing = next.find((item) => item.id === product.id && item.variantId === variantId);

      if (existing) {
        existing.quantity = Math.min(20, existing.quantity + 1);
      } else {
        next.push({ id: product.id, variantId, size, quantity: 1 });
      }
    });

    saveBag(next);
    setMessage("");
    setOpenPicker(null);
    showToast("Look saved to your styling bag");
  };

  const removeBagItem = (variantId) => {
    saveBag(bag.filter((item) => item.variantId !== variantId));
  };

  const exportBag = () => {
    const lines = [
      "RUNWAY — STYLING SHORTLIST",
      "Reference prices; no order or payment has been placed.",
      "",
      ...bag.flatMap((entry) => {
        const product = Object.values(products).find((p) => p.id === entry.id);
        if (!product) return [];
        return [
          `${product.name} · Size ${entry.size} · Quantity ${entry.quantity}`,
          product.url,
        ];
      }),
    ];

    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "runway-outfit-shortlist.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (!playing || popup || bagOpen) return undefined;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % looks.length);
      setOpenPicker(null);
      setMessage("");
    }, 5000);
    return () => window.clearInterval(timer);
  }, [playing, popup, bagOpen]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setPopup(false);
        setBagOpen(false);
        setOpenPicker(null);
      }
      if (event.key === "ArrowRight" && !popup && !bagOpen) goTo(active + 1);
      if (event.key === "ArrowLeft" && !popup && !bagOpen) goTo(active - 1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, bagOpen, popup, goTo]);

  const updateSize = (key, size) => {
    setSelectedSizes((current) => ({
      ...current,
      [`${active}-${key}`]: size,
    }));
  };

  const pinProducts = useMemo(() => look.items.map((key) => products[key]), [look]);

  return (
    <main className="try-look">
      <header className="tl-header">
        <a href="/" className="tl-logo" aria-label="LANADA home">
          <img src={`${ASSETS}nike-logo.svg`} alt="Nike" />
        </a>

        <nav className="tl-nav" aria-label="Runway navigation">
          <a href="/">Home</a>
          <a href={`${SHOP}/pages/nike-orbit`} target="_blank" rel="noreferrer">Nike Orbit</a>
          <a href={`${SHOP}/pages/scene-rail`} target="_blank" rel="noreferrer">Hand Rail Pro</a>
          <a href="/try-the-look" aria-current="page">Runway</a>
        </nav>

        <button className="tl-bag-button" onClick={() => setBagOpen(true)} aria-label="Open styling bag">
          <svg viewBox="0 0 24 26" aria-hidden="true">
            <path d="M4 8h16l1 16H3L4 8zM8 8V6a4 4 0 0 1 8 0v2" />
          </svg>
          <span>{totalItems}</span>
        </button>
      </header>

      <section className="tl-layout">
        <div className="tl-left">
          <div className="tl-intro">
            <div>
              <h1>Try the Look.</h1>
              <p>Six looks, styled head to toe. Tap a pin to see the piece.</p>
            </div>
            <span className="tl-counter">{String(active + 1).padStart(2, "0")} / 06</span>
          </div>

          <div className="tl-stage">
            <div className="tl-stage-glow" />
            <button
              className="tl-model-button"
              onClick={() => {
                setPopup(true);
                setPlaying(false);
              }}
              aria-label={`View look: ${look.name}`}
            >
              <img
                key={look.model}
                className="tl-model"
                src={`${ASSETS}${look.model}`}
                alt={look.name}
                draggable="false"
              />
            </button>
            <button className="tl-view-button" onClick={() => { setPopup(true); setPlaying(false); }}>
              View look <span>↗</span>
            </button>
          </div>

          <div className="tl-controls">
            <button onClick={() => goTo(active - 1)} aria-label="Previous look">←</button>
            <div className="tl-progress">
              {looks.map((item, index) => (
                <button
                  key={`${item.name}-${index}`}
                  className={index === active ? "active" : index < active ? "past" : ""}
                  onClick={() => goTo(index)}
                  aria-label={`Look ${index + 1}: ${item.name}`}
                  aria-current={index === active ? "true" : undefined}
                >
                  <span />
                  {index === active && (
                    <small>{String(index + 1).padStart(2, "0")}　{item.name}</small>
                  )}
                </button>
              ))}
            </div>
            <button onClick={() => setPlaying((value) => !value)} aria-label={playing ? "Pause autoplay" : "Start autoplay"}>
              {playing ? "Ⅱ" : "▶"}
            </button>
            <button onClick={() => goTo(active + 1)} aria-label="Next look">→</button>
          </div>
        </div>

        <aside className="tl-panel">
          <div className="tl-panel-heading">
            <h2>In this look</h2>
            <span>3 PIECES</span>
          </div>

          <div className="tl-mobile-look-name">
            <strong>{look.name}</strong>
            <span>3 pieces</span>
          </div>

          <div className="tl-products">
            {look.items.map((key, index) => {
              const product = products[key];
              const size = selectedSizes[`${active}-${key}`] || "";
              const isOpen = openPicker === key;

              return (
                <article className={`tl-product ${hotProduct === index ? "is-hot" : ""}`} key={`${active}-${key}`}>
                  <a className="tl-product-image" href={product.url} target="_blank" rel="noreferrer" tabIndex="-1" aria-hidden="true">
                    <img src={`${ASSETS}${product.image}`} alt="" loading="lazy" />
                    <span>{index + 1}</span>
                    {look.newItem === key && <b>NEW</b>}
                  </a>

                  <div className="tl-product-info">
                    <small>{product.vendor}</small>
                    <a href={product.url} target="_blank" rel="noreferrer" className="tl-product-name">
                      {product.name}
                    </a>
                    <span>{money(product.price)}</span>
                    {size && <em>Selected size: {size}</em>}
                  </div>

                  <button
                    className={`tl-add ${isOpen ? "selected" : ""}`}
                    onClick={() => setOpenPicker(isOpen ? null : key)}
                    aria-expanded={isOpen}
                    aria-label={`Choose size: ${product.name}`}
                  >
                    {isOpen ? "×" : "+"}
                  </button>

                  {isOpen && (
                    <div className="tl-picker">
                      <div className="tl-picker-title">
                        <span>{product.sizes.length > 5 ? "Shoe size" : "Size"}</span>
                        <button onClick={() => setOpenPicker(null)} aria-label="Close size picker">×</button>
                      </div>
                      <div className="tl-sizes">
                        {product.sizes.map((option) => (
                          <button
                            key={option}
                            className={size === option ? "chosen" : ""}
                            onClick={() => updateSize(key, option)}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                      <button
                        className="tl-confirm"
                        onClick={() => size && addProduct(key, size)}
                        disabled={!size}
                      >
                        Add to bag
                      </button>
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          <div className="tl-bundle">
            <p className="tl-message" role="status">{message}</p>
            <div className="tl-bundle-info">
              <div>
                <strong>Complete the look</strong>
                <small>Bundle all 3 and save 10%</small>
              </div>
              <div className="tl-bundle-price">
                <del>$547.00</del>
                <strong>$492.30</strong>
              </div>
            </div>
            <button className="tl-full-button" onClick={addFullLook}>
              <span className="desktop-label">Add full look to bag</span>
              <span className="mobile-label">Add full look — $492.30</span>
              <span>→</span>
            </button>
          </div>
        </aside>
      </section>

      <div className="tl-mobile-progress">
        <span style={{ width: `${((active + 1) / 6) * 100}%` }} />
      </div>

      {popup && (
        <div className="tl-popup" role="dialog" aria-modal="true" aria-label="View look" onClick={() => setPopup(false)}>
          <div className="tl-popup-top">
            <div>
              <small>LOOK {String(active + 1).padStart(2, "0")}</small>
              <h2>{look.name}</h2>
            </div>
            <button onClick={() => setPopup(false)} aria-label="Close popup">×</button>
          </div>

          <div className="tl-popup-model" onClick={(event) => event.stopPropagation()}>
            <img src={`${ASSETS}${look.original}`} alt={look.name} />
            {pinProducts.map((product, index) => (
              <button
                key={product.id}
                className={`tl-pin tl-pin-${index + 1} ${hotProduct === index ? "active" : ""}`}
                onClick={() => {
                  setHotProduct(index);
                  setMessage(`${product.name} — ${money(product.price)}`);
                }}
                aria-label={`View ${product.name}`}
              >
                {index + 1}
                <span>{product.name}</span>
              </button>
            ))}
          </div>
          <p className="tl-popup-hint">Tap a dot to shop the piece</p>
        </div>
      )}

      {bagOpen && (
        <div className="tl-bag-overlay" onClick={() => setBagOpen(false)}>
          <section className="tl-bag-dialog" role="dialog" aria-modal="true" aria-label="Your styling bag" onClick={(event) => event.stopPropagation()}>
            <div className="tl-bag-heading">
              <h2>Your styling bag</h2>
              <button onClick={() => setBagOpen(false)} aria-label="Close styling bag">×</button>
            </div>
            <p className="tl-bag-note">
              A local outfit shortlist. No payment or order is collected here. Open a piece on the original demo to continue.
            </p>

            <div className="tl-bag-items">
              {bag.length === 0 ? (
                <p className="tl-bag-note">Your styling bag is empty. Choose a size beside a piece to save it.</p>
              ) : bag.map((entry) => {
                const product = Object.values(products).find((item) => item.id === entry.id);
                if (!product) return null;

                return (
                  <div className="tl-bag-row" key={entry.variantId}>
                    <img src={`${ASSETS}${product.image}`} alt={product.name} />
                    <div>
                      <h3>{product.name}</h3>
                      <p>Size {entry.size} · Quantity {entry.quantity} · {money(product.price)}</p>
                      <a href={product.url} target="_blank" rel="noreferrer">View original piece ↗</a>
                    </div>
                    <button onClick={() => removeBagItem(entry.variantId)} aria-label={`Remove ${product.name}`}>×</button>
                  </div>
                );
              })}
            </div>

            {bag.length > 0 && (
              <>
                <p className="tl-bag-total">Reference subtotal {money(subtotal)}</p>
                <button className="tl-export" onClick={exportBag}>Download outfit shortlist</button>
              </>
            )}
          </section>
        </div>
      )}

      <div className={`tl-toast ${toast ? "visible" : ""}`} role="status">{toast}</div>
    </main>
  );
}
