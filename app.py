from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pickle

dtr = pickle.load(open('dtr.pkl', 'rb'))
preprocessor = pickle.load(open('preprocessor.pkl', 'rb'))

app = Flask(__name__)


CORS(app, resources={r"/predict": {"origins": "http://localhost:5173"}})

@app.route('/')
def home():
    return jsonify({"message": "Crop Yield Prediction API is running!"})

@app.route("/predict", methods=['OPTIONS'])
def preflight():
    """Handles CORS preflight requests"""
    response = jsonify({"message": "Preflight OK"})
    response.headers.add("Access-Control-Allow-Origin", "http://localhost:5173")  
    response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type")
    response.headers.add("Access-Control-Allow-Credentials", "true")
    return response, 200

@app.route("/predict", methods=['POST'])
def predict():
    try:
        data = request.get_json()  

        Year = int(data['Year'])
        average_rain_fall_mm_per_year = float(data['average_rain_fall_mm_per_year'])
        pesticides_tonnes = float(data['pesticides_tonnes'])
        avg_temp = float(data['avg_temp'])
        Area = data['Area']
        Item = data['Item']

        features = np.array([[Year, average_rain_fall_mm_per_year, pesticides_tonnes, avg_temp, Area, Item]], dtype=object)
        transformed_features = preprocessor.transform(features)
        
        prediction = dtr.predict(transformed_features)[0]

        response = jsonify({'prediction': prediction})
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:5173")  
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        response.headers.add("Access-Control-Allow-Credentials", "true")
        return response

    except Exception as e:
        response = jsonify({'error': str(e)})
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:5173") 
        return response, 400

if __name__ == "__main__":
    app.run(debug=True, port=5000)
