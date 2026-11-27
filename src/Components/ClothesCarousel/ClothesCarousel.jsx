
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
  const closeTimer = useRef(null);

  const active = n ? ((index % n) + n) % n : 0;
  const p = safeProducts[active];
  const size = p ? picked[p.id] : null;

  // تنظيف المؤقت
  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  // إخفاء BottomNavBar أثناء فتح اختيار المقاس
  useEffect(() => {
    document.body.classList.toggle("clothes-carousel-open", open);

    return () => {
      document.body.classList.remove("clothes-carousel-open");
    };
  }, [open]);

  // تنظيف المؤقت عند حذف المكون
  useEffect(() => {
    return () => {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
      }
    };
  }, []);

  // عدد المنتجات في السلة
  const actualCartCount = Array.isArray(cartItems)
    ? cartItems.reduce(
        (sum, item) => sum + (Number(item.quantity) || 1),
        0
      )
    : 0;

  const displayedCart = externalCartCount ?? actualCartCount;

  // إغلاق اختيار المقاس
  const closeSizePanel = () => {
    clearCloseTimer();
    setOpen(false);
    setDone(false);
  };

  // التنقل بين المنتجات
  const go = (direction) => {
    if (!n) return;

    closeSizePanel();
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

  // المنتجات القريبة من المنتج النشيط فقط
  const visibleProducts = [];

  for (let offset = -VISIBLE; offset <= VISIBLE; offset++) {
    if (n === 0) break;

    const productIndex = ((active + offset) % n + n) % n;

    if (
      visibleProducts.some(
        (item) => item.productIndex === productIndex
      )
    ) {
      continue;
    }

    visibleProducts.push({
      product: safeProducts[productIndex],
      productIndex,
      offset
    });
  }

  // إضافة المنتج للسلة
  const add = () => {
    if (!p || !size || !p.sizes?.[size] || done) return;

    const productImage = p.image || placeholder(p.name);

    const productData = {
      ...p,
      id: p.id,
      name: p.name,
      price: Number(p.price || p.new_price || 0),
      new_price: Number(p.new_price || p.price || 0),
      old_price: Number(p.old_price || 0),
      image: productImage,
      images: p.images || [productImage],
      category: p.category || "T-Shirts"
    };

    addToCart(productData.id, size, productData);

    setDone(true);
    clearCloseTimer();

    closeTimer.current = setTimeout(() => {
      setDone(false);
      setOpen(false);
      closeTimer.current = null;
    }, 1300);
  };

  // إغلاق بـ Escape والتنقل بالأسهم
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeSizePanel();
      }

      if (!open && event.key === "ArrowLeft") {
        go(-1);
      }

      if (!open && event.key === "ArrowRight") {
        go(1);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, n]);

  if (!n) {
    return (
      <div className="cf">
        <p>No products available.</p>
      </div>
    );
  }

  return (
    <div
      className={"cf" + (open ? " cf--open" : "")}
      tabIndex={0}
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
          <div className="cf__scene">
            {visibleProducts.map(
              ({ product, productIndex, offset }) => {
                const distance = Math.abs(offset);

                return (
                  <div
                    key={product.id}
                    className={
                      "cf__slot" +
                      (productIndex === active ? " is-active" : "")
                    }
                    style={{
                      transform: `
                        translate(-50%, -50%)
                        translateX(${offset * SPREAD}px)
                        translateZ(${-distance * DEPTH}px)
                        rotateY(${-offset * ANGLE}deg)
                      `,
                      opacity: 1,
                      zIndex: 10 - distance
                    }}
                    onClick={() => {
                      if (moved.current) return;

                      if (productIndex === active) {
                        setOpen(true);
                      } else {
                        goTo(productIndex);
                      }
                    }}
                  >
                    <img
                      className="cf__img"
                      src={product.image || placeholder(product.name)}
                      alt={product.name}
                      loading={distance === 0 ? "eager" : "lazy"}
                      decoding="async"
                      draggable={false}
                    />
                  </div>
                );
              }
            )}
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
          type="button"
          className="cf__open"
          onClick={() => setOpen(true)}
        >
          Choisir la taille →
        </button>
      </div>

      <div className="cf__bar">
        {safeProducts.map((product, i) => (
          <button
            type="button"
            key={product.id}
            className={
              "cf__dot" + (i === active ? " is-active" : "")
            }
            onClick={() => goTo(i)}
            aria-label={product.name}
          />
        ))}
      </div>

      {/* خلفية التعتيم */}
      <div
        className="cf__scrim"
        onClick={closeSizePanel}
        aria-hidden="true"
      />

      {/* صورة المنتج المستقلة فوق كارد المقاسات */}
      <div
        className="cf__floating-preview"
        aria-hidden={!open}
      >
        <img
          src={p.image || placeholder(p.name)}
          alt={p.name}
          className="cf__floating-img"
          loading="eager"
          decoding="async"
          draggable={false}
        />
      </div>

      {/* كارد المقاسات مستقل وبدون صورة */}
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
            type="button"
            className="cf__close"
            onClick={closeSizePanel}
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
                "cf__size" +
                (size === currentSize ? " is-on" : "")
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
