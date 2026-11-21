
import React from 'react';
import './Hero.css';

const Hero = ({
  banner = 'LANADA',
  image = '/Assets/hero-image.jpg',
  imageAlt = 'Fashion collection',
  headline = 'CREATIVE DEVELOPER BASED IN AMSTERDAM, NL.',
}) => {
  return (
    <header className="hero">

      <div className="hero__banner">
        <h1 className="hero__banner-text">{banner}</h1>
      </div>

      <div className="hero__intro">

        <div className="hero__intro-left">
          <figure className="hero__frame">
            <img
              className="hero__image"
              src={image}
              alt={imageAlt}
            />
          </figure>
        </div>

        <div className="hero__intro-right">
          <h2 className="hero__headline">
            {headline}
          </h2>
        </div>

      </div>

    </header>
  );
};

export default Hero;
