import React from 'react';
import styles from './ProfileCard.module.css';

const ProfileCard = () => {
  return (
    <div className={styles.container}>
      <div className={`${styles.card} ${styles.card0}`}>
        <div className={styles.border}>
          <h2>Al Pacino</h2>
          <div className={styles.icons}>
            <i className="fa fa-codepen" aria-hidden="true"></i>
            <i className="fa fa-instagram" aria-hidden="true"></i>
            <i className="fa fa-dribbble" aria-hidden="true"></i>
            <i className="fa fa-twitter" aria-hidden="true"></i>
            <i className="fa fa-facebook" aria-hidden="true"></i>
          </div>
        </div>
      </div>
      <div className={`${styles.card} ${styles.card1}`}>
        <div className={styles.border}>
          <h2>Ben Stiller</h2>
          <div className={styles.icons}>
            <i className="fa fa-codepen" aria-hidden="true"></i>
            <i className="fa fa-instagram" aria-hidden="true"></i>
            <i className="fa fa-dribbble" aria-hidden="true"></i>
            <i className="fa fa-twitter" aria-hidden="true"></i>
            <i className="fa fa-facebook" aria-hidden="true"></i>
          </div>
        </div>
      </div>
      <div className={`${styles.card} ${styles.card2}`}>
        <div className={styles.border}>
          <h2>Patrick Stewart</h2>
          <div className={styles.icons}>
            <i className="fa fa-codepen" aria-hidden="true"></i>
            <i className="fa fa-instagram" aria-hidden="true"></i>
            <i className="fa fa-dribbble" aria-hidden="true"></i>
            <i className="fa fa-twitter" aria-hidden="true"></i>
            <i className="fa fa-facebook" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;