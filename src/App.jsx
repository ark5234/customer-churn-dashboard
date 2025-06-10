// App.jsx
import React, { useState } from 'react';
import FileUpload from './components/FileUpload/FileUpload';
import ChurnDashboard from './components/Dashboard/ChurnDashboard';
import './App.css';

function App() {
  const [processedData, setProcessedData] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const handleDataProcessed = (data) => {
    setProcessedData(data);
    setIsDataLoaded(true);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Customer Churn Prediction Dashboard</h1>
        <p className="app-description">
          Analyze customer data to predict and understand churn patterns
        </p>
      </header>

      <main className="app-main">
        <div className="app-sidebar">
          <FileUpload onDataProcessed={handleDataProcessed} />
        </div>
        
        <div className="app-content">
          {isDataLoaded && processedData ? (
            <ChurnDashboard data={processedData} />
          ) : (
            <div className="no-data-message">
              <h2>Welcome to the Churn Prediction Dashboard</h2>
              <p>Upload a CSV file to get started with your analysis.</p>
              <div className="dashboard-placeholder">
                <div className="placeholder-chart"></div>
                <div className="placeholder-metrics">
                  <div className="placeholder-metric"></div>
                  <div className="placeholder-metric"></div>
                  <div className="placeholder-metric"></div>
                </div>
                <div className="placeholder-table"></div>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Customer Churn Prediction Dashboard</p>
      </footer>
    </div>
  );
}

export default App;
