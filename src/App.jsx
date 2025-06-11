// App.jsx
import React, { useState, useEffect, createContext } from 'react';
import FileUpload from './components/FileUpload/FileUpload';
import { Routes, Route, NavLink, Navigate, useNavigate } from 'react-router-dom';
import ChurnDashboard from './components/Dashboard/ChurnDashboard';
import AnalyticsPage from './components/Dashboard/AnalyticsPage';
import MonitoringPage from './components/Dashboard/MonitoringPage';
import PredictionsPage from './components/Dashboard/PredictionsPage';
import PerformancePage from './components/Dashboard/PerformancePage';
import { readString } from 'react-papaparse';
import './App.css';

export const DataContext = createContext();

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });
  const navigate = useNavigate();

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

  const handleFileUploadComponent = async (file) => {
    try {
      const text = await file.text();
      const rows = text.split('\n');
      const headers = rows[0].split(',');
      const parsedData = rows.slice(1).map(row => {
        const values = row.split(',');
        return headers.reduce((obj, header, index) => {
          obj[header.trim()] = values[index]?.trim();
          return obj;
        }, {});
      }).filter(row => Object.keys(row).length > 1);
      setData(parsedData);
      setError(null);
      navigate('/churn-analysis');
    } catch (err) {
      setError('Error parsing CSV file. Please check the file format.');
    }
  };

  return (
    <DataContext.Provider value={{ data, setData, error, setError }}>
      <div className="app-container">
        <header className="app-header">
          <div className="navbar-flex">
            <div className="navbar-logo">
              <h1>Customer Churn Prediction Dashboard</h1>
            </div>
            <nav className="main-nav">
              <ul>
                <li><NavLink to="/churn-analysis" className={({ isActive }) => isActive ? 'active' : ''}>Churn Analysis</NavLink></li>
                <li><NavLink to="/analytics" className={({ isActive }) => isActive ? 'active' : ''}>Analytics</NavLink></li>
                <li><NavLink to="/monitoring" className={({ isActive }) => isActive ? 'active' : ''}>MLOps Monitoring</NavLink></li>
                <li><NavLink to="/predictions" className={({ isActive }) => isActive ? 'active' : ''}>Predictions</NavLink></li>
                <li><NavLink to="/performance" className={({ isActive }) => isActive ? 'active' : ''}>Performance Analytics</NavLink></li>
              </ul>
            </nav>
            <div className="navbar-actions">
              <NavLink to="/upload" className={({ isActive }) => isActive ? 'upload-link cta active' : 'upload-link cta'}>Upload Data</NavLink>
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
            </div>
          </div>
        </header>

        <main className="app-main">
          <div className="app-content">
            <Routes>
              <Route path="/churn-analysis" element={<ChurnDashboard />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/monitoring" element={<MonitoringPage />} />
              <Route path="/predictions" element={<PredictionsPage />} />
              <Route path="/performance" element={<PerformancePage />} />
              <Route path="/upload" element={<FileUpload onFileUpload={handleFileUploadComponent} isLoading={false} />} />
              <Route path="/" element={<Navigate to="/churn-analysis" replace />} />
            </Routes>
          </div>
        </main>

        <footer className="app-footer">
          <p>&copy; {new Date().getFullYear()} Customer Churn Prediction Dashboard</p>
        </footer>
      </div>
    </DataContext.Provider>
  );
}

// Helper for no data
function NoDataMessage() {
  return (
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
  );
}

export default App;
