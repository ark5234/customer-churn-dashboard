// App.jsx
import React, { useState, useEffect } from 'react';
import FileUpload from './components/FileUpload/FileUpload';
import ChurnDashboard from './components/Dashboard/ChurnDashboard';
import { readString } from 'react-papaparse';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const csvData = e.target.result;
          const rows = csvData.split('\n');
          const headers = rows[0].split(',');
          
          const parsedData = rows.slice(1).map(row => {
            const values = row.split(',');
            return headers.reduce((obj, header, index) => {
              obj[header.trim()] = values[index]?.trim();
              return obj;
            }, {});
          }).filter(row => Object.keys(row).length > 1); // Filter out empty rows

          console.log('Parsed Data:', parsedData); // Debug log
          setData(parsedData);
          setError(null);
        } catch (err) {
          console.error('Error parsing CSV:', err);
          setError('Error parsing CSV file. Please check the file format.');
        }
      };
      reader.onerror = () => {
        setError('Error reading file');
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1>Customer Churn Prediction Dashboard</h1>
          <p className="app-description">
            Analyze customer data to predict and understand churn patterns
          </p>
        </div>
        <button className="theme-switch" onClick={toggleTheme}>
          {theme === 'light' ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          )}
          <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
        </button>
      </header>

      <main className="app-main">
        <div className="app-sidebar">
          <div className="upload-section">
            <div className="upload-container">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="file-input"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="upload-button">
                Upload CSV File
              </label>
              <div className="upload-text">
                <h3>Upload your customer data</h3>
                <p>Drag and drop your CSV file here or click to browse</p>
              </div>
            </div>
            {error && <div className="error-message">{error}</div>}
          </div>
        </div>
        
        <div className="app-content">
          {data && data.length > 0 ? (
            <ChurnDashboard data={data} />
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
