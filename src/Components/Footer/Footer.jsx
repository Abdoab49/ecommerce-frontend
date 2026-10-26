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
          <button onClick={() => navigate('/info/contact')}>
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
              <Link to="/info/about">About</Link>
              <Link to="/info/blog">Blog</Link>
              <Link to="/info/careers">Careers</Link>
              <Link to="/info/contact">Contact</Link>
            </li>
          </ul>
          <ul>
            <li>
              <h2>Resources</h2>
              <Link to="/info/help">Help</Link>
              <Link to="/info/support">Support</Link>
              <Link to="/info/instructions">Instructions</Link>
              <Link to="/info/docs">Docs</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="bottom">
        <div className="left">
          <p>&copy; LANADA 2026 . All rights Reserved</p>
        </div>
        {/* ✅ Hna bdelna b React Icons w drnahom Links */}
        <div className="right socials">
          <div className="social-links">
            <Link to="/info/help" title="Help">
              <FaQuestionCircle />
              <span>Help</span>
            </Link>
            <Link to="/info/support" title="Support">
              <FaHeadset />
              <span>Support</span>
            </Link>
            <Link to="/info/instructions" title="Instructions">
              <FaBookOpen />
              <span>Instructions</span>
            </Link>
            <Link to="/info/docs" title="Docs">
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