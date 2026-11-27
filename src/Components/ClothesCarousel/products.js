
export const SIZE_CHEST = {
  M: 104,
  L: 108,
  XL: 112,
  XXL: 116
};

const TEE =
  "M78 68 Q100 82 122 68 L158 84 L146 118 L130 108 L130 226 L70 226 L70 108 L54 118 L42 84 Z";

const LONG =
  "M78 68 Q100 82 122 68 L152 80 L174 206 L152 210 L134 124 L134 240 L66 240 L66 124 L48 210 L26 206 L48 80 Z";

export const placeholder = (shape, color) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="14 58 172 192"><defs><linearGradient id="s" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".35"/><stop offset=".35" stop-color="#fff" stop-opacity=".14"/><stop offset="1" stop-color="#000" stop-opacity=".4"/></linearGradient></defs><path d="${shape === "long" ? LONG : TEE}" fill="${color}" stroke="rgba(255,255,255,.35)" stroke-width="1"/><path d="${shape === "long" ? LONG : TEE}" fill="url(#s)"/></svg>`
  );

export const PRODUCTS = [
  {
    id: "p1",
    name: "Tee oversize noir",
    price: 289,
    shape: "tee",
    color: "#3a3d47",
    sizes: { M: true, L: true, XL: true, XXL: false }
  },
  {
    id: "p2",
    name: "Hoodie bleu cobalt",
    price: 549,
    shape: "long",
    color: "#2f55d4",
    sizes: { M: true, L: true, XL: true, XXL: true }
  },
  {
    id: "p3",
    name: "Tee coton écru",
    price: 259,
    shape: "tee",
    color: "#d9d3c3",
    sizes: { M: false, L: true, XL: true, XXL: true }
  },
  {
    id: "p4",
    name: "Sweat gris chiné",
    price: 459,
    shape: "long",
    color: "#7b7f88",
    sizes: { M: true, L: true, XL: false, XXL: false }
  },
  {
    id: "p5",
    name: "Tee olive délavé",
    price: 279,
    shape: "tee",
    color: "#5b6446",
    sizes: { M: true, L: true, XL: true, XXL: true }
  },
  {
    id: "p6",
    name: "Hoodie sable",
    price: 569,
    shape: "long",
    color: "#b79b6b",
    sizes: { M: true, L: false, XL: true, XXL: true }
  },
  {
    id: "p7",
    name: "Tee bordeaux",
    price: 269,
    shape: "tee",
    color: "#7a2a38",
    sizes: { M: true, L: true, XL: true, XXL: true }
  }
];
