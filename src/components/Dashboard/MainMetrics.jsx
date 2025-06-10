import React from 'react';
import { FaUsers, FaChartLine, FaBullseye, FaBolt } from 'react-icons/fa';

const MainMetrics = ({ metrics }) => {
  const mainMetrics = [
    {
      id: 'customers',
      label: 'Total Customers',
      value: metrics.totalCustomers.toLocaleString(),
      icon: <FaUsers />,
      color: 'var(--primary-color)'
    },
    {
      id: 'churnRate',
      label: 'Churn Rate',
      value: `${metrics.churnRate}%`,
      icon: <FaChartLine />,
      color: 'var(--warning-color)'
    },
    {
      id: 'accuracy',
      label: 'Model Accuracy',
      value: `${metrics.modelAccuracy}%`,
      icon: <FaBullseye />,
      color: 'var(--success-color)'
    },
    {
      id: 'performance',
      label: 'Runtime Improvement',
      value: `${metrics.runtimeImprovement}%`,
      icon: <FaBolt />,
      color: 'var(--secondary-color)'
    }
  ];

  return (
    <div className="main-metrics-grid">
      {mainMetrics.map(metric => (
        <div 
          key={metric.id} 
          className="main-metric-card" 
          style={{ '--metric-color': metric.color }}
          data-tooltip={`View details about ${metric.label}`}
        >
          <div className="metric-icon">{metric.icon}</div>
          <div className="metric-content">
            <div className="metric-value">{metric.value}</div>
            <div className="metric-label">{metric.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainMetrics; 