
import React, { useContext, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import "./Jerseys.css";

const NATIONAL_TEAMS = [
  "Morocco", "Brazil", "Argentina", "France", "England",
  "Spain", "Portugal", "Germany", "Italy", "Netherlands",
  "Japan", "Senegal", "Tunisia", "Algeria", "Egypt",
  "Nigeria", "Mexico", "Belgium", "Uruguay", "Croatia",
  "Cameroon", "Ivory Coast", "USA", "Ghana", "South Korea",
];

const CLUBS = [
  "Real Madrid", "Barcelona", "Manchester United",
  "Manchester City", "Liverpool", "Arsenal", "Chelsea",
  "PSG", "Paris Saint-Germain", "Bayern Munich",
  "Juventus", "AC Milan", "Inter Milan", "Borussia Dortmund",
  "Raja Casablanca", "Wydad Casablanca", "Ajax",
  "Atletico Madrid", "Tottenham", "Al Hilal",
];

const TYPE_FILTERS = [
  { value: "all", label: "ALL JERSEYS" },
  { value: "national", label: "NATIONAL TEAMS" },
  { value: "club", label: "CLUBS" },
  { value: "retro", label: "RETRO KITS" },
  { value: "training", label: "TRAINING" },
];

const normalize = (value) =>
  String(value || "").trim().toLowerCase();

const getProductName = (product) =>
  product.name ||
  product.title ||
  product.productName ||
  product.product_name ||
  "Football Jersey";

const getProductId = (product) =>
  product.id ||
  product._id ||
  product.productId ||
  product.product_id;

const getProductImage = (product) => {
  const candidate =
    product.image_url ||
    product.imageUrl ||
    product.product_image ||
    product.image ||
    product.img ||
    (Array.isArray(product.images) ? product.images[0] : "");

  if (typeof candidate === "string") return candidate;
  if (candidate && typeof candidate === "object") {
    return candidate.url || candidate.src || "";
  }

  return "";
};

const getProductPrice = (product) =>
  Number(
    product.price ??
    product.displayPrice ??
    product.amount ??
    0
  );

const getOldPrice = (product) =>
  Number(
    product.oldPrice ??
    product.old_price ??
    product.compareAtPrice ??
    product.compare_price ??
    product.originalPrice ??
    0
  );

const getTeamName = (product) => {
  const explicit =
    product.team ||
    product.club ||
    product.country ||
    product.nationalTeam ||
    product.national_team ||
    "";

  if (explicit) return String(explicit);

  const text = normalize(
    [
      getProductName(product),
      product.category,
      product.description,
    ].join(" ")
  );

  const knownTeams = [...NATIONAL_TEAMS, ...CLUBS];

  return (
    knownTeams.find((team) =>
      text.includes(normalize(team))
    ) || ""
  );
};

const getTeamType = (product) => {
  const explicit = normalize(
    product.teamType ||
    product.team_type ||
    product.collectionType ||
    product.collection_type ||
    ""
  );

  if (explicit.includes("national") || explicit.includes("country")) {
    return "national";
  }

  if (explicit.includes("club")) {
    return "club";
  }

  const team = getTeamName(product);

  if (NATIONAL_TEAMS.some((item) => normalize(item) === normalize(team))) {
    return "national";
  }

  if (CLUBS.some((item) => normalize(item) === normalize(team))) {
    return "club";
  }

  const text = normalize(
    [
      product.category,
      product.type,
      product.productType,
      getProductName(product),
    ].join(" ")
  );

  if (text.includes("national team")) return "national";
  if (text.includes("club")) return "club";

  return "other";
};

const getProductKind = (product) => {
  const text = normalize(
    [
      getProductName(product),
      product.category,
      product.type,
      product.productType,
      product.collection,
      product.description,
      getTeamName(product),
    ].join(" ")
  );

  if (
    product.isJersey === true ||
    product.is_jersey === true ||
    /\b(jersey|jerseys|maillot|maillots|football kit|home kit|away kit|third kit|retro kit)\b/.test(text) ||
    Boolean(getTeamName(product))
  ) {
    if (/\b(retro|vintage|classic)\b/.test(text)) return "retro";
    if (/\b(training|warm up|warm-up|training shirt)\b/.test(text)) {
      return "training";
    }

    return "jersey";
  }

  return "";
};

const getProductSizes = (product) => {
  const value =
    product.sizes ||
    product.availableSizes ||
    product.available_sizes ||
    product.sizeOptions ||
    product.size_options ||
    [];

  if (Array.isArray(value)) {
    return value.map((size) => String(size).toUpperCase());
  }

  if (typeof value === "string") {
    return value
      .split(/[,/|]/)
      .map((size) => size.trim().toUpperCase())
      .filter(Boolean);
  }

  return [];
};

const getSeason = (product) =>
  String(
    product.season ||
    product.year ||
    product.collectionSeason ||
    product.collection_season ||
    ""
  ).trim();

const formatPrice = (price) =>
  `${Number(price || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} MAD`;

const JerseyImage = ({ product }) => {
  const image = getProductImage(product);

  return (
    <div className="jersey-card-image">
      {image ? (
        <img
          src={image}
          alt={getProductName(product)}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.style.display = "none";

            const fallback =
              event.currentTarget.parentElement.querySelector(
                ".jersey-image-fallback"
              );

            if (fallback) fallback.style.display = "grid";
          }}
        />
      ) : null}

      <div
        className="jersey-image-fallback"
        style={{ display: image ? "none" : "grid" }}
      >
        <span>LANADA</span>
        <strong>FOOTBALL</strong>
        <small>JERSEY</small>
      </div>
    </div>
  );
};

export default function Jerseys() {
  const shopContext = useContext(ShopContext) || {};

  const products = Array.isArray(shopContext.all_product)
    ? shopContext.all_product
    : Array.isArray(shopContext.products)
    ? shopContext.products
    : [];

  const [activeType, setActiveType] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("all");
  const [selectedSeason, setSelectedSeason] = useState("all");
  const [selectedSize, setSelectedSize] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const jerseys = useMemo(() => {
    return products.filter((product) => getProductKind(product));
  }, [products]);

  const featuredProducts = jerseys
    .filter((product) => getProductImage(product))
    .slice(0, 3);

  const teams = useMemo(() => {
    return [
      ...new Set(
        jerseys
          .map(getTeamName)
          .filter(Boolean)
      ),
    ].sort((a, b) => a.localeCompare(b));
  }, [jerseys]);

  const seasons = useMemo(() => {
    return [
      ...new Set(
        jerseys
          .map(getSeason)
          .filter(Boolean)
      ),
    ].sort((a, b) => b.localeCompare(a));
  }, [jerseys]);

  const sizes = useMemo(() => {
    return [
      ...new Set(
        jerseys.flatMap(getProductSizes)
      ),
    ].sort();
  }, [jerseys]);

  const catalogMaxPrice = useMemo(() => {
    return Math.max(
      500,
      ...jerseys.map(getProductPrice).filter(Number.isFinite)
    );
  }, [jerseys]);

  const filteredProducts = useMemo(() => {
    let result = [...jerseys];

    if (activeType === "national") {
      result = result.filter(
        (product) => getTeamType(product) === "national"
      );
    } else if (activeType === "club") {
      result = result.filter(
        (product) => getTeamType(product) === "club"
      );
    } else if (activeType === "retro") {
      result = result.filter(
        (product) => getProductKind(product) === "retro"
      );
    } else if (activeType === "training") {
      result = result.filter(
        (product) => getProductKind(product) === "training"
      );
    }

    if (selectedTeam !== "all") {
      result = result.filter(
        (product) => getTeamName(product) === selectedTeam
      );
    }

    if (selectedSeason !== "all") {
      result = result.filter(
        (product) => getSeason(product) === selectedSeason
      );
    }

    if (selectedSize !== "all") {
      result = result.filter(
        (product) =>
          getProductSizes(product).includes(selectedSize)
      );
    }

    const query = normalize(search);

    if (query) {
      result = result.filter((product) => {
        const searchable = normalize(
          [
            getProductName(product),
            product.description,
            product.category,
            product.team,
            product.club,
            product.country,
            product.season,
            product.year,
          ].join(" ")
        );

        return searchable.includes(query);
      });
    }

    result = result.filter(
      (product) => getProductPrice(product) <= maxPrice
    );

    if (sortBy === "price-low") {
      result.sort(
        (a, b) => getProductPrice(a) - getProductPrice(b)
      );
    } else if (sortBy === "price-high") {
      result.sort(
        (a, b) => getProductPrice(b) - getProductPrice(a)
      );
    } else if (sortBy === "newest") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt || 0) -
          new Date(a.createdAt || 0)
      );
    }

    return result;
  }, [
    jerseys,
    activeType,
    selectedTeam,
    selectedSeason,
    selectedSize,
    search,
    maxPrice,
    sortBy,
  ]);

  const resetFilters = () => {
    setActiveType("all");
    setSearch("");
    setSelectedTeam("all");
    setSelectedSeason("all");
    setSelectedSize("all");
    setSortBy("featured");
    setMaxPrice(catalogMaxPrice);
  };

  const contextIsMissing = !Array.isArray(shopContext.all_product) &&
    !Array.isArray(shopContext.products);

  return (
    <main className="jerseys-page">

      {/* HERO BANNER */}

      <section className="jerseys-hero">
        <div className="jerseys-hero-bg" />

        <div className="jerseys-hero-content">
          <span className="jerseys-eyebrow">
            LANADA FOOTBALL COLLECTION
          </span>

          <h1>
            WEAR THE
            <br />
            <span>GAME.</span>
          </h1>

          <p>
            National pride. Club heritage.
            <br />
            Find the jersey that represents you.
          </p>

          <a href="#jersey-grid" className="jerseys-hero-button">
            EXPLORE JERSEYS
            <span>↗</span>
          </a>

          <div className="jerseys-hero-meta">
            <span>OFFICIAL-STYLE COLLECTIONS</span>
            <span>01 — 04</span>
          </div>
        </div>

        <div className="jerseys-hero-visual">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product, index) => (
              <div
                className={`jerseys-hero-product hero-product-${index + 1}`}
                key={getProductId(product) || index}
              >
                <img
                  src={getProductImage(product)}
                  alt={getProductName(product)}
                />
              </div>
            ))
          ) : (
            <div className="jerseys-hero-placeholder">
              <div className="jerseys-placeholder-shirt">
                <span>LANADA</span>
              </div>
              <span>THE FOOTBALL EDIT</span>
            </div>
          )}

          <div className="jerseys-hero-stamp">
            <span>THE</span>
            <strong>JERSEY</strong>
            <span>COLLECTION</span>
          </div>
        </div>
      </section>

      {/* CATEGORY INTRO */}

      <section className="jerseys-section-heading">
        <div>
          <span className="jerseys-section-kicker">
            FIND YOUR COLORS
          </span>

          <h2>
            THE JERSEY
            <br />
            <em>UNIVERSE.</em>
          </h2>
        </div>

        <p>
          From national teams to legendary clubs,
          discover the shirts behind the passion.
        </p>
      </section>

      {/* CATEGORY FILTER TABS */}

      <section className="jerseys-categories">
        {TYPE_FILTERS.map((filter) => (
          <button
            key={filter.value}
            type="button"
            className={
              activeType === filter.value ? "active" : ""
            }
            onClick={() => setActiveType(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </section>

      {/* PRODUCT TOOLBAR */}

      <section className="jerseys-toolbar" id="jersey-grid">

        <div className="jerseys-results">
          <strong>{filteredProducts.length}</strong>
          <span>JERSEYS FOUND</span>
        </div>

        <div className="jerseys-toolbar-actions">

          <label className="jerseys-search">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m16 16 5 5" />
            </svg>

            <input
              type="search"
              placeholder="Search team or jersey..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>

          <button
            type="button"
            className="jerseys-mobile-filter-button"
            onClick={() =>
              setMobileFiltersOpen(!mobileFiltersOpen)
            }
          >
            FILTERS
            <span>＋</span>
          </button>

          <label className="jerseys-sort">
            <span>SORT BY</span>

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </label>

        </div>
      </section>

      {/* ADVANCED FILTERS */}

      <section
        className={`jerseys-filter-panel ${
          mobileFiltersOpen ? "filters-open" : ""
        }`}
      >

        <div className="jerseys-filter-field">
          <label htmlFor="jersey-team-filter">TEAM / CLUB</label>

          <select
            id="jersey-team-filter"
            value={selectedTeam}
            onChange={(event) =>
              setSelectedTeam(event.target.value)
            }
          >
            <option value="all">All Teams</option>

            {teams.map((team) => (
              <option value={team} key={team}>
                {team}
              </option>
            ))}
          </select>
        </div>

        <div className="jerseys-filter-field">
          <label htmlFor="jersey-season-filter">SEASON</label>

          <select
            id="jersey-season-filter"
            value={selectedSeason}
            onChange={(event) =>
              setSelectedSeason(event.target.value)
            }
            disabled={seasons.length === 0}
          >
            <option value="all">All Seasons</option>

            {seasons.map((season) => (
              <option value={season} key={season}>
                {season}
              </option>
            ))}
          </select>
        </div>

        <div className="jerseys-filter-field">
          <label htmlFor="jersey-size-filter">SIZE</label>

          <select
            id="jersey-size-filter"
            value={selectedSize}
            onChange={(event) =>
              setSelectedSize(event.target.value)
            }
            disabled={sizes.length === 0}
          >
            <option value="all">All Sizes</option>

            {sizes.map((size) => (
              <option value={size} key={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="jerseys-filter-field jerseys-price-field">
          <label htmlFor="jersey-price-filter">
            MAX PRICE
            <strong>{formatPrice(maxPrice)}</strong>
          </label>

          <input
            id="jersey-price-filter"
            type="range"
            min="0"
            max={catalogMaxPrice}
            step="10"
            value={Math.min(maxPrice, catalogMaxPrice)}
            onChange={(event) =>
              setMaxPrice(Number(event.target.value))
            }
          />
        </div>

        <button
          type="button"
          className="jerseys-reset-button"
          onClick={resetFilters}
        >
          RESET FILTERS
          <span>↺</span>
        </button>

      </section>

      {/* PRODUCT GRID */}

      {contextIsMissing ? (
        <div className="jerseys-empty-state">
          <h3>PRODUCT CATALOGUE NOT CONNECTED</h3>
          <p>
            Connect this page to the existing ShopContext product list
            to display your football jerseys.
          </p>
        </div>
      ) : filteredProducts.length > 0 ? (
        <section className="jerseys-grid">

          {filteredProducts.map((product, index) => {
            const id = getProductId(product);
            const price = getProductPrice(product);
            const oldPrice = getOldPrice(product);
            const discount =
              oldPrice > price && oldPrice > 0
                ? Math.round(((oldPrice - price) / oldPrice) * 100)
                : 0;

            const team = getTeamName(product);
            const season = getSeason(product);
            const kind = getProductKind(product);
            const sizesAvailable = getProductSizes(product);

            return (
              <article
                className="jersey-card"
                key={id || `${getProductName(product)}-${index}`}
              >

                <Link
                  to={id ? `/product/${id}` : "/shop"}
                  className="jersey-card-visual-link"
                  aria-label={`View ${getProductName(product)}`}
                >
                  <div className="jersey-card-top">
                    <div className="jersey-card-badges">
                      {discount > 0 && (
                        <span className="jersey-discount-badge">
                          -{discount}%
                        </span>
                      )}

                      {product.isNew && (
                        <span className="jersey-new-badge">
                          NEW
                        </span>
                      )}
                    </div>

                    <span className="jersey-card-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <JerseyImage product={product} />

                  <span className="jersey-card-view">
                    VIEW PRODUCT ↗
                  </span>
                </Link>

                <div className="jersey-card-info">

                  <div className="jersey-card-team">
                    {team || "FOOTBALL COLLECTION"}
                  </div>

                  <h3>{getProductName(product)}</h3>

                  <div className="jersey-card-description">
                    {season && <span>{season}</span>}

                    {kind === "retro" && (
                      <span>RETRO COLLECTION</span>
                    )}

                    {kind === "training" && (
                      <span>TRAINING COLLECTION</span>
                    )}
                  </div>

                  {sizesAvailable.length > 0 && (
                    <div className="jersey-card-sizes">
                      {sizesAvailable.slice(0, 6).map((size) => (
                        <span key={size}>{size}</span>
                      ))}
                    </div>
                  )}

                  <div className="jersey-card-price">
                    <strong>{formatPrice(price)}</strong>

                    {oldPrice > price && (
                      <del>{formatPrice(oldPrice)}</del>
                    )}
                  </div>

                  <Link
                    to={id ? `/product/${id}` : "/shop"}
                    className="jersey-card-button"
                  >
                    SELECT JERSEY
                    <span>→</span>
                  </Link>

                </div>
              </article>
            );
          })}

        </section>
      ) : (
        <section className="jerseys-empty-state">
          <span>NO RESULTS</span>

          <h3>NO JERSEYS FOUND.</h3>

          <p>
            Try another team, category, season or price range.
          </p>

          <button
            type="button"
            onClick={resetFilters}
          >
            CLEAR ALL FILTERS
          </button>
        </section>
      )}

      {/* COLLECTION FOOTER */}

      <section className="jerseys-bottom-banner">
        <span>LANADA FOOTBALL</span>

        <h2>
          YOUR TEAM.
          <br />
          <em>YOUR COLORS.</em>
        </h2>

        <p>
          Find the jersey. Feel the passion.
        </p>

        <a href="#jersey-grid">
          EXPLORE THE COLLECTION
          <span>↗</span>
        </a>
      </section>

    </main>
  );
}
