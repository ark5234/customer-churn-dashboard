from fastapi import FastAPI, UploadFile, File, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import io
import os
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import joblib
from sklearn.metrics import accuracy_score
from pydantic import BaseModel

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://localhost:3001",
        "https://customer-churn-dashboard-three.vercel.app",
        "https://customer-churn-dashboard-tiex.onrender.com/"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables to store data and model
if os.path.exists("uploaded_data.csv"):
    df = pd.read_csv("uploaded_data.csv")
else:
    df = None
model = None
label_encoders = {}

MODEL_PATH = 'model.joblib'
ENCODERS_PATH = 'label_encoders.joblib'
DATA_PATH = 'uploaded_data.csv'

def load_model_and_encoders():
    if not os.path.exists(MODEL_PATH) or not os.path.exists(ENCODERS_PATH):
        return None, None
    model = joblib.load(MODEL_PATH)
    encoders = joblib.load(ENCODERS_PATH)
    return model, encoders

def preprocess_input(data: pd.DataFrame, encoders: dict) -> pd.DataFrame:
    categorical_columns = [
        'gender', 'Partner', 'Dependents', 'PhoneService', 'MultipleLines',
        'InternetService', 'OnlineSecurity', 'OnlineBackup', 'DeviceProtection',
        'TechSupport', 'StreamingTV', 'StreamingMovies', 'Contract',
        'PaperlessBilling', 'PaymentMethod'
    ]
    for column in categorical_columns:
        if column in data.columns and column in encoders:
            data[column] = encoders[column].transform(data[column])
    if 'TotalCharges' in data.columns:
        data['TotalCharges'] = pd.to_numeric(data['TotalCharges'], errors='coerce')
        data['TotalCharges'].fillna(data['TotalCharges'].mean(), inplace=True)
    return data

def get_model_accuracy():
    print("Checking for file:", os.path.abspath(DATA_PATH), "Exists:", os.path.exists(DATA_PATH))
    if not os.path.exists(DATA_PATH):
        raise FileNotFoundError('No uploaded data found')
    model, encoders = load_model_and_encoders()
    if model is None or encoders is None:
        raise RuntimeError('Model not trained')
    df = pd.read_csv(DATA_PATH)
    if 'Churn' not in df.columns:
        raise ValueError('No Churn column in data')
    X = df.drop(['customerID', 'Churn'], axis=1, errors='ignore')
    y = df['Churn']
    X_processed = preprocess_input(X.copy(), encoders)
    y_pred = model.predict(X_processed)
    acc = accuracy_score(y, y_pred)
    return round(acc * 100, 2)

def get_manual_prediction(data):
    model, encoders = load_model_and_encoders()
    if model is None or encoders is None:
        raise RuntimeError('Model not trained')
    input_df = pd.DataFrame([data])
    processed_input = preprocess_input(input_df, encoders)
    # Ensure columns match model
    missing_cols = set(model.feature_names_in_) - set(processed_input.columns)
    for col in missing_cols:
        processed_input[col] = 0
    processed_input = processed_input[model.feature_names_in_]
    probability = model.predict_proba(processed_input)[0][1]
    prediction = model.predict(processed_input)[0]
    return {
        "churnProbability": float(probability),
        "prediction": str(prediction)
    }

def preprocess_data(data: pd.DataFrame) -> pd.DataFrame:
    """Preprocess the data for analysis."""
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

class ManualPredictInput(BaseModel):
    gender: str
    tenure: int
    MonthlyCharges: float
    Contract: str
    SeniorCitizen: int
    Partner: str
    Dependents: str
    PhoneService: str
    InternetService: str

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    """Upload and save the customer data file robustly."""
    global df
    try:
        contents = await file.read()
        with open("uploaded_data.csv", "wb") as f:
            f.write(contents)
        print("Saved uploaded_data.csv at:", os.path.abspath("uploaded_data.csv"))
        # Reload df from the saved file
        df = pd.read_csv("uploaded_data.csv")
        # Preprocess and train if Churn column exists
        processed_df = preprocess_data(df.copy())
        if 'Churn' in df.columns:
            train_model(processed_df)
        return {"message": "File uploaded and processed successfully"}
    except Exception as e:
        print("Error in /upload:", e)
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/churn-summary")
async def get_churn_summary():
    """Get overall churn summary statistics."""
    global df
    if df is None:
        return {"error": "No data uploaded"}
    
    if 'Churn' in df.columns:
        churn_col = df['Churn'].astype(str).str.strip().str.lower()
        churn_rate = (churn_col == 'yes').mean() * 100
        retention_rate = (churn_col == 'no').mean() * 100
    else:
        churn_rate = None
        retention_rate = None

    if 'Contract' in df.columns and 'Churn' in df.columns:
        contract_breakdown = df.groupby('Contract')['Churn'].apply(
            lambda x: (x.astype(str).str.strip().str.lower() == 'yes').mean() * 100
        ).reset_index().to_dict('records')
    else:
        contract_breakdown = []

    return {
        "totalCustomers": len(df),
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
async def predict_churn(data: dict):
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

@app.get("/model-accuracy")
async def model_accuracy():
    try:
        accuracy = get_model_accuracy()
        return {"accuracy": accuracy}
    except FileNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/manual-predict")
async def manual_predict(data: ManualPredictInput):
    try:
        result = get_manual_prediction(data.dict())
        return result
    except Exception as e:
        print("Error in /manual-predict:", e)
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    for route in app.routes:
        print(route.path)
    uvicorn.run(app, host="0.0.0.0", port=8000) 