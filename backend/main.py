from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import joblib
import json
from typing import Dict, List
import io

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Allow both Vite and React dev servers
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables to store data and model
df = None
model = None
label_encoders = {}

def preprocess_data(data: pd.DataFrame) -> pd.DataFrame:
    """Preprocess the data for analysis."""
    # Create copies of categorical columns
    categorical_columns = [
        'gender', 'Partner', 'Dependents', 'PhoneService', 'MultipleLines',
        'InternetService', 'OnlineSecurity', 'OnlineBackup', 'DeviceProtection',
        'TechSupport', 'StreamingTV', 'StreamingMovies', 'Contract',
        'PaperlessBilling', 'PaymentMethod'
    ]
    
    # Encode categorical variables
    for column in categorical_columns:
        if column in data.columns:
            label_encoders[column] = LabelEncoder()
            data[column] = label_encoders[column].fit_transform(data[column])
    
    # Convert TotalCharges to numeric, handling any non-numeric values
    if 'TotalCharges' in data.columns:
        data['TotalCharges'] = pd.to_numeric(data['TotalCharges'], errors='coerce')
        data['TotalCharges'].fillna(data['TotalCharges'].mean(), inplace=True)
    
    return data

def train_model(data: pd.DataFrame):
    """Train the churn prediction model."""
    global model
    
    # Prepare features and target
    X = data.drop(['customerID', 'Churn'], axis=1, errors='ignore')
    y = data['Churn'] if 'Churn' in data.columns else None
    
    if y is not None:
        # Train model
        model = RandomForestClassifier(n_estimators=100, random_state=42)
        model.fit(X, y)
        
        # Save model and encoders
        joblib.dump(model, 'model.joblib')
        joblib.dump(label_encoders, 'label_encoders.joblib')

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    """Upload and process the customer data file."""
    global df
    
    # Read the uploaded file
    contents = await file.read()
    df = pd.read_csv(io.StringIO(contents.decode('utf-8')))
    
    # Preprocess data
    processed_df = preprocess_data(df.copy())
    
    # Train model if Churn column exists
    if 'Churn' in df.columns:
        train_model(processed_df)
    
    return {"message": "File uploaded and processed successfully"}

@app.get("/churn-summary")
async def get_churn_summary():
    """Get overall churn summary statistics."""
    if df is None:
        return {"error": "No data uploaded"}
    
    total_customers = len(df)
    churn_rate = (df['Churn'] == 'Yes').mean() * 100 if 'Churn' in df.columns else None
    retention_rate = 100 - churn_rate if churn_rate is not None else None
    
    contract_breakdown = df.groupby('Contract')['Churn'].apply(
        lambda x: (x == 'Yes').mean() * 100
    ).reset_index().to_dict('records')
    
    return {
        "totalCustomers": total_customers,
        "churnRate": churn_rate,
        "retentionRate": retention_rate,
        "contractBreakdown": contract_breakdown
    }

@app.get("/feature-importance")
async def get_feature_importance():
    """Get feature importance from the trained model."""
    if model is None:
        return {"error": "Model not trained"}
    
    feature_importance = pd.DataFrame({
        'feature': model.feature_names_in_,
        'importance': model.feature_importances_
    }).sort_values('importance', ascending=False)
    
    return feature_importance.to_dict('records')

@app.get("/demographic-analysis")
async def get_demographic_analysis():
    """Get demographic breakdown analysis."""
    if df is None:
        return {"error": "No data uploaded"}
    
    gender_data = df['gender'].value_counts(normalize=True).to_dict()
    senior_data = df.groupby('SeniorCitizen')['Churn'].apply(
        lambda x: (x == 'Yes').mean() * 100
    ).to_dict()
    
    partner_data = df.groupby('Partner')['Churn'].apply(
        lambda x: (x == 'Yes').mean() * 100
    ).to_dict()
    
    dependent_data = df.groupby('Dependents')['Churn'].apply(
        lambda x: (x == 'Yes').mean() * 100
    ).to_dict()
    
    return {
        "genderData": gender_data,
        "seniorData": senior_data,
        "partnerData": partner_data,
        "dependentData": dependent_data
    }

@app.get("/services-analysis")
async def get_services_analysis():
    """Get services usage analysis."""
    if df is None:
        return {"error": "No data uploaded"}
    
    internet_service_data = df.groupby('InternetService')['Churn'].apply(
        lambda x: (x == 'Yes').mean() * 100
    ).to_dict()
    
    additional_services = ['OnlineSecurity', 'TechSupport', 'StreamingTV', 'StreamingMovies']
    services_data = {}
    
    for service in additional_services:
        services_data[service] = df.groupby(service)['Churn'].apply(
            lambda x: (x == 'Yes').mean() * 100
        ).to_dict()
    
    return {
        "internetServiceData": internet_service_data,
        "additionalServicesData": services_data
    }

@app.post("/predict")
async def predict_churn(data: Dict):
    """Predict churn probability for new customers."""
    if model is None:
        return {"error": "Model not trained"}
    
    # Convert input data to DataFrame
    input_df = pd.DataFrame([data])
    
    # Preprocess the input data
    processed_input = preprocess_data(input_df)
    
    # Make prediction
    probability = model.predict_proba(processed_input)[0][1]
    
    return {
        "churnProbability": float(probability),
        "riskLevel": "High" if probability > 0.7 else "Medium" if probability > 0.3 else "Low"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 