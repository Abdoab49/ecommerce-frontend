// src/pages/InfoPage.jsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const InfoPage = () => {
  const { topic } = useParams();
  const navigate = useNavigate();

  // ✅ Bdel Background
  useEffect(() => {
    document.body.style.background = '#ffffff';
    return () => { document.body.style.background = ''; };
  }, []);

  // ✅ L'Ktba dyal kol mawdo3
  const content = {
    about: {
      title: 'About Us',
      text: 'LANADA is a modern e-commerce platform dedicated to providing the best sportswear and apparel. We focus on quality, style, and customer satisfaction.',
    },
    blog: {
      title: 'Our Blog',
      text: 'Stay tuned for the latest fashion trends, product launches, and exclusive offers. Our blog is coming soon with exciting content!',
    },
    careers: {
      title: 'Careers',
      text: 'Join our growing team! We are always looking for passionate individuals. Send your CV to careers@lanada.shop.',
    },
    contact: {
      title: 'Contact Us',
      text: 'Have a question? Reach out to us at support@lanada.shop or call us at +212 600 000 000. We are here to help!',
    },
    help: {
      title: 'Help Center',
      text: 'Need assistance? Browse our FAQs or contact our support team. We are available 24/7 to help you with your orders and inquiries.',
    },
    support: {
      title: 'Customer Support',
      text: 'Our dedicated support team is ready to assist you with any issues regarding your orders, returns, or account. Email us at support@lanada.shop.',
    },
    instructions: {
      title: 'Instructions',
      text: 'Learn how to navigate our website, place orders, track your shipments, and manage your account easily.',
    },
    docs: {
      title: 'Documentation',
      text: 'Access our detailed documentation for developers and partners. Learn about our API, integration, and more.',
    },
  };

  const pageData = content[topic] || {
    title: 'Not Found',
    text: 'The page you are looking for does not exist.',
  };

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', padding: '40px 20px' }}>
      <div className="max-w-4xl mx-auto text-center py-24">
        <h1 className="text-4xl font-bold mb-6" style={{ color: '#000' }}>
          {pageData.title}
        </h1>
        <p className="text-lg mb-8" style={{ color: '#4b5563' }}>
          {pageData.text}
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 text-sm font-semibold rounded-md cursor-pointer transition-colors"
          style={{
            backgroundColor: '#000000',
            border: '1px solid #000000',
            color: '#ffffff',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#333333';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#000000';
          }}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default InfoPage;