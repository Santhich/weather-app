// src/components/Home.tsx
import React, { useState, useEffect } from "react";
import "../styles/home.css";

// Type definitions
type WeatherData = {
  location: string;
  temperature: string;
  condition: string;
  humidity: string;
  wind: string;
};

type ForecastItem = {
  date: string;
  temperature: string;
  condition: string;
};

const Home: React.FC = () => {
  // UI state
  const [showMain, setShowMain] = useState(false);
  const [hideTyping, setHideTyping] = useState(false);
  const [loading, setLoading] = useState(false);

  // Weather state
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Typing animation delay
  useEffect(() => {
    const hideTimer = setTimeout(() => setHideTyping(true), 4500);
    const showTimer = setTimeout(() => setShowMain(true), 4600);
    return () => {
      clearTimeout(hideTimer);
      clearTimeout(showTimer);
    };
  }, []);

  // Weather UI theme class
  const getWeatherTheme = (temperature: string) => {
    const temp = parseFloat(temperature);
    if (temp <= 0) return "weather-snowy";
    if (temp <= 15) return "weather-cool";
    if (temp <= 28) return "weather-mild";
    if (temp <= 35) return "weather-hot";
    return "weather-extreme";
  };

  // Fetch weather data
const fetchWeather = async () => {
  const trimmedCity = city.trim();
  if (!trimmedCity) return;

  // Show loading spinner & clear old states
  setLoading(true);
  setErrorMessage("");
  setWeather(null);

  const apiKey = process.env.REACT_APP_OPENWEATHER_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${trimmedCity}&units=metric&appid=${apiKey}`;

  // 🔁 Intentional 1-second delay to allow loader to be visible
  setTimeout(async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("City not found");

      const data = await response.json();

      const weatherData: WeatherData = {
        location: data.name,
        temperature: `${data.main.temp}°C`,
        condition: data.weather[0].main,
        humidity: `${data.main.humidity}%`,
        wind: `${data.wind.speed} km/h`,
      };

      setWeather(weatherData);
    } catch (err: any) {
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Always stop loader whether success or fail
    }
  }, 1000); // 1 second delay(Just for loader demo purpose)
};


  // Weather icon by condition
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "clear": return "☀️";
      case "clouds": return "☁️";
      case "rain": return "🌧️";
      case "snow": return "❄️";
      case "thunderstorm": return "🌩️";
      case "drizzle": return "🌦️";
      default: return "🌈";
    }
  };

  // Fetch 5-day forecast
  const fetchForecast = async () => {
    const apiKey = process.env.REACT_APP_OPENWEATHER_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      const filtered = data.list.filter((entry: any) =>
        entry.dt_txt.includes("12:00:00")
      );

      const fiveDayForecast: ForecastItem[] = filtered.slice(0, 5).map((entry: any) => ({
        date: new Date(entry.dt_txt).toDateString(),
        temperature: `${entry.main.temp}°C`,
        condition: entry.weather[0].main,
      }));

      setForecast(fiveDayForecast);
      setShowModal(true);
    } catch (error) {
      alert("Unable to fetch forecast. Please try again later.");
    }
  };

  // Handle Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      fetchWeather();
    }
  };

  return (
    <div className="home-container">
      {/* Background clouds */}
      <div className="cloud cloud-left">☁️</div>
      <div className="cloud cloud-right">☁️</div>

      <div className="content">
        {/* Typing animation intro */}
        {!hideTyping && (
          <h1 className="typing-text">Type your city to see what the sky says today ☁️</h1>
        )}

        {showMain && (
          <>
            <h1 className="main-title">The Weather App</h1>
            <h2 className="main-header">Today’s Weather Report</h2>

            {/* Search bar */}
            <div className="search-wrapper">
              <input
                className="search-bar"
                type="text"
                placeholder="Enter your city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button className="search-icon" onClick={fetchWeather}>➔</button>
            </div>

            {/* Error */}
            {errorMessage && <p className="error-text">{errorMessage}</p>}

            {/* Loader */}
          {loading && (
  <div className="cloud-loader-wrapper">
    <div className="cloud-loader">
      <div className="cloud2"></div>
      <div className="cloud2 cloud-secondary"></div>
    </div>
    <p className="loading-text">Fetching your forecast... ☁️</p>
  </div>
)}


            {/* Weather box */}
            {!loading && weather && (
              <div className={`weather-container ${getWeatherTheme(weather.temperature)}`}>
                <div className="weather-display animate-weather">
                  <p><strong>City:</strong> {weather.location}</p>
                  <p><strong>Temperature:</strong> {weather.temperature}</p>
                  <p><strong>Condition:</strong> {weather.condition}</p>
                  <p><strong>Humidity:</strong> {weather.humidity}</p>
                  <p><strong>Wind:</strong> {weather.wind}</p>
                </div>

                <button className="forecast-button" onClick={fetchForecast}>
                  Show 5-Day Forecast
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Forecast Modal */}
      {showModal && (
        <div className="forecast-modal">
          <div className="forecast-content animate-forecast">
            <button className="close-btn" onClick={() => setShowModal(false)}>✕</button>
            <h2 className="forecast-heading">📅 5-Day Weather Forecast</h2>
            <div className="forecast-list">
              {forecast.map((day, index) => (
                <div className="forecast-card" key={index}>
                  <div className="icon">{getWeatherIcon(day.condition)}</div>
                  <div className="info">
                    <p className="date">{day.date}</p>
                    <p className="temp">{day.temperature}</p>
                    <p className="condition">{day.condition}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
