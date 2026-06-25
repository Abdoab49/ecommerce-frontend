import React from 'react';
import styles from './MarqueeBusiness.module.css';

const MarqueeBusiness = () => {
  const businesses = [
    { id: 1, name: 'NIKE', image: 'Assets/Brand/logo1.png' },
    { id: 2, name: 'JORDAN', image: 'Assets/Brand/logo2.png' },
    { id: 3, name: 'LACOSTE', image: 'Assets/Brand/logo3.png' },
    { id: 4, name: 'ADIDAS', image: 'Assets/Brand/logo4.png' },
    { id: 5, name: 'PUMA', image: 'Assets/Brand/logo5.png' },
    { id: 6, name: 'THE NORTH FACE', image: 'Assets/Brand/logo6.png' },
    { id: 7, name: 'ZARA', image: 'Assets/Brand/logo7.png' }
  ];

  return (
    <div className={styles.marquee}>
      <div className={styles.marqueeGroup}>
        {businesses.map((business) => (
          <div key={business.id} className={styles.card}>
            <img src={business.image} alt={business.name} />
            <h4>{business.name}</h4>
          </div>
        ))}
      </div>

      <div aria-hidden="true" className={styles.marqueeGroup}>
        {businesses.map((business) => (
          <div key={`dup-${business.id}`} className={styles.card}>
            <img src={business.image} alt={business.name} />
            <h4>{business.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarqueeBusiness;