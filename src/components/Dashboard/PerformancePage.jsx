import React, { useEffect, useState } from 'react';
import { useData } from '../../context/DataContext';
import { FaChartLine } from 'react-icons/fa';
import { getModelAccuracy } from '../../services/api';

const PerformancePage = () => {
  const { data, isLoading, error } = useData();
  const [accuracy, setAccuracy] = useState(null);
  const [accuracyLoading, setAccuracyLoading] = useState(false);
  const [accuracyError, setAccuracyError] = useState(null);

  useEffect(() => {
    const fetchAccuracy = async () => {
      setAccuracyLoading(true);
      setAccuracyError(null);
      try {
        const result = await getModelAccuracy();
        setAccuracy(result.accuracy);
      } catch (err) {
        setAccuracyError(err.message || 'Failed to fetch accuracy');
      } finally {
        setAccuracyLoading(false);
      }
    };
    fetchAccuracy();
  }, []);

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
              {accuracyLoading ? (
                <p className="metric-value">Loading...</p>
              ) : accuracyError ? (
                <p className="metric-value error">{accuracyError}</p>
              ) : accuracy !== null ? (
                <p className="metric-value">{accuracy}%</p>
              ) : (
                <p className="metric-value">--</p>
              )}
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