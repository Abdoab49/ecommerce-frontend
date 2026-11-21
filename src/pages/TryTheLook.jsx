
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';
import './TryTheLook.css';

const ASSET = 'https://reel-ref-try-the-look.vercel.app/assets/';

const products = {
  'Air Jordan 12 Retro': {
    id: 'tatum-5-orbit-copy',
    price: 149,
    image: 'source-tatum-5-orbit-copy.webp',
    type: 'Nike',
    sizes: ['40', '41', '42', '43', '44', '45', '46'],
    url: 'https://nike-makknzjs.myshopify.com/products/tatum-5-orbit-copy'
  },
  Tshirt: {
    id: 'tshirt',
    price: 199,
    image: 'source-tshirt.webp',
    type: 'Nike',
    sizes: ['S', 'L', 'M', 'XL'],
    url: 'https://nike-makknzjs.myshopify.com/products/tshirt'
  },
  Sweatshirt: {
    id: 'sweatshirt',
    price: 199,
    image: 'source-sweatshirt.webp',
    type: 'Nike',
    sizes: ['S', 'L', 'M', 'XL'],
    url: 'https://nike-makknzjs.myshopify.com/products/sweatshirt'
  },
  'Tatum 5 Orbit': {
    id: 'tatum-5-orbit',
    price: 149,
    image: 'source-tatum-5-orbit.webp',
    type: 'Nike',
    sizes: ['40', '41', '42', '43', '44', '45', '46'],
    url: 'https://nike-makknzjs.myshopify.com/products/tatum-5-orbit'
  },
  'Hoodie Black': {
    id: 'hoodie-black',
    price: 199,
    image: 'source-hoodie-black.webp',
    type: 'Nike',
    sizes: ['S', 'L', 'M', 'XL'],
    url: 'https://nike-makknzjs.myshopify.com/products/hoodie-black'
  },
  'Sweatshirt Plus': {
    id: 'sweatshirt-plus',
    price: 199,
    image: 'source-sweatshirt-plus.webp',
    type: 'Nike',
    sizes: ['S', 'L', 'M', 'XL'],
    url: 'https://nike-makknzjs.myshopify.com/products/sweatshirt-plus'
  },
  Hoodie: {
    id: 'hoodie',
    price: 199,
    image: 'source-hoodie.webp',
    type: 'Nike',
    sizes: ['S', 'L', 'M', 'XL'],
    url: 'https://nike-makknzjs.myshopify.com/products/hoodie'
  },
  'Luka 5': {
    id: 'air-jordan-12-retro-copy',
    price: 149,
    image: 'source-air-jordan-12-retro-copy.webp',
    type: 'Nike',
    sizes: ['40', '41', '42', '43', '44', '45', '46'],
    url: 'https://nike-makknzjs.myshopify.com/products/air-jordan-12-retro-copy'
  }
};

const looks = [
  {
    name: 'The City Edit',
    model: 'model-1-640.webp',
    pieces: ['Air Jordan 12 Retro', 'Tshirt', 'Sweatshirt'],
    desc: 'A charcoal knit and easy denim.'
  },
  {
    name: 'Gallery Opening',
    model: 'model-5-640.webp',
    pieces: ['Tatum 5 Orbit', 'Hoodie Black', 'Tshirt'],
    desc: 'A clean white tee and relaxed denim.'
  },
  {
    name: 'Gallery Opening',
    model: 'model-4-640.webp',
    pieces: ['Sweatshirt Plus', 'Tatum 5 Orbit', 'Tshirt'],
    desc: 'Olive knitwear. A grounded palette.'
  },
  {
    name: 'Studio Day',
    model: 'model-6-640.webp',
    pieces: ['Hoodie Black', 'Air Jordan 12 Retro', 'Tshirt'],
    desc: 'Black, white and laid-back denim.'
  },
  {
    name: 'Studio Day',
    model: 'model-3-640.webp',
    pieces: ['Sweatshirt', 'Tatum 5 Orbit', 'Tshirt'],
    desc: 'Burgundy layers. A tailored perspective.'
  },
  {
    name: 'Studio Day',
    model: 'model-2-640.webp',
    pieces: ['Hoodie', 'Luka 5', 'Tshirt'],
    desc: 'A grey crew and your favourite denim.'
  }
];

export default function TryTheLook() {
  const shop = useContext(ShopContext) || {};
  const addToCart = shop.addToCart;

  const [active, setActive] = useState(0);
  const [sizes, setSizes] = useState({});
  const [bag, setBag] = useState([]);
  const [bagOpen, setBagOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const [toast, setToast] = useState('');

  const touch = useRef(null);
  const look = looks[active];

  const total = useMemo(
    () => look.pieces.reduce((sum, name) => sum + products[name].price, 0),
    [look]
  );

  const selected = (name) =>
    sizes[`${active}-${name}`] || products[name].sizes[0];

  useEffect(() => {
    if (paused || viewOpen || bagOpen) return;

    const timer = setInterval(() => {
      setActive((current) => (current + 1) % looks.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [paused, viewOpen, bagOpen]);

  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2600);
  };

  const addPiece = (name) => {
    const product = products[name];
    const size = selected(name);

    const item = {
      id: `runway-${product.id}-${active}-${name}`,
      name,
      price: product.price,
      new_price: product.price,
      image: ASSET + product.image,
      size,
      quantity: 1,
      category: 'runway',
      brand: 'Nike'
    };

    if (addToCart) {
      addToCart(item.id, size, item);
    }

    setBag((old) => [
      ...old,
      { ...item, key: `${Date.now()}-${Math.random()}` }
    ]);

    notify(`${name} added to your styling bag`);
  };

  const addFull = () => {
    look.pieces.forEach(addPiece);
    notify('Full look added to your LANADA cart');
  };

  const move = (direction) => {
    setActive((current) =>
      (current + direction + looks.length) % looks.length
    );
  };

  return (
    <main
      className="ttl-page"
      onTouchStart={(event) => {
        touch.current = event.touches[0].clientX;
      }}
      onTouchEnd={(event) => {
        if (touch.current === null) return;

        const distance =
          event.changedTouches[0].clientX - touch.current;

        if (Math.abs(distance) > 55) {
          move(distance < 0 ? 1 : -1);
        }

        touch.current = null;
      }}
    >
      <section className="ttl-intro">
        <div>
          <span className="ttl-kicker">LANADA × NIKE / STYLE EDITION</span>
          <h1>
            Try the Look<span>.</span>
          </h1>
          <p>
            Six looks, styled head to toe. Explore the runway,
            isolate a look, and find every piece.
          </p>
        </div>

        <button
          className="ttl-bag-link"
          onClick={() => setBagOpen(true)}
        >
          Styling bag <span>{bag.length}</span>
        </button>
      </section>

      <section className="ttl-layout">
        <div className="ttl-stage">
          <div className="ttl-stage-top">
            <span>THE RUNWAY</span>
            <span>0{active + 1} / 06</span>
          </div>

          <div className="ttl-orbit" aria-label="Runway looks carousel">
            {looks.map((item, index) => {
              let offset = index - active;

              if (offset > 3) offset -= 6;
              if (offset < -3) offset += 6;

              return (
                <button
                  key={index}
                  className={`ttl-model ttl-pos-${offset} ${
                    index === active ? 'is-active' : ''
                  }`}
                  onClick={() => {
                    setActive(index);
                    setViewOpen(false);
                  }}
                  aria-label={`View look ${index + 1}: ${item.name}`}
                  tabIndex={Math.abs(offset) > 2 ? -1 : 0}
                >
                  <img
                    src={ASSET + item.model}
                    alt={item.name}
                    draggable="false"
                  />
                  <span className="ttl-model-name">
                    0{index + 1} — {item.name}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="ttl-stage-controls">
            <button onClick={() => move(-1)} aria-label="Previous look">
              ←
            </button>

            <div className="ttl-progress">
              {looks.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActive(index)}
                  className={index === active ? 'active' : ''}
                  aria-label={`Go to look ${index + 1}`}
                >
                  <i />
                </button>
              ))}
            </div>

            <button onClick={() => move(1)} aria-label="Next look">
              →
            </button>

            <button
              className="ttl-pause"
              onClick={() => setPaused((value) => !value)}
            >
              {paused ? 'Play' : 'Pause'}
            </button>
          </div>

          <div className="ttl-stage-bottom">
            <span>{look.desc}</span>
            <button onClick={() => setViewOpen(true)}>
              View look <b>↗</b>
            </button>
          </div>
        </div>

        <aside className="ttl-panel">
          <div className="ttl-panel-head">
            <div>
              <span className="ttl-kicker">LOOK 0{active + 1}</span>
              <h2>In this look</h2>
            </div>

            <span className="ttl-piece-count">03 PIECES</span>
          </div>

          <div className="ttl-products">
            {look.pieces.map((name, index) => {
              const product = products[name];

              return (
                <article
                  id={`ttl-product-${index}`}
                  className="ttl-product"
                  key={`${active}-${name}`}
                >
                  <div className="ttl-product-img">
                    <img src={ASSET + product.image} alt={name} />
                    <span>{index + 1}</span>
                  </div>

                  <div className="ttl-product-info">
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noreferrer"
                      className="ttl-product-name"
                    >
                      {name}
                    </a>

                    <small>{product.type}</small>

                    <strong>${product.price.toFixed(2)}</strong>

                    <label>
                      SIZE
                      <select
                        value={selected(name)}
                        onChange={(event) =>
                          setSizes((old) => ({
                            ...old,
                            [`${active}-${name}`]: event.target.value
                          }))
                        }
                      >
                        {product.sizes.map((size) => (
                          <option key={size}>{size}</option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <button
                    className="ttl-add-one"
                    onClick={() => addPiece(name)}
                    aria-label={`Add ${name}`}
                  >
                    +
                  </button>
                </article>
              );
            })}
          </div>

          <div className="ttl-bundle">
            <div>
              <span>COMPLETE THE LOOK</span>
              <h3>All 3 pieces</h3>
            </div>

            <div className="ttl-bundle-price">
              <del>${(total + 54.7).toFixed(2)}</del>
              <strong>$492.30</strong>
            </div>
          </div>

          <button className="ttl-add-full" onClick={addFull}>
            Add full look to bag <span>↗</span>
          </button>

          <p className="ttl-footnote">
            Choose your sizes, then add the complete look to your LANADA cart.
          </p>
        </aside>
      </section>

      {viewOpen && (
        <div
          className="ttl-modal-backdrop"
          onClick={() => setViewOpen(false)}
        >
          <section
            className="ttl-look-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="ttl-close"
              onClick={() => setViewOpen(false)}
            >
              ×
            </button>

            <span className="ttl-kicker">LOOK 0{active + 1}</span>
            <h2>{look.name}</h2>

            <div className="ttl-modal-figure">
              <img src={ASSET + look.model} alt={look.name} />

              {look.pieces.map((piece, index) => (
                <button
                  key={piece}
                  style={{
                    top: ['29%', '57%', '84%'][index],
                    left: index === 0 ? '57%' : index === 1 ? '43%' : '54%'
                  }}
                  onClick={() =>
                    document
                      .getElementById(`ttl-product-${index}`)
                      ?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                      })
                  }
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <p>{look.desc}</p>

            <div className="ttl-modal-items">
              {look.pieces.map((piece, index) => (
                <button
                  key={piece}
                  onClick={() => {
                    setViewOpen(false);
                    document
                      .querySelector('.ttl-panel')
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {index + 1}. {piece} ↗
                </button>
              ))}
            </div>
          </section>
        </div>
      )}

      {bagOpen && (
        <div
          className="ttl-modal-backdrop"
          onClick={() => setBagOpen(false)}
        >
          <section
            className="ttl-bag-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="ttl-close"
              onClick={() => setBagOpen(false)}
            >
              ×
            </button>

            <span className="ttl-kicker">LANADA / YOUR EDIT</span>
            <h2>
              Styling bag <small>({bag.length})</small>
            </h2>

            {bag.length === 0 ? (
              <p>
                Your styling bag is empty. Add a piece from the runway
                to get started.
              </p>
            ) : (
              <>
                {bag.map((item) => (
                  <div className="ttl-bag-row" key={item.key}>
                    <img src={item.image} alt="" />

                    <div>
                      <strong>{item.name}</strong>
                      <small>Size {item.size}</small>
                    </div>

                    <b>${item.price.toFixed(2)}</b>
                  </div>
                ))}

                <div className="ttl-bag-total">
                  <span>Subtotal</span>
                  <strong>
                    ${bag.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                  </strong>
                </div>

                <button
                  className="ttl-add-full"
                  onClick={() => {
                    setBagOpen(false);
                    notify('Your selections are saved in the LANADA cart');
                  }}
                >
                  Continue shopping
                </button>
              </>
            )}
          </section>
        </div>
      )}

      {toast && (
        <div className="ttl-toast" role="status">
          {toast}
        </div>
      )}
    </main>
  );
}
