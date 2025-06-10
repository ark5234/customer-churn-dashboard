import React from 'react';
import './Loader.css';

const Loader = ({ size = 'medium', color = 'primary' }) => {
  return (
    <div className={`loader-container loader-${size}`}>
      <div className={`loader loader-${color}`}>
        <div className="loader-spinner"></div>
      </div>
    </div>
  );
};

export default Loader; 