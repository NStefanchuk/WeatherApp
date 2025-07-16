import { useEffect, useState } from 'react'
import { fetchLatLon } from '../../utils/API'
import { getWeatherIcon } from '../../utils/weatherIcons'
import { FaRegStar, FaStar } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import TemperatureChart from '../temperatureChart/TemperatureChart'
import { MdOutlineStar } from 'react-icons/md'
import { IoHome } from 'react-icons/io5'
import { useTheme } from '../../context/ThemeContext'
import './cityDetails.css'

function CityDetails({ cityName }) {
  const [weatherData, setWeatherData] = useState(null)
  const [isFavourite, setIsFavourite] = useState(false)
  const [favouriteCities, setFavouriteCities] = useState(() => {
    const stored = localStorage.getItem('favouriteCity')
    return stored ? JSON.parse(stored) : []
  })
  const { theme } = useTheme()
  const navigate = useNavigate()

  useEffect(() => {
    setIsFavourite(favouriteCities.includes(cityName))
  }, [cityName, favouriteCities])

  useEffect(() => {
    fetchLatLon(cityName).then((res) => setWeatherData(res))
  }, [cityName])

  const handleClickFavourite = () => {
    const updatedList = isFavourite
      ? favouriteCities.filter((favCity) => favCity !== cityName)
      : [...favouriteCities, cityName]

    setFavouriteCities(updatedList)
    setIsFavourite(!isFavourite)
    localStorage.setItem('favouriteCity', JSON.stringify(updatedList))
  }

  if (!weatherData?.current) return <div>Loading...</div>

  const weatherCode = weatherData.daily?.weathercode?.[0]
  const WeatherIcon = getWeatherIcon(weatherCode)

  return (
    <div className="weather-container">
      <div className="nav-buttons">
        <button
          className="nav-button home-button"
          onClick={() => navigate('/')}
        >
          <IoHome color={theme === 'dark' ? '#fff' : '#000'} />
        </button>
        <button
          className="nav-button fav-button"
          onClick={() => navigate('/favorites')}
        >
          <MdOutlineStar color="gold" />
        </button>
      </div>

      <div className="weather-panel">
        <div className="weather-header black-text">
          <h2 className="weather-city">{cityName}</h2>
          <button className="add-favorite-btn" onClick={handleClickFavourite}>
            {isFavourite ? <FaStar color="#f39c12" /> : <FaRegStar />}
          </button>
        </div>

        <p className="weather-time">
          {new Date(weatherData.current.time).toLocaleString()}
        </p>

        <div className="weather-icon">
          <WeatherIcon size={48} />
        </div>

        <div className="weather-temp black-text">
          {weatherData.current.temperature_2m}°C
        </div>

        <div className="weather-info">
          <div>
            <span className="info-label">Humidity</span>
            <span>{weatherData.hourly?.relative_humidity_2m[0]}%</span>
          </div>
          <div>
            <span className="info-label">Wind speed</span>
            <span>{weatherData.current.wind_speed_10m} km/h</span>
          </div>
        </div>
      </div>

      {weatherData?.daily && (
        <div className="weekly-forecast">
          <h3>7-day Forecast</h3>
          <div className="forecast-list">
            {weatherData.daily.time.map((day, index) => {
              const Icon = getWeatherIcon(weatherData.daily.weathercode[index])
              return (
                <div className="forecast-day" key={index}>
                  <p className="forecast-date">
                    {new Date(day).toLocaleDateString(undefined, {
                      weekday: 'short',
                      day: 'numeric',
                    })}
                  </p>
                  <div className="forecast-icon">
                    <Icon size={36} />
                  </div>
                  <p className="forecast-temp">
                    {weatherData.daily.temperature_2m_max[index]}° /
                    {weatherData.daily.temperature_2m_min[index]}°
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {weatherData?.daily && <TemperatureChart daily={weatherData.daily} />}
    </div>
  )
}

export default CityDetails
