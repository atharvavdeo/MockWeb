from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd

# Initialize FastAPI app
app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:5173",  # Your React app's default address
    "http://127.0.0.1:5173","https://mock-web-theta.vercel.app",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the trained model
model = joblib.load('titanic_survival_model.joblib')

# Define the input data model using Pydantic
class Passenger(BaseModel):
    Pclass: int
    Sex: str
    Age: float
    Fare: float
    Embarked: str
    FamilySize: int

@app.get("/")
def read_root():
    return {"message": "Titanic Survival Prediction API"}

@app.post("/predict")
def predict_survival(passenger: Passenger):
    # Convert input data to a pandas DataFrame
    data = pd.DataFrame([passenger.dict()])
    
    # The model pipeline expects specific column names and order from training
    # The Pydantic model and this DataFrame structure must match what the model was trained on
    prediction_proba = model.predict_proba(data)[0]
    prediction = model.predict(data)[0]

    survival_probability = prediction_proba[1] # Probability of 'Survived' class

    return {
        "prediction": "Survived" if prediction == 1 else "Did Not Survive",
        "survival_probability": round(survival_probability, 4)
    }

# To run the app:
# 1. Install dependencies: pip install -r requirements.txt
# 2. Train the model: python model_trainer.py
# 3. Run the server: uvicorn main:app --reload