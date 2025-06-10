import React from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

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

export default ChurnInsights; 