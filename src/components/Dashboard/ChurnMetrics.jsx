import React from 'react';
import './Dashboard.css';

const ChurnMetrics = ({ metrics }) => {
  const {
    totalCustomers,
    churnedCustomers,
    churnRate,
    averageTenure,
    revenueImpact
  } = metrics || {};

  return (
    <div className="metrics-container">
      <div className="metric-card">
        <h3>Total Customers</h3>
        <p className="metric-value">{totalCustomers?.toLocaleString() || 0}</p>
      </div>
      <div className="metric-card">
        <h3>Churned Customers</h3>
        <p className="metric-value">{churnedCustomers?.toLocaleString() || 0}</p>
      </div>
      <div className="metric-card">
        <h3>Churn Rate</h3>
        <p className="metric-value">{churnRate?.toFixed(2) || 0}%</p>
      </div>
      <div className="metric-card">
        <h3>Average Tenure</h3>
        <p className="metric-value">{averageTenure?.toFixed(1) || 0} months</p>
      </div>
      <div className="metric-card">
        <h3>Revenue Impact</h3>
        <p className="metric-value">${revenueImpact?.toLocaleString() || 0}</p>
      </div>
    </div>
  );
};

export default ChurnMetrics; 