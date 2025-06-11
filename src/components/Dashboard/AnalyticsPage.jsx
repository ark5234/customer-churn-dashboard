import React, { useContext } from 'react';
import { DataContext } from '../../App';
import { FaChartBar, FaChartPie, FaDownload } from 'react-icons/fa';

const AnalyticsPage = () => {
  const { data } = useContext(DataContext);

  if (!data || data.length === 0) {
    return (
      <div className="dashboard-container">
        <div className="no-data-message">
          <h2>No Data Available</h2>
          <p>Please upload a CSV file to view analytics.</p>
        </div>
      </div>
    );
  }

  // Summary stats
  const totalCustomers = data.length;
  const churned = data.filter(c => c.Churn === 'Yes').length;
  const churnRate = ((churned / totalCustomers) * 100).toFixed(1);
  const avgTenure = (
    data.reduce((sum, c) => sum + parseFloat(c.tenure || 0), 0) / totalCustomers
  ).toFixed(1);
  const avgMonthlyCharges = (
    data.reduce((sum, c) => sum + parseFloat(c.MonthlyCharges || 0), 0) / totalCustomers
  ).toFixed(2);

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

  // Customer distribution by contract type
  const totalByContract = contractTypes.map(type => data.filter(c => c.Contract === type).length);

  // Feature importance (static for now)
  const featureImportance = [
    { label: 'Monthly Charges', value: 85 },
    { label: 'Contract Type', value: 75 },
    { label: 'Tenure', value: 65 }
  ];

  // Download CSV
  const handleDownload = () => {
    const csv = [Object.keys(data[0]).join(',')].concat(data.map(row => Object.values(row).join(','))).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'customer-churn-data.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="dashboard-container">
      <h2>Analytics</h2>
      <div className="churn-metrics-grid">
        <div className="churn-metric-card highlight"><div className="churn-metric-value">{totalCustomers}</div><div className="churn-metric-label">Total Customers</div></div>
        <div className="churn-metric-card"><div className="churn-metric-value">{churned}</div><div className="churn-metric-label">Churned</div></div>
        <div className="churn-metric-card"><div className="churn-metric-value">{churnRate}%</div><div className="churn-metric-label">Churn Rate</div></div>
        <div className="churn-metric-card"><div className="churn-metric-value">${avgMonthlyCharges}</div><div className="churn-metric-label">Avg. Monthly Charges</div></div>
        <div className="churn-metric-card"><div className="churn-metric-value">{avgTenure} mo</div><div className="churn-metric-label">Avg. Tenure</div></div>
      </div>
      <div className="analytics-visuals">
        <div className="analytics-bar-chart">
          <h3><FaChartBar /> Churn Rate by Contract Type</h3>
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
        <div className="analytics-pie-chart">
          <h3><FaChartPie /> Customer Distribution by Contract</h3>
          <svg width="140" height="140" viewBox="0 0 140 140">
            {(() => {
              let acc = 0;
              return totalByContract.map((val, i) => {
                const percent = val / totalCustomers;
                const dash = percent * 377;
                const el = (
                  <circle
                    key={contractTypes[i]}
                    r="60"
                    cx="70"
                    cy="70"
                    fill="transparent"
                    stroke={['#2563eb', '#10b981', '#f59e42'][i]}
                    strokeWidth="18"
                    strokeDasharray={`${dash}, 377`}
                    strokeDashoffset={-acc}
                  />
                );
                acc += dash;
                return el;
              });
            })()}
          </svg>
          <div className="analytics-pie-legend">
            {contractTypes.map((type, i) => (
              <div key={type} className="pie-legend-item">
                <span className="pie-legend-color" style={{ background: ['#2563eb', '#10b981', '#f59e42'][i] }}></span>
                {type} ({totalByContract[i]})
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="churn-top-factors">
        <h3>Top Features Impacting Churn</h3>
        <div className="top-factors-list">
          {featureImportance.map(f => (
            <div key={f.label} className="top-factor-item">
              <span>{f.label}</span>
              <div className="top-factor-bar" style={{ width: `${f.value}%` }}></div>
              <span className="top-factor-value">{f.value}%</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button className="upload-button" onClick={handleDownload}><FaDownload style={{ marginRight: 8 }} />Download Data (CSV)</button>
      </div>
    </div>
  );
};

export default AnalyticsPage; 