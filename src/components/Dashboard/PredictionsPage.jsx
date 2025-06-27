import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { FaChartLine } from 'react-icons/fa';
import { manualPredict } from '../../services/api';
import './PredictionsPage.css';

const initialForm = {
  gender: '',
  tenure: '',
  MonthlyCharges: '',
  Contract: '',
  SeniorCitizen: '',
  Partner: '',
  Dependents: '',
  PhoneService: '',
  InternetService: '',
};

const contractOptions = ['Month-to-month', 'One year', 'Two year'];
const genderOptions = ['Male', 'Female'];
const yesNoOptions = ['Yes', 'No'];
const internetOptions = ['DSL', 'Fiber optic', 'No'];

const PredictionsPage = () => {
  const { data, isLoading, error } = useData();
  const [form, setForm] = useState(initialForm);
  const [prediction, setPrediction] = useState(null);
  const [recentPredictions, setRecentPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [predictError, setPredictError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPredictError(null);
    setPrediction(null);
    try {
      const payload = {
        ...form,
        tenure: Number(form.tenure),
        MonthlyCharges: Number(form.MonthlyCharges),
        SeniorCitizen: Number(form.SeniorCitizen),
      };
      const result = await manualPredict(payload);
      setPrediction(result);
      setRecentPredictions(prev => [
        { input: { ...form }, result },
        ...prev.slice(0, 9)
      ]);
    } catch (err) {
      setPredictError(err.message || 'Prediction failed');
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!data) {
    return (
      <div className="no-data">
        <h2>No Data Available</h2>
        <p>Please upload a CSV file to view predictions.</p>
      </div>
    );
  }

  return (
    <div className="predictions-page">
      <h1>Churn Predictions</h1>
      <div className="predictions-content">
        <div className="prediction-metrics card-dark">
          <div className="metric-card">
            <div className="metric-icon">
              <FaChartLine />
            </div>
            <div className="metric-content">
              <h3>Manual Churn Prediction</h3>
              <form onSubmit={handleSubmit} className="manual-predict-form">
                <select name="gender" value={form.gender} onChange={handleChange} required>
                  <option value="">Gender</option>
                  {genderOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                <input name="tenure" type="number" min="0" placeholder="Tenure (months)" value={form.tenure} onChange={handleChange} required />
                <input name="MonthlyCharges" type="number" min="0" step="0.01" placeholder="Monthly Charges" value={form.MonthlyCharges} onChange={handleChange} required />
                <select name="Contract" value={form.Contract} onChange={handleChange} required>
                  <option value="">Contract</option>
                  {contractOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                <select name="SeniorCitizen" value={form.SeniorCitizen} onChange={handleChange} required>
                  <option value="">Senior Citizen</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
                <select name="Partner" value={form.Partner} onChange={handleChange} required>
                  <option value="">Partner</option>
                  {yesNoOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                <select name="Dependents" value={form.Dependents} onChange={handleChange} required>
                  <option value="">Dependents</option>
                  {yesNoOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                <select name="PhoneService" value={form.PhoneService} onChange={handleChange} required>
                  <option value="">Phone Service</option>
                  {yesNoOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                <select name="InternetService" value={form.InternetService} onChange={handleChange} required>
                  <option value="">Internet Service</option>
                  {internetOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                <button type="submit" disabled={loading} className="predict-btn">
                  {loading ? 'Predicting...' : 'Predict'}
                </button>
              </form>
              {predictError && <div className="error" style={{ marginTop: 8 }}>{predictError}</div>}
              {prediction && (
                <div className="prediction-result">
                  <div>
                    <strong>Prediction:</strong> {prediction.prediction}
                  </div>
                  <div>
                    <strong>Churn Probability:</strong> {(prediction.churnProbability * 100).toFixed(2)}%
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="predictions-table">
          <h2>Recent Predictions</h2>
          {recentPredictions.length === 0 ? (
            <p>Prediction table will be displayed here</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="recent-predictions-table">
                <caption className="sr-only">Recent Predictions Table</caption>
                <thead>
                  <tr>
                    <th>Gender</th>
                    <th>Tenure</th>
                    <th>Monthly Charges</th>
                    <th>Contract</th>
                    <th>Senior Citizen</th>
                    <th>Partner</th>
                    <th>Dependents</th>
                    <th>Phone Service</th>
                    <th>Internet Service</th>
                    <th>Prediction</th>
                    <th>Churn Probability</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPredictions.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.input.gender}</td>
                      <td style={{ textAlign: 'right' }}>{item.input.tenure}</td>
                      <td style={{ textAlign: 'right' }}>{item.input.MonthlyCharges}</td>
                      <td>{item.input.Contract}</td>
                      <td>{item.input.SeniorCitizen === '1' ? 'Yes' : 'No'}</td>
                      <td>{item.input.Partner}</td>
                      <td>{item.input.Dependents}</td>
                      <td>{item.input.PhoneService}</td>
                      <td>{item.input.InternetService}</td>
                      <td>{item.result.prediction}</td>
                      <td style={{ textAlign: 'right' }}>{(item.result.churnProbability * 100).toFixed(2)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PredictionsPage; 