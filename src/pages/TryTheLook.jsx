import React, { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import "./TryTheLook.css";

const ASSET = "https://reel-ref-try-the-look.vercel.app/assets";

const PRODUCTS = {
  "tatum-5-orbit-copy": { id: "tatum-5-orbit-copy", name: "Air Jordan 12 Retro", price: 149, image: "source-tatum-5-orbit-copy.webp", sizes: ["40", "41", "42", "43", "44", "45", "46"], optionName: "Shoe size" },
  tshirt: { id: "tshirt", name: "T-shirt", price: 199, image: "source-tshirt.webp", sizes: ["S", "M", "L", "XL"], optionName: "Size" },
  sweatshirt: { id: "sweatshirt", name: "Sweatshirt", price: 199, image: "source-sweatshirt.webp", sizes: ["S", "M", "L", "XL"], optionName: "Size" },
  "tatum-5-orbit": { id: "tatum-5-orbit", name: "Tatum 5 Orbit", price: 149, image: "source-tatum-5-orbit.webp", sizes: ["40", "41", "42", "43", "44", "45", "46"], optionName: "Shoe size" },
  "hoodie-black": { id: "hoodie-black", name: "Hoodie Black", price: 199, image: "source-hoodie-black.webp", sizes: ["S", "M", "L", "XL"], optionName: "Size" },
  "sweatshirt-plus": { id: "sweatshirt-plus", name: "Sweatshirt Plus", price: 199, image: "source-sweatshirt-plus.webp", sizes: ["S", "M", "L", "XL"], optionName: "Size" },
  hoodie: { id: "hoodie", name: "Hoodie", price: 199, image: "source-hoodie.webp", sizes: ["S", "M", "L", "XL"], optionName: "Size" },
  "air-jordan-12-retro-copy": { id: "air-jordan-12-retro-copy", name: "Luka 5", price: 149, image: "source-air-jordan-12-retro-copy.webp", sizes: ["40", "41", "42", "43", "44", "45", "46"], optionName: "Shoe size" },
};

const LOOKS = [
  { key: "city-edit", name: "The City Edit", description: "A charcoal knit and easy denim.", model: "model-1-640.webp", original: "original-look-1.webp", products: ["tatum-5-orbit-copy", "tshirt", "sweatshirt"], pins: [["Air Jordan 12 Retro", 47, 27], ["T-shirt", 48, 58], ["Sweatshirt", 45, 88]] },
  { key: "gallery-white", name: "Gallery Opening", description: "A clean white tee and relaxed denim.", model: "model-5-640.webp", original: "original-look-5.webp", products: ["tatum-5-orbit", "hoodie-black", "tshirt"], newProduct: "hoodie-black", pins: [["Tatum 5 Orbit", 50, 28], ["Hoodie Black", 48, 58], ["T-shirt", 45, 88]] },
  { key: "olive-knit", name: "Olive Edit", description: "Olive knitwear. A grounded palette.", model: "model-4-640.webp", original: "original-look-4.webp", products: ["sweatshirt-plus", "tatum-5-orbit", "tshirt"], newProduct: "tatum-5-orbit", pins: [["Sweatshirt Plus", 50, 28], ["Tatum 5 Orbit", 48, 58], ["T-shirt", 45, 88]] },
  { key: "studio-black", name: "Studio Day", description: "Black, white and laid-back denim.", model: "model-6-640.webp", original: "original-look-6.webp", products: ["hoodie-black", "tatum-5-orbit-copy", "tshirt"], pins: [["Hoodie Black", 50, 28], ["Air Jordan 12 Retro", 48, 58], ["T-shirt", 45, 88]] },
  { key: "burgundy", name: "Burgundy Layers", description: "Burgundy layers. A tailored perspective.", model: "model-3-640.webp", original: "original-look-3.webp", products: ["sweatshirt", "tatum-5-orbit", "tshirt"], pins: [["Sweatshirt", 50, 28], ["Tatum 5 Orbit", 48, 58], ["T-shirt", 45, 88]] },
  { key: "grey-crew", name: "Grey Essentials", description: "A grey crew and your favourite denim.", model: "model-2-640.webp", original: "original-look-2.webp", products: ["hoodie", "air-jordan-12-retro-copy", "tshirt"], pins: [["Hoodie", 50, 28], ["Luka 5", 48, 58], ["T-shirt", 45, 88]] },
];

const money = (value) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

function Icon({ name, size = 20 }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };
  const paths = {
    plus: <path d="M12 4v16M4 12h16" />, close: <path d="M5 5l14 14M19 5L5 19" />, left: <path d="m15 18-6-6 6-6" />, right: <path d="m9 18 6-6-6-6" />, pause: <path d="M9 5v14M15 5v14" />, play: <path d="m8 5 11 7-11 7z" />, bag: <path d="M4 8h16l1 16H3L4 8zM8 8V6a4 4 0 0 1 8 0v2" />, check: <path d="m4.5 12.5 5 5L19.5 7" />,
  };
  return <svg {...common}>{paths[name] || null}</svg>;
}

export default function TryTheLook() {
  const navigate = useNavigate();
  const shop = useContext(ShopContext);
  const addToCart = shop?.addToCart;
  const cartCount = shop?.cartCount ?? (shop?.cartItems || []).reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [picker, setPicker] = useState(null);
  const [sizes, setSizes] = useState({});
  const [added, setAdded] = useState({});
  const [hotPin, setHotPin] = useState(null);
  const [message, setMessage] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const look = LOOKS[index];
  const currentProducts = useMemo(() => look.products.map((id) => PRODUCTS[id]), [look]);

  const go = (next) => { setIndex((next + LOOKS.length) % LOOKS.length); setPicker(null); setPopupOpen(false); setHotPin(null); setMessage(""); setAdded({}); };
  const selectedSize = (product) => sizes[product.id] || product.sizes[0];
  const makeCartProduct = (product, size) => {
    const id = `trythelook-${product.id}`;
    return { id, name: product.name, title: product.name, price: Number(product.price), new_price: Number(product.price), old_price: Number(product.price), image: `${ASSET}/${product.image}`, img: `${ASSET}/${product.image}`, images: [`${ASSET}/${product.image}`], category: "clothing", brand: "LANADA", size, quantity: 1 };
  };
  const addPiece = (product) => {
    const size = selectedSize(product);
    if (typeof addToCart !== "function") { setMessage("Cart is unavailable. Check that ShopContextProvider wraps the app."); return; }
    try { addToCart(`trythelook-${product.id}`, size, makeCartProduct(product, size)); setAdded((old) => ({ ...old, [product.id]: true })); setPicker(null); setMessage(`${product.name} added to your LANADA cart.`); }
    catch (error) { console.error("TryTheLook addToCart error:", error); setMessage("Could not add this item. Please try again."); }
  };
  const addFullLook = () => {
    if (typeof addToCart !== "function") { setMessage("Cart is unavailable. Check ShopContextProvider."); return; }
    const pending = currentProducts.filter((product) => !added[product.id]);
    if (!pending.length) { setMessage("All pieces in this look have been added."); return; }
    const nextSizes = { ...sizes };
    const missing = pending.find((product) => !nextSizes[product.id]);
    if (missing) { setPicker(missing.id); setMessage(`Choose a size for ${missing.name} to add the complete look.`); return; }
    try {
      pending.forEach((product) => addToCart(`trythelook-${product.id}`, nextSizes[product.id], makeCartProduct(product, nextSizes[product.id])));
      setAdded((old) => ({ ...old, ...Object.fromEntries(pending.map((product) => [product.id, true])) }));
      setMessage("Complete look added to your LANADA cart.");
    } catch (error) { console.error("TryTheLook full-look error:", error); setMessage("Some items could not be added. Please check your cart and try again."); }
  };

  return (
    <main className="rw-page">
      <header className="rw-header">
        <a className="rw-brand" href="/" aria-label="LANADA home"><span className="rw-brand-word">LANADA</span></a>
        <nav className="rw-nav" aria-label="Main navigation"><a href="/">Home</a><a href="/">Shop</a><a href="/collections/all">Collections</a><a href="/try-the-look" aria-current="page">Try the Look</a></nav>
        <button className="rw-header-bag" type="button" onClick={() => navigate("/cart")} aria-label={`Open cart, ${cartCount} items`}><Icon name="bag" size={24} /><span>{cartCount}</span></button>
      </header>
      <section className="rw" id="lanada-try-the-look"><div className="rw-grid">
        <div className="rw-left">
          <div className="rw-head"><div className="rw-intro"><h1>Try the Look.</h1><p>Six looks, styled head to toe. Tap a pin to explore each piece.</p></div></div>
          <div className="rw-stage" role="region" aria-roledescription="carousel" aria-label="Try the Look carousel" tabIndex={0} onKeyDown={(event) => { if (event.key === "ArrowRight") go(index + 1); if (event.key === "ArrowLeft") go(index - 1); }}>
            <div className="rw-ring" aria-hidden="true">{LOOKS.map((item, i) => { const delta = ((i - index + 6) % 6); const signed = delta > 3 ? delta - 6 : delta; const angle = signed * 30 * Math.PI / 180; const x = 50 + Math.sin(angle) * 42; const y = 3 + (1 - Math.cos(angle)) * 22; return <div className={`rw-ring-model ${i === index ? "is-active" : ""}`} key={item.key} style={{ "--x": `${x}%`, "--y": `${y}%`, "--scale": 1 / (1 + Math.abs(signed) * 0.12), "--blur": `${Math.min(Math.abs(signed) * 1.4, 6)}px`, zIndex: 20 - Math.abs(signed) }}><img src={`${ASSET}/${item.model}`} alt="" /></div>; })}</div>
            <div className="rw-active-model"><img src={`${ASSET}/${look.model}`} srcSet={`${ASSET}/${look.model} 640w, ${ASSET}/${look.original} 1080w`} sizes="(min-width: 1800px) 540px, (min-width: 750px) 420px, 320px" alt={look.name} draggable="false" />{look.pins.map(([name, left, top], i) => <button type="button" key={`${look.key}-${i}`} className={`rw-pin ${hotPin === i ? "is-hot" : ""}`} style={{ left: `${left}%`, top: `${top}%` }} data-tip={name} aria-label={`Show ${name}`} onClick={() => { setHotPin(i); setPicker(currentProducts[i]?.id || null); }}>{i + 1}</button>)}<button className="rw-model-view" type="button" aria-label={`View ${look.name}`} onClick={() => setPopupOpen(true)} /></div>
            <div className="rw-walk" aria-hidden="true"><span style={{ width: `${((index + 1) / LOOKS.length) * 100}%` }} /></div>
          </div>
          <div className="rw-controls"><button type="button" onClick={() => go(index - 1)} aria-label="Previous look"><Icon name="left" /></button><div className="rw-ticks" aria-label="Choose a look">{LOOKS.map((item, i) => <button type="button" key={item.key} className={i === index ? "is-current" : i < index ? "is-past" : ""} aria-current={i === index ? "true" : undefined} aria-label={`Look ${i + 1}: ${item.name}`} onClick={() => go(i)}><span>{String(i + 1).padStart(2, "0")}</span><i /></button>)}</div><button type="button" onClick={() => go(index + 1)} aria-label="Next look"><Icon name="right" /></button><button type="button" className="rw-play" onClick={() => setPlaying((value) => !value)} aria-label={playing ? "Pause autoplay" : "Play autoplay"} aria-pressed={playing}><Icon name={playing ? "pause" : "play"} /></button></div>
        </div>
        <aside className="rw-panel"><div className="rw-panel-inner"><div className="rw-panel-head"><span>Look {String(index + 1).padStart(2, "0")} / 06</span><h2>{look.name}</h2><p>{look.description}</p></div><div className="rw-mobile-head"><h2>{look.name}</h2><span>3 pieces</span></div>
          <div className="rw-items">{currentProducts.map((product, i) => <article className={`rw-item ${picker === product.id ? "is-picking" : ""} ${added[product.id] ? "is-added" : ""} ${hotPin === i ? "is-hot" : ""}`} key={`${look.key}-${product.id}`} onMouseEnter={() => setHotPin(i)} onMouseLeave={() => setHotPin(null)}>
            <div className="rw-media"><img src={`${ASSET}/${product.image}`} alt={product.name} loading="lazy" width="400" height="500" /><span className="rw-number">{i + 1}</span>{look.newProduct === product.id && <span className="rw-tag">New</span>}</div>
            <div className="rw-info"><span className="rw-vendor">LANADA</span><span className="rw-product-name">{product.name}</span><span className="rw-price">{money(product.price)}</span></div>
            <button type="button" className="rw-add" aria-label={`Choose size for ${product.name}`} aria-expanded={picker === product.id} onClick={() => setPicker(picker === product.id ? null : product.id)}>{added[product.id] ? <Icon name="check" /> : <Icon name="plus" />}</button>
            {picker === product.id && <div className="rw-picker" id={`rw-picker-${product.id}`}><div className="rw-picker-head"><img src={`${ASSET}/${product.image}`} alt="" /><div><strong>{product.name}</strong><span>{money(product.price)}</span></div><button type="button" onClick={() => setPicker(null)} aria-label="Close size picker"><Icon name="close" /></button></div><fieldset><legend>{product.optionName}</legend><div className="rw-sizes">{product.sizes.map((size) => <label className="rw-size" key={size}><input type="radio" name={`size-${product.id}`} value={size} checked={selectedSize(product) === size} onChange={() => setSizes((old) => ({ ...old, [product.id]: size }))} /><span>{size}</span></label>)}</div></fieldset><button type="button" className="rw-confirm" onClick={() => addPiece(product)}>{added[product.id] ? "Add another" : "Add to LANADA cart"}</button></div>}
          </article>)}</div>
          <div className="rw-bundle"><p className="rw-message" role="status" aria-live="polite">{message}</p><div className="rw-bundle-row"><div><strong>Complete the look</strong><span>Add all 3 pieces to your cart</span></div><div className="rw-bundle-price"><strong>{money(currentProducts.reduce((sum, product) => sum + product.price, 0))}</strong></div></div><button type="button" className="rw-cta" onClick={addFullLook}><span className="rw-cta-desktop">Add full look to cart</span><span className="rw-cta-mobile">Add full look</span><span className="rw-cta-arrow">→</span></button></div>
        </div></aside>
      </div></section>
      {popupOpen && <div className="rw-lightbox" role="dialog" aria-modal="true" aria-label="View look" onMouseDown={(event) => { if (event.target === event.currentTarget) setPopupOpen(false); }}><div className="rw-lightbox-top"><div><span>LOOK {String(index + 1).padStart(2, "0")}</span><strong>{look.name}</strong></div><button type="button" onClick={() => setPopupOpen(false)} aria-label="Close"><Icon name="close" /></button></div><div className="rw-lightbox-model"><img src={`${ASSET}/${look.original}`} alt={look.name} />{look.pins.map(([name, left, top], i) => <button type="button" key={`${name}-${i}`} className="rw-pin" style={{ left: `${left}%`, top: `${top}%` }} data-tip={name} onClick={() => { setPopupOpen(false); setHotPin(i); setPicker(currentProducts[i]?.id || null); }} aria-label={`Choose ${name}`}>{i + 1}</button>)}</div><p className="rw-lightbox-hint">Select a dot to choose the piece</p></div>}
    </main>
  );
}
