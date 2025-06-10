// ChurnDashboard.jsx
import React from 'react';
import ChurnMetrics from './ChurnMetrics';
import ChurnRateChart from '../Charts/ChurnRateChart';
import CustomerSegmentChart from '../Charts/CustomerSegmentChart';
import Card from '../shared/Card';
import './Dashboard.css';

const ChurnDashboard = ({ data }) => {
  const metrics = {
    totalCustomers: data?.totalCustomers || 0,
    churnedCustomers: data?.churnedCustomers || 0,
    churnRate: data?.churnRate || 0,
    averageTenure: data?.averageTenure || 0,
    revenueImpact: data?.revenueImpact || 0
  };

  const churnRateData = {
    labels: data?.churnRateHistory?.map(item => item.date) || [],
    values: data?.churnRateHistory?.map(item => item.rate) || []
  };

  const segmentData = {
    labels: data?.customerSegments?.map(item => item.segment) || [],
    values: data?.customerSegments?.map(item => item.count) || []
  };

  return (
    <div className="dashboard-container">
      <div className="metrics-section">
        <h2 className="section-title">Key Metrics</h2>
        <ChurnMetrics metrics={metrics} />
      </div>

      <div className="charts-section">
        <Card title="Churn Rate Trend" className="chart-card">
          <ChurnRateChart data={churnRateData} />
        </Card>

        <Card title="Customer Segments" className="chart-card">
          <CustomerSegmentChart data={segmentData} />
        </Card>
      </div>

      {data?.insights && (
        <div className="insights-section">
          <Card title="Key Insights" className="insights-card">
            <ul className="insights-list">
              {data.insights.map((insight, index) => (
                <li key={index} className="insight-item">
                  {insight}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ChurnDashboard;
