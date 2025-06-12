import React from 'react';
import { FaUser, FaChartLine, FaExclamationTriangle, FaDollarSign, FaClock } from 'react-icons/fa';
import '../../App.css';

// DashboardCard component inlined here
const DashboardCard = ({ icon, value, label, color = 'cyan' }) => (
  <div className="dashboard-card" style={{ '--card-accent': `var(--${color}-color)` }}>
    <div className="card-icon">{icon}</div>
    <div className="card-content">
      <h4 className="card-value">{value}</h4>
      <p className="card-label">{label}</p>
    </div>
  </div>
);

const ChurnMetrics = ({ data, selectedMetric, timeRange, viewMode }) => {
  const getMetricValue = (metric) => {
    if (!data) return 0;
    return data[metric] || 0;
  };

  const formatValue = (value, type) => {
    switch (type) {
      case 'percentage':
        return `${value.toFixed(1)}%`;
      case 'currency':
        return `$${value.toLocaleString()}`;
      case 'number':
        return value.toLocaleString();
      default:
        return value;
    }
  };

  const getMetricIcon = (metric) => {
    switch (metric) {
      case 'totalCustomers':
        return <FaUser />;
      case 'churnRate':
        return <FaChartLine />;
      case 'churnedCustomers':
        return <FaExclamationTriangle />;
      case 'revenueImpact':
        return <FaDollarSign />;
      case 'averageTenure':
        return <FaClock />;
      default:
        return null;
    }
  };

  const getMetricColor = (metric) => {
    switch (metric) {
      case 'totalCustomers':
        return 'var(--primary-color)';
      case 'churnRate':
        return 'var(--warning-color)';
      case 'churnedCustomers':
        return 'var(--danger-color)';
      case 'revenueImpact':
        return 'var(--success-color)';
      case 'averageTenure':
        return 'var(--secondary-color)';
      default:
        return 'var(--text-light)';
    }
  };

  const getMetricType = (metric) => {
    switch (metric) {
      case 'churnRate':
        return 'percentage';
      case 'revenueImpact':
        return 'currency';
      default:
        return 'number';
    }
  };

  const metrics = [
    {
      id: 'totalCustomers',
      label: 'Total Customers',
      value: getMetricValue('totalCustomers'),
      type: 'number'
    },
    {
      id: 'churnRate',
      label: 'Churn Rate',
      value: getMetricValue('churnRate'),
      type: 'percentage'
    },
    {
      id: 'churnedCustomers',
      label: 'Churned Customers',
      value: getMetricValue('churnedCustomers'),
      type: 'number'
    },
    {
      id: 'revenueImpact',
      label: 'Revenue Impact',
      value: getMetricValue('revenueImpact'),
      type: 'currency'
    },
    {
      id: 'averageTenure',
      label: 'Average Tenure',
      value: getMetricValue('averageTenure'),
      type: 'number'
    }
  ];

  const renderMetricCard = (metric) => (
    <div
      key={metric.id}
      className="metric-card"
      style={{ '--metric-color': getMetricColor(metric.id) }}
    >
      <div className="metric-icon">
        {getMetricIcon(metric.id)}
      </div>
      <div className="metric-content">
        <h3 className="metric-label">{metric.label}</h3>
        <div className="metric-value">
          {formatValue(metric.value, metric.type)}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`metrics-grid ${viewMode}`}>
      {metrics.map(renderMetricCard)}
    </div>
  );
};

export default ChurnMetrics; 