# 🩺 Diabetes Prediction System

A full-stack AI/ML web application that predicts diabetes risk using a **Logistic Regression** model trained on the **Pima Indians Diabetes Dataset**.

> ⚠️ **Disclaimer:** This tool is for educational purposes only. It is not medical advice. Always consult a qualified physician.

---

## 📸 Screenshots

| Dashboard & Prediction Form | Result Card | History Tab |
|---|---|---|
| *(Add screenshot here)* | *(Add screenshot here)* | *(Add screenshot here)* |

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React.js 18, Axios, CSS Variables |
| Backend | Python 3.10+, Flask 3, Flask-CORS |
| Machine Learning | Scikit-Learn (Logistic Regression), Pandas, NumPy |
| Database | SQLite (via Python `sqlite3`) |
| Version Control | Git & GitHub |

---

## 📁 Project Structure

```
diabetes-prediction-system/
├── frontend/                   # React.js application
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── PredictionForm.js   # 8-field health input form
│   │   │   ├── PredictionForm.css
│   │   │   ├── ResultCard.js       # Prediction result with confidence bar
│   │   │   ├── ResultCard.css
│   │   │   ├── HistoryTable.js     # Scrollable prediction history
│   │   │   ├── HistoryTable.css
│   │   │   ├── Notification.js     # Toast notifications
│   │   │   └── Notification.css
│   │   ├── styles/
│   │   │   ├── index.css           # CSS variables, resets, animations
│   │   │   └── App.css             # Layout, header, hero, tabs
│   │   ├── App.js                  # Root component, API calls
│   │   └── index.js
│   └── package.json
│
├── backend/
│   ├── app.py                  # Flask REST API
│   ├── train_model.py          # ML training script
│   └── predictions.db          # SQLite DB (auto-created)
│
├── dataset/
│   ├── diabetes.csv            # Pima Indians Diabetes Dataset
│   └── download_dataset.py     # Dataset downloader script
│
├── model/
│   └── model.pkl               # Trained model + scaler bundle
│
├── requirements.txt            # Python dependencies
├── .gitignore
└── README.md
```

---

## ⚡ Quick Start (VS Code)

### Prerequisites

- [Node.js 18+](https://nodejs.org/) and npm
- [Python 3.10+](https://www.python.org/)
- [Git](https://git-scm.com/)
- [VS Code](https://code.visualstudio.com/)

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/diabetes-prediction-system.git
cd diabetes-prediction-system
```

---

### Step 2 — Backend Setup

```bash
# Create and activate a virtual environment
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt
```

---

### Step 3 — Prepare the Dataset

The dataset is included as `dataset/diabetes.csv`.  
If you want to re-download the original Pima dataset:

```bash
python dataset/download_dataset.py
```

Or download manually from [Kaggle](https://www.kaggle.com/datasets/uciml/pima-indians-diabetes-database) and save as `dataset/diabetes.csv`.

---

### Step 4 — Train the Model

```bash
python backend/train_model.py
```

This will:
- Load and clean the dataset
- Replace zero values with column medians
- Split into 80% train / 20% test
- Train Logistic Regression
- Print accuracy and classification report
- Save `model/model.pkl`

---

### Step 5 — Start the Flask Backend

```bash
python backend/app.py
```

Flask runs on **http://localhost:5000**

---

### Step 6 — Start the React Frontend

Open a **new terminal**:

```bash
cd frontend
npm install
npm start
```

React runs on **http://localhost:3000**

---

## 🌐 API Documentation

### Base URL
```
http://localhost:5000
```

### Endpoints

#### `GET /health`
Returns model status and training accuracy.

**Response:**
```json
{
  "status": "ok",
  "modelAccuracy": 77.92
}
```

---

#### `POST /predict`
Predicts diabetes based on input health metrics.

**Request Body (JSON):**
```json
{
  "pregnancies":      6,
  "glucose":          148,
  "bloodPressure":    72,
  "skinThickness":    35,
  "insulin":          0,
  "bmi":              33.6,
  "diabetesPedigree": 0.627,
  "age":              50
}
```

**Response:**
```json
{
  "prediction":  "Diabetes Detected",
  "isDiabetic":  true,
  "confidence":  78.34,
  "timestamp":   "2024-01-15T10:30:00"
}
```

**Error Response (422):**
```json
{
  "error": "Missing field: glucose"
}
```

---

#### `GET /history?limit=20`
Returns recent prediction records.

**Response:** Array of prediction objects with all input fields.

---

#### `DELETE /history`
Clears all prediction history from the database.

---

## 🤖 Machine Learning Workflow

```
Raw Dataset (768 rows, 9 columns)
        ↓
Data Cleaning
  → Replace zeros in Glucose, BP, Skin, Insulin, BMI with column medians
        ↓
Train/Test Split (80% / 20%, stratified)
        ↓
Feature Scaling (StandardScaler)
        ↓
Logistic Regression (max_iter=1000, C=1.0)
        ↓
Evaluate → Accuracy, Precision, Recall, F1, Confusion Matrix
        ↓
Save model.pkl (model + scaler + metadata)
        ↓
Flask loads model.pkl at startup
        ↓
POST /predict → scale input → predict → return result + confidence
```

---

## 🚀 Deploy to GitHub

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "🚀 Initial commit: Diabetes Prediction System"

# Create a new repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/diabetes-prediction-system.git
git branch -M main
git push -u origin main
```

---

## 🔮 Future Enhancements

- [ ] Add more ML models (Random Forest, SVM, XGBoost) with comparison dashboard
- [ ] User authentication and personal health profiles
- [ ] PDF report export of prediction results
- [ ] Data visualisation: feature importance charts, ROC curve
- [ ] Deploy backend on Render / Railway, frontend on Vercel / Netlify
- [ ] Multi-language support (i18n)
- [ ] BMI calculator integrated into the form
- [ ] Dark mode toggle
- [ ] SHAP explainability to show which features influenced the prediction

---

## 📦 Dependencies

### Python (`requirements.txt`)
```
flask==3.0.3
flask-cors==4.0.1
scikit-learn==1.5.1
pandas==2.2.2
numpy==1.26.4
gunicorn==22.0.0
```

### Node (`frontend/package.json`)
```
react 18, react-dom 18, axios, react-scripts
```

---

## 📄 License

MIT © 2024 — Free to use for educational and portfolio purposes.

---

## 🙌 Acknowledgements

- [Pima Indians Diabetes Database — UCI ML Repository](https://archive.ics.uci.edu/ml/datasets/diabetes)
- [Scikit-Learn Documentation](https://scikit-learn.org/)
- [Flask Documentation](https://flask.palletsprojects.com/)
