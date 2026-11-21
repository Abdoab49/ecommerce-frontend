
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, ArrowRight } from "lucide-react";
import "./TriverraHero.css";

const VIDEO_URL =
  "https://cdn.jiro.build/Jahid/Random/Triverra/All%20Images/Header%20BG%20travel.mp4";

const LOGO_URL =
  "https://cdn.jiro.build/Jahid/Random/Triverra/All%20SVG/brand%20logo%20triverra.svg";

const navigation = [
  { label: "Home", id: "home" },
  { label: "Services", id: "services" },
  { label: "Tours", id: "tours" },
  { label: "Destinations", id: "destinations" },
  { label: "Contacts", id: "contacts" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

function TriverraHero({
  onBuildTrip,
  onSeeHowItWorks,
  onRegister,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setMenuOpen(false);

    if (id === "register" && onRegister) {
      onRegister();
      return;
    }

    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleBuildTrip = () => {
    if (onBuildTrip) {
      onBuildTrip();
    } else {
      scrollToSection("register");
    }
  };

  const handleHowItWorks = () => {
    if (onSeeHowItWorks) {
      onSeeHowItWorks();
    } else {
      scrollToSection("services");
    }
  };

  return (
    <section className="triverra-hero" id="home">
      {/* Background video */}
      <video
        className="triverra-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src={VIDEO_URL} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>

      {/* Dark overlay */}
      <div className="triverra-overlay" />

      {/* Navigation */}
      <header className="triverra-header">
        <div className="triverra-navbar">
          <button
            className="triverra-logo"
            onClick={() => scrollToSection("home")}
            aria-label="Triverra home"
          >
            <img src={LOGO_URL} alt="Triverra" />
          </button>

          <nav className="triverra-desktop-nav">
            {navigation.map((item) => (
              <button
                key={item.id}
                className={`triverra-nav-link ${
                  item.id === "home" ? "active" : ""
                }`}
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            className="triverra-register"
            onClick={() => scrollToSection("register")}
          >
            Register
            <ArrowUpRight size={16} />
          </button>

          <button
            className="triverra-menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>

        {/* Mobile navigation */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              className="triverra-mobile-nav"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              {navigation.map((item, index) => (
                <motion.button
                  key={item.id}
                  className="triverra-mobile-link"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                  <ArrowUpRight size={17} />
                </motion.button>
              ))}

              <button
                className="triverra-mobile-register"
                onClick={() => scrollToSection("register")}
              >
                Register
                <ArrowUpRight size={17} />
              </button>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Hero content */}
      <main className="triverra-content">
        <motion.div
          className="triverra-badge"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <span className="triverra-badge-dot" />
          <span>Your AI Travel Companion</span>
          <span className="triverra-badge-separator">—</span>
          <span>Plan Smarter. Explore Deeper.</span>
        </motion.div>

        <motion.h1
          className="triverra-title"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.15 }}
        >
          Dream deeper.
          <br />
          <span>Travel farther.</span>
        </motion.h1>

        <motion.p
          className="triverra-subtitle"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          Discover extraordinary places, create unforgettable memories,
          and let intelligent travel planning turn your next journey
          into something remarkable.
        </motion.p>

        <motion.div
          className="triverra-actions"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.45 }}
        >
          <button
            className="triverra-primary-button"
            onClick={handleBuildTrip}
          >
            Build My Trip Free
            <span className="triverra-button-icon">
              <ArrowUpRight size={19} />
            </span>
          </button>

          <button
            className="triverra-secondary-button"
            onClick={handleHowItWorks}
          >
            <span className="triverra-play-icon">▶</span>
            See How It Works
          </button>
        </motion.div>

        {/* Trust information */}
        <motion.div
          className="triverra-trust"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
        >
          <div className="triverra-avatars" aria-hidden="true">
            <span>J</span>
            <span>M</span>
            <span>A</span>
            <span>S</span>
          </div>

          <div className="triverra-trust-info">
            <div className="triverra-trust-top">
              <strong>8370+</strong>
              <span>trips planned</span>
            </div>

            <div className="triverra-rating">
              <span className="triverra-stars">★★★★★</span>
              <span>Rated 4.9 by travelers worldwide</span>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Bottom description */}
      <motion.footer
        className="triverra-footer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <p>
          Your next adventure starts here. Explore the world with
          personalized recommendations, thoughtful itineraries, and
          smarter travel planning.
        </p>

        <button
          className="triverra-footer-link"
          onClick={handleHowItWorks}
          aria-label="Discover more"
        >
          <ArrowRight size={20} />
        </button>
      </motion.footer>
    </section>
  );
}

export default TriverraHero;
