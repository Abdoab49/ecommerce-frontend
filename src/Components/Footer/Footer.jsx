// src/Components/Footer/Footer.jsx
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
              <Link to="/about">About</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/careers">Careers</Link>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
          <ul>
            <li>
              <h2>Resources</h2>
              <Link to="/help">Help</Link>
              <Link to="/support">Support</Link>
              <Link to="/instructions">Instructions</Link>
              <Link to="/docs">Docs</Link>
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
            <Link to="/help" title="Help">
              <FaQuestionCircle />
              <span>Help</span>
            </Link>
            <Link to="/support" title="Support">
              <FaHeadset />
              <span>Support</span>
            </Link>
            <Link to="/instructions" title="Instructions">
              <FaBookOpen />
              <span>Instructions</span>
            </Link>
            <Link to="/docs" title="Docs">
              <FaFileAlt />
              <span>Docs</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;