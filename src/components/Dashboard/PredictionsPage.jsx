import React from 'react';
import { useData } from '../../context/DataContext';
import { FaChartLine } from 'react-icons/fa';

const PredictionsPage = () => {
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
        <p>Please upload a CSV file to view predictions.</p>
      </div>
    );
  }

  return (
    <div className="predictions-page">
      <h1>Churn Predictions</h1>
      <div className="predictions-content">
        <div className="prediction-metrics">
          <div className="metric-card">
            <div className="metric-icon">
              <FaChartLine />
            </div>
            <div className="metric-content">
              <h3>Model Accuracy</h3>
              <p className="metric-value">85%</p>
            </div>
          </div>
        </div>
        <div className="predictions-table">
          <h2>Recent Predictions</h2>
          <p>Prediction table will be displayed here</p>
        </div>
      </div>
    </div>
  );
};

export default PredictionsPage; 