
import React, { useCallback, useEffect, useRef, useState } from "react";
import "./ClothingRailHero.css";

const DB_NAME = "lanada-clothing-rail";
const STORE_NAME = "garments";
const FEATURED_ID = "lanada-featured-piece-001";
const FEATURED_IMAGE = "/ClothingRailHero/image1.png";
const MAX_FILE_SIZE = 10 * 1024 * 1024;

const CATEGORIES = [
  "Football Jersey",
  "Jacket",
  "T-Shirt",
  "Hoodie",
  "Sweatshirt",
  "Shirt",
  "Coat",
  "Other",
];

/* =========================================
   DATABASE
========================================= */

function openDatabase() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error("IndexedDB is not supported."));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function databaseAction(mode, operation) {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    let result;
    let settled = false;

    const transaction = db.transaction(STORE_NAME, mode);
    const store = transaction.objectStore(STORE_NAME);
    const request = operation(store);

    request.onsuccess = () => {
      result = request.result;
    };

    request.onerror = () => {
      if (!settled) {
        settled = true;
        db.close();
        reject(request.error);
      }
    };

    transaction.oncomplete = () => {
      db.close();

      if (!settled) {
        settled = true;
        resolve(result);
      }
    };

    transaction.onerror = () => {
      if (!settled) {
        settled = true;
        db.close();
        reject(transaction.error || new Error("Database error."));
      }
    };

    transaction.onabort = () => {
      if (!settled) {
        settled = true;
        db.close();
        reject(transaction.error || new Error("Database aborted."));
      }
    };
  });
}

function getSavedGarments() {
  return databaseAction("readonly", (store) => store.getAll());
}

function saveGarment(garment) {
  return databaseAction("readwrite", (store) => store.put(garment));
}

function deleteGarment(id) {
  return databaseAction("readwrite", (store) => store.delete(id));
}

/* =========================================
   HELPERS
========================================= */

function createId() {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }

  return `lanada-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function validateImage(file) {
  if (!file) return "";

  if (!file.type.startsWith("image/")) {
    return "Please select a valid image.";
  }

  if (file.size > MAX_FILE_SIZE) {
    return "Image size must be 10 MB or smaller.";
  }

  return "";
}

function formatPrice(value) {
  const amount = Number(value || 0);

  if (!amount || amount <= 0) {
    return "Price on request";
  }

  return `${amount.toLocaleString("en-US")} MAD`;
}

/* =========================================
   IMAGE UPLOAD FIELD
========================================= */

function ImageUploadField({
  label,
  file,
  preview,
  onChange,
  required = false,
}) {
  const inputRef = useRef(null);

  return (
    <div className="rail-upload-field">

      <span className="rail-upload-label">
        {label}
        {required && <i>REQUIRED</i>}
      </span>

      <button
        type="button"
        className={`rail-image-picker ${preview ? "has-image" : ""}`}
        onClick={() => inputRef.current?.click()}
      >
        {preview ? (
          <>
            <img src={preview} alt={`${label} preview`} />

            <span className="rail-image-change">
              CHANGE IMAGE
            </span>
          </>
        ) : (
          <>
            <span className="rail-image-picker-icon">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 16V4m0 0L7 9m5-5 5 5M4 16v4h16v-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <strong>UPLOAD IMAGE</strong>
            <small>PNG · JPG · WEBP</small>
          </>
        )}
      </button>

      {file && (
        <span className="rail-selected-file">
          {file.name}
        </span>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        required={required}
        onChange={(event) => {
          onChange(event.target.files?.[0] || null);
        }}
      />

    </div>
  );
}

/* =========================================
   GARMENT ICON
========================================= */

function GarmentIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8 4.5 12 3l4 1.5 5 4-3 4-2.5-1.5V21h-7V11L6 12.5 3 8.5l5-4Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* =========================================
   MAIN COMPONENT
========================================= */

export default function ClothingRailHero() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Football Jersey");
  const [team, setTeam] = useState("");
  const [season, setSeason] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [frontFile, setFrontFile] = useState(null);
  const [backFile, setBackFile] = useState(null);

  const [frontPreview, setFrontPreview] = useState("");
  const [backPreview, setBackPreview] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [activeSide, setActiveSide] = useState("front");

  const [uploadKey, setUploadKey] = useState(0);

  const scrollRef = useRef(null);
  const objectUrls = useRef(new Set());

  /* =========================================
     OBJECT URL MANAGEMENT
  ========================================= */

  const registerObjectUrl = useCallback((file) => {
    if (!(file instanceof Blob)) return "";

    const url = URL.createObjectURL(file);
    objectUrls.current.add(url);

    return url;
  }, []);

  const releaseObjectUrl = useCallback((url) => {
    if (!url || !objectUrls.current.has(url)) return;

    URL.revokeObjectURL(url);
    objectUrls.current.delete(url);
  }, []);

  useEffect(() => {
    return () => {
      objectUrls.current.forEach((url) => {
        URL.revokeObjectURL(url);
      });

      objectUrls.current.clear();
    };
  }, []);

  /* =========================================
     PREVIEW FRONT IMAGE
  ========================================= */

  useEffect(() => {
    if (!frontFile) {
      setFrontPreview("");
      return undefined;
    }

    const url = URL.createObjectURL(frontFile);
    setFrontPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [frontFile]);

  /* =========================================
     PREVIEW BACK IMAGE
  ========================================= */

  useEffect(() => {
    if (!backFile) {
      setBackPreview("");
      return undefined;
    }

    const url = URL.createObjectURL(backFile);
    setBackPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [backFile]);

  /* =========================================
     LOAD DEFAULT IMAGE + SAVED GARMENTS
  ========================================= */

  useEffect(() => {
    let mounted = true;

    const loadGarments = async () => {
      try {
        let saved = await getSavedGarments();

        /*
          ADD YOUR PUBLIC IMAGE AUTOMATICALLY
          ONLY IF IT DOES NOT ALREADY EXIST.
        */

        const hasFeaturedImage = saved.some(
          (item) => item.id === FEATURED_ID
        );

        if (!hasFeaturedImage) {
          try {
            const response = await fetch(FEATURED_IMAGE);

            if (!response.ok) {
              throw new Error(
                `Could not load ${FEATURED_IMAGE}`
              );
            }

            const imageBlob = await response.blob();

            if (!imageBlob.type.startsWith("image/")) {
              throw new Error("The default file is not a valid image.");
            }

            const defaultGarment = {
              id: FEATURED_ID,
              name: "LANADA Featured Piece",
              category: "Other",
              team: "LANADA Collection",
              season: "",
              price: 0,
              description:
                "Featured clothing piece from the LANADA collection.",

              front: imageBlob,
              back: null,

              createdAt: Date.now(),
            };

            await saveGarment(defaultGarment);

            saved = [defaultGarment, ...saved];
          } catch (imageError) {
            console.error("Default image error:", imageError);

            if (saved.length === 0) {
              throw new Error(
                "Could not load your default image. Check that image1.png exists in the public folder."
              );
            }
          }
        }

        if (!mounted) return;

        const sorted = [...saved].sort(
          (a, b) => (b.createdAt || 0) - (a.createdAt || 0)
        );

        const displayItems = sorted.map((record) => ({
          ...record,
          frontUrl: registerObjectUrl(record.front),
          backUrl: registerObjectUrl(record.back),
        }));

        setItems(displayItems);
        setError("");

      } catch (err) {
        console.error("LANADA rail loading error:", err);

        if (mounted) {
          setError(
            err.message ||
            "Could not load your collection. Please check browser storage."
          );
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadGarments();

    return () => {
      mounted = false;
    };
  }, [registerObjectUrl]);

  /* =========================================
     IMAGE VALIDATION
  ========================================= */

  const handleFrontChange = (file) => {
    setError("");
    setSuccess("");

    const validation = validateImage(file);

    if (validation) {
      setError(validation);
      setFrontFile(null);
      return;
    }

    setFrontFile(file);
  };

  const handleBackChange = (file) => {
    setError("");
    setSuccess("");

    const validation = validateImage(file);

    if (validation) {
      setError(validation);
      setBackFile(null);
      return;
    }

    setBackFile(file);
  };

  /* =========================================
     RESET FORM
  ========================================= */

  const resetForm = () => {
    setName("");
    setCategory("Football Jersey");
    setTeam("");
    setSeason("");
    setPrice("");
    setDescription("");

    setFrontFile(null);
    setBackFile(null);

    setUploadKey((value) => value + 1);
  };

  /* =========================================
     ADD GARMENT
  ========================================= */

  const handleAddGarment = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!frontFile) {
      setError("Please upload the front image first.");
      return;
    }

    if (!name.trim()) {
      setError("Please enter the name of your piece.");
      return;
    }

    if (
      price &&
      (!Number.isFinite(Number(price)) || Number(price) < 0)
    ) {
      setError("Please enter a valid price.");
      return;
    }

    const garment = {
      id: createId(),
      name: name.trim(),
      category,
      team: team.trim(),
      season: season.trim(),
      price: price ? Number(price) : 0,
      description: description.trim(),

      front: frontFile,
      back: backFile || null,

      createdAt: Date.now(),
    };

    try {
      setSaving(true);

      await saveGarment(garment);

      const displayItem = {
        ...garment,
        frontUrl: registerObjectUrl(garment.front),
        backUrl: registerObjectUrl(garment.back),
      };

      setItems((previous) => [displayItem, ...previous]);

      resetForm();
      setFormOpen(false);

      setSuccess(
        `${garment.name} has been added to your LANADA rail.`
      );

      window.setTimeout(() => setSuccess(""), 4500);

    } catch (err) {
      console.error("LANADA garment save error:", err);

      setError(
        "Could not save this piece. Check available browser storage and try again."
      );
    } finally {
      setSaving(false);
    }
  };

  /* =========================================
     DELETE GARMENT
  ========================================= */

  const handleDelete = async (item) => {
    const confirmed = window.confirm(
      `Remove "${item.name}" from your collection?`
    );

    if (!confirmed) return;

    setError("");
    setSuccess("");

    try {
      await deleteGarment(item.id);

      releaseObjectUrl(item.frontUrl);
      releaseObjectUrl(item.backUrl);

      setItems((previous) =>
        previous.filter((entry) => entry.id !== item.id)
      );

      if (activeItem?.id === item.id) {
        setActiveItem(null);
      }

      setSuccess("Piece removed from your collection.");
      window.setTimeout(() => setSuccess(""), 3500);

    } catch (err) {
      console.error("LANADA deletion error:", err);
      setError("Could not remove this piece. Please try again.");
    }
  };

  /* =========================================
     DETAILS MODAL
  ========================================= */

  const openDetails = (item) => {
    setActiveItem(item);
    setActiveSide("front");
  };

  const closeDetails = () => {
    setActiveItem(null);
    setActiveSide("front");
  };

  useEffect(() => {
    if (!activeItem) return undefined;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setActiveItem(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [activeItem]);

  /* =========================================
     FRONT / BACK SWITCH
  ========================================= */

  const changeSide = (side) => {
    if (side === "back" && !activeItem?.backUrl) return;

    setActiveSide(side);
  };

  /* =========================================
     RAIL NAVIGATION
  ========================================= */

  const scrollRail = (direction) => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction * 350,
      behavior: "smooth",
    });
  };

  /* =========================================
     MAIN RENDER
  ========================================= */

  return (
    <main className="lanada-rail-page">

      {/* HEADER */}

      <header className="lanada-rail-header">
        <div className="lanada-rail-heading">
          <span className="lanada-rail-eyebrow">
            LANADA / THE COLLECTION
          </span>

          <h1>
            THE CLOTHING
            <br />
            <em>RAIL.</em>
          </h1>

          <p>
            Every piece has a story. Bring yours to the rail.
          </p>
        </div>

        <button
          type="button"
          className="lanada-add-button"
          onClick={() => {
            setFormOpen((previous) => !previous);
            setError("");
            setSuccess("");
          }}
          aria-expanded={formOpen}
        >
          <span>
            {formOpen ? "CLOSE UPLOAD" : "＋ ADD PIECE"}
          </span>
        </button>
      </header>

      {/* UPLOAD FORM */}

      {formOpen && (
        <form
          className="lanada-rail-upload"
          onSubmit={handleAddGarment}
        >
          <div className="rail-upload-heading">
            <div>
              <span>YOUR COLLECTION</span>

              <h2>Add a new piece.</h2>

              <p>
                Upload any jacket, T-shirt, jersey, hoodie or clothing item.
              </p>
            </div>

            <span className="rail-upload-number">
              NEW / PIECE
            </span>
          </div>

          <div className="rail-upload-grid">

            <label className="rail-text-field">
              <span>PIECE NAME</span>

              <input
                type="text"
                placeholder="Example: Morocco Home Jersey"
                value={name}
                onChange={(event) => setName(event.target.value)}
                maxLength={90}
                required
              />
            </label>

            <label className="rail-text-field">
              <span>CATEGORY</span>

              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                {CATEGORIES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="rail-text-field">
              <span>TEAM / BRAND</span>

              <input
                type="text"
                placeholder="Example: Morocco / Nike"
                value={team}
                onChange={(event) => setTeam(event.target.value)}
                maxLength={70}
              />
            </label>

            <label className="rail-text-field">
              <span>SEASON / COLLECTION</span>

              <input
                type="text"
                placeholder="Example: 2025/26"
                value={season}
                onChange={(event) => setSeason(event.target.value)}
                maxLength={40}
              />
            </label>

            <label className="rail-text-field">
              <span>PRICE (MAD)</span>

              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="399"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
            </label>

            <label className="rail-text-field rail-description-field">
              <span>DESCRIPTION</span>

              <input
                type="text"
                placeholder="Describe the material, fit or special details..."
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                maxLength={220}
              />
            </label>

            {/* FRONT / BACK IMAGES */}

            <div className="rail-image-upload-row">

              <ImageUploadField
                key={`front-${uploadKey}`}
                label="FRONT IMAGE"
                file={frontFile}
                preview={frontPreview}
                onChange={handleFrontChange}
                required
              />

              <ImageUploadField
                key={`back-${uploadKey}`}
                label="BACK IMAGE"
                file={backFile}
                preview={backPreview}
                onChange={handleBackChange}
              />

            </div>

          </div>

          <div className="rail-upload-footer">
            <span>
              PNG / JPG / WEBP / GIF / AVIF · MAX 10 MB PER IMAGE
            </span>

            <button type="submit" disabled={saving}>
              {saving ? "SAVING..." : "ADD TO THE RAIL"}
              {!saving && <span>↗</span>}
            </button>
          </div>
        </form>
      )}

      {/* FEEDBACK */}

      {error && (
        <div className="lanada-rail-feedback error" role="alert">
          {error}
        </div>
      )}

      {success && (
        <div className="lanada-rail-feedback success" role="status">
          {success}
        </div>
      )}

      {/* RAIL TOOLBAR */}

      <div className="lanada-rail-meta">

        <div className="lanada-rail-meta-labels">
          <span className="rail-meta-label">
            CURRENT SELECTION
          </span>

          <strong>
            {items.length} {items.length === 1 ? "PIECE" : "PIECES"}
          </strong>
        </div>

        <div className="rail-controls">
          <button
            type="button"
            onClick={() => scrollRail(-1)}
            aria-label="Scroll rail left"
          >
            ←
          </button>

          <button
            type="button"
            onClick={() => scrollRail(1)}
            aria-label="Scroll rail right"
          >
            →
          </button>
        </div>

      </div>

      {/* CLOTHING RAIL */}

      <section className="lanada-rail-stage">

        <div className="lanada-rail-bar">
          <span className="rail-bar-end left" />
          <span className="rail-bar-centre" />
          <span className="rail-bar-end right" />
        </div>

        {loading ? (
          <div className="lanada-rail-empty">
            <div className="rail-loading-spinner" />
            <p>Preparing your collection...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="lanada-rail-empty">

            <div className="rail-empty-icon">
              <GarmentIcon />
            </div>

            <span>YOUR RAIL IS READY</span>

            <h2>Hang your first piece.</h2>

            <p>
              Add a photo of any jacket, T-shirt, hoodie or football jersey.
              Your image will appear here automatically.
            </p>

            <button
              type="button"
              onClick={() => setFormOpen(true)}
            >
              UPLOAD FIRST PIECE
              <span>↗</span>
            </button>

          </div>
        ) : (
          <div
            className="lanada-rail-track"
            ref={scrollRef}
            aria-label="Your clothing collection"
          >
            {items.map((item, index) => (
              <article
                className="lanada-rail-piece"
                key={item.id}
              >

                {/* HANGER */}

                <div className="lanada-hanger">
                  <div className="lanada-hanger-hook" />

                  <div className="lanada-hanger-frame">
                    <span className="hanger-left" />
                    <span className="hanger-right" />
                    <span className="hanger-bottom" />
                  </div>
                </div>

                {/* IMAGE */}

                <button
                  type="button"
                  className="lanada-garment-button"
                  onClick={() => openDetails(item)}
                  aria-label={`View ${item.name}`}
                >
                  <div className="lanada-garment-image">
                    <img
                      src={item.frontUrl}
                      alt={item.name}
                      loading="lazy"
                      draggable="false"
                    />
                  </div>

                  <span className="lanada-garment-view">
                    VIEW PIECE ↗
                  </span>
                </button>

                {/* INFO */}

                <div className="lanada-garment-info">

                  <span className="garment-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="garment-text">
                    <strong>{item.name}</strong>
                    <small>{item.team || item.category}</small>
                  </div>

                  {item.price > 0 && (
                    <b>{formatPrice(item.price)}</b>
                  )}

                </div>

                {/* ACTIONS */}

                <div className="lanada-piece-actions">

                  <button
                    type="button"
                    onClick={() => openDetails(item)}
                  >
                    DETAILS
                    <span>↗</span>
                  </button>

                  <button
                    type="button"
                    className="rail-delete-button"
                    title="Delete this piece"
                    aria-label={`Delete ${item.name}`}
                    onClick={() => handleDelete(item)}
                  >
                    ×
                  </button>

                </div>

              </article>
            ))}
          </div>
        )}

        {!loading && items.length > 0 && (
          <div className="lanada-rail-hint">
            SELECT A PIECE TO VIEW DETAILS · USE ARROWS TO EXPLORE
          </div>
        )}

      </section>

      {/* BOTTOM SIGNATURE */}

      <div className="lanada-rail-bottom">
        <span>LANADA / GARMENT ARCHIVE</span>
        <span>YOUR STYLE. YOUR COLLECTION.</span>
      </div>

      {/* DETAILS MODAL */}

      {activeItem && (
        <div
          className="lanada-detail-overlay"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeDetails();
            }
          }}
        >
          <section
            className="lanada-detail-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lanada-detail-title"
          >

            <button
              type="button"
              className="lanada-detail-close"
              onClick={closeDetails}
              aria-label="Close details"
            >
              ×
            </button>

            {/* PRODUCT IMAGE */}

            <div className="lanada-detail-image-panel">

              <span className="lanada-detail-index">
                LANADA / {activeItem.category}
              </span>

              <div className="lanada-detail-photo">
                <img
                  src={
                    activeSide === "back" && activeItem.backUrl
                      ? activeItem.backUrl
                      : activeItem.frontUrl
                  }
                  alt={`${activeItem.name} ${activeSide}`}
                />
              </div>

              {/* FRONT / BACK */}

              <div className="lanada-detail-side-switch">

                <button
                  type="button"
                  className={activeSide === "front" ? "active" : ""}
                  aria-pressed={activeSide === "front"}
                  onClick={() => changeSide("front")}
                >
                  FRONT
                </button>

                <button
                  type="button"
                  disabled={!activeItem.backUrl}
                  className={activeSide === "back" ? "active" : ""}
                  aria-pressed={activeSide === "back"}
                  onClick={() => changeSide("back")}
                >
                  BACK
                </button>

              </div>

            </div>

            {/* DETAILS */}

            <div className="lanada-detail-content">

              <span className="lanada-detail-eyebrow">
                THE LANADA COLLECTION
              </span>

              <h2 id="lanada-detail-title">
                {activeItem.name}
              </h2>

              <p className="lanada-detail-description">
                {activeItem.description ||
                  "A carefully selected piece from the LANADA collection."}
              </p>

              <div className="lanada-detail-facts">

                <div>
                  <span>CATEGORY</span>
                  <strong>{activeItem.category}</strong>
                </div>

                {activeItem.team && (
                  <div>
                    <span>TEAM / BRAND</span>
                    <strong>{activeItem.team}</strong>
                  </div>
                )}

                {activeItem.season && (
                  <div>
                    <span>SEASON</span>
                    <strong>{activeItem.season}</strong>
                  </div>
                )}

                <div>
                  <span>IMAGES</span>
                  <strong>
                    {activeItem.backUrl ? "FRONT & BACK" : "FRONT ONLY"}
                  </strong>
                </div>

              </div>

              <div className="lanada-detail-price">
                {formatPrice(activeItem.price)}
              </div>

              <button
                type="button"
                className="lanada-detail-done"
                onClick={closeDetails}
              >
                BACK TO THE RAIL
                <span>↗</span>
              </button>

            </div>
          </section>
        </div>
      )}

    </main>
  );
}
