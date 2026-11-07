
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = ({
  logoSrc = "/logo.png",
  contactEmail = "",
  onNewsletterSubmit,
}) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const year = new Date().getFullYear();

  const handleNewsletter = async (event) => {
    event.preventDefault();

    const cleanEmail = email.trim();

    if (!cleanEmail) return;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      if (onNewsletterSubmit) {
        await onNewsletterSubmit(cleanEmail);
        setMessage("Thank you for joining LANADA.");
        setEmail("");
      } else if (contactEmail) {
        const subject = encodeURIComponent(
          "LANADA Newsletter Subscription"
        );

        const body = encodeURIComponent(
          `Hello LANADA,\n\nPlease add this email to your newsletter:\n${cleanEmail}`
        );

        window.location.href =
          `mailto:${contactEmail}?subject=${subject}&body=${body}`;
      } else {
        setMessage(
          "Newsletter service is not connected yet."
        );
      }
    } catch (error) {
      console.error("Newsletter submission error:", error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="lanada-footer">

      <div className="lanada-footer-container">

        {/* CENTERED LOGO */}

        <div className="lanada-footer-logo-area">
          {!logoError && logoSrc ? (
            <img
              src={logoSrc}
              alt="LANADA logo"
              className="lanada-footer-logo"
              onError={() => setLogoError(true)}
            />
          ) : (
            <span className="lanada-footer-logo-text">
              LANADA<span>.</span>
            </span>
          )}

          <p className="lanada-footer-tagline">
            THE ART OF EVERYDAY STYLE.
          </p>
        </div>

        {/* ABOUT */}

        <section className="lanada-footer-about" id="about">
          <h2>ABOUT LANADA</h2>

          <p>
            LANADA is more than a fashion destination.
            It is a reflection of individuality, confidence
            and personal expression. We believe great style
            is timeless, effortless and uniquely yours.
            Discover a collection made for the way you live.
          </p>
        </section>

        {/* NEWSLETTER */}

        <section className="lanada-footer-newsletter">
          <h3>STAY IN TOUCH.</h3>

          <p>
            Receive the latest collections, new arrivals
            and exclusive updates directly in your inbox.
          </p>

          <form
            className="lanada-footer-email-form"
            onSubmit={handleNewsletter}
          >
            <div className="lanada-footer-email-input">

              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="2"
                />
                <path d="m4 7 8 6 8-6" />
              </svg>

              <input
                type="email"
                name="newsletterEmail"
                placeholder="Enter your email address"
                aria-label="Enter your email address"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                required
              />

            </div>

            <button
              type="submit"
              className="lanada-footer-email-submit"
              disabled={loading}
              aria-label="Subscribe"
            >
              {loading ? (
                <span className="lanada-footer-loading">...</span>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m13 5 7 7-7 7" />
                </svg>
              )}
            </button>
          </form>

          {message && (
            <p
              className="lanada-footer-message"
              role="status"
            >
              {message}
            </p>
          )}

          <span className="lanada-footer-note">
            NO SPAM. JUST WHAT YOU LOVE.
          </span>
        </section>

        {/* SIMPLE NAVIGATION */}

        <nav className="lanada-footer-navigation">
          <Link to="/shop">SHOP</Link>
          <Link to="/#about">ABOUT</Link>
          <Link to="/orders">MY ORDERS</Link>
          <Link to="/privacy">PRIVACY POLICY</Link>
          <Link to="/terms">TERMS & CONDITIONS</Link>
        </nav>

        {/* EMAIL CONTACT */}

        {contactEmail && (
          <a
            className="lanada-footer-contact"
            href={`mailto:${contactEmail}`}
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <rect
                x="3"
                y="5"
                width="18"
                height="14"
                rx="2"
              />
              <path d="m4 7 8 6 8-6" />
            </svg>

            CONTACT LANADA
          </a>
        )}

        {/* COPYRIGHT */}

        <div className="lanada-footer-bottom">
          <p>
            © {year} LANADA. ALL RIGHTS RESERVED.
          </p>

          <p>
            MADE FOR YOUR STYLE.
          </p>
        </div>

      </div>

    </footer>
  );
};

export default Footer;
