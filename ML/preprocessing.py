import pandas as pd
from sklearn.preprocessing import LabelEncoder, StandardScaler

# Load dataset
df = pd.read_csv('D:\\Projects\\Vitra\\vitra\\dataset\\thalassemia_data.csv')

# Fill missing values for target column (optional here for preprocessing stage)
df["Iron Chelation Therapy"].fillna("None", inplace=True)

# Drop unnecessary columns (targets + date-related)
df = df.drop([
    'Iron Chelation Therapy',
    'Next Transfusion Due',
    'Last Lab Report Date',
    'Next Checkup Date',
    'Date of Diagnosis'
], axis=1)

# Convert date columns (if any were retained in preprocessing — skipped here)

# Encode categorical columns
cat_cols = ['Gender', 'Splenectomy Status', 'Family History', 'Compliance to Therapy', 'Geographical Location']
le = LabelEncoder()
for col in cat_cols:
    df[col] = le.fit_transform(df[col])

# Identify and scale numeric columns
numerical_cols = df.select_dtypes(include=['int64', 'float64']).columns.tolist()
scaler = StandardScaler()
df[numerical_cols] = scaler.fit_transform(df[numerical_cols])

# Save cleaned dataset
df.to_csv("thalassemia_data_cleaned.csv", index=False)
