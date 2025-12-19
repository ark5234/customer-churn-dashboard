import React, { useEffect, useState } from 'react';
import { FaExclamationTriangle, FaUsers, FaUserTimes, FaPercentage, FaDollarSign, FaArrowUp, FaArrowDown, FaLightbulb } from 'react-icons/fa';
import { motion, useSpring, useTransform } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import '../../App.css';

const Counter = ({ value, duration = 2 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const springValue = useSpring(0, { duration: duration * 1000 });
  const rounded = useTransform(springValue, (latest) => Math.round(latest));

  useEffect(() => {
    springValue.set(value);
  }, [value, springValue]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => {
      setDisplayValue(v);
    });
    return unsubscribe;
  }, [rounded]);

  return <span>{displayValue}</span>;
};

const Sparkline = ({ data, color }) => (
  <div style={{ width: '120px', height: '40px', opacity: 0.5 }}>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke={color} 
          strokeWidth={2} 
          dot={false} 
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const DashboardHero = ({ totalCustomers, churned, churnRate, avgMonthlyCharges }) => {
  // Example data for demonstration
  const lastMonthChurnRate = 24.4; // You could make this dynamic
  const churnRateNum = parseFloat(churnRate);
  const churnDelta = (churnRateNum - lastMonthChurnRate).toFixed(1);
  const isChurnUp = churnDelta > 0;
  const revenueAtRisk = (churned * avgMonthlyCharges).toLocaleString(undefined, { maximumFractionDigits: 0 });
  const lastUpdated = new Date().toLocaleDateString();
  const topReason = 'High Monthly Charges';

  // Mock data for sparkline
  const sparklineData = [
    { value: 24 }, { value: 25 }, { value: 24.5 }, { value: 26 }, { value: 25.5 }, { value: 26.5 }
  ];

  return (
    <motion.section 
      className="dashboard-hero-card dashboard-hero-2col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="dashboard-hero-col dashboard-hero-main">
        <div className="dashboard-hero-churnrate-block">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <motion.div 
              className="dashboard-hero-churnrate-big"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              {churnRate}%
            </motion.div>
            <Sparkline data={sparklineData} color={isChurnUp ? "#ef4444" : "#10b981"} />
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
            <span className={`dashboard-hero-trend-badge ${isChurnUp ? 'danger' : 'success'}`}
              title={isChurnUp ? 'Churn rate increased' : 'Churn rate decreased'}>
              {isChurnUp ? <FaArrowUp /> : <FaArrowDown />} {Math.abs(churnDelta)}%
            </span>
            <div className="dashboard-hero-churnrate-label">Churn Rate (Last 7 Days)</div>
          </div>
        </div>

        <motion.div 
          className="dashboard-hero-revenue-risk"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          style={{ 
            background: 'rgba(245, 158, 11, 0.1)', 
            padding: '1rem', 
            borderRadius: '12px',
            border: '1px solid rgba(245, 158, 11, 0.2)',
            display: 'inline-flex',
            gap: '1rem'
          }}
        >
          <div style={{ 
            background: 'rgba(245, 158, 11, 0.2)', 
            padding: '0.5rem', 
            borderRadius: '8px',
            color: '#f59e0b' 
          }}>
            <FaDollarSign />
          </div>
          <div>
            <div className="dashboard-hero-revenue-risk-label" style={{ fontSize: '0.875rem' }}>Revenue at Risk</div>
            <div className="dashboard-hero-revenue-risk-value" style={{ fontSize: '1.25rem' }}>${revenueAtRisk}</div>
          </div>
        </motion.div>
        <div className="dashboard-hero-last-updated">Last updated: {lastUpdated}</div>
      </div>
      <div className="dashboard-hero-col dashboard-hero-side">
        <div className="dashboard-hero-metrics-row">
          <motion.div 
            className="dashboard-hero-metric-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="dashboard-hero-metric-icon" style={{ background: 'rgba(37, 99, 235, 0.1)', color: '#2563eb' }}><FaUsers /></div>
            <div className="dashboard-hero-metric-value"><Counter value={totalCustomers} /></div>
            <div className="dashboard-hero-metric-label">Total Customers</div>
          </motion.div>
          <motion.div 
            className="dashboard-hero-metric-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="dashboard-hero-metric-icon" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}><FaUserTimes /></div>
            <div className="dashboard-hero-metric-value"><Counter value={churned} /></div>
            <div className="dashboard-hero-metric-label">Churned</div>
          </motion.div>
          <motion.div 
            className="dashboard-hero-metric-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="dashboard-hero-metric-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}><FaDollarSign /></div>
            <div className="dashboard-hero-metric-value">${avgMonthlyCharges}</div>
            <div className="dashboard-hero-metric-label">Avg. Monthly Charges</div>
          </motion.div>
        </div>
        <motion.div 
          className="dashboard-hero-recommendation"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="dashboard-hero-recommend-title"><FaLightbulb style={{ color: '#f59e0b', marginRight: 6 }} /> Recommendation</div>
          <div className="dashboard-hero-recommend-text">
            Focus on reducing <b>{topReason}</b> to improve retention. Consider targeted offers or discounts for at-risk customers.
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default DashboardHero;
 