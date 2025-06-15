import React from 'react';
import { useData } from '../../context/DataContext';
import { FaChartLine, FaUsers, FaMoneyBillWave, FaClock } from 'react-icons/fa';
import './AnalyticsPage.css';
// Import new analysis components
import ChurnSummary from '../Analysis/sections/ChurnSummary';
import FeatureImpact from '../Analysis/sections/FeatureImpact';
import DemographicBreakdown from '../Analysis/sections/DemographicBreakdown';
import ServicesAnalysis from '../Analysis/sections/ServicesAnalysis';
import CommunicationImpact from '../Analysis/sections/CommunicationImpact';
import TenureAnalysis from '../Analysis/sections/TenureAnalysis';
import BillingAnalysis from '../Analysis/sections/BillingAnalysis';
import PaymentAnalysis from '../Analysis/sections/PaymentAnalysis';
import ContractAnalysis from '../Analysis/sections/ContractAnalysis';
import PredictiveDashboard from '../Analysis/sections/PredictiveDashboard';
import SegmentExplorer from '../Analysis/sections/SegmentExplorer';
import InsightsSummary from '../Analysis/sections/InsightsSummary';

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
          <ChurnSummary />
        </div>
        <div className="analytics-section">
          <FeatureImpact />
        </div>
        <div className="analytics-section">
          <DemographicBreakdown />
        </div>
        <div className="analytics-section">
          <ServicesAnalysis />
        </div>
        <div className="analytics-section">
          <CommunicationImpact />
        </div>
        <div className="analytics-section">
          <TenureAnalysis />
        </div>
        <div className="analytics-section">
          <BillingAnalysis />
        </div>
        <div className="analytics-section">
          <PaymentAnalysis />
        </div>
        <div className="analytics-section">
          <ContractAnalysis />
        </div>
        <div className="analytics-section">
          <PredictiveDashboard />
        </div>
        <div className="analytics-section">
          <SegmentExplorer />
        </div>
        <div className="analytics-section">
          <InsightsSummary />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage; 