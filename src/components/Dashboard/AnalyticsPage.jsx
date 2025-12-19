import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { FaChartLine, FaUsers, FaMoneyBillWave, FaClock, FaArrowUp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './AnalyticsPage.css';
// Import new analysis components
import FeatureImpact from '../Analysis/sections/FeatureImpact';
import DemographicBreakdown from '../Analysis/sections/DemographicBreakdown';
import ServicesAnalysis from '../Analysis/sections/ServicesAnalysis';
import CommunicationImpact from '../Analysis/sections/CommunicationImpact';
import TenureAnalysis from '../Analysis/sections/TenureAnalysis';
import BillingAnalysis from '../Analysis/sections/BillingAnalysis';
import PaymentAnalysis from '../Analysis/sections/PaymentAnalysis';
import ContractAnalysis from '../Analysis/sections/ContractAnalysis';
import PDFDownload from '../Analysis/sections/PredictiveDashboard';
import SegmentExplorer from '../Analysis/sections/SegmentExplorer';
import InsightsSummary from '../Analysis/sections/InsightsSummary';

const AnalyticsPage = () => {
  const { data, isLoading, error } = useData();
  const [showScrollUp, setShowScrollUp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollUp(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="loading">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          style={{ width: 40, height: 40, border: "3px solid #f3f3f3", borderTop: "3px solid #3498db", borderRadius: "50%" }}
        />
      </div>
    );
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <motion.h1 
          className="teal-text"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Analytics Dashboard
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <PDFDownload />
        </motion.div>
      </div>
      
      <motion.div 
        className="metrics-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="metric-card" variants={itemVariants} whileHover={{ y: -5 }}>
          <div className="metric-icon">
            <FaUsers />
          </div>
          <div className="metric-content">
            <h3>Total Customers</h3>
            <p className="metric-value">{totalCustomers}</p>
          </div>
        </motion.div>

        <motion.div className="metric-card" variants={itemVariants} whileHover={{ y: -5 }}>
          <div className="metric-icon">
            <FaChartLine />
          </div>
          <div className="metric-content">
            <h3>Churn Rate</h3>
            <p className="metric-value">{churnRate}%</p>
          </div>
        </motion.div>

        <motion.div className="metric-card" variants={itemVariants} whileHover={{ y: -5 }}>
          <div className="metric-icon">
            <FaMoneyBillWave />
          </div>
          <div className="metric-content">
            <h3>Avg Monthly Charges</h3>
            <p className="metric-value">${avgMonthlyCharges}</p>
          </div>
        </motion.div>

        <motion.div className="metric-card" variants={itemVariants} whileHover={{ y: -5 }}>
          <div className="metric-icon">
            <FaClock />
          </div>
          <div className="metric-content">
            <h3>Avg Tenure</h3>
            <p className="metric-value">{avgTenure} months</p>
          </div>
        </motion.div>
      </motion.div>

      <div className="analytics-sections">
        {[
          FeatureImpact,
          DemographicBreakdown,
          ServicesAnalysis,
          CommunicationImpact,
          TenureAnalysis,
          BillingAnalysis,
          PaymentAnalysis,
          ContractAnalysis,
          SegmentExplorer,
          InsightsSummary
        ].map((Component, index) => (
          <motion.div 
            key={index}
            className="analytics-section"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <Component />
          </motion.div>
        ))}
      </div>
      
      {showScrollUp && (
        <motion.button 
          className="scroll-up-btn" 
          onClick={handleScrollUp} 
          title="Scroll to top"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaArrowUp className="scroll-up-arrow" />
        </motion.button>
      )}
    </div>
  );
};

export default AnalyticsPage;
 