import React from 'react';
import { useData } from '../../context/DataContext';
import { FaChartLine } from 'react-icons/fa';

const PerformancePage = () => {
  const { data, isLoading, error } = useData();

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!data) {
    return (
      <div className="no-data">
        <h2>No Data Available</h2>
        <p>Please upload a CSV file to view performance metrics.</p>
      </div>
    );
  }

  return (
    <div className="performance-page">
      <h1>Performance Analytics</h1>
      <div className="performance-content">
        <div className="performance-metrics">
          <div className="metric-card">
            <div className="metric-icon">
              <FaChartLine />
            </div>
            <div className="metric-content">
              <h3>Model Performance</h3>
              <p className="metric-value">92%</p>
            </div>
          </div>
        </div>
        <div className="performance-charts">
          <h2>Performance Metrics</h2>
          <p>Performance charts will be displayed here</p>
        </div>
      </div>
    </div>
  );
};

export default PerformancePage; 