import React, { useEffect, useState } from 'react'
import { fetchLatLon } from '../utils/API'
import { getWeatherIcon } from '../utils/weatherIcons'
import { useNavigate } from 'react-router-dom'
import '../components/favouritesList/favouritesList.css'

const FavouritesList = () => {
  const [favouritesCities, setFavouritesCities] = useState(() => {
    const stored = localStorage.getItem('favouriteCity')
    return stored ? JSON.parse(stored) : []
  })
  const [favouriteCitiesData, setFavouriteCitiesData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const getCitiesData = async () => {
      try {
        const promises = favouritesCities.map((city) => fetchLatLon(city))
        const results = await Promise.all(promises)
        setFavouriteCitiesData(results.filter(Boolean))
      } catch (e) {
        console.error(e)
      }
    }

    getCitiesData()
  }, [favouritesCities])

  return (
    <div className="favourites-container">
      <h2>Your Favourite Cities</h2>
      <div className="favourites-grid">
        {favouriteCitiesData.map((data, index) => {
          const city = favouritesCities[index]
          const temp = data?.current?.temperature_2m
          const wind = data?.current?.wind_speed_10m
          const weatherCode = data?.daily?.weathercode?.[0]
          const Icon = getWeatherIcon(weatherCode)
          const dateTime = data?.current?.time

          return (
            <div
              className="favourite-card"
              key={index}
              onClick={() => navigate(`/city/${encodeURIComponent(city)}`)}
            >
              <h3>{city}</h3>
              <div className="favourite-date">
                {new Date(dateTime).toLocaleString()}
              </div>
              <div className="favourite-icon">
                <Icon size={40} />
              </div>
              <div className="favourite-temp">{temp}°C</div>
              <div className="favourite-wind">💨 {wind} km/h</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FavouritesList
