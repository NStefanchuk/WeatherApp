const fetchLatLonWeather = async (city = 'Amsterdam') => {
  try {
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    )
    const geoData = await geoRes.json()

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error('City is not found')
    }

    const { latitude, longitude } = geoData.results[0]

    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
    )

    const weatherData = await weatherRes.json()
    return weatherData
  } catch (e) {
    console.error('Error while fetching weather', e)
    return null
  }
}

const getCitySuggestions = async (query) => {
  if (!query) return []
  try {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5`
    )
    const data = await res.json()
    return data.results || []
  } catch (e) {
    console.error('Error while getting suggestions:', e)
    return []
  }
}

export { fetchLatLonWeather, getCitySuggestions }
