
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = ({
  logoSrc = "",
  onNewsletterSubmit,
}) => {
  const [email, setEmail] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const [newsletterLoading, setNewsletterLoading] = useState(false);

  const currentYear = new Date().getFullYear();

  const handleNewsletter = async (event) => {
    event.preventDefault();

    if (!email.trim()) return;

    if (!onNewsletterSubmit) {
      setNewsletterMessage(
        "Newsletter registration is not connected yet."
      );
      return;
    }

    try {
      setNewsletterLoading(true);
      setNewsletterMessage("");

      await onNewsletterSubmit(email.trim());

      setNewsletterMessage("Thank you for joining LANADA.");
      setEmail("");
    } catch (error) {
      console.error("Newsletter error:", error);
      setNewsletterMessage(
        "Something went wrong. Please try again."
      );
    } finally {
      setNewsletterLoading(false);
    }
  };

  const exploreLinks = [
    { label: "Shop All", to: "/shop" },
    { label: "New Arrivals", to: "/shop" },
    { label: "Collections", to: "/shop" },
    { label: "National Jerseys", to: "/shop" },
  ];

  const supportLinks = [
    { label: "My Orders", to: "/orders" },
    { label: "About LANADA", to: "/#about" },
    { label: "Contact Us", to: "/#contact" },
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Terms & Conditions", to: "/terms" },
  ];

  const socialLinks = [
    {
      label: "Instagram",
      url: "https://www.instagram.com/",
    },
    {
      label: "TikTok",
      url: "https://www.tiktok.com/",
    },
    {
      label: "Facebook",
      url: "https://www.facebook.com/",
    },
  ];

  return (
    <footer className="lanada-footer">

      {/* TOP BRAND AREA */}

      <div className="lanada-footer-container">

        <div className="lanada-footer-header">

          <div className="lanada-footer-brand">
            <Link to="/" className="lanada-footer-logo">
              {logoSrc ? (
                <img
                  src={logoSrc}
                  alt="LANADA"
                />
              ) : (
                <span>
                  LANADA<span className="lanada-logo-dot">.</span>
                </span>
              )}
            </Link>

            <p className="lanada-footer-brand-caption">
              THE ART OF EVERYDAY STYLE.
            </p>
          </div>

          <div className="lanada-footer-intro">
            <p className="lanada-footer-overline">
              OUR PHILOSOPHY
            </p>

            <h2>
              BEYOND THE
              <br />
              ORDINARY<span>.</span>
            </h2>

            <p className="lanada-footer-description">
              More than fashion. A statement of identity,
              individuality and personal style.
              Discover the world of LANADA.
            </p>
          </div>

        </div>

        <div className="lanada-footer-divider" />

        {/* LINKS AREA */}

        <div className="lanada-footer-main">

          <div className="lanada-footer-column">
            <h3>EXPLORE</h3>

            <ul>
              {exploreLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.to}>
                    {item.label}
                    <span>↗</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lanada-footer-column">
            <h3>THE BRAND</h3>

            <ul>
              <li>
                <Link to="/#about">
                  Our Story
                  <span>↗</span>
                </Link>
              </li>

              <li>
                <Link to="/#about">
                  Our Philosophy
                  <span>↗</span>
                </Link>
              </li>

              <li>
                <Link to="/#about">
                  The LANADA Experience
                  <span>↗</span>
                </Link>
              </li>

              <li>
                <Link to="/shop">
                  Discover More
                  <span>↗</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="lanada-footer-column">
            <h3>CUSTOMER CARE</h3>

            <ul>
              {supportLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.to}>
                    {item.label}
                    <span>↗</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* NEWSLETTER */}

          <div className="lanada-footer-newsletter">
            <p className="lanada-footer-overline">
              STAY CONNECTED
            </p>

            <h3>
              JOIN THE
              <br />
              LANADA WORLD.
            </h3>

            <p>
              Be the first to discover new collections,
              exclusive updates and special releases.
            </p>

            <form
              className="lanada-newsletter-form"
              onSubmit={handleNewsletter}
            >
              <input
                type="email"
                name="newsletterEmail"
                placeholder="Your email address"
                aria-label="Your email address"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                required
              />

              <button
                type="submit"
                disabled={newsletterLoading}
                aria-label="Subscribe to newsletter"
              >
                {newsletterLoading ? "..." : "→"}
              </button>
            </form>

            {newsletterMessage && (
              <p
                className="lanada-newsletter-message"
                role="status"
              >
                {newsletterMessage}
              </p>
            )}

            <span className="lanada-newsletter-note">
              NO SPAM. ONLY WHAT MATTERS.
            </span>
          </div>

        </div>

        <div className="lanada-footer-divider" />

        {/* SOCIAL AREA */}

        <div className="lanada-footer-social-area">

          <div>
            <p className="lanada-footer-overline">
              FOLLOW THE JOURNEY
            </p>

            <h3>CONNECT WITH LANADA.</h3>
          </div>

          <div className="lanada-footer-social-links">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.label}
                <span>↗</span>
              </a>
            ))}
          </div>

        </div>

        {/* BIG BRAND SIGNATURE */}

        <div className="lanada-footer-signature">
          LANADA<span>.</span>
        </div>

        <div className="lanada-footer-bottom">

          <p>
            © {currentYear} LANADA. ALL RIGHTS RESERVED.
          </p>

          <div className="lanada-footer-legal">
            <Link to="/privacy">PRIVACY</Link>
            <Link to="/terms">TERMS</Link>
            <Link to="/shop">SHOP</Link>
          </div>

          <p className="lanada-footer-country">
            MADE FOR YOUR STYLE.
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;
