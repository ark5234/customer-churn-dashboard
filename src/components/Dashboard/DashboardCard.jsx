import React from 'react';
import PropTypes from 'prop-types';

const DashboardCard = ({ icon, value, label, color = 'cyan' }) => (
  <div className="dashboard-card" style={{ '--card-accent': `var(--${color}-color)` }}>
    <div className="card-icon">{icon}</div>
    <div className="card-content">
      <h4 className="card-value">{value}</h4>
      <p className="card-label">{label}</p>
    </div>
  </div>
);

DashboardCard.propTypes = {
  icon: PropTypes.node.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['cyan', 'blue', 'green', 'purple'])
};

export default DashboardCard; 