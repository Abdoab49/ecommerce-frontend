import React, { useRef } from "react";
import styles from "./NikeLanada.module.css";

// Real retailer/Nike product photography. Keep the image URLs as HTTPS.
const collections = [
  {
    id: "white-edit",
    name: "Nike Park Football Kit",
    category: "Football · Teamwear",
    image: "https://thumblr.uniid.it/product/98421/71f4cb5f26ba.jpg?format=webp&q=85&width=1600",
    fallback: "https://thumblr.uniid.it/product/98421/71f4cb5f26ba.jpg",
    alt: "Real Nike Park white football shirt, shorts and socks product photo",
    href: "https://www.unisportstore.com/football-equipment/nike-park-football-kit-whitewhitewhite/98421/",
  },
  {
    id: "navy-edit",
    name: "Nike Dri-FIT Academy Jacket",
    category: "Training · Outerwear",
    image: "https://imgnike-a.akamaihd.net/1300x1300/02228515A5.jpg",
    fallback: "https://imgnike-a.akamaihd.net/1300x1300/02228515A5.jpg",
    alt: "Real Nike Dri-FIT Academy navy training jacket product photo",
    href: "https://www.nike.com.br/jaqueta-nike-dri-fit-academy-masculina--022285.html",
  },
  {
    id: "blue-edit",
    name: "Nike Park Blue Football Kit",
    category: "Football · Teamwear",
    image: "https://thumblr.uniid.it/product/98416/ac7629124801.jpg?format=webp&q=85&width=1600",
    fallback: "https://thumblr.uniid.it/product/98416/ac7629124801.jpg",
    alt: "Real Nike Park blue and white football shirt, shorts and socks product photo",
    href: "https://www.unisportstore.nl/voetbalaccessoires/nike-park-voetbaltenue-blauwwitblauw/98416/",
  },
  {
    id: "red-edit",
    name: "Nike Precision III Football Kit",
    category: "Football · Teamwear",
    image: "https://thumblr.uniid.it/product/138225/726271e810bc.jpg",
    fallback: "https://thumblr.uniid.it/product/138225/726271e810bc.jpg",
    alt: "Real Nike Precision III red and black football shirt and shorts product photo",
    href: "https://www.unisportstore.com/football-equipment/nike-precision-iii-kit-university-redblack/138225/",
  },
];

function ProductCard({ item }) {
  const handleImageError = (event) => {
    const img = event.currentTarget;
    if (img.dataset.fallbackTried !== "true" && item.fallback && img.src !== item.fallback) {
      img.dataset.fallbackTried = "true";
      img.src = item.fallback;
    } else {
      img.style.visibility = "hidden";
      img.parentElement.classList.add(styles.imageUnavailable);
    }
  };

  return (
    <article className={styles.card}>
      <a className={styles.imageLink} href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`View ${item.name}`}>
        <div className={styles.imageStage}>
          <img className={styles.productImage} src={item.image} alt={item.alt} loading="lazy" onError={handleImageError} />
          <span className={styles.imageFallbackText} aria-hidden="true">PRODUCT IMAGE</span>
          <span className={styles.quickView} aria-hidden="true">↗</span>
        </div>
      </a>
      <div className={styles.cardInfo}>
        <div className={styles.productCategory}>{item.category}</div>
        <h2>{item.name}</h2>
        <a className={styles.productLink} href={item.href} target="_blank" rel="noopener noreferrer">Shop now <span>↗</span></a>
      </div>
    </article>
  );
}

export default function NikeLanada() {
  const railRef = useRef(null);
  const move = (direction) => {
    if (!railRef.current) return;
    const card = railRef.current.querySelector("article");
    const amount = card ? card.getBoundingClientRect().width + 18 : railRef.current.clientWidth * 0.8;
    railRef.current.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>NEXTPLAY — FOOTBALL COLLECTION</p>
          <h1>Complete the Look</h1>
        </div>
        <div className={styles.controls}>
          <button type="button" onClick={() => move(-1)} aria-label="Previous products">←</button>
          <button type="button" onClick={() => move(1)} aria-label="Next products">→</button>
        </div>
      </header>

      <section className={styles.rail} ref={railRef} aria-label="Complete the look products">
        {collections.map((item) => <ProductCard key={item.id} item={item} />)}
      </section>
      <div className={styles.bottomLine}>
        <span>BUILT FOR THE GAME</span>
        <span>01 — 04</span>
      </div>
    </main>
  );
}
