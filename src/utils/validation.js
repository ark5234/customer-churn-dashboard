export const validateCSVFile = (file) => {
  if (!file) {
    return { isValid: false, error: 'No file selected' };
  }

  if (file.type !== 'text/csv') {
    return { isValid: false, error: 'File must be a CSV' };
  }

  if (file.size > 5 * 1024 * 1024) { // 5MB limit
    return { isValid: false, error: 'File size must be less than 5MB' };
  }

  return { isValid: true };
};

export const validateRequiredFields = (data, requiredFields) => {
  const missingFields = requiredFields.filter(field => !data[field]);
  
  if (missingFields.length > 0) {
    return {
      isValid: false,
      error: `Missing required fields: ${missingFields.join(', ')}`
    };
  }

  return { isValid: true };
};

export const validateNumericField = (value, fieldName) => {
  if (isNaN(value) || value === null || value === undefined) {
    return {
      isValid: false,
      error: `${fieldName} must be a number`
    };
  }

  return { isValid: true };
};

export const validateDateField = (value, fieldName) => {
  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return {
      isValid: false,
      error: `${fieldName} must be a valid date`
    };
  }

  return { isValid: true };
}; 