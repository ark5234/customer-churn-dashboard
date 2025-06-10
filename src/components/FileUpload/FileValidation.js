// FileValidation.js
/**
 * Utility functions for validating CSV files before processing
 */

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB limit
const REQUIRED_COLUMNS = [
  'CustomerID',
  'Tenure',
  'MonthlyCharges',
  'TotalCharges',
  'Contract',
  'InternetService',
  'OnlineSecurity',
  'TechSupport',
  'PaperlessBilling',
  'PaymentMethod',
  'Churn'
];

/**
 * Validates a CSV file before processing
 * @param {File} file - The file object to validate
 * @returns {Object} - Result object with isValid and error properties
 */
export const validateCSVFile = (file) => {
  const result = {
    isValid: true,
    error: null
  };

  // Check if file exists
  if (!file) {
    result.isValid = false;
    result.error = 'No file selected.';
    return result;
  }

  // Check file type
  if (!file.name.toLowerCase().endsWith('.csv')) {
    result.isValid = false;
    result.error = 'Please upload a CSV file (.csv).';
    return result;
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    result.isValid = false;
    result.error = `File size exceeds the limit of ${MAX_FILE_SIZE / (1024 * 1024)}MB.`;
    return result;
  }

  return result;
};

/**
 * Validates the structure of parsed CSV data
 * @param {Array} data - The parsed CSV data
 * @returns {Object} - Result object with isValid and error properties
 */
export const validateCSVStructure = (data) => {
  const result = {
    isValid: true,
    error: null
  };

  // Check if data exists
  if (!data || !Array.isArray(data) || data.length === 0) {
    result.isValid = false;
    result.error = 'CSV data is empty or invalid.';
    return result;
  }

  // Get headers from first row
  const headers = Object.keys(data[0]);
  
  // Check for required columns
  const missingColumns = REQUIRED_COLUMNS.filter(col => !headers.includes(col));
  
  if (missingColumns.length > 0) {
    result.isValid = false;
    result.error = `Missing required columns: ${missingColumns.join(', ')}`;
    return result;
  }

  // Validate data types in first few rows as a sample
  const sampleSize = Math.min(5, data.length);
  for (let i = 0; i < sampleSize; i++) {
    const row = data[i];
    
    // Check numeric fields
    if (isNaN(parseFloat(row.Tenure)) || isNaN(parseFloat(row.MonthlyCharges)) || isNaN(parseFloat(row.TotalCharges))) {
      result.isValid = false;
      result.error = `Invalid numeric data in row ${i + 1}. Tenure, MonthlyCharges, and TotalCharges must be numbers.`;
      return result;
    }
    
    // Check that CustomerID is not empty
    if (!row.CustomerID) {
      result.isValid = false;
      result.error = `Missing CustomerID in row ${i + 1}.`;
      return result;
    }
  }

  return result;
};

export default {
  validateCSVFile,
  validateCSVStructure
};
