// FileUpload.jsx
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUpload, FaFileCsv, FaSpinner } from 'react-icons/fa';
import { useData } from '../../context/DataContext';
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
    <div className="file-upload-container">
      <h1 className="file-upload-title">Upload Your Data</h1>
      <p className="file-upload-description">
        Upload your customer data in CSV format to analyze churn patterns and get insights.
      </p>

      <div
        className={`file-upload-dropzone ${isDragging ? 'active' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="upload-content">
          {isLoading ? (
            <div className="upload-loading">
              <FaSpinner className="spinner" />
              <p>Processing your file...</p>
            </div>
          ) : (
            <>
              <FaFileCsv className="upload-icon" />
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
              <label htmlFor="file-input" className="upload-button">
                <FaUpload />
                Choose File
              </label>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      <div className="upload-instructions">
        <h3>File Requirements:</h3>
        <ul>
          <li>File must be in CSV format</li>
          <li>First row should contain column headers</li>
          <li>Required columns: customer_id, churn, tenure, monthly_charges</li>
          <li>Maximum file size: 10MB</li>
        </ul>
      </div>
    </div>
  );
};

export default FileUpload;
