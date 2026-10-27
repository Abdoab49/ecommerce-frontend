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

  // ✅ Had l'function katbiyn alert mli tkliki 3la chi link mashi mawjoud
  const handleLinkClick = (e, pageName) => {
    e.preventDefault();
    alert(`📄 ${pageName} page is coming soon!`);
  };

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
              <a href="#" onClick={(e) => handleLinkClick(e, 'About')}>About</a>
              <a href="#" onClick={(e) => handleLinkClick(e, 'Blog')}>Blog</a>
              <a href="#" onClick={(e) => handleLinkClick(e, 'Careers')}>Careers</a>
              <a href="#" onClick={(e) => handleLinkClick(e, 'Contact')}>Contact</a>
            </li>
          </ul>
          <ul>
            <li>
              <h2>Resources</h2>
              <a href="#" onClick={(e) => handleLinkClick(e, 'Help')}>Help</a>
              <a href="#" onClick={(e) => handleLinkClick(e, 'Support')}>Support</a>
              <a href="#" onClick={(e) => handleLinkClick(e, 'Instructions')}>Instructions</a>
              <a href="#" onClick={(e) => handleLinkClick(e, 'Docs')}>Docs</a>
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
            <a href="#" onClick={(e) => handleLinkClick(e, 'Help')} title="Help">
              <FaQuestionCircle />
              <span>Help</span>
            </a>
            <a href="#" onClick={(e) => handleLinkClick(e, 'Support')} title="Support">
              <FaHeadset />
              <span>Support</span>
            </a>
            <a href="#" onClick={(e) => handleLinkClick(e, 'Instructions')} title="Instructions">
              <FaBookOpen />
              <span>Instructions</span>
            </a>
            <a href="#" onClick={(e) => handleLinkClick(e, 'Docs')} title="Docs">
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