import React from 'react';
import './Card.css';

const Card = ({
  children,
  title,
  subtitle,
  className = '',
  onClick,
}) => {
  return (
    <div className={`card ${className}`} onClick={onClick}>
      {(title || subtitle) && (
        <div className="card-header">
          {title && <h3 className="card-title">{title}</h3>}
          {subtitle && <p className="card-subtitle">{subtitle}</p>}
        </div>
      )}
      <div className="card-body">
        {children}
      </div>
    </div>
  );
};

export default Card; 