// src/components/Spinner/Spinner.jsx
import React from 'react';
import './Spinner.css';

const Spinner = ({ variant = 'light', size = 'md' }) => {
  return <div className={`spin ${variant} ${size}`}></div>;
};

export default Spinner;