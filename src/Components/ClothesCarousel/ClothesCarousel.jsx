
import { useContext, useEffect, useRef, useState } from "react";
import { PRODUCTS, SIZE_CHEST, placeholder } from "./products";
import { ShopContext } from "../../Context/ShopContext";
import "./ClothesCarousel.css";

const SIZES = ["M", "L", "XL", "XXL"];
const SPREAD = 250;
const DEPTH = 190;
const ANGLE = 36;
const VISIBLE = 2;

export default function ClothesCarousel({
  products = PRODUCTS,
  cartCount: externalCartCount
}) {
  const { addToCart, cartItems } = useContext(ShopContext);

  const safeProducts = Array.isArray(products) ? products : [];
  const n = safeProducts.length;

  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState({});
  const [done, setDone] = useState(false);

  const startX = useRef(null);
  const moved = useRef(false);
  const scene = useRef(null);
  const timer = useRef(null);

  const active = n ? ((index % n) + n) % n : 0;
  const p = safeProducts[active];

  const size = p ? picked[p.id] : null;

  // إخفاء BottomNavBar فقط أثناء فتح اختيار المقاس
  useEffect(() => {
    document.body.classList.toggle("clothes-carousel-open", open);

    return () => {
      document.body.classList.remove("clothes-carousel-open");
    };
  }, [open]);

  const actualCartCount = Array.isArray(cartItems)
    ? cartItems.reduce(
        (sum, item) => sum + (item.quantity || 1),
        0
      )
    : 0;

  const displayedCart = externalCartCount ?? actualCartCount;

  const go = (direction) => {
    if (!n) return;

    setOpen(false);
    setDone(false);
    setIndex((current) => current + direction);
  };

  const goTo = (target) => {
    if (!n) return;

    let difference = (target - active + n) % n;

    if (difference > n / 2) {
      difference -= n;
    }

    if (difference) go(difference);
  };

  // إضافة المنتج للسلة الحقيقية
  const add = () => {
    if (!p || !size || !p.sizes?.[size] || done) return;

    const productData = {
      ...p,
      id: p.id,
      name: p.name,
      price: Number(p.price || p.new_price || 0),
      new_price: Number(p.new_price || p.price || 0),
      old_price: Number(p.old_price || 0),
      image: p.image || placeholder(p.name),
      images: p.images || [
        p.image || placeholder(p.name)
      ],
      category: p.category || "T-Shirts",
    };

    addToCart(productData.id, size, productData);

    setDone(true);

    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      setDone(false);
      setOpen(false);
    }, 1300);
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);

      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  const tilt = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    scene.current?.style.setProperty(
      "--px",
      (((event.clientX - rect.left) / rect.width) * 2 - 1).toFixed(3)
    );

    scene.current?.style.setProperty(
      "--py",
      (((event.clientY - rect.top) / rect.height) * 2 - 1).toFixed(3)
    );
  };

  const untilt = () => {
    scene.current?.style.setProperty("--px", 0);
    scene.current?.style.setProperty("--py", 0);
  };

  if (!n) {
    return (
      <div className="cf">
        <p>No products available.</p>
      </div>
    );
  }

  const label = "NOUVELLE COLLECTION — ";

  return (
    <div
      className={"cf" + (open ? " cf--open" : "")}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") go(-1);
        if (event.key === "ArrowRight") go(1);
      }}
    >
      <div className="cf__top">
        <span>
          {String(active + 1).padStart(2, "0")} /{" "}
          {String(n).padStart(2, "0")}
        </span>

        <span className="cf__cart">
          Panier {displayedCart}
        </span>
      </div>

      <div className="cf__lift">
        <div
          className="cf__stage"
          onPointerMove={tilt}
          onPointerLeave={untilt}
          onPointerDown={(event) => {
            startX.current = event.clientX;
            moved.current = false;
          }}
          onPointerUp={(event) => {
            if (startX.current === null) return;

            const difference = event.clientX - startX.current;
            startX.current = null;
            moved.current = Math.abs(difference) > 6;

            if (Math.abs(difference) > 50) {
              go(difference < 0 ? 1 : -1);
            }
          }}
          onPointerCancel={() => {
            startX.current = null;
          }}
        >
          <div className="cf__marquee" aria-hidden="true">
            {[0, 1].map((key) => (
              <span key={key}>{label.repeat(4)}</span>
            ))}
          </div>

          <div className="cf__scene" ref={scene}>
            {safeProducts.map((product, i) => {
              const half = Math.floor(n / 2);

              const offset =
                ((((i - index + half) % n) + n) % n) - half;

              const distance = Math.abs(offset);

              return (
                <div
                  key={product.id}
                  className={
                    "cf__slot" + (i === active ? " is-active" : "")
                  }
                  style={{
                    transform: `
                      translate(-50%, -50%)
                      translateX(${offset * SPREAD}px)
                      translateZ(${-distance * DEPTH}px)
                      rotateY(${-offset * ANGLE}deg)
                    `,
                    opacity: distance > VISIBLE ? 0 : 1,
                    filter: `brightness(${(1 - distance * 0.3).toFixed(2)})`,
                    zIndex: 10 - distance
                  }}
                  onClick={() => {
                    if (moved.current) return;

                    if (i === active) {
                      setOpen(true);
                    } else {
                      goTo(i);
                    }
                  }}
                >
                  <img
                    className="cf__img"
                    src={product.image || placeholder(product.name)}
                    alt={product.name}
                    draggable={false}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="cf__info" aria-live="polite">
        <div className="cf__idx">
          {String(active + 1).padStart(2, "0")}
        </div>

        <div className="cf__mid">
          <h2 className="cf__name">{p.name}</h2>

          <p className="cf__price">
            {Number(p.price || 0).toLocaleString("fr-FR")} MAD
          </p>
        </div>

        <button
          className="cf__open"
          onClick={() => setOpen(true)}
        >
          Choisir la taille →
        </button>
      </div>

      <div className="cf__bar">
        {safeProducts.map((product, i) => (
          <button
            key={product.id}
            className={"cf__dot" + (i === active ? " is-active" : "")}
            onClick={() => goTo(i)}
            aria-label={product.name}
          />
        ))}
      </div>

      {/* خلفية التعتيم */}
      <div
        className="cf__scrim"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* صورة المنتج المستقلة */}
      <div
        className="cf__floating-preview"
        aria-hidden={!open}
      >
        <img
          src={p.image || placeholder(p.name)}
          alt={p.name}
          className="cf__floating-img"
          draggable={false}
        />
      </div>

      {/* كارد المقاسات بدون صورة */}
      <div
        className="cf__sheet"
        role="dialog"
        aria-modal={open}
        aria-label={`Choisir la taille de ${p.name}`}
        aria-hidden={!open}
      >
        <div className="cf__head">
          <div>
            <h3 className="cf__sname">{p.name}</h3>

            <p className="cf__sprice">
              {Number(p.price || 0).toLocaleString("fr-FR")} MAD
            </p>
          </div>

          <button
            className="cf__close"
            onClick={() => setOpen(false)}
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>

        <p className="cf__label">
          Taille · tour de poitrine
        </p>

        <div
          className="cf__sizes"
          role="radiogroup"
          aria-label="Taille"
        >
          {SIZES.map((currentSize) => (
            <button
              key={currentSize}
              type="button"
              role="radio"
              aria-checked={size === currentSize}
              disabled={!p.sizes?.[currentSize]}
              className={
                "cf__size" + (size === currentSize ? " is-on" : "")
              }
              onClick={() =>
                setPicked((previous) => ({
                  ...previous,
                  [p.id]: currentSize
                }))
              }
            >
              <b>{currentSize}</b>
              <small>{SIZE_CHEST[currentSize]} cm</small>
            </button>
          ))}
        </div>

        <button
          type="button"
          className={"cf__cta" + (done ? " is-done" : "")}
          disabled={!size || done}
          onClick={add}
        >
          {done
            ? `Ajouté · ${size}`
            : size
              ? "Ajouter au panier"
              : "Choisis ta taille"}
        </button>
      </div>
    </div>
  );
}
