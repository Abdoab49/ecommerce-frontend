import React from 'react'
import './NewCollections.css'
import Card from '../Popular/Card'

const NewCollections = () => {
  const newProducts = [
    // الصف الأول (4 منتجات)
    { 
      id: 1, 
      name: "Air Max SC", 
      price: 85, 
      oldPrice: 120,
      size: "11 cm",
      image: "https://placehold.co/400x400/e0e0e0/333?text=Air+Max+SC",
      colors: ["#000000", "#ffffff"],
      sizes: ["US 7", "US 8"]
    },
    { 
      id: 2, 
      name: "Court Legacy", 
      price: 70, 
      oldPrice: 100,
      size: "10.5 cm",
      image: "https://placehold.co/400x400/e0e0e0/333?text=Court+Legacy",
      colors: ["#000000", "#ffffff"],
      sizes: ["US 7", "US 8"]
    },
    { 
      id: 3, 
      name: "ZoomX Vaporfly", 
      price: 250, 
      oldPrice: 300,
      size: "12 cm",
      image: "https://placehold.co/400x400/e0e0e0/333?text=ZoomX+Vaporfly",
      colors: ["#000000", "#ff6600"],
      sizes: ["US 8", "US 9"]
    },
    { 
      id: 4, 
      name: "Air Jordan 1", 
      price: 170, 
      oldPrice: 220,
      size: "11.5 cm",
      image: "https://placehold.co/400x400/e0e0e0/333?text=Air+Jordan+1",
      colors: ["#000000", "#ff4444"],
      sizes: ["US 7", "US 8"]
    },
    // الصف الثاني (4 منتجات)
    { 
      id: 5, 
      name: "Blazer Low", 
      price: 80, 
      oldPrice: 110,
      size: "10 cm",
      image: "https://placehold.co/400x400/e0e0e0/333?text=Blazer+Low",
      colors: ["#ffffff", "#000000"],
      sizes: ["US 6", "US 7"]
    },
    { 
      id: 6, 
      name: "Air Force 1 Shadow", 
      price: 140, 
      oldPrice: 180,
      size: "11 cm",
      image: "https://placehold.co/400x400/e0e0e0/333?text=Air+Force+1+Shadow",
      colors: ["#ffffff", "#000000"],
      sizes: ["US 6", "US 7"]
    },
    { 
      id: 7, 
      name: "Nike Dunk Low", 
      price: 110, 
      oldPrice: 150,
      size: "11 cm",
      image: "https://placehold.co/400x400/e0e0e0/333?text=Nike+Dunk+Low",
      colors: ["#000000", "#ffffff"],
      sizes: ["US 7", "US 8"]
    },
    { 
      id: 8, 
      name: "Air Max 90", 
      price: 120, 
      oldPrice: 160,
      size: "11.5 cm",
      image: "https://placehold.co/400x400/e0e0e0/333?text=Air+Max+90",
      colors: ["#000000", "#ff6600"],
      sizes: ["US 8", "US 9"]
    },
  ]

  return (
    <div className="newcollections">
      <div className="newcollections-header">
        <h1>NEW COLLECTIONS</h1>
        <p>Latest Arrivals</p>
      </div>
      <div className="newcollections-grid">
        {newProducts.map(product => (
          <Card key={product.id} {...product} />
        ))}
      </div>
    </div>
  )
}

export default NewCollections