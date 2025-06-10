// FileUpload.jsx
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { validateCSVFile } from '../../utils/validation';
import Button from '../shared/Button';
import Card from '../shared/Card';
import Loader from '../shared/Loader';
import './FileUpload.css';

const FileUpload = ({ onFileUpload, isLoading }) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    setError(null);
    setSuccess(null);

    const file = acceptedFiles[0];
    const validation = validateCSVFile(file);

    if (!validation.isValid) {
      setError(validation.error);
      return;
    }

    onFileUpload(file);
    setSuccess('File uploaded successfully! Processing data...');
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv']
    },
    multiple: false
  });

  return (
    <Card className="file-upload-container">
      <h2 className="file-upload-title">Upload Customer Data</h2>
      <p className="file-upload-description">
        Upload your customer data in CSV format to analyze churn patterns and generate insights.
      </p>

      <div
        {...getRootProps()}
        className={`file-upload-dropzone ${isDragActive ? 'active' : ''}`}
      >
        <input {...getInputProps()} />
        {isLoading ? (
          <div className="upload-loading">
            <Loader size="large" />
            <p>Processing your data...</p>
          </div>
        ) : (
          <div className="upload-content">
            <div className="upload-icon">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <p className="upload-text">
              {isDragActive
                ? 'Drop the file here...'
                : 'Drag and drop your CSV file here, or click to select'}
            </p>
            <Button variant="primary" className="upload-button">
              Select File
            </Button>
          </div>
        )}
      </div>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <div className="upload-instructions">
        <h3>File Requirements:</h3>
        <ul>
          <li>File must be in CSV format</li>
          <li>Maximum file size: 5MB</li>
          <li>Required columns: CustomerID, Tenure, Contract, MonthlyCharges</li>
        </ul>
      </div>
    </Card>
  );
};

export default FileUpload;
