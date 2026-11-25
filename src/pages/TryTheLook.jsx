
import React, { useContext, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import "./TryTheLook.css";

const ASSET = "https://reel-ref-try-the-look.vercel.app/assets";

const PRODUCTS = {
  "tatum-5-orbit-copy": {
    id: "tatum-5-orbit-copy",
    name: "Air Jordan 12 Retro",
    price: 149,
    image: "source-tatum-5-orbit-copy.webp",
    sizes: ["40", "41", "42", "43", "44", "45", "46"],
    optionName: "Shoe size",
  },
  tshirt: {
    id: "tshirt",
    name: "Essential T-Shirt",
    price: 199,
    image: "source-tshirt.webp",
    sizes: ["S", "M", "L", "XL"],
    optionName: "Select size",
  },
  sweatshirt: {
    id: "sweatshirt",
    name: "Premium Sweatshirt",
    price: 199,
    image: "source-sweatshirt.webp",
    sizes: ["S", "M", "L", "XL"],
    optionName: "Select size",
  },
  "tatum-5-orbit": {
    id: "tatum-5-orbit",
    name: "Tatum 5 Orbit",
    price: 149,
    image: "source-tatum-5-orbit.webp",
    sizes: ["40", "41", "42", "43", "44", "45", "46"],
    optionName: "Shoe size",
  },
  "hoodie-black": {
    id: "hoodie-black",
    name: "Essential Black Hoodie",
    price: 199,
    image: "source-hoodie-black.webp",
    sizes: ["S", "M", "L", "XL"],
    optionName: "Select size",
  },
  "sweatshirt-plus": {
    id: "sweatshirt-plus",
    name: "Relaxed Sweatshirt",
    price: 199,
    image: "source-sweatshirt-plus.webp",
    sizes: ["S", "M", "L", "XL"],
    optionName: "Select size",
  },
  hoodie: {
    id: "hoodie",
    name: "Classic Hoodie",
    price: 199,
    image: "source-hoodie.webp",
    sizes: ["S", "M", "L", "XL"],
    optionName: "Select size",
  },
  "air-jordan-12-retro-copy": {
    id: "air-jordan-12-retro-copy",
    name: "Luka 5",
    price: 149,
    image: "source-air-jordan-12-retro-copy.webp",
    sizes: ["40", "41", "42", "43", "44", "45", "46"],
    optionName: "Shoe size",
  },
};

const LOOKS = [
  {
    key: "city-edit",
    name: "The City Edit",
    description: "Modern essentials. Effortless everyday style.",
    model: "model-1-640.webp",
    original: "original-look-1.webp",
    products: ["tatum-5-orbit-copy", "tshirt", "sweatshirt"],
    pins: [
      ["Air Jordan 12 Retro", 47, 27],
      ["Essential T-Shirt", 48, 58],
      ["Premium Sweatshirt", 45, 88],
    ],
  },
  {
    key: "gallery-white",
    name: "Gallery Opening",
    description: "Clean lines and understated essentials.",
    model: "model-5-640.webp",
    original: "original-look-5.webp",
    products: ["tatum-5-orbit", "hoodie-black", "tshirt"],
    newProduct: "hoodie-black",
    pins: [
      ["Tatum 5 Orbit", 50, 28],
      ["Essential Black Hoodie", 48, 58],
      ["Essential T-Shirt", 45, 88],
    ],
  },
  {
    key: "olive-knit",
    name: "Olive Edit",
    description: "A considered palette with a relaxed finish.",
    model: "model-4-640.webp",
    original: "original-look-4.webp",
    products: ["sweatshirt-plus", "tatum-5-orbit", "tshirt"],
    newProduct: "tatum-5-orbit",
    pins: [
      ["Relaxed Sweatshirt", 50, 28],
      ["Tatum 5 Orbit", 48, 58],
      ["Essential T-Shirt", 45, 88],
    ],
  },
  {
    key: "studio-black",
    name: "Studio Day",
    description: "A balance of timeless black and crisp white.",
    model: "model-6-640.webp",
    original: "original-look-6.webp",
    products: ["hoodie-black", "tatum-5-orbit-copy", "tshirt"],
    pins: [
      ["Essential Black Hoodie", 50, 28],
      ["Air Jordan 12 Retro", 48, 58],
      ["Essential T-Shirt", 45, 88],
    ],
  },
  {
    key: "burgundy",
    name: "Burgundy Layers",
    description: "Rich tones. Refined everyday layering.",
    model: "model-3-640.webp",
    original: "original-look-3.webp",
    products: ["sweatshirt", "tatum-5-orbit", "tshirt"],
    pins: [
      ["Premium Sweatshirt", 50, 28],
      ["Tatum 5 Orbit", 48, 58],
      ["Essential T-Shirt", 45, 88],
    ],
  },
  {
    key: "grey-crew",
    name: "Grey Essentials",
    description: "Relaxed silhouettes for a modern wardrobe.",
    model: "model-2-640.webp",
    original: "original-look-2.webp",
    products: ["hoodie", "air-jordan-12-retro-copy", "tshirt"],
    pins: [
      ["Classic Hoodie", 50, 28],
      ["Luka 5", 48, 58],
      ["Essential T-Shirt", 45, 88],
    ],
  },
];

const money = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

function Icon({ name, size = 20 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  const paths = {
    plus: <path d="M12 4v16M4 12h16" />,
    close: <path d="M5 5l14 14M19 5L5 19" />,
    left: <path d="m15 18-6-6 6-6" />,
    right: <path d="m9 18 6-6-6-6" />,
    pause: <path d="M9 5v14M15 5v14" />,
    play: <path d="m8 5 11 7-11 7z" />,
    bag: (
      <path d="M4 8h16l1 16H3L4 8zM8 8V6a4 4 0 0 1 8 0v2" />
    ),
    check: <path d="m4.5 12.5 5 5L19.5 7" />,
  };

  return <svg {...common}>{paths[name] || null}</svg>;
}

export default function TryTheLook() {
  const navigate = useNavigate();
  const shop = useContext(ShopContext);

  const addToCart = shop?.addToCart;

  const cartCount =
    shop?.cartCount ??
    (shop?.cartItems || []).reduce(
      (sum, item) => sum + (Number(item.quantity) || 0),
      0
    );

  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [picker, setPicker] = useState(null);
  const [sizes, setSizes] = useState({});
  const [added, setAdded] = useState({});
  const [hotPin, setHotPin] = useState(null);
  const [message, setMessage] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);

  // Mobile swipe support
  const touchStart = useRef(null);

  const look = LOOKS[index];

  const currentProducts = useMemo(
    () => look.products.map((id) => PRODUCTS[id]),
    [look]
  );

  const go = (next) => {
    setIndex((next + LOOKS.length) % LOOKS.length);
    setPicker(null);
    setPopupOpen(false);
    setHotPin(null);
    setMessage("");
    setAdded({});
  };

  const handleTouchStart = (event) => {
    touchStart.current = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
  };

  const handleTouchEnd = (event) => {
    if (!touchStart.current) return;

    const deltaX =
      event.changedTouches[0].clientX - touchStart.current.x;

    const deltaY =
      event.changedTouches[0].clientY - touchStart.current.y;

    touchStart.current = null;

    // Ignore vertical scrolling and small movements
    if (Math.abs(deltaX) < 50 || Math.abs(deltaX) < Math.abs(deltaY)) {
      return;
    }

    if (deltaX < 0) {
      go(index + 1);
    } else {
      go(index - 1);
    }
  };

  const selectedSize = (product) =>
    sizes[product.id] || product.sizes[0];

  const makeCartProduct = (product, size) => {
    const id = `trythelook-${product.id}`;

    return {
      id,
      name: product.name,
      title: product.name,
      price: Number(product.price),
      new_price: Number(product.price),
      old_price: Number(product.price),
      image: `${ASSET}/${product.image}`,
      img: `${ASSET}/${product.image}`,
      images: [`${ASSET}/${product.image}`],
      category: "clothing",
      brand: "Premium Collection",
      size,
      quantity: 1,
    };
  };

  const addPiece = (product) => {
    const size = selectedSize(product);

    if (typeof addToCart !== "function") {
      setMessage("Your shopping bag is currently unavailable.");
      return;
    }

    try {
      addToCart(
        `trythelook-${product.id}`,
        size,
        makeCartProduct(product, size)
      );

      setAdded((old) => ({
        ...old,
        [product.id]: true,
      }));

      setPicker(null);
      setMessage(`${product.name} has been added to your bag.`);
    } catch (error) {
      console.error("TryTheLook addToCart error:", error);
      setMessage("Unable to add this item. Please try again.");
    }
  };

  const addFullLook = () => {
    if (typeof addToCart !== "function") {
      setMessage("Your shopping bag is currently unavailable.");
      return;
    }

    const pending = currentProducts.filter(
      (product) => !added[product.id]
    );

    if (!pending.length) {
      setMessage("All pieces in this look are already in your bag.");
      return;
    }

    const nextSizes = { ...sizes };

    const missing = pending.find(
      (product) => !nextSizes[product.id]
    );

    if (missing) {
      setPicker(missing.id);
      setMessage(
        `Select a size for ${missing.name} to complete your look.`
      );
      return;
    }

    try {
      pending.forEach((product) => {
        addToCart(
          `trythelook-${product.id}`,
          nextSizes[product.id],
          makeCartProduct(product, nextSizes[product.id])
        );
      });

      setAdded((old) => ({
        ...old,
        ...Object.fromEntries(
          pending.map((product) => [product.id, true])
        ),
      }));

      setMessage("Your complete look has been added to your bag.");
    } catch (error) {
      console.error("TryTheLook full-look error:", error);
      setMessage(
        "Some items could not be added. Please check your shopping bag."
      );
    }
  };

  return (
    <main className="rw-page">
      <header className="rw-header">
        <a className="rw-brand" href="/" aria-label="Home">
          <span className="rw-vendor"></span>
        </a>

        <nav className="rw-nav" aria-label="Main navigation">
          <a href="/">Home</a>
          <a href="/">Shop</a>
          <a href="/collections/all">Collections</a>
          <a href="/try-the-look" aria-current="page">
            Try the Look
          </a>
        </nav>

        <button
          className="rw-header-bag"
          type="button"
          onClick={() => navigate("/cart")}
          aria-label={`Open shopping bag, ${cartCount} items`}
        >
          <Icon name="bag" size={24} />
          <span>{cartCount}</span>
        </button>
      </header>

      <section className="rw" id="try-the-look">
        <div className="rw-grid">
          <div className="rw-left">
            <div className="rw-head">
              <div className="rw-intro">
                <h1>Try the Look.</h1>
                <p>
                  Discover six curated looks. Select a piece to explore
                  the collection.
                </p>
              </div>
            </div>

            <div
              className="rw-stage"
              role="region"
              aria-roledescription="carousel"
              aria-label="Try the Look carousel. Swipe to explore."
              tabIndex={0}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") go(index + 1);
                if (event.key === "ArrowLeft") go(index - 1);
              }}
            >
              <div className="rw-ring" aria-hidden="true">
                {LOOKS.map((item, i) => {
                  const delta = (i - index + 6) % 6;
                  const signed = delta > 3 ? delta - 6 : delta;
                  const angle = (signed * 30 * Math.PI) / 180;
                  const x = 50 + Math.sin(angle) * 42;
                  const y = 3 + (1 - Math.cos(angle)) * 22;

                  return (
                    <div
                      className={`rw-ring-model ${
                        i === index ? "is-active" : ""
                      }`}
                      key={item.key}
                      style={{
                        "--x": `${x}%`,
                        "--y": `${y}%`,
                        "--scale": 1 / (1 + Math.abs(signed) * 0.12),
                        "--blur": `${Math.min(
                          Math.abs(signed) * 1.4,
                          6
                        )}px`,
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
                    key={`${look.key}-${i}`}
                    className={`rw-pin ${
                      hotPin === i ? "is-hot" : ""
                    }`}
                    style={{
                      left: `${left}%`,
                      top: `${top}%`,
                    }}
                    data-tip={name}
                    aria-label={`Show ${name}`}
                    onClick={() => {
                      setHotPin(i);
                      setPicker(currentProducts[i]?.id || null);
                    }}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  className="rw-model-view"
                  type="button"
                  aria-label={`View ${look.name}`}
                  onClick={() => setPopupOpen(true)}
                />
              </div>

              <div className="rw-walk" aria-hidden="true">
                <span
                  style={{
                    width: `${((index + 1) / LOOKS.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="rw-controls">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous look"
              >
                <Icon name="left" />
              </button>

              <div className="rw-ticks" aria-label="Choose a look">
                {LOOKS.map((item, i) => (
                  <button
                    type="button"
                    key={item.key}
                    className={
                      i === index
                        ? "is-current"
                        : i < index
                        ? "is-past"
                        : ""
                    }
                    aria-current={
                      i === index ? "true" : undefined
                    }
                    aria-label={`Look ${i + 1}: ${item.name}`}
                    onClick={() => go(i)}
                  >
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <i />
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next look"
              >
                <Icon name="right" />
              </button>

              <button
                type="button"
                className="rw-play"
                onClick={() => setPlaying((value) => !value)}
                aria-label={playing ? "Pause autoplay" : "Play autoplay"}
                aria-pressed={playing}
              >
                <Icon name={playing ? "pause" : "play"} />
              </button>
            </div>

            <p className="rw-swipe-hint">
              Swipe to discover more looks
            </p>
          </div>

          <aside className="rw-panel">
            <div className="rw-panel-inner">
              <div className="rw-panel-head">
                <span>
                  Look {String(index + 1).padStart(2, "0")} / 06
                </span>
                <h2>{look.name}</h2>
                <p>{look.description}</p>
              </div>

              <div className="rw-mobile-head">
                <h2>{look.name}</h2>
                <span>3 pieces</span>
              </div>

              <div className="rw-items">
                {currentProducts.map((product, i) => (
                  <article
                    className={`rw-item ${
                      picker === product.id ? "is-picking" : ""
                    } ${added[product.id] ? "is-added" : ""} ${
                      hotPin === i ? "is-hot" : ""
                    }`}
                    key={`${look.key}-${product.id}`}
                    onMouseEnter={() => setHotPin(i)}
                    onMouseLeave={() => setHotPin(null)}
                  >
                    <div className="rw-media">
                      <img
                        src={`${ASSET}/${product.image}`}
                        alt={product.name}
                        loading="lazy"
                        width="400"
                        height="500"
                      />
                      <span className="rw-number">{i + 1}</span>
                      {look.newProduct === product.id && (
                        <span className="rw-tag">New</span>
                      )}
                    </div>

                    <div className="rw-info">
                      <span className="rw-vendor">THE EDIT</span>
                      <span className="rw-product-name">
                        {product.name}
                      </span>
                      <span className="rw-price">
                        {money(product.price)}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="rw-add"
                      aria-label={`Choose size for ${product.name}`}
                      aria-expanded={picker === product.id}
                      onClick={() =>
                        setPicker(
                          picker === product.id ? null : product.id
                        )
                      }
                    >
                      {added[product.id] ? (
                        <Icon name="check" />
                      ) : (
                        <Icon name="plus" />
                      )}
                    </button>

                    {picker === product.id && (
                      <div
                        className="rw-picker"
                        id={`rw-picker-${product.id}`}
                      >
                        <div className="rw-picker-head">
                          <img
                            src={`${ASSET}/${product.image}`}
                            alt=""
                          />

                          <div>
                            <strong>{product.name}</strong>
                            <span>{money(product.price)}</span>
                          </div>

                          <button
                            type="button"
                            onClick={() => setPicker(null)}
                            aria-label="Close size picker"
                          >
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
                                  checked={selectedSize(product) === size}
                                  onChange={() =>
                                    setSizes((old) => ({
                                      ...old,
                                      [product.id]: size,
                                    }))
                                  }
                                />
                                <span>{size}</span>
                              </label>
                            ))}
                          </div>
                        </fieldset>

                        <button
                          type="button"
                          className="rw-confirm"
                          onClick={() => addPiece(product)}
                        >
                          {added[product.id]
                            ? "Add another"
                            : "Add to bag"}
                        </button>
                      </div>
                    )}
                  </article>
                ))}
              </div>

              <div className="rw-bundle">
                <p
                  className="rw-message"
                  role="status"
                  aria-live="polite"
                >
                  {message}
                </p>

                <div className="rw-bundle-row">
                  <div>
                    <strong>Complete the look</strong>
                    <span>Three pieces. One complete look.</span>
                  </div>

                  <div className="rw-bundle-price">
                    <strong>
                      {money(
                        currentProducts.reduce(
                          (sum, product) => sum + product.price,
                          0
                        )
                      )}
                    </strong>
                  </div>
                </div>

                <button
                  type="button"
                  className="rw-cta"
                  onClick={addFullLook}
                >
                  <span className="rw-cta-desktop">
                    Shop the complete look
                  </span>
                  <span className="rw-cta-mobile">
                    Shop the look
                  </span>
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
            if (event.target === event.currentTarget) {
              setPopupOpen(false);
            }
          }}
        >
          <div className="rw-lightbox-top">
            <div>
              <span>
                LOOK {String(index + 1).padStart(2, "0")}
              </span>
              <strong>{look.name}</strong>
            </div>

            <button
              type="button"
              onClick={() => setPopupOpen(false)}
              aria-label="Close"
            >
              <Icon name="close" />
            </button>
          </div>

          <div className="rw-lightbox-model">
            <img
              src={`${ASSET}/${look.original}`}
              alt={look.name}
            />

            {look.pins.map(([name, left, top], i) => (
              <button
                type="button"
                key={`${name}-${i}`}
                className="rw-pin"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                }}
                data-tip={name}
                onClick={() => {
                  setPopupOpen(false);
                  setHotPin(i);
                  setPicker(currentProducts[i]?.id || null);
                }}
                aria-label={`Choose ${name}`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <p className="rw-lightbox-hint">
            Select a dot to explore the piece
          </p>
        </div>
      )}
    </main>
  );
}
