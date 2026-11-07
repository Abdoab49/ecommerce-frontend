import React, { useCallback, useEffect, useState } from "react";
import "./GiveawayPromo.css";

const REWARD_KEY = "lanada_giveaway_reward";
const SESSION_KEY = "lanada_giveaway_session_token";

const getDismissKey = (code) => `lanada_giveaway_dismissed_${code}`;

const readRewardFromStorage = () => {
  try {
    const stored = localStorage.getItem(REWARD_KEY);

    if (!stored) return null;

    let parsed;

    try {
      parsed = JSON.parse(stored);
    } catch {
      parsed = { code: stored };
    }

    const reward = parsed?.reward || parsed?.giveaway || parsed;

    if (!reward || typeof reward !== "object") return null;

    const code = reward.code || reward.promoCode;

    if (!code || !code.startsWith("LANADA-")) return null;

    const status = String(reward.status || "available").toLowerCase();

    if (status !== "available") return null;

    if (reward.expiresAt) {
      const expiry = new Date(reward.expiresAt);

      if (Number.isNaN(expiry.getTime()) || expiry <= new Date()) {
        return null;
      }
    }

    return {
      ...reward,
      code,
      discountPercent: Number(
        reward.discountPercent || reward.discount || 20
      ),
    };
  } catch (error) {
    console.error("Unable to read Giveaway reward:", error);
    return null;
  }
};

const formatExpiryDate = (date) => {
  if (!date) return "30 يوماً من تاريخ الإصدار";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "30 يوماً من تاريخ الإصدار";
  }

  return parsedDate.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const getRemainingDays = (date) => {
  if (!date) return null;

  const expiry = new Date(date);
  if (Number.isNaN(expiry.getTime())) return null;

  const difference = expiry.getTime() - Date.now();

  if (difference <= 0) return 0;

  return Math.ceil(difference / (1000 * 60 * 60 * 24));
};

export default function GiveawayPromo() {
  const [reward, setReward] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  const loadReward = useCallback(() => {
    const availableReward = readRewardFromStorage();

    setReward(availableReward);
    setCopied(false);

    if (availableReward) {
      const dismissed = localStorage.getItem(
        getDismissKey(availableReward.code)
      );

      setIsOpen(!dismissed);
    } else {
      setIsOpen(false);
    }

    setIsChecking(false);
  }, []);

  useEffect(() => {
    loadReward();

    const handleStorageChange = (event) => {
      if (!event || event.key === REWARD_KEY || event.key === null) {
        loadReward();
      }
    };

    const handleGiveawayUpdate = () => {
      loadReward();
    };

    window.addEventListener("storage", handleStorageChange);

    window.addEventListener(
      "lanada-giveaway-updated",
      handleGiveawayUpdate
    );

    return () => {
      window.removeEventListener("storage", handleStorageChange);

      window.removeEventListener(
        "lanada-giveaway-updated",
        handleGiveawayUpdate
      );
    };
  }, [loadReward]);

  const closePopup = () => {
    if (reward?.code) {
      localStorage.setItem(getDismissKey(reward.code), "true");
    }

    setIsOpen(false);
  };

  const reopenPopup = () => {
    setCopied(false);
    setIsOpen(true);
  };

  const copyCode = async () => {
    if (!reward?.code) return;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(reward.code);
      } else {
        const textArea = document.createElement("textarea");

        textArea.value = reward.code;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";

        document.body.appendChild(textArea);
        textArea.select();

        const successful = document.execCommand("copy");

        document.body.removeChild(textArea);

        if (!successful) {
          throw new Error("Copy failed");
        }
      }

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2500);
    } catch (error) {
      console.error("Copy failed:", error);
      alert("ما قدرناش ننسخو الكود. حاول تنسخو يدوياً.");
    }
  };

  if (isChecking || !reward) {
    return null;
  }

  const remainingDays = getRemainingDays(reward.expiresAt);

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          className="lanada-giveaway-launcher"
          onClick={reopenPopup}
          aria-label="Open your LANADA gift"
        >
          <span className="lanada-launcher-icon">🎁</span>
          <span className="lanada-launcher-text">
            YOUR GIFT
          </span>
        </button>
      )}

      {isOpen && (
        <div
          className="lanada-giveaway-overlay"
          onClick={closePopup}
          role="presentation"
        >
          <section
            className="lanada-giveaway-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lanada-giveaway-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="lanada-giveaway-close"
              onClick={closePopup}
              aria-label="Close giveaway"
            >
              &times;
            </button>

            <div className="lanada-giveaway-content">
              <div className="lanada-giveaway-brand">
                LANADA
                <span>EXCLUSIVE REWARDS</span>
              </div>

              <div className="lanada-giveaway-eyebrow">
                <span className="lanada-eyebrow-line" />
                A SPECIAL GIFT FOR YOU
                <span className="lanada-eyebrow-line" />
              </div>

              <div className="lanada-gift-visual">
                <div className="lanada-gift-glow" />

                <div className="lanada-gift-spark lanada-spark-one">
                  ✦
                </div>

                <div className="lanada-gift-spark lanada-spark-two">
                  ✧
                </div>

                <div className="lanada-gift-spark lanada-spark-three">
                  ✦
                </div>

                <div className="lanada-gift-box">
                  <div className="lanada-gift-lid">
                    <div className="lanada-gift-bow">
                      <span />
                      <span />
                      <i />
                    </div>
                  </div>

                  <div className="lanada-gift-body">
                    <div className="lanada-gift-ribbon" />
                    <div className="lanada-gift-ribbon-horizontal" />
                  </div>
                </div>

                <div className="lanada-gift-shadow" />
              </div>

              <div className="lanada-giveaway-heading">
                <p className="lanada-giveaway-small-title">
                  YOU'VE UNLOCKED
                </p>

                <h2 id="lanada-giveaway-title">
                  SOMETHING
                  <br />
                  <span>SPECIAL.</span>
                </h2>

                <p className="lanada-giveaway-description">
                  A little surprise from LANADA.
                  <br />
                  Enjoy an exclusive discount on your next order.
                </p>
              </div>

              <div className="lanada-discount-card">
                <span className="lanada-discount-label">
                  YOUR EXCLUSIVE REWARD
                </span>

                <div className="lanada-discount-value">
                  {reward.discountPercent}
                  <span>%</span>
                  <small>OFF</small>
                </div>

                <span className="lanada-discount-caption">
                  ON YOUR NEXT PURCHASE
                </span>
              </div>

              <div className="lanada-code-section">
                <span className="lanada-code-label">
                  YOUR PERSONAL PROMO CODE
                </span>

                <div className="lanada-code-box">
                  <span className="lanada-code-value">
                    {reward.code}
                  </span>

                  <button
                    type="button"
                    className={`lanada-copy-button ${
                      copied ? "is-copied" : ""
                    }`}
                    onClick={copyCode}
                  >
                    {copied ? (
                      <>
                        <span>✓</span>
                        COPIED
                      </>
                    ) : (
                      <>
                        <svg
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <rect
                            x="8"
                            y="8"
                            width="12"
                            height="12"
                            rx="2"
                          />
                          <path
                            d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"
                          />
                        </svg>
                        COPY
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="lanada-giveaway-expiry">
                <span className="lanada-expiry-icon">◷</span>

                <div>
                  <strong>
                    {remainingDays !== null
                      ? `${remainingDays} ${
                          remainingDays === 1 ? "DAY" : "DAYS"
                        } LEFT`
                      : "LIMITED TIME OFFER"}
                  </strong>

                  <span>
                    Expires: {formatExpiryDate(reward.expiresAt)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="lanada-giveaway-shop-button"
                onClick={closePopup}
              >
                EXPLORE THE COLLECTION
                <span>→</span>
              </button>

              <p className="lanada-giveaway-footer">
                ONE CODE. ONE ACCOUNT. ONE SPECIAL MOMENT.
              </p>
            </div>
          </section>
        </div>
      )}
    </>
  );
}