
import React, { useContext } from "react";

import { ShopContext } from "../Context/ShopContext";

import ClothesCarousel from "../Components/ClothesCarousel/ClothesCarousel";

import {
  PRODUCTS,
  placeholder
} from "../Components/ClothesCarousel/products";

const ClothesCarouselPage = () => {
  const {
    addToCart,
    cartCount
  } = useContext(ShopContext);

  const handleAddToCart = ({ product, size }) => {
    const productImage =
      product.image || placeholder(product.shape, product.color);

    const productData = {
      ...product,
      image: productImage,
      category: "men"
    };

    addToCart(product.id, size, productData);
  };

  return (
    <ClothesCarousel
      products={PRODUCTS}
      onAdd={handleAddToCart}
      cartCount={cartCount}
    />
  );
};

export default ClothesCarouselPage;
