import React, { useContext } from 'react';
import { DataContext } from '../../App';

const PerformancePage = () => {
  const { data } = useContext(DataContext);
  return (
    <div className="dashboard-container">
      <h2>Performance Analytics</h2>
      <div className="tab-content">
        <div className="performance-section">
          <h3>Pipeline Runtime Optimization</h3>
          <div className="optimization-stats">
            <p>Runtime reduced from 45 to 0.0 minutes, achieving 30% improvement</p>
          </div>
        </div>
        {/* Add more performance analytics as needed */}
      </div>
    </div>
  );
};

export default PerformancePage; 