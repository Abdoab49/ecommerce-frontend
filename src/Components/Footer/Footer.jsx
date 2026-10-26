// src/Components/Footer/Footer.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer-wrapper">
      <div className="top">
        <div className="left">
          <h2>Contact Us</h2>
          <blockquote>Let's Discuss Your Software vision.</blockquote>
          <button onClick={() => navigate('/contact')}>
            Schedule a call
            <span className="symbols">
              <i className="fa-solid fa-arrow-right"></i>
            </span>
          </button>
        </div>

        <div className="right links">
          <ul>
            <li>
              <h2>Company</h2>
              <a href="#">About</a>
              <a href="#">Blog</a>
              <a href="#">Careers</a>
              <a href="#">Contact</a>
            </li>
          </ul>
          <ul>
            <li>
              <h2>Resources</h2>
              <a href="#">Help</a>
              <a href="#">Support</a>
              <a href="#">Instructions</a>
              <a href="#">Docs</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="bottom">
        <div className="left">
          <p>&copy; LANADA 2026 . All rights Reserved</p>
        </div>
        {/* ✅ Hna bdelna Social Media b Links dyal Help w Support */}
        <div className="right socials">
          <div className="social-links">
            <a href="#" title="Help">
              <i className="fa-solid fa-circle-question"></i>
              <span>Help</span>
            </a>
            <a href="#" title="Support">
              <i className="fa-solid fa-headset"></i>
              <span>Support</span>
            </a>
            <a href="#" title="Instructions">
              <i className="fa-solid fa-book-open"></i>
              <span>Instructions</span>
            </a>
            <a href="#" title="Docs">
              <i className="fa-solid fa-file-lines"></i>
              <span>Docs</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;