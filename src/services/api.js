const API_BASE_URL = 'http://localhost:8000';

export const uploadData = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload data');
  }

  return response.json();
};

export const getChurnSummary = async () => {
  const response = await fetch(`${API_BASE_URL}/churn-summary`);
  if (!response.ok) {
    throw new Error('Failed to fetch churn summary');
  }
  return response.json();
};

export const getFeatureImportance = async () => {
  const response = await fetch(`${API_BASE_URL}/feature-importance`);
  if (!response.ok) {
    throw new Error('Failed to fetch feature importance');
  }
  return response.json();
};

export const getDemographicAnalysis = async () => {
  const response = await fetch(`${API_BASE_URL}/demographic-analysis`);
  if (!response.ok) {
    throw new Error('Failed to fetch demographic analysis');
  }
  return response.json();
};

export const getServicesAnalysis = async () => {
  const response = await fetch(`${API_BASE_URL}/services-analysis`);
  if (!response.ok) {
    throw new Error('Failed to fetch services analysis');
  }
  return response.json();
};

export const predictChurn = async (customerData) => {
  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customerData),
  });

  if (!response.ok) {
    throw new Error('Failed to predict churn');
  }
  return response.json();
}; 