# app/app.py

import streamlit as st
import pandas as pd
import joblib
import os
import re

# Load model and scaler
MODEL_PATH = "../models/anemia_predictor.pkl"
SCALER_PATH = "../models/scaler.pkl"

st.set_page_config(page_title="Thalassemia Anemia Risk Predictor")

st.title("🩸 Thalassemia Anemia Risk Predictor")
st.markdown("""
This tool predicts the likelihood of an upcoming **anemia dip** in thalassemia patients, based on clinical inputs.
""")

# Check if model and scaler exist
if not os.path.exists(MODEL_PATH) or not os.path.exists(SCALER_PATH):
    st.error("🚫 Model or scaler not found. Please train the model and save it in the 'models' folder.")
    st.stop()

# Load model and scaler
model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)

# Input Form
with st.form("prediction_form"):
    hb = st.number_input("Hemoglobin (Hb)", min_value=4.0, max_value=15.0, step=0.1, value=8.5)
    ferritin = st.number_input("Serum Ferritin (ng/mL)", min_value=100, max_value=10000, step=50, value=2500)
    transfusion_str = st.text_input("Transfusion History", value="45 units, last on 2025-03-06")
    compliance = st.slider("Compliance to Therapy", 0.0, 1.0, value=0.8)
    heart_rate = st.number_input("Heart Rate (BPM)", value=80)
    spO2 = st.number_input("Oxygen Saturation (SpO2 %)", value=98)
    age = st.number_input("Age", value=21, step=1)

    submitted = st.form_submit_button("Predict Risk")

# Handle Submission
if submitted:
    # Extract numeric transfusion count
    try:
        transfusion_count = float(re.search(r'(\d+)', transfusion_str).group(1))
    except Exception:
        st.error("❌ Could not extract transfusion count from the input string.")
        st.stop()

    # Create input DataFrame
    input_df = pd.DataFrame(
        [[hb, ferritin, transfusion_count, compliance, heart_rate, spO2, age]],
        columns=[
            'Hemoglobin (Hb)',
            'Serum Ferritin',
            'Transfusion Count',
            'Compliance to Therapy',
            'Heart Rate (BPM)',
            'Oxygen Saturation (SpO2)',
            'Age'
        ]
    )

    # Scale and predict
    try:
        scaled_input = scaler.transform(input_df)
        prob = model.predict_proba(scaled_input)[0][1]

        if prob > 0.5:
            st.error(f"⚠️ High Risk of Anemia Dip — Risk Score: {prob:.2%}")
        else:
