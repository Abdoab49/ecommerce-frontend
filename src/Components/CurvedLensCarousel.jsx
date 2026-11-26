
import React, { useState } from "react";
import "./3d-curved-carousel.css";

const defaultSlides = [
  {
    title: "URBAN ESSENTIALS",
    subtitle: "THE NEW COLLECTION",
    description: "Everyday pieces. Elevated.",
    image:
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "STREET CULTURE",
    subtitle: "STYLE YOUR WAY",
    description: "Made for the streets.",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "THE NEW SEASON",
    subtitle: "FRESH ARRIVALS",
    description: "Discover your next look.",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "MODERN CLASSICS",
    subtitle: "LESS BUT BETTER",
    description: "Timeless. Effortless. You.",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "MOVE DIFFERENT",
    subtitle: "EXPLORE THE DROP",
    description: "Find your own rhythm.",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85",
  },
];

const CurvedLensCarousel = ({ slides = defaultSlides }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const total = slides.length;

  if (!total) return null;

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const getPosition = (index) => {
    let diff = index - activeIndex;

    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    return diff;
  };

  return (
    <section className="clc-section">
      <div className="clc-header">
        <div>
          <span className="clc-eyebrow">DISCOVER THE COLLECTION</span>
          <h2 className="clc-heading">
            YOUR STYLE.
            <br />
            YOUR STORY.
          </h2>
        </div>

        <p className="clc-header-description">
          Discover pieces that make every moment yours.
        </p>
      </div>

      <div className="clc-carousel">
        <div className="clc-stage">
          {slides.map((slide, index) => {
            const position = getPosition(index);
            const isActive = position === 0;

            if (Math.abs(position) > 2) return null;

            return (
              <article
                key={index}
                className={`clc-card ${
                  isActive ? "clc-card-active" : ""
                }`}
                style={{
                  "--position": position,
                  "--distance": Math.abs(position),
                  zIndex: 10 - Math.abs(position),
                }}
                onClick={() => setActiveIndex(index)}
              >
                <div className="clc-image-wrap">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="clc-image"
                    loading="lazy"
                  />

                  <div className="clc-image-overlay" />

                  <div className="clc-card-content">
                    <span className="clc-card-subtitle">
                      {slide.subtitle}
                    </span>

                    <h3>{slide.title}</h3>

                    <p>{slide.description}</p>

                    <a
                      href="/"
                      className="clc-discover"
                      onClick={(e) => e.stopPropagation()}
                    >
                      DISCOVER
                      <span>↗</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="clc-controls">
          <button
            type="button"
            className="clc-arrow"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            ←
          </button>

          <div className="clc-pagination">
            <span className="clc-current">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>

            <span className="clc-pagination-line" />

            <span className="clc-total">
              {String(total).padStart(2, "0")}
            </span>
          </div>

          <button
            type="button"
            className="clc-arrow"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
};

export default CurvedLensCarousel;
