// ChurnDashboard.jsx
import React from 'react';
import { useData } from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaUserTimes, FaPercentage, FaDollarSign, FaClock, FaChartPie, FaChartBar, FaArrowUp, FaArrowDown, FaBullseye, FaBolt, FaChartLine } from 'react-icons/fa';
import { motion } from 'framer-motion';
import '../../App.css';
import DashboardHero from './DashboardHero';

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

const ChurnDashboard = () => {
  const { data } = useData();
  const navigate = useNavigate();

  if (!data || data.length === 0) {
    return (
      <div className="dashboard-container centered-empty-state">
        <motion.div 
          className="no-data-message"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2>No Data Available</h2>
          <p>Please upload a CSV file to view the Churn Analysis.</p>
          <motion.button 
            className="upload-button" 
            onClick={() => navigate('/upload')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Upload Data
          </motion.button>
        </motion.div>
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
    <motion.div 
      className="dashboard-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <DashboardHero
          totalCustomers={totalCustomers}
          churned={churned}
          churnRate={churnRate}
          avgMonthlyCharges={avgMonthlyCharges}
        />
      </motion.div>
      
      {/* Graphs Section */}
      <div className="dashboard-section">
        <motion.div className="churn-analysis-visuals" variants={itemVariants}>
          <motion.div 
            className="churn-donut-chart"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <svg width="140" height="140" viewBox="0 0 140 140">
              <circle r="60" cx="70" cy="70" fill="none" stroke="#e5e7eb" strokeWidth="18" />
              <motion.circle
                r="60"
                cx="70"
                cy="70"
                fill="none"
                stroke="#2563eb"
                strokeWidth="18"
                strokeDasharray={`${(churned / totalCustomers) * 377}, 377`}
                transform="rotate(-90 70 70)"
                initial={{ strokeDasharray: "0, 377" }}
                animate={{ strokeDasharray: `${(churned / totalCustomers) * 377}, 377` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
            <div className="churn-donut-label orange-text">{churnRate}%<br />Churned</div>
          </motion.div>
          
          <div className="churn-contract-bar">
            <h3><FaChartBar /> Churn by Contract Type</h3>
            <div className="contract-bar-chart">
              {churnByContract.map((c, i) => (
                <div key={c.type} className="contract-bar-group">
                  <div className="contract-bar-label">{c.type}</div>
                  <div className="contract-bar-outer">
                    <motion.div 
                      className="contract-bar-inner" 
                      initial={{ width: 0 }}
                      animate={{ width: `${c.churnRate}%` }}
                      transition={{ duration: 1, delay: i * 0.2 }}
                    ></motion.div>
                  </div>
                  <div className="contract-bar-value orange-text">{c.churnRate}%</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Insights Section */}
      <div className="dashboard-section">
        <motion.div className="churn-key-insights" variants={itemVariants}>
          <h3 className="orange-text"><FaChartPie /> Key Insights</h3>
          <ul>
            {insights.map((insight, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + (i * 0.1) }}
              >
                {insight}
              </motion.li>
            ))}
          </ul>
        </motion.div>
        <motion.div className="churn-top-factors" variants={itemVariants}>
          <h3 className="teal-text">Top Factors Impacting Churn</h3>
          <div className="top-factors-list">
            {topFactors.map((f, i) => (
              <motion.div 
                key={f.label} 
                className="top-factor-item"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + (i * 0.1) }}
              >
                <span>{f.label}: <span className="teal-text">{f.value}%</span></span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ChurnDashboard;
