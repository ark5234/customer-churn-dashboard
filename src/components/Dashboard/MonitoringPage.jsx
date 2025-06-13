import React from 'react';
import { useData } from '../../context/DataContext';
import { FaChartLine } from 'react-icons/fa';

const MonitoringPage = () => {
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
        <p>Please upload a CSV file to view monitoring metrics.</p>
      </div>
    );
  }

  return (
    <div className="monitoring-page">
      <h1>MLOps Monitoring</h1>
      <div className="monitoring-content">
        <div className="monitoring-metrics">
          <div className="metric-card">
            <div className="metric-icon">
              <FaChartLine />
            </div>
            <div className="metric-content">
              <h3>Model Health</h3>
              <p className="metric-value">Healthy</p>
            </div>
          </div>
        </div>
        <div className="monitoring-charts">
          <h2>Monitoring Metrics</h2>
          <p>Monitoring charts will be displayed here</p>
        </div>
      </div>
    </div>
  );
};

export default MonitoringPage; 