import React, { useState, useEffect } from "react";
import { fetchLatLon, getCitySuggestions } from "../../utils/API";
import { FaRegStar, FaStar } from "react-icons/fa";
import { getWeatherIcon } from "../../utils/weatherIcons";
import { useTheme } from "../../context/ThemeContext"; 
import { useNavigate } from "react-router-dom";
import "./citySearch.css";

const CitySearch = () => {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [favouriteCities, setFavouriteCities] = useState(() => {
    const stored = localStorage.getItem("favouriteCity");
    return stored ? JSON.parse(stored) : [];
  });
  const { theme } = useTheme();

  const isFavourite = favouriteCities.includes(city);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (city.trim().length > 1) {
        const results = await getCitySuggestions(city);
        setSuggestions(results);
      } else {
        setSuggestions([]);
      }
    };
    fetchSuggestions();
  }, [city]);

  const handleSubmitSearchForm = async (e) => {
    e.preventDefault();
    const res = await fetchLatLon(city);
    setWeatherData(res);
    setSuggestions([]);
  };

  const handleClickFavourite = (e) => {
    e.stopPropagation();
    const updatedList = isFavourite
      ? favouriteCities.filter((favCity) => favCity !== city)
      : [...favouriteCities, city];

    setFavouriteCities(updatedList);
    localStorage.setItem("favouriteCity", JSON.stringify(updatedList));
  };

  const handleSuggestionClick = (name) => {
    setCity(name);
    setSuggestions([]);
    navigate(`/city/${encodeURIComponent(name)}`);
  };

  return (
    <div className="weather-container">
      <form
        className="search-form"
        onSubmit={handleSubmitSearchForm}
        style={{ position: "relative", zIndex: 5 }}
      >
        <input
          id="city"
          className="city-search"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          autoComplete="off"
          placeholder="Your city"
          style={{ color: "black" }}
        />
        <button className={`city-search-btn ${theme}`}>Search</button>
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((sugg, index) => (
              <li
                key={index}
                className="suggestion-item"
                onClick={() => handleSuggestionClick(sugg.name)}
                style={{ color: "black" }}
              >
                {sugg.name}, {sugg.country}
              </li>
            ))}
          </ul>
        )}
      </form>

      {weatherData?.current && (
        <div
          className="weather-panel"
          onClick={() => navigate(`/city/${encodeURIComponent(city)}`)}
          style={{ cursor: "pointer" }}
        >
          <div className="weather-header">
            <h2 className="weather-city">{city}</h2>
            <button className="add-favorite-btn" onClick={handleClickFavourite}>
              {isFavourite ? <FaStar color="#f39c12" /> : <FaRegStar />}
            </button>
          </div>
          <div className="weather-temp">
            {weatherData.current.temperature_2m}°C{" "}
            {weatherData.daily?.weathercode?.[0] !== undefined && (
              (() => {
                const Icon = getWeatherIcon(weatherData.daily.weathercode[0]);
                return <Icon size={28} />;
              })()
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CitySearch;
