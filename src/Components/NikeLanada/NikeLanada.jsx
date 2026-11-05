import React, { useRef } from "react";
import styles from "./NikeLanada.module.css";

const collections = [
  {
    id: "white-edit",
    name: "THE WHITE EDIT",
    season: "FOOTBALL TEAMWEAR",
    tag: "COMPLETE THE LOOK",
    description: "A clean match-day combination with jersey, shorts and socks.",
    image: "https://fabrykafutbolu.net/34303-large_default/komplet-nike-park-vii-set-410.jpg",
    imageAlt: "Nike white football shirt with navy shorts and matching socks",
    productName: "Nike Park VII Football Kit",
    productUrl: "https://fabrykafutbolu.net/komplety-pilkarskie/9266-168039-komplet-nike-park-vii-set-410.html",
    priceLabel: "View product"
  },
  {
    id: "navy-edit",
    name: "THE NAVY EDIT",
    season: "TRAINING COLLECTION",
    tag: "TRAINING ESSENTIAL",
    description: "A navy training layer designed for warm-ups and everyday wear.",
    image: "https://images.prodirectsport.com/ProductImages/Main/1028057_Main_1933947.jpeg",
    imageAlt: "Nike Academy navy football training track jacket",
    productName: "Nike Academy 25 Track Jacket",
    productUrl: "https://www.prodirectsport.de/p/nike-academy-25-knitted-track-jacket-midnight-navy-royal-blue-white-mens-football-teamwear-1028057/",
    priceLabel: "View product"
  },
  {
    id: "blue-edit",
    name: "THE BLUE EDIT",
    season: "FOOTBALL TEAMWEAR",
    tag: "MATCH DAY SET",
    description: "A white and blue football kit with matching shorts and socks.",
    image: "https://fabrykafutbolu.net/62588-large_default/stroj-pilkarski-nike-dri-fit-academy-bialy-niebieski.jpg",
    imageAlt: "Nike white and blue football shirt with blue shorts and white socks",
    productName: "Nike Dri-FIT Academy Kit",
    productUrl: "https://fabrykafutbolu.net/komplety-pilkarskie/13100-274316-stroj-pilkarski-nike-dri-fit-academy-bialy-niebieski.html",
    priceLabel: "View product"
  },
  {
    id: "red-edit",
    name: "THE RED EDIT",
    season: "FOOTBALL TEAMWEAR",
    tag: "MATCH DAY SET",
    description: "A bold red and black football kit for a standout look.",
    image: "https://fabrykafutbolu.net/62458-large_default/stroj-pilkarski-nike-tiempo-premier-ii-pomaranczowy-czarny.jpg",
    imageAlt: "Nike orange and black football shirt with shorts and socks",
    productName: "Nike Tiempo Premier II Kit",
    productUrl: "https://fabrykafutbolu.net/komplety-pilkarskie/13083-271906-stroj-pilkarski-nike-tiempo-premier-ii-pomaranczowy-czarny.html",
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
        These are Nike teamwear products, not official Real Madrid, Barcelona or PSG club kits.
      </p>
    </main>
  );
}
