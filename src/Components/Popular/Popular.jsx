import React from 'react'
import Card from './Card'
import './Popular.css'

const Popular = () => {
  const products = [
    { 
      id: 1, 
      name: "Air Max Dia", 
      price: 120, 
      size: "11.5 cm",
      image: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/e6da45fa-1f0e-4c1c-86e7-8e4f5a8c9d3d/air-max-dia-shoes.png"
    },
    { 
      id: 2, 
      name: "Air Zoom Pegasus", 
      price: 130, 
      size: "12 cm",
      image: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/54a7d3c3-5b6d-4c5f-8a3c-8e9f6c2d4b1a/air-zoom-pegasus-39.png"
    },
    { 
      id: 3, 
      name: "Revolution 6", 
      price: 90, 
      size: "10.5 cm",
      image: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/7f8e9d0c-1a2b-3c4d-5e6f-7a8b9c0d1e2f/revolution-6.png"
    },
    { 
      id: 4, 
      name: "Air Force 1", 
      price: 110, 
      size: "11 cm",
      image: "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/2a3b4c5d-6e7f-8a9b-0c1d-2e3f4a5b6c7d/air-force-1-07.png"
    },
  ]

  return (
    <div className="popular">
      <div className="popular-header">
        <h1>POPULAR IN WOMEN</h1>
        <p>Best Sellers Collection</p>
      </div>
      <div className="popular-grid">
        {products.map(product => (
          <Card key={product.id} {...product} />
        ))}
      </div>
    </div>
  )
}

export default Popular