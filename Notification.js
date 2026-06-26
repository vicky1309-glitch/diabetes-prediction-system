"""
Dataset Downloader
==================
Downloads the Pima Indians Diabetes Dataset from a public source
and saves it to the dataset/ folder.

Run once:  python dataset/download_dataset.py
"""

import urllib.request, os, sys

URL  = "https://raw.githubusercontent.com/jbrownlee/Datasets/master/pima-indians-diabetes.data.csv"
COLS = "Pregnancies,Glucose,BloodPressure,SkinThickness,Insulin,BMI,DiabetesPedigreeFunction,Age,Outcome"

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "diabetes.csv")

print(f"Downloading dataset → {OUT} …")
try:
    urllib.request.urlretrieve(URL, OUT)
    # Prepend header row if not present
    with open(OUT, "r") as f:
        first = f.readline()
    if "Pregnancies" not in first:
        with open(OUT, "r") as f:
            body = f.read()
        with open(OUT, "w") as f:
            f.write(COLS + "\n" + body)
    print("Done! Rows:", sum(1 for _ in open(OUT)) - 1)
except Exception as e:
    print(f"Download failed: {e}")
    print("Manual alternative:")
    print("  Download from https://www.kaggle.com/datasets/uciml/pima-indians-diabetes-database")
    print(f"  Save as  {OUT}")
    sys.exit(1)
