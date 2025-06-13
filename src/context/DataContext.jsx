import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = async (file) => {
    try {
      setIsLoading(true);
      setError(null);

      // Read the file
      const text = await file.text();
      const rows = text.split('\n');
      const headers = rows[0].split(',').map(header => header.trim());

      // Column mapping
      const columnMapping = {
        'customerID': 'customer_id',
        'Churn': 'churn',
        'MonthlyCharges': 'monthly_charges',
        'tenure': 'tenure'
      };

      // Validate required columns
      const requiredColumns = ['customerID', 'Churn', 'tenure', 'MonthlyCharges'];
      const missingColumns = requiredColumns.filter(col => !headers.includes(col));
      
      if (missingColumns.length > 0) {
        throw new Error(`Missing required columns: ${missingColumns.join(', ')}`);
      }

      // Parse the data
      const parsedData = rows.slice(1)
        .filter(row => row.trim()) // Remove empty rows
        .map(row => {
          const values = row.split(',').map(value => value.trim());
          const rowData = headers.reduce((obj, header, index) => {
            // Convert numeric values
            if (header === 'tenure' || header === 'MonthlyCharges' || header === 'TotalCharges') {
              obj[header] = parseFloat(values[index]) || 0;
            } else if (header === 'SeniorCitizen') {
              obj[header] = parseInt(values[index]) || 0;
            } else {
              obj[header] = values[index];
            }
            return obj;
          }, {});

          // Map the columns to the expected format
          return {
            customer_id: rowData.customerID,
            churn: rowData.Churn,
            tenure: rowData.tenure,
            monthly_charges: rowData.MonthlyCharges,
            // Include all other columns
            ...rowData
          };
        });

      // Validate data
      if (parsedData.length === 0) {
        throw new Error('No valid data found in the file');
      }

      // Process and store the data
      setData(parsedData);
      return true;
    } catch (err) {
      console.error('Error processing CSV:', err);
      setError(err.message || 'Error processing CSV file');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    data,
    setData,
    isLoading,
    setIsLoading,
    error,
    setError,
    handleFileUpload,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataContext; 