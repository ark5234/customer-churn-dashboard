// ChurnDashboard.jsx
import React, { useContext } from 'react';
import { DataContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaUserTimes, FaPercentage, FaDollarSign, FaClock, FaChartPie, FaChartBar, FaArrowUp, FaArrowDown, FaBullseye, FaBolt } from 'react-icons/fa';
import '../../App.css';
import DashboardHero from './DashboardHero';

// Inlined ChurnInsights component
const ChurnInsights = ({ metrics }) => {
  const churnInsights = [
    {
      label: 'Avg Monthly Charges (Churned)',
      value: `$${metrics.monthlyChargesChurned}`,
      trend: 'up'
    },
    {
      label: 'Avg Monthly Charges (Retained)',
      value: `$${metrics.monthlyChargesRetained}`,
      trend: 'down'
    },
    {
      label: 'Avg Tenure (Churned)',
      value: `${metrics.tenureChurned} months`,
      trend: 'down'
    },
    {
      label: 'Avg Tenure (Retained)',
      value: `${metrics.tenureRetained} months`,
      trend: 'up'
    }
  ];
  return (
    <div className="churn-insights-grid">
      {churnInsights.map((insight, index) => (
        <div key={index} className={`churn-insight-card ${insight.trend}`}>
          <h4>{insight.label}</h4>
          <div className="insight-value">
            {insight.trend === 'up' ? (
              <FaArrowUp className="trend-up" />
            ) : (
              <FaArrowDown className="trend-down" />
            )}
            {insight.value}
          </div>
        </div>
      ))}
    </div>
  );
};

// Inlined MainMetrics component
const MainMetrics = ({ metrics }) => {
  const mainMetrics = [
    {
      id: 'customers',
      label: 'Total Customers',
      value: metrics.totalCustomers?.toLocaleString?.() ?? metrics.totalCustomers,
      icon: <FaUsers />, color: 'var(--primary-color)'
    },
    {
      id: 'churnRate',
      label: 'Churn Rate',
      value: `${metrics.churnRate}%`,
      icon: <FaChartLine />, color: 'var(--warning-color)'
    },
    {
      id: 'accuracy',
      label: 'Model Accuracy',
      value: `${metrics.modelAccuracy ?? '--'}%`,
      icon: <FaBullseye />, color: 'var(--success-color)'
    },
    {
      id: 'performance',
      label: 'Runtime Improvement',
      value: `${metrics.runtimeImprovement ?? '--'}%`,
      icon: <FaBolt />, color: 'var(--secondary-color)'
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
    <div className="dashboard-container">
      <DashboardHero
        totalCustomers={totalCustomers}
        churned={churned}
        churnRate={churnRate}
        avgMonthlyCharges={avgMonthlyCharges}
      />
      {/* Graphs Section */}
      <div className="dashboard-section">
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
      </div>

      {/* Insights Section */}
      <div className="dashboard-section">
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
    </div>
  );
};

export default ChurnDashboard;
