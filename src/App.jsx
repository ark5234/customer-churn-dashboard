// App.jsx
import React, { useState, useEffect } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { FaChartLine, FaUpload, FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa';
import ChurnDashboard from './components/Dashboard/ChurnDashboard';
import AnalyticsPage from './components/Dashboard/AnalyticsPage';
import MonitoringPage from './components/Dashboard/MonitoringPage';
import PredictionsPage from './components/Dashboard/PredictionsPage';
import PerformancePage from './components/Dashboard/PerformancePage';
import FileUpload from './components/FileUpload/FileUpload';
import { DataProvider } from './context/DataContext';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Persist theme in localStorage
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.setAttribute('data-theme', storedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      // Try to scroll to Churn Analysis main section
      const churnSection = document.querySelector('.dashboard-container');
      if (churnSection) {
        churnSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const churnSection = document.querySelector('.dashboard-container');
        if (churnSection) {
          churnSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  };

  const navItems = [
    { path: '/', label: 'Churn Analysis', icon: <FaChartLine /> },
    { path: '/analytics', label: 'Analytics', icon: <FaChartLine /> },
    { path: '/monitoring', label: 'MLOps Monitoring', icon: <FaChartLine /> },
    { path: '/predictions', label: 'Predictions', icon: <FaChartLine /> },
    { path: '/performance', label: 'Performance Analytics', icon: <FaChartLine /> },
  ];

  return (
    <>
      <header className={`app-header${scrolled ? ' scrolled' : ''}`}>
        <div className="navbar-flex">
          <div className="navbar-logo">
            <h1 onClick={handleLogoClick} className="gradient-logo-text">Customer Churn Dashboard</h1>
          </div>
          <div className="navbar-actions">
            <button className="theme-toggle" onClick={toggleTheme}>
              {theme === 'light' ? <FaMoon /> : <FaSun />}
            </button>
            <button className="sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              {isSidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </header>

      <div className="app-layout">
        <nav className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <ul className="main-nav">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={location.pathname === item.path ? 'active' : ''}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/upload" className={location.pathname === '/upload' ? 'active' : ''} onClick={() => setIsSidebarOpen(false)}>
                <FaUpload />
                Upload Data
              </Link>
            </li>
          </ul>
        </nav>

        <main className="app-main">
          <div className="app-content">
            <Routes>
              <Route path="/" element={<ChurnDashboard />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/monitoring" element={<MonitoringPage />} />
              <Route path="/predictions" element={<PredictionsPage />} />
              <Route path="/performance" element={<PerformancePage />} />
              <Route path="/upload" element={<FileUpload />} />
            </Routes>
          </div>
        </main>
      </div>

      <footer className="app-footer">
        <p>© 2025 Customer Churn Dashboard. All rights reserved.</p>
      </footer>
    </>
  );
};

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DataProvider>
        <Router>
          <Navigation />
        </Router>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;
