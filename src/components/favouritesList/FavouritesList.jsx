import React, { useEffect, useState } from 'react';
import { fetchLatLon } from '../../utils/API';
import { getWeatherIcon } from '../../utils/weatherIcons';
import { useNavigate } from 'react-router-dom';
import './favouritesList.css';

const FavouritesList = () => {
  const [favouritesCities, setFavouritesCities] = useState(() => {
    const stored = localStorage.getItem('favouriteCity');
    return stored ? JSON.parse(stored) : [];
  });

  const [favouriteCitiesData, setFavouriteCitiesData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getCitiesData = async () => {
      setLoading(true);
      try {
        const promises = favouritesCities.map(city => fetchLatLon(city));
        const results = await Promise.all(promises);
        setFavouriteCitiesData(results.filter(Boolean));
      } catch (error) {
        console.error('Error loading favorite cities:', error);
      } finally {
        setLoading(false);
      }
    };

    getCitiesData();
  }, [favouritesCities]);

  if (loading) {
    return <p>Loading favorite cities...</p>;
  }

  if (favouritesCities.length === 0) {
    return <p style={{ textAlign: 'center' }}>You don't have any favorite cities yet.</p>;
  }

  return (
    <div className="favourites-grid">
      {favouriteCitiesData.map((data, index) => {
        const city = favouritesCities[index];
        const temp = data?.current?.temperature_2m;
        const wind = data?.current?.wind_speed_10m;
        const weatherCode = data?.daily?.weathercode?.[0];
        const Icon = getWeatherIcon(weatherCode);

        return (
          <div
            className="favourite-card clickable"
            key={city}
            onClick={() => navigate(`/city/${city}`)}
          >
            <h3>{city}</h3>
            {Icon && <Icon size={40} />}
            <p>Temperature: {temp}°C</p>
            <p>Wind: {wind} m/s</p>
          </div>
        );
      })}
    </div>
  );
};

export default FavouritesList;
