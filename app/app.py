import streamlit as st
import pandas as pd
import joblib
import os

# File paths
MODEL_PATH = "../models/anemia_predictor.pkl"
SCALER_PATH = "../models/scaler.pkl"

# Load model & scaler
if not os.path.exists(MODEL_PATH) or not os.path.exists(SCALER_PATH):
    st.error("Model or scaler not found. Train the model and place it in 'models' folder.")
    st.stop()

model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)

# UI
st.title("🩸 Thalassemia Anemia Risk Predictor (Custom Dataset)")
st.markdown("Predict the likelihood of an upcoming **anemia dip** using your most recent lab inputs.")

# Form
with st.form("prediction_form"):
    hb = st.number_input("Hemoglobin (Hb)", value=8.5)
    ferritin = st.number_input("Serum Ferritin", value=2500)
    transfusions = st.number_input("Transfusion History", value=10)
    compliance = st.slider("Compliance to Therapy (0.0 - 1.0)", 0.0, 1.0, 0.8)
    heart_rate = st.number_input("Heart Rate (BPM)", value=80)
    spO2 = st.number_input("Oxygen Saturation (SpO2)", value=98)
    age = st.number_input("Age", value=18)

    submit = st.form_submit_button("Predict Risk")

if submit:
    input_df = pd.DataFrame([[hb, ferritin, transfusions, compliance, heart_rate, spO2, age]],
                            columns=[
                                'Hemoglobin (Hb)',
                                'Serum Ferritin',
                                'Transfusion History',
                                'Compliance to Therapy',
                                'Heart Rate (BPM)',
                                'Oxygen Saturation (SpO2)',
                                'Age'
                            ])
    
    scaled_input = scaler.transform(input_df)
    prob = model.predict_proba(scaled_input)[0][1]

    if prob > 0.5:
        st.error(f"⚠️ High risk of anemia dip: {prob:.2%}")
    else:
        st.success(f"✅ Low risk of anemia dip: {prob:.2%}")
