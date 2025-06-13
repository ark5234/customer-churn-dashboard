import React from 'react';
import { useData } from '../../context/DataContext';
import { FaChartLine, FaUsers, FaMoneyBillWave, FaClock } from 'react-icons/fa';
import './AnalyticsPage.css';

const AnalyticsPage = () => {
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
        <p>Please upload a CSV file to view analytics.</p>
      </div>
    );
  }

  // Calculate metrics
  const totalCustomers = data.length;
  const churnedCustomers = data.filter(customer => customer.churn === 'Yes').length;
  const churnRate = (churnedCustomers / totalCustomers * 100).toFixed(1);
  const avgMonthlyCharges = (data.reduce((sum, customer) => sum + parseFloat(customer.monthly_charges), 0) / totalCustomers).toFixed(2);
  const avgTenure = (data.reduce((sum, customer) => sum + parseFloat(customer.tenure), 0) / totalCustomers).toFixed(1);

  return (
    <div className="analytics-page">
      <h1>Analytics Dashboard</h1>
      
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">
            <FaUsers />
          </div>
          <div className="metric-content">
            <h3>Total Customers</h3>
            <p className="metric-value">{totalCustomers}</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">
            <FaChartLine />
          </div>
          <div className="metric-content">
            <h3>Churn Rate</h3>
            <p className="metric-value">{churnRate}%</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">
            <FaMoneyBillWave />
          </div>
          <div className="metric-content">
            <h3>Avg Monthly Charges</h3>
            <p className="metric-value">${avgMonthlyCharges}</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">
            <FaClock />
          </div>
          <div className="metric-content">
            <h3>Avg Tenure</h3>
            <p className="metric-value">{avgTenure} months</p>
          </div>
        </div>
      </div>

      <div className="analytics-sections">
        <div className="analytics-section">
          <h2>Churn Analysis</h2>
          <div className="chart-container">
            {/* Add your chart component here */}
          </div>
        </div>

        <div className="analytics-section">
          <h2>Customer Distribution</h2>
          <div className="chart-container">
            {/* Add your chart component here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage; 