
import React, { useCallback, useEffect, useRef, useState } from "react";
import "./3d-curved-carousel.css";

const ASSETS = "https://reel-ref-try-the-look.vercel.app/assets/";

const LOOKS = [
  {
    id: 1,
    name: "Look 01",
    image: `${ASSETS}look-1.jpg`,
    products: [
      { name: "Nike Sportswear", price: "$110", image: `${ASSETS}product-1.jpg`, sizes: ["XS", "S", "M", "L", "XL"] },
      { name: "Nike Sneakers", price: "$120", image: `${ASSETS}product-2.jpg`, sizes: ["40", "41", "42", "43", "44"] }
    ]
  },
  {
    id: 2,
    name: "Look 02",
    image: `${ASSETS}look-2.jpg`,
    products: [
      { name: "Nike Jacket", price: "$130", image: `${ASSETS}product-3.jpg`, sizes: ["S", "M", "L", "XL"] },
      { name: "Nike Shoes", price: "$115", image: `${ASSETS}product-4.jpg`, sizes: ["40", "41", "42", "43", "44"] }
    ]
  },
  {
    id: 3,
    name: "Look 03",
    image: `${ASSETS}look-3.jpg`,
    products: [
      { name: "Nike Hoodie", price: "$95", image: `${ASSETS}product-5.jpg`, sizes: ["S", "M", "L", "XL"] },
      { name: "Nike Air", price: "$140", image: `${ASSETS}product-6.jpg`, sizes: ["40", "41", "42", "43", "44"] }
    ]
  },
  {
    id: 4,
    name: "Look 04",
    image: `${ASSETS}look-4.jpg`,
    products: [
      { name: "Nike Tracksuit", price: "$125", image: `${ASSETS}product-7.jpg`, sizes: ["S", "M", "L", "XL"] },
      { name: "Nike Trainers", price: "$105", image: `${ASSETS}product-8.jpg`, sizes: ["40", "41", "42", "43", "44"] }
    ]
  },
  {
    id: 5,
    name: "Look 05",
    image: `${ASSETS}look-5.jpg`,
    products: [
      { name: "Nike Top", price: "$75", image: `${ASSETS}product-9.jpg`, sizes: ["XS", "S", "M", "L"] },
      { name: "Nike Shoes", price: "$135", image: `${ASSETS}product-10.jpg`, sizes: ["40", "41", "42", "43", "44"] }
    ]
  },
  {
    id: 6,
    name: "Look 06",
    image: `${ASSETS}look-6.jpg`,
    products: [
      { name: "Nike Outfit", price: "$115", image: `${ASSETS}product-11.jpg`, sizes: ["S", "M", "L", "XL"] },
      { name: "Nike Sneakers", price: "$125", image: `${ASSETS}product-12.jpg`, sizes: ["40", "41", "42", "43", "44"] }
    ]
  }
];

export default function CurvedLensCarousel({ onAddToCart }) {
  const [active, setActive] = useState(0);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [bag, setBag] = useState([]);
  const [showLook, setShowLook] = useState(false);
  const [paused, setPaused] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [activePin, setActivePin] = useState(null);
  const [mobile, setMobile] = useState(false);
  const timer = useRef(null);

  const currentLook = LOOKS[active];

  const next = useCallback(() => {
    setActive((value) => (value + 1) % LOOKS.length);
  }, []);

  const previous = useCallback(() => {
    setActive((value) => (value - 1 + LOOKS.length) % LOOKS.length);
  }, []);

  useEffect(() => {
    const checkMobile = () => setMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (paused || showLook || dragStart !== null) return;

    timer.current = window.setInterval(next, 5000);
    return () => window.clearInterval(timer.current);
  }, [paused, showLook, dragStart, next]);

  const selectSize = (productIndex, size) => {
    setSelectedSizes((previousSizes) => ({
      ...previousSizes,
      [`${active}-${productIndex}`]: size
    }));
  };

  const addProduct = (product, productIndex) => {
    const size = selectedSizes[`${active}-${productIndex}`];

    if (!size) {
      alert("Please select a size first.");
      return;
    }

    const item = {
      ...product,
      size,
      look: currentLook.name,
      id: `${active}-${productIndex}-${Date.now()}`
    };

    setBag((previousBag) => [...previousBag, item]);

    if (onAddToCart) onAddToCart(item);
  };

  const handlePointerDown = (event) => {
    setPaused(true);
    setDragStart(event.clientX);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (dragStart === null) return;
    setDragOffset(event.clientX - dragStart);
  };

  const handlePointerUp = () => {
    if (dragStart === null) return;

    if (dragOffset < -55) next();
    if (dragOffset > 55) previous();

    setDragStart(null);
    setDragOffset(0);
    setPaused(false);
  };

  const getPosition = (index) => {
    let difference = index - active;

    if (difference > LOOKS.length / 2) difference -= LOOKS.length;
    if (difference < -LOOKS.length / 2) difference += LOOKS.length;

    return difference;
  };

  return (
    <section className="clc-section">
      <header className="clc-header">
        <div>
          <span className="clc-eyebrow">NIKE STYLE EXPERIENCE</span>
          <h2>TRY THE LOOK<span>.</span></h2>
          <p>Discover the looks. Find your style.</p>
        </div>

        <div className="clc-counter">
          <strong>{String(active + 1).padStart(2, "0")}</strong>
          <span>/ {String(LOOKS.length).padStart(2, "0")}</span>
        </div>
      </header>

      <div className="clc-layout">
        <div className="clc-stage">
          <div
            className={`clc-ring ${dragStart !== null ? "is-dragging" : ""}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {LOOKS.map((look, index) => {
              const position = getPosition(index);
              const isActive = position === 0;

              return (
                <button
                  type="button"
                  key={look.id}
                  className={`clc-slide ${isActive ? "is-active" : ""}`}
                  style={{
                    "--position": position,
                    "--drag": `${dragOffset}px`,
                    zIndex: 20 - Math.abs(position)
                  }}
                  onClick={() => {
                    if (!isActive) setActive(index);
                  }}
                  aria-label={`Show ${look.name}`}
                >
                  <img src={look.image} alt={look.name} draggable="false" />
                  <span className="clc-slide-label">{look.name}</span>
                </button>
              );
            })}
          </div>

          <div className="clc-controls">
            <button type="button" onClick={previous} aria-label="Previous look">
              ←
            </button>

            <div className="clc-dots">
              {LOOKS.map((look, index) => (
                <button
                  key={look.id}
                  type="button"
                  className={index === active ? "active" : ""}
                  onClick={() => setActive(index)}
                  aria-label={`Go to look ${index + 1}`}
                />
              ))}
            </div>

            <button type="button" onClick={next} aria-label="Next look">
              →
            </button>
          </div>

          <button
            type="button"
            className="clc-view-look"
            onClick={() => setShowLook(true)}
          >
            VIEW LOOK
            <span>↗</span>
          </button>
        </div>

        <aside className="clc-products">
          <div className="clc-products-heading">
            <div>
              <span>THE COLLECTION</span>
              <h3>In this look</h3>
            </div>
            <span className="clc-product-count">
              {currentLook.products.length} ITEMS
            </span>
          </div>

          {currentLook.products.map((product, index) => (
            <article className="clc-product" key={`${active}-${product.name}`}>
              <div className="clc-product-image">
                <img src={product.image} alt={product.name} />
              </div>

              <div className="clc-product-info">
                <h4>{product.name}</h4>
                <p>{product.price}</p>

                <div className="clc-sizes">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={
                        selectedSizes[`${active}-${index}`] === size
                          ? "selected"
                          : ""
                      }
                      onClick={() => selectSize(index, size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  className="clc-add"
                  onClick={() => addProduct(product, index)}
                >
                  ADD TO BAG <span>+</span>
                </button>
              </div>
            </article>
          ))}

          <div className="clc-bag">
            <div>
              <span>YOUR STYLING BAG</span>
              <strong>{bag.length} ITEMS</strong>
            </div>

            {bag.length > 0 && (
              <div className="clc-bag-items">
                {bag.map((item) => (
                  <div key={item.id}>
                    <span>{item.name} · {item.size}</span>
                    <strong>{item.price}</strong>
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>
      </div>

      {showLook && (
        <div className="clc-modal-backdrop" onClick={() => setShowLook(false)}>
          <div
            className="clc-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="clc-modal-close"
              type="button"
              onClick={() => setShowLook(false)}
              aria-label="Close"
            >
              ×
            </button>

            <div className="clc-modal-image">
              <img src={currentLook.image} alt={currentLook.name} />

              {currentLook.products.map((product, index) => (
                <button
                  key={product.name}
                  type="button"
                  className={`clc-pin clc-pin-${index + 1}`}
                  onClick={() => setActivePin(activePin === index ? null : index)}
                  aria-label={`Show ${product.name}`}
                >
                  +
                </button>
              ))}
            </div>

            <div className="clc-modal-info">
              <span>NIKE · THE LOOK</span>
              <h3>{currentLook.name}</h3>
              <p>Explore the pieces that make this look.</p>

              {currentLook.products.map((product, index) => (
                <div className="clc-modal-product" key={product.name}>
                  <img src={product.image} alt={product.name} />
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setShowLook(false);
                      document.querySelector(".clc-products")?.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                      });
                    }}
                  >
                    VIEW
                  </button>
                </div>
              ))}

              {activePin !== null && (
                <p className="clc-pin-description">
                  {currentLook.products[activePin]?.name}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
