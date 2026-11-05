import React, { useRef } from "react";
import styles from "./NikeLanada.module.css";

const collections = [
  { club: "REAL MADRID", season: "2025 / 26", badge: "RM", theme: "white", pieces: ["Home jersey", "Training jacket", "Shorts", "Socks", "Football boots"], description: "The classic white look, from match day to training day." },
  { club: "FC BARCELONA", season: "2025 / 26", badge: "FCB", theme: "blue", pieces: ["Home jersey", "Track jacket", "Training pants", "Socks", "Football boots"], description: "A bold blaugrana-inspired collection for every supporter." },
  { club: "PARIS SAINT-GERMAIN", season: "2025 / 26", badge: "PSG", theme: "navy", pieces: ["Match jersey", "Zip jacket", "Shorts", "Socks", "Football boots"], description: "A clean Paris-inspired mix of performance and streetwear." }
];

function ClubCard({ item }) {
  return (
    <article className={`${styles.card} ${styles[item.theme]}`}>
      <div className={styles.cardTop}>
        <span className={styles.clubBadge}>{item.badge}</span>
        <span className={styles.season}>{item.season}</span>
      </div>
      <div className={styles.visual}>
        <div className={styles.outfit}>
          <div className={styles.jersey}><span>{item.badge}</span></div>
          <div className={styles.jacket}><span>{item.badge}</span></div>
          <div className={styles.shorts}></div>
          <div className={styles.socks}></div>
          <div className={styles.boots}></div>
        </div>
        <div className={styles.clubWatermark}>{item.badge}</div>
        <div className={styles.productLabels}>
          {item.pieces.map(piece => <span key={piece}>{piece}</span>)}
        </div>
      </div>
      <div className={styles.cardInfo}>
        <div><h3>{item.club}</h3><p>{item.description}</p></div>
        <button className={styles.lookButton} type="button">◉ &nbsp; Discover the look &nbsp; ↗</button>
      </div>
    </article>
  );
}

export default function Style() {
  const railRef = useRef(null);
  const move = direction => railRef.current?.scrollBy({ left: direction * railRef.current.clientWidth * .82, behavior: "smooth" });

  return (
    <main className={styles.page}>
      <section className={styles.heroHeading}>
        <div>
          <span className={styles.eyebrow}>NEXTPLAY / FOOTBALL CULTURE</span>
          <h1>Get the <span>Look.</span></h1>
          <p>Discover the style of the biggest football clubs.</p>
        </div>
        <div className={styles.controls}>
          <button type="button" onClick={() => move(-1)} aria-label="Previous collections">‹</button>
          <button type="button" onClick={() => move(1)} aria-label="Next collections">›</button>
        </div>
      </section>
      <section className={styles.collectionRail} ref={railRef} aria-label="Club style collections">
        {collections.map(item => <ClubCard key={item.club} item={item} />)}
      </section>
      <section className={styles.bottomBanner}>
        <div className={styles.bannerText}>
          <span>MORE THAN A GAME</span>
          <h2>NEXT<span>PLAY</span></h2>
          <p>Football news. Football culture. Football style.</p>
        </div>
        <div className={styles.bannerMark}>NP</div>
      </section>
    </main>
  );
}