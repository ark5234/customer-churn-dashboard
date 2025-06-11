import React, { useContext } from 'react';
import { DataContext } from '../../App';

const PredictionsPage = () => {
  const { data } = useContext(DataContext);
  return (
    <div className="dashboard-container">
      <h2>Predictions</h2>
      <div className="tab-content">
        <div className="prediction-form">
          <h3>Live Churn Prediction</h3>
          <form className="customer-input-form">
            <div className="form-group">
              <label>Monthly Charges ($)</label>
              <input type="number" placeholder="Enter monthly charges" />
            </div>
            <div className="form-group">
              <label>Tenure (months)</label>
              <input type="number" placeholder="Enter tenure in months" />
            </div>
            <div className="form-group">
              <label>Contract Type</label>
              <select>
                <option>Month-to-month</option>
                <option>One year</option>
                <option>Two year</option>
              </select>
            </div>
            <div className="form-group">
              <label>Total Charges ($)</label>
              <input type="number" placeholder="Enter total charges" />
            </div>
            <button type="submit" className="predict-button">Predict Churn Risk</button>
          </form>
        </div>
        <div className="prediction-results">
          <h3>Churn Risk Assessment</h3>
          <div className="risk-assessment">
            <p className="placeholder-text">-- Enter customer data to predict churn risk</p>
          </div>
          <h3>Retention Recommendations</h3>
          <div className="recommendations">
            <p className="placeholder-text">Complete the form to get personalized recommendations</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionsPage; 