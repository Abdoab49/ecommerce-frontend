import React, { useState } from 'react';
import './SampleProductCard.css';

const HotSaleProduct = () => {
  // بيانات 4 منتجات مختلفة
  const allProducts = [
    {
      id: 1,
      title: "Nike Metcon 2",
      desc: "Men's training shoe",
      price: "$130",
      color: "#E24938",
      color2: "#A30F22",
      img: "http://www.supah.it/dribbble/012/1.jpg",
      name: "Red"
    },
    {
      id: 2,
      title: "Nike Air Max",
      desc: "Running shoe",
      price: "$150",
      color: "#6CD96A",
      color2: "#00986F",
      img: "http://www.supah.it/dribbble/012/2.jpg",
      name: "Green"
    },
    {
      id: 3,
      title: "Nike Revolution",
      desc: "Training shoe",
      price: "$120",
      color: "#4795D1",
      color2: "#006EB8",
      img: "http://www.supah.it/dribbble/012/3.jpg",
      name: "Blue"
    },
    {
      id: 4,
      title: "Nike Free Run",
      desc: "Running shoe",
      price: "$140",
      color: "#292a2f",
      color2: "#131519",
      img: "http://www.supah.it/dribbble/012/4.jpg",
      name: "Black"
    }
  ];

  // State لكل منتج على حدة
  const [currentIndexes, setCurrentIndexes] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0
  });

  // منتجات كل بطاقة (صور متعددة لكل منتج)
  const productImages = {
    1: [
      { color: "#E24938", color2: "#A30F22", img: "http://www.supah.it/dribbble/012/1.jpg", name: "Red" },
      { color: "#6CD96A", color2: "#00986F", img: "http://www.supah.it/dribbble/012/2.jpg", name: "Green" },
      { color: "#4795D1", color2: "#006EB8", img: "http://www.supah.it/dribbble/012/3.jpg", name: "Blue" },
      { color: "#292a2f", color2: "#131519", img: "http://www.supah.it/dribbble/012/4.jpg", name: "Black" }
    ],
    2: [
      { color: "#6CD96A", color2: "#00986F", img: "http://www.supah.it/dribbble/012/2.jpg", name: "Green" },
      { color: "#4795D1", color2: "#006EB8", img: "http://www.supah.it/dribbble/012/3.jpg", name: "Blue" },
      { color: "#292a2f", color2: "#131519", img: "http://www.supah.it/dribbble/012/4.jpg", name: "Black" },
      { color: "#E24938", color2: "#A30F22", img: "http://www.supah.it/dribbble/012/1.jpg", name: "Red" }
    ],
    3: [
      { color: "#4795D1", color2: "#006EB8", img: "http://www.supah.it/dribbble/012/3.jpg", name: "Blue" },
      { color: "#292a2f", color2: "#131519", img: "http://www.supah.it/dribbble/012/4.jpg", name: "Black" },
      { color: "#E24938", color2: "#A30F22", img: "http://www.supah.it/dribbble/012/1.jpg", name: "Red" },
      { color: "#6CD96A", color2: "#00986F", img: "http://www.supah.it/dribbble/012/2.jpg", name: "Green" }
    ],
    4: [
      { color: "#292a2f", color2: "#131519", img: "http://www.supah.it/dribbble/012/4.jpg", name: "Black" },
      { color: "#E24938", color2: "#A30F22", img: "http://www.supah.it/dribbble/012/1.jpg", name: "Red" },
      { color: "#6CD96A", color2: "#00986F", img: "http://www.supah.it/dribbble/012/2.jpg", name: "Green" },
      { color: "#4795D1", color2: "#006EB8", img: "http://www.supah.it/dribbble/012/3.jpg", name: "Blue" }
    ]
  };

  const nextSlide = (productId) => {
    setCurrentIndexes(prev => ({
      ...prev,
      [productId]: (prev[productId] + 1) % productImages[productId].length
    }));
  };

  const prevSlide = (productId) => {
    setCurrentIndexes(prev => ({
      ...prev,
      [productId]: (prev[productId] - 1 + productImages[productId].length) % productImages[productId].length
    }));
  };

  const goToSlide = (productId, index) => {
    setCurrentIndexes(prev => ({
      ...prev,
      [productId]: index
    }));
  };

  // مكون البطاقة الواحدة
  const ProductCard = ({ product, images, currentIndex }) => {
    const currentProduct = images[currentIndex];

    return (
      <div className="hot-sale-card">
        <div className="title">{product.title}</div>
        <div className="desc">{product.desc}</div>
        
        {/* السلايدر */}
        <div className="slider-wrapper">
          <button className="slider-btn prev" onClick={() => prevSlide(product.id)}>❮</button>
          
          <div className="slider-image">
            <img src={currentProduct.img} alt={currentProduct.name} />
          </div>
          
          <button className="slider-btn next" onClick={() => nextSlide(product.id)}>❯</button>
        </div>
        
        {/* نقاط التصفح */}
        <div className="dots-wrapper">
          {images.map((_, idx) => (
            <span 
              key={idx}
              className={`dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(product.id, idx)}
              style={{ 
                backgroundColor: idx === currentIndex ? currentProduct.color : '#ccc'
              }}
            ></span>
          ))}
        </div>
        
        {/* السعر والزر */}
        <div className="cta-wrapper">
          <div className="price" style={{ color: currentProduct.color }}>
            {product.price}
          </div>
          <button className="btn-17">
            <span className="text-container">
              <span className="text">Add to cart</span>
            </span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="products-grid-4">
      {allProducts.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          images={productImages[product.id]}
          currentIndex={currentIndexes[product.id]}
        />
      ))}
    </div>
  );
};

export default HotSaleProduct;