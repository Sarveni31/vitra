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
with st.form("input_form"):
    hb = st.number_input("Hemoglobin (Hb)", value=8.5, step=0.1)
    ferritin = st.number_input("Serum Ferritin", value=2500)
    alt = st.number_input("ALT", value=30)
    ast = st.number_input("AST", value=25)
    adherence = st.slider("Adherence Score (0.0 to 1.0)", 0.0, 1.0, 0.8)
    transfusions = st.number_input("Number of Past Transfusions", value=10)

    submit = st.form_submit_button("Predict Risk")

# Predict
if submit:
    input_df = pd.DataFrame([[hb, ferritin, alt, ast, adherence, transfusions]],
                            columns=['Hb', 'Ferritin', 'ALT', 'AST', 'Adherence', 'Transfusions'])
    
    scaled = scaler.transform(input_df)
    prob = model.predict_proba(scaled)[0][1]

    if prob >= 0.5:
        st.error(f"⚠️ High Risk of Anemia Dip — Risk Score: {prob:.2%}")
    else:
        st.success(f"✅ Low Risk of Anemia Dip — Risk Score: {prob:.2%}")
