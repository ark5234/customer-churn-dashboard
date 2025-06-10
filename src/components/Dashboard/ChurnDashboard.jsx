// ChurnDashboard.jsx
import React, { useState, useEffect } from 'react';
import { FaUsers, FaChartLine, FaBullseye, FaBolt, FaChartPie, FaRobot, FaChartBar, FaChartArea } from 'react-icons/fa';
import DashboardCard from './DashboardCard';
import './Dashboard.css';

const ChurnDashboard = ({ 
  data, 
  modelAccuracy = 70.7, 
  runtimeImprovement = 30 
}) => {
  const [selectedTab, setSelectedTab] = useState('analysis');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [metrics, setMetrics] = useState({
    totalCustomers: 0,
    churnRate: 0,
    modelAccuracy,
    runtimeImprovement,
    monthlyChargesChurned: 0,
    monthlyChargesRetained: 0,
    tenureChurned: 0,
    tenureRetained: 0,
    // New metrics for MLOps
    precision: 0,
    recall: 0,
    f1Score: 0,
    cloudUptime: 0,
    avgLatency: 0,
    predictionsPerSec: 0,
    cpuUsage: 0,
    // New metrics for Performance
    totalRecords: 0,
    processingTime: 0,
    throughput: 0,
    monthlyCost: 0,
    storageCost: 0,
    computeCost: 0,
    totalSavings: 0
  });

  useEffect(() => {
    if (!data) return;

    setLoading(true);
    setError(null);

    try {
      // Calculate basic metrics
      const totalCustomers = data.length;
      const churnedCustomers = data.filter(customer => customer.Churn === 'Yes').length;
      const churnRate = (churnedCustomers / totalCustomers) * 100;

      // Calculate monthly charges
      const churnedCharges = data
        .filter(customer => customer.Churn === 'Yes')
        .map(customer => parseFloat(customer.MonthlyCharges || 0));
      const retainedCharges = data
        .filter(customer => customer.Churn === 'No')
        .map(customer => parseFloat(customer.MonthlyCharges || 0));

      // Calculate tenure
      const churnedTenure = data
        .filter(customer => customer.Churn === 'Yes')
        .map(customer => parseInt(customer.tenure || 0));
      const retainedTenure = data
        .filter(customer => customer.Churn === 'No')
        .map(customer => parseInt(customer.tenure || 0));

      // Calculate model performance metrics
      const truePositives = data.filter(customer => 
        customer.Churn === 'Yes' && customer.PredictedChurn === 'Yes'
      ).length;
      const falsePositives = data.filter(customer => 
        customer.Churn === 'No' && customer.PredictedChurn === 'Yes'
      ).length;
      const falseNegatives = data.filter(customer => 
        customer.Churn === 'Yes' && customer.PredictedChurn === 'No'
      ).length;

      const precision = truePositives / (truePositives + falsePositives) * 100;
      const recall = truePositives / (truePositives + falseNegatives) * 100;
      const f1Score = 2 * (precision * recall) / (precision + recall);

      // Calculate system metrics
      const avgLatency = data.reduce((acc, customer) => 
        acc + (customer.ProcessingTime || 0), 0) / data.length;
      const predictionsPerSec = data.filter(customer => 
        customer.ProcessingTime && customer.ProcessingTime < 1000
      ).length;
      const cpuUsage = data.reduce((acc, customer) => 
        acc + (customer.CPUUsage || 0), 0) / data.length;

      // Calculate cost metrics
      const processingTime = data.reduce((acc, customer) => 
        acc + (customer.ProcessingTime || 0), 0) / 1000; // Convert to seconds
      const throughput = totalCustomers / (processingTime / 60); // Records per minute
      const monthlyCost = totalCustomers * 0.01; // $0.01 per record
      const storageCost = totalCustomers * 0.005; // $0.005 per record
      const computeCost = processingTime * 0.0001; // $0.0001 per second
      const totalSavings = monthlyCost * (runtimeImprovement / 100);

      const newMetrics = {
        totalCustomers,
        churnRate: churnRate.toFixed(1),
        modelAccuracy,
        runtimeImprovement,
        monthlyChargesChurned: (churnedCharges.reduce((a, b) => a + b, 0) / churnedCharges.length).toFixed(2),
        monthlyChargesRetained: (retainedCharges.reduce((a, b) => a + b, 0) / retainedCharges.length).toFixed(2),
        tenureChurned: (churnedTenure.reduce((a, b) => a + b, 0) / churnedTenure.length).toFixed(2),
        tenureRetained: (retainedTenure.reduce((a, b) => a + b, 0) / retainedTenure.length).toFixed(2),
        // MLOps metrics
        precision: precision.toFixed(1),
        recall: recall.toFixed(1),
        f1Score: f1Score.toFixed(1),
        cloudUptime: 99.9, // This would come from your cloud provider
        avgLatency: avgLatency.toFixed(0),
        predictionsPerSec,
        cpuUsage: cpuUsage.toFixed(1),
        // Performance metrics
        totalRecords: totalCustomers,
        processingTime: (processingTime / 60).toFixed(1), // Convert to minutes
        throughput: throughput.toFixed(0),
        monthlyCost: monthlyCost.toFixed(2),
        storageCost: storageCost.toFixed(2),
        computeCost: computeCost.toFixed(2),
        totalSavings: totalSavings.toFixed(2)
      };

      setMetrics(newMetrics);
    } catch (err) {
      console.error('Error calculating metrics:', err);
      setError('Failed to calculate metrics. Please check your data format.');
    } finally {
      setLoading(false);
    }
  }, [data, modelAccuracy, runtimeImprovement]);

  const navigationTabs = [
    { id: 'analysis', label: 'Churn Analysis', icon: <FaChartPie /> },
    { id: 'monitoring', label: 'MLOps Monitoring', icon: <FaRobot /> },
    { id: 'predictions', label: 'Live Predictions', icon: <FaChartBar /> },
    { id: 'performance', label: 'Performance Analytics', icon: <FaChartArea /> }
  ];

  const safeDivide = (num, denom) => denom ? (num / denom) * 100 : 0;

  const getContractChurnRates = () => {
    if (!data) return { monthToMonth: 0, oneYear: 0, twoYear: 0 };

    const contractTypes = {
      'Month-to-month': { total: 0, churned: 0 },
      'One year': { total: 0, churned: 0 },
      'Two year': { total: 0, churned: 0 }
    };

    data.forEach(customer => {
      const contract = customer.Contract;
      if (contractTypes[contract]) {
        contractTypes[contract].total++;
        if (customer.Churn === 'Yes') {
          contractTypes[contract].churned++;
        }
      }
    });

    return {
      monthToMonth: safeDivide(contractTypes['Month-to-month'].churned, contractTypes['Month-to-month'].total).toFixed(1),
      oneYear: safeDivide(contractTypes['One year'].churned, contractTypes['One year'].total).toFixed(1),
      twoYear: safeDivide(contractTypes['Two year'].churned, contractTypes['Two year'].total).toFixed(1)
    };
  };

  const contractRates = getContractChurnRates();

  const renderChurnAnalysis = () => (
    <div className="tab-content">
      <div className="insights-grid">
        <div className="insight-card contract-analysis">
          <h3>Churn Rate by Contract Type</h3>
          <div className="chart-placeholder">
            <div className="chart-data">
              <div className="chart-bar" style={{ height: `${contractRates.monthToMonth}%` }}>
                <span>Month-to-Month</span>
                <span>{contractRates.monthToMonth}%</span>
              </div>
              <div className="chart-bar" style={{ height: `${contractRates.oneYear}%` }}>
                <span>One Year</span>
                <span>{contractRates.oneYear}%</span>
              </div>
              <div className="chart-bar" style={{ height: `${contractRates.twoYear}%` }}>
                <span>Two Year</span>
                <span>{contractRates.twoYear}%</span>
              </div>
            </div>
          </div>
          <p className="insight-text">
            Month-to-month contracts show {contractRates.monthToMonth}% churn rate vs {contractRates.twoYear}% for two-year contracts
          </p>
        </div>

        <div className="insight-card feature-importance">
          <h3>Feature Importance Analysis</h3>
          <div className="chart-placeholder">
            <div className="feature-list">
              <div className="feature-item">
                <span>Monthly Charges</span>
                <div className="feature-bar" style={{ width: '85%' }}></div>
              </div>
              <div className="feature-item">
                <span>Contract Type</span>
                <div className="feature-bar" style={{ width: '75%' }}></div>
              </div>
              <div className="feature-item">
                <span>Tenure</span>
                <div className="feature-bar" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>
          <p className="insight-text">
            Monthly charges and total charges are the strongest predictors of customer churn
          </p>
        </div>
      </div>

      <div className="churn-insights">
        <h3>Churn Insights</h3>
        <div className="insights-grid">
          <DashboardCard
            icon={<FaChartLine />}
            value={`$${metrics.monthlyChargesChurned}`}
            label="Avg Monthly Charges (Churned)"
            color="blue"
          />
          <DashboardCard
            icon={<FaChartLine />}
            value={`$${metrics.monthlyChargesRetained}`}
            label="Avg Monthly Charges (Retained)"
            color="green"
          />
          <DashboardCard
            icon={<FaChartBar />}
            value={`${metrics.tenureChurned} months`}
            label="Avg Tenure (Churned)"
            color="red"
          />
          <DashboardCard
            icon={<FaChartBar />}
            value={`${metrics.tenureRetained} months`}
            label="Avg Tenure (Retained)"
            color="purple"
          />
        </div>
      </div>
    </div>
  );

  const renderMLOpsMonitoring = () => (
    <div className="tab-content">
      <div className="insights-grid">
        <div className="insight-card pipeline-status">
          <h3>MLOps Pipeline Monitoring</h3>
          <div className="pipeline-steps">
            <div className="pipeline-step completed">
              <span className="step-icon">✓</span>
              <span className="step-label">Data Ingestion</span>
            </div>
            <div className="pipeline-step completed">
              <span className="step-icon">✓</span>
              <span className="step-label">Feature Engineering</span>
            </div>
            <div className="pipeline-step active">
              <span className="step-icon">⟳</span>
              <span className="step-label">Model Training</span>
            </div>
            <div className="pipeline-step">
              <span className="step-icon">○</span>
              <span className="step-label">Model Deployment</span>
            </div>
          </div>
        </div>

        <div className="insight-card model-metrics">
          <h3>Model Performance Metrics</h3>
          <div className="metrics-grid">
            <DashboardCard
              icon={<FaBullseye />}
              value={`${metrics.modelAccuracy}%`}
              label="Accuracy"
              color="green"
            />
            <DashboardCard
              icon={<FaChartLine />}
              value={`${metrics.precision}%`}
              label="Precision"
              color="blue"
            />
            <DashboardCard
              icon={<FaChartBar />}
              value={`${metrics.recall}%`}
              label="Recall"
              color="purple"
            />
            <DashboardCard
              icon={<FaChartPie />}
              value={`${metrics.f1Score}%`}
              label="F1 Score"
              color="cyan"
            />
          </div>
        </div>
      </div>

      <div className="deployment-stats">
        <h3>Deployment Statistics</h3>
        <div className="stats-grid">
          <DashboardCard
            icon={<FaBolt />}
            value={`${metrics.cloudUptime}%`}
            label="Cloud Uptime"
            color="green"
          />
          <DashboardCard
            icon={<FaChartLine />}
            value={`${metrics.avgLatency}ms`}
            label="Avg Latency"
            color="blue"
          />
          <DashboardCard
            icon={<FaChartBar />}
            value={`${metrics.predictionsPerSec}/sec`}
            label="Predictions/sec"
            color="purple"
          />
          <DashboardCard
            icon={<FaChartPie />}
            value={`${metrics.cpuUsage}%`}
            label="CPU Usage"
            color="cyan"
          />
        </div>
      </div>
    </div>
  );

  const renderLivePredictions = () => (
    <div className="tab-content">
      <div className="prediction-form">
        <h3>Live Churn Prediction</h3>
        <form className="customer-input-form">
          <div className="form-group">
            <label>Monthly Charges ($)</label>
            <input type="number" placeholder="Enter monthly charges" />
          </div>
          <div className="form-group">
            <label>Tenure (months)</label>
            <input type="number" placeholder="Enter tenure in months" />
          </div>
          <div className="form-group">
            <label>Contract Type</label>
            <select>
              <option>Month-to-month</option>
              <option>One year</option>
              <option>Two year</option>
            </select>
          </div>
          <div className="form-group">
            <label>Total Charges ($)</label>
            <input type="number" placeholder="Enter total charges" />
          </div>
          <button type="submit" className="predict-button">Predict Churn Risk</button>
        </form>
      </div>

      <div className="prediction-results">
        <h3>Churn Risk Assessment</h3>
        <div className="risk-assessment">
          <p className="placeholder-text">-- Enter customer data to predict churn risk</p>
        </div>
        <h3>Retention Recommendations</h3>
        <div className="recommendations">
          <p className="placeholder-text">Complete the form to get personalized recommendations</p>
        </div>
      </div>

      <div className="processing-stats">
        <h3>Real-time Processing</h3>
        <div className="stats-grid">
          <DashboardCard
            icon={<FaChartLine />}
            value="2.5k"
            label="Records Processed Today"
            color="blue"
          />
          <DashboardCard
            icon={<FaChartBar />}
            value="150"
            label="High Risk Customers"
            color="red"
          />
          <DashboardCard
            icon={<FaBolt />}
            value="45ms"
            label="Avg Processing Time"
            color="green"
          />
          <DashboardCard
            icon={<FaChartPie />}
            value="v2.1.0"
            label="Model Version"
            color="purple"
          />
        </div>
      </div>
    </div>
  );

  const renderPerformanceAnalytics = () => (
    <div className="tab-content">
      <div className="performance-section">
        <h3>Pipeline Runtime Optimization</h3>
        <div className="optimization-stats">
          <p>Runtime reduced from 45 to {metrics.processingTime} minutes, achieving {metrics.runtimeImprovement}% improvement</p>
        </div>
      </div>

      <div className="processing-summary">
        <h3>Processing Summary</h3>
        <div className="stats-grid">
          <DashboardCard
            icon={<FaChartLine />}
            value={metrics.totalRecords.toLocaleString()}
            label="Total Records"
            color="blue"
          />
          <DashboardCard
            icon={<FaBolt />}
            value={`${metrics.processingTime} min`}
            label="Processing Time"
            color="green"
          />
          <DashboardCard
            icon={<FaChartBar />}
            value={`${metrics.throughput}/min`}
            label="Throughput"
            color="purple"
          />
          <DashboardCard
            icon={<FaChartPie />}
            value={`${metrics.runtimeImprovement}%`}
            label="Improvement"
            color="cyan"
          />
        </div>
      </div>

      <div className="cost-optimization">
        <h3>Cost Optimization</h3>
        <div className="stats-grid">
          <DashboardCard
            icon={<FaChartLine />}
            value={`$${metrics.monthlyCost}`}
            label="Monthly Processing Cost"
            color="blue"
          />
          <DashboardCard
            icon={<FaChartBar />}
            value={`$${metrics.storageCost}`}
            label="Storage Cost"
            color="purple"
          />
          <DashboardCard
            icon={<FaBolt />}
            value={`$${metrics.computeCost}`}
            label="Compute Resources"
            color="green"
          />
          <DashboardCard
            icon={<FaChartPie />}
            value={`$${metrics.totalSavings}`}
            label="Total Monthly Savings"
            color="cyan"
          />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-state">
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="dashboard-container">
        <div className="no-data-message">
          <h2>No Data Available</h2>
          <p>Please upload a CSV file to view the dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="dashboard-title">
          <h1>Customer Churn Prediction System</h1>
          <p>Automated ML pipelines for telecommunications customer retention</p>
        </div>
      </header>

      <div className="metrics-grid">
        <DashboardCard
          icon={<FaUsers />}
          value={metrics.totalCustomers.toLocaleString()}
          label="Total Customers"
          color="cyan"
        />
        <DashboardCard
          icon={<FaChartLine />}
          value={`${metrics.churnRate}%`}
          label="Churn Rate"
          color="blue"
        />
        <DashboardCard
          icon={<FaBullseye />}
          value={`${metrics.modelAccuracy}%`}
          label="Model Accuracy"
          color="green"
        />
        <DashboardCard
          icon={<FaBolt />}
          value={`${metrics.runtimeImprovement}%`}
          label="Runtime Improvement"
          color="purple"
        />
      </div>

      <nav className="dashboard-navigation" aria-label="Dashboard Navigation">
        {navigationTabs.map(tab => (
          <button
            key={tab.id}
            className={`nav-tab ${selectedTab === tab.id ? 'active' : ''}`}
            onClick={() => setSelectedTab(tab.id)}
            aria-pressed={selectedTab === tab.id}
          >
            <span className="tab-icon" aria-hidden="true">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="dashboard-content">
        {selectedTab === 'analysis' && renderChurnAnalysis()}
        {selectedTab === 'monitoring' && renderMLOpsMonitoring()}
        {selectedTab === 'predictions' && renderLivePredictions()}
        {selectedTab === 'performance' && renderPerformanceAnalytics()}
      </main>
    </div>
  );
};

export default ChurnDashboard;
