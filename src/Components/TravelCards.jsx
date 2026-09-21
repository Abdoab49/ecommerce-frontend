import styles from './TravelCards.module.css';
import React from 'react';
import './TravelCards.module.css';

const TravelCards = () => {
  const cards = [
    { 
      title: 'Mountain View', 
      copy: 'Check out all of these gorgeous mountain trips with beautiful views of, you guessed it, the mountains', 
      button: 'View Trips',
      imageId: '1517021897933-0e0319cfbc28'
    },
    { 
      title: 'To The Beach', 
      copy: 'Plan your next beach trip with these fabulous destinations', 
      button: 'View Trips',
      imageId: '1533903345306-15d1c30952de'
    },
    { 
      title: 'Desert Destinations', 
      copy: 'It\'s the desert you\'ve always dreamed of', 
      button: 'Book Now',
      imageId: '1545243424-0ce743321e11'
    },
    { 
      title: 'Explore The Galaxy', 
      copy: 'Seriously, straight up, just blast off into outer space today', 
      button: 'Book Now',
      imageId: '1531306728370-e2ebd9d7bb99'
    }
  ];

  return (
    <div className={container}>
      <main className={pageContent}>
        {cards.map((card, index) => (
          <div key={index} className={`${card} ${styles[`card${index}`]}`}>
            <div className={content}>
              <h2 className={title}>{card.title}</h2>
              <p className={copy}>{card.copy}</p>
              <button className={btn}>{card.button}</button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default TravelCards;