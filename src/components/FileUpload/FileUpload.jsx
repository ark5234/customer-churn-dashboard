// FileUpload.jsx
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUpload, FaFileCsv, FaSpinner, FaCheckCircle } from 'react-icons/fa';
import { useData } from '../../context/DataContext';
import { motion, AnimatePresence } from 'framer-motion';
import './FileUpload.css';

const FileUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const { handleFileUpload, isLoading, error } = useData();

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(async (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type === 'text/csv') {
      setSelectedFile(file);
      const success = await handleFileUpload(file);
      if (success) {
        navigate('/');
      }
    }
  }, [handleFileUpload, navigate]);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'text/csv') {
      setSelectedFile(file);
      const success = await handleFileUpload(file);
      if (success) {
        navigate('/');
      }
    }
  };

  return (
    <motion.div 
      className="file-upload-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="file-upload-title">Upload Your Data</h1>
      <p className="file-upload-description">
        Upload your customer data in CSV format to analyze churn patterns and get insights.
      </p>

      <motion.div
        className={`file-upload-dropzone ${isDragging ? 'active' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        animate={{ 
          scale: isDragging ? 1.02 : 1,
          borderColor: isDragging ? 'var(--primary-color)' : 'var(--border-color)',
          backgroundColor: isDragging ? 'rgba(99, 102, 241, 0.05)' : 'var(--surface-color)'
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="upload-content">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div 
                key="loading"
                className="upload-loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <FaSpinner className="spinner" />
                </motion.div>
                <p>Processing your file...</p>
              </motion.div>
            ) : (
              <motion.div
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <motion.div
                  animate={{ y: isDragging ? -10 : 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FaFileCsv className="upload-icon" />
                </motion.div>
                <p className="upload-text">
                  {selectedFile
                    ? `Selected file: ${selectedFile.name}`
                    : 'Drag and drop your CSV file here, or click to browse'}
                </p>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileSelect}
                  className="file-input"
                  id="file-input"
                />
                <motion.label 
                  htmlFor="file-input" 
                  className="upload-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaUpload />
                  Choose File
                </motion.label>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.div 
            className="error-message"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <p>{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="upload-instructions">
        <h3>File Requirements:</h3>
        <ul>
          <li>CSV format only</li>
          <li>Must contain customer data columns</li>
          <li>Max file size: 10MB</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default FileUpload;
