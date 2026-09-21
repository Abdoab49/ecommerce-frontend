import React, { useState } from 'react'
import './HotSaleProduct.css'

const HotSaleProduct = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const products = [
    { 
      color: "#E24938", 
      color2: "#A30F22", 
      img: "http://www.supah.it/dribbble/012/1.jpg", 
      name: "Red" 
    },
    { 
      color: "#6CD96A", 
      color2: "#00986F", 
      img: "http://www.supah.it/dribbble/012/2.jpg", 
      name: "Green" 
    },
    { 
      color: "#4795D1", 
      color2: "#006EB8", 
      img: "http://www.supah.it/dribbble/012/3.jpg", 
      name: "Blue" 
    },
    { 
      color: "#292a2f", 
      color2: "#131519", 
      img: "http://www.supah.it/dribbble/012/4.jpg", 
      name: "Black" 
    }
  ]
  
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length)
  }
  
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length)
  }
  
  const goToSlide = (index) => {
    setCurrentIndex(index)
  }
  
  const currentProduct = products[currentIndex]
  
  return (
    <div className="hot-sale-card">
      <div className="title">Nike Metcon 2</div>
      <div className="desc">Men's training shoe</div>
      
      {/* السلايدر */}
      <div className="slider-wrapper">
        <button className="slider-btn prev" onClick={prevSlide}>❮</button>
        
        <div className="slider-image">
          <img src={currentProduct.img} alt={currentProduct.name} />
        </div>
        
        <button className="slider-btn next" onClick={nextSlide}>❯</button>
      </div>
      
      {/* نقاط التصفح */}
      <div className="dots-wrapper">
        {products.map((_, idx) => (
          <span 
            key={idx}
            className={`dot ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(idx)}
            style={{ 
              backgroundColor: idx === currentIndex ? currentProduct.color : '#ccc'
            }}
          ></span>
        ))}
      </div>
      
      {/* السعر والزر */}
      <div className="cta-wrapper">
        <div className="price" style={{ color: currentProduct.color }}>
          $130
        </div>
<button class="btn-17">
  <span class="text-container">
    <span class="text">Add to cart</span>
  </span>
</button>
      </div>
    </div>
  )
}

export default HotSaleProduct