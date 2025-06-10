// App.jsx
import React, { useState } from 'react';
import FileUpload from './components/FileUpload/FileUpload';
import ChurnDashboard from './components/Dashboard/ChurnDashboard';
import { readString } from 'react-papaparse';
import './App.css';

function App() {
  const [processedData, setProcessedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const processCSVData = (file) => {
    setIsLoading(true);
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const csvData = event.target.result;
      readString(csvData, {
        header: true,
        complete: (results) => {
          const data = results.data;
          
          // Process the data
          const processedData = {
            totalCustomers: data.length,
            churnedCustomers: data.filter(row => row.Churn === 'Yes').length,
            churnRate: (data.filter(row => row.Churn === 'Yes').length / data.length) * 100,
            averageTenure: data.reduce((acc, row) => acc + parseFloat(row.tenure || 0), 0) / data.length,
            revenueImpact: data
              .filter(row => row.Churn === 'Yes')
              .reduce((acc, row) => acc + parseFloat(row.MonthlyCharges || 0), 0),
            churnRateHistory: [
              { date: 'Jan', rate: 15 },
              { date: 'Feb', rate: 12 },
              { date: 'Mar', rate: 18 },
              { date: 'Apr', rate: 14 },
              { date: 'May', rate: 16 },
              { date: 'Jun', rate: 13 }
            ],
            customerSegments: [
              { segment: 'New', count: data.filter(row => parseFloat(row.tenure) < 12).length },
              { segment: 'Established', count: data.filter(row => parseFloat(row.tenure) >= 12 && parseFloat(row.tenure) < 36).length },
              { segment: 'Long-term', count: data.filter(row => parseFloat(row.tenure) >= 36).length }
            ],
            insights: [
              'Customers with month-to-month contracts have a higher churn rate',
              'Long-term customers show more loyalty',
              'Higher monthly charges correlate with increased churn risk'
            ]
          };

          setProcessedData(processedData);
          setIsDataLoaded(true);
          setIsLoading(false);
        },
        error: (error) => {
          console.error('Error processing CSV:', error);
          setIsLoading(false);
        }
      });
    };

    reader.onerror = () => {
      console.error('Error reading file');
      setIsLoading(false);
    };

    reader.readAsText(file);
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
          <FileUpload onFileUpload={processCSVData} isLoading={isLoading} />
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
