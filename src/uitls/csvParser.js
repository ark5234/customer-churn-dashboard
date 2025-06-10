// csvParser.js
import Papa from 'papaparse';

/**
 * Parses a CSV file and returns the data
 * @param {File} file - The CSV file to parse
 * @param {Object} options - Parsing options
 * @returns {Promise} - Promise that resolves with parsed data
 */
export const parseCSVFile = (file, options = {}) => {
  return new Promise((resolve, reject) => {
    // Default configuration
    const config = {
      header: true, // First row is headers
      skipEmptyLines: true,
      transformHeader: header => header.trim(),
      dynamicTyping: true, // Automatically convert numeric values
      complete: (results) => {
        if (results.errors && results.errors.length > 0) {
          const errorMessage = results.errors.map(err => `${err.message} at row ${err.row}`).join(', ');
          reject(new Error(`CSV parsing error: ${errorMessage}`));
        } else {
          resolve(results.data);
        }
      },
      error: (error) => {
        reject(new Error(`CSV parsing error: ${error.message}`));
      },
      ...options
    };

    // Parse the file
    Papa.parse(file, config);
  });
};

/**
 * Converts JSON data to CSV format
 * @param {Array} jsonData - Array of objects to convert to CSV
 * @param {Object} options - Conversion options
 * @returns {String} - CSV string
 */
export const convertToCSV = (jsonData, options = {}) => {
  return Papa.unparse(jsonData, options);
};

/**
 * Downloads data as a CSV file
 * @param {Array} data - The data to download
 * @param {String} filename - The name of the file
 * @param {Object} options - Conversion options
 */
export const downloadCSV = (data, filename = 'export.csv', options = {}) => {
  const csv = convertToCSV(data, options);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  
  // Create a download link
  const link = document.createElement('a');
  
  // Support for browser download API
  if (navigator.msSaveBlob) {
    // IE10+
    navigator.msSaveBlob(blob, filename);
    return;
  }
  
  // Create object URL
  const url = URL.createObjectURL(blob);
  
  // Set link properties
  link.href = url;
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  // Add to document, trigger click, and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up object URL
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 100);
};

export default {
  parseCSVFile,
  convertToCSV,
  downloadCSV
};
