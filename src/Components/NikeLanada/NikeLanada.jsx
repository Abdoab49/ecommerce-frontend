import React, { useRef } from "react";
import styles from "./NikeLanada.module.css";

const collections = [
  {
    id: "white-edit",
    name: "THE WHITE EDIT",
    season: "FOOTBALL TEAMWEAR",
    tag: "COMPLETE THE LOOK",
    description: "A clean match-day combination with jersey, shorts and socks.",
    image: "https://via.placeholder.com/600x800?text=White+Kit",
    imageAlt: "White football kit with shorts and socks",
    productName: "Nike Park VII Football Kit",
    productUrl: "#",
    priceLabel: "View product"
  },
  {
    id: "navy-edit",
    name: "THE NAVY EDIT",
    season: "TRAINING COLLECTION",
    tag: "TRAINING ESSENTIAL",
    description: "A navy training layer designed for warm-ups and everyday wear.",
    image: "https://via.placeholder.com/600x800?text=Navy+Jacket",
    imageAlt: "Navy football training track jacket",
    productName: "Nike Academy 25 Track Jacket",
    productUrl: "#",
    priceLabel: "View product"
  },
  {
    id: "blue-edit",
    name: "THE BLUE EDIT",
    season: "FOOTBALL TEAMWEAR",
    tag: "MATCH DAY SET",
    description: "A white and blue football kit with matching shorts and socks.",
    image: "https://via.placeholder.com/600x800?text=Blue+Kit",
    imageAlt: "Blue and white football kit",
    productName: "Nike Dri-FIT Academy Kit",
    productUrl: "#",
    priceLabel: "View product"
  },
  {
    id: "red-edit",
    name: "THE RED EDIT",
    season: "FOOTBALL TEAMWEAR",
    tag: "MATCH DAY SET",
    description: "A bold red and black football kit for a standout look.",
    image: "https://via.placeholder.com/600x800?text=Red+Kit",
    imageAlt: "Red and black football kit",
    productName: "Nike Tiempo Premier II Kit",
    productUrl: "#",
    priceLabel: "View product"
  }
];

function ProductCard({ item }) {
  return (
    <article className={styles.card}>
      <a
        className={styles.imageLink}
        href={item.productUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`View ${item.productName}`}
      >
        <div className={styles.imageStage}>
          <span className={styles.productTag}>{item.tag}</span>
          <img
            className={styles.productImage}
            src={item.image}
            alt={item.imageAlt}
            loading="lazy"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/600x800?text=Image+Not+Found";
            }}
          />
          <span className={styles.viewIcon} aria-hidden="true">↗</span>
        </div>
      </a>

      <div className={styles.cardDetails}>
        <div className={styles.productMeta}>
          <span>{item.season}</span>
          <span>NIKE TEAMWEAR</span>
        </div>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <div className={styles.cardBottom}>
          <strong>{item.productName}</strong>
          <a href={item.productUrl} target="_blank" rel="noreferrer">
            {item.priceLabel} <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </article>
  );
}

export default function NikeLanada() {
  const railRef = useRef(null);

  const scrollRail = (direction) => {
    if (!railRef.current) return;
    railRef.current.scrollBy({
      left: direction * railRef.current.clientWidth * 0.8,
      behavior: "smooth"
    });
  };

  return (
    <main className={styles.page}>
      <header className={styles.sectionHeader}>
        <div className={styles.headingCopy}>
          <span className={styles.kicker}>NEXTPLAY / FOOTBALL STYLE</span>
          <h1>Complete the <span>Look</span></h1>
          <p>Discover real football teamwear and build your match-day style.</p>
        </div>

        <div className={styles.sliderControls}>
          <button type="button" onClick={() => scrollRail(-1)} aria-label="Previous products">
            ‹
          </button>
          <button type="button" onClick={() => scrollRail(1)} aria-label="Next products">
            ›
          </button>
        </div>
      </header>

      <section className={styles.productRail} ref={railRef} aria-label="Football style products">
        {collections.map((item) => <ProductCard key={item.id} item={item} />)}
      </section>

      <footer className={styles.styleFooter}>
        <div>
          <span className={styles.footerEyebrow}>FOOTBALL IS A LIFESTYLE</span>
          <h2>MAKE YOUR <span>MOVE.</span></h2>
          <p>Discover the gear. Own the moment.</p>
        </div>
        <span className={styles.footerMonogram}>NP</span>
      </footer>

      <p className={styles.disclaimer}>
        Product photos and product links belong to their respective retailers. Product availability and images may change.
      </p>
    </main>
  );
}