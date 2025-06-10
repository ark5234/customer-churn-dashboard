// FileUpload.jsx
import React, { useState, useRef } from 'react';
import { useCSVReader } from 'react-papaparse';
import { validateCSVFile } from './FileValidation';
import { processChurnData } from '../../utils/dataProcessing';
import Button from '../shared/Button';
import Loader from '../shared/Loader';
import './FileUpload.css';

const FileUpload = ({ onDataProcessed }) => {
  const { CSVReader } = useCSVReader();
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const dragAreaRef = useRef(null);

  const handleUploadAccepted = async (results) => {
    setIsProcessing(true);
    setError(null);
    
    try {
      // Basic validation of the parsed data
      if (!results || !results.data || !results.data.length) {
        throw new Error('The CSV file appears to be empty.');
      }
      
      // Process the data
      const processedData = processChurnData(results.data);
      
      // Signal success
      setUploadSuccess(true);
      
      // Pass the processed data up to parent component
      onDataProcessed(processedData);
    } catch (err) {
      setError(err.message || 'An error occurred while processing the CSV file.');
      setUploadSuccess(false);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleError = (err) => {
    setError(err.message || 'An error occurred while reading the CSV file.');
    setUploadSuccess(false);
    setIsProcessing(false);
  };

  return (
    <div className="file-upload-container">
      <h2>Upload Customer Data</h2>
      <p className="upload-instruction">
        Upload a CSV file containing customer data to analyze churn patterns.
      </p>
      
      <CSVReader
        onUploadAccepted={handleUploadAccepted}
        onError={handleError}
        config={{
          header: true, // First row is headers
          skipEmptyLines: true,
          transformHeader: header => header.trim(),
        }}
      >
        {({
          getRootProps,
          acceptedFile,
          ProgressBar,
          getRemoveFileProps,
          Remove,
        }) => (
          <>
            <div 
              {...getRootProps()} 
              className="csv-drop-area"
              ref={dragAreaRef}
            >
              {acceptedFile ? (
                <div className="accepted-file">
                  <div className="file-info">
                    <i className="file-icon">📄</i>
                    <span className="file-name">{acceptedFile.name}</span>
                  </div>
                  <div className="progress-container">
                    <ProgressBar />
                  </div>
                  <div {...getRemoveFileProps()} className="remove-button">
                    <Remove />
                  </div>
                </div>
              ) : (
                <div className="drop-message">
                  <i className="upload-icon">⬆️</i>
                  <p>
                    Drag and drop your CSV file here,<br />
                    or click to browse
                  </p>
                  <Button 
                    type="button" 
                    label="Browse Files" 
                    onClick={() => {
                      // This will trigger the hidden file input
                      if (dragAreaRef.current) {
                        const input = dragAreaRef.current.querySelector('input');
                        if (input) input.click();
                      }
                    }}
                  />
                </div>
              )}
            </div>
            
            {isProcessing && (
              <div className="processing-indicator">
                <Loader />
                <p>Processing your data...</p>
              </div>
            )}
            
            {error && (
              <div className="error-message">
                <p><strong>Error:</strong> {error}</p>
              </div>
            )}
            
            {uploadSuccess && !isProcessing && (
              <div className="success-message">
                <p>✅ File successfully processed! Dashboard updated with new data.</p>
              </div>
            )}
            
            <div className="csv-requirements">
              <h3>CSV File Requirements:</h3>
              <ul>
                <li>Must include headers in the first row</li>
                <li>Required columns: CustomerID, Tenure, MonthlyCharges, TotalCharges, Contract, InternetService, etc.</li>
                <li>Maximum file size: 10MB</li>
                <li>
                  <a href="/sample_customer_churn_data.csv" download>
                    Download a sample CSV template
                  </a>
                </li>
              </ul>
            </div>
          </>
        )}
      </CSVReader>
    </div>
  );
};

export default FileUpload;
