"""
Diabetes Prediction Flask API
==============================
Endpoints:
  POST /predict      – predict diabetes from JSON input
  GET  /health       – health check
  GET  /history      – fetch prediction history
  DELETE /history    – clear prediction history
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle, os, sqlite3, datetime, numpy as np

# ─── App Setup ────────────────────────────────────────────────────────────────
app = Flask(__name__)
CORS(app)   # allow React dev-server on :3000

BASE_DIR   = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "..", "model", "model.pkl")
DB_PATH    = os.path.join(BASE_DIR, "predictions.db")

# ─── Load Model ───────────────────────────────────────────────────────────────
if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(
        f"model.pkl not found at {MODEL_PATH}. "
        "Run  python backend/train_model.py  first."
    )

with open(MODEL_PATH, "rb") as f:
    bundle = pickle.load(f)

model    = bundle["model"]
scaler   = bundle["scaler"]
features = bundle["features"]
MODEL_ACCURACY = round(bundle["accuracy"] * 100, 2)
print(f"Model loaded — training accuracy: {MODEL_ACCURACY}%")

# ─── Database Setup ───────────────────────────────────────────────────────────
def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    with get_db() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS predictions (
                id          INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp   TEXT    NOT NULL,
                pregnancies REAL, glucose REAL, blood_pressure REAL,
                skin_thickness REAL, insulin REAL, bmi REAL,
                diabetes_pedigree REAL, age REAL,
                prediction  TEXT    NOT NULL,
                confidence  REAL    NOT NULL
            )
        """)
        conn.commit()

init_db()

# ─── Helper ───────────────────────────────────────────────────────────────────
FIELD_MAP = {
    "pregnancies":         "Pregnancies",
    "glucose":             "Glucose",
    "bloodPressure":       "BloodPressure",
    "skinThickness":       "SkinThickness",
    "insulin":             "Insulin",
    "bmi":                 "BMI",
    "diabetesPedigree":    "DiabetesPedigreeFunction",
    "age":                 "Age",
}

def validate_input(data):
    """Return (values_dict, error_message)."""
    values = {}
    for js_key, ml_key in FIELD_MAP.items():
        raw = data.get(js_key)
        if raw is None or raw == "":
            return None, f"Missing field: {js_key}"
        try:
            v = float(raw)
        except (ValueError, TypeError):
            return None, f"Invalid value for {js_key}: must be a number"
        if v < 0:
            return None, f"Invalid value for {js_key}: must be ≥ 0"
        values[ml_key] = v
    return values, None

# ─── Routes ───────────────────────────────────────────────────────────────────

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "modelAccuracy": MODEL_ACCURACY})


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error": "Request body must be JSON"}), 400

    values, err = validate_input(data)
    if err:
        return jsonify({"error": err}), 422

    # Build feature vector in the same order used during training
    X = np.array([[values[f] for f in features]])
    X_scaled = scaler.transform(X)

    pred       = model.predict(X_scaled)[0]
    proba      = model.predict_proba(X_scaled)[0]
    confidence = round(float(proba[pred]) * 100, 2)
    label      = "Diabetes Detected" if pred == 1 else "No Diabetes"

    # Persist to SQLite
    ts = datetime.datetime.utcnow().isoformat()
    with get_db() as conn:
        conn.execute("""
            INSERT INTO predictions
              (timestamp, pregnancies, glucose, blood_pressure,
               skin_thickness, insulin, bmi, diabetes_pedigree, age,
               prediction, confidence)
            VALUES (?,?,?,?,?,?,?,?,?,?,?)
        """, (
            ts,
            values["Pregnancies"], values["Glucose"], values["BloodPressure"],
            values["SkinThickness"], values["Insulin"], values["BMI"],
            values["DiabetesPedigreeFunction"], values["Age"],
            label, confidence
        ))
        conn.commit()

    return jsonify({
        "prediction":  label,
        "isDiabetic":  bool(pred == 1),
        "confidence":  confidence,
        "timestamp":   ts,
    })


@app.route("/history", methods=["GET"])
def history():
    limit = min(int(request.args.get("limit", 20)), 100)
    with get_db() as conn:
        rows = conn.execute(
            "SELECT * FROM predictions ORDER BY id DESC LIMIT ?", (limit,)
        ).fetchall()
    return jsonify([dict(r) for r in rows])


@app.route("/history", methods=["DELETE"])
def clear_history():
    with get_db() as conn:
        conn.execute("DELETE FROM predictions")
        conn.commit()
    return jsonify({"message": "History cleared"})


# ─── Entry Point ──────────────────────────────────────────────────────────────
if __name__ == "__main__":
    app.run(debug=True, port=5000)
