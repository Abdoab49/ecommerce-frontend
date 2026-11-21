
import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-inner">

        <div className="hero-top">
          <span className="hero-index">01 / NEW SEASON</span>
          <span className="hero-edition">LANADA — STUDIO COLLECTION 2026</span>
        </div>

        <div className="hero-content">
          <div className="hero-copy">
            <span className="hero-label">
              FASHION IS AN ATTITUDE
            </span>

            <h1 className="hero-title">
              DRESS
              <br />
              <span className="hero-title-pink">YOUR</span>
              <br />
              <span className="hero-title-echo">OWN</span>
              STORY<span className="hero-dot">.</span>
            </h1>

            <div className="hero-bottom">
              <p className="hero-description">
                More than what you wear.
                <br />
                It's how you express who you are.
              </p>

              <a href="#popular" className="hero-link">
                EXPLORE THE COLLECTION
                <span className="hero-link-arrow">↗</span>
              </a>
            </div>
          </div>

          <div className="hero-side">
            <span className="hero-side-number">L.</span>
            <span className="hero-side-text">
              STYLE
              <br />
              HAS NO
              <br />
              RULES.
            </span>
            <span className="hero-side-caption">
              EST. FOR THE BOLD
            </span>
          </div>
        </div>

        <div className="hero-footer">
          <span>DESIGNED TO BE DIFFERENT</span>
          <span className="hero-footer-center">LANADA®</span>
          <span>SCROLL TO DISCOVER ↓</span>
        </div>

      </div>
    </section>
  );
};

export default Hero;
