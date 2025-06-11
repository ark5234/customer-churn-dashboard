// ChurnDashboard.jsx
import React, { useContext } from 'react';
import { DataContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaUserTimes, FaPercentage, FaDollarSign, FaClock, FaChartPie, FaChartBar } from 'react-icons/fa';
import './Dashboard.css';

const ChurnDashboard = () => {
  const { data } = useContext(DataContext);
  const navigate = useNavigate();

  if (!data || data.length === 0) {
    return (
      <div className="dashboard-container">
        <div className="no-data-message">
          <h2>No Data Available</h2>
          <p>Please upload a CSV file to view the Churn Analysis.</p>
          <button className="upload-button" onClick={() => navigate('/upload')}>Upload Data</button>
        </div>
      </div>
    );
  }

  // Metrics
  const totalCustomers = data.length;
  const churned = data.filter(c => c.Churn === 'Yes').length;
  const retained = totalCustomers - churned;
  const churnRate = ((churned / totalCustomers) * 100).toFixed(1);
  const avgMonthlyCharges = (
    data.reduce((sum, c) => sum + parseFloat(c.MonthlyCharges || 0), 0) / totalCustomers
  ).toFixed(2);
  const avgTenure = (
    data.reduce((sum, c) => sum + parseFloat(c.tenure || 0), 0) / totalCustomers
  ).toFixed(1);

  // Churn by contract type
  const contractTypes = ['Month-to-month', 'One year', 'Two year'];
  const churnByContract = contractTypes.map(type => {
    const group = data.filter(c => c.Contract === type);
    const churnedGroup = group.filter(c => c.Churn === 'Yes');
    return {
      type,
      churnRate: group.length ? ((churnedGroup.length / group.length) * 100).toFixed(1) : 0,
      total: group.length
    };
  });

  // Key Insights
  const insights = [
    churnRate > 20 ? 'Churn rate is high. Consider retention strategies for at-risk customers.' : 'Churn rate is under control. Keep monitoring trends.',
    churnByContract[0].churnRate > churnByContract[1].churnRate && churnByContract[0].churnRate > churnByContract[2].churnRate
      ? 'Month-to-month contracts have the highest churn.'
      : 'Longer contracts reduce churn.',
    avgMonthlyCharges > 70 ? 'High monthly charges may be driving churn.' : 'Monthly charges are moderate.'
  ];

  // Top Factors (static for now, could be dynamic with feature importance)
  const topFactors = [
    { label: 'Monthly Charges', value: 85 },
    { label: 'Contract Type', value: 75 },
    { label: 'Tenure', value: 65 }
  ];

  return (
    <div className="dashboard-container churn-analysis-hero">
      <div className="churn-analysis-header">
        <h1>Churn Analysis Overview</h1>
        <p className="churn-analysis-subtitle">
          A quick summary of your customer churn and key business metrics.
        </p>
      </div>
      <div className="churn-metrics-grid">
        <div className="churn-metric-card highlight"><FaUsers className="churn-metric-icon" /><div className="churn-metric-value">{totalCustomers}</div><div className="churn-metric-label">Total Customers</div></div>
        <div className="churn-metric-card"><FaUserTimes className="churn-metric-icon" /><div className="churn-metric-value">{churned}</div><div className="churn-metric-label">Churned</div></div>
        <div className="churn-metric-card"><FaPercentage className="churn-metric-icon" /><div className="churn-metric-value">{churnRate}%</div><div className="churn-metric-label">Churn Rate</div></div>
        <div className="churn-metric-card"><FaDollarSign className="churn-metric-icon" /><div className="churn-metric-value">${avgMonthlyCharges}</div><div className="churn-metric-label">Avg. Monthly Charges</div></div>
        <div className="churn-metric-card"><FaClock className="churn-metric-icon" /><div className="churn-metric-value">{avgTenure} mo</div><div className="churn-metric-label">Avg. Tenure</div></div>
      </div>
      <div className="churn-analysis-visuals">
        <div className="churn-donut-chart">
          <svg width="140" height="140" viewBox="0 0 140 140">
            <circle r="60" cx="70" cy="70" fill="#e5e7eb" />
            <circle
              r="60"
              cx="70"
              cy="70"
              fill="transparent"
              stroke="#2563eb"
              strokeWidth="18"
              strokeDasharray={`${(churned / totalCustomers) * 377}, 377`}
              transform="rotate(-90 70 70)"
            />
          </svg>
          <div className="churn-donut-label">{churnRate}%<br />Churned</div>
        </div>
        <div className="churn-contract-bar">
          <h3><FaChartBar /> Churn by Contract Type</h3>
          <div className="contract-bar-chart">
            {churnByContract.map(c => (
              <div key={c.type} className="contract-bar-group">
                <div className="contract-bar-label">{c.type}</div>
                <div className="contract-bar-outer">
                  <div className="contract-bar-inner" style={{ width: `${c.churnRate}%` }}></div>
                </div>
                <div className="contract-bar-value">{c.churnRate}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="churn-key-insights">
        <h3><FaChartPie /> Key Insights</h3>
        <ul>
          {insights.map((insight, i) => <li key={i}>{insight}</li>)}
        </ul>
      </div>
      <div className="churn-top-factors">
        <h3>Top Factors Impacting Churn</h3>
        <div className="top-factors-list">
          {topFactors.map(f => (
            <div key={f.label} className="top-factor-item">
              <span>{f.label}</span>
              <div className="top-factor-bar" style={{ width: `${f.value}%` }}></div>
              <span className="top-factor-value">{f.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChurnDashboard;
