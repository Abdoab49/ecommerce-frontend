
import React, { useEffect, useMemo, useRef, useState } from "react";
import "./MaisonVerrel.css";

const proxy = "https://images.higgs.ai/?default=1&output=webp&url=";

const source = {
  side: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261113_115504_3ab92758-5854-4a1c-85db-ff8efd929e86.png",
  front: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261113_115743_54dc8c72-0be0-4858-bd0c-10ecb399c16c.png",
  back: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20261113_115613_7d45aea6-1bea-41ff-b878-72d7c8bcb9da.png",
};

const sheets = Object.fromEntries(
  Object.entries(source).map(([key, value]) => [
    key,
    `${proxy}${encodeURIComponent(value)}&w=1360&q=85`,
  ])
);

const garments = [
  ["Noir Tailored Blazer", [44, 619, 185], [79, 552, 175], [76, 515, 176]],
  ["Ivory Belted Trench", [45, 860, 514], [76, 900, 511], [60, 890, 508]],
  ["Oxblood Silk Slip", [45, 876, 834], [76, 913, 848], [60, 901, 845]],
  ["Taupe Wool Blazer", [45, 606, 1169], [80, 550, 1179], [76, 520, 1180]],
  ["Champagne Bias Slip", [1024, 937, 177], [1024, 936, 177], [1026, 931, 175]],
  ["Pearl Silk Slip", [1024, 936, 511], [1024, 940, 513], [1026, 929, 508]],
  ["Taupe Belted Trench", [1024, 907, 825], [1024, 894, 851], [1024, 901, 845]],
  ["Oxblood Satin Gown", [1024, 962, 1166], [1024, 938, 1185], [1024, 934, 1184]],
];

const order = [
  0, 1, 2, 3, 4, 0, 5, 6, 7, 0,
  4, 1, 2, 3, 5, 6, 7, 1, 4, 3,
];

const initialCart = [
  { id: "a", k: 3, size: "M", qty: 1 },
  { id: "b", k: 4, size: "S", qty: 1 },
  { id: "c", k: 1, size: "M", qty: 1 },
];

function Crop({ k, view = "front", scale = 1 }) {
  const garment = garments[k];
  const crop = garment[view === "side" ? 1 : view === "front" ? 2 : 3];
  const [y, h, hook] = crop;

  return (
    <div
      className="mv-crop"
      style={{
        width: 340 * scale,
        height: (h + 6) * scale,
        left: -170 * scale,
        backgroundImage: `url("${sheets[view]}")`,
        backgroundSize: `${1360 * scale}px auto`,
        backgroundPosition: `${-(hook - 170) * scale}px ${-y * scale}px`,
      }}
    />
  );
}

function useImages() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let alive = true;

    const promises = Object.values(sheets).map(
      (imageSource) =>
        new Promise((resolve) => {
          const image = new window.Image();

          image.onload = async () => {
            try {
              await image.decode();
            } catch {
              // Continue even if decode is unavailable.
            }
            resolve();
          };

          image.onerror = resolve;
          image.src = imageSource;
        })
    );

    Promise.all(promises).then(() => {
      if (alive) setLoaded(true);
    });

    return () => {
      alive = false;
    };
  }, []);

  return loaded;
}

export default function MaisonVerrel() {
  const loaded = useImages();

  const [intro, setIntro] = useState(false);
  const [wh, setWh] = useState([
    typeof window !== "undefined" ? window.innerWidth : 1440,
    typeof window !== "undefined" ? window.innerHeight : 900,
  ]);
  const [u, setU] = useState(1);

  const [scroll, setScroll] = useState(0);
  const [hover, setHover] = useState(-1);
  const [quick, setQuick] = useState(null);
  const [view, setView] = useState("front");
  const [size, setSize] = useState("S");

  const [cart, setCart] = useState(initialCart);
  const [drawer, setDrawer] = useState(false);
  const [adding, setAdding] = useState(false);

  const target = useRef(0);
  const currentScroll = useRef(0);
  const drag = useRef(null);
  const zone = useRef(null);

  const [W, H] = wh;
  const mobile = W <= 820;

  const gs = mobile ? 0.3 : 0.455;
  const gap = mobile ? 80 : 121;
  const start = mobile ? 46 : 113;
  const top = mobile ? 292 : 270;
  const sag = mobile ? 30 : 74;

  const reduced = useMemo(() => {
    return (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  // Responsive dimensions
  useEffect(() => {
    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (!width || !height) return;

      setWh([width, height]);
      setU(
        Math.min(
          width / (width <= 820 ? 390 : 1440),
          height / (width <= 820 ? 780 : 900)
        )
      );
    };

    resize();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Intro animation
  useEffect(() => {
    if (reduced) {
      setIntro(true);
      return undefined;
    }

    const timer = window.setTimeout(
      () => setIntro(true),
      loaded ? 100 : 2500
    );

    return () => window.clearTimeout(timer);
  }, [loaded, reduced]);

  const pageW = W - (drawer && !mobile ? 560 * u : 0);
  const max = Math.max(0, (2 * start + 19 * gap) * u - pageW);

  // Smooth rail movement
  useEffect(() => {
    if (reduced) {
      currentScroll.current = target.current;
      setScroll(target.current);
      return undefined;
    }

    let raf;
    let last = window.performance.now();

    const tick = (now) => {
      const dt = Math.min(3, (now - last) / 16.667 || 1);
      last = now;

      const current = currentScroll.current;
      const next =
        current +
        (target.current - current) * (1 - Math.pow(0.915, dt));

      currentScroll.current = next;
      setScroll(next);

      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(raf);
    };
  }, [reduced]);

  // Keep scroll position within the current viewport limits
  useEffect(() => {
    target.current = Math.max(0, Math.min(max, target.current));
    currentScroll.current = Math.max(
      0,
      Math.min(max, currentScroll.current)
    );
  }, [max]);

  const railY = (x) =>
    (top +
      sag *
        (1 -
          ((x - pageW / 2) / (pageW / 2 || 1)) ** 2)) *
    u;

  const path = `M0 ${railY(0)} Q ${pageW / 2} ${
    2 * railY(pageW / 2) - railY(0)
  } ${pageW} ${railY(0)}`;

  // Mouse wheel / trackpad
  const wheel = (event) => {
    if (quick !== null) return;

    event.preventDefault();

    const delta =
      Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.deltaY;

    target.current = Math.max(
      0,
      Math.min(max, target.current + delta * 0.9)
    );
  };

  // Drag interaction
  const down = (event) => {
    if (quick !== null) return;

    drag.current = {
      x: event.clientX,
      start: target.current,
      last: event.clientX,
      time: window.performance.now(),
      vx: 0,
      moved: false,
    };

    zone.current?.setPointerCapture?.(event.pointerId);
  };

  const move = (event) => {
    const data = drag.current;

    if (!data) return;

    const dx = event.clientX - data.x;

    if (Math.abs(dx) > 6) {
      data.moved = true;
      setHover(-1);

      target.current = Math.max(
        0,
        Math.min(max, data.start - dx * 1.15)
      );
    }

    const now = window.performance.now();

    data.vx = (event.clientX - data.last) / (now - data.time || 1);
    data.last = event.clientX;
    data.time = now;
  };

  const up = () => {
    if (drag.current?.moved) {
      target.current = Math.max(
        0,
        Math.min(max, target.current - drag.current.vx * 260)
      );
    }

    drag.current = null;
  };

  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  const total = cart.reduce(
    (sum, item) => sum + item.qty * 690,
    0
  );

  const changeQty = (id, delta) => {
    setCart((oldCart) =>
      oldCart
        .map((item) =>
          item.id === id
            ? { ...item, qty: Math.max(0, item.qty + delta) }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  // Add item to cart
  const add = () => {
    if (quick === null || adding) return;

    const garmentIndex = quick;
    const selectedSize = size;

    setAdding(true);

    window.setTimeout(() => {
      setCart((oldCart) => [
        {
          id: Date.now(),
          k: garmentIndex,
          size: selectedSize,
          qty: 1,
        },
        ...oldCart,
      ]);

      setAdding(false);
      setQuick(null);
    }, reduced ? 0 : 1000);
  };

  // Keyboard interactions
  useEffect(() => {
    const key = (event) => {
      if (event.key === "Escape") {
        if (quick !== null) {
          setQuick(null);
        } else {
          setDrawer(false);
        }
      }

      if (
        quick === null &&
        (event.key === "ArrowRight" || event.key === "ArrowLeft")
      ) {
        target.current = Math.max(
          0,
          Math.min(
            max,
            target.current +
              (event.key === "ArrowRight" ? 1 : -1) * gap * u
          )
        );
      }
    };

    window.addEventListener("keydown", key);

    return () => {
      window.removeEventListener("keydown", key);
    };
  }, [quick, max, gap, u]);

  return (
    <main
      className={`maison-verrel ${intro ? "ready" : ""} ${
        quick !== null ? "qv-open" : ""
      }`}
      style={{ "--u": `${u}px` }}
    >
      <div className="mv-utility">
        <a>Our Ateliers</a>
        <a>Care</a>
        <a>Journal</a>
        <a>Sign In</a>
      </div>

      <header className="mv-nav">
        <div className="mv-wordmark">MAISON VERREL</div>

        <nav>
          <a>Home</a>
          <a>Atelier</a>
          <a className="active">The Rail</a>
          <a>Contact</a>
        </nav>

        <div className="mv-tools">
          <button className="mv-search">
            <i />
            Search
          </button>

          <button className="mv-account">♙</button>

          <button
            className="mv-bag"
            onClick={() => setDrawer(true)}
            aria-label="Open cart"
          >
            ♧<b>{count}</b>
          </button>
        </div>
      </header>

      <section className="mv-stage">
        <div className="mv-eyebrow">
          <span>NEW COLLECTION</span>
          <i />
          <span>EVENING &amp; TAILORING</span>
        </div>

        <h1>
          <span>Silhouettes</span> <span>that</span> <span>hang</span>{" "}
          <span>right.</span>
        </h1>

        <div
          className="mv-zone"
          ref={zone}
          onWheel={wheel}
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
        >
          <svg
            className="mv-rail"
            width={pageW}
            height={H}
            viewBox={`0 0 ${pageW} ${H}`}
          >
            <defs>
              <linearGradient
                id="mv-gold"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop stopColor="#E9DCBC" />
                <stop offset=".45" stopColor="#C2A877" />
                <stop offset="1" stopColor="#7F6743" />
              </linearGradient>
            </defs>

            <path
              d={path}
              transform={`translate(0 ${4 * u})`}
              stroke="rgba(80,60,35,.12)"
              strokeWidth={3 * u}
              fill="none"
            />

            <path
              d={path}
              stroke="url(#mv-gold)"
              strokeWidth={5.2 * u}
              fill="none"
            />

            <path
              d={path}
              transform={`translate(0 ${-1.3 * u})`}
              stroke="rgba(255,247,226,.85)"
              strokeWidth={1.1 * u}
              fill="none"
            />
          </svg>

          {order.map((k, index) => {
            const x = (start + index * gap) * u - scroll;
            const y = railY(x) - 3 * u;

            return (
              <div
                className={`mv-g ${hover === index ? "hover" : ""}`}
                key={index}
                style={{
                  left: x,
                  top: y,
                  zIndex: hover === index ? 5 : 1,
                }}
                onMouseEnter={() => !mobile && setHover(index)}
                onMouseLeave={() => setHover(-1)}
              >
                <div className="mv-hanger">
                  <div className="mv-side">
                    <Crop k={k} view="side" scale={gs * u} />
                  </div>

                  <div className="mv-front">
                    <Crop k={k} view="front" scale={gs * u} />
                  </div>

                  <button
                    className="mv-hit"
                    aria-label={`${garments[k][0]}, $690`}
                    onClick={() => {
                      if (drag.current?.moved) return;

                      if (mobile && hover !== index) {
                        setHover(index);
                        return;
                      }

                      setQuick(k);
                      setView("front");
                      setSize("S");
                    }}
                  />

                  <div
                    className="mv-tag"
                    style={{
                      transform: `rotate(${
                        [-5, 4, -3, 6, -4, 3, -6, 4, -3, 5][index % 10]
                      }deg)`,
                    }}
                  >
                    <i />
                    $690
                  </div>
                </div>

                <div className="mv-shadow" />
              </div>
            );
          })}
        </div>

        <div className="mv-footer-left">
          <i />

          {hover >= 0 ? (
            <span>
              <b>{garments[order[hover]][0]}</b>
              <small>$690.00</small>
            </span>
          ) : (
            <span>
              {mobile
                ? "Tap a piece · tap again to look closer"
                : "Hover a piece · click to look closer"}
            </span>
          )}
        </div>

        <div className="mv-progress">
          <i
            style={{
              left: `${max ? (scroll / max) * 42 : 0}%`,
            }}
          />
        </div>

        <div className="mv-footer-right">
          <strong>
            Cut from Italian silk and wool.
            <br />
            Tailored to order. Made to last.
          </strong>

          <a>Shop the Collection ↗</a>
        </div>
      </section>

      {quick !== null && (
        <section className="mv-qv" role="dialog" aria-modal="true">
          <button className="mv-close" onClick={() => setQuick(null)}>
            Close ×
          </button>

          <div className="mv-qv-image">
            <Crop
              k={quick}
              view={view}
              scale={Math.min(0.9 * u, mobile ? 0.46 * u : 0.9 * u)}
            />
          </div>

          <div className="mv-qv-info">
            <small>{order.indexOf(quick) + 1} / 20</small>
            <h2>{garments[quick][0]}</h2>
            <b>$690.00</b>

            <div className="mv-tabs">
              <button
                className={view === "front" ? "active" : ""}
                onClick={() => setView("front")}
              >
                Front
              </button>

              <button
                className={view === "back" ? "active" : ""}
                onClick={() => setView("back")}
              >
                Back
              </button>
            </div>

            <label>SIZE</label>

            <div className="mv-sizes">
              {["S", "M", "L", "XL"].map((selectedSize) => (
                <button
                  className={size === selectedSize ? "chosen" : ""}
                  onClick={() => setSize(selectedSize)}
                  key={selectedSize}
                >
                  {selectedSize}
                </button>
              ))}
            </div>

            <button className="mv-add" onClick={add} disabled={adding}>
              {adding ? "Adding…" : "Add to cart"}
            </button>

            <div className="mv-meta">
              <span>{garments[quick][0]}</span>
              <u>View product page</u>
            </div>
          </div>
        </section>
      )}

      <aside className={`mv-drawer ${drawer ? "open" : ""}`}>
        <header>
          <h2>Cart</h2>
          <b>{count}</b>

          <button onClick={() => setDrawer(false)}>×</button>
        </header>

        <div className="mv-rows">
          {cart.map((item) => (
            <div className="mv-row" key={item.id}>
              <div className="mv-thumb">
                <Crop k={item.k} scale={0.22} />
              </div>

              <div>
                <strong>{garments[item.k][0]}</strong>
                <small>
                  Size: {item.size} · $690.00
                </small>

                <div className="mv-step">
                  <button onClick={() => changeQty(item.id, -1)}>−</button>
                  {item.qty}
                  <button onClick={() => changeQty(item.id, 1)}>+</button>
                </div>
              </div>

              <b>${(item.qty * 690).toFixed(2)}</b>

              <button
                className="mv-trash"
                onClick={() =>
                  setCart((oldCart) =>
                    oldCart.filter((cartItem) => cartItem.id !== item.id)
                  )
                }
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <footer>
          <div>
            <b>Estimated total</b>

            <strong>
              $
              {total.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </strong>
          </div>

          <small>Taxes and shipping calculated at checkout.</small>

          <button>Checkout</button>
        </footer>
      </aside>
    </main>
  );
}
