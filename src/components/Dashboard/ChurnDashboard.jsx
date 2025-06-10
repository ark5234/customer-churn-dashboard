// ChurnDashboard.jsx
import React, { useState, useEffect } from 'react';
import ChurnMetrics from './ChurnMetrics';
import ChurnRateChart from '../Charts/ChurnRateChart';
import CustomerSegmentChart from '../Charts/CustomerSegmentChart';
import Card from '../shared/Card';
import './Dashboard.css';

const ChurnDashboard = ({ data }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [filteredData, setFilteredData] = useState(data);
  
  // Reset filtered data when new data is provided
  useEffect(() => {
    setFilteredData(data);
  }, [data]);
  
  // Handle tab switching
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  // Handle filtering options
  const handleFilterChange = (filterType, value) => {
    // Implement filtering logic based on the filter type and value
    if (filterType === 'reset') {
      setFilteredData(data);
      return;
    }
    
    // Apply filters to the data
    const newFilteredData = {
      ...data,
      rawData: data.rawData.filter(customer => {
        // Apply different filter criteria based on filterType
        switch (filterType) {
          case 'contract':
            return customer.Contract === value;
          case 'tenure':
            // Example: filter by tenure range
            const [min, max] = value.split('-').map(Number);
            if (max) {
              return customer.Tenure >= min && customer.Tenure <= max;
            } else {
              return customer.Tenure >= min;
            }
          case 'internetService':
            return customer.InternetService === value;
          default:
            return true;
        }
      })
    };
    
    // Recalculate metrics for the filtered data
    // This would typically call the same metrics calculation function used in dataProcessing.js
    // For simplicity, we'll just update the filtered data
    setFilteredData(newFilteredData);
  };
  
  return (
    <div className="churn-dashboard">
      <div className="dashboard-header">
        <h2>Customer Churn Analysis</h2>
        
        <div className="dashboard-tabs">
          <button 
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => handleTabChange('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab-button ${activeTab === 'segments' ? 'active' : ''}`}
            onClick={() => handleTabChange('segments')}
          >
            Customer Segments
          </button>
          <button 
            className={`tab-button ${activeTab === 'predictions' ? 'active' : ''}`}
            onClick={() => handleTabChange('predictions')}
          >
            Predictions
          </button>
        </div>
        
        <div className="dashboard-filters">
          <div className="filter-group">
            <label htmlFor="contractFilter">Contract:</label>
            <select 
              id="contractFilter" 
              onChange={(e) => handleFilterChange('contract', e.target.value)}
            >
              <option value="">All Contracts</option>
              <option value="Month-to-month">Month-to-month</option>
              <option value="One year">One year</option>
              <option value="Two year">Two year</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="tenureFilter">Tenure:</label>
            <select 
              id="tenureFilter" 
              onChange={(e) => handleFilterChange('tenure', e.target.value)}
            >
              <option value="">All Tenure</option>
              <option value="0-12">0-12 months</option>
              <option value="13-24">13-24 months</option>
              <option value="25-36">25-36 months</option>
              <option value="37-48">37-48 months</option>
              <option value="49-60">49-60 months</option>
              <option value="60-">60+ months</option>
            </select>
          </div>
          
          <button 
            className="reset-filters-button"
            onClick={() => handleFilterChange('reset')}
          >
            Reset Filters
          </button>
        </div>
      </div>
      
      <div className="dashboard-content">
        {activeTab === 'overview' && (
          <div className="dashboard-overview">
            <div className="metrics-row">
              <ChurnMetrics data={filteredData} />
            </div>
            
            <div className="charts-row">
              <Card title="Churn Rate by Contract Type">
                <ChurnRateChart 
                  data={filteredData.segments?.byContract || {}} 
                  type="contract"
                />
              </Card>
              
              <Card title="Churn Rate by Tenure">
                <ChurnRateChart 
                  data={filteredData.segments?.byTenure || {}} 
                  type="tenure"
                />
              </Card>
            </div>
            
            <div className="table-row">
              <Card title="Top Churning Customers">
                <div className="customer-table-container">
                  <table className="customer-table">
                    <thead>
                      <tr>
                        <th>Customer ID</th>
                        <th>Tenure</th>
                        <th>Monthly Charges</th>
                        <th>Contract</th>
                        <th>Churn Probability</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.rawData.slice(0, 10).map((customer, index) => (
                        <tr key={customer.CustomerID || index}>
                          <td>{customer.CustomerID}</td>
                          <td>{customer.Tenure} months</td>
                          <td>${customer.MonthlyCharges.toFixed(2)}</td>
                          <td>{customer.Contract}</td>
                          <td>
                            <div className="probability-indicator" style={{
                              // Simple visual indicator of churn probability
                              // In a real app, this would come from a prediction model
                              width: `${customer.Churn ? 85 : 25}%`,
                              backgroundColor: customer.Churn ? '#ff6b6b' : '#4ecdc4'
                            }}></div>
                            {customer.Churn ? '85%' : '25%'}
                          </td>
                          <td className={customer.Churn ? 'churned' : 'active'}>
                            {customer.Churn ? 'Churned' : 'Active'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </div>
        )}
        
        {activeTab === 'segments' && (
          <div className="dashboard-segments">
            <div className="charts-row">
              <Card title="Customer Segments">
                <CustomerSegmentChart data={filteredData} />
              </Card>
              
              <Card title="Segment Metrics">
                <div className="segment-metrics">
                  <div className="segment-metric">
                    <h3>Month-to-month Contract</h3>
                    <p className="metric-value">
                      {(filteredData.segments?.byContract?.['Month-to-month']?.churnRate * 100 || 0).toFixed(1)}%
                    </p>
                    <p className="metric-label">Churn Rate</p>
                  </div>
                  
                  <div className="segment-metric">
                    <h3>One Year Contract</h3>
                    <p className="metric-value">
                      {(filteredData.segments?.byContract?.['One year']?.churnRate * 100 || 0).toFixed(1)}%
                    </p>
                    <p className="metric-label">Churn Rate</p>
                  </div>
                  
                  <div className="segment-metric">
                    <h3>Two Year Contract</h3>
                    <p className="metric-value">
                      {(filteredData.segments?.byContract?.['Two year']?.churnRate * 100 || 0).toFixed(1)}%
                    </p>
                    <p className="metric-label">Churn Rate</p>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="charts-row">
              <Card title="Customer Behavior Analysis">
                <div className="behavior-analysis">
                  <div className="behavior-metric">
                    <h3>Avg. Monthly Charges</h3>
                    <div className="comparison-metrics">
                      <div className="comparison-metric">
                        <p className="metric-value">${filteredData.metrics?.avgMonthlyChargesChurned.toFixed(2)}</p>
                        <p className="metric-label">Churned Customers</p>
                      </div>
                      <div className="comparison-metric">
                        <p className="metric-value">${filteredData.metrics?.avgMonthlyChargesRetained.toFixed(2)}</p>
                        <p className="metric-label">Retained Customers</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="behavior-metric">
                    <h3>Avg. Tenure</h3>
                    <p className="metric-value">{filteredData.metrics?.avgTenure.toFixed(1)} months</p>
                    <p className="metric-label">All Customers</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
        
        {activeTab === 'predictions' && (
          <div className="dashboard-predictions">
            <Card title="Churn Risk Assessment">
              <div className="risk-assessment">
                <div className="risk-group">
                  <h3>High Risk</h3>
                  <div className="risk-count">
                    <span className="count">
                      {filteredData.rawData.filter(c => c.Churn).length}
                    </span>
                    <span className="label">Customers</span>
                  </div>
                  <p className="risk-description">
                    Customers with high probability of churning within the next month
                  </p>
                </div>
                
                <div className="risk-group">
                  <h3>Medium Risk</h3>
                  <div className="risk-count">
                    <span className="count">
                      {Math.floor(filteredData.rawData.filter(c => !c.Churn).length * 0.3)}
                    </span>
                    <span className="label">Customers</span>
                  </div>
                  <p className="risk-description">
                    Customers with moderate probability of churning within 2-3 months
                  </p>
                </div>
                
                <div className="risk-group">
                  <h3>Low Risk</h3>
                  <div className="risk-count">
                    <span className="count">
                      {Math.floor(filteredData.rawData.filter(c => !c.Churn).length * 0.7)}
                    </span>
                    <span className="label">Customers</span>
                  </div>
                  <p className="risk-description">
                    Customers with low probability of churning in the near future
                  </p>
                </div>
              </div>
            </Card>
            
            <Card title="Recommended Actions">
              <div className="action-recommendations">
                <div className="action-group">
                  <h3>For High Risk Customers</h3>
                  <ul className="action-list">
                    <li>Immediate outreach with personalized retention offers</li>
                    <li>Offer contract upgrades with significant incentives</li>
                    <li>Address service issues through dedicated support</li>
                    <li>Provide free service upgrades for 3 months</li>
                  </ul>
                </div>
                
                <div className="action-group">
                  <h3>For Medium Risk Customers</h3>
                  <ul className="action-list">
                    <li>Proactive check-ins to assess satisfaction</li>
                    <li>Targeted email campaigns with loyalty rewards</li>
                    <li>Service review and potential upgrade offers</li>
                    <li>Customer satisfaction surveys with incentives</li>
                  </ul>
                </div>
                
                <div className="action-group">
                  <h3>For Low Risk Customers</h3>
                  <ul className="action-list">
                    <li>Regular engagement through newsletter and updates</li>
                    <li>Cross-selling and upselling opportunities</li>
                    <li>Loyalty program enrollment and benefits</li>
                    <li>Encourage referrals through rewards program</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChurnDashboard;
