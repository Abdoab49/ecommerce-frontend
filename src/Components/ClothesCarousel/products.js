
export const SIZE_CHEST = {
  M: 104,
  L: 108,
  XL: 112,
  XXL: 116,
};

export const placeholder = (name = "Product") => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="800">
      <rect width="100%" height="100%" fill="#eeeeee"/>
      <text x="50%" y="50%" text-anchor="middle"
        dominant-baseline="middle" font-size="28" fill="#555">
        ${name}
      </text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

export const PRODUCTS = [
  { id: "p1", name: "Clothing 01", price: 299, image: "/Assets/3d/1.png", sizes: { M: 10, L: 10, XL: 10, XXL: 10 } },
  { id: "p2", name: "Clothing 02", price: 299, image: "/Assets/3d/2.png", sizes: { M: 10, L: 10, XL: 10, XXL: 10 } },
  { id: "p3", name: "Clothing 03", price: 299, image: "/Assets/3d/3.png", sizes: { M: 10, L: 10, XL: 10, XXL: 10 } },
  { id: "p4", name: "Clothing 04", price: 299, image: "/Assets/3d/4.png", sizes: { M: 10, L: 10, XL: 10, XXL: 10 } },
  { id: "p5", name: "Clothing 05", price: 299, image: "/Assets/3d/5.png", sizes: { M: 10, L: 10, XL: 10, XXL: 10 } },
  { id: "p6", name: "Clothing 06", price: 299, image: "/Assets/3d/6.png", sizes: { M: 10, L: 10, XL: 10, XXL: 10 } },
  { id: "p7", name: "Clothing 07", price: 299, image: "/Assets/3d/7.png", sizes: { M: 10, L: 10, XL: 10, XXL: 10 } },
  { id: "p8", name: "Clothing 08", price: 299, image: "/Assets/3d/8.png", sizes: { M: 10, L: 10, XL: 10, XXL: 10 } },
  { id: "p9", name: "Clothing 09", price: 299, image: "/Assets/3d/9.png", sizes: { M: 10, L: 10, XL: 10, XXL: 10 } },
  { id: "p10", name: "Clothing 10", price: 299, image: "/Assets/3d/10.png", sizes: { M: 10, L: 10, XL: 10, XXL: 10 } },
];
