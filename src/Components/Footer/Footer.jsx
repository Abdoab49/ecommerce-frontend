// src/Components/Footer/Footer.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaQuestionCircle, 
  FaHeadset, 
  FaBookOpen, 
  FaFileAlt,
  FaArrowRight
} from 'react-icons/fa';
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
              <FaArrowRight />
            </span>
          </button>
        </div>

        <div className="right links">
          <ul>
            <li>
              <h2>Company</h2>
              <a href="/about">About</a>
              <a href="/blog">Blog</a>
              <a href="/careers">Careers</a>
              <a href="/contact">Contact</a>
            </li>
          </ul>
          <ul>
            <li>
              <h2>Resources</h2>
              <a href="/help">Help</a>
              <a href="/support">Support</a>
              <a href="/instructions">Instructions</a>
              <a href="/docs">Docs</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="bottom">
        <div className="left">
          <p>&copy; LANADA 2026 . All rights Reserved</p>
        </div>
        <div className="right socials">
          <div className="social-links">
            <a href="/help" title="Help">
              <FaQuestionCircle />
              <span>Help</span>
            </a>
            <a href="/support" title="Support">
              <FaHeadset />
              <span>Support</span>
            </a>
            <a href="/instructions" title="Instructions">
              <FaBookOpen />
              <span>Instructions</span>
            </a>
            <a href="/docs" title="Docs">
              <FaFileAlt />
              <span>Docs</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;