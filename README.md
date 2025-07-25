# Customer Churn Prediction Dashboard

A full-stack web application for predicting customer churn, analyzing churn drivers, and visualizing key metrics. Built with **React** (frontend) and **FastAPI** (backend), with a machine learning model for real-time predictions.

---

## Features

- **Upload customer data** (CSV) for analysis and model training.
- **Manual churn prediction** form for individual customer scenarios.
- **Recent Predictions** table (in-memory, per session).
- **Churn probability** and model confidence for each prediction.
- **Performance analytics** (model accuracy, churn rates, etc.).
- **Beautiful, responsive dashboard** with dark mode support.
- **Deployed frontend (Vercel)** and **backend (Render)** with CORS support.

---

## Tech Stack

- **Frontend:** React, Vite, CSS
- **Backend:** FastAPI, scikit-learn, pandas, joblib
- **ML Model:** Random Forest Classifier (retrained on upload)
- **Deployment:** Vercel (frontend), Render (backend)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ark5234/customer-churn-dashboard.git
cd customer-churn-dashboard
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

#### Run the Backend Locally

```bash
uvicorn main:app --reload
```

The backend will be available at `http://localhost:8000`.

### 3. Frontend Setup

```bash
cd ../
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`.

---

## Usage

### 1. Upload Data

- Go to the **Upload** page and upload a CSV file with customer data (must include a `Churn` column for training).

### 2. Manual Prediction

- Use the form to enter customer details and get a real-time churn prediction.
- The **Prediction** column shows if the customer is likely to churn ("Yes") or not ("No").
- **Churn Probability** shows the model's confidence (as a percentage).

### 3. Recent Predictions

- The table below the form shows your last 10 predictions (per session).

### 4. Performance & Analytics

- View model accuracy, churn rates, and other analytics on the dashboard.

---

## API Endpoints

- `POST /upload` — Upload customer CSV data.
- `GET /churn-summary` — Get churn and retention rates.
- `GET /model-accuracy` — Get model accuracy on uploaded data.
- `POST /manual-predict` — Predict churn for a single customer (JSON body).
- ...and more (see backend/main.py for full list).

---

## Deployment

- **Frontend:** Deploy `/` to Vercel (or similar).
- **Backend:** Deploy `/backend` to Render (or similar). Make sure to set `runtime.txt` to a supported Python version (e.g., `python-3.10.13`).

---

## Customization

- **Recent Predictions** are stored in-memory (per browser session).
- To persist predictions, connect the frontend to a database or extend the backend.

---

## License

MIT

---

## Acknowledgments

- Built with [React](https://react.dev/), [FastAPI](https://fastapi.tiangolo.com/), [scikit-learn](https://scikit-learn.org/), and [Vercel](https://vercel.com/)/[Render](https://render.com/).

---

## Sample CSV Format

Below is a sample of the expected CSV format for uploading customer data. The file **must include a `Churn` column** for model training.

```csv
customerID,gender,SeniorCitizen,Partner,Dependents,tenure,PhoneService,InternetService,Contract,MonthlyCharges,Churn
7590-VHVEG,Female,0,Yes,No,1,No,DSL,Month-to-month,29.85,No
5575-GNVDE,Male,0,No,No,34,Yes,DSL,One year,56.95,No
3668-QPYBK,Male,0,No,No,2,Yes,DSL,Month-to-month,53.85,Yes
7795-CFOCW,Male,0,No,No,45,No,Fiber optic,One year,42.30,No
9237-HQITU,Female,0,No,No,2,Yes,No,Month-to-month,70.70,Yes

your_id,Female,1,Yes,Yes,12,Yes,Fiber optic,Two year,99.65,No
```

- **Required columns:** `customerID`, `gender`, `SeniorCitizen`, `Partner`, `Dependents`, `tenure`, `PhoneService`, `InternetService`, `Contract`, `MonthlyCharges`, `Churn`
- **Churn values:** `Yes` or `No`
- You can add more rows or columns as needed, but these columns are required for the model to work.

---
