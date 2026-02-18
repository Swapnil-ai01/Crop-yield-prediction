import { useState } from "react";
import { motion } from "framer-motion";
import "./NewPage.css";

const PredictForm = () => {
  const [formData, setFormData] = useState({
    Year: "",
    average_rain_fall_mm_per_year: "",
    pesticides_tonnes: "",
    avg_temp: "",
    Area: "",
    Item: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPrediction(null);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:5000//predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setPrediction(data.prediction);
      } else {
        setError(data.error || "Something went wrong!");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Crop Yield Prediction</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Year:</label>
          <select name="Year" value={formData.Year} onChange={handleChange} required>
            <option value="">Select a year</option>
            {[...Array(121)].map((_, index) => {
              const year = 1980 + index;
              return(
                <option key={year} value={year}>
                  {year}
                  </option>
              )
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Average Rainfall (mm/year):</label>
          <input type="number" name="average_rain_fall_mm_per_year" value={formData.average_rain_fall_mm_per_year} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Pesticides (tonnes):</label>
          <input type="number" name="pesticides_tonnes" value={formData.pesticides_tonnes} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Average Temperature (°C):</label>
          <input type="number" name="avg_temp" value={formData.avg_temp} onChange={handleChange} required />
        </div>
        <div className="form-group">
        <label>Area:</label>
        <select name="Area" value={formData.Area} onChange={handleChange} required>
          <option value="">Select a country</option>
          {[
            "Albania", "Algeria", "Angola", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
            "Bahamas", "Bahrain", "Bangladesh", "Belarus", "Belgium", "Botswana", "Brazil", "Bulgaria",
            "Burkina Faso", "Burundi", "Cameroon", "Canada", "Central African Republic", "Chile",
            "Colombia", "Croatia", "Denmark", "Dominican Republic", "Ecuador", "Egypt", "El Salvador",
            "Eritrea", "Estonia", "Finland", "France", "Germany", "Ghana", "Greece", "Guatemala",
            "Guinea", "Guyana", "Haiti", "Honduras", "Hungary", "India", "Indonesia", "Iraq", "Ireland",
            "Italy", "Jamaica", "Japan", "Kazakhstan", "Kenya", "Latvia", "Lebanon", "Lesotho", "Libya",
            "Lithuania", "Madagascar", "Malawi", "Malaysia", "Mali", "Mauritania", "Mauritius", "Mexico",
            "Montenegro", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "New Zealand",
            "Nicaragua", "Niger", "Norway", "Pakistan", "Papua New Guinea", "Peru", "Poland", "Portugal",
            "Qatar", "Romania", "Rwanda", "Saudi Arabia", "Senegal", "Slovenia", "South Africa", "Spain",
            "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Tajikistan", "Thailand", "Tunisia",
            "Turkey", "Uganda", "Ukraine", "United Kingdom", "Uruguay", "Zambia", "Zimbabwe"
          ].map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
        </div>
        <div className="form-group">
        <label>Item (Crop):</label>
        <select name="Item" value={formData.Item} onChange={handleChange} required>
          <option value="">Select a crop</option>
          <option value="Maize">Maize</option>
          <option value="Potatoes">Potatoes</option>
          <option value="paddy">paddy</option>
          <option value="Rice">Rice</option>
          <option value="Sorghum">Sorghum</option>
          <option value="Soybeans">Soybeans</option>
          <option value="Wheat">Wheat</option>
          <option value="Cassava">Cassava</option>
          <option value="Sweet potatoes">Sweet potatoes</option>
          <option value="Plantains and others">Plantains and others</option>
          <option value="Yams">Yams</option>
        </select>
        </div>
        <motion.button
          type="submit"
          className="submit-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Predict Yield
        </motion.button>
      </form>

      {error && <p className="error-message">{error}</p>}
      {prediction && (
        <div className="prediction-container">
          <h2>Predicted Yield:</h2>
          <h3>{prediction} hg/hu</h3>
        </div>
      )}
    </div>
  );
};

export default PredictForm;
