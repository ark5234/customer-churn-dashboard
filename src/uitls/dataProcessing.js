// dataProcessing.js
/**
 * Utility functions for processing and transforming churn data
 */

/**
 * Process raw churn data from CSV
 * @param {Array} data - The raw data from CSV parsing
 * @returns {Object} - Processed data with metrics and transformed format
 */
export const processChurnData = (data) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    throw new Error('Invalid data format.');
  }

  // Clean the data - handle missing values and convert types
  const cleanedData = cleanChurnData(data);
  
  // Calculate overall metrics
  const metrics = calculateChurnMetrics(cleanedData);
  
  // Segment customers by various attributes
  const segments = segmentCustomers(cleanedData);
  
  // Return comprehensive processed data
  return {
    rawData: cleanedData,
    metrics,
    segments,
    totalCustomers: cleanedData.length
  };
};

/**
 * Clean the raw data from CSV
 * @param {Array} data - The raw data array
 * @returns {Array} - Cleaned data
 */
const cleanChurnData = (data) => {
  return data.map(row => {
    // Create a new object with cleaned properties
    const cleanedRow = { ...row };
    
    // Convert string values to appropriate types
    if (typeof cleanedRow.Tenure === 'string') {
      cleanedRow.Tenure = parseFloat(cleanedRow.Tenure) || 0;
    }
    
    if (typeof cleanedRow.MonthlyCharges === 'string') {
      cleanedRow.MonthlyCharges = parseFloat(cleanedRow.MonthlyCharges) || 0;
    }
    
    if (typeof cleanedRow.TotalCharges === 'string') {
      cleanedRow.TotalCharges = parseFloat(cleanedRow.TotalCharges) || 0;
    }
    
    // Standardize boolean/categorical values
    if (typeof cleanedRow.Churn === 'string') {
      cleanedRow.Churn = cleanedRow.Churn.toLowerCase() === 'yes';
    }
    
    // Handle missing values with defaults
    if (cleanedRow.Tenure === undefined || cleanedRow.Tenure === null) {
      cleanedRow.Tenure = 0;
    }
    
    return cleanedRow;
  });
};

/**
 * Calculate churn metrics from the cleaned data
 * @param {Array} data - The cleaned data array
 * @returns {Object} - Key churn metrics
 */
const calculateChurnMetrics = (data) => {
  // Count churned customers
  const churnedCustomers = data.filter(customer => customer.Churn === true || customer.Churn === 'Yes');
  const totalCustomers = data.length;
  
  // Calculate churn rate
  const churnRate = totalCustomers > 0 ? churnedCustomers.length / totalCustomers : 0;
  
  // Calculate average values for different segments
  const avgMonthlyCharges = data.reduce((sum, customer) => sum + (customer.MonthlyCharges || 0), 0) / totalCustomers;
  
  const avgTenure = data.reduce((sum, customer) => sum + (customer.Tenure || 0), 0) / totalCustomers;
  
  // Calculate average values for churned vs retained customers
  const avgMonthlyChargesChurned = churnedCustomers.length > 0 
    ? churnedCustomers.reduce((sum, customer) => sum + (customer.MonthlyCharges || 0), 0) / churnedCustomers.length 
    : 0;
  
  const retainedCustomers = data.filter(customer => customer.Churn !== true && customer.Churn !== 'Yes');
  const avgMonthlyChargesRetained = retainedCustomers.length > 0 
    ? retainedCustomers.reduce((sum, customer) => sum + (customer.MonthlyCharges || 0), 0) / retainedCustomers.length 
    : 0;
  
  return {
    churnRate,
    totalCustomers,
    churnedCustomers: churnedCustomers.length,
    retainedCustomers: retainedCustomers.length,
    avgMonthlyCharges,
    avgTenure,
    avgMonthlyChargesChurned,
    avgMonthlyChargesRetained
  };
};

/**
 * Segment customers by different attributes
 * @param {Array} data - The cleaned data array
 * @returns {Object} - Customer segments
 */
const segmentCustomers = (data) => {
  // Create segments by contract type
  const contractSegments = {};
  data.forEach(customer => {
    const contract = customer.Contract || 'Unknown';
    if (!contractSegments[contract]) {
      contractSegments[contract] = {
        total: 0,
        churned: 0,
        churnRate: 0
      };
    }
    
    contractSegments[contract].total++;
    if (customer.Churn === true || customer.Churn === 'Yes') {
      contractSegments[contract].churned++;
    }
  });
  
  // Calculate churn rate for each contract segment
  Object.keys(contractSegments).forEach(contract => {
    const segment = contractSegments[contract];
    segment.churnRate = segment.total > 0 ? segment.churned / segment.total : 0;
  });
  
  // Create segments by tenure groups
  const tenureGroups = {
    '0-12': { total: 0, churned: 0, churnRate: 0 },
    '13-24': { total: 0, churned: 0, churnRate: 0 },
    '25-36': { total: 0, churned: 0, churnRate: 0 },
    '37-48': { total: 0, churned: 0, churnRate: 0 },
    '49-60': { total: 0, churned: 0, churnRate: 0 },
    '60+': { total: 0, churned: 0, churnRate: 0 }
  };
  
  data.forEach(customer => {
    const tenure = customer.Tenure || 0;
    let group;
    
    if (tenure <= 12) group = '0-12';
    else if (tenure <= 24) group = '13-24';
    else if (tenure <= 36) group = '25-36';
    else if (tenure <= 48) group = '37-48';
    else if (tenure <= 60) group = '49-60';
    else group = '60+';
    
    tenureGroups[group].total++;
    if (customer.Churn === true || customer.Churn === 'Yes') {
      tenureGroups[group].churned++;
    }
  });
  
  // Calculate churn rate for each tenure group
  Object.keys(tenureGroups).forEach(group => {
    const segment = tenureGroups[group];
    segment.churnRate = segment.total > 0 ? segment.churned / segment.total : 0;
  });
  
  return {
    byContract: contractSegments,
    byTenure: tenureGroups
  };
};

export default {
  processChurnData
};
