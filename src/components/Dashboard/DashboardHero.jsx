import React from 'react';
import { FaExclamationTriangle, FaUsers, FaUserTimes, FaPercentage, FaDollarSign, FaArrowUp, FaArrowDown, FaLightbulb } from 'react-icons/fa';
import '../../App.css';

const DashboardHero = ({ totalCustomers, churned, churnRate, avgMonthlyCharges }) => {
  // Example data for demonstration
  const lastMonthChurnRate = 24.4; // You could make this dynamic
  const churnRateNum = parseFloat(churnRate);
  const churnDelta = (churnRateNum - lastMonthChurnRate).toFixed(1);
  const isChurnUp = churnDelta > 0;
  const revenueAtRisk = (churned * avgMonthlyCharges).toLocaleString(undefined, { maximumFractionDigits: 0 });
  const lastUpdated = new Date().toLocaleDateString();
  const topReason = 'High Monthly Charges';

  return (
    <section className="dashboard-hero-card dashboard-hero-2col">
      <div className="dashboard-hero-col dashboard-hero-main">
        <div className="dashboard-hero-churnrate-block">
          <div className="dashboard-hero-churnrate-big">
            {churnRate}%
            <span className={`dashboard-hero-trend-badge ${isChurnUp ? 'danger' : 'success'}`}
              title={isChurnUp ? 'Churn rate increased' : 'Churn rate decreased'}>
              {isChurnUp ? <FaArrowUp /> : <FaArrowDown />} {Math.abs(churnDelta)}%
            </span>
          </div>
          <div className="dashboard-hero-churnrate-label">Churn Rate</div>
        </div>
        <div className="dashboard-hero-revenue-risk">
          <FaDollarSign style={{ color: '#f59e0b', marginRight: 6 }} />
          <span className="dashboard-hero-revenue-risk-label">Revenue at Risk:</span>
          <span className="dashboard-hero-revenue-risk-value">${revenueAtRisk}</span>
        </div>
        <div className="dashboard-hero-last-updated">Last updated: {lastUpdated}</div>
      </div>
      <div className="dashboard-hero-col dashboard-hero-side">
        <div className="dashboard-hero-metrics-row">
          <div className="dashboard-hero-metric-card">
            <div className="dashboard-hero-metric-icon" style={{ background: '#2563eb22', color: '#2563eb' }}><FaUsers /></div>
            <div className="dashboard-hero-metric-value">{totalCustomers}</div>
            <div className="dashboard-hero-metric-label">Total Customers</div>
          </div>
          <div className="dashboard-hero-metric-card">
            <div className="dashboard-hero-metric-icon" style={{ background: '#ef444422', color: '#ef4444' }}><FaUserTimes /></div>
            <div className="dashboard-hero-metric-value">{churned}</div>
            <div className="dashboard-hero-metric-label">Churned</div>
          </div>
          <div className="dashboard-hero-metric-card">
            <div className="dashboard-hero-metric-icon" style={{ background: '#10b98122', color: '#10b981' }}><FaDollarSign /></div>
            <div className="dashboard-hero-metric-value">${avgMonthlyCharges}</div>
            <div className="dashboard-hero-metric-label">Avg. Monthly Charges</div>
          </div>
        </div>
        <div className="dashboard-hero-recommendation">
          <div className="dashboard-hero-recommend-title"><FaLightbulb style={{ color: '#f59e0b', marginRight: 6 }} /> Recommendation</div>
          <div className="dashboard-hero-recommend-text">
            Focus on reducing <b>{topReason}</b> to improve retention. Consider targeted offers or discounts for at-risk customers.
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardHero; 