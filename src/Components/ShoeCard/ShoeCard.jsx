// src/Components/ShoeCard/ShoeCard.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VanillaTilt from 'vanilla-tilt';
import styles from './ShoeCard.module.css';

const ShoeCard = ({ sortOption = 'default' }) => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [firstClickId, setFirstClickId] = useState(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      VanillaTilt.init(container.querySelectorAll(`.${styles.box}`), {
        max: 25,
        speed: 400
      });
    }

    return () => {
      if (container) {
        const boxes = container.querySelectorAll(`.${styles.box}`);
        boxes.forEach(box => box.vanillaTilt?.destroy());
      }
    };
  }, [sortOption]);

  // ✅ SHOES ARRAY — id: 53, 54, 55, 56
  let shoes = [
    {
      id: 53,
      name: 'Nike Air Max Portal SE',
      price: 400,
      img: '/Assets/Shoes/Shoes1.png',
      sizes: ['40', '41', '42', '43', '44', '45'],
      images: [
        '/Assets/Shoes/Shoes1.png',
        '/Assets/Shoes/Shoes11.png',
        '/Assets/Shoes/Shoes12.png',
        '/Assets/Shoes/Shoes13.png',
        '/Assets/Shoes/Shoes14.png',
        '/Assets/Shoes/Shoes15.png',
        '/Assets/Shoes/Shoes16.png'
      ]
    },
    {
      id: 54,
      name: 'NIKE AIR FORCE',
      price: 220,
      img: '/Assets/Shoes/Shoes2.png',
      sizes: ['39', '40', '41', '42', '43', '44'],
      images: [
        '/Assets/Shoes/Shoes2.png',
        '/Assets/Shoes/Shoes21.png',
        '/Assets/Shoes/Shoes22.png',
        '/Assets/Shoes/Shoes23.png'
      ]
    },
    {
      id: 55,
      name: 'NIKE ZOOM',
      price: 280,
      img: '/Assets/Shoes/Shoes3.png',
      sizes: ['40', '41', '42', '43', '44', '45'],
      images: [
        '/Assets/Shoes/Shoes3.png',
        '/Assets/Shoes/Shoes31.png',
        '/Assets/Shoes/Shoes32.png',
        '/Assets/Shoes/Shoes33.png'
      ]
    },
    {
      id: 56,
      name: 'NIKE JORDAN',
      price: 300,
      img: '/Assets/Shoes/Shoes4.png',
      sizes: ['41', '42', '43', '44', '45', '46'],
      images: [
        '/Assets/Shoes/Shoes4.png',
        '/Assets/Shoes/Shoes41.png',
        '/Assets/Shoes/Shoes42.png',
        '/Assets/Shoes/Shoes43.png'
      ]
    }
  ];

  // ✅ Tri
  if (sortOption === 'price-asc') {
    shoes = [...shoes].sort((a, b) => a.price - b.price);
  } else if (sortOption === 'price-desc') {
    shoes = [...shoes].sort((a, b) => b.price - a.price);
  } else if (sortOption === 'name-asc') {
    shoes = [...shoes].sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === 'name-desc') {
    shoes = [...shoes].sort((a, b) => b.name.localeCompare(a.name));
  }

  // ✅ 2 clics: awel → animation, tani → /size-selection
  const handleClick = (shoe) => {
    if (firstClickId !== shoe.id) {
      setFirstClickId(shoe.id);
      setTimeout(() => setFirstClickId(null), 1500);
      return;
    }

    const productData = {
      id: shoe.id,
      name: shoe.name,
      company: 'NIKE',
      price: shoe.price,
      old_price: Math.round(shoe.price * 1.4),
      img: shoe.img,
      description: `${shoe.name} - Premium Shoes`,
      category: 'shoes',
      sizes: shoe.sizes || ['40', '41', '42', '43', '44', '45'],
      images: shoe.images || [shoe.img, shoe.img, shoe.img, shoe.img]
    };
    navigate('/size-selection', { state: { product: productData } });
  };

  return (
    <div className={styles.wrapper}>
      {/* ✅ VIDEO BACKGROUND — ghir hadi zedna */}
      <video
        className={styles.backgroundVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src="/Assets/Shoes/nike123.mp4" type="video/mp4" />
      </video>

      {/* ✅ OVERLAY — ghir hadi zedna */}
      <div className={styles.overlay}></div>

      {/* ✅ CONTAINER — kifma kan */}
      <div className={styles.container} ref={containerRef}>
        {shoes.map((shoe) => (
          <div
            key={shoe.id}
            className={`${styles.box} ${firstClickId === shoe.id ? styles.active : ''}`}
            onClick={() => handleClick(shoe)}
            style={{ cursor: 'pointer' }}
          >
            <h2 className={styles.name}>{shoe.name}</h2>

            <div className={styles.buy}>
              {shoe.price} DH
            </div>

            <div className={styles.circle}></div>
            <img src={shoe.img} alt={shoe.name} className={styles.product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoeCard;