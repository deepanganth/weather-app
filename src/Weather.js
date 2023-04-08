import React, { useState } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import rain from "./assets/rain-img.png";
import sun from "./assets/sun.png";
import cloud from "./assets/cloud.png";
import thunderstorm from "./assets/thunderstorm.png";
import snow from "./assets/snow.png";
import mist from "./assets/mist.png";
import search from "./assets/search-icon.png";
import "./Weather.css";
import logo from "./assets/faviconlogo.png";

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const apiKey = "4d5d9ad5de6a86ec4c5ce14b257466cd";

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleSearch = () => {
    if (city) {
      fetchWeatherData();
    }
  };

  const getTemperatureClass = (temp) => {
    if (temp > 25) {
      return "temperature-hot";
    } else {
      return "temperature-cold";
    }
  };

  const getWeatherImage = (description) => {
    switch (description) {
      case "clear sky":
        return cloud;
      case "few clouds":
      case "scattered clouds":
      case "broken clouds":
      case "overcast clouds":
        return sun;
      case "light rain":
      case "moderate rain":
      case "heavy rain":
        return rain;
      case "thunderstorm":
        return thunderstorm;
      case "snow":
        return snow;
      case "mist":
      case "smoke":
      case "haze":
      case "dust":
      case "fog":
      case "sand":
      case "ash":
      case "squalls":
      case "tornado":
      default:
        return mist;
    }
  };

  return (
    <div className="main-section">
      <div className="logo">
        <a href="https://deepanganth.github.io/portfolio/">
          <img src={logo} alt="" />
        </a>
      </div>
      <div
        className={`weather-display ${
          weatherData && getTemperatureClass(weatherData.main.temp)
        }`}
      >
        {weatherData ? (
          <div className="display">
            <img
              src={getWeatherImage(weatherData.weather[0].description)}
              alt="Weather"
            />
            <div className="celcius-des">
              <h1 className="celcius">{weatherData.main.temp}° C</h1>
              <h3 className="weather-condition">
                {weatherData.weather[0].description}
              </h3>
            </div>
          </div>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
      <div className="weather-select">
        <input
          type="text"
          spellCheck="false"
          placeholder="Search for location...."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <div className="search-btn">
          <button onClick={handleSearch}>
            <img src={search} alt="search-btn" />
          </button>
        </div>
        <button onClick={() => setCity("coimbatore")}>My Location</button>
      </div>
    </div>
  );
}

export default Weather;
