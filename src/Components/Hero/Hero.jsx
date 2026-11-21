
import React from 'react';
import './Hero.css';

const Hero = ({
  banner = 'LANADA',
  image = '/Assets/hero-image.jpg',
  imageAlt = 'Editorial fashion portrait',
  headline = 'CREATIVE DEVELOPER BASED IN AMSTERDAM, NL.',
  linkHref = '#popular',
  linkLabel = 'DISCOVER THE COLLECTION',
}) => {
  return (
    <header className="hero">

      {/* Main Editorial Banner */}
      <div className="hero__banner">
        <h1 className="hero__banner-text">{banner}</h1>
      </div>

      {/* Editorial Introduction */}
      <div className="hero__intro">

        <div className="hero__intro-left">
          <figure className="hero__frame">
            <img
              className="hero__image"
              src={image}
              alt={imageAlt}
            />
          </figure>

          <a className="hero__link" href={linkHref}>
            {linkLabel}
            <span aria-hidden="true"> ↗</span>
          </a>
        </div>

        <div className="hero__intro-right">
          <p className="hero__eyebrow">
            INDEPENDENT CREATIVE STUDIO
          </p>

          <h2 className="hero__headline">
            {headline}
          </h2>

          <p className="hero__description">
            A creative vision shaped by modern culture,
            timeless design and attention to every detail.
          </p>
        </div>

      </div>
    </header>
  );
};

export default Hero;
