import React from 'react'
import './Card.css'

const Card = ({ name, price, size, image }) => {
  return (
    <div className="card">
      <div className="card-image">
        <div className="brand">Nike</div>
        <img 
          src={image} 
          alt={name}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/260?text=Image+Not+Found'
          }}
        />
      </div>
      <div className="card-info">
        <h3>{name}</h3>
        <div className="size">{size}</div>
        <div className="price">${price}</div>
        <button className="buy-btn">Buy Now</button>
      </div>
    </div>
  )
}

export default Card