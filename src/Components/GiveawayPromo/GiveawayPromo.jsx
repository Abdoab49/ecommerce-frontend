
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Gift,
  Sparkles,
  ArrowRight,
  Ticket,
  X
} from 'lucide-react';

import './GiveawayPromo.css';

const GiveawayPromo = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [error, setError] = useState('');

  const handleOpenGift = () => {
    setIsOpen(true);
    setError('');
  };

  const handleCloseGift = () => {
    setIsOpen(false);
    setError('');
  };

  const handleContinue = (e) => {
    e.preventDefault();

    const code = promoCode.trim().toUpperCase();

    if (!code) {
      setError('Please enter your giveaway code.');
      return;
    }

    // Keep the entered code for the existing Cart promo validation.
    localStorage.setItem('lanada_pending_promo', code);

    navigate('/cart');
  };

  return (
    <section className="lanada-giveaway">

      <div className="giveaway-card">

        {/* DECORATIVE BACKGROUND */}
        <div className="giveaway-glow giveaway-glow-one" />
        <div className="giveaway-glow giveaway-glow-two" />

        {/* LEFT CONTENT */}
        <div className="giveaway-content">

          <div className="giveaway-eyebrow">
            <Sparkles size={14} />
            <span>LANADA EXCLUSIVE REWARDS</span>
          </div>

          <h2>
            A GIFT IS
            <br />
            <span>WAITING FOR YOU.</span>
          </h2>

          <p className="giveaway-description">
            Discover your exclusive reward and enjoy
            something special from the LANADA collection.
          </p>

          <div className="giveaway-benefits">
            <span>
              <Ticket size={15} />
              Exclusive promo codes
            </span>

            <span>
              <Gift size={15} />
              Special rewards
            </span>
          </div>

          {!isOpen ? (
            <button
              type="button"
              className="giveaway-open-button"
              onClick={handleOpenGift}
            >
              <span>REVEAL MY GIFT</span>
              <ArrowRight size={18} />
            </button>
          ) : (
            <form
              className="giveaway-code-form"
              onSubmit={handleContinue}
            >
              <label htmlFor="lanada-giveaway-code">
                ENTER YOUR PROMO CODE
              </label>

              <div className="giveaway-input-row">
                <input
                  id="lanada-giveaway-code"
                  type="text"
                  value={promoCode}
                  onChange={(e) => {
                    setPromoCode(e.target.value);
                    setError('');
                  }}
                  placeholder="YOUR CODE"
                  autoComplete="off"
                  maxLength={40}
                />

                <button type="submit" aria-label="Continue to cart">
                  <ArrowRight size={20} />
                </button>
              </div>

              {error && (
                <p className="giveaway-error" role="alert">
                  {error}
                </p>
              )}

              <button
                type="button"
                className="giveaway-cancel"
                onClick={handleCloseGift}
              >
                <X size={13} />
                CLOSE
              </button>

              <p className="giveaway-hint">
                Your code will be checked securely in your cart.
              </p>
            </form>
          )}

          <div className="giveaway-footer">
            <span>01 / EXCLUSIVE DROP</span>
            <span>MADE FOR YOU</span>
          </div>

        </div>

        {/* RIGHT GIFT VISUAL */}
        <div className="giveaway-visual">

          <div className="giveaway-orbit orbit-one" />
          <div className="giveaway-orbit orbit-two" />

          <div className="giveaway-floating-label floating-label-top">
            <Sparkles size={13} />
            <span>UNLOCK SOMETHING SPECIAL</span>
          </div>

          <div className="giveaway-gift-box">
            <div className="gift-box-top">
              <div className="gift-ribbon-horizontal" />
              <div className="gift-bow">
                <span />
                <span />
              </div>
            </div>

            <div className="gift-box-body">
              <div className="gift-ribbon-vertical" />

              <div className="gift-box-logo">
                LANADA<span>.</span>
              </div>
            </div>
          </div>

          <div className="giveaway-floating-label floating-label-bottom">
            <Gift size={15} />
            <span>YOUR NEXT REWARD</span>
          </div>

        </div>

        {/* DECORATIVE CORNER */}
        <div className="giveaway-corner">L.</div>

      </div>

      <div className="giveaway-bottom-note">
        <span>LANADA REWARDS PROGRAM</span>
        <span>YOUR STYLE. YOUR REWARD.</span>
      </div>

    </section>
  );
};

export default GiveawayPromo;
