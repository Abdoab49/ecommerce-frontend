import React, { useCallback, useEffect, useState } from "react";
import "./GiveawayPromo.css";

const REWARD_KEY = "lanada_giveaway_reward";

const getDismissKey = (code) => `lanada_giveaway_dismissed_${code}`;

function readReward() {
  try {
    const raw = localStorage.getItem(REWARD_KEY);
    if (!raw) return null;

    let data;

    try {
      data = JSON.parse(raw);
    } catch {
      data = { code: raw };
    }

    const reward = data?.reward || data?.giveaway || data;
    const code = reward?.code || reward?.promoCode;

    if (!code || !String(code).startsWith("LANADA-")) return null;

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
    console.error("Giveaway loading error:", error);
    return null;
  }
}

function formatExpiry(dateValue) {
  if (!dateValue) return "30 days from issue date";

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "Limited time";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function getDaysLeft(dateValue) {
  if (!dateValue) return null;

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return null;

  return Math.max(0, Math.ceil((date.getTime() - Date.now()) / 86400000));
}

export default function GiveawayPromo() {
  const [reward, setReward] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadReward = useCallback(() => {
    const availableReward = readReward();

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

    setLoading(false);
  }, []);

  useEffect(() => {
    loadReward();

    const handleUpdate = () => loadReward();

    window.addEventListener("storage", handleUpdate);
    window.addEventListener("lanada-giveaway-updated", handleUpdate);
    window.addEventListener("userChanged", handleUpdate);

    return () => {
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("lanada-giveaway-updated", handleUpdate);
      window.removeEventListener("userChanged", handleUpdate);
    };
  }, [loadReward]);

  const closePopup = useCallback(() => {
    if (reward?.code) {
      localStorage.setItem(getDismissKey(reward.code), "true");
    }
    setIsOpen(false);
  }, [reward]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closePopup();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closePopup]);

  const copyCode = async () => {
    if (!reward?.code) return;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(reward.code);
      } else {
        const field = document.createElement("textarea");
        field.value = reward.code;
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.select();

        const copiedSuccessfully = document.execCommand("copy");
        document.body.removeChild(field);

        if (!copiedSuccessfully) throw new Error("Copy failed");
      }

      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch (error) {
      console.error("Unable to copy reward code:", error);
    }
  };

  if (loading || !reward) return null;

  const daysLeft = getDaysLeft(reward.expiresAt);

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          className="lanada-noir-trigger"
          onClick={() => setIsOpen(true)}
          aria-label="Open your LANADA reward"
        >
          <span className="lanada-noir-trigger-icon">L</span>
          <span className="lanada-noir-trigger-label">YOUR REWARD</span>
        </button>
      )}

      {isOpen && (
        <div
          className="lanada-noir-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closePopup();
          }}
        >
          <section
            className="lanada-noir-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lanada-noir-title"
          >
            <button
              type="button"
              className="lanada-noir-close"
              onClick={closePopup}
              aria-label="Close reward"
            >
              ×
            </button>

            <div className="lanada-noir-left">
              <div className="lanada-noir-topline">
                <span>LANADA</span>
                <span>EST. 2025</span>
              </div>

              <div className="lanada-noir-edition">
                EXCLUSIVE CLIENT PRIVILEGE
              </div>

              <div className="lanada-noir-number-wrap">
                <span className="lanada-noir-number">
                  {reward.discountPercent}
                </span>
                <span className="lanada-noir-percent">%</span>
              </div>

              <div className="lanada-noir-off">OFF YOUR NEXT ORDER</div>

              <div className="lanada-noir-rule" />

              <p className="lanada-noir-manifesto">
                LESS ORDINARY.
                <br />
                MORE YOU.
              </p>

              <div className="lanada-noir-left-footer">
                <span>THE PRIVATE COLLECTION</span>
                <span>01 / 01</span>
              </div>

              <div className="lanada-noir-outline one" />
              <div className="lanada-noir-outline two" />
            </div>

            <div className="lanada-noir-right">
              <div className="lanada-noir-brand">
                LANADA<span>.</span>
              </div>

              <div className="lanada-noir-kicker">
                <span />
                A REWARD, RESERVED FOR YOU
              </div>

              <h2 id="lanada-noir-title">
                Your next
                <br />
                purchase,
                <br />
                <em>on us.</em>
              </h2>

              <p className="lanada-noir-description">
                A personal invitation to experience LANADA.
                Enjoy an exclusive discount on your next purchase.
              </p>

              <div className="lanada-noir-code-heading">
                YOUR PERSONAL CODE
              </div>

              <div className="lanada-noir-code-card">
                <span className="lanada-noir-code">{reward.code}</span>

                <button
                  type="button"
                  className={`lanada-noir-copy ${copied ? "copied" : ""}`}
                  onClick={copyCode}
                >
                  {copied ? "COPIED ✓" : "COPY"}
                </button>
              </div>

              <div className="lanada-noir-expiry">
                <span className="lanada-noir-expiry-mark">i</span>
                <div>
                  <strong>
                    {daysLeft === null
                      ? "LIMITED-TIME REWARD"
                      : daysLeft === 1
                      ? "1 DAY REMAINING"
                      : `${daysLeft} DAYS REMAINING`}
                  </strong>
                  <span>Valid until {formatExpiry(reward.expiresAt)}</span>
                </div>
              </div>

              <button
                type="button"
                className="lanada-noir-cta"
                onClick={closePopup}
              >
                DISCOVER THE COLLECTION
                <span>↗</span>
              </button>

              <div className="lanada-noir-terms">
                ONE ACCOUNT. ONE CODE. ONE USE.
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}