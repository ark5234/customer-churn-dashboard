// App.jsx
import React, { useState, useEffect } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { FaChartLine, FaUpload, FaBars, FaTimes, FaMoon, FaSun, FaHome, FaChartPie, FaRobot, FaTachometerAlt } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import ChurnDashboard from './components/Dashboard/ChurnDashboard';
import AnalyticsPage from './components/Dashboard/AnalyticsPage';
import MonitoringPage from './components/Dashboard/MonitoringPage';
import PredictionsPage from './components/Dashboard/PredictionsPage';
import PerformancePage from './components/Dashboard/PerformancePage';
import FileUpload from './components/FileUpload/FileUpload';
import PageTransition from './components/shared/PageTransition';
import { DataProvider } from './context/DataContext';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><ChurnDashboard /></PageTransition>} />
        <Route path="/analytics" element={<PageTransition><AnalyticsPage /></PageTransition>} />
        <Route path="/monitoring" element={<PageTransition><MonitoringPage /></PageTransition>} />
        <Route path="/predictions" element={<PageTransition><PredictionsPage /></PageTransition>} />
        <Route path="/performance" element={<PageTransition><PerformancePage /></PageTransition>} />
        <Route path="/upload" element={<PageTransition><FileUpload /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const navItems = [
    { path: '/', label: 'Overview', icon: <FaHome /> },
    { path: '/analytics', label: 'Analytics', icon: <FaChartPie /> },
    { path: '/monitoring', label: 'MLOps', icon: <FaRobot /> },
    { path: '/predictions', label: 'Predictions', icon: <FaChartLine /> },
    { path: '/performance', label: 'Performance', icon: <FaTachometerAlt /> },
  ];

  const sidebarVariants = {
    open: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { x: '-100%', opacity: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  };

  return (
    <>
      <header className={`app-header${scrolled ? ' scrolled' : ''}`}>
        <div className="navbar-flex">
          <div className="navbar-logo">
            <div className="logo-icon">
              <FaChartLine />
            </div>
            <h1 onClick={handleLogoClick} className="gradient-logo-text">ChurnGuard</h1>
          </div>
          <div className="navbar-actions">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'light' ? <FaMoon /> : <FaSun />}
            </button>
            <button className="sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)} aria-label="Toggle menu">
              {isSidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </header>

      <div className="app-layout">
        <motion.nav 
          className={`sidebar ${isSidebarOpen ? 'open' : ''}`}
          initial={false}
          animate={window.innerWidth > 768 ? "open" : (isSidebarOpen ? "open" : "closed")}
          variants={window.innerWidth <= 768 ? sidebarVariants : undefined}
        >
          <div className="sidebar-content">
            <ul className="main-nav">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={location.pathname === item.path ? 'active' : ''}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                    {location.pathname === item.path && (
                      <motion.div 
                        className="active-indicator" 
                        layoutId="activeIndicator"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              ))}
              <li className="nav-divider"></li>
              <li>
                <Link to="/upload" className={location.pathname === '/upload' ? 'active' : ''} onClick={() => setIsSidebarOpen(false)}>
                  <span className="nav-icon"><FaUpload /></span>
                  <span className="nav-label">Upload Data</span>
                  {location.pathname === '/upload' && (
                    <motion.div 
                      className="active-indicator" 
                      layoutId="activeIndicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            </ul>
          </div>
        </motion.nav>

        <main className="app-main">
          <div className="app-content">
            <AnimatedRoutes />
          </div>
        </main>
      </div>

      <footer className="app-footer">
        <p>© 2025 ChurnGuard AI. All rights reserved.</p>
      </footer>
    </>
  );
};

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6366f1', // Indigo 500
      light: '#818cf8',
      dark: '#4f46e5',
    },
    secondary: {
      main: '#ec4899', // Pink 500
      light: '#f472b6',
      dark: '#db2777',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 500 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        },
      },
    },
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
